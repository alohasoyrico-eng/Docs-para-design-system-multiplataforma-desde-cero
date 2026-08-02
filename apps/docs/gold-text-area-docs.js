import { componentMielPanel, componentSectionCopy, componentSectionData, componentDemoData, componentApiProps, demoCell, html, icon, ui, slug } from "./gold-component-core.js?v=211";
import { componentDemo } from "./component-demo.js?v=60";
import { playgroundStaticControls } from "./gold-component-data.js?v=209";

export function renderTextAreaGoldSection(entry, section) {
  const renderers = {
    "operational-example": () => textAreaOperationalExamplePanel(),
    anatomy: () => textAreaAnatomyPanel(),
    accessibility: () => textAreaAccessibilityPanel(),
    variants: () => textAreaVariantsPanel(),
    states: () => textAreaStatesPanel(),
    "variant-state-behavior": () => textAreaStateVariantMatrixPanel(),
    "full-width": () => textAreaFullWidthPanel(),
    "responsive-layout-patterns": () => textAreaResponsivePanel(),
    "viewport-organization": () => textAreaViewportOrganizationPanel(),
    playground: () => textAreaPlaygroundPanel(),
    guidelines: () => textAreaGuidelinesPanel(),
    "api-foundations": () => textAreaContractPanel(),
    "tests-rejection-rules": () => textAreaTestPanel(),
    miel: () => componentMielPanel(entry),
  };
  return renderers[section]?.() ?? "";
}

function textAreaOperationalExamplePanel() {
  const scenario = componentSectionData("text-area", "operational-example").scenario;
  return html`<section class="doc-panel wide button-operational-panel"><h2>${ui("component.operationalExample")}</h2><p>${componentSectionCopy("text-area", "operational-example")}</p><div class="text-area-scenario"><div class="filter-console"><header>${icon("edit_note", { tone: "action", fill: true })}<div><strong>Operational notes</strong><small>Multiline values with review context</small></div></header><div class="text-area-stack">${(scenario.fields ?? []).map(textAreaDemoFromData).join("")}</div></div><div class="fleet-panel-mini"><strong>${scenario.rationaleTitle}</strong><ul>${(scenario.rationale ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></div></div></section>`;
}

function textAreaAnatomyPanel() {
  const anatomy = componentSectionData("text-area", "anatomy").items ?? [];
  return html`<section class="doc-panel wide"><h2>${ui("component.anatomy")}</h2><div class="button-anatomy">${anatomy.map((item, index) => `<article><b>${index + 1}</b><div><strong>${item.part}</strong><p>${item.rule}</p><div class="token-list">${item.tokens.map((token) => `<code>${token}</code>`).join("")}</div></div></article>`).join("")}</div></section>`;
}

function textAreaAccessibilityPanel() {
  const accessibility = componentSectionData("text-area", "accessibility");
  return html`<section class="doc-panel wide"><h2>${ui("component.accessibility")}</h2><p>State precedence: ${accessibility.statePrecedence}.</p><div class="checklist-grid">${(accessibility.items ?? []).map((item) => `<article>${icon("check_circle", { tone: "success", fill: true })}<span>${item}</span></article>`).join("")}</div></section>`;
}

function textAreaVariantsPanel() {
  const variants = componentDemoData("text-area", "variants");
  return html`<section class="doc-panel wide"><h2>${ui("component.variants")}</h2><p>${componentSectionCopy("text-area", "variants")}</p><div class="button-demo-grid states-grid">${variants.map((demo) => demoCell(demo.label, textAreaDemoFromData(demo))).join("")}</div></section>`;
}

function textAreaStatesPanel() {
  const states = componentDemoData("text-area", "states");
  return html`<section class="doc-panel wide"><h2>${ui("component.states")}</h2><p>${componentSectionCopy("text-area", "states")}</p><div class="button-demo-grid states-grid">${states.map((demo) => demoCell(demo.label, textAreaDemoFromData(demo))).join("")}</div></section>`;
}

function textAreaStateVariantMatrixPanel() {
  const rows = componentDemoData("text-area", "variant-state-behavior", "rows");
  const states = componentDemoData("text-area", "variant-state-behavior", "states");
  return html`<section class="doc-panel wide"><h2>${ui("component.variantStateBehavior")}</h2><p>${componentSectionCopy("text-area", "variant-state-behavior")}</p><div class="button-demo-grid state-behavior-grid">${rows.flatMap((row) => states.map((state) => demoCell(`${row.label} · ${state}`, textAreaDemo(row.field, stateValue(row, state), row.placeholder, stateHelper(row, state), row.rows, row.maxLength, "sm", state)))).join("")}</div></section>`;
}

function textAreaFullWidthPanel() {
  const items = componentDemoData("text-area", "full-width", "items");
  return html`<section class="doc-panel wide"><h2>${ui("component.fullWidth")}</h2><p>${componentSectionCopy("text-area", "full-width")}</p><div class="full-width-demo">${items.map((item) => `<div><span class="overline">${item.label}</span>${item.layout === "container" ? `<div class="container-demo">${item.demos.map((demo) => `<div data-span="${demo.span}">${textAreaDemoFromData(demo)}</div>`).join("")}</div>` : `<div class="button-stack${item.layout === "stack-natural" ? " natural" : ""}">${textAreaDemoFromData(item.demo)}</div>`}</div>`).join("")}</div></section>`;
}

function textAreaResponsivePanel() {
  const examples = componentDemoData("text-area", "responsive-layout-patterns", "examples");
  return html`<section class="doc-panel wide"><h2>${ui("component.responsiveLayoutPatterns")}</h2><p>${componentSectionCopy("text-area", "responsive-layout-patterns")}</p><div class="responsive-actions-demo">${examples.map((example) => `<article><span class="overline">${example.label}</span><div class="${example.layout}" data-density-context="${example.density}">${(example.demos ?? []).map((demo) => textAreaDemoFromData({ ...demo, density: example.density })).join("")}</div></article>`).join("")}</div></section>`;
}

function textAreaViewportOrganizationPanel() {
  const items = componentDemoData("text-area", "viewport-organization", "items");
  return html`<section class="doc-panel wide button-viewport-panel"><h2>${ui("component.viewportOrganization")}</h2><p>${componentSectionCopy("text-area", "viewport-organization")}</p><div class="viewport-doc-grid">${items.map((item) => `<article data-density-context="${item.density}"><header>${icon(item.icon, { tone: "action" })}<h3>${item.title}</h3></header><p>${item.rule}</p><code>${item.title}</code>${textAreaDemoFromData(item.demo)}</article>`).join("")}</div></section>`;
}

function textAreaPlaygroundPanel() {
  const playground = componentSectionData("text-area", "playground");
  return html`<section class="doc-panel wide button-playground" data-component-playground="text-area" data-ready="false"><h2>${ui("component.playground")}</h2><p>${componentSectionCopy("text-area", "playground")}</p><div class="playground-layout"><div class="playground-controls" aria-label="${ui("playground.textAreaControls")}">${playgroundStaticControls(playground.controls ?? [], "data-component-playground-input")}</div><div class="playground-preview"><div data-component-preview data-density-context="${playground.preview?.density ?? "md"}">${textAreaDemoFromData(playground.preview ?? {})}</div><pre data-component-markup>${playground.snippet ?? ""}</pre></div></div></section>`;
}

function textAreaContractPanel() {
  const props = componentApiProps("text-area");
  return html`<section class="doc-panel wide"><h2>${ui("build.apiAndFoundations")}</h2><p>${componentSectionCopy("text-area", "api-foundations")}</p><div class="props-table"><div><strong>${ui("table.prop")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>${props.map((prop) => `<div><code>${prop.name}</code><span>${prop.type}</span><span>${prop.required}</span><span>${prop.notes}</span></div>`).join("")}</div></section>`;
}

function textAreaGuidelinesPanel() {
  const groups = componentSectionData("text-area", "guidelines").groups ?? [];
  return html`<section class="doc-panel wide"><h2>${ui("guidelines.title")}</h2><div class="guidelines-grid">${groups.map((group) => `<article><h3>${group.title}</h3><ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`).join("")}</div></section>`;
}

function textAreaTestPanel() {
  const tests = componentSectionData("text-area", "tests-rejection-rules");
  return html`<section class="doc-panel wide"><h2>${ui("tests.title")}</h2><div class="two-column-list"><article><h3>${ui("tests.mustTest")}</h3><ul>${(tests.mustTest ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article><article><h3>${ui("tests.rejectIf")}</h3><ul>${(tests.rejectIf ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article></div></section>`;
}

function textAreaDemoFromData(demo) {
  return textAreaDemo(demo.field, demo.value ?? "", demo.placeholder ?? "", demo.helper ?? "", demo.rows ?? 3, demo.maxLength, demo.density ?? "md", demo.state ?? "default");
}

export function textAreaDemo(label, value = "", placeholder = "", helper = "", rows = 3, maxLength, density = "md", state = "default") {
  const implemented = componentDemo("text-area", { field: label, value, placeholder, helper, rows, maxLength, density, state });
  if (implemented) return implemented;
  const id = `text-area-${slug(`${label}-${density}-${state}`)}`;
  const blocked = ["disabled", "loading"].includes(state);
  const count = Number.isFinite(Number(maxLength));
  const currentLength = String(value ?? "").length;
  return html`
    <label class="text-area-demo" data-state="${state}" data-density-context="${density}" for="${id}">
      <span class="text-area-demo__label">${label}</span>
      <span class="text-area-demo__surface">
        <textarea id="${id}" rows="${rows}" placeholder="${placeholder}" maxlength="${count ? maxLength : ""}" aria-invalid="${state === "error"}" ${blocked ? "disabled" : ""}>${value ?? ""}</textarea>
        ${count ? `<span class="text-area-demo__counter" data-text-area-counter>${currentLength}/${maxLength}</span>` : ""}
        ${state === "loading" ? icon("progress_activity", { tone: "action", size: "sm" }) : ""}
      </span>
      <small>${state === "error" ? icon("error", { tone: "danger", size: "sm", fill: true }) : ""}<span>${helper}</span></small>
    </label>
  `;
}

function stateValue(row, state) {
  if (state === "default" || state === "focus") return "";
  if (state === "error") return "Ok";
  return row.value ?? "";
}

function stateHelper(row, state) {
  if (state === "loading") return "Checking policy language.";
  if (state === "error") return "Use at least 20 characters.";
  if (state === "disabled") return "Managed by policy.";
  return row.helper ?? "Operational note.";
}
