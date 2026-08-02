import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderMotionBoundaryGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, motionBoundaryDemoFromData); }
export function motionBoundaryDemo(label = "Motion Boundary", state = "default") { return simpleDemo("motion-boundary", { label, state }); }
export function motionBoundaryDemoFromData(demo = {}) { return simpleDemo("motion-boundary", demo); }
function motionBoundaryOperationalExamplePanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "operational-example", motionBoundaryDemoFromData); }
function motionBoundaryAnatomyPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "anatomy", motionBoundaryDemoFromData); }
function motionBoundaryAccessibilityPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "accessibility", motionBoundaryDemoFromData); }
function motionBoundaryVariantsPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "variants", motionBoundaryDemoFromData); }
function motionBoundaryStatesPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "states", motionBoundaryDemoFromData); }
function motionBoundaryStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "variant-state-behavior", motionBoundaryDemoFromData); }
function motionBoundaryFullWidthPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "full-width", motionBoundaryDemoFromData); }
function motionBoundaryResponsivePanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "responsive-layout-patterns", motionBoundaryDemoFromData); }
function motionBoundaryViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "viewport-organization", motionBoundaryDemoFromData); }
function motionBoundaryPlaygroundPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "playground", motionBoundaryDemoFromData); }
function motionBoundaryContractPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "api-foundations", motionBoundaryDemoFromData); }
function motionBoundaryGuidelinesPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "guidelines", motionBoundaryDemoFromData); }
function motionBoundaryTestPanel() { return renderSimpleGoldSection({ id: "motion-boundary" }, "tests-rejection-rules", motionBoundaryDemoFromData); }
