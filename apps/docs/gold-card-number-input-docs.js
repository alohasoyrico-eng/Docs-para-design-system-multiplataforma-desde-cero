import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderCardNumberInputGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, cardNumberInputDemoFromData); }
export function cardNumberInputDemo(label = "Card number", value = "4111 1111 1111 1111", state = "default") { return simpleDemo("card-number-input", { label, value, state }); }
export function cardNumberInputDemoFromData(demo = {}) { return simpleDemo("card-number-input", demo); }
function cardNumberInputOperationalExamplePanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "operational-example", cardNumberInputDemoFromData); }
function cardNumberInputAnatomyPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "anatomy", cardNumberInputDemoFromData); }
function cardNumberInputAccessibilityPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "accessibility", cardNumberInputDemoFromData); }
function cardNumberInputVariantsPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "variants", cardNumberInputDemoFromData); }
function cardNumberInputStatesPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "states", cardNumberInputDemoFromData); }
function cardNumberInputStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "variant-state-behavior", cardNumberInputDemoFromData); }
function cardNumberInputFullWidthPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "full-width", cardNumberInputDemoFromData); }
function cardNumberInputResponsivePanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "responsive-layout-patterns", cardNumberInputDemoFromData); }
function cardNumberInputViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "viewport-organization", cardNumberInputDemoFromData); }
function cardNumberInputPlaygroundPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "playground", cardNumberInputDemoFromData); }
function cardNumberInputContractPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "api-foundations", cardNumberInputDemoFromData); }
function cardNumberInputGuidelinesPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "guidelines", cardNumberInputDemoFromData); }
function cardNumberInputTestPanel() { return renderSimpleGoldSection({ id: "card-number-input" }, "tests-rejection-rules", cardNumberInputDemoFromData); }
