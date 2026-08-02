import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderEmptyStateGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, emptyStateDemoFromData); }
export function emptyStateDemo(label = "No active vehicles", description = "When a vehicle connects, it will appear here.", variant = "first-use", state = "default", iconName = "inbox", actionLabel = "Add vehicle") { return simpleDemo("empty-state", { label, description, variant, state, icon: iconName, actionLabel }); }
export function emptyStateDemoFromData(demo = {}) { return simpleDemo("empty-state", demo); }
function emptyStateOperationalExamplePanel() { return renderSimpleGoldSection({ id: "empty-state" }, "operational-example", emptyStateDemoFromData); }
function emptyStateAnatomyPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "anatomy", emptyStateDemoFromData); }
function emptyStateAccessibilityPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "accessibility", emptyStateDemoFromData); }
function emptyStateVariantsPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "variants", emptyStateDemoFromData); }
function emptyStateStatesPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "states", emptyStateDemoFromData); }
function emptyStateStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "variant-state-behavior", emptyStateDemoFromData); }
function emptyStateFullWidthPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "full-width", emptyStateDemoFromData); }
function emptyStateResponsivePanel() { return renderSimpleGoldSection({ id: "empty-state" }, "responsive-layout-patterns", emptyStateDemoFromData); }
function emptyStateViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "viewport-organization", emptyStateDemoFromData); }
function emptyStatePlaygroundPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "playground", emptyStateDemoFromData); }
function emptyStateGuidelinesPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "guidelines", emptyStateDemoFromData); }
function emptyStateContractPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "api-foundations", emptyStateDemoFromData); }
function emptyStateTestPanel() { return renderSimpleGoldSection({ id: "empty-state" }, "tests-rejection-rules", emptyStateDemoFromData); }
