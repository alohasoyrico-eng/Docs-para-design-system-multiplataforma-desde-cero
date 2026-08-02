import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderMenuGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, menuDemoFromData); }
export function menuDemo(trigger = "Actions", variant = "actions", state = "open", align = "start") { return simpleDemo("menu", { trigger, variant, state, align }); }
export function menuDemoFromData(demo = {}) { return simpleDemo("menu", demo); }
function menuOperationalExamplePanel() { return renderSimpleGoldSection({ id: "menu" }, "operational-example", menuDemoFromData); }
function menuAnatomyPanel() { return renderSimpleGoldSection({ id: "menu" }, "anatomy", menuDemoFromData); }
function menuAccessibilityPanel() { return renderSimpleGoldSection({ id: "menu" }, "accessibility", menuDemoFromData); }
function menuVariantsPanel() { return renderSimpleGoldSection({ id: "menu" }, "variants", menuDemoFromData); }
function menuStatesPanel() { return renderSimpleGoldSection({ id: "menu" }, "states", menuDemoFromData); }
function menuStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "menu" }, "variant-state-behavior", menuDemoFromData); }
function menuFullWidthPanel() { return renderSimpleGoldSection({ id: "menu" }, "full-width", menuDemoFromData); }
function menuResponsivePanel() { return renderSimpleGoldSection({ id: "menu" }, "responsive-layout-patterns", menuDemoFromData); }
function menuViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "menu" }, "viewport-organization", menuDemoFromData); }
function menuPlaygroundPanel() { return renderSimpleGoldSection({ id: "menu" }, "playground", menuDemoFromData); }
function menuGuidelinesPanel() { return renderSimpleGoldSection({ id: "menu" }, "guidelines", menuDemoFromData); }
function menuContractPanel() { return renderSimpleGoldSection({ id: "menu" }, "api-foundations", menuDemoFromData); }
function menuTestPanel() { return renderSimpleGoldSection({ id: "menu" }, "tests-rejection-rules", menuDemoFromData); }
