import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderAnimatedMomentGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, animatedMomentDemoFromData); }
export function animatedMomentDemo(label = "Animated Moment", state = "default") { return simpleDemo("animated-moment", { label, state }); }
export function animatedMomentDemoFromData(demo = {}) { return simpleDemo("animated-moment", demo); }
function animatedMomentOperationalExamplePanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "operational-example", animatedMomentDemoFromData); }
function animatedMomentAnatomyPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "anatomy", animatedMomentDemoFromData); }
function animatedMomentAccessibilityPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "accessibility", animatedMomentDemoFromData); }
function animatedMomentVariantsPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "variants", animatedMomentDemoFromData); }
function animatedMomentStatesPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "states", animatedMomentDemoFromData); }
function animatedMomentStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "variant-state-behavior", animatedMomentDemoFromData); }
function animatedMomentFullWidthPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "full-width", animatedMomentDemoFromData); }
function animatedMomentResponsivePanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "responsive-layout-patterns", animatedMomentDemoFromData); }
function animatedMomentViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "viewport-organization", animatedMomentDemoFromData); }
function animatedMomentPlaygroundPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "playground", animatedMomentDemoFromData); }
function animatedMomentContractPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "api-foundations", animatedMomentDemoFromData); }
function animatedMomentGuidelinesPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "guidelines", animatedMomentDemoFromData); }
function animatedMomentTestPanel() { return renderSimpleGoldSection({ id: "animated-moment" }, "tests-rejection-rules", animatedMomentDemoFromData); }
