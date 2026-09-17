const appUrl = "https://mantiva360.app/";

document.querySelectorAll("[data-app-link]").forEach((link) => {
  link.href = appUrl;
});

const conceptButtons = [...document.querySelectorAll("[data-concept-select]")];
const concepts = [...document.querySelectorAll("[data-concept]")];

function activateConcept(conceptId, { updateHash = true, moveFocus = false } = {}) {
  const nextButton = conceptButtons.find((button) => button.dataset.conceptSelect === conceptId);
  const nextConcept = concepts.find((concept) => concept.id === conceptId);
  if (!nextButton || !nextConcept) return;

  conceptButtons.forEach((button) => {
    const isSelected = button === nextButton;
    button.setAttribute("aria-selected", String(isSelected));
    button.tabIndex = isSelected ? 0 : -1;
  });

  concepts.forEach((concept) => {
    concept.hidden = concept !== nextConcept;
  });

  const conceptName = nextButton.textContent.replace(/\s+/g, " ").trim();
  document.title = `Mantiva360 design review | ${conceptName}`;
  if (updateHash) history.replaceState(null, "", `#${conceptId}`);
  if (moveFocus) nextButton.focus();
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

conceptButtons.forEach((button, index) => {
  button.addEventListener("click", () => activateConcept(button.dataset.conceptSelect));
  button.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % conceptButtons.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + conceptButtons.length) % conceptButtons.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = conceptButtons.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    activateConcept(conceptButtons[nextIndex].dataset.conceptSelect, { moveFocus: true });
  });
});

function initialiseProductSwitcher(root) {
  const tabs = [...root.querySelectorAll('[role="tab"][data-screen]')];
  const image = root.querySelector("[data-screen-image]");
  const titles = [...root.querySelectorAll("[data-screen-title]")];
  const questions = [...root.querySelectorAll("[data-screen-question]")];
  const descriptions = [...root.querySelectorAll("[data-screen-description]")];
  if (!tabs.length || !image) return;

  function activateScreen(tab, { moveFocus = false } = {}) {
    tabs.forEach((candidate) => {
      const isSelected = candidate === tab;
      candidate.setAttribute("aria-selected", String(isSelected));
      candidate.tabIndex = isSelected ? 0 : -1;
    });

    image.classList.add("is-changing");
    window.setTimeout(() => {
      image.src = tab.dataset.screen;
      image.alt = `Mantiva360 ${tab.dataset.title} product view`;
      titles.forEach((title) => { title.textContent = tab.dataset.title; });
      questions.forEach((question) => { question.textContent = tab.dataset.question; });
      descriptions.forEach((description) => { description.textContent = tab.dataset.description; });
      image.classList.remove("is-changing");
    }, 120);

    if (moveFocus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateScreen(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      activateScreen(tabs[nextIndex], { moveFocus: true });
    });
  });
}

document.querySelectorAll("[data-product-switcher]").forEach(initialiseProductSwitcher);

const requestedConcept = window.location.hash.replace(/^#/, "");
if (concepts.some((concept) => concept.id === requestedConcept)) {
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  activateConcept(requestedConcept, { updateHash: false });
  window.addEventListener("load", () => {
    history.replaceState(null, "", `#${requestedConcept}`);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, { once: true });
}
