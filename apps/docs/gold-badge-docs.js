import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderBadgeGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, badgeDemoFromData); }
export function badgeDemo(label = "8", variant = "count", tone = "info", state = "default", icon = "") { return simpleDemo("badge", { label, variant, tone, state, icon, ariaLabel: `${label} ${tone}` }); }
export function badgeDemoFromData(demo = {}) { return simpleDemo("badge", demo); }
function badgeOperationalExamplePanel() { return renderSimpleGoldSection({ id: "badge" }, "operational-example", badgeDemoFromData); }
function badgeAnatomyPanel() { return renderSimpleGoldSection({ id: "badge" }, "anatomy", badgeDemoFromData); }
function badgeAccessibilityPanel() { return renderSimpleGoldSection({ id: "badge" }, "accessibility", badgeDemoFromData); }
function badgeVariantsPanel() { return renderSimpleGoldSection({ id: "badge" }, "variants", badgeDemoFromData); }
function badgeStatesPanel() { return renderSimpleGoldSection({ id: "badge" }, "states", badgeDemoFromData); }
function badgeStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "badge" }, "variant-state-behavior", badgeDemoFromData); }
function badgeFullWidthPanel() { return renderSimpleGoldSection({ id: "badge" }, "full-width", badgeDemoFromData); }
function badgeResponsivePanel() { return renderSimpleGoldSection({ id: "badge" }, "responsive-layout-patterns", badgeDemoFromData); }
function badgeViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "badge" }, "viewport-organization", badgeDemoFromData); }
function badgePlaygroundPanel() { return renderSimpleGoldSection({ id: "badge" }, "playground", badgeDemoFromData); }
function badgeGuidelinesPanel() { return renderSimpleGoldSection({ id: "badge" }, "guidelines", badgeDemoFromData); }
function badgeContractPanel() { return renderSimpleGoldSection({ id: "badge" }, "api-foundations", badgeDemoFromData); }
function badgeTestPanel() { return renderSimpleGoldSection({ id: "badge" }, "tests-rejection-rules", badgeDemoFromData); }
