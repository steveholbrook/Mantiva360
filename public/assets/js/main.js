import { siteConfig, isPlayable } from "./site-config.js";

// Progressive enhancement: navigation, proof and direct video links work without JS.
document.documentElement.classList.add("enhanced");
document.querySelectorAll("[data-demo-link]").forEach((link) => { link.href = siteConfig.demoUrl; });
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
function closeMenu({ restoreFocus = false } = {}) {
  navigation?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (restoreFocus) menuToggle?.focus();
}
if (menuToggle && navigation) {
  const narrow = window.matchMedia("(max-width: 900px)");
  function syncMenu() { menuToggle.hidden = !narrow.matches; closeMenu(); }
  syncMenu();
  narrow.addEventListener("change", syncMenu);
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    navigation.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) closeMenu({ restoreFocus: true });
  });
}

document.querySelectorAll("[data-tabs]").forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];
  function activate(tab, focus = false) {
    tabs.forEach((candidate) => {
      const active = candidate === tab;
      candidate.setAttribute("aria-selected", String(active));
      candidate.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== tab.getAttribute("aria-controls"); });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      activate(tabs[next], true);
    });
  });
  if (tabs.length) activate(tabs[0]);
});

const dialog = document.querySelector("[data-video-dialog]");
const stage = dialog?.querySelector("[data-video-embed]");
const title = dialog?.querySelector("[data-video-dialog-title]");
const note = dialog?.querySelector("[data-video-note]");
const fallback = dialog?.querySelector("[data-video-fallback]");
const transcript = dialog?.querySelector("[data-video-transcript]");
let opener;
function clearVideo() {
  const video = stage?.querySelector("video");
  if (video) { video.pause(); video.removeAttribute("src"); video.load(); }
  stage?.replaceChildren();
}
function openVideo(event, trigger) {
  const id = trigger.dataset.videoOpen;
  const media = siteConfig.videos[id];
  if (!isPlayable(media)) { event.preventDefault(); return; }
  if (!dialog?.showModal || !stage || !title || !note || !fallback) return;
  event.preventDefault();
  clearVideo();
  document.querySelector("[data-hero-video]")?.pause();
  opener = trigger;
  if (transcript) { transcript.hidden = !media.transcript; transcript.href = media.transcript || "/resources"; }
  title.textContent = `${media.title} · ${media.seconds} sec`;
  if (media.type === "local") {
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "none";
    video.poster = media.poster;
    video.src = media.src;
    video.width = media.width;
    video.height = media.height;
    video.setAttribute("aria-label", title.textContent);
    if (media.height > media.width) video.classList.add("portrait");
    // A verified track can be configured without changing the player. Draft captions are not published.
    if (media.captions) {
      const track = document.createElement("track");
      Object.assign(track, { kind: "captions", src: media.captions, srclang: "en", label: "English", default: !media.captionsBurnedIn });
      video.appendChild(track);
    }
    video.addEventListener("error", () => { note.textContent = "This film could not load. Read the descriptive transcript or try the direct MP4 link below."; });
    stage.appendChild(video);
    note.textContent = `${media.note} Captions are already visible in this film. Optional English track available through player controls.`;
    fallback.href = media.src;
    fallback.textContent = "Open MP4 directly";
    fallback.removeAttribute("target");
    fallback.removeAttribute("rel");
  } else {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = media.title;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    stage.appendChild(iframe);
    note.textContent = "Playback uses YouTube’s privacy-enhanced domain. If the player is unavailable, open the original YouTube link below. Captions and a verified transcript for this existing film still need review.";
    fallback.href = `https://youtu.be/${id}`;
    fallback.textContent = "Open on YouTube ↗";
    fallback.target = "_blank";
    fallback.rel = "noopener noreferrer";
  }
  dialog.showModal();
  document.body.classList.add("dialog-open");
  dialog.querySelector("[data-video-close]")?.focus();
}
document.querySelectorAll("[data-video-open]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => openVideo(event, trigger));
});
if (dialog) {
  dialog.querySelector("[data-video-close]")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  // Keep the tab cycle inside the modal, including browsers that expose browser chrome at boundaries.
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const first = dialog.querySelector("[data-video-close]");
    const last = fallback;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  });
  // Native dialog handles Escape; cleanup applies to every close path.
  dialog.addEventListener("close", () => {
    clearVideo();
    document.body.classList.remove("dialog-open");
    // The close event is queued. Do not steal focus if the visitor has already
    // moved to another control before it runs; native dialog usually restores it.
    if (document.activeElement === document.body || dialog.contains(document.activeElement)) opener?.focus();
    opener = null;
  });
}

// Load the silent hero only when it is visible and visitor preferences permit it.
// A policy change unloads its source; an explicit user pause is never undone by scrolling.
const hero = document.querySelector('[data-hero-film]');
const heroVideo = hero?.querySelector('[data-hero-video]');
const heroToggle = hero?.querySelector('[data-hero-toggle]');
if (heroVideo && heroToggle && isPlayable(siteConfig.videos.hero)) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let visible = false, userPaused = false, failed = false;
  const blocked = () => motion.matches || Boolean(connection?.saveData);
  function showState() {
    heroToggle.textContent = heroVideo.paused ? 'Play motion' : 'Pause motion';
    heroToggle.setAttribute('aria-pressed', String(!heroVideo.paused));
  }
  function unload() {
    heroVideo.pause();
    heroVideo.removeAttribute('src');
    heroVideo.load();
  }
  function sync() {
    heroToggle.hidden = blocked() || failed;
    if (blocked()) { unload(); return; }
    if (!visible || document.hidden || userPaused || dialog?.open || failed) { heroVideo.pause(); return; }
    if (!heroVideo.getAttribute('src')) heroVideo.src = siteConfig.videos.hero.src;
    heroVideo.muted = true;
    heroVideo.play().catch(() => { userPaused = true; unload(); showState(); });
  }
  heroToggle.hidden = blocked();
  heroToggle.addEventListener('click', () => {
    if (!heroVideo.paused) { userPaused = true; heroVideo.pause(); }
    else { userPaused = false; failed = false; sync(); }
  });
  heroVideo.addEventListener('play', showState);
  heroVideo.addEventListener('pause', showState);
  heroVideo.addEventListener('error', () => {
    failed = true; unload(); heroToggle.hidden = true;
  });
  motion.addEventListener('change', sync);
  connection?.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, {threshold: 0.25}).observe(hero);
  }
}
