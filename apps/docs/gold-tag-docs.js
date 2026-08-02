import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderTagGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, tagDemoFromData); }
export function tagDemo(label = "Cross-platform", variant = "metadata", tone = "neutral", state = "default", iconName = "", interactive = false) { return simpleDemo("tag", { label, variant, tone, state, icon: iconName, interactive }); }
export function tagDemoFromData(demo = {}) { return simpleDemo("tag", demo); }
function tagOperationalExamplePanel() { return renderSimpleGoldSection({ id: "tag" }, "operational-example", tagDemoFromData); }
function tagAnatomyPanel() { return renderSimpleGoldSection({ id: "tag" }, "anatomy", tagDemoFromData); }
function tagAccessibilityPanel() { return renderSimpleGoldSection({ id: "tag" }, "accessibility", tagDemoFromData); }
function tagVariantsPanel() { return renderSimpleGoldSection({ id: "tag" }, "variants", tagDemoFromData); }
function tagStatesPanel() { return renderSimpleGoldSection({ id: "tag" }, "states", tagDemoFromData); }
function tagStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "tag" }, "variant-state-behavior", tagDemoFromData); }
function tagFullWidthPanel() { return renderSimpleGoldSection({ id: "tag" }, "full-width", tagDemoFromData); }
function tagResponsivePanel() { return renderSimpleGoldSection({ id: "tag" }, "responsive-layout-patterns", tagDemoFromData); }
function tagViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "tag" }, "viewport-organization", tagDemoFromData); }
function tagPlaygroundPanel() { return renderSimpleGoldSection({ id: "tag" }, "playground", tagDemoFromData); }
function tagGuidelinesPanel() { return renderSimpleGoldSection({ id: "tag" }, "guidelines", tagDemoFromData); }
function tagContractPanel() { return renderSimpleGoldSection({ id: "tag" }, "api-foundations", tagDemoFromData); }
function tagTestPanel() { return renderSimpleGoldSection({ id: "tag" }, "tests-rejection-rules", tagDemoFromData); }
