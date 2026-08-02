import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderBreadcrumbsGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, breadcrumbsDemoFromData); }
export function breadcrumbsDemo(label = "Breadcrumbs", state = "default") { return simpleDemo("breadcrumbs", { label, state }); }
export function breadcrumbsDemoFromData(demo = {}) { return simpleDemo("breadcrumbs", demo); }
function breadcrumbsOperationalExamplePanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "operational-example", breadcrumbsDemoFromData); }
function breadcrumbsAnatomyPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "anatomy", breadcrumbsDemoFromData); }
function breadcrumbsAccessibilityPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "accessibility", breadcrumbsDemoFromData); }
function breadcrumbsVariantsPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "variants", breadcrumbsDemoFromData); }
function breadcrumbsStatesPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "states", breadcrumbsDemoFromData); }
function breadcrumbsStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "variant-state-behavior", breadcrumbsDemoFromData); }
function breadcrumbsFullWidthPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "full-width", breadcrumbsDemoFromData); }
function breadcrumbsResponsivePanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "responsive-layout-patterns", breadcrumbsDemoFromData); }
function breadcrumbsViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "viewport-organization", breadcrumbsDemoFromData); }
function breadcrumbsPlaygroundPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "playground", breadcrumbsDemoFromData); }
function breadcrumbsContractPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "api-foundations", breadcrumbsDemoFromData); }
function breadcrumbsGuidelinesPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "guidelines", breadcrumbsDemoFromData); }
function breadcrumbsTestPanel() { return renderSimpleGoldSection({ id: "breadcrumbs" }, "tests-rejection-rules", breadcrumbsDemoFromData); }
