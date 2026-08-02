import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderCardExpiryInputGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, cardExpiryInputDemoFromData); }
export function cardExpiryInputDemo(label = "Expiry date", value = "12/28", state = "default") { return simpleDemo("card-expiry-input", { label, value, state }); }
export function cardExpiryInputDemoFromData(demo = {}) { return simpleDemo("card-expiry-input", demo); }
function cardExpiryInputOperationalExamplePanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "operational-example", cardExpiryInputDemoFromData); }
function cardExpiryInputAnatomyPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "anatomy", cardExpiryInputDemoFromData); }
function cardExpiryInputAccessibilityPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "accessibility", cardExpiryInputDemoFromData); }
function cardExpiryInputVariantsPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "variants", cardExpiryInputDemoFromData); }
function cardExpiryInputStatesPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "states", cardExpiryInputDemoFromData); }
function cardExpiryInputStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "variant-state-behavior", cardExpiryInputDemoFromData); }
function cardExpiryInputFullWidthPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "full-width", cardExpiryInputDemoFromData); }
function cardExpiryInputResponsivePanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "responsive-layout-patterns", cardExpiryInputDemoFromData); }
function cardExpiryInputViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "viewport-organization", cardExpiryInputDemoFromData); }
function cardExpiryInputPlaygroundPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "playground", cardExpiryInputDemoFromData); }
function cardExpiryInputContractPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "api-foundations", cardExpiryInputDemoFromData); }
function cardExpiryInputGuidelinesPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "guidelines", cardExpiryInputDemoFromData); }
function cardExpiryInputTestPanel() { return renderSimpleGoldSection({ id: "card-expiry-input" }, "tests-rejection-rules", cardExpiryInputDemoFromData); }
