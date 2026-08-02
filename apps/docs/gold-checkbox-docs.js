import { componentMielPanel, componentSectionCopy, componentSectionData, componentDemoData, componentApiProps, demoCell, html, icon, ui, slug } from "./gold-component-core.js?v=211";
import { componentDemo } from "./component-demo.js?v=60";
import { playgroundStaticControls } from "./gold-component-data.js?v=202";

export function renderCheckboxGoldSection(entry, section) {
  const renderers = {
    "operational-example": () => checkboxOperationalExamplePanel(),
    anatomy: () => checkboxAnatomyPanel(),
    accessibility: () => checkboxAccessibilityPanel(),
    variants: () => checkboxVariantsPanel(),
    states: () => checkboxStatesPanel(),
    "variant-state-behavior": () => checkboxStateVariantMatrixPanel(),
    "full-width": () => checkboxFullWidthPanel(),
    "responsive-layout-patterns": () => checkboxResponsivePanel(),
    "viewport-organization": () => checkboxViewportOrganizationPanel(),
    playground: () => checkboxPlaygroundPanel(),
    guidelines: () => checkboxGuidelinesPanel(),
    "api-foundations": () => checkboxContractPanel(),
    "tests-rejection-rules": () => checkboxTestPanel(),
    miel: () => componentMielPanel(entry),
  };
  return renderers[section]?.() ?? "";
}

function checkboxOperationalExamplePanel() {
  const scenario = componentSectionData("checkbox", "operational-example").scenario;
  return html`
    <section class="doc-panel wide button-operational-panel">
      <h2>${ui("component.operationalExample")}</h2>
      <p>${componentSectionCopy("checkbox", "operational-example")}</p>
      <div class="checkbox-scenario">
        <div class="checkbox-console">
          <header>${icon("checklist", { tone: "action", fill: true })}<div><strong>Driver permissions</strong><small>Selection and policy controls</small></div></header>
          <div class="checkbox-stack">${(scenario.items ?? []).map(checkboxDemoFromData).join("")}</div>
        </div>
        <div class="fleet-panel-mini">
          <strong>${scenario.rationaleTitle}</strong>
          <ul>${(scenario.rationale ?? []).map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
    </section>
  `;
}

function checkboxAnatomyPanel() {
  const anatomy = componentSectionData("checkbox", "anatomy").items ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.anatomy")}</h2>
      <div class="button-anatomy">
        ${anatomy.map((item, index) => html`
          <article><b>${index + 1}</b><div><strong>${item.part}</strong><p>${item.rule}</p><div class="token-list">${item.tokens.map((token) => `<code>${token}</code>`).join("")}</div></div></article>
        `).join("")}
      </div>
    </section>
  `;
}

function checkboxAccessibilityPanel() {
  const accessibility = componentSectionData("checkbox", "accessibility");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.accessibility")}</h2>
      <p>State precedence: ${accessibility.statePrecedence}.</p>
      <div class="checklist-grid">${(accessibility.items ?? []).map((item) => `<article>${icon("check_circle", { tone: "success", fill: true })}<span>${item}</span></article>`).join("")}</div>
    </section>
  `;
}

function checkboxVariantsPanel() {
  const variants = componentDemoData("checkbox", "variants");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.variants")}</h2>
      <p>${componentSectionCopy("checkbox", "variants")}</p>
      <div class="button-demo-grid states-grid">${variants.map((demo) => demoCell(demo.label, checkboxDemoFromData(demo))).join("")}</div>
    </section>
  `;
}

function checkboxStatesPanel() {
  const states = componentDemoData("checkbox", "states");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.states")}</h2>
      <p>${componentSectionCopy("checkbox", "states")}</p>
      <div class="button-demo-grid states-grid">${states.map((demo) => demoCell(demo.label, checkboxDemoFromData(demo))).join("")}</div>
    </section>
  `;
}

function checkboxStateVariantMatrixPanel() {
  const rows = componentDemoData("checkbox", "variant-state-behavior", "rows");
  const states = componentDemoData("checkbox", "variant-state-behavior", "states");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.variantStateBehavior")}</h2>
      <p>${componentSectionCopy("checkbox", "variant-state-behavior")}</p>
      <div class="button-demo-grid state-behavior-grid">
        ${rows.flatMap((row) => states.map((state) => demoCell(`${row.label} · ${state}`, checkboxDemoFromData(stateDemo(row.choice, state))))).join("")}
      </div>
    </section>
  `;
}

function checkboxFullWidthPanel() {
  const items = componentDemoData("checkbox", "full-width", "items");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.fullWidth")}</h2>
      <p>${componentSectionCopy("checkbox", "full-width")}</p>
      <div class="full-width-demo">
        ${items.map((item) => html`
          <div><span class="overline">${item.label}</span>
            ${item.layout === "container" ? `<div class="container-demo">${item.demos.map((demo) => `<div data-span="${demo.span}">${checkboxDemoFromData(demo)}</div>`).join("")}</div>` : `<div class="button-stack${item.layout === "natural" ? " natural" : ""}">${checkboxDemoFromData(item.demo)}</div>`}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function checkboxResponsivePanel() {
  const examples = componentDemoData("checkbox", "responsive-layout-patterns", "examples");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.responsiveLayoutPatterns")}</h2>
      <p>${componentSectionCopy("checkbox", "responsive-layout-patterns")}</p>
      <div class="responsive-actions-demo">
        ${examples.map((example) => html`
          <article><span class="overline">${example.label}</span>
            <div class="${example.layout}" data-density-context="${example.density}">${(example.demos ?? []).map((demo) => checkboxDemoFromData({ ...demo, density: example.density })).join("")}</div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function checkboxViewportOrganizationPanel() {
  const items = componentDemoData("checkbox", "viewport-organization", "items");
  return html`
    <section class="doc-panel wide button-viewport-panel">
      <h2>${ui("component.viewportOrganization")}</h2>
      <p>${componentSectionCopy("checkbox", "viewport-organization")}</p>
      <div class="viewport-doc-grid">
        ${items.map((item) => html`
          <article data-density-context="${item.density}"><header>${icon(item.icon, { tone: "action" })}<h3>${item.title}</h3></header><p>${item.rule}</p><code>${item.title}</code>${checkboxDemoFromData(item.demo)}</article>
        `).join("")}
      </div>
    </section>
  `;
}

function checkboxPlaygroundPanel() {
  const playground = componentSectionData("checkbox", "playground");
  return html`
    <section class="doc-panel wide button-playground" data-component-playground="checkbox" data-ready="false">
      <h2>${ui("component.playground")}</h2>
      <p>${componentSectionCopy("checkbox", "playground")}</p>
      <div class="playground-layout">
        <div class="playground-controls" aria-label="${ui("playground.checkboxControls")}">${playgroundStaticControls(playground.controls ?? [], "data-component-playground-input")}</div>
        <div class="playground-preview"><div data-component-preview data-density-context="${playground.preview?.density ?? "md"}">${checkboxDemoFromData(playground.preview ?? {})}</div><pre data-component-markup>${playground.snippet ?? ""}</pre></div>
      </div>
    </section>
  `;
}

function checkboxContractPanel() {
  const props = componentApiProps("checkbox");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("build.apiAndFoundations")}</h2>
      <p>${componentSectionCopy("checkbox", "api-foundations")}</p>
      <div class="props-table"><div><strong>${ui("table.prop")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>${props.map((prop) => `<div><code>${prop.name}</code><span>${prop.type}</span><span>${prop.required}</span><span>${prop.notes}</span></div>`).join("")}</div>
    </section>
  `;
}

function checkboxGuidelinesPanel() {
  const groups = componentSectionData("checkbox", "guidelines").groups ?? [];
  return html`<section class="doc-panel wide"><h2>${ui("guidelines.title")}</h2><div class="guidelines-grid">${groups.map((group) => `<article><h3>${group.title}</h3><ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`).join("")}</div></section>`;
}

function checkboxTestPanel() {
  const tests = componentSectionData("checkbox", "tests-rejection-rules");
  return html`<section class="doc-panel wide"><h2>${ui("tests.title")}</h2><div class="two-column-list"><article><h3>${ui("tests.mustTest")}</h3><ul>${(tests.mustTest ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article><article><h3>${ui("tests.rejectIf")}</h3><ul>${(tests.rejectIf ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article></div></section>`;
}

function checkboxDemoFromData(demo) {
  return checkboxDemo(demo.label, demo.description ?? "", demo.checked ?? false, demo.indeterminate ?? false, demo.state ?? "unchecked", demo.density ?? "md", demo.variant ?? "default", demo.error ?? "");
}

export function checkboxDemo(label, description = "", checked = false, indeterminate = false, state = "unchecked", density = "md", variant = "default", error = "") {
  const implemented = componentDemo("checkbox", { label, description, checked, indeterminate, state, density, variant, error });
  if (implemented) return implemented;
  const id = `checkbox-${slug(`${label}-${state}-${density}`)}`;
  const isChecked = state === "checked" || (checked && state !== "unchecked");
  const isMixed = state === "indeterminate" || indeterminate;
  const ariaChecked = isMixed ? "mixed" : String(isChecked);
  const disabled = state === "disabled";
  const symbol = isMixed ? "remove" : isChecked ? "check" : "";
  return html`
    <label class="checkbox-demo" data-state="${state}" data-density-context="${density}" data-checked="${isChecked}" data-indeterminate="${isMixed}" for="${id}">
      <span class="checkbox-demo__control">
        <input id="${id}" type="checkbox" aria-checked="${ariaChecked}" ${isChecked ? "checked" : ""} ${disabled ? "disabled" : ""} />
        <span class="checkbox-demo__box" aria-hidden="true">${symbol ? icon(symbol, { tone: "current", size: "sm", fill: true }) : ""}</span>
      </span>
      <span class="checkbox-demo__copy"><strong>${label}</strong>${description ? `<small>${state === "error" ? icon("error", { tone: "danger", size: "sm", fill: true }) : ""}<span>${description}</span></small>` : ""}</span>
    </label>
  `;
}

function stateDemo(choice, state) {
  return {
    ...choice,
    state,
    checked: state === "checked" || state === "disabled",
    indeterminate: state === "indeterminate",
    description: state === "error" ? "Required before continuing." : choice.description,
  };
}
