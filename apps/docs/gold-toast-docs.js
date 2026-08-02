import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderToastGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, toastDemoFromData); }
export function toastDemo(label = "Card limit updated.", description = "Changes are live for assigned drivers.", tone = "success", variant = "status", state = "visible", iconName = "check_circle", dismissible = true, actionLabel = "") { return simpleDemo("toast", { label, description, tone, variant, state, icon: iconName, dismissible, actionLabel }); }
export function toastDemoFromData(demo = {}) { return simpleDemo("toast", demo); }
function toastOperationalExamplePanel() { return renderSimpleGoldSection({ id: "toast" }, "operational-example", toastDemoFromData); }
function toastAnatomyPanel() { return renderSimpleGoldSection({ id: "toast" }, "anatomy", toastDemoFromData); }
function toastAccessibilityPanel() { return renderSimpleGoldSection({ id: "toast" }, "accessibility", toastDemoFromData); }
function toastVariantsPanel() { return renderSimpleGoldSection({ id: "toast" }, "variants", toastDemoFromData); }
function toastStatesPanel() { return renderSimpleGoldSection({ id: "toast" }, "states", toastDemoFromData); }
function toastStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "toast" }, "variant-state-behavior", toastDemoFromData); }
function toastFullWidthPanel() { return renderSimpleGoldSection({ id: "toast" }, "full-width", toastDemoFromData); }
function toastResponsivePanel() { return renderSimpleGoldSection({ id: "toast" }, "responsive-layout-patterns", toastDemoFromData); }
function toastViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "toast" }, "viewport-organization", toastDemoFromData); }
function toastPlaygroundPanel() { return renderSimpleGoldSection({ id: "toast" }, "playground", toastDemoFromData); }
function toastGuidelinesPanel() { return renderSimpleGoldSection({ id: "toast" }, "guidelines", toastDemoFromData); }
function toastContractPanel() { return renderSimpleGoldSection({ id: "toast" }, "api-foundations", toastDemoFromData); }
function toastTestPanel() { return renderSimpleGoldSection({ id: "toast" }, "tests-rejection-rules", toastDemoFromData); }
