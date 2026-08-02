import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderTooltipGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, tooltipDemoFromData); }
export function tooltipDemo(label = "Show layout columns.", trigger = "Grid", placement = "top", variant = "default", state = "closed", iconName = "help") { return simpleDemo("tooltip", { label, trigger, placement, variant, state, icon: iconName }); }
export function tooltipDemoFromData(demo = {}) { return simpleDemo("tooltip", demo); }
function tooltipOperationalExamplePanel() { return renderSimpleGoldSection({ id: "tooltip" }, "operational-example", tooltipDemoFromData); }
function tooltipAnatomyPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "anatomy", tooltipDemoFromData); }
function tooltipAccessibilityPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "accessibility", tooltipDemoFromData); }
function tooltipVariantsPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "variants", tooltipDemoFromData); }
function tooltipStatesPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "states", tooltipDemoFromData); }
function tooltipStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "variant-state-behavior", tooltipDemoFromData); }
function tooltipFullWidthPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "full-width", tooltipDemoFromData); }
function tooltipResponsivePanel() { return renderSimpleGoldSection({ id: "tooltip" }, "responsive-layout-patterns", tooltipDemoFromData); }
function tooltipViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "viewport-organization", tooltipDemoFromData); }
function tooltipPlaygroundPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "playground", tooltipDemoFromData); }
function tooltipGuidelinesPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "guidelines", tooltipDemoFromData); }
function tooltipContractPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "api-foundations", tooltipDemoFromData); }
function tooltipTestPanel() { return renderSimpleGoldSection({ id: "tooltip" }, "tests-rejection-rules", tooltipDemoFromData); }
