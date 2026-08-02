import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderCodeInputGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, codeInputDemoFromData); }
export function codeInputDemo(label = "Security code", value = "428195", state = "default") { return simpleDemo("code-input", { label, value, state }); }
export function codeInputDemoFromData(demo = {}) { return simpleDemo("code-input", demo); }
function codeInputOperationalExamplePanel() { return renderSimpleGoldSection({ id: "code-input" }, "operational-example", codeInputDemoFromData); }
function codeInputAnatomyPanel() { return renderSimpleGoldSection({ id: "code-input" }, "anatomy", codeInputDemoFromData); }
function codeInputAccessibilityPanel() { return renderSimpleGoldSection({ id: "code-input" }, "accessibility", codeInputDemoFromData); }
function codeInputVariantsPanel() { return renderSimpleGoldSection({ id: "code-input" }, "variants", codeInputDemoFromData); }
function codeInputStatesPanel() { return renderSimpleGoldSection({ id: "code-input" }, "states", codeInputDemoFromData); }
function codeInputStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "code-input" }, "variant-state-behavior", codeInputDemoFromData); }
function codeInputFullWidthPanel() { return renderSimpleGoldSection({ id: "code-input" }, "full-width", codeInputDemoFromData); }
function codeInputResponsivePanel() { return renderSimpleGoldSection({ id: "code-input" }, "responsive-layout-patterns", codeInputDemoFromData); }
function codeInputViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "code-input" }, "viewport-organization", codeInputDemoFromData); }
function codeInputPlaygroundPanel() { return renderSimpleGoldSection({ id: "code-input" }, "playground", codeInputDemoFromData); }
function codeInputContractPanel() { return renderSimpleGoldSection({ id: "code-input" }, "api-foundations", codeInputDemoFromData); }
function codeInputGuidelinesPanel() { return renderSimpleGoldSection({ id: "code-input" }, "guidelines", codeInputDemoFromData); }
function codeInputTestPanel() { return renderSimpleGoldSection({ id: "code-input" }, "tests-rejection-rules", codeInputDemoFromData); }
