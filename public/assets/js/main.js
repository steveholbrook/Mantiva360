import { siteConfig } from "./site-config.js";

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

qsa("[data-demo-link]").forEach((link) => {
  link.href = siteConfig.demoUrl;
});

const menuButton = qs("[data-menu-toggle]");
const navigation = qs("[data-nav]");

function setMenu(open) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
  const label = qs(".sr-only", menuButton);
  if (label) label.textContent = open ? "Close navigation" : "Open navigation";
}

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

qsa("a", navigation).forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const tabRoot = qs("[data-tabs]");
if (tabRoot) {
  const tabs = qsa('[role="tab"]', tabRoot);
  const panels = qsa('[role="tabpanel"]', tabRoot);

  function activateTab(nextTab, moveFocus = false) {
    tabs.forEach((tab) => {
      const active = tab === nextTab;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== nextTab.getAttribute("aria-controls");
    });
    if (moveFocus) nextTab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = null;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex !== null) {
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      }
    });
  });
}

const videoDialog = qs("[data-video-dialog]");
const videoEmbed = qs("[data-video-embed]");
const videoTitle = qs("[data-video-dialog-title]");
const youtubeLink = qs("[data-video-youtube-link]");
const videoClose = qs("[data-video-close]");

function validVideoId(videoId) {
  return Object.hasOwn(siteConfig.videos, videoId);
}

function openVideo(videoId, requestedTitle) {
  if (!videoDialog || !videoEmbed || !validVideoId(videoId)) return;
  const title = requestedTitle || siteConfig.videos[videoId];
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  iframe.title = title;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  videoEmbed.replaceChildren(iframe);
  if (videoTitle) videoTitle.textContent = title;
  if (youtubeLink) youtubeLink.href = `https://youtu.be/${videoId}`;
  document.body.classList.add("dialog-open");
  videoDialog.showModal();
}

function closeVideo() {
  if (!videoDialog || !videoEmbed) return;
  if (videoDialog.open) videoDialog.close();
  videoEmbed.replaceChildren();
  document.body.classList.remove("dialog-open");
}

qsa("[data-video-open]").forEach((button) => {
  button.addEventListener("click", () => openVideo(button.dataset.videoOpen, button.dataset.videoTitle));
});
videoClose?.addEventListener("click", closeVideo);
videoDialog?.addEventListener("click", (event) => {
  const rect = videoDialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) closeVideo();
});
videoDialog?.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeVideo();
});
videoDialog?.addEventListener("close", () => {
  videoEmbed?.replaceChildren();
  document.body.classList.remove("dialog-open");
});

const revealItems = qsa(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const reviewForm = qs("[data-review-form]");
const formAlert = qs("[data-form-alert]");
const availability = qs("[data-form-availability]");

function showFormMessage(message, success = false) {
  if (!formAlert) return;
  formAlert.textContent = message;
  formAlert.hidden = false;
  formAlert.classList.toggle("success", success);
  formAlert.focus();
}

function validateReviewForm(form) {
  qsa("[aria-invalid]", form).forEach((field) => field.removeAttribute("aria-invalid"));
  if (form.reportValidity()) return true;
  qsa(":invalid", form).forEach((field) => field.setAttribute("aria-invalid", "true"));
  showFormMessage("Please complete the required fields and check the highlighted entries.");
  return false;
}

if (reviewForm) {
  if (siteConfig.enquiry.enabled && siteConfig.enquiry.endpoint && availability) {
    availability.textContent = "Your request is stored only after the service confirms submission. A saved request is not a confirmed meeting.";
  }

  reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateReviewForm(reviewForm)) return;

    if (!siteConfig.enquiry.enabled || !siteConfig.enquiry.endpoint) {
      showFormMessage("Online requests are not connected yet, so your details were not sent. The demo remains available while guided-review handling is completed for launch.");
      return;
    }

    const submitButton = qs('button[type="submit"]', reviewForm);
    const data = new FormData(reviewForm);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      organisation: String(data.get("organisation") || "").trim(),
      role: String(data.get("role") || "").trim(),
      focus: String(data.get("focus") || "").trim(),
      context: String(data.get("context") || "").trim(),
      website: String(data.get("website") || "").trim(),
      consent: data.get("consent") === "on",
      page: window.location.pathname,
    };

    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    if (formAlert) formAlert.hidden = true;

    try {
      const response = await fetch(siteConfig.enquiry.endpoint, {
        method: "POST",
        headers: { "content-type": "application/json", "accept": "application/json" },
        body: JSON.stringify(payload),
        credentials: "same-origin",
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.saved !== true) throw new Error("Submission was not confirmed by storage.");
      reviewForm.reset();
      showFormMessage("Your guided-review request was saved. This is not yet a confirmed meeting. Mantiva360 will use the details only to respond to this request.", true);
    } catch {
      showFormMessage("The request could not be confirmed, so the form has kept your details for you to retry. Nothing on this page indicates that a meeting is booked.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Request a guided review";
    }
  });
}
