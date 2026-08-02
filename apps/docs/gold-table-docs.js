import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderTableGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, tableDemoFromData); }
export function tableDemo(label = "Fleet table", variant = "standard", state = "default", dense = false) { return simpleDemo("table", { label, variant, state, dense }); }
export function tableDemoFromData(demo = {}) { return simpleDemo("table", demo); }
function tableOperationalExamplePanel() { return renderSimpleGoldSection({ id: "table" }, "operational-example", tableDemoFromData); }
function tableAnatomyPanel() { return renderSimpleGoldSection({ id: "table" }, "anatomy", tableDemoFromData); }
function tableAccessibilityPanel() { return renderSimpleGoldSection({ id: "table" }, "accessibility", tableDemoFromData); }
function tableVariantsPanel() { return renderSimpleGoldSection({ id: "table" }, "variants", tableDemoFromData); }
function tableStatesPanel() { return renderSimpleGoldSection({ id: "table" }, "states", tableDemoFromData); }
function tableStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "table" }, "variant-state-behavior", tableDemoFromData); }
function tableFullWidthPanel() { return renderSimpleGoldSection({ id: "table" }, "full-width", tableDemoFromData); }
function tableResponsivePanel() { return renderSimpleGoldSection({ id: "table" }, "responsive-layout-patterns", tableDemoFromData); }
function tableViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "table" }, "viewport-organization", tableDemoFromData); }
function tablePlaygroundPanel() { return renderSimpleGoldSection({ id: "table" }, "playground", tableDemoFromData); }
function tableGuidelinesPanel() { return renderSimpleGoldSection({ id: "table" }, "guidelines", tableDemoFromData); }
function tableContractPanel() { return renderSimpleGoldSection({ id: "table" }, "api-foundations", tableDemoFromData); }
function tableTestPanel() { return renderSimpleGoldSection({ id: "table" }, "tests-rejection-rules", tableDemoFromData); }
