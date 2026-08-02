import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderAccordionGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, accordionDemoFromData); }
export function accordionDemo(label = "Documents", description = "Driver license, insurance, and vehicle inspection are ready for review.", variant = "single", state = "open") { return simpleDemo("accordion", { label, description, variant, state }); }
export function accordionDemoFromData(demo = {}) { return simpleDemo("accordion", demo); }
function accordionOperationalExamplePanel() { return renderSimpleGoldSection({ id: "accordion" }, "operational-example", accordionDemoFromData); }
function accordionAnatomyPanel() { return renderSimpleGoldSection({ id: "accordion" }, "anatomy", accordionDemoFromData); }
function accordionAccessibilityPanel() { return renderSimpleGoldSection({ id: "accordion" }, "accessibility", accordionDemoFromData); }
function accordionVariantsPanel() { return renderSimpleGoldSection({ id: "accordion" }, "variants", accordionDemoFromData); }
function accordionStatesPanel() { return renderSimpleGoldSection({ id: "accordion" }, "states", accordionDemoFromData); }
function accordionStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "accordion" }, "variant-state-behavior", accordionDemoFromData); }
function accordionFullWidthPanel() { return renderSimpleGoldSection({ id: "accordion" }, "full-width", accordionDemoFromData); }
function accordionResponsivePanel() { return renderSimpleGoldSection({ id: "accordion" }, "responsive-layout-patterns", accordionDemoFromData); }
function accordionViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "accordion" }, "viewport-organization", accordionDemoFromData); }
function accordionPlaygroundPanel() { return renderSimpleGoldSection({ id: "accordion" }, "playground", accordionDemoFromData); }
function accordionGuidelinesPanel() { return renderSimpleGoldSection({ id: "accordion" }, "guidelines", accordionDemoFromData); }
function accordionContractPanel() { return renderSimpleGoldSection({ id: "accordion" }, "api-foundations", accordionDemoFromData); }
function accordionTestPanel() { return renderSimpleGoldSection({ id: "accordion" }, "tests-rejection-rules", accordionDemoFromData); }
