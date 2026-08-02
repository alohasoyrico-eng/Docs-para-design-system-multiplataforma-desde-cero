import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderSliderGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, sliderDemoFromData); }
export function sliderDemo(label = "Search radius", value = 12, state = "default", variant = "continuous") { return simpleDemo("slider", { label, value, state, variant }); }
export function sliderDemoFromData(demo = {}) { return simpleDemo("slider", demo); }
function sliderOperationalExamplePanel() { return renderSimpleGoldSection({ id: "slider" }, "operational-example", sliderDemoFromData); }
function sliderAnatomyPanel() { return renderSimpleGoldSection({ id: "slider" }, "anatomy", sliderDemoFromData); }
function sliderAccessibilityPanel() { return renderSimpleGoldSection({ id: "slider" }, "accessibility", sliderDemoFromData); }
function sliderVariantsPanel() { return renderSimpleGoldSection({ id: "slider" }, "variants", sliderDemoFromData); }
function sliderStatesPanel() { return renderSimpleGoldSection({ id: "slider" }, "states", sliderDemoFromData); }
function sliderStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "slider" }, "variant-state-behavior", sliderDemoFromData); }
function sliderFullWidthPanel() { return renderSimpleGoldSection({ id: "slider" }, "full-width", sliderDemoFromData); }
function sliderResponsivePanel() { return renderSimpleGoldSection({ id: "slider" }, "responsive-layout-patterns", sliderDemoFromData); }
function sliderViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "slider" }, "viewport-organization", sliderDemoFromData); }
function sliderPlaygroundPanel() { return renderSimpleGoldSection({ id: "slider" }, "playground", sliderDemoFromData); }
function sliderGuidelinesPanel() { return renderSimpleGoldSection({ id: "slider" }, "guidelines", sliderDemoFromData); }
function sliderContractPanel() { return renderSimpleGoldSection({ id: "slider" }, "api-foundations", sliderDemoFromData); }
function sliderTestPanel() { return renderSimpleGoldSection({ id: "slider" }, "tests-rejection-rules", sliderDemoFromData); }
