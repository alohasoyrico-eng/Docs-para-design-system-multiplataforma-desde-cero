import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderStepperGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, stepperDemoFromData); }
export function stepperDemo(label = "Vehicle setup", current = 1, state = "active", variant = "horizontal", orientation = "horizontal", density = "md") { return simpleDemo("stepper", { label, current, state, variant, orientation, density }); }
export function stepperDemoFromData(demo = {}) { return simpleDemo("stepper", demo); }
function stepperOperationalExamplePanel() { return renderSimpleGoldSection({ id: "stepper" }, "operational-example", stepperDemoFromData); }
function stepperAnatomyPanel() { return renderSimpleGoldSection({ id: "stepper" }, "anatomy", stepperDemoFromData); }
function stepperAccessibilityPanel() { return renderSimpleGoldSection({ id: "stepper" }, "accessibility", stepperDemoFromData); }
function stepperVariantsPanel() { return renderSimpleGoldSection({ id: "stepper" }, "variants", stepperDemoFromData); }
function stepperStatesPanel() { return renderSimpleGoldSection({ id: "stepper" }, "states", stepperDemoFromData); }
function stepperStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "stepper" }, "variant-state-behavior", stepperDemoFromData); }
function stepperFullWidthPanel() { return renderSimpleGoldSection({ id: "stepper" }, "full-width", stepperDemoFromData); }
function stepperResponsivePanel() { return renderSimpleGoldSection({ id: "stepper" }, "responsive-layout-patterns", stepperDemoFromData); }
function stepperViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "stepper" }, "viewport-organization", stepperDemoFromData); }
function stepperPlaygroundPanel() { return renderSimpleGoldSection({ id: "stepper" }, "playground", stepperDemoFromData); }
function stepperGuidelinesPanel() { return renderSimpleGoldSection({ id: "stepper" }, "guidelines", stepperDemoFromData); }
function stepperContractPanel() { return renderSimpleGoldSection({ id: "stepper" }, "api-foundations", stepperDemoFromData); }
function stepperTestPanel() { return renderSimpleGoldSection({ id: "stepper" }, "tests-rejection-rules", stepperDemoFromData); }
