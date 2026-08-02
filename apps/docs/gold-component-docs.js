import { configureGoldComponentContext, ui } from "./gold-component-core.js?v=211";
import { buttonDemo, renderButtonGoldSection } from "./gold-button-docs.js?v=218";
import { selectDemo, renderSelectGoldSection } from "./gold-select-docs.js?v=221";
import { comboboxDemo, renderComboboxGoldSection } from "./gold-combobox-docs.js?v=3";
import { countrySelectorDemo, renderCountrySelectorGoldSection } from "./gold-country-selector-docs.js?v=1";
import { cardDemo, renderCardGoldSection } from "./gold-card-docs.js?v=220";
import { renderInputGoldSection, inputDemo } from "./gold-input-docs.js?v=221";
import { checkboxDemo, renderCheckboxGoldSection } from "./gold-checkbox-docs.js?v=211";
import { renderSwitchGoldSection, switchDemo } from "./gold-switch-docs.js?v=210";
import { radioButtonDemo, renderRadioButtonGoldSection } from "./gold-radio-button-docs.js?v=216";
import { renderTextAreaGoldSection, textAreaDemo } from "./gold-text-area-docs.js?v=221";
import { iconButtonDemo, renderIconButtonGoldSection } from "./gold-icon-button-docs.js?v=216";
import { badgeDemo, renderBadgeGoldSection } from "./gold-badge-docs.js?v=224";
import { chipDemo, renderChipGoldSection } from "./gold-chip-docs.js?v=223";
import { renderTagGoldSection, tagDemo } from "./gold-tag-docs.js?v=1";
import { tabsDemo, tabsDemoFromData, renderTabsGoldSection } from "./gold-tabs-docs.js?v=225";
import { renderTooltipGoldSection, tooltipDemo } from "./gold-tooltip-docs.js?v=2";
import { renderToastGoldSection, toastDemo } from "./gold-toast-docs.js?v=1";
import { inlineValidationDemo, renderInlineValidationGoldSection } from "./gold-inline-validation-docs.js?v=1";
import { progressIndicatorDemo, renderProgressIndicatorGoldSection } from "./gold-progress-indicator-docs.js?v=3";
import { renderSpinnerGoldSection, spinnerDemo } from "./gold-spinner-docs.js?v=1";
import { renderSkeletonGoldSection, skeletonDemo } from "./gold-skeleton-docs.js?v=2";
import { dialogDemo, renderDialogGoldSection } from "./gold-dialog-docs.js?v=3";
import { menuDemo, renderMenuGoldSection } from "./gold-menu-docs.js?v=3";
import { drawerDemo, renderDrawerGoldSection } from "./gold-drawer-docs.js?v=4";
import { accordionDemo, renderAccordionGoldSection } from "./gold-accordion-docs.js?v=1";
import { emptyStateDemo, renderEmptyStateGoldSection } from "./gold-empty-state-docs.js?v=1";
import { renderTableGoldSection, tableDemo } from "./gold-table-docs.js?v=3";
import { avatarDemo, renderAvatarGoldSection } from "./gold-avatar-docs.js?v=1";
import { renderSliderGoldSection, sliderDemo } from "./gold-slider-docs.js?v=3";
import { renderStepperGoldSection, stepperDemo } from "./gold-stepper-docs.js?v=4";
import { listDemo, renderListGoldSection } from "./gold-list-docs.js?v=1";
import { kpiTileDemo, renderKpiTileGoldSection } from "./gold-kpi-tile-docs.js?v=1";
import { chartPanelDemo, renderChartPanelGoldSection } from "./gold-chart-panel-docs.js?v=2";
import { stationPinDemo, renderStationPinGoldSection } from "./gold-station-pin-docs.js?v=2";
import { routeSummaryDemo, renderRouteSummaryGoldSection } from "./gold-route-summary-docs.js?v=1";
import { codeInputDemo, renderCodeInputGoldSection } from "./gold-code-input-docs.js?v=3";
import { phoneInputDemo, renderPhoneInputGoldSection } from "./gold-phone-input-docs.js?v=3";
import { cardNumberInputDemo, renderCardNumberInputGoldSection } from "./gold-card-number-input-docs.js?v=1";
import { cardExpiryInputDemo, renderCardExpiryInputGoldSection } from "./gold-card-expiry-input-docs.js?v=1";
import { cardSecurityCodeInputDemo, renderCardSecurityCodeInputGoldSection } from "./gold-card-security-code-input-docs.js?v=1";
import { datePickerDemo, renderDatePickerGoldSection } from "./gold-date-picker-docs.js?v=7";
import { dateRangePickerDemo, renderDateRangePickerGoldSection } from "./gold-date-range-picker-docs.js?v=2";
import { renderSegmentedControlGoldSection, segmentedControlDemo } from "./gold-segmented-control-docs.js?v=3";
import { popoverDemo, renderPopoverGoldSection } from "./gold-popover-docs.js?v=2";
import { floatingActionButtonDemo, renderFloatingActionButtonGoldSection } from "./gold-floating-action-button-docs.js?v=2";
import { cardSummaryDemo, renderCardSummaryGoldSection } from "./gold-card-summary-docs.js?v=1";
import { movementRowDemo, renderMovementRowGoldSection } from "./gold-movement-row-docs.js?v=1";
import { quickActionDemo, renderQuickActionGoldSection } from "./gold-quick-action-docs.js?v=2";
import { biometricPromptDemo, renderBiometricPromptGoldSection } from "./gold-biometric-prompt-docs.js?v=2";
import { breadcrumbsDemo, renderBreadcrumbsGoldSection } from "./gold-breadcrumbs-docs.js?v=1";
import { paginationDemo, renderPaginationGoldSection } from "./gold-pagination-docs.js?v=3";
import { auditEventDemo, renderAuditEventGoldSection } from "./gold-audit-event-docs.js?v=1";
import { errorPanelDemo, renderErrorPanelGoldSection } from "./gold-error-panel-docs.js?v=1";
import { treeViewDemo, renderTreeViewGoldSection } from "./gold-tree-view-docs.js?v=4";
import { motionBoundaryDemo, renderMotionBoundaryGoldSection } from "./gold-motion-boundary-docs.js?v=3";
import { animatedMomentDemo, renderAnimatedMomentGoldSection } from "./gold-animated-moment-docs.js?v=2";

let componentDocs = {};

export { accordionDemo, auditEventDemo, avatarDemo, badgeDemo, biometricPromptDemo, breadcrumbsDemo, buttonDemo, cardDemo, cardExpiryInputDemo, cardNumberInputDemo, cardSecurityCodeInputDemo, cardSummaryDemo, chartPanelDemo, checkboxDemo, chipDemo, comboboxDemo, countrySelectorDemo, datePickerDemo, dateRangePickerDemo, dialogDemo, drawerDemo, emptyStateDemo, errorPanelDemo, floatingActionButtonDemo, iconButtonDemo, inlineValidationDemo, kpiTileDemo, listDemo, animatedMomentDemo, menuDemo, motionBoundaryDemo, movementRowDemo, codeInputDemo, paginationDemo, phoneInputDemo, popoverDemo, progressIndicatorDemo, quickActionDemo, radioButtonDemo, routeSummaryDemo, segmentedControlDemo, selectDemo, skeletonDemo, spinnerDemo, sliderDemo, stationPinDemo, stepperDemo, switchDemo, tableDemo, tabsDemo, tabsDemoFromData, tagDemo, textAreaDemo, inputDemo, toastDemo, tooltipDemo, treeViewDemo };
export { demoCell } from "./gold-component-core.js?v=211";

export function configureGoldComponentDocs(nextDeps) {
  componentDocs = nextDeps.componentDocs;
  configureGoldComponentContext(nextDeps);
}

export function goldComponentDocumentationTabs(entry) {
  const componentContract = componentDocs.components[entry.id];
  const tabContracts = new Map((componentDocs.tabs ?? []).map((tab) => [tab.id, tab]));
  return componentContract.tabs.map((tabId) => {
    const tab = tabContracts.get(tabId);
    return {
      id: tab.id,
      label: ui(`tabs.${tab.id}`) ?? tab.label,
      body: renderGoldComponentSections(entry, componentContract.renderer, tab.sections),
    };
  });
}

function renderGoldComponentSections(entry, renderer, sections) {
  return sections.map((section) => renderGoldComponentSection(entry, renderer, section)).join("");
}

function renderGoldComponentSection(entry, renderer, section) {
  if (renderer === "button") return renderButtonGoldSection(entry, section);
  if (renderer === "select") return renderSelectGoldSection(entry, section);
  if (renderer === "combobox") return renderComboboxGoldSection(entry, section);
  if (renderer === "country-selector") return renderCountrySelectorGoldSection(entry, section);
  if (renderer === "card") return renderCardGoldSection(entry, section);
  if (renderer === "input") return renderInputGoldSection(entry, section);
  if (renderer === "checkbox") return renderCheckboxGoldSection(entry, section);
  if (renderer === "switch") return renderSwitchGoldSection(entry, section);
  if (renderer === "radio-button") return renderRadioButtonGoldSection(entry, section);
  if (renderer === "text-area") return renderTextAreaGoldSection(entry, section);
  if (renderer === "icon-button") return renderIconButtonGoldSection(entry, section);
  if (renderer === "badge") return renderBadgeGoldSection(entry, section);
  if (renderer === "chip") return renderChipGoldSection(entry, section);
  if (renderer === "tag") return renderTagGoldSection(entry, section);
  if (renderer === "tabs") return renderTabsGoldSection(entry, section);
  if (renderer === "tooltip") return renderTooltipGoldSection(entry, section);
  if (renderer === "toast") return renderToastGoldSection(entry, section);
  if (renderer === "inline-validation") return renderInlineValidationGoldSection(entry, section);
  if (renderer === "progress-indicator") return renderProgressIndicatorGoldSection(entry, section);
  if (renderer === "spinner") return renderSpinnerGoldSection(entry, section);
  if (renderer === "skeleton") return renderSkeletonGoldSection(entry, section);
  if (renderer === "dialog") return renderDialogGoldSection(entry, section);
  if (renderer === "menu") return renderMenuGoldSection(entry, section);
  if (renderer === "drawer") return renderDrawerGoldSection(entry, section);
  if (renderer === "accordion") return renderAccordionGoldSection(entry, section);
  if (renderer === "empty-state") return renderEmptyStateGoldSection(entry, section);
  if (renderer === "table") return renderTableGoldSection(entry, section);
  if (renderer === "avatar") return renderAvatarGoldSection(entry, section);
  if (renderer === "slider") return renderSliderGoldSection(entry, section);
  if (renderer === "stepper") return renderStepperGoldSection(entry, section);
  if (renderer === "list") return renderListGoldSection(entry, section);
  if (renderer === "kpi-tile") return renderKpiTileGoldSection(entry, section);
  if (renderer === "chart-panel") return renderChartPanelGoldSection(entry, section);
  if (renderer === "station-pin") return renderStationPinGoldSection(entry, section);
  if (renderer === "route-summary") return renderRouteSummaryGoldSection(entry, section);
  if (renderer === "code-input") return renderCodeInputGoldSection(entry, section);
  if (renderer === "phone-input") return renderPhoneInputGoldSection(entry, section);
  if (renderer === "card-number-input") return renderCardNumberInputGoldSection(entry, section);
  if (renderer === "card-expiry-input") return renderCardExpiryInputGoldSection(entry, section);
  if (renderer === "card-security-code-input") return renderCardSecurityCodeInputGoldSection(entry, section);
  if (renderer === "date-picker") return renderDatePickerGoldSection(entry, section);
  if (renderer === "date-range-picker") return renderDateRangePickerGoldSection(entry, section);
  if (renderer === "segmented-control") return renderSegmentedControlGoldSection(entry, section);
  if (renderer === "popover") return renderPopoverGoldSection(entry, section);
  if (renderer === "floating-action-button") return renderFloatingActionButtonGoldSection(entry, section);
  if (renderer === "card-summary") return renderCardSummaryGoldSection(entry, section);
  if (renderer === "movement-row") return renderMovementRowGoldSection(entry, section);
  if (renderer === "quick-action") return renderQuickActionGoldSection(entry, section);
  if (renderer === "biometric-prompt") return renderBiometricPromptGoldSection(entry, section);
  if (renderer === "breadcrumbs") return renderBreadcrumbsGoldSection(entry, section);
  if (renderer === "pagination") return renderPaginationGoldSection(entry, section);
  if (renderer === "audit-event") return renderAuditEventGoldSection(entry, section);
  if (renderer === "error-panel") return renderErrorPanelGoldSection(entry, section);
  if (renderer === "tree-view") return renderTreeViewGoldSection(entry, section);
  if (renderer === "motion-boundary") return renderMotionBoundaryGoldSection(entry, section);
  if (renderer === "animated-moment") return renderAnimatedMomentGoldSection(entry, section);
  return "";
}
