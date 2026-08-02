import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderPopoverGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, popoverDemoFromData); }
export function popoverDemo(label = "Station context", state = "open") { return simpleDemo("popover", { label, state }); }
export function popoverDemoFromData(demo = {}) { return simpleDemo("popover", demo); }
function popoverOperationalExamplePanel() { return renderSimpleGoldSection({ id: "popover" }, "operational-example", popoverDemoFromData); }
function popoverAnatomyPanel() { return renderSimpleGoldSection({ id: "popover" }, "anatomy", popoverDemoFromData); }
function popoverAccessibilityPanel() { return renderSimpleGoldSection({ id: "popover" }, "accessibility", popoverDemoFromData); }
function popoverVariantsPanel() { return renderSimpleGoldSection({ id: "popover" }, "variants", popoverDemoFromData); }
function popoverStatesPanel() { return renderSimpleGoldSection({ id: "popover" }, "states", popoverDemoFromData); }
function popoverStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "popover" }, "variant-state-behavior", popoverDemoFromData); }
function popoverFullWidthPanel() { return renderSimpleGoldSection({ id: "popover" }, "full-width", popoverDemoFromData); }
function popoverResponsivePanel() { return renderSimpleGoldSection({ id: "popover" }, "responsive-layout-patterns", popoverDemoFromData); }
function popoverViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "popover" }, "viewport-organization", popoverDemoFromData); }
function popoverPlaygroundPanel() { return renderSimpleGoldSection({ id: "popover" }, "playground", popoverDemoFromData); }
function popoverContractPanel() { return renderSimpleGoldSection({ id: "popover" }, "api-foundations", popoverDemoFromData); }
function popoverGuidelinesPanel() { return renderSimpleGoldSection({ id: "popover" }, "guidelines", popoverDemoFromData); }
function popoverTestPanel() { return renderSimpleGoldSection({ id: "popover" }, "tests-rejection-rules", popoverDemoFromData); }
