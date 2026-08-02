import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderSpinnerGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, spinnerDemoFromData); }
export function spinnerDemo(label = "Loading", density = "md", tone = "accent", state = "loading", decorative = false) { return simpleDemo("spinner", { label, density, tone, state, decorative }); }
export function spinnerDemoFromData(demo = {}) { return simpleDemo("spinner", demo); }
function spinnerOperationalExamplePanel() { return renderSimpleGoldSection({ id: "spinner" }, "operational-example", spinnerDemoFromData); }
function spinnerAnatomyPanel() { return renderSimpleGoldSection({ id: "spinner" }, "anatomy", spinnerDemoFromData); }
function spinnerAccessibilityPanel() { return renderSimpleGoldSection({ id: "spinner" }, "accessibility", spinnerDemoFromData); }
function spinnerVariantsPanel() { return renderSimpleGoldSection({ id: "spinner" }, "variants", spinnerDemoFromData); }
function spinnerStatesPanel() { return renderSimpleGoldSection({ id: "spinner" }, "states", spinnerDemoFromData); }
function spinnerStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "spinner" }, "variant-state-behavior", spinnerDemoFromData); }
function spinnerFullWidthPanel() { return renderSimpleGoldSection({ id: "spinner" }, "full-width", spinnerDemoFromData); }
function spinnerResponsivePanel() { return renderSimpleGoldSection({ id: "spinner" }, "responsive-layout-patterns", spinnerDemoFromData); }
function spinnerViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "spinner" }, "viewport-organization", spinnerDemoFromData); }
function spinnerPlaygroundPanel() { return renderSimpleGoldSection({ id: "spinner" }, "playground", spinnerDemoFromData); }
function spinnerGuidelinesPanel() { return renderSimpleGoldSection({ id: "spinner" }, "guidelines", spinnerDemoFromData); }
function spinnerContractPanel() { return renderSimpleGoldSection({ id: "spinner" }, "api-foundations", spinnerDemoFromData); }
function spinnerTestPanel() { return renderSimpleGoldSection({ id: "spinner" }, "tests-rejection-rules", spinnerDemoFromData); }
