#!/usr/bin/env bash

set -euo pipefail

PROJECT_ID="mantiva360-marketing"
PROJECT_NUMBER="499142789431"
SERVICE_ACCOUNT="firebase-adminsdk-fbsvc@mantiva360-marketing.iam.gserviceaccount.com"
POOL_ID="github-actions"
PROVIDER_ID="mantiva360-production"
REPOSITORY_ID="1372855233"
REPOSITORY_OWNER_ID="41897146"

command -v gcloud >/dev/null 2>&1 || {
  echo "Google Cloud CLI is required. Run this script in Google Cloud Shell." >&2
  exit 1
}

active_account="$(gcloud auth list --filter=status:ACTIVE --format='value(account)' | head -n 1)"
test -n "$active_account" || {
  echo "No active Google Cloud user session was found." >&2
  exit 1
}

case "$active_account" in
  *.gserviceaccount.com)
    echo "Refusing to bootstrap IAM with a service-account key." >&2
    echo "Run this script as a project owner in Google Cloud Shell." >&2
    exit 1
    ;;
esac

actual_project_number="$(
  gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)'
)"
test "$actual_project_number" = "$PROJECT_NUMBER" || {
  echo "Project identity check failed. Expected ${PROJECT_NUMBER}." >&2
  exit 1
}

echo "Configuring keyless GitHub deployment as ${active_account}."

gcloud services enable \
  cloudresourcemanager.googleapis.com \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  --project="$PROJECT_ID" \
  --quiet

if ! gcloud iam workload-identity-pools describe "$POOL_ID" \
  --project="$PROJECT_ID" \
  --location=global >/dev/null 2>&1; then
  gcloud iam workload-identity-pools create "$POOL_ID" \
    --project="$PROJECT_ID" \
    --location=global \
    --display-name="GitHub Actions" \
    --description="Short-lived GitHub Actions credentials for Mantiva360"
fi

attribute_mapping="google.subject=assertion.sub,attribute.repository_id=assertion.repository_id,attribute.repository_owner_id=assertion.repository_owner_id,attribute.ref=assertion.ref,attribute.environment=assertion.environment"
attribute_condition="assertion.repository_id == '${REPOSITORY_ID}' && assertion.repository_owner_id == '${REPOSITORY_OWNER_ID}' && assertion.ref == 'refs/heads/main' && assertion.environment == 'production'"

if gcloud iam workload-identity-pools providers describe "$PROVIDER_ID" \
  --project="$PROJECT_ID" \
  --location=global \
  --workload-identity-pool="$POOL_ID" >/dev/null 2>&1; then
  gcloud iam workload-identity-pools providers update-oidc "$PROVIDER_ID" \
    --project="$PROJECT_ID" \
    --location=global \
    --workload-identity-pool="$POOL_ID" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="$attribute_mapping" \
    --attribute-condition="$attribute_condition"
else
  gcloud iam workload-identity-pools providers create-oidc "$PROVIDER_ID" \
    --project="$PROJECT_ID" \
    --location=global \
    --workload-identity-pool="$POOL_ID" \
    --display-name="Mantiva360 production" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="$attribute_mapping" \
    --attribute-condition="$attribute_condition"
fi

principal="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository_id/${REPOSITORY_ID}"
gcloud iam service-accounts add-iam-policy-binding "$SERVICE_ACCOUNT" \
  --project="$PROJECT_ID" \
  --role=roles/iam.workloadIdentityUser \
  --member="$principal" \
  --quiet

provider_resource="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID}"

echo
echo "Keyless trust is configured."
echo "Provider: ${provider_resource}"
echo "Service account: ${SERVICE_ACCOUNT}"
echo "The provider accepts only the Mantiva360 repository, main branch and production environment."
