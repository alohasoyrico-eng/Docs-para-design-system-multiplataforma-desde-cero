import { searchSlotMarkup } from "./search-slot.js?v=2";

let currentLocale = () => "en";
let render = () => {};
let setCurrentLocale = () => {};
let ui = (key) => key;

export function configureDocsChrome(nextDeps) {
  currentLocale = nextDeps.currentLocale;
  render = nextDeps.render;
  setCurrentLocale = nextDeps.setCurrentLocale;
  ui = nextDeps.ui;
}

export function applyLocalizedChrome() {
  normalizeTopbarSearch();
  normalizeTopbarUtilities();
  document.documentElement.lang = currentLocale();
  const skipLink = document.querySelector(".skip-link");
  if (skipLink) skipLink.textContent = ui("shell.skipToContent");
  document.querySelector(".topbar")?.setAttribute("aria-label", ui("shell.primaryNavigation"));
  document.querySelector("#menuButton")?.setAttribute("aria-label", ui("shell.openNavigation"));
  const searchLabel = document.querySelector("#topSearch")?.closest(".field")?.querySelector(".field__label");
  if (searchLabel) searchLabel.textContent = ui("shell.searchLabel");
  document.querySelector(".brand")?.setAttribute("aria-label", ui("shell.brandHome"));
  document.querySelector("#topSearch")?.setAttribute("placeholder", ui("shell.searchPlaceholder"));
  document.querySelector("#topSearchResults")?.setAttribute("aria-label", ui("shell.searchResults"));
  document.querySelector("#gridToggle")?.setAttribute("aria-label", ui("shell.showGrid"));
  document.querySelector("#themeToggle")?.setAttribute("aria-label", ui("shell.toggleContrast"));
  const languageToggle = document.querySelector("#languageToggle");
  if (languageToggle) {
    const languageCode = languageToggle.querySelector(".language-toggle__code");
    if (languageCode) languageCode.textContent = ui("shell.languageCurrent");
    languageToggle.dataset.locale = currentLocale();
    languageToggle.setAttribute("aria-label", ui("shell.languageToggle"));
  }
}

function normalizeTopbarSearch() {
  const mount = document.querySelector("#topbarSearch");
  if (!mount || document.querySelector("#topSearch")) return;
  mount.innerHTML = searchSlotMarkup({
    label: ui("shell.searchLabel"),
    placeholder: ui("shell.searchPlaceholder"),
    inputId: "topSearch",
    resultsId: "topSearchResults",
    inputAttrs: { autocomplete: "off" },
    ariaLabel: ui("shell.searchLabel"),
  });
}

function normalizeTopbarUtilities() {
  const languageToggle = document.querySelector("#languageToggle");
  if (languageToggle && !languageToggle.querySelector(".language-toggle__code")) {
    languageToggle.classList.add("icon-button", "language-toggle");
    languageToggle.innerHTML = '<span class="material-symbol" data-icon="language" aria-hidden="true">language</span><span class="language-toggle__code"></span>';
  }
  document.querySelector("#themeToggle")?.setAttribute("aria-pressed", document.body.dataset.contrast === "quiet" ? "true" : "false");
}

export function setupLanguageToggle() {
  document.querySelector("#languageToggle")?.addEventListener("click", () => {
    setCurrentLocale(currentLocale() === "en" ? "es" : "en");
    applyLocalizedChrome();
    render();
  });
}
