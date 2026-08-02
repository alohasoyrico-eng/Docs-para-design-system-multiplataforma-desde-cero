import { componentMielPanel, componentSectionCopy, componentSectionData, componentDemoData, componentApiProps, demoCell, html, icon, ui } from "./gold-component-core.js?v=211";
import { componentDemo } from "./component-demo.js?v=60";
import { playgroundStaticControls } from "./gold-component-data.js?v=209";

export function renderIconButtonGoldSection(entry, section) {
  const renderers = {
    "operational-example": () => iconButtonOperationalExamplePanel(),
    anatomy: () => iconButtonAnatomyPanel(),
    accessibility: () => iconButtonAccessibilityPanel(),
    variants: () => iconButtonVariantsPanel(),
    states: () => iconButtonStatesPanel(),
    "variant-state-behavior": () => iconButtonStateVariantMatrixPanel(),
    "full-width": () => iconButtonFullWidthPanel(),
    "responsive-layout-patterns": () => iconButtonResponsivePanel(),
    "viewport-organization": () => iconButtonViewportOrganizationPanel(),
    playground: () => iconButtonPlaygroundPanel(),
    guidelines: () => iconButtonGuidelinesPanel(),
    "api-foundations": () => iconButtonContractPanel(),
    "tests-rejection-rules": () => iconButtonTestPanel(),
    miel: () => componentMielPanel(entry),
  };
  return renderers[section]?.() ?? "";
}

function iconButtonOperationalExamplePanel() {
  const scenario = componentSectionData("icon-button", "operational-example").scenario;
  return html`<section class="doc-panel wide button-operational-panel"><h2>${ui("component.operationalExample")}</h2><p>${componentSectionCopy("icon-button", "operational-example")}</p><div class="icon-button-scenario"><div class="icon-button-console"><header>${icon("touch_app", { tone: "action", fill: true })}<div><strong>Topbar utilities</strong><small>Language, grid, and contrast</small></div></header><div class="icon-button-toolbar">${(scenario.items ?? []).map(iconButtonDemoFromData).join("")}</div></div><div class="fleet-panel-mini"><strong>${scenario.rationaleTitle}</strong><ul>${(scenario.rationale ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></div></div></section>`;
}

function iconButtonAnatomyPanel() {
  const anatomy = componentSectionData("icon-button", "anatomy").items ?? [];
  return html`<section class="doc-panel wide"><h2>${ui("component.anatomy")}</h2><div class="button-anatomy">${anatomy.map((item, index) => `<article><b>${index + 1}</b><div><strong>${item.part}</strong><p>${item.rule}</p><div class="token-list">${item.tokens.map((token) => `<code>${token}</code>`).join("")}</div></div></article>`).join("")}</div></section>`;
}

function iconButtonAccessibilityPanel() {
  const accessibility = componentSectionData("icon-button", "accessibility");
  return html`<section class="doc-panel wide"><h2>${ui("component.accessibility")}</h2><p>State precedence: ${accessibility.statePrecedence}.</p><div class="checklist-grid">${(accessibility.items ?? []).map((item) => `<article>${icon("check_circle", { tone: "success", fill: true })}<span>${item}</span></article>`).join("")}</div></section>`;
}

function iconButtonVariantsPanel() {
  const variants = componentDemoData("icon-button", "variants");
  return html`<section class="doc-panel wide"><h2>${ui("component.variants")}</h2><p>${componentSectionCopy("icon-button", "variants")}</p><div class="button-demo-grid states-grid">${variants.map((demo) => demoCell(demo.label, iconButtonDemoFromData(demo))).join("")}</div></section>`;
}

function iconButtonStatesPanel() {
  const states = componentDemoData("icon-button", "states");
  return html`<section class="doc-panel wide"><h2>${ui("component.states")}</h2><p>${componentSectionCopy("icon-button", "states")}</p><div class="button-demo-grid states-grid">${states.map((demo) => demoCell(demo.label, iconButtonDemoFromData(demo))).join("")}</div></section>`;
}

function iconButtonStateVariantMatrixPanel() {
  const rows = componentDemoData("icon-button", "variant-state-behavior", "rows");
  const states = componentDemoData("icon-button", "variant-state-behavior", "states");
  return html`<section class="doc-panel wide"><h2>${ui("component.variantStateBehavior")}</h2><p>${componentSectionCopy("icon-button", "variant-state-behavior")}</p><div class="button-demo-grid state-behavior-grid">${rows.flatMap((row) => states.map((state) => demoCell(`${row.label} · ${state}`, iconButtonDemoFromData(stateDemo(row.button, state))))).join("")}</div></section>`;
}

function iconButtonFullWidthPanel() {
  const items = componentDemoData("icon-button", "full-width", "items");
  return html`<section class="doc-panel wide"><h2>${ui("component.fullWidth")}</h2><p>${componentSectionCopy("icon-button", "full-width")}</p><div class="full-width-demo">${items.map((item) => `<div><span class="overline">${item.label}</span>${item.layout === "container" ? `<div class="container-demo">${item.demos.map((demo) => `<div data-span="${demo.span}"><div class="icon-button-toolbar">${iconButtonDemoFromData(demo)}</div></div>`).join("")}</div>` : `<div class="icon-button-toolbar">${(item.demos ?? [item.demo]).map(iconButtonDemoFromData).join("")}</div>`}</div>`).join("")}</div></section>`;
}

function iconButtonResponsivePanel() {
  const examples = componentDemoData("icon-button", "responsive-layout-patterns", "examples");
  return html`<section class="doc-panel wide"><h2>${ui("component.responsiveLayoutPatterns")}</h2><p>${componentSectionCopy("icon-button", "responsive-layout-patterns")}</p><div class="responsive-actions-demo">${examples.map((example) => `<article><span class="overline">${example.label}</span><div class="${example.layout}" data-density-context="${example.density}">${(example.demos ?? []).map((demo) => iconButtonDemoFromData({ ...demo, density: example.density })).join("")}</div></article>`).join("")}</div></section>`;
}

function iconButtonViewportOrganizationPanel() {
  const items = componentDemoData("icon-button", "viewport-organization", "items");
  return html`<section class="doc-panel wide button-viewport-panel"><h2>${ui("component.viewportOrganization")}</h2><p>${componentSectionCopy("icon-button", "viewport-organization")}</p><div class="viewport-doc-grid">${items.map((item) => `<article data-density-context="${item.density}"><header>${icon(item.icon, { tone: "action" })}<h3>${item.title}</h3></header><p>${item.rule}</p><code>${item.title}</code><div class="icon-button-toolbar">${iconButtonDemoFromData({ ...item.demo, density: item.density })}</div></article>`).join("")}</div></section>`;
}

function iconButtonPlaygroundPanel() {
  const playground = componentSectionData("icon-button", "playground");
  return html`<section class="doc-panel wide button-playground" data-component-playground="icon-button" data-ready="false"><h2>${ui("component.playground")}</h2><p>${componentSectionCopy("icon-button", "playground")}</p><div class="playground-layout"><div class="playground-controls" aria-label="${ui("playground.iconButtonControls")}">${playgroundStaticControls(playground.controls ?? [], "data-component-playground-input")}</div><div class="playground-preview"><div data-component-preview data-density-context="${playground.preview?.density ?? "md"}">${iconButtonDemoFromData(playground.preview ?? {})}</div><pre data-component-markup>${playground.snippet ?? ""}</pre></div></div></section>`;
}

function iconButtonContractPanel() {
  const props = componentApiProps("icon-button");
  return html`<section class="doc-panel wide"><h2>${ui("build.apiAndFoundations")}</h2><p>${componentSectionCopy("icon-button", "api-foundations")}</p><div class="props-table"><div><strong>${ui("table.prop")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>${props.map((prop) => `<div><code>${prop.name}</code><span>${prop.type}</span><span>${prop.required}</span><span>${prop.notes}</span></div>`).join("")}</div></section>`;
}

function iconButtonGuidelinesPanel() {
  const groups = componentSectionData("icon-button", "guidelines").groups ?? [];
  return html`<section class="doc-panel wide"><h2>${ui("guidelines.title")}</h2><div class="guidelines-grid">${groups.map((group) => `<article><h3>${group.title}</h3><ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`).join("")}</div></section>`;
}

function iconButtonTestPanel() {
  const tests = componentSectionData("icon-button", "tests-rejection-rules");
  return html`<section class="doc-panel wide"><h2>${ui("tests.title")}</h2><div class="two-column-list"><article><h3>${ui("tests.mustTest")}</h3><ul>${(tests.mustTest ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article><article><h3>${ui("tests.rejectIf")}</h3><ul>${(tests.rejectIf ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article></div></section>`;
}

function iconButtonDemoFromData(demo) {
  return iconButtonDemo(demo.icon ?? "grid_view", demo.ariaLabel ?? "Show grid", demo.variant ?? "ghost", Boolean(demo.selected), Boolean(demo.badge), demo.state ?? "default", demo.density ?? "md");
}

export function iconButtonDemo(iconName, ariaLabel, variant = "ghost", selected = false, badge = false, state = "default", density = "md") {
  const implemented = componentDemo("icon-button", { icon: iconName, ariaLabel, variant, selected, badge, state, density });
  if (implemented) return implemented;
  return html`<span data-component-source="missing" data-doc-component="icon-button" aria-label="${ariaLabel}"></span>`;
}

function stateDemo(button, state) {
  return { ...button, state, selected: state === "selected" || Boolean(button.selected), badge: state === "badged" || Boolean(button.badge) };
}
