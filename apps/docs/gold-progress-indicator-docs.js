import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderProgressIndicatorGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, progressIndicatorDemoFromData); }
export function progressIndicatorDemo(label = "Card import", value = 68, variant = "linear", state = "active", fullWidth = false) { return simpleDemo("progress-indicator", { label, value, variant, state, fullWidth, showValue: true }); }
export function progressIndicatorDemoFromData(demo = {}) { return simpleDemo("progress-indicator", demo); }
function progressIndicatorOperationalExamplePanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "operational-example", progressIndicatorDemoFromData); }
function progressIndicatorAnatomyPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "anatomy", progressIndicatorDemoFromData); }
function progressIndicatorAccessibilityPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "accessibility", progressIndicatorDemoFromData); }
function progressIndicatorVariantsPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "variants", progressIndicatorDemoFromData); }
function progressIndicatorStatesPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "states", progressIndicatorDemoFromData); }
function progressIndicatorStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "variant-state-behavior", progressIndicatorDemoFromData); }
function progressIndicatorFullWidthPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "full-width", progressIndicatorDemoFromData); }
function progressIndicatorResponsivePanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "responsive-layout-patterns", progressIndicatorDemoFromData); }
function progressIndicatorViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "viewport-organization", progressIndicatorDemoFromData); }
function progressIndicatorPlaygroundPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "playground", progressIndicatorDemoFromData); }
function progressIndicatorGuidelinesPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "guidelines", progressIndicatorDemoFromData); }
function progressIndicatorContractPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "api-foundations", progressIndicatorDemoFromData); }
function progressIndicatorTestPanel() { return renderSimpleGoldSection({ id: "progress-indicator" }, "tests-rejection-rules", progressIndicatorDemoFromData); }
