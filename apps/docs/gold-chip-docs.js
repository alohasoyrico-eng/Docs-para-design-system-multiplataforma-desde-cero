import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderChipGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, chipDemoFromData); }
export function chipDemo(label = "Active filter", variant = "filter", state = "default", icon = "", selected = false, removable = false) { return simpleDemo("chip", { label, variant, state, icon, selected, removable, interactive: true }); }
export function chipDemoFromData(demo = {}) { return simpleDemo("chip", demo); }
function chipOperationalExamplePanel() { return renderSimpleGoldSection({ id: "chip" }, "operational-example", chipDemoFromData); }
function chipAnatomyPanel() { return renderSimpleGoldSection({ id: "chip" }, "anatomy", chipDemoFromData); }
function chipAccessibilityPanel() { return renderSimpleGoldSection({ id: "chip" }, "accessibility", chipDemoFromData); }
function chipVariantsPanel() { return renderSimpleGoldSection({ id: "chip" }, "variants", chipDemoFromData); }
function chipStatesPanel() { return renderSimpleGoldSection({ id: "chip" }, "states", chipDemoFromData); }
function chipStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "chip" }, "variant-state-behavior", chipDemoFromData); }
function chipFullWidthPanel() { return renderSimpleGoldSection({ id: "chip" }, "full-width", chipDemoFromData); }
function chipResponsivePanel() { return renderSimpleGoldSection({ id: "chip" }, "responsive-layout-patterns", chipDemoFromData); }
function chipViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "chip" }, "viewport-organization", chipDemoFromData); }
function chipPlaygroundPanel() { return renderSimpleGoldSection({ id: "chip" }, "playground", chipDemoFromData); }
function chipGuidelinesPanel() { return renderSimpleGoldSection({ id: "chip" }, "guidelines", chipDemoFromData); }
function chipContractPanel() { return renderSimpleGoldSection({ id: "chip" }, "api-foundations", chipDemoFromData); }
function chipTestPanel() { return renderSimpleGoldSection({ id: "chip" }, "tests-rejection-rules", chipDemoFromData); }
