import { createButton, createIconButton } from "./components/actions.js?v=2";
import { createCheckbox, createRadioButton, createSwitch } from "./components/choices.js?v=11";
import {
  createCardSummary,
  createChartPanel,
  createMovementRow,
  createQuickAction,
  createRouteSummary,
  createStationPin,
  createTable,
} from "./components/commerce.js?v=15";
import { createAuditEvent, createAvatar, createKpiTile, createList } from "./components/display.js?v=3";
import { createEmptyState, createErrorPanel, createProgressIndicator, createSkeleton, createSpinner } from "./components/feedback.js?v=8";
import { createCombobox, createSelect, createTextArea, createInput } from "./components/fields.js?v=20";
import {
  createAccordion,
  createSegmentedControl,
  createSlider,
  createTabs,
  createTreeView,
} from "./components/interactions.js?v=9";
import { createBreadcrumbs, createPagination, createStepper } from "./components/navigation.js";
import { createAnimatedMoment, createMotionBoundary } from "./components/motion.js?v=5";
import {
  createDialog,
  createDrawer,
  createMenu,
  createPopover,
  createToast,
  createTooltip,
} from "./components/overlays.js?v=5";
import { createBiometricPrompt } from "./components/security.js?v=3";
import { createCardExpiryInput, createCardNumberInput, createCardSecurityCodeInput, createCountrySelector, createDatePicker, createDateRangePicker, createCodeInput, createPhoneInput } from "./components/specialized-inputs.js?v=28";
import { createBadge, createChip, createTag } from "./components/status.js?v=2";
import { createCard, createFloatingActionButton, createInlineValidation } from "./components/surfaces.js?v=10";

export const componentRegistry = Object.freeze({
  accordion: createAccordion,
  "animated-moment": createAnimatedMoment,
  "audit-event": createAuditEvent,
  avatar: createAvatar,
  badge: createBadge,
  "biometric-prompt": createBiometricPrompt,
  breadcrumbs: createBreadcrumbs,
  button: createButton,
  card: createCard,
  "card-expiry-input": createCardExpiryInput,
  "card-number-input": createCardNumberInput,
  "card-security-code-input": createCardSecurityCodeInput,
  "card-summary": createCardSummary,
  checkbox: createCheckbox,
  chip: createChip,
  "chart-panel": createChartPanel,
  combobox: createCombobox,
  "country-selector": createCountrySelector,
  "date-picker": createDatePicker,
  "date-range-picker": createDateRangePicker,
  dialog: createDialog,
  drawer: createDrawer,
  "empty-state": createEmptyState,
  "error-panel": createErrorPanel,
  "floating-action-button": createFloatingActionButton,
  "icon-button": createIconButton,
  "inline-validation": createInlineValidation,
  "kpi-tile": createKpiTile,
  list: createList,
  menu: createMenu,
  "motion-boundary": createMotionBoundary,
  "movement-row": createMovementRow,
  "code-input": createCodeInput,
  pagination: createPagination,
  "phone-input": createPhoneInput,
  popover: createPopover,
  "progress-indicator": createProgressIndicator,
  "quick-action": createQuickAction,
  "radio-button": createRadioButton,
  "route-summary": createRouteSummary,
  "segmented-control": createSegmentedControl,
  select: createSelect,
  skeleton: createSkeleton,
  spinner: createSpinner,
  slider: createSlider,
  "station-pin": createStationPin,
  stepper: createStepper,
  switch: createSwitch,
  table: createTable,
  tabs: createTabs,
  tag: createTag,
  "text-area": createTextArea,
  input: createInput,
  toast: createToast,
  tooltip: createTooltip,
  "tree-view": createTreeView,
});

export function listComponents() {
  return Object.keys(componentRegistry);
}

export function hasComponent(id) {
  return Boolean(componentRegistry[id]);
}

export function renderComponent(id, props = {}) {
  const factory = componentRegistry[id];
  if (!factory) throw new Error(`Unknown Package component: ${id}`);
  return factory(props);
}

function demoSlug(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function componentDemoProps(component, demo = {}) {
  const state = demo.state ?? "default";
  if (component === "button") return {
    label: demo.label ?? "Action",
    variant: String(demo.variant ?? "primary").replace(" full", ""),
    intent: demo.intent ?? "default",
    density: demo.density || demo.size || "md",
    state,
    icon: demo.icon === "none" ? "" : demo.icon ?? "",
    trailingIcon: demo.trailingIcon ?? demo.iconTrailing ?? "",
    disabled: state === "disabled",
    loading: state === "loading" || Boolean(demo.loading),
    fullWidth: Boolean(demo.fullWidth) || String(demo.variant ?? "").includes("full"),
  };
  if (component === "icon-button") return { ariaLabel: demo.ariaLabel ?? demo.label ?? "Action", icon: demo.icon ?? "grid_view", variant: demo.variant ?? "ghost", density: demo.density ?? "md", selected: Boolean(demo.selected) || state === "selected" || state === "badged", badge: Boolean(demo.badge) || state === "badged", disabled: state === "disabled" };
  if (component === "select") return {
    label: demo.field ?? demo.label ?? "Select",
    value: demo.value ?? (demo.variant === "inline" ? "MX" : "north"),
    helper: demo.helper ?? "",
    disabled: state === "disabled" || state === "loading",
    icon: demo.icon ?? "",
    density: demo.density ?? "md",
    variant: demo.variant ?? "default",
    state,
    options: demo.options ?? (demo.variant === "inline"
      ? [{ label: "Mexico", value: "MX", meta: "+52" }, { label: "United States", value: "US", meta: "+1" }, { label: "Cuba", value: "CU", meta: "+53" }]
      : [{ label: demo.value ?? "North Region Fleet", value: demo.value ?? "north" }, { label: "South Region Fleet", value: "south" }, { label: "Maintenance", value: "maintenance", disabled: state === "disabled" }]),
  };
  if (component === "combobox") return {
    label: demo.field ?? demo.label ?? "Vehicle",
    value: demo.value ?? "",
    helper: demo.helper ?? "Search by plate, driver, or fleet",
    icon: demo.icon ?? "search",
    placeholder: demo.placeholder ?? "Search or select",
    emptyText: demo.emptyText ?? "No matching options",
    disabled: state === "disabled",
    density: demo.density ?? "md",
    state,
    options: demo.options ?? [
      { label: "MX-4821 - Ana Gomez", value: "mx-4821", meta: "Driver" },
      { label: "MX-8840 - Luis Perez", value: "mx-8840", meta: "Vehicle" },
      { label: "North Region Fleet", value: "north-region", meta: "Fleet" },
      { label: "Maintenance", value: "maintenance", meta: "Queue", disabled: state === "disabled" },
    ],
  };
  if (component === "country-selector") return {
    label: demo.label ?? "Country",
    value: demo.value ?? demo.country ?? "MX",
    country: demo.country ?? demo.value ?? "MX",
    disabled: state === "disabled",
    invalid: state === "error",
    density: demo.density ?? "md",
    inline: Boolean(demo.inline),
    countries: demo.countries,
  };
  if (component === "card") return {
    title: demo.title ?? demo.label ?? "Wallet balance",
    value: demo.value ?? "$8,412.50",
    unit: demo.unit ?? "",
    detail: demo.detail ?? demo.description ?? "Available for assigned drivers.",
    status: demo.status ?? (state === "selected" ? "Selected" : state === "error" ? "Needs review" : ""),
    trend: demo.trend ?? "neutral",
    icon: demo.icon ?? "",
    media: demo.media ?? "",
    mediaAlt: demo.mediaAlt ?? "",
    variant: demo.variant ?? "default",
    composition: demo.composition ?? "standard",
    state,
    density: demo.density ?? "md",
    fullWidth: Boolean(demo.fullWidth),
    interactive: Boolean(demo.interactive) || ["interactive", "hover", "focus", "selected"].includes(state),
    selected: Boolean(demo.selected) || state === "selected",
    disabled: state === "disabled",
    loading: state === "loading",
    actions: demo.actions ?? [],
  };
  if (component === "input") {
    const captureVariants = ["text", "email", "password", "number", "currency", "unit", "search"];
    const variant = captureVariants.includes(demo.variant) ? demo.variant : demo.inputVariant ?? "text";
    return {
      label: demo.field ?? demo.label ?? "Driver name",
      value: demo.value ?? "",
      placeholder: demo.placeholder ?? "",
      helper: demo.helper ?? "",
      error: state === "error" ? demo.helper ?? "Fix the value to continue" : "",
      disabled: state === "disabled",
      loading: state === "loading",
      density: demo.density ?? "md",
      state,
      icon: demo.icon ?? "",
      prefix: demo.prefix ?? "",
      suffix: demo.suffix ?? "",
      mono: Boolean(demo.mono),
      type: demo.type ?? "text",
      variant,
      inputMode: demo.inputMode ?? "",
      autocomplete: demo.autocomplete ?? "",
      align: demo.align ?? (["number", "currency", "unit"].includes(variant) ? "end" : "start"),
      revealable: Boolean(demo.revealable) || variant === "password",
    };
  }
  if (component === "checkbox") return {
    label: demo.label ?? "Enable fuel card",
    description: demo.description ?? "",
    error: state === "error" ? demo.error ?? "Required before continuing." : demo.error ?? "",
    variant: demo.variant ?? "default",
    state,
    density: demo.density ?? "md",
    checked: Boolean(demo.checked) || state === "checked",
    indeterminate: Boolean(demo.indeterminate) || state === "indeterminate",
    disabled: state === "disabled",
    required: Boolean(demo.required),
    name: demo.name ?? "",
    value: demo.value ?? "on"
  };
  if (component === "switch") return {
    label: demo.label ?? "Send driver alerts",
    description: demo.description ?? "",
    error: state === "error" ? demo.error ?? "Review required before enabling." : demo.error ?? "",
    state,
    density: demo.density ?? "md",
    checked: Boolean(demo.checked) || state === "on" || state === "pressed",
    disabled: state === "disabled",
    required: Boolean(demo.required),
    name: demo.name ?? ""
  };
  if (component === "radio-button") return {
    label: demo.label ?? "Recommended route",
    value: demo.value ?? demoSlug(demo.label ?? "recommended"),
    description: demo.description ?? "",
    error: state === "error" ? demo.error ?? "Select an available option." : demo.error ?? "",
    variant: demo.variant ?? "default",
    state,
    density: demo.density ?? "md",
    checked: Boolean(demo.checked) || state === "selected",
    disabled: state === "disabled",
    required: Boolean(demo.required),
    name: demo.name ?? `radio-demo-${demoSlug(demo.label ?? "recommended")}`
  };
  if (component === "text-area") return {
    label: demo.field ?? demo.label ?? "Operational note",
    value: demo.value ?? "",
    placeholder: demo.placeholder ?? "",
    helper: demo.helper ?? "",
    error: state === "error" ? demo.helper ?? "Fix the note to continue" : "",
    rows: demo.rows ?? 3,
    maxLength: demo.maxLength,
    density: demo.density ?? "md",
    state,
    disabled: state === "disabled",
    loading: state === "loading",
  };
  if (component === "avatar") return { name: demo.name ?? demo.label ?? "Ana Sosa", src: demo.src ?? "", size: demo.size ?? demo.density ?? "md", density: demo.density, status: demo.status ?? "online", state };
  if (component === "slider") return {
    label: demo.label ?? "Search radius",
    value: demo.value ?? 42,
    min: demo.min ?? 0,
    max: demo.max ?? 100,
    step: demo.step ?? 1,
    variant: demo.variant ?? "continuous",
    state,
    density: demo.density ?? "md",
    unit: demo.unit ?? "",
    valueLabel: demo.valueLabel ?? "",
    disabled: state === "disabled",
  };
  if (component === "list") {
    const listState = ["default", "hover", "selected", "loading", "error", "disabled"].includes(state) ? state : "default";
    const listItems = demo.items ?? [
      { key: "fuel", label: demo.label ?? "Fuel movement approved", meta: demo.meta ?? "Ana Sosa - Today", value: demo.value ?? "$842", icon: demo.icon ?? "local_gas_station" },
      { key: "receipt", label: "Receipt pending", meta: "Luis Vera - Yesterday", value: "$631", icon: "receipt_long" },
      { key: "frozen", label: "Card frozen", meta: "Iris Mora - Review", value: "$120", icon: "block", tone: "danger" },
    ];
    const rows = listItems.map((item, index) => {
      let rowState = "default";
      if (listState === "hover" && index === 0) rowState = "hover";
      if (listState === "selected" && index === 1) rowState = "selected";
      if (listState === "loading" && index === 0) rowState = "loading";
      if (listState === "error" && index === 2) rowState = "error";
      if (listState === "disabled" && index === 0) rowState = "disabled";
      return { ...item, state: item.state ?? rowState };
    });
    return {
      label: demo.ariaLabel ?? "Movements",
      variant: demo.variant ?? "standard",
      state: listState,
      density: demo.density ?? "md",
      interactive: Boolean(demo.interactive) || demo.variant === "action",
      items: rows,
    };
  }
  if (component === "kpi-tile") return {
    label: demo.label ?? "Fuel spend",
    value: demo.value ?? "$84.2k",
    delta: demo.delta ?? (demo.variant === "standard" ? "" : "+12% vs last week"),
    trend: demo.trend ?? (demo.tone === "danger" ? "down" : "up"),
    tone: demo.tone ?? (state === "risk" || demo.variant === "threshold" ? "warning" : "info"),
    icon: demo.icon ?? "",
    variant: demo.variant ?? "standard",
    state,
    density: demo.density ?? "md",
    values: demo.values ?? [],
    href: demo.href ?? "",
    selected: state === "selected",
    disabled: state === "disabled",
    loading: state === "loading",
  };
  if (component === "floating-action-button") return { label: demo.label ?? "Add movement", icon: demo.icon ?? "add", variant: demo.variant ?? "primary", state, density: demo.density ?? "md", extended: demo.variant === "extended" || Boolean(demo.extended), loading: state === "loading" || Boolean(demo.loading), disabled: state === "disabled" || Boolean(demo.disabled), type: demo.type ?? "button" };
  if (component === "badge") return { label: demo.label ?? demo.count ?? "8", tone: demo.tone ?? "neutral", variant: demo.variant ?? "count", state, hidden: state === "hidden", live: Boolean(demo.live), icon: demo.icon ?? "", ariaLabel: demo.ariaLabel ?? "" };
  if (component === "chip") return { label: demo.label ?? "Active filter", variant: demo.variant ?? "filter", tone: demo.tone ?? "default", state, selected: Boolean(demo.selected) || state === "selected", disabled: state === "disabled", removable: Boolean(demo.removable), icon: demo.icon ?? "", interactive: Boolean(demo.interactive) || state !== "default" || Boolean(demo.selected) || Boolean(demo.removable) };
  if (component === "tag") return { label: demo.label ?? "Cross-platform", variant: demo.variant ?? "metadata", tone: demo.tone ?? "neutral", state, icon: demo.icon ?? "", interactive: Boolean(demo.interactive) || demo.variant === "link", disabled: state === "disabled" };
  if (component === "tabs") {
    const itemCount = Number(demo.itemCount ?? (state === "overflow" ? 5 : 3));
    const fallbackItems = itemCount >= 5 ? [{ key: "overview", label: "Overview" }, { key: "movements", label: "Movements" }, { key: "fuel", label: "Fuel" }, { key: "ev", label: "EV" }, { key: "finance", label: "Finance" }] : [{ key: "overview", label: "Overview" }, { key: "movements", label: "Movements" }, { key: "settings", label: "Settings" }];
    const items = (demo.items ?? fallbackItems).map((item, index) => ({
      key: item.key ?? item.value ?? demoSlug(item.label ?? `item-${index}`),
      label: item.label ?? item.key ?? item.value ?? `Item ${index + 1}`,
      disabled: item.disabled,
      icon: item.icon ?? "",
      count: item.count,
      badge: item.badge,
    }));
    return { label: demo.ariaLabel ?? "Tabs demo", items, selectedKey: demo.selectedKey ?? items.find((item) => item.selected)?.key ?? items[0]?.key, variant: demo.variant ?? "default" };
  }
  if (component === "tooltip") return {
    triggerLabel: demo.trigger ?? "Info",
    content: demo.label ?? demo.content ?? "Short contextual help.",
    id: `tooltip-demo-${demoSlug(demo.trigger ?? "info")}`,
    placement: demo.placement ?? "top",
    variant: demo.variant ?? "default",
    density: demo.density ?? "md",
    state: demo.state ?? state,
    disabled: state === "disabled" || Boolean(demo.disabled),
  };
  if (component === "toast") return { label: demo.label ?? "Toast message", description: demo.description ?? "", tone: demo.tone ?? "neutral", variant: demo.variant ?? "status", state: demo.state ?? state ?? "visible", density: demo.density ?? "md", icon: demo.icon ?? "", actionLabel: demo.actionLabel ?? "", dismissible: Boolean(demo.dismissible) };
  if (component === "progress-indicator") return {
    label: demo.label ?? "Progress",
    value: demo.value ?? 68,
    max: demo.max ?? 100,
    indeterminate: state === "indeterminate" || demo.variant === "indeterminate",
    showValue: Boolean(demo.showValue),
    tone: demo.tone ?? (state === "complete" ? "success" : state === "paused" ? "warning" : state === "error" ? "danger" : "accent"),
    state,
    density: demo.density ?? "md",
    fullWidth: Boolean(demo.fullWidth),
  };
  if (component === "spinner") return {
    label: demo.label ?? "Loading",
    density: demo.density ?? "md",
    tone: demo.tone ?? (state === "subtle" ? "ink" : state === "danger" ? "danger" : "accent"),
    state: demo.state ?? "loading",
    decorative: Boolean(demo.decorative),
  };
  if (component === "skeleton") return {
    label: demo.label ?? "Content loading",
    variant: demo.variant ?? "card",
    lines: demo.lines ?? 3,
    busy: !["loaded", "complete", "disabled"].includes(state),
    state,
    fullWidth: Boolean(demo.fullWidth),
    width: demo.width ?? "",
    height: demo.height ?? "",
    rows: demo.rows ?? demo.lines,
    columns: demo.columns ?? 4,
  };
  if (component === "accordion") return {
    items: demo.items ?? [
      { title: demo.label ?? "Documents", content: demo.description ?? "Driver license, insurance, and vehicle inspection are ready for review.", open: state !== "closed", icon: demo.icon ?? "description", meta: demo.meta ?? "3 of 4", disabled: state === "disabled" },
      { title: "Limits", content: "Daily fuel limit and route exception policy are active.", icon: "speed", meta: "2 rules" },
      { title: "Audit", content: "Last update was approved by Operations.", icon: "history", meta: "Updated" }
    ],
    multiple: Boolean(demo.multiple),
    density: demo.variant === "compact" ? "sm" : demo.density ?? "md"
  };
  if (component === "empty-state") return {
    title: demo.label ?? "No active vehicles",
    description: demo.description ?? "When a vehicle connects, it will appear here.",
    icon: demo.icon ?? "inbox",
    action: demo.actionLabel ? { label: demo.actionLabel } : undefined,
    variant: demo.variant ?? "first-use",
    state,
    density: demo.density ?? "md",
    fullWidth: Boolean(demo.fullWidth),
  };
  if (component === "breadcrumbs") {
    const resolvedVariant = demo.variant ?? "standard";
    const needsCollapsedPath = resolvedVariant === "overflow" || state === "collapsed";
    const defaultItems = needsCollapsedPath
      ? [
          { label: "Fleet", href: "#/components/breadcrumbs" },
          { label: "Regions", href: "#/components/breadcrumbs" },
          { label: "North", href: "#/components/breadcrumbs" },
          { label: "Cards", href: "#/components/breadcrumbs" },
          { label: "Limits", href: "#/components/breadcrumbs" },
          { label: demo.label ?? "JMX-214-B", current: true },
        ]
      : [
          { label: "Fleet", href: "#/components/breadcrumbs" },
          { label: "Cards", href: "#/components/breadcrumbs" },
          { label: "Limits", href: "#/components/breadcrumbs" },
          { label: demo.label ?? "JMX-214-B", current: true },
        ];
    return {
      items: demo.items ?? defaultItems,
      label: demo.ariaLabel ?? demo.label ?? "Breadcrumbs",
      variant: resolvedVariant,
      state,
      density: demo.density ?? "md",
      maxItems: demo.maxItems ?? (needsCollapsedPath ? 4 : undefined),
      separator: demo.separator ?? "chevron_right",
      disabled: state === "disabled",
      fullWidth: Boolean(demo.fullWidth),
    };
  }
  if (component === "pagination") return {
    page: demo.page ?? (demo.state === "selected" || state === "selected" ? 6 : 4),
    pageCount: demo.pageCount ?? demo.pages?.length ?? 12,
    label: demo.ariaLabel ?? demo.label ?? "Pagination",
    variant: "numbered",
    state,
    density: demo.density ?? "md",
    disabled: state === "disabled",
    fullWidth: Boolean(demo.fullWidth),
  };
  if (component === "audit-event") return {
    label: demo.label ?? "Limit changed",
    description: demo.description ?? "Ana Sosa updated fuel limit for card MX 4821.",
    meta: demo.meta ?? "Ana Sosa - Operations",
    timestamp: demo.timestamp ?? "09:42",
    status: demo.status ?? (state === "critical" ? "Critical" : state === "warning" ? "Review" : state === "verified" ? "Verified" : "Logged"),
    icon: demo.icon ?? "manage_history",
    tone: demo.tone ?? (state === "critical" ? "danger" : state === "warning" ? "warning" : state === "verified" ? "success" : "neutral"),
    state,
    density: demo.density ?? "md",
  };
  if (component === "error-panel") return {
    label: demo.label ?? "Something needs attention",
    description: demo.description ?? "We could not load the latest card data. Keep the current context and try again.",
    action: demo.actionLabel === "" ? undefined : { label: demo.actionLabel ?? "Try again" },
    tone: state === "warning" ? "warning" : "error",
    variant: demo.variant ?? "panel",
    state,
    density: demo.density ?? "md",
    fullWidth: Boolean(demo.fullWidth),
    icon: demo.icon ?? "",
  };
  if (component === "inline-validation") return { label: demo.label ?? "Input", value: demo.value ?? "", message: demo.message ?? "", state, fullWidth: Boolean(demo.fullWidth) };
  if (component === "stepper") return {
    label: demo.label ?? "Setup progress",
    current: demo.current ?? 1,
    orientation: demo.orientation ?? (demo.variant === "vertical" ? "vertical" : "horizontal"),
    density: demo.density ?? "md",
    steps: demo.steps ?? [
      { label: "Vehicle", description: "Basic data" },
      { label: "Driver", description: "Assignment" },
      { label: "Confirm", description: "Review" },
    ],
  };
  if (component === "chart-panel") return {
    label: demo.label ?? "Fuel trend",
    value: demo.value ?? "84%",
    caption: demo.caption ?? "",
    values: demo.values ?? [32, 54, 48, 70, 62, 84],
    valueLabels: demo.valueLabels ?? [],
    labels: demo.labels ?? [],
    segments: demo.segments ?? [],
    series: demo.series ?? [],
    comparisons: demo.comparisons ?? [],
    variant: demo.variant ?? "sparkline",
    state,
    tone: demo.tone ?? (state === "warning" ? "warning" : state === "error" ? "danger" : "info"),
    density: demo.density ?? "md",
    fullWidth: Boolean(demo.fullWidth),
  };
  if (component === "station-pin") {
    const resolvedVariant = demo.variant ?? "fuel";
    return {
      label: demo.label ?? (resolvedVariant === "cluster" ? "Station cluster" : "Pemex Polanco"),
      value: demo.value ?? (resolvedVariant === "cluster" ? "" : resolvedVariant === "ev" ? "$4.2/kWh" : "$23.4"),
      meta: demo.meta ?? (resolvedVariant === "cluster" ? "6 nearby" : "1.8 km - 24 h"),
      icon: demo.icon ?? "local_gas_station",
      count: demo.count,
      variant: resolvedVariant,
      state,
      density: demo.density ?? "md",
      disabled: state === "disabled",
      unavailable: state === "unavailable",
      selected: state === "selected",
    };
  }
  if (component === "route-summary") return {
    label: demo.label ?? (demo.variant === "compact" ? "Hacia G500 Roma Norte" : "Fast route"),
    description: demo.description ?? (demo.variant === "compact" ? "0.9 km · llegas en 4 min" : "Best option for current policy and station availability."),
    metrics: demo.metrics ?? [{ label: "ETA", value: demo.meta ?? "18 min" }, { label: "Distance", value: demo.distance ?? "12.4 km" }, { label: "Fuel", value: demo.fuel ?? "$842" }],
    actions: demo.actions ?? (demo.variant === "compact" ? [{ label: "Cancelar ruta", icon: "close", variant: "ghost" }] : [{ label: demo.primaryLabel ?? "Start route" }, { label: demo.secondaryLabel ?? "Compare", variant: "secondary" }]),
    variant: demo.variant ?? "standard",
    state,
    density: demo.density ?? "md",
    tone: demo.tone ?? (state === "warning" ? "warning" : "neutral"),
    icon: demo.icon ?? "navigation",
    selected: state === "selected",
    disabled: state === "disabled",
    fullWidth: Boolean(demo.fullWidth),
  };
  if (component === "code-input") return {
    label: demo.label ?? "Security code",
    value: demo.value ?? "428195",
    length: demo.length ?? 6,
    variant: demo.variant ?? "sms",
    helper: state === "error" ? "" : demo.helper ?? "Code expires in 00:42",
    error: state === "error" ? demo.error ?? demo.helper ?? "Code expired" : "",
    state,
    density: demo.density ?? "md",
    disabled: state === "disabled",
  };
  if (component === "phone-input") return {
    label: demo.label ?? "Phone number",
    value: demo.value ?? "55 1842 9011",
    country: demo.country ?? "MX",
    prefix: demo.prefix ?? "+52",
    variant: demo.variant ?? "country-code",
    helper: state === "error" ? "" : demo.helper ?? "Used for OTP and support recovery.",
    error: state === "error" ? demo.error ?? demo.helper ?? "Enter a reachable number." : "",
    state,
    density: demo.density ?? "md",
    disabled: state === "disabled",
  };
  if (component === "card-number-input") return {
    label: demo.label ?? "Card number",
    value: demo.value ?? "5231 0000 0000 0000",
    helper: state === "error" ? "" : demo.helper ?? "Use the number printed on the front of the card.",
    error: state === "error" ? demo.error ?? demo.helper ?? "Check the card number." : "",
    state,
    density: demo.density ?? "md",
    disabled: state === "disabled",
    loading: state === "loading",
    name: demo.name ?? "",
    placeholder: demo.placeholder ?? "5231 0000 0000 0000",
    validationMessage: demo.validationMessage ?? "Check the card number.",
  };
  if (component === "card-expiry-input") return {
    label: demo.label ?? "Expiry date",
    value: demo.value ?? "12/28",
    helper: state === "error" ? "" : demo.helper ?? "Use the expiry printed on the card.",
    error: state === "error" ? demo.error ?? demo.helper ?? "Check the expiry date." : "",
    state,
    density: demo.density ?? "md",
    disabled: state === "disabled",
    loading: state === "loading",
    name: demo.name ?? "",
    placeholder: demo.placeholder ?? "MM/YY",
    validationMessage: demo.validationMessage ?? "Check the expiry date.",
    expiredMessage: demo.expiredMessage ?? "Use a card that has not expired.",
  };
  if (component === "card-security-code-input") return {
    label: demo.label ?? "Security code",
    value: demo.value ?? "482",
    helper: state === "error" ? "" : demo.helper ?? "Use the code printed on the card.",
    error: state === "error" ? demo.error ?? demo.helper ?? "Enter the security code." : "",
    state,
    density: demo.density ?? "md",
    disabled: state === "disabled",
    loading: state === "loading",
    name: demo.name ?? "",
    placeholder: demo.placeholder ?? "CVC",
    expectedLength: demo.expectedLength ?? 3,
    validationMessage: demo.validationMessage ?? "Enter the security code.",
    revealable: demo.revealable ?? true,
    revealed: Boolean(demo.revealed),
  };
  if (component === "date-picker") return {
    label: demo.label ?? "Service date",
    value: demo.value ?? "2026-07-18",
    placeholder: demo.placeholder ?? "Selecciona fecha",
    helper: state === "error" ? "" : demo.helper ?? "One operational date.",
    error: state === "error" ? demo.error ?? demo.helper ?? "Select an available date." : "",
    min: demo.min ?? "",
    max: demo.max ?? "",
    density: demo.density ?? "md",
    state,
    invalid: state === "error" || Boolean(demo.invalid),
    disabled: state === "disabled",
  };
  if (component === "date-range-picker") return {
    label: demo.label ?? "Reporting range",
    value: demo.value ?? { from: demo.from ?? "2026-07-01", to: demo.to ?? "2026-07-15" },
    from: demo.from,
    to: demo.to,
    placeholder: demo.placeholder ?? "Rango de fechas",
    helper: state === "error" ? "" : demo.helper ?? "One bounded date range.",
    error: state === "error" ? demo.error ?? demo.helper ?? "Choose a valid date range." : "",
    density: demo.density ?? "md",
    state,
    invalid: state === "error" || Boolean(demo.invalid),
    disabled: state === "disabled",
    presets: demo.presets ?? true,
  };
  if (component === "segmented-control") {
    const items = demo.items ?? [
      { key: "all", label: "All" },
      { key: "fuel", label: "Fuel", icon: "local_gas_station" },
      { key: "ev", label: "EV", icon: "bolt" },
    ];
    return {
      label: demo.ariaLabel ?? demo.label ?? "View mode",
      items,
      selectedKey: demo.selectedKey ?? items.find((item) => item.selected)?.key ?? items.find((item) => item.selected)?.value ?? items[0]?.key ?? items[0]?.value,
      density: demo.density ?? "md",
      variant: demo.variant ?? "outlined",
    };
  }
  if (component === "popover") return {
    triggerLabel: demo.trigger ?? demo.label ?? "Station context",
    title: demo.label ?? "Station context",
    description: demo.description ?? "Keep the help local to the trigger and limit content to short, contextual decisions.",
    id: `popover-demo-${demoSlug(demo.label ?? "station-context")}`,
    variant: demo.variant ?? "information",
    state,
    open: state === "open" || state === "focus" || state === "warning",
    placement: demo.placement ?? "bottom",
    density: demo.density ?? "md",
    fullWidth: Boolean(demo.fullWidth),
    disabled: state === "disabled",
    actions: demo.actions ?? (demo.variant === "action" ? [{ label: "Apply", variant: "primary" }, { label: "Cancel", variant: "secondary" }] : []),
    field: demo.field,
  };
  if (component === "card-summary") return {
    label: demo.label ?? (demo.variant === "virtual" ? "Digital" : demo.variant === "limit" ? "Fleet" : "Flota"),
    meta: demo.meta ?? (demo.variant === "compact" ? "Ana Sosa" : "ANA SOSA"),
    number: demo.number ?? "**** 4821",
    expires: demo.expires ?? "12/28",
    status: demo.status ?? (state === "frozen" ? "Frozen" : state === "warning" ? "Review" : "Active"),
    metrics: demo.metrics ?? (demo.variant === "limit" ? [{ label: "Available", value: demo.available ?? "$2,480" }, { label: "Limit", value: demo.limit ?? "$5,000" }] : []),
    variant: demo.variant ?? "physical",
    state,
    density: demo.density ?? "md",
    icon: demo.icon,
    fullWidth: Boolean(demo.fullWidth),
    disabled: state === "disabled",
  };
  if (component === "movement-row") return {
    label: demo.label ?? (demo.variant === "refund" ? "Deposit weekly" : demo.variant === "declined" ? "Declined toll" : "Pemex Reforma"),
    meta: demo.meta ?? (demo.category === "toll" || demo.variant === "declined" ? "Yesterday 07:44 - Toll" : demo.variant === "refund" ? "Yesterday - Transfer" : "Today 14:32 - Fuel"),
    amount: demo.amount ?? (demo.variant === "refund" ? "+$3,720.00" : demo.variant === "declined" ? "−$118.00" : "−$820.50"),
    status: demo.status ?? (state === "pending" ? "Pending" : state === "error" || demo.variant === "declined" ? "Declined" : ""),
    category: demo.category ?? (demo.variant === "refund" ? "income" : demo.variant === "declined" ? "toll" : "fuel"),
    variant: demo.variant ?? "standard",
    state,
    density: demo.density ?? "md",
    fullWidth: Boolean(demo.fullWidth),
    disabled: state === "disabled",
  };
  if (component === "quick-action") return {
    label: demo.label ?? "Freeze card",
    icon: demo.icon ?? "touch_app",
    badge: demo.badge ?? "",
    variant: demo.variant ?? "standard",
    state,
    density: demo.density ?? "md",
    loading: state === "loading",
    disabled: state === "disabled",
    tone: demo.tone ?? "neutral",
  };
  if (component === "dialog") {
    const dialogState = demo.state ?? state;
    const variant = demo.variant ?? "confirmation";
    const tone = demo.tone ?? (variant === "success" ? "success" : variant === "destructive" ? "danger" : "neutral");
    return {
      label: demo.label ?? "Freeze card?",
      description: demo.description ?? "The driver will not be able to use this card until it is reactivated.",
      triggerLabel: demo.trigger ?? "Open dialog",
      tone,
      variant,
      state: dialogState,
      density: demo.density ?? "md",
      icon: demo.icon ?? "",
      fields: demo.fields ?? [],
      open: Boolean(demo.open),
      actions: demo.actions ?? [
        { label: demo.primaryLabel ?? (variant === "destructive" ? "Delete" : "Confirm") },
        { label: "Cancel", variant: "secondary" },
      ],
    };
  }
  if (component === "menu") return { triggerLabel: demo.trigger ?? "Actions", label: demo.label ?? "Actions", variant: demo.variant ?? "actions", avatarName: demo.avatarName ?? demo.name ?? demo.trigger ?? "", avatarStatus: demo.avatarStatus ?? demo.status ?? "none", avatarSize: demo.avatarSize ?? demo.size ?? "md", density: demo.density ?? "md", state, align: demo.align ?? "start", disabled: state === "disabled", open: state === "open" || state === "focus", items: demo.items ?? [{ label: "Edit driver", icon: "edit" }, { label: "Duplicate rules", icon: "content_copy" }, { separator: true }, { label: "Suspend access", icon: "block", tone: "danger" }] };
  if (component === "drawer") {
    const hasFields = Array.isArray(demo.fields) && demo.fields.length > 0;
    return {
      label: demo.label ?? "Ana Sosa",
      description: demo.description ?? "",
      triggerLabel: demo.trigger ?? "Open drawer",
      variant: demo.variant ?? "side-sheet",
      state,
      tone: demo.tone ?? "neutral",
      density: demo.density ?? "md",
      side: demo.side ?? "right",
      open: Boolean(demo.open),
      content: demo.content ?? (hasFields ? [] : [
        { type: "badge", label: "En ruta", tone: "success", live: true },
        { type: "progress", label: "Documentos", value: 75, max: 100, showValue: true, tone: "accent" },
      ]),
      fields: hasFields ? demo.fields.map((field) => typeof field === "string" ? { label: field, value: field === "Spending limit" ? "$2,400" : "Enabled" } : field) : [],
      actions: demo.actions ?? [{ label: demo.secondaryLabel ?? "Cerrar", variant: "ghost" }, { label: demo.primaryLabel ?? "Guardar" }],
    };
  }
  if (component === "table") {
    const tableVariant = demo.variant ?? "standard";
    const tableState = ["default", "hover", "focus", "selected", "sorted", "expanded"].includes(state) ? state : "default";
    const tableSortable = tableVariant === "sortable" || tableState === "sorted";
    return {
      label: demo.label ?? "Fleet spend table",
      rowKey: demo.rowKey ?? "id",
      variant: tableVariant,
      state: tableState,
      density: demo.density ?? (demo.dense || tableVariant === "dense" ? "sm" : "md"),
      dense: Boolean(demo.dense || tableVariant === "dense"),
      sortKey: demo.sortKey ?? (tableVariant === "sortable" || tableState === "sorted" ? "spend" : ""),
      sortDir: demo.sortDir ?? "ascending",
      selectedKey: demo.selectedKey ?? (tableState === "selected" ? "mx-482" : ""),
      expandedKey: demo.expandedKey ?? (tableState === "expanded" ? "mx-482" : ""),
      columns: demo.columns ?? [
        { key: "plate", label: "Plate", mono: true, sortable: tableSortable, priority: "primary" },
        { key: "driver", label: "Driver", sortable: tableSortable, priority: "secondary" },
        { key: "status", label: "Status", priority: "secondary" },
        { key: "spend", label: "Spend", mono: true, align: "right", sortable: tableSortable, sortValue: (row) => row.spendValue ?? 0, priority: "tertiary" },
      ],
      rows: demo.rows ?? [
        { id: "mx-482", plate: "JMX-214-B", driver: "Ana Sosa", status: { label: "Active", tone: "success" }, spend: "$842", spendValue: 842, detail: "Last review: 12 Mar - policy active through Dec 2026." },
        { id: "mx-884", plate: "KTR-882-A", driver: "Luis Prieto", status: { label: "Review", tone: "warning" }, spend: "$631", spendValue: 631, detail: "Workshop review pending for brakes and documents." },
        { id: "mx-120", plate: "MVD-101-C", driver: "Iris Mora", status: { label: "Frozen", tone: "danger" }, spend: "$120", spendValue: 120, detail: "Card is frozen until driver verification is complete." },
      ],
    };
  }
  if (component === "biometric-prompt") return { label: demo.label ?? "Confirm it is you", description: demo.description ?? "", variant: demo.variant ?? "fingerprint", state, actionLabel: demo.actionLabel ?? "Use biometrics", fallback: demo.fallback ?? "Use passcode instead", icon: demo.icon ?? "", density: demo.density ?? "md", fullWidth: Boolean(demo.fullWidth) };
  if (component === "tree-view") return {
    label: demo.ariaLabel ?? demo.label ?? "Tree view",
    state: state === "default" ? "expanded" : state,
    nodes: demo.nodes ?? [
      { label: "Fleet North", level: 1, expanded: true, icon: "account_tree" },
      { label: "Cards", level: 2, expanded: true, icon: "folder" },
      { label: "Fuel cards", level: 3, expanded: true, icon: "folder" },
      { label: "MX Region", level: 4, expanded: true, icon: "folder" },
      { label: "Cards ending 4821", level: 5, selected: true },
      { label: "Drivers", level: 2 },
    ],
  };
  if (component === "motion-boundary") return { label: demo.label ?? "Panel transition", description: demo.description ?? "Controls the entrance, exit, and reduced-motion behavior of one bounded region.", variant: demo.variant ?? "fade", state: demo.state ?? "active", icon: demo.icon ?? "transition_slide", reducedMotion: state === "reduced-motion" || Boolean(demo.reducedMotion) };
  if (component === "animated-moment") return { label: demo.label ?? "Action complete", description: demo.description ?? "", variant: demo.variant ?? "success", state: demo.state ?? "playing", density: demo.density ?? "md", fullWidth: Boolean(demo.fullWidth), icon: demo.icon ?? "", reducedMotionFallback: demo.reducedMotionFallback ?? "Short controlled animation with reduced-motion fallback." };
  return demo;
}

export function renderComponentDemo(component, demo = {}) {
  return renderComponent(component, componentDemoProps(component, demo));
}
