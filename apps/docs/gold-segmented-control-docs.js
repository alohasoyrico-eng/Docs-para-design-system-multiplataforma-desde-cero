import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderSegmentedControlGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, segmentedControlDemoFromData); }
export function segmentedControlDemo(label = "Today", state = "default") { return simpleDemo("segmented-control", { label, state }); }
export function segmentedControlDemoFromData(demo = {}) { return simpleDemo("segmented-control", demo); }
function segmentedControlOperationalExamplePanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "operational-example", segmentedControlDemoFromData); }
function segmentedControlAnatomyPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "anatomy", segmentedControlDemoFromData); }
function segmentedControlAccessibilityPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "accessibility", segmentedControlDemoFromData); }
function segmentedControlVariantsPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "variants", segmentedControlDemoFromData); }
function segmentedControlStatesPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "states", segmentedControlDemoFromData); }
function segmentedControlStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "variant-state-behavior", segmentedControlDemoFromData); }
function segmentedControlFullWidthPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "full-width", segmentedControlDemoFromData); }
function segmentedControlResponsivePanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "responsive-layout-patterns", segmentedControlDemoFromData); }
function segmentedControlViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "viewport-organization", segmentedControlDemoFromData); }
function segmentedControlPlaygroundPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "playground", segmentedControlDemoFromData); }
function segmentedControlContractPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "api-foundations", segmentedControlDemoFromData); }
function segmentedControlGuidelinesPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "guidelines", segmentedControlDemoFromData); }
function segmentedControlTestPanel() { return renderSimpleGoldSection({ id: "segmented-control" }, "tests-rejection-rules", segmentedControlDemoFromData); }
