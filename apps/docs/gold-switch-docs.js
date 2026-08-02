import { componentMielPanel, componentSectionCopy, componentSectionData, componentDemoData, componentApiProps, demoCell, html, icon, ui, slug } from "./gold-component-core.js?v=211";
import { componentDemo } from "./component-demo.js?v=60";
import { playgroundStaticControls } from "./gold-component-data.js?v=202";

export function renderSwitchGoldSection(entry, section) {
  const renderers = {
    "operational-example": () => switchOperationalExamplePanel(),
    anatomy: () => switchAnatomyPanel(),
    accessibility: () => switchAccessibilityPanel(),
    variants: () => switchVariantsPanel(),
    states: () => switchStatesPanel(),
    "variant-state-behavior": () => switchStateVariantMatrixPanel(),
    "full-width": () => switchFullWidthPanel(),
    "responsive-layout-patterns": () => switchResponsivePanel(),
    "viewport-organization": () => switchViewportOrganizationPanel(),
    playground: () => switchPlaygroundPanel(),
    guidelines: () => switchGuidelinesPanel(),
    "api-foundations": () => switchContractPanel(),
    "tests-rejection-rules": () => switchTestPanel(),
    miel: () => componentMielPanel(entry),
  };
  return renderers[section]?.() ?? "";
}

function switchOperationalExamplePanel() {
  const scenario = componentSectionData("switch", "operational-example").scenario;
  return html`<section class="doc-panel wide button-operational-panel"><h2>${ui("component.operationalExample")}</h2><p>${componentSectionCopy("switch", "operational-example")}</p><div class="switch-scenario"><div class="switch-console"><header>${icon("toggle_on", { tone: "action", fill: true })}<div><strong>Driver settings</strong><small>Persistent on/off controls</small></div></header><div class="switch-stack">${(scenario.items ?? []).map(switchDemoFromData).join("")}</div></div><div class="fleet-panel-mini"><strong>${scenario.rationaleTitle}</strong><ul>${(scenario.rationale ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></div></div></section>`;
}

function switchAnatomyPanel() {
  const anatomy = componentSectionData("switch", "anatomy").items ?? [];
  return html`<section class="doc-panel wide"><h2>${ui("component.anatomy")}</h2><div class="button-anatomy">${anatomy.map((item, index) => `<article><b>${index + 1}</b><div><strong>${item.part}</strong><p>${item.rule}</p><div class="token-list">${item.tokens.map((token) => `<code>${token}</code>`).join("")}</div></div></article>`).join("")}</div></section>`;
}

function switchAccessibilityPanel() {
  const accessibility = componentSectionData("switch", "accessibility");
  return html`<section class="doc-panel wide"><h2>${ui("component.accessibility")}</h2><p>State precedence: ${accessibility.statePrecedence}.</p><div class="checklist-grid">${(accessibility.items ?? []).map((item) => `<article>${icon("check_circle", { tone: "success", fill: true })}<span>${item}</span></article>`).join("")}</div></section>`;
}

function switchVariantsPanel() {
  const variants = componentDemoData("switch", "variants");
  return html`<section class="doc-panel wide"><h2>${ui("component.variants")}</h2><p>${componentSectionCopy("switch", "variants")}</p><div class="button-demo-grid states-grid">${variants.map((demo) => demoCell(demo.label, switchDemoFromData(demo))).join("")}</div></section>`;
}

function switchStatesPanel() {
  const states = componentDemoData("switch", "states");
  return html`<section class="doc-panel wide"><h2>${ui("component.states")}</h2><p>${componentSectionCopy("switch", "states")}</p><div class="button-demo-grid states-grid">${states.map((demo) => demoCell(demo.label, switchDemoFromData(demo))).join("")}</div></section>`;
}

function switchStateVariantMatrixPanel() {
  const rows = componentDemoData("switch", "variant-state-behavior", "rows");
  const states = componentDemoData("switch", "variant-state-behavior", "states");
  return html`<section class="doc-panel wide"><h2>${ui("component.variantStateBehavior")}</h2><p>${componentSectionCopy("switch", "variant-state-behavior")}</p><div class="button-demo-grid state-behavior-grid">${rows.flatMap((row) => states.map((state) => demoCell(`${row.label} · ${state}`, switchDemoFromData(stateDemo(row.setting, state))))).join("")}</div></section>`;
}

function switchFullWidthPanel() {
  const items = componentDemoData("switch", "full-width", "items");
  return html`<section class="doc-panel wide"><h2>${ui("component.fullWidth")}</h2><p>${componentSectionCopy("switch", "full-width")}</p><div class="full-width-demo">${items.map((item) => `<div><span class="overline">${item.label}</span>${item.layout === "container" ? `<div class="container-demo">${item.demos.map((demo) => `<div data-span="${demo.span}">${switchDemoFromData(demo)}</div>`).join("")}</div>` : `<div class="button-stack${item.layout === "natural" ? " natural" : ""}">${switchDemoFromData(item.demo)}</div>`}</div>`).join("")}</div></section>`;
}

function switchResponsivePanel() {
  const examples = componentDemoData("switch", "responsive-layout-patterns", "examples");
  return html`<section class="doc-panel wide"><h2>${ui("component.responsiveLayoutPatterns")}</h2><p>${componentSectionCopy("switch", "responsive-layout-patterns")}</p><div class="responsive-actions-demo">${examples.map((example) => `<article><span class="overline">${example.label}</span><div class="${example.layout}" data-density-context="${example.density}">${(example.demos ?? []).map((demo) => switchDemoFromData({ ...demo, density: example.density })).join("")}</div></article>`).join("")}</div></section>`;
}

function switchViewportOrganizationPanel() {
  const items = componentDemoData("switch", "viewport-organization", "items");
  return html`<section class="doc-panel wide button-viewport-panel"><h2>${ui("component.viewportOrganization")}</h2><p>${componentSectionCopy("switch", "viewport-organization")}</p><div class="viewport-doc-grid">${items.map((item) => `<article data-density-context="${item.density}"><header>${icon(item.icon, { tone: "action" })}<h3>${item.title}</h3></header><p>${item.rule}</p><code>${item.title}</code>${switchDemoFromData(item.demo)}</article>`).join("")}</div></section>`;
}

function switchPlaygroundPanel() {
  const playground = componentSectionData("switch", "playground");
  return html`<section class="doc-panel wide button-playground" data-component-playground="switch" data-ready="false"><h2>${ui("component.playground")}</h2><p>${componentSectionCopy("switch", "playground")}</p><div class="playground-layout"><div class="playground-controls" aria-label="${ui("playground.switchControls")}">${playgroundStaticControls(playground.controls ?? [], "data-component-playground-input")}</div><div class="playground-preview"><div data-component-preview data-density-context="${playground.preview?.density ?? "md"}">${switchDemoFromData(playground.preview ?? {})}</div><pre data-component-markup>${playground.snippet ?? ""}</pre></div></div></section>`;
}

function switchContractPanel() {
  const props = componentApiProps("switch");
  return html`<section class="doc-panel wide"><h2>${ui("build.apiAndFoundations")}</h2><p>${componentSectionCopy("switch", "api-foundations")}</p><div class="props-table"><div><strong>${ui("table.prop")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>${props.map((prop) => `<div><code>${prop.name}</code><span>${prop.type}</span><span>${prop.required}</span><span>${prop.notes}</span></div>`).join("")}</div></section>`;
}

function switchGuidelinesPanel() {
  const groups = componentSectionData("switch", "guidelines").groups ?? [];
  return html`<section class="doc-panel wide"><h2>${ui("guidelines.title")}</h2><div class="guidelines-grid">${groups.map((group) => `<article><h3>${group.title}</h3><ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`).join("")}</div></section>`;
}

function switchTestPanel() {
  const tests = componentSectionData("switch", "tests-rejection-rules");
  return html`<section class="doc-panel wide"><h2>${ui("tests.title")}</h2><div class="two-column-list"><article><h3>${ui("tests.mustTest")}</h3><ul>${(tests.mustTest ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article><article><h3>${ui("tests.rejectIf")}</h3><ul>${(tests.rejectIf ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article></div></section>`;
}

function switchDemoFromData(demo) {
  return switchDemo(demo.label, demo.description ?? "", demo.checked ?? false, demo.state ?? "off", demo.density ?? "md");
}

export function switchDemo(label, description = "", checked = false, state = "off", density = "md") {
  const implemented = componentDemo("switch", { label, description, checked, state, density });
  if (implemented) return implemented;
  const id = `switch-${slug(`${label}-${state}-${density}`)}`;
  const isOn = state === "on" || state === "pressed" || (checked && state !== "off");
  const disabled = state === "disabled";
  return html`<label class="switch-demo" data-state="${state}" data-density-context="${density}" data-checked="${isOn}" for="${id}"><span class="switch-demo__control"><input id="${id}" type="checkbox" role="switch" aria-checked="${String(isOn)}" ${isOn ? "checked" : ""} ${disabled ? "disabled" : ""} /><span class="switch-demo__track" aria-hidden="true"><span class="switch-demo__thumb"></span></span></span><span class="switch-demo__copy"><strong>${label}</strong>${description ? `<small>${state === "error" ? icon("error", { tone: "danger", size: "sm", fill: true }) : ""}<span>${description}</span></small>` : ""}</span></label>`;
}

function stateDemo(setting, state) {
  return { ...setting, state, checked: state === "on" || state === "pressed" || state === "disabled", description: state === "error" ? "Review required before enabling." : setting.description };
}
