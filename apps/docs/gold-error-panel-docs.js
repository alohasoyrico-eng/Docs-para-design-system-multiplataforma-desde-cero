import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderErrorPanelGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, errorPanelDemoFromData); }
export function errorPanelDemo(label = "Error Panel", state = "default") { return simpleDemo("error-panel", { label, state }); }
export function errorPanelDemoFromData(demo = {}) { return simpleDemo("error-panel", demo); }
function errorPanelOperationalExamplePanel() { return renderSimpleGoldSection({ id: "error-panel" }, "operational-example", errorPanelDemoFromData); }
function errorPanelAnatomyPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "anatomy", errorPanelDemoFromData); }
function errorPanelAccessibilityPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "accessibility", errorPanelDemoFromData); }
function errorPanelVariantsPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "variants", errorPanelDemoFromData); }
function errorPanelStatesPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "states", errorPanelDemoFromData); }
function errorPanelStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "variant-state-behavior", errorPanelDemoFromData); }
function errorPanelFullWidthPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "full-width", errorPanelDemoFromData); }
function errorPanelResponsivePanel() { return renderSimpleGoldSection({ id: "error-panel" }, "responsive-layout-patterns", errorPanelDemoFromData); }
function errorPanelViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "viewport-organization", errorPanelDemoFromData); }
function errorPanelPlaygroundPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "playground", errorPanelDemoFromData); }
function errorPanelContractPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "api-foundations", errorPanelDemoFromData); }
function errorPanelGuidelinesPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "guidelines", errorPanelDemoFromData); }
function errorPanelTestPanel() { return renderSimpleGoldSection({ id: "error-panel" }, "tests-rejection-rules", errorPanelDemoFromData); }
