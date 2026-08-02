import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=254";

export function renderStationPinGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, stationPinDemoFromData); }
export function stationPinDemo(label = "Station 24", meta = "Open", state = "default") { return simpleDemo("station-pin", { label, meta, state }); }
export function stationPinDemoFromData(demo = {}) { return simpleDemo("station-pin", demo); }
function stationPinOperationalExamplePanel() { return renderSimpleGoldSection({ id: "station-pin" }, "operational-example", stationPinDemoFromData); }
function stationPinAnatomyPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "anatomy", stationPinDemoFromData); }
function stationPinAccessibilityPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "accessibility", stationPinDemoFromData); }
function stationPinVariantsPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "variants", stationPinDemoFromData); }
function stationPinStatesPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "states", stationPinDemoFromData); }
function stationPinStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "variant-state-behavior", stationPinDemoFromData); }
function stationPinFullWidthPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "full-width", stationPinDemoFromData); }
function stationPinResponsivePanel() { return renderSimpleGoldSection({ id: "station-pin" }, "responsive-layout-patterns", stationPinDemoFromData); }
function stationPinViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "viewport-organization", stationPinDemoFromData); }
function stationPinPlaygroundPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "playground", stationPinDemoFromData); }
function stationPinContractPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "api-foundations", stationPinDemoFromData); }
function stationPinGuidelinesPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "guidelines", stationPinDemoFromData); }
function stationPinTestPanel() { return renderSimpleGoldSection({ id: "station-pin" }, "tests-rejection-rules", stationPinDemoFromData); }
