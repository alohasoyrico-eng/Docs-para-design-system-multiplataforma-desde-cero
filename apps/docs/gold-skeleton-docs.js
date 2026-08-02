import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderSkeletonGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, skeletonDemoFromData); }
export function skeletonDemo(label = "Wallet card loading", variant = "card", state = "loading", lines = 3, fullWidth = false, columns = 4) { return simpleDemo("skeleton", { label, variant, state, lines, rows: lines, columns, fullWidth }); }
export function skeletonDemoFromData(demo = {}) { return simpleDemo("skeleton", demo); }
function skeletonOperationalExamplePanel() { return renderSimpleGoldSection({ id: "skeleton" }, "operational-example", skeletonDemoFromData); }
function skeletonAnatomyPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "anatomy", skeletonDemoFromData); }
function skeletonAccessibilityPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "accessibility", skeletonDemoFromData); }
function skeletonVariantsPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "variants", skeletonDemoFromData); }
function skeletonStatesPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "states", skeletonDemoFromData); }
function skeletonStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "variant-state-behavior", skeletonDemoFromData); }
function skeletonFullWidthPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "full-width", skeletonDemoFromData); }
function skeletonResponsivePanel() { return renderSimpleGoldSection({ id: "skeleton" }, "responsive-layout-patterns", skeletonDemoFromData); }
function skeletonViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "viewport-organization", skeletonDemoFromData); }
function skeletonPlaygroundPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "playground", skeletonDemoFromData); }
function skeletonGuidelinesPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "guidelines", skeletonDemoFromData); }
function skeletonContractPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "api-foundations", skeletonDemoFromData); }
function skeletonTestPanel() { return renderSimpleGoldSection({ id: "skeleton" }, "tests-rejection-rules", skeletonDemoFromData); }
