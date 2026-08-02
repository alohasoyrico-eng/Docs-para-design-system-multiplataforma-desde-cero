import {
  simpleAccessibilityPanel,
  simpleAnatomyPanel,
  simpleContractPanel,
  simpleDemo,
  simpleFullWidthPanel,
  simpleGuidelinesPanel,
  simpleOperationalExamplePanel,
  simplePlaygroundPanel,
  simpleResponsivePanel,
  simpleStateVariantMatrixPanel,
  simpleStatesPanel,
  simpleTestPanel,
  simpleVariantsPanel,
  simpleViewportOrganizationPanel,
} from "./gold-simple-component-docs.js?v=253";
import { componentMielPanel, componentSectionCopy, componentSectionData, html, icon, ui } from "./gold-component-core.js?v=211";
import { playgroundStaticControls } from "./gold-component-data.js?v=206";

export function comboboxDemo(label = "Vehicle", value = "MX-4821 - Ana Gomez", state = "filled") { return simpleDemo("combobox", { label, value, state }); }
export function comboboxDemoFromData(demo = {}) { return simpleDemo("combobox", demo); }

export function renderComboboxGoldSection(entry, section) {
  const renderers = {
    "operational-example": () => comboboxOperationalExamplePanel(),
    anatomy: () => comboboxAnatomyPanel(),
    accessibility: () => comboboxAccessibilityPanel(),
    variants: () => comboboxVariantsPanel(),
    states: () => comboboxStatesPanel(),
    "variant-state-behavior": () => comboboxStateVariantMatrixPanel(),
    "full-width": () => comboboxFullWidthPanel(),
    "responsive-layout-patterns": () => comboboxResponsivePanel(),
    "viewport-organization": () => comboboxViewportOrganizationPanel(),
    playground: () => comboboxPlaygroundPanel(),
    guidelines: () => comboboxGuidelinesPanel(),
    "api-foundations": () => comboboxContractPanel(),
    "tests-rejection-rules": () => comboboxTestPanel(),
    miel: () => componentMielPanel(entry),
  };
  return renderers[section]?.() ?? "";
}

export function comboboxOperationalExamplePanel() {
  const scenario = componentSectionData("combobox", "operational-example").scenario;
  return html`
    <section class="doc-panel wide button-operational-panel">
      <h2>${ui("component.operationalExample")}</h2>
      <p>${componentSectionCopy("combobox", "operational-example")}</p>
      <div class="simple-scenario">
        <div class="simple-console">
          <header>${icon(scenario.icon, { tone: "action", fill: true })}<div><strong>${scenario.title}</strong><small>${scenario.meta}</small></div></header>
          <div class="simple-demo-row">${(scenario.items ?? []).map(comboboxDemoFromData).join("")}</div>
        </div>
        <div class="fleet-panel-mini">
          <strong>${scenario.rationaleTitle}</strong>
          <ul>${(scenario.rationale ?? []).map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
    </section>
  `;
}
export function comboboxAnatomyPanel() { return simpleAnatomyPanel("combobox"); }
export function comboboxAccessibilityPanel() {
  const accessibility = componentSectionData("combobox", "accessibility");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.accessibility")}</h2>
      <p>State precedence: ${accessibility.statePrecedence}.</p>
      <div class="checklist-grid">${(accessibility.items ?? []).map((item) => `<article>${icon("check_circle", { tone: "success", fill: true })}<span>${item}</span></article>`).join("")}</div>
    </section>
  `;
}
export function comboboxVariantsPanel() { return simpleVariantsPanel("combobox", comboboxDemoFromData); }
export function comboboxStatesPanel() { return simpleStatesPanel("combobox", comboboxDemoFromData); }
export function comboboxStateVariantMatrixPanel() { return simpleStateVariantMatrixPanel("combobox", comboboxDemoFromData); }
export function comboboxFullWidthPanel() { return simpleFullWidthPanel("combobox", comboboxDemoFromData); }
export function comboboxResponsivePanel() { return simpleResponsivePanel("combobox", comboboxDemoFromData); }
export function comboboxViewportOrganizationPanel() { return simpleViewportOrganizationPanel("combobox", comboboxDemoFromData); }
export function comboboxPlaygroundPanel() {
  const playground = componentSectionData("combobox", "playground");
  return html`
    <section class="doc-panel wide button-playground" data-component-playground="combobox" data-ready="false">
      <h2>${ui("component.playground")}</h2>
      <p>${componentSectionCopy("combobox", "playground")}</p>
      <div class="playground-layout">
        <div class="playground-controls" aria-label="${ui("playground.comboboxControls")}">${playgroundStaticControls(playground.controls ?? [], "data-component-playground-input")}</div>
        <div class="playground-preview">
          <div data-component-preview data-density-context="${playground.preview?.density ?? "md"}">${comboboxDemoFromData(playground.preview ?? {})}</div>
          <pre data-component-markup>${playground.snippet ?? ""}</pre>
        </div>
      </div>
    </section>
  `;
}
export function comboboxContractPanel() { return simpleContractPanel("combobox"); }
export function comboboxGuidelinesPanel() { return simpleGuidelinesPanel("combobox"); }
export function comboboxTestPanel() { return simpleTestPanel("combobox"); }
