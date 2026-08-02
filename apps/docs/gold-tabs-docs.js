import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderTabsGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, tabsDemoFromData); }
export function tabsDemo(label = "Navigation", variant = "default", state = "default", itemCount = 3) { return simpleDemo("tabs", { ariaLabel: label, variant, state, itemCount }); }
export function tabsDemoFromData(demo = {}) { return simpleDemo("tabs", demo); }
function tabsOperationalExamplePanel() { return renderSimpleGoldSection({ id: "tabs" }, "operational-example", tabsDemoFromData); }
function tabsAnatomyPanel() { return renderSimpleGoldSection({ id: "tabs" }, "anatomy", tabsDemoFromData); }
function tabsAccessibilityPanel() { return renderSimpleGoldSection({ id: "tabs" }, "accessibility", tabsDemoFromData); }
function tabsVariantsPanel() { return renderSimpleGoldSection({ id: "tabs" }, "variants", tabsDemoFromData); }
function tabsStatesPanel() { return renderSimpleGoldSection({ id: "tabs" }, "states", tabsDemoFromData); }
function tabsStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "tabs" }, "variant-state-behavior", tabsDemoFromData); }
function tabsFullWidthPanel() { return renderSimpleGoldSection({ id: "tabs" }, "full-width", tabsDemoFromData); }
function tabsResponsivePanel() { return renderSimpleGoldSection({ id: "tabs" }, "responsive-layout-patterns", tabsDemoFromData); }
function tabsViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "tabs" }, "viewport-organization", tabsDemoFromData); }
function tabsPlaygroundPanel() { return renderSimpleGoldSection({ id: "tabs" }, "playground", tabsDemoFromData); }
function tabsGuidelinesPanel() { return renderSimpleGoldSection({ id: "tabs" }, "guidelines", tabsDemoFromData); }
function tabsContractPanel() { return renderSimpleGoldSection({ id: "tabs" }, "api-foundations", tabsDemoFromData); }
function tabsTestPanel() { return renderSimpleGoldSection({ id: "tabs" }, "tests-rejection-rules", tabsDemoFromData); }
