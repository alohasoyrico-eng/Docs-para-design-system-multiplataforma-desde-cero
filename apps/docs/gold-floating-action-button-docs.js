import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderFloatingActionButtonGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, floatingActionButtonDemoFromData); }
export function floatingActionButtonDemo(label = "Add movement", state = "default") { return simpleDemo("floating-action-button", { label, state, variant: "extended" }); }
export function floatingActionButtonDemoFromData(demo = {}) { return simpleDemo("floating-action-button", demo); }
function floatingActionButtonOperationalExamplePanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "operational-example", floatingActionButtonDemoFromData); }
function floatingActionButtonAnatomyPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "anatomy", floatingActionButtonDemoFromData); }
function floatingActionButtonAccessibilityPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "accessibility", floatingActionButtonDemoFromData); }
function floatingActionButtonVariantsPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "variants", floatingActionButtonDemoFromData); }
function floatingActionButtonStatesPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "states", floatingActionButtonDemoFromData); }
function floatingActionButtonStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "variant-state-behavior", floatingActionButtonDemoFromData); }
function floatingActionButtonFullWidthPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "full-width", floatingActionButtonDemoFromData); }
function floatingActionButtonResponsivePanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "responsive-layout-patterns", floatingActionButtonDemoFromData); }
function floatingActionButtonViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "viewport-organization", floatingActionButtonDemoFromData); }
function floatingActionButtonPlaygroundPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "playground", floatingActionButtonDemoFromData); }
function floatingActionButtonContractPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "api-foundations", floatingActionButtonDemoFromData); }
function floatingActionButtonGuidelinesPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "guidelines", floatingActionButtonDemoFromData); }
function floatingActionButtonTestPanel() { return renderSimpleGoldSection({ id: "floating-action-button" }, "tests-rejection-rules", floatingActionButtonDemoFromData); }
