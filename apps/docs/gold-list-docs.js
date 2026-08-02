import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderListGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, listDemoFromData); }
export function listDemo(label = "Movement ready", meta = "Today · $842", state = "default") { return simpleDemo("list", { label, meta, state }); }
export function listDemoFromData(demo = {}) { return simpleDemo("list", demo); }
function listOperationalExamplePanel() { return renderSimpleGoldSection({ id: "list" }, "operational-example", listDemoFromData); }
function listAnatomyPanel() { return renderSimpleGoldSection({ id: "list" }, "anatomy", listDemoFromData); }
function listAccessibilityPanel() { return renderSimpleGoldSection({ id: "list" }, "accessibility", listDemoFromData); }
function listVariantsPanel() { return renderSimpleGoldSection({ id: "list" }, "variants", listDemoFromData); }
function listStatesPanel() { return renderSimpleGoldSection({ id: "list" }, "states", listDemoFromData); }
function listStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "list" }, "variant-state-behavior", listDemoFromData); }
function listFullWidthPanel() { return renderSimpleGoldSection({ id: "list" }, "full-width", listDemoFromData); }
function listResponsivePanel() { return renderSimpleGoldSection({ id: "list" }, "responsive-layout-patterns", listDemoFromData); }
function listViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "list" }, "viewport-organization", listDemoFromData); }
function listPlaygroundPanel() { return renderSimpleGoldSection({ id: "list" }, "playground", listDemoFromData); }
function listContractPanel() { return renderSimpleGoldSection({ id: "list" }, "api-foundations", listDemoFromData); }
function listGuidelinesPanel() { return renderSimpleGoldSection({ id: "list" }, "guidelines", listDemoFromData); }
function listTestPanel() { return renderSimpleGoldSection({ id: "list" }, "tests-rejection-rules", listDemoFromData); }
