import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderDialogGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, dialogDemoFromData); }
export function dialogDemo(label = "Freeze card?", description = "The driver will not be able to use this card until it is reactivated.", tone = "danger", variant = "confirmation", state = "open", iconName = "warning") { return simpleDemo("dialog", { label, description, tone, variant, state, icon: iconName, open: false }); }
export function dialogDemoFromData(demo = {}) { return simpleDemo("dialog", { ...demo, open: Boolean(demo.open) }); }
function dialogOperationalExamplePanel() { return renderSimpleGoldSection({ id: "dialog" }, "operational-example", dialogDemoFromData); }
function dialogAnatomyPanel() { return renderSimpleGoldSection({ id: "dialog" }, "anatomy", dialogDemoFromData); }
function dialogAccessibilityPanel() { return renderSimpleGoldSection({ id: "dialog" }, "accessibility", dialogDemoFromData); }
function dialogVariantsPanel() { return renderSimpleGoldSection({ id: "dialog" }, "variants", dialogDemoFromData); }
function dialogStatesPanel() { return renderSimpleGoldSection({ id: "dialog" }, "states", dialogDemoFromData); }
function dialogStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "dialog" }, "variant-state-behavior", dialogDemoFromData); }
function dialogFullWidthPanel() { return renderSimpleGoldSection({ id: "dialog" }, "full-width", dialogDemoFromData); }
function dialogResponsivePanel() { return renderSimpleGoldSection({ id: "dialog" }, "responsive-layout-patterns", dialogDemoFromData); }
function dialogViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "dialog" }, "viewport-organization", dialogDemoFromData); }
function dialogPlaygroundPanel() { return renderSimpleGoldSection({ id: "dialog" }, "playground", dialogDemoFromData); }
function dialogGuidelinesPanel() { return renderSimpleGoldSection({ id: "dialog" }, "guidelines", dialogDemoFromData); }
function dialogContractPanel() { return renderSimpleGoldSection({ id: "dialog" }, "api-foundations", dialogDemoFromData); }
function dialogTestPanel() { return renderSimpleGoldSection({ id: "dialog" }, "tests-rejection-rules", dialogDemoFromData); }
