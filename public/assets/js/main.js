import { siteConfig } from "./site-config.js";

const safeEventNames = new Set([
  "overview_play",
  "product_exploration",
  "demo_click",
  "review_request_start",
  "review_request_success",
]);

function track(name, properties = {}) {
  if (!safeEventNames.has(name)) return;

  const detail = { name, ...properties };
  window.dispatchEvent(new CustomEvent("mantiva:analytics", { detail }));

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...properties });
  }
}

document.querySelectorAll("[data-demo-link]").forEach((link) => {
  link.href = siteConfig.demoUrl;
});

const pathname = window.location.pathname.replace(/index\.html$/, "");
document.querySelectorAll("[data-nav] > a").forEach((link) => {
  const url = new URL(link.href, window.location.origin);
  const linkPath = url.pathname.replace(/index\.html$/, "");
  const isHomeSection = linkPath === "/" && pathname === "/";
  const isSectionPage = linkPath !== "/" && pathname.startsWith(linkPath);

  if (isHomeSection || isSectionPage) link.setAttribute("aria-current", "page");
});

const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuToggle || !navigation) return;
  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  const label = menuToggle.querySelector(".sr-only");
  if (label) label.textContent = "Open navigation";
  if (restoreFocus) menuToggle.focus();
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    navigation.classList.toggle("is-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    const label = menuToggle.querySelector(".sr-only");
    if (label) label.textContent = willOpen ? "Close navigation" : "Open navigation";
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches) closeMenu();
  });
}

function initialiseTabs(root) {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];
  const select = root.querySelector("[data-tab-select]");
  if (!tabs.length || !panels.length) return;

  function activate(panelId, { moveFocus = false, report = true } = {}) {
    const nextTab = tabs.find((tab) => tab.getAttribute("aria-controls") === panelId);
    const nextPanel = panels.find((panel) => panel.id === panelId);
    if (!nextTab || !nextPanel) return;

    tabs.forEach((tab) => {
      const selected = tab === nextTab;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel !== nextPanel;
    });
    if (select) select.value = panelId;
    if (moveFocus) nextTab.focus();
    if (report) track("product_exploration", { view: panelId.replace(/^panel-/, "") });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.getAttribute("aria-controls")));
    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      activate(tabs[nextIndex].getAttribute("aria-controls"), { moveFocus: true });
    });
  });

  select?.addEventListener("change", () => activate(select.value));
}

document.querySelectorAll("[data-tabs]").forEach(initialiseTabs);

document.addEventListener("click", (event) => {
  const tracked = event.target.closest("[data-track]");
  if (!tracked) return;
  const eventName = tracked.dataset.track;
  if (eventName === "overview_play") return;
  track(eventName);
});

const videoDialog = document.querySelector("[data-video-dialog]");
const videoEmbed = videoDialog?.querySelector("[data-video-embed]");
const videoTitle = videoDialog?.querySelector("[data-video-dialog-title]");
const videoLink = videoDialog?.querySelector("[data-video-youtube-link]");
let videoTrigger = null;

function clearVideo() {
  if (videoEmbed) videoEmbed.replaceChildren();
}

function closeVideo() {
  if (!videoDialog?.open) return;
  videoDialog.close();
}

function openVideo(trigger) {
  if (!videoDialog || !videoEmbed || !videoTitle || !videoLink) return;
  const videoId = trigger.dataset.videoOpen;
  if (!siteConfig.videos[videoId]) return;

  videoTrigger = trigger;
  videoTitle.textContent = trigger.dataset.videoTitle || siteConfig.videos[videoId];
  videoLink.href = `https://youtu.be/${videoId}`;

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  iframe.title = videoTitle.textContent;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  videoEmbed.replaceChildren(iframe);

  videoDialog.showModal();
  document.body.classList.add("dialog-open");
  track(videoId === "XMQa-RB5fUU" ? "overview_play" : "product_exploration", {
    view: videoId === "XMQa-RB5fUU" ? "overview_video" : "resource_video",
  });
}

document.querySelectorAll("[data-video-open]").forEach((trigger) => {
  trigger.addEventListener("click", () => openVideo(trigger));
});

if (videoDialog) {
  videoDialog.querySelector("[data-video-close]")?.addEventListener("click", closeVideo);
  videoDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeVideo();
  });
  videoDialog.addEventListener("click", (event) => {
    if (event.target === videoDialog) closeVideo();
  });
  videoDialog.addEventListener("close", () => {
    clearVideo();
    document.body.classList.remove("dialog-open");
    videoTrigger?.focus();
    videoTrigger = null;
  });
}

const reviewForm = document.querySelector("[data-review-form]");
const reviewUnavailable = document.querySelector("[data-review-unavailable]");
const formAlert = reviewForm?.querySelector("[data-form-alert]");
const formSubmit = reviewForm?.querySelector('button[type="submit"]');
const enquiryAvailable = Boolean(siteConfig.enquiry.enabled && siteConfig.enquiry.endpoint);

if (reviewForm && reviewUnavailable && enquiryAvailable) {
  reviewForm.hidden = false;
  reviewUnavailable.hidden = true;
}

function showFormAlert(message, state = "error") {
  if (!formAlert) return;
  formAlert.textContent = message;
  formAlert.dataset.state = state;
  formAlert.hidden = false;
  formAlert.focus();
}

reviewForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  formAlert.hidden = true;

  if (!enquiryAvailable) {
    showFormAlert("The guided-review service is not connected in this review build.");
    return;
  }

  if (!reviewForm.reportValidity()) return;
  const fields = new FormData(reviewForm);
  if (fields.get("website")) return;

  const payload = {
    name: String(fields.get("name") || "").trim(),
    email: String(fields.get("email") || "").trim(),
    organisation: String(fields.get("organisation") || "").trim(),
    question: String(fields.get("question") || "").trim(),
    consent: fields.get("consent") === "on",
  };

  formSubmit.disabled = true;
  formSubmit.textContent = "Sending request…";

  try {
    const response = await fetch(siteConfig.enquiry.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.saved !== true) throw new Error("Request not confirmed");

    reviewForm.reset();
    showFormAlert("Your request was saved. Mantiva360 can now respond using the details you supplied.", "success");
    track("review_request_success");
  } catch {
    showFormAlert("The request was not confirmed. Your entries are still here. Please try again when the service is available.");
  } finally {
    formSubmit.disabled = false;
    formSubmit.textContent = "Request a guided review";
  }
});
