import { siteConfig } from "./site-config.js";

const menu = document.querySelector(".menu");
const navigation = document.getElementById("main-nav");

function setMenu(open, { restoreFocus = false } = {}) {
  if (!menu || !navigation) return;
  navigation.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menu.textContent = open ? "×" : "☰";
  if (restoreFocus) menu.focus();
}

if (menu && navigation) {
  menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
      setMenu(false, { restoreFocus: true });
    }
  });
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 821px)").matches) setMenu(false);
  });
}

document.querySelectorAll("[data-demo-link]").forEach((link) => {
  link.href = siteConfig.demoUrl;
});

document.querySelectorAll("[data-tabs]").forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];

  function selectTab(tab, { focus = false } = {}) {
    const panelId = tab.getAttribute("aria-controls");
    tabs.forEach((candidate) => {
      const active = candidate === tab;
      candidate.setAttribute("aria-selected", String(active));
      candidate.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== panelId;
    });
    if (focus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      selectTab(tabs[nextIndex], { focus: true });
    });
  });
});

document.querySelectorAll(".capture-wrap img").forEach((image) => {
  const capture = image.closest(".capture-wrap");
  const showFallback = () => capture?.classList.add("unavailable");
  const showImage = () => capture?.classList.remove("unavailable");
  image.addEventListener("error", showFallback);
  image.addEventListener("load", showImage);
  if (image.complete) image.naturalWidth > 0 ? showImage() : showFallback();
});

const dialog = document.getElementById("video-dialog");
const stage = dialog?.querySelector(".video-stage");
const gate = dialog?.querySelector(".video-gate");
const loadVideo = document.getElementById("load-video");
const youtubeLink = dialog?.querySelector("[data-video-youtube-link]");
const overviewVideoId = siteConfig.overviewVideoId;
let videoOpener = null;

if (youtubeLink && siteConfig.videos[overviewVideoId]) {
  youtubeLink.href = `https://www.youtube.com/watch?v=${overviewVideoId}`;
}

document.querySelectorAll("[data-video-open]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!dialog) return;
    videoOpener = button;
    dialog.showModal();
  });
});

dialog?.querySelector(".close-dialog")?.addEventListener("click", () => dialog.close());

dialog?.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});

dialog?.addEventListener("close", () => {
  stage?.querySelector("iframe")?.remove();
  if (gate) gate.hidden = false;
  videoOpener?.focus();
  videoOpener = null;
});

loadVideo?.addEventListener("click", () => {
  if (!stage || !gate || stage.querySelector("iframe") || !siteConfig.videos[overviewVideoId]) return;
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${overviewVideoId}?autoplay=1&rel=0`;
  iframe.title = siteConfig.videos[overviewVideoId];
  iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  gate.hidden = true;
  stage.appendChild(iframe);
});
