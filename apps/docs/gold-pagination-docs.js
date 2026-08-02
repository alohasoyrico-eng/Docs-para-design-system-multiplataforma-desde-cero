import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderPaginationGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, paginationDemoFromData); }
export function paginationDemo(label = "Pagination", state = "default") { return simpleDemo("pagination", { label, state }); }
export function paginationDemoFromData(demo = {}) { return simpleDemo("pagination", demo); }
function paginationOperationalExamplePanel() { return renderSimpleGoldSection({ id: "pagination" }, "operational-example", paginationDemoFromData); }
function paginationAnatomyPanel() { return renderSimpleGoldSection({ id: "pagination" }, "anatomy", paginationDemoFromData); }
function paginationAccessibilityPanel() { return renderSimpleGoldSection({ id: "pagination" }, "accessibility", paginationDemoFromData); }
function paginationVariantsPanel() { return renderSimpleGoldSection({ id: "pagination" }, "variants", paginationDemoFromData); }
function paginationStatesPanel() { return renderSimpleGoldSection({ id: "pagination" }, "states", paginationDemoFromData); }
function paginationStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "pagination" }, "variant-state-behavior", paginationDemoFromData); }
function paginationFullWidthPanel() { return renderSimpleGoldSection({ id: "pagination" }, "full-width", paginationDemoFromData); }
function paginationResponsivePanel() { return renderSimpleGoldSection({ id: "pagination" }, "responsive-layout-patterns", paginationDemoFromData); }
function paginationViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "pagination" }, "viewport-organization", paginationDemoFromData); }
function paginationPlaygroundPanel() { return renderSimpleGoldSection({ id: "pagination" }, "playground", paginationDemoFromData); }
function paginationContractPanel() { return renderSimpleGoldSection({ id: "pagination" }, "api-foundations", paginationDemoFromData); }
function paginationGuidelinesPanel() { return renderSimpleGoldSection({ id: "pagination" }, "guidelines", paginationDemoFromData); }
function paginationTestPanel() { return renderSimpleGoldSection({ id: "pagination" }, "tests-rejection-rules", paginationDemoFromData); }
