import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderKpiTileGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, kpiTileDemoFromData); }
export function kpiTileDemo(label = "Fuel spend", value = "$84.2k", state = "default") { return simpleDemo("kpi-tile", { label, value, state }); }
export function kpiTileDemoFromData(demo = {}) { return simpleDemo("kpi-tile", demo); }
function kpiTileOperationalExamplePanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "operational-example", kpiTileDemoFromData); }
function kpiTileAnatomyPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "anatomy", kpiTileDemoFromData); }
function kpiTileAccessibilityPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "accessibility", kpiTileDemoFromData); }
function kpiTileVariantsPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "variants", kpiTileDemoFromData); }
function kpiTileStatesPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "states", kpiTileDemoFromData); }
function kpiTileStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "variant-state-behavior", kpiTileDemoFromData); }
function kpiTileFullWidthPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "full-width", kpiTileDemoFromData); }
function kpiTileResponsivePanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "responsive-layout-patterns", kpiTileDemoFromData); }
function kpiTileViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "viewport-organization", kpiTileDemoFromData); }
function kpiTilePlaygroundPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "playground", kpiTileDemoFromData); }
function kpiTileContractPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "api-foundations", kpiTileDemoFromData); }
function kpiTileGuidelinesPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "guidelines", kpiTileDemoFromData); }
function kpiTileTestPanel() { return renderSimpleGoldSection({ id: "kpi-tile" }, "tests-rejection-rules", kpiTileDemoFromData); }
