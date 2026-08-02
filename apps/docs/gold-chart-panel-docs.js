import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=254";

export function renderChartPanelGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, chartPanelDemoFromData); }
export function chartPanelDemo(label = "Fuel trend", value = "84%", state = "default") { return simpleDemo("chart-panel", { label, value, state }); }
export function chartPanelDemoFromData(demo = {}) { return simpleDemo("chart-panel", demo); }
function chartPanelOperationalExamplePanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "operational-example", chartPanelDemoFromData); }
function chartPanelAnatomyPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "anatomy", chartPanelDemoFromData); }
function chartPanelAccessibilityPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "accessibility", chartPanelDemoFromData); }
function chartPanelVariantsPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "variants", chartPanelDemoFromData); }
function chartPanelStatesPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "states", chartPanelDemoFromData); }
function chartPanelStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "variant-state-behavior", chartPanelDemoFromData); }
function chartPanelFullWidthPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "full-width", chartPanelDemoFromData); }
function chartPanelResponsivePanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "responsive-layout-patterns", chartPanelDemoFromData); }
function chartPanelViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "viewport-organization", chartPanelDemoFromData); }
function chartPanelPlaygroundPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "playground", chartPanelDemoFromData); }
function chartPanelContractPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "api-foundations", chartPanelDemoFromData); }
function chartPanelGuidelinesPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "guidelines", chartPanelDemoFromData); }
function chartPanelTestPanel() { return renderSimpleGoldSection({ id: "chart-panel" }, "tests-rejection-rules", chartPanelDemoFromData); }
