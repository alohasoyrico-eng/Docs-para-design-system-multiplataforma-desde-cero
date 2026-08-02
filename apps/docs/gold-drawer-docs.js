import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderDrawerGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, drawerDemoFromData); }
export function drawerDemo(label = "Card controls", description = "Review limits, status, and driver access before saving.", variant = "side-sheet", state = "closed", side = "right") { return simpleDemo("drawer", { label, description, variant, state, side, open: false }); }
export function drawerDemoFromData(demo = {}) { return simpleDemo("drawer", { ...demo, open: Boolean(demo.open) }); }
function drawerOperationalExamplePanel() { return renderSimpleGoldSection({ id: "drawer" }, "operational-example", drawerDemoFromData); }
function drawerAnatomyPanel() { return renderSimpleGoldSection({ id: "drawer" }, "anatomy", drawerDemoFromData); }
function drawerAccessibilityPanel() { return renderSimpleGoldSection({ id: "drawer" }, "accessibility", drawerDemoFromData); }
function drawerVariantsPanel() { return renderSimpleGoldSection({ id: "drawer" }, "variants", drawerDemoFromData); }
function drawerStatesPanel() { return renderSimpleGoldSection({ id: "drawer" }, "states", drawerDemoFromData); }
function drawerStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "drawer" }, "variant-state-behavior", drawerDemoFromData); }
function drawerFullWidthPanel() { return renderSimpleGoldSection({ id: "drawer" }, "full-width", drawerDemoFromData); }
function drawerResponsivePanel() { return renderSimpleGoldSection({ id: "drawer" }, "responsive-layout-patterns", drawerDemoFromData); }
function drawerViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "drawer" }, "viewport-organization", drawerDemoFromData); }
function drawerPlaygroundPanel() { return renderSimpleGoldSection({ id: "drawer" }, "playground", drawerDemoFromData); }
function drawerGuidelinesPanel() { return renderSimpleGoldSection({ id: "drawer" }, "guidelines", drawerDemoFromData); }
function drawerContractPanel() { return renderSimpleGoldSection({ id: "drawer" }, "api-foundations", drawerDemoFromData); }
function drawerTestPanel() { return renderSimpleGoldSection({ id: "drawer" }, "tests-rejection-rules", drawerDemoFromData); }
