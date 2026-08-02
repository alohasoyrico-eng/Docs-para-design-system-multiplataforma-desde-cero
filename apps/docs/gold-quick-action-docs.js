import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderQuickActionGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, quickActionDemoFromData); }
export function quickActionDemo(label = "Freeze card", state = "default") { return simpleDemo("quick-action", { label, state }); }
export function quickActionDemoFromData(demo = {}) { return simpleDemo("quick-action", demo); }
function quickActionOperationalExamplePanel() { return renderSimpleGoldSection({ id: "quick-action" }, "operational-example", quickActionDemoFromData); }
function quickActionAnatomyPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "anatomy", quickActionDemoFromData); }
function quickActionAccessibilityPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "accessibility", quickActionDemoFromData); }
function quickActionVariantsPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "variants", quickActionDemoFromData); }
function quickActionStatesPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "states", quickActionDemoFromData); }
function quickActionStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "variant-state-behavior", quickActionDemoFromData); }
function quickActionFullWidthPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "full-width", quickActionDemoFromData); }
function quickActionResponsivePanel() { return renderSimpleGoldSection({ id: "quick-action" }, "responsive-layout-patterns", quickActionDemoFromData); }
function quickActionViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "viewport-organization", quickActionDemoFromData); }
function quickActionPlaygroundPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "playground", quickActionDemoFromData); }
function quickActionContractPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "api-foundations", quickActionDemoFromData); }
function quickActionGuidelinesPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "guidelines", quickActionDemoFromData); }
function quickActionTestPanel() { return renderSimpleGoldSection({ id: "quick-action" }, "tests-rejection-rules", quickActionDemoFromData); }
