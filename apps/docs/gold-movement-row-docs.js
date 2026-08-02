import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderMovementRowGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, movementRowDemoFromData); }
export function movementRowDemo(label = "Fuel purchase", state = "default") { return simpleDemo("movement-row", { label, state }); }
export function movementRowDemoFromData(demo = {}) { return simpleDemo("movement-row", demo); }
function movementRowOperationalExamplePanel() { return renderSimpleGoldSection({ id: "movement-row" }, "operational-example", movementRowDemoFromData); }
function movementRowAnatomyPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "anatomy", movementRowDemoFromData); }
function movementRowAccessibilityPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "accessibility", movementRowDemoFromData); }
function movementRowVariantsPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "variants", movementRowDemoFromData); }
function movementRowStatesPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "states", movementRowDemoFromData); }
function movementRowStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "variant-state-behavior", movementRowDemoFromData); }
function movementRowFullWidthPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "full-width", movementRowDemoFromData); }
function movementRowResponsivePanel() { return renderSimpleGoldSection({ id: "movement-row" }, "responsive-layout-patterns", movementRowDemoFromData); }
function movementRowViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "viewport-organization", movementRowDemoFromData); }
function movementRowPlaygroundPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "playground", movementRowDemoFromData); }
function movementRowContractPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "api-foundations", movementRowDemoFromData); }
function movementRowGuidelinesPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "guidelines", movementRowDemoFromData); }
function movementRowTestPanel() { return renderSimpleGoldSection({ id: "movement-row" }, "tests-rejection-rules", movementRowDemoFromData); }
