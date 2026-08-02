import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderDateRangePickerGoldSection(entry, section) {
  return renderSimpleGoldSection(entry, section, dateRangePickerDemoFromData);
}

export function dateRangePickerDemo(label = "Reporting range", value = { from: "2026-07-01", to: "2026-07-15" }, state = "default") {
  return simpleDemo("date-range-picker", { label, value, state });
}

export function dateRangePickerDemoFromData(demo = {}) {
  return simpleDemo("date-range-picker", demo);
}

function dateRangePickerOperationalExamplePanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "operational-example", dateRangePickerDemoFromData); }
function dateRangePickerAnatomyPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "anatomy", dateRangePickerDemoFromData); }
function dateRangePickerAccessibilityPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "accessibility", dateRangePickerDemoFromData); }
function dateRangePickerVariantsPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "variants", dateRangePickerDemoFromData); }
function dateRangePickerStatesPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "states", dateRangePickerDemoFromData); }
function dateRangePickerStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "variant-state-behavior", dateRangePickerDemoFromData); }
function dateRangePickerFullWidthPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "full-width", dateRangePickerDemoFromData); }
function dateRangePickerResponsivePanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "responsive-layout-patterns", dateRangePickerDemoFromData); }
function dateRangePickerViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "viewport-organization", dateRangePickerDemoFromData); }
function dateRangePickerPlaygroundPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "playground", dateRangePickerDemoFromData); }
function dateRangePickerContractPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "api-foundations", dateRangePickerDemoFromData); }
function dateRangePickerGuidelinesPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "guidelines", dateRangePickerDemoFromData); }
function dateRangePickerTestPanel() { return renderSimpleGoldSection({ id: "date-range-picker" }, "tests-rejection-rules", dateRangePickerDemoFromData); }
