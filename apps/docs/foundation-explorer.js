import { referenceSection } from "./reference-layout.js";

let foundationCopy = {};
let html = String.raw;
let icon = () => "";
let iconFor = () => "";
let foundationExample = () => "";

export function configureFoundationExplorer(nextDeps) {
  foundationCopy = nextDeps.foundationCopy;
  html = nextDeps.html;
  icon = nextDeps.icon;
  iconFor = nextDeps.iconFor;
  foundationExample = nextDeps.foundationExample;
}

export function foundationExplorerSection(entry) {
  const explorer = foundationExplorerCopy(entry);
  const section = foundationCopy?.explorers ?? {};
  return referenceSection(
    foundationTemplate(section.sectionTitleTemplate ?? "{{title}} Explorer", entry),
    section.description ?? "",
    foundationExplorer(entry, explorer),
  );
}

function foundationExplorerCopy(entry) {
  return foundationCopy?.explorers?.items?.[entry.title] ?? foundationCopy?.explorers?.fallback ?? {};
}

function foundationChoiceButtons(choices, active, dataAttribute) {
  return (choices ?? [])
    .map(([value, label]) => `<button type="button" class="${value === active ? "active" : ""}" ${dataAttribute}="${value}">${label}</button>`)
    .join("");
}

function foundationIconGallery(names) {
  return (names ?? []).map((name) => `<article>${icon(name)}<span>${name}</span></article>`).join("");
}

function foundationExplorer(entry, explorer = foundationExplorerCopy(entry)) {
  if (explorer.type === "energy") {
    const initial = explorer.initial ?? explorer.choices?.[0]?.[0] ?? "";
    const [title, copy, value, token, action, iconName] = explorer.states?.[initial] ?? [];
    return html`
      <div class="foundation-explorer energy-explorer" data-energy-demo="${initial}">
        <div class="density-switch" aria-label="${explorer.ariaLabel ?? ""}">
          ${foundationChoiceButtons(explorer.choices, initial, "data-energy-choice")}
        </div>
        <div class="energy-product-demo"><aside><span class="energy-signal">${icon(iconName)}</span><strong data-energy-title>${title ?? ""}</strong><p data-energy-copy>${copy ?? ""}</p></aside><main><div class="energy-kpi"><b data-energy-value>${value ?? ""}</b><span data-energy-token>${token ?? ""}</span></div><div class="product-line strong"></div><div class="product-line"></div><button type="button" data-energy-action>${action ?? ""}</button></main></div>
      </div>`;
  }
  if (explorer.type === "frame") {
    const initial = explorer.initial ?? explorer.choices?.[0]?.[0] ?? "";
    return html`<div class="foundation-explorer frame-explorer" data-density-demo="${initial}"><div class="density-switch" aria-label="${explorer.ariaLabel ?? ""}">${foundationChoiceButtons(explorer.choices, initial, "data-density-choice")}</div><div class="frame-demo-columns">${(explorer.columns ?? []).map((item, index) => `<article><b>${item}</b><i></i><i></i><i></i><small>gap ${index + 2} · panel pad ${index + 3}</small></article>`).join("")}</div></div>`;
  }
  if (explorer.type === "voice") {
    const initial = explorer.initial ?? explorer.choices?.[0]?.[0] ?? "";
    const [title, heading, labelText, body] = explorer.states?.[initial] ?? [];
    return html`<div class="foundation-explorer voice-explorer" data-voice-demo="${initial}"><div class="density-switch" aria-label="${explorer.ariaLabel ?? ""}">${foundationChoiceButtons(explorer.choices, initial, "data-voice-choice")}</div><p class="voice-display" data-voice-title>${title ?? ""}</p><p class="voice-heading" data-voice-heading>${heading ?? ""}</p><p class="voice-label" data-voice-label>${labelText ?? ""}</p><p class="voice-body" data-voice-body>${body ?? ""}</p><code>${explorer.code ?? ""}</code></div>`;
  }
  if (explorer.type === "depth") {
    const initial = explorer.initial ?? explorer.choices?.[0]?.[0] ?? "";
    return html`<div class="foundation-explorer depth-explorer" data-depth-demo="${initial}"><div class="density-switch" aria-label="${explorer.ariaLabel ?? ""}">${foundationChoiceButtons(explorer.choices, initial, "data-depth-choice")}</div><div class="depth-stage"><article class="depth-surface"><span data-depth-label>${explorer.labels?.[initial] ?? ""}</span><strong>${explorer.title ?? ""}</strong><p>${explorer.copy ?? ""}</p></article></div></div>`;
  }
  if (explorer.type === "motion") {
    const initial = explorer.initial ?? explorer.choices?.[0]?.[0] ?? "";
    const [title, copy] = explorer.states?.[initial] ?? [];
    return html`<div class="foundation-explorer motion-explorer" data-motion-demo="${initial}"><div class="density-switch" aria-label="${explorer.ariaLabel ?? ""}">${foundationChoiceButtons(explorer.choices, initial, "data-motion-choice")}</div><div class="motion-doc-demo"><div class="motion-doc-head"><span>${icon("animation")}</span><div><strong data-motion-title>${title ?? ""}</strong><p data-motion-copy>${copy ?? ""}</p></div></div><div class="motion-duration-list" aria-label="${explorer.durationListAria ?? ""}">${(explorer.durationList ?? []).map(([name, ms, copy]) => `<article><b>${name}</b><span>${copy}</span><code>${ms}</code><i></i></article>`).join("")}</div><div class="motion-easing-list" aria-label="${explorer.easingListAria ?? ""}">${(explorer.easingList ?? []).map(([name, value]) => `<article><b>${name}</b><div><i></i></div><code>${value}</code></article>`).join("")}</div><div class="motion-stagger-grid" aria-label="${explorer.staggerAria ?? ""}">${(explorer.staggerList ?? []).map(([name, ms]) => `<article><b>${name}</b><code>${ms}</code>${(explorer.staggerItems ?? []).map((item) => `<span>${item}</span>`).join("")}</article>`).join("")}</div><div class="motion-token-reference" aria-label="${explorer.tokenReferenceAria ?? ""}">${(explorer.tokenReference ?? []).map(([token, value]) => `<article><code>${token}</code><span>${value}</span></article>`).join("")}</div><div class="motion-reduced-note"><strong>${explorer.reducedTitle ?? ""}</strong><p>${explorer.reducedCopy ?? ""}</p></div></div></div>`;
  }
  if (explorer.type === "symbol") {
    const initial = explorer.initial ?? explorer.choices?.[0]?.[0] ?? "";
    return html`<div class="foundation-explorer symbol-explorer" data-symbol-demo="${initial}"><div class="density-switch" aria-label="${explorer.ariaLabel ?? ""}">${foundationChoiceButtons(explorer.choices, initial, "data-symbol-choice")}</div><div class="symbol-gallery" data-symbol-gallery>${foundationIconGallery(explorer.sets?.[initial])}</div></div>`;
  }
  if (explorer.type === "tone") {
    const initial = explorer.initial ?? explorer.choices?.[0]?.[0] ?? "";
    const [labelText, title, copy] = explorer.states?.[initial] ?? [];
    return html`<div class="foundation-explorer tone-explorer" data-tone-demo="${initial}"><div class="density-switch" aria-label="${explorer.ariaLabel ?? ""}">${foundationChoiceButtons(explorer.choices, initial, "data-tone-choice")}</div><article class="tone-message"><span data-tone-label>${labelText ?? ""}</span><strong data-tone-title>${title ?? ""}</strong><p data-tone-copy>${copy ?? ""}</p></article></div>`;
  }
  if (explorer.type === "growth") {
    const initial = explorer.initial ?? explorer.choices?.[0]?.[0] ?? "";
    const [title, copy, eventName] = explorer.states?.[initial] ?? [];
    return html`<div class="foundation-explorer growth-explorer" data-growth-demo="${initial}"><div class="density-switch" aria-label="${explorer.ariaLabel ?? ""}">${foundationChoiceButtons(explorer.choices, initial, "data-growth-choice")}</div><div class="growth-meter"><i></i><i></i><i></i><i></i></div><article><strong data-growth-title>${title ?? ""}</strong><p data-growth-copy>${copy ?? ""}</p><code data-growth-event>${eventName ?? ""}</code></article></div>`;
  }
  if (explorer.type === "accessibility") {
    const initial = explorer.initial ?? explorer.choices?.[0]?.[0] ?? "";
    const [title, copy, action] = explorer.states?.[initial] ?? [];
    return html`<div class="foundation-explorer accessibility-explorer" data-a11y-demo="${initial}"><div class="density-switch" aria-label="${explorer.ariaLabel ?? ""}">${foundationChoiceButtons(explorer.choices, initial, "data-a11y-choice")}</div><article class="a11y-check"><span>${icon("accessibility_new")}</span><strong data-a11y-title>${title ?? ""}</strong><p data-a11y-copy>${copy ?? ""}</p><button type="button" data-a11y-action>${action ?? ""}</button></article></div>`;
  }
  return html`<div class="foundation-explorer operational-explorer"><aside><span>${icon(iconFor(entry))}</span><strong>${entry.title}</strong><p>${entry.summary}</p></aside><main><div class="product-alert"><b>${foundationExample(entry).includes("Card declined") ? "Card declined" : explorer.alertFallback ?? ""}</b><span>${entry.tokens[0]}</span></div><div class="product-line strong"></div><div class="product-line"></div><button type="button">${explorer.action ?? ""}</button></main></div>`;
}

function foundationTemplate(value, entry) {
  return String(value ?? "")
    .replaceAll("{{title}}", entry.title)
    .replaceAll("{{titleLower}}", entry.title.toLowerCase())
    .replaceAll("{{id}}", entry.id);
}
