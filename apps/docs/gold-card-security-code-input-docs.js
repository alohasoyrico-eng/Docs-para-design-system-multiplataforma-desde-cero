import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderCardSecurityCodeInputGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, cardSecurityCodeInputDemoFromData); }
export function cardSecurityCodeInputDemo(label = "Security code", value = "482", state = "default") { return simpleDemo("card-security-code-input", { label, value, state }); }
export function cardSecurityCodeInputDemoFromData(demo = {}) { return simpleDemo("card-security-code-input", demo); }
function cardSecurityCodeInputOperationalExamplePanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "operational-example", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputAnatomyPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "anatomy", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputAccessibilityPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "accessibility", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputVariantsPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "variants", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputStatesPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "states", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "variant-state-behavior", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputFullWidthPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "full-width", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputResponsivePanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "responsive-layout-patterns", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "viewport-organization", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputPlaygroundPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "playground", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputContractPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "api-foundations", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputGuidelinesPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "guidelines", cardSecurityCodeInputDemoFromData); }
function cardSecurityCodeInputTestPanel() { return renderSimpleGoldSection({ id: "card-security-code-input" }, "tests-rejection-rules", cardSecurityCodeInputDemoFromData); }
