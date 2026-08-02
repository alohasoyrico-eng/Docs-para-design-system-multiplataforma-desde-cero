import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderTreeViewGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, treeViewDemoFromData); }
export function treeViewDemo(label = "Tree View", state = "default") { return simpleDemo("tree-view", { label, state }); }
export function treeViewDemoFromData(demo = {}) { return simpleDemo("tree-view", demo); }
function treeViewOperationalExamplePanel() { return renderSimpleGoldSection({ id: "tree-view" }, "operational-example", treeViewDemoFromData); }
function treeViewAnatomyPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "anatomy", treeViewDemoFromData); }
function treeViewAccessibilityPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "accessibility", treeViewDemoFromData); }
function treeViewVariantsPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "variants", treeViewDemoFromData); }
function treeViewStatesPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "states", treeViewDemoFromData); }
function treeViewStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "variant-state-behavior", treeViewDemoFromData); }
function treeViewFullWidthPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "full-width", treeViewDemoFromData); }
function treeViewResponsivePanel() { return renderSimpleGoldSection({ id: "tree-view" }, "responsive-layout-patterns", treeViewDemoFromData); }
function treeViewViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "viewport-organization", treeViewDemoFromData); }
function treeViewPlaygroundPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "playground", treeViewDemoFromData); }
function treeViewContractPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "api-foundations", treeViewDemoFromData); }
function treeViewGuidelinesPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "guidelines", treeViewDemoFromData); }
function treeViewTestPanel() { return renderSimpleGoldSection({ id: "tree-view" }, "tests-rejection-rules", treeViewDemoFromData); }
