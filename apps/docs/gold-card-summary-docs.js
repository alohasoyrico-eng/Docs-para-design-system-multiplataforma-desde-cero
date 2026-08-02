import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderCardSummaryGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, cardSummaryDemoFromData); }
export function cardSummaryDemo(label = "Driver card", state = "default") { return simpleDemo("card-summary", { label, state }); }
export function cardSummaryDemoFromData(demo = {}) { return simpleDemo("card-summary", demo); }
function cardSummaryOperationalExamplePanel() { return renderSimpleGoldSection({ id: "card-summary" }, "operational-example", cardSummaryDemoFromData); }
function cardSummaryAnatomyPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "anatomy", cardSummaryDemoFromData); }
function cardSummaryAccessibilityPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "accessibility", cardSummaryDemoFromData); }
function cardSummaryVariantsPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "variants", cardSummaryDemoFromData); }
function cardSummaryStatesPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "states", cardSummaryDemoFromData); }
function cardSummaryStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "variant-state-behavior", cardSummaryDemoFromData); }
function cardSummaryFullWidthPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "full-width", cardSummaryDemoFromData); }
function cardSummaryResponsivePanel() { return renderSimpleGoldSection({ id: "card-summary" }, "responsive-layout-patterns", cardSummaryDemoFromData); }
function cardSummaryViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "viewport-organization", cardSummaryDemoFromData); }
function cardSummaryPlaygroundPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "playground", cardSummaryDemoFromData); }
function cardSummaryContractPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "api-foundations", cardSummaryDemoFromData); }
function cardSummaryGuidelinesPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "guidelines", cardSummaryDemoFromData); }
function cardSummaryTestPanel() { return renderSimpleGoldSection({ id: "card-summary" }, "tests-rejection-rules", cardSummaryDemoFromData); }
