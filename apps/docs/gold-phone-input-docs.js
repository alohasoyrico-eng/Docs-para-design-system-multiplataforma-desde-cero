import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderPhoneInputGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, phoneInputDemoFromData); }
export function phoneInputDemo(label = "Phone number", value = "+52 55 1842 9011", state = "default") { return simpleDemo("phone-input", { label, value, state }); }
export function phoneInputDemoFromData(demo = {}) { return simpleDemo("phone-input", demo); }
function phoneInputOperationalExamplePanel() { return renderSimpleGoldSection({ id: "phone-input" }, "operational-example", phoneInputDemoFromData); }
function phoneInputAnatomyPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "anatomy", phoneInputDemoFromData); }
function phoneInputAccessibilityPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "accessibility", phoneInputDemoFromData); }
function phoneInputVariantsPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "variants", phoneInputDemoFromData); }
function phoneInputStatesPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "states", phoneInputDemoFromData); }
function phoneInputStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "variant-state-behavior", phoneInputDemoFromData); }
function phoneInputFullWidthPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "full-width", phoneInputDemoFromData); }
function phoneInputResponsivePanel() { return renderSimpleGoldSection({ id: "phone-input" }, "responsive-layout-patterns", phoneInputDemoFromData); }
function phoneInputViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "viewport-organization", phoneInputDemoFromData); }
function phoneInputPlaygroundPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "playground", phoneInputDemoFromData); }
function phoneInputContractPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "api-foundations", phoneInputDemoFromData); }
function phoneInputGuidelinesPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "guidelines", phoneInputDemoFromData); }
function phoneInputTestPanel() { return renderSimpleGoldSection({ id: "phone-input" }, "tests-rejection-rules", phoneInputDemoFromData); }
