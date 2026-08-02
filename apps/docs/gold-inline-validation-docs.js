import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderInlineValidationGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, inlineValidationDemoFromData); }
export function inlineValidationDemo(label = "Driver email", value = "ana@", message = "Enter a complete email address.", state = "error", fullWidth = false) { return simpleDemo("inline-validation", { label, value, message, state, fullWidth }); }
export function inlineValidationDemoFromData(demo = {}) { return simpleDemo("inline-validation", demo); }
function inlineValidationOperationalExamplePanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "operational-example", inlineValidationDemoFromData); }
function inlineValidationAnatomyPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "anatomy", inlineValidationDemoFromData); }
function inlineValidationAccessibilityPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "accessibility", inlineValidationDemoFromData); }
function inlineValidationVariantsPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "variants", inlineValidationDemoFromData); }
function inlineValidationStatesPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "states", inlineValidationDemoFromData); }
function inlineValidationStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "variant-state-behavior", inlineValidationDemoFromData); }
function inlineValidationFullWidthPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "full-width", inlineValidationDemoFromData); }
function inlineValidationResponsivePanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "responsive-layout-patterns", inlineValidationDemoFromData); }
function inlineValidationViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "viewport-organization", inlineValidationDemoFromData); }
function inlineValidationPlaygroundPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "playground", inlineValidationDemoFromData); }
function inlineValidationGuidelinesPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "guidelines", inlineValidationDemoFromData); }
function inlineValidationContractPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "api-foundations", inlineValidationDemoFromData); }
function inlineValidationTestPanel() { return renderSimpleGoldSection({ id: "inline-validation" }, "tests-rejection-rules", inlineValidationDemoFromData); }
