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
  renderSimpleGoldSection,
} from "./gold-simple-component-docs.js?v=253";
import { componentMielPanel } from "./gold-component-core.js?v=211";

export function countrySelectorDemo(value = "MX", state = "default", inline = false) {
  return simpleDemo("country-selector", { value, state, inline });
}
export function countrySelectorDemoFromData(demo = {}) { return simpleDemo("country-selector", demo); }

export function renderCountrySelectorGoldSection(entry, section) {
  const renderers = {
    "operational-example": () => countrySelectorOperationalExamplePanel(),
    anatomy: () => countrySelectorAnatomyPanel(),
    accessibility: () => countrySelectorAccessibilityPanel(),
    variants: () => countrySelectorVariantsPanel(),
    states: () => countrySelectorStatesPanel(),
    "variant-state-behavior": () => countrySelectorStateVariantMatrixPanel(),
    "full-width": () => countrySelectorFullWidthPanel(),
    "responsive-layout-patterns": () => countrySelectorResponsivePanel(),
    "viewport-organization": () => countrySelectorViewportOrganizationPanel(),
    playground: () => countrySelectorPlaygroundPanel(),
    guidelines: () => countrySelectorGuidelinesPanel(),
    "api-foundations": () => countrySelectorContractPanel(),
    "tests-rejection-rules": () => countrySelectorTestPanel(),
    miel: () => componentMielPanel(entry),
  };
  return renderers[section]?.() ?? "";
}

export function countrySelectorOperationalExamplePanel() { return simpleOperationalExamplePanel("country-selector", countrySelectorDemoFromData); }
export function countrySelectorAnatomyPanel() { return simpleAnatomyPanel("country-selector"); }
export function countrySelectorAccessibilityPanel() { return simpleAccessibilityPanel("country-selector"); }
export function countrySelectorVariantsPanel() { return simpleVariantsPanel("country-selector", countrySelectorDemoFromData); }
export function countrySelectorStatesPanel() { return simpleStatesPanel("country-selector", countrySelectorDemoFromData); }
export function countrySelectorStateVariantMatrixPanel() { return simpleStateVariantMatrixPanel("country-selector", countrySelectorDemoFromData); }
export function countrySelectorFullWidthPanel() { return simpleFullWidthPanel("country-selector", countrySelectorDemoFromData); }
export function countrySelectorResponsivePanel() { return simpleResponsivePanel("country-selector", countrySelectorDemoFromData); }
export function countrySelectorViewportOrganizationPanel() { return simpleViewportOrganizationPanel("country-selector", countrySelectorDemoFromData); }
export function countrySelectorPlaygroundPanel() { return simplePlaygroundPanel("country-selector", countrySelectorDemoFromData); }
export function countrySelectorContractPanel() { return simpleContractPanel("country-selector"); }
export function countrySelectorGuidelinesPanel() { return simpleGuidelinesPanel("country-selector"); }
export function countrySelectorTestPanel() { return simpleTestPanel("country-selector"); }
