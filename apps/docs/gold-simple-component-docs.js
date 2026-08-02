import { componentMielPanel, componentSectionCopy, componentSectionData, componentDemoData, componentApiProps, demoCell, html, icon, ui } from "./gold-component-core.js?v=211";
import { playgroundStaticControls } from "./gold-component-data.js?v=203";
import { componentDemo } from "./component-demo.js?v=60";

export function simpleDemo(component, demo = {}) {
  return componentDemo(component, demo) || "";
}

const wideDemoComponents = new Set([
  "breadcrumbs",
  "chart-panel",
  "date-range-picker",
  "pagination",
  "progress-indicator",
  "segmented-control",
  "slider",
  "stepper",
  "station-pin",
  "tabs",
]);

const fullDemoComponents = new Set([
  "skeleton",
  "table",
]);

function demoGridClass(component, mode = "states") {
  const classes = ["button-demo-grid", mode === "matrix" ? "state-behavior-grid" : "states-grid"];
  if (wideDemoComponents.has(component)) classes.push("docs-demo-grid--wide");
  if (fullDemoComponents.has(component)) classes.push("docs-demo-grid--full");
  if (component === "tabs") classes.push("tabs-doc-demo-grid");
  if (component === "table") classes.push("table-doc-demo-grid");
  return classes.join(" ");
}

function demoLayoutClass(component, baseClass = "") {
  const classes = [baseClass, `docs-demo-layout--${component}`];
  if (wideDemoComponents.has(component)) classes.push("docs-demo-layout--wide");
  if (fullDemoComponents.has(component)) classes.push("docs-demo-layout--full");
  return classes.filter(Boolean).join(" ");
}

export function simpleOperationalExamplePanel(component, demoFromData) {
  const scenario = componentSectionData(component, "operational-example").scenario;
  const demos = scenario.demo ? [scenario.demo] : (scenario.items ?? []);
  const semanticDecision = scenario.semanticDecision
    ? html`
        <div class="fleet-panel-mini component-decision-panel">
          <strong>${scenario.semanticDecision.title}</strong>
          <dl>
            ${(scenario.semanticDecision.rows ?? [])
              .map((row) => `<div><dt>${row.label}</dt><dd>${row.value}</dd></div>`)
              .join("")}
          </dl>
        </div>
      `
    : "";
  return html`
    <section class="doc-panel wide button-operational-panel">
      <h2>${ui("component.operationalExample")}</h2>
      <p>${componentSectionCopy(component, "operational-example")}</p>
      <div class="${demoLayoutClass(component, "simple-scenario")}">
        <div class="simple-console" data-density-context="md">
          <header>${icon(scenario.icon, { tone: "action", fill: true })}<div><strong>${scenario.title}</strong><small>${scenario.meta}</small></div></header>
          <div class="${demoLayoutClass(component, "simple-demo-row")}">${demos.map(demoFromData).join("")}</div>
        </div>
        <div class="fleet-panel-mini">
          <strong>${scenario.rationaleTitle}</strong>
          <ul>${(scenario.rationale ?? []).map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
        ${semanticDecision}
      </div>
    </section>
  `;
}

export function simpleAnatomyPanel(component) {
  const anatomy = componentSectionData(component, "anatomy").items ?? [];
  return html`<section class="doc-panel wide"><h2>${ui("component.anatomy")}</h2><div class="button-anatomy">${anatomy.map((item, index) => `<article><b>${index + 1}</b><div><strong>${item.part}</strong><p>${item.rule}</p><div class="token-list">${(item.tokens ?? []).map((token) => `<code>${token}</code>`).join("")}</div></div></article>`).join("")}</div></section>`;
}

export function simpleAccessibilityPanel(component) {
  const accessibility = componentSectionData(component, "accessibility");
  return html`<section class="doc-panel wide"><h2>${ui("component.accessibility")}</h2><p>State precedence: ${accessibility.statePrecedence}.</p><div class="checklist-grid">${(accessibility.items ?? []).map((item) => `<article>${icon("check_circle", { tone: "success", fill: true })}<span>${item}</span></article>`).join("")}</div></section>`;
}

export function simpleVariantsPanel(component, demoFromData) {
  const variants = componentDemoData(component, "variants");
  const gridClass = demoGridClass(component);
  return html`<section class="doc-panel wide"><h2>${ui("component.variants")}</h2><p>${componentSectionCopy(component, "variants")}</p><div class="${gridClass}">${variants.map((demo) => demoCell(demo.label, demoFromData(demo))).join("")}</div></section>`;
}

export function simpleStatesPanel(component, demoFromData) {
  const states = componentDemoData(component, "states");
  const gridClass = demoGridClass(component);
  return html`<section class="doc-panel wide"><h2>${ui("component.states")}</h2><p>${componentSectionCopy(component, "states")}</p><div class="${gridClass}">${states.map((demo) => demoCell(demo.label, demoFromData(demo))).join("")}</div></section>`;
}

export function simpleStateVariantMatrixPanel(component, demoFromData) {
  const matrix = componentSectionData(component, "variant-state-behavior");
  const gridClass = demoGridClass(component, "matrix");
  return html`<section class="doc-panel wide"><h2>${ui("component.variantStateBehavior")}</h2><p>${componentSectionCopy(component, "variant-state-behavior")}</p><div class="${gridClass}">${(matrix.rows ?? []).flatMap((row) => (matrix.states ?? []).map((state) => demoCell(`${row.label} · ${state}`, demoFromData({ ...(row.demo ?? {}), state })))).join("")}</div></section>`;
}

export function simpleFullWidthPanel(component, demoFromData) {
  const items = componentDemoData(component, "full-width", "items");
  const content = (item) => (item.demos ?? [item.demo]).filter(Boolean).map(demoFromData).join("");
  if (component === "toast") {
    return html`<section class="doc-panel wide"><h2>${ui("component.fullWidth")}</h2><p>${componentSectionCopy(component, "full-width")}</p><div class="responsive-actions-demo toast-full-width-demo">${items.map((item) => `<article><strong>${item.label}</strong><div class="toast-region-demo" data-toast-align="${item.align ?? "end"}">${content(item)}</div></article>`).join("")}</div></section>`;
  }
  return html`<section class="doc-panel wide"><h2>${ui("component.fullWidth")}</h2><p>${componentSectionCopy(component, "full-width")}</p><div class="${demoLayoutClass(component, "responsive-actions-demo")}">${items.map((item) => `<article><strong>${item.label}</strong><div class="${demoLayoutClass(component, item.layout === "row" ? "simple-demo-row" : "button-stack")}">${content(item)}</div></article>`).join("")}</div></section>`;
}

export function simpleResponsivePanel(component, demoFromData) {
  const examples = componentDemoData(component, "responsive-layout-patterns", "examples");
  return html`<section class="doc-panel wide"><h2>${ui("component.responsiveLayoutPatterns")}</h2><p>${componentSectionCopy(component, "responsive-layout-patterns")}</p><div class="${demoLayoutClass(component, "responsive-actions-demo")}">${examples.map((example) => `<article data-density-context="${example.density ?? "md"}"><strong>${example.label}</strong><div class="${demoLayoutClass(component, example.layout ?? "simple-demo-row")}">${(example.demos ?? []).map((demo) => demoFromData({ ...demo, density: demo.density ?? example.density })).join("")}</div></article>`).join("")}</div></section>`;
}

export function simpleViewportOrganizationPanel(component, demoFromData) {
  const items = componentDemoData(component, "viewport-organization", "items");
  return html`<section class="doc-panel wide button-viewport-panel"><h2>${ui("component.viewportOrganization")}</h2><p>${componentSectionCopy(component, "viewport-organization")}</p><div class="${demoLayoutClass(component, "viewport-doc-grid")}">${items.map((item) => `<article data-density-context="${item.density}"><header>${icon(item.icon)}<h3>${item.title}</h3></header><p>${item.rule}</p><code>${item.layout}</code><div class="${demoLayoutClass(component, "simple-viewport-demo")}" data-demo-layout="${item.layout ?? "inline"}">${demoFromData({ ...(item.demo ?? {}), density: item.demo?.density ?? item.density })}</div></article>`).join("")}</div></section>`;
}

export function simplePlaygroundPanel(component, demoFromData) {
  const playground = componentSectionData(component, "playground");
  return html`<section class="doc-panel wide button-playground" data-component-playground="${component}"><h2>${ui("component.playground")}</h2><p>${componentSectionCopy(component, "playground")}</p><div class="playground-layout"><div class="playground-controls" role="group" aria-label="${ui(`playground.${component.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}Controls`)}">${playgroundStaticControls(playground.controls ?? [], "data-component-playground-input")}</div><div class="playground-preview"><div data-component-preview data-density-context="${playground.preview?.density ?? "md"}">${demoFromData(playground.preview ?? {})}</div><pre data-component-markup>${playground.snippet ?? ""}</pre></div></div></section>`;
}

export function simpleGuidelinesPanel(component) {
  const groups = componentSectionData(component, "guidelines").groups ?? [];
  return html`<section class="doc-panel wide"><h2>${ui("guidelines.title")}</h2><div class="guidelines-grid">${groups.map((group) => `<article><h3>${group.title}</h3><ul>${(group.items ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article>`).join("")}</div></section>`;
}

export function simpleContractPanel(component) {
  const props = componentApiProps(component);
  return html`<section class="doc-panel wide"><h2>${ui("build.apiAndFoundations")}</h2><p>${componentSectionCopy(component, "api-foundations")}</p><div class="comparison-table"><div><strong>${ui("table.prop")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>${props.map((prop) => `<div><code>${prop.name}</code><span>${prop.type}</span><span>${prop.required}</span><span>${prop.notes}</span></div>`).join("")}</div></section>`;
}

export function simpleTestPanel(component) {
  const tests = componentSectionData(component, "tests-rejection-rules");
  return html`<section class="doc-panel wide"><h2>${ui("tests.title")}</h2><div class="guidelines-grid"><article><h3>${ui("tests.mustTest")}</h3><ul>${(tests.mustTest ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article><article><h3>${ui("tests.rejectIf")}</h3><ul>${(tests.rejectIf ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article></div></section>`;
}

export function renderSimpleGoldSection(entry, section, demoFromData) {
  const renderers = {
    "operational-example": () => simpleOperationalExamplePanel(entry.id, demoFromData),
    anatomy: () => simpleAnatomyPanel(entry.id),
    accessibility: () => simpleAccessibilityPanel(entry.id),
    variants: () => simpleVariantsPanel(entry.id, demoFromData),
    states: () => simpleStatesPanel(entry.id, demoFromData),
    "variant-state-behavior": () => simpleStateVariantMatrixPanel(entry.id, demoFromData),
    "full-width": () => simpleFullWidthPanel(entry.id, demoFromData),
    "responsive-layout-patterns": () => simpleResponsivePanel(entry.id, demoFromData),
    "viewport-organization": () => simpleViewportOrganizationPanel(entry.id, demoFromData),
    playground: () => simplePlaygroundPanel(entry.id, demoFromData),
    guidelines: () => simpleGuidelinesPanel(entry.id),
    "api-foundations": () => simpleContractPanel(entry.id),
    "tests-rejection-rules": () => simpleTestPanel(entry.id),
    miel: () => componentMielPanel(entry),
  };
  return renderers[section]?.() ?? "";
}
