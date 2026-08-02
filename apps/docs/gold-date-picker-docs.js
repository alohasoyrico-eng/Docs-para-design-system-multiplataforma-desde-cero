import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderDatePickerGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, datePickerDemoFromData); }
export function datePickerDemo(label = "Service date", value = "18 Jul 2026", state = "default") { return simpleDemo("date-picker", { label, value, state }); }
export function datePickerDemoFromData(demo = {}) { return simpleDemo("date-picker", demo); }
function datePickerOperationalExamplePanel() { return renderSimpleGoldSection({ id: "date-picker" }, "operational-example", datePickerDemoFromData); }
function datePickerAnatomyPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "anatomy", datePickerDemoFromData); }
function datePickerAccessibilityPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "accessibility", datePickerDemoFromData); }
function datePickerVariantsPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "variants", datePickerDemoFromData); }
function datePickerStatesPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "states", datePickerDemoFromData); }
function datePickerStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "variant-state-behavior", datePickerDemoFromData); }
function datePickerFullWidthPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "full-width", datePickerDemoFromData); }
function datePickerResponsivePanel() { return renderSimpleGoldSection({ id: "date-picker" }, "responsive-layout-patterns", datePickerDemoFromData); }
function datePickerViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "viewport-organization", datePickerDemoFromData); }
function datePickerPlaygroundPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "playground", datePickerDemoFromData); }
function datePickerContractPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "api-foundations", datePickerDemoFromData); }
function datePickerGuidelinesPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "guidelines", datePickerDemoFromData); }
function datePickerTestPanel() { return renderSimpleGoldSection({ id: "date-picker" }, "tests-rejection-rules", datePickerDemoFromData); }
