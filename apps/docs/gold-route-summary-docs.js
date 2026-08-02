import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderRouteSummaryGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, routeSummaryDemoFromData); }
export function routeSummaryDemo(label = "Fast route", meta = "18 min", state = "default") { return simpleDemo("route-summary", { label, meta, state }); }
export function routeSummaryDemoFromData(demo = {}) { return simpleDemo("route-summary", demo); }
function routeSummaryOperationalExamplePanel() { return renderSimpleGoldSection({ id: "route-summary" }, "operational-example", routeSummaryDemoFromData); }
function routeSummaryAnatomyPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "anatomy", routeSummaryDemoFromData); }
function routeSummaryAccessibilityPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "accessibility", routeSummaryDemoFromData); }
function routeSummaryVariantsPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "variants", routeSummaryDemoFromData); }
function routeSummaryStatesPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "states", routeSummaryDemoFromData); }
function routeSummaryStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "variant-state-behavior", routeSummaryDemoFromData); }
function routeSummaryFullWidthPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "full-width", routeSummaryDemoFromData); }
function routeSummaryResponsivePanel() { return renderSimpleGoldSection({ id: "route-summary" }, "responsive-layout-patterns", routeSummaryDemoFromData); }
function routeSummaryViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "viewport-organization", routeSummaryDemoFromData); }
function routeSummaryPlaygroundPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "playground", routeSummaryDemoFromData); }
function routeSummaryContractPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "api-foundations", routeSummaryDemoFromData); }
function routeSummaryGuidelinesPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "guidelines", routeSummaryDemoFromData); }
function routeSummaryTestPanel() { return renderSimpleGoldSection({ id: "route-summary" }, "tests-rejection-rules", routeSummaryDemoFromData); }
