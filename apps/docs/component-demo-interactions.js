import { setupTooltipDemos } from "./tooltip-demo-interactions.js?v=6";
import { setupToastDemos } from "./toast-demo-interactions.js?v=4";
import { renderProgressIndicatorPreview, setupProgressIndicatorDemos } from "./progress-indicator-demo-interactions.js?v=3";
import { setupMenuDemos, setupOverlayDemos } from "./overlay-demo-interactions.js?v=6";
import { setupAccordionDemos, setupListDemos, setupTableDemos } from "./display-demo-interactions.js?v=6";
import { setupStatefulComponentDemos } from "./stateful-component-interactions.js?v=39";
import { setupChoiceDemos, setupRadioButtonDemos, setupSwitchDemos } from "./choice-demo-interactions.js?v=2";

export function setupComponentDemoInteractions(deps) {
  setupComponentPlaygrounds(deps);
  setupPreviewInteractions();
}

function setupPreviewInteractions(root) {
  [setupChoiceDemos, setupRadioButtonDemos, setupSwitchDemos, setupSliderDemos, setupTextAreaDemos, setupIconButtonDemos, setupCardDemos, setupStatefulComponentDemos, setupTooltipDemos, setupToastDemos, setupProgressIndicatorDemos, setupOverlayDemos, setupMenuDemos, setupAccordionDemos, setupListDemos, setupTableDemos].forEach((setup) => setup(root));
}

function setupComponentPlaygrounds(deps) {
  document.querySelectorAll("[data-component-playground]:not([data-ready='true'])").forEach((playground) => {
    playground.dataset.ready = "true";
    const inputs = [...playground.querySelectorAll("[data-component-playground-input]")];
    const preview = playground.querySelector("[data-component-preview]");
    const markup = playground.querySelector("[data-component-markup]");
    const component = playground.dataset.componentPlayground;
    if (!preview || !component) return;

    const renderPlayground = () => {
      const section = deps.componentSectionData(component, "playground");
      const demo = { ...(section.preview ?? {}) };
      for (const input of inputs) {
        const name = input.dataset.componentPlaygroundInput;
        if (!name) continue;
        demo[name] = input.type === "checkbox" ? input.checked : input.value;
      }
      const rendered = renderComponentPreview(component, demo, deps);
      preview.dataset.densityContext = demo.density ?? "md";
      preview.innerHTML = rendered.html;
      if (markup) markup.textContent = rendered.markup;
      setupPreviewInteractions(preview);
      deps.setupSelectDemos?.();
    };

    inputs.forEach((input) => input.addEventListener("input", renderPlayground));
    inputs.forEach((input) => input.addEventListener("change", renderPlayground));
    renderPlayground();
  });
}

function renderComponentPreview(component, demo, deps) {
  if (component === "select") {
    const label = demo.label ?? demo.field ?? "Fleet";
    const state = normalizeState(demo.state);
    return {
      html: deps.selectDemo(label, demo.value ?? "North Region Fleet", demo.helper ?? "28 vehicles", demo.density ?? "md", state),
      markup: `<Select label="${escapeAttr(label, deps)}" value="${escapeAttr(demo.value ?? "north-region", deps)}"${state ? ` state="${escapeAttr(state, deps)}"` : ""} />`,
    };
  }
  if (component === "card") {
    const state = normalizeState(demo.state) || normalizeState(demo.role) || "default";
    return {
      html: deps.cardDemo({ ...demo, state, icon: demo.icon ?? "account_balance_wallet" }),
      markup: `<Card variant="${escapeAttr(demo.variant ?? "default", deps)}" state="${escapeAttr(state, deps)}" title="${escapeAttr(demo.title ?? "Wallet balance", deps)}" />`,
    };
  }
  if (component === "input") {
    const label = demo.label ?? demo.field ?? "Driver ID";
    const state = normalizeState(demo.state) || "default";
    const variant = demo.variant ?? demo.inputVariant ?? "text";
    return {
      html: deps.inputDemo(label, demo.value ?? "", demo.placeholder ?? "Enter value", demo.helper ?? "Operational value", demo.density ?? "md", state, inputPreviewIcon(demo), demo.suffix ?? "", Boolean(demo.mono), demo),
      markup: `<Input label="${escapeAttr(label, deps)}" value="${escapeAttr(demo.value ?? "", deps)}"${variant !== "text" ? ` variant="${escapeAttr(variant, deps)}"` : ""}${state !== "default" ? ` state="${escapeAttr(state, deps)}"` : ""} />`,
    };
  }
  if (component === "card-number-input") {
    const label = demo.label ?? "Card number";
    const state = normalizeState(demo.state) || "default";
    return {
      html: deps.cardNumberInputDemo(label, demo.value ?? "4111 1111 1111 1111", state),
      markup: `<CardNumberInput label="${escapeAttr(label, deps)}" value="${escapeAttr(demo.value ?? "", deps)}"${state !== "default" ? ` state="${escapeAttr(state, deps)}"` : ""} />`,
    };
  }
  if (component === "card-expiry-input") {
    const label = demo.label ?? "Expiry date";
    const state = normalizeState(demo.state) || "default";
    return {
      html: deps.cardExpiryInputDemo(label, demo.value ?? "12/28", state),
      markup: `<CardExpiryInput label="${escapeAttr(label, deps)}" value="${escapeAttr(demo.value ?? "", deps)}"${state !== "default" ? ` state="${escapeAttr(state, deps)}"` : ""} />`,
    };
  }
  if (component === "card-security-code-input") {
    const label = demo.label ?? "Security code";
    const state = normalizeState(demo.state) || "default";
    return {
      html: deps.cardSecurityCodeInputDemo(label, demo.value ?? "482", state),
      markup: `<CardSecurityCodeInput label="${escapeAttr(label, deps)}" value="${escapeAttr(demo.value ?? "", deps)}"${state !== "default" ? ` state="${escapeAttr(state, deps)}"` : ""} />`,
    };
  }
  if (component === "text-area") {
    const label = demo.label ?? demo.field ?? "Driver notes";
    const state = normalizeState(demo.state) || "default";
    return {
      html: deps.textAreaDemo(label, demo.value ?? "", demo.placeholder ?? "Add note", demo.helper ?? "Operational note.", demo.rows ?? 3, demo.maxLength ?? 120, demo.density ?? "md", state),
      markup: `<TextArea label="${escapeAttr(label, deps)}" value="${escapeAttr(demo.value ?? "", deps)}" maxLength={${Number(demo.maxLength ?? 120)}} />`,
    };
  }
  if (component === "icon-button") {
    const state = normalizeState(demo.state) || "default";
    const selected = Boolean(demo.selected) || state === "selected";
    const badge = Boolean(demo.badge) || state === "badged";
    return {
      html: deps.iconButtonDemo(demo.icon ?? "grid_view", demo.ariaLabel ?? "Show grid", demo.variant ?? "ghost", selected, badge, state, demo.density ?? "md"),
      markup: `<IconButton icon="${escapeAttr(demo.icon ?? "grid_view", deps)}" ariaLabel="${escapeAttr(demo.ariaLabel ?? "Show grid", deps)}"${demo.variant && demo.variant !== "ghost" ? ` variant="${escapeAttr(demo.variant, deps)}"` : ""}${selected ? " selected" : ""}${badge ? " badge" : ""} />`,
    };
  }
  if (component === "checkbox") {
    const checked = Boolean(demo.checked);
    const indeterminate = Boolean(demo.indeterminate);
    const state = indeterminate ? "indeterminate" : normalizeState(demo.state) || (checked ? "checked" : "unchecked");
    return {
      html: deps.checkboxDemo(demo.label ?? "Enable fuel card", demo.description ?? "", checked, indeterminate, state, demo.density ?? "md"),
      markup: `<Checkbox label="${escapeAttr(demo.label ?? "Enable fuel card", deps)}"${checked ? " checked" : ""}${indeterminate ? " indeterminate" : ""} />`,
    };
  }
  if (component === "radio-button") {
    const checked = Boolean(demo.checked);
    const state = normalizeState(demo.state) || (checked ? "selected" : "unselected");
    const label = demo.label ?? "Fastest route";
    return {
      html: deps.radioButtonDemo(label, demo.value ?? slugValue(label), demo.description ?? "", checked, state, demo.density ?? "md", demo.name),
      markup: `<RadioButton label="${escapeAttr(label, deps)}" value="${escapeAttr(demo.value ?? "fastest", deps)}"${checked ? " checked" : ""} />`,
    };
  }
  if (component === "switch") {
    const checked = Boolean(demo.checked);
    const state = normalizeState(demo.state) || (checked ? "on" : "off");
    return {
      html: deps.switchDemo(demo.label ?? "Send driver alerts", demo.description ?? "", checked, state, demo.density ?? "md"),
      markup: `<Switch label="${escapeAttr(demo.label ?? "Send driver alerts", deps)}"${checked ? " checked" : ""} />`,
    };
  }
  if (component === "badge") {
    const label = demo.label ?? demo.count ?? "8";
    return {
      html: deps.badgeDemo(label, demo.variant ?? "count", demo.tone ?? "info", demo.state ?? "default", demo.icon ?? ""),
      markup: `<Badge label="${escapeAttr(label, deps)}" tone="${escapeAttr(demo.tone ?? "info", deps)}" />`,
    };
  }
  if (component === "chip") {
    const label = demo.label ?? "Active filter";
    const selected = Boolean(demo.selected) || demo.state === "selected";
    return {
      html: deps.chipDemo(label, demo.variant ?? "filter", demo.state ?? "default", demo.icon ?? "", selected, Boolean(demo.removable)),
      markup: `<Chip label="${escapeAttr(label, deps)}"${selected ? " selected" : ""}${demo.removable ? " removable" : ""} />`,
    };
  }
  if (component === "tag") {
    const label = demo.label ?? "Cross-platform";
    return {
      html: deps.tagDemo(label, demo.variant ?? "metadata", demo.tone ?? "neutral", demo.state ?? "default", demo.icon ?? "", Boolean(demo.interactive)),
      markup: `<Tag label="${escapeAttr(label, deps)}" variant="${escapeAttr(demo.variant ?? "metadata", deps)}"${demo.interactive ? " interactive" : ""} />`,
    };
  }
  if (component === "tabs") {
    const itemCount = Number(demo.itemCount ?? (demo.state === "overflow" ? 5 : 3));
    const variant = demo.variant === "underline" ? "underline" : "default";
    const fallbackItems = itemCount >= 5
      ? [{ key: "overview", label: "Overview" }, { key: "movements", label: "Movements" }, { key: "fuel", label: "Fuel" }, { key: "ev", label: "EV" }, { key: "finance", label: "Finance" }]
      : [{ key: "overview", label: "Overview" }, { key: "movements", label: "Movements" }, { key: "settings", label: "Settings" }];
    const items = demo.items ?? fallbackItems;
    return {
      html: deps.tabsDemoFromData?.({ ...demo, ariaLabel: demo.ariaLabel ?? "Wallet sections", variant, state: demo.state ?? "selected", items }) ?? deps.tabsDemo(demo.ariaLabel ?? "Wallet sections", variant, demo.state ?? "selected", itemCount),
      markup: `<Tabs ariaLabel="${escapeAttr(demo.ariaLabel ?? "Wallet sections", deps)}" value="${escapeAttr(demo.value ?? "overview", deps)}"${variant !== "default" ? ` variant="${escapeAttr(variant, deps)}"` : ""} />`,
    };
  }
  if (component === "tooltip") {
    const label = demo.label ?? "Show layout columns.";
    const trigger = demo.trigger ?? "Grid";
    const placement = demo.placement ?? "top";
    const variant = demo.variant ?? "default";
    const state = demo.state ?? "default";
    return {
      html: deps.tooltipDemo(label, trigger, placement, variant, state, demo.icon ?? ""),
      markup: `<Tooltip trigger="${escapeAttr(trigger, deps)}" placement="${escapeAttr(placement, deps)}">${escapeAttr(label, deps)}</Tooltip>`,
    };
  }
  if (component === "toast") {
    const label = demo.label ?? "Card limit updated.";
    const description = demo.description ?? "Changes are live for assigned drivers.";
    return {
      html: deps.toastDemo(label, description, demo.tone ?? "success", demo.variant ?? "status", demo.state ?? "visible", demo.icon ?? "check_circle", Boolean(demo.dismissible), demo.actionLabel ?? ""),
      markup: `<Toast tone="${escapeAttr(demo.tone ?? "success", deps)}"${demo.dismissible ? " dismissible" : ""}>${escapeAttr(label, deps)}</Toast>`,
    };
  }
  if (component === "inline-validation") {
    const state = demo.state ?? "error";
    return {
      html: deps.inlineValidationDemo(demo.label ?? "Driver email", demo.value ?? "ana@", demo.message ?? "Enter a complete email address.", state, Boolean(demo.fullWidth)),
      markup: `<InlineValidation state="${escapeAttr(state, deps)}" message="${escapeAttr(demo.message ?? "Enter a complete email address.", deps)}" />`,
    };
  }
  if (component === "progress-indicator") return renderProgressIndicatorPreview(demo, deps);
  if (component === "skeleton") return { html: deps.skeletonDemo(demo.label ?? "Wallet card loading", demo.variant ?? "card", demo.state ?? "loading", Number(demo.rows ?? demo.lines ?? 3), Boolean(demo.fullWidth), Number(demo.columns ?? 4)), markup: demo.variant === "table" ? `<Skeleton variant="table" rows={${Number(demo.rows ?? 4)}} columns={${Number(demo.columns ?? 4)}} ariaLabel="${escapeAttr(demo.label ?? "Table loading", deps)}" />` : `<Skeleton variant="${escapeAttr(demo.variant ?? "card", deps)}" lines={${Number(demo.lines ?? 3)}} ariaLabel="${escapeAttr(demo.label ?? "Wallet card loading", deps)}" />` };
  if (component === "dialog") {
    return {
      html: deps.dialogDemo(demo.label ?? "Freeze card?", demo.description ?? "The driver will not be able to use this card until it is reactivated.", demo.tone ?? "danger", demo.variant ?? "confirmation", demo.state ?? "open", demo.icon ?? "warning"),
      markup: `<Dialog title="${escapeAttr(demo.label ?? "Freeze card?", deps)}" tone="${escapeAttr(demo.tone ?? "danger", deps)}" open />`,
    };
  }
  if (component === "menu") {
    return {
      html: deps.menuDemo(demo.trigger ?? "Actions", demo.variant ?? "actions", demo.state ?? "default", demo.align ?? "start"),
      markup: `<Menu trigger="${escapeAttr(demo.trigger ?? "Actions", deps)}" items={items} />`,
    };
  }
  if (component === "drawer") return { html: deps.drawerDemo(demo.label ?? "Card controls", demo.description ?? "Review limits, status, and driver access before saving.", demo.variant ?? "side-sheet", demo.state ?? "closed", demo.side ?? "right"), markup: `<Drawer title="${escapeAttr(demo.label ?? "Card controls", deps)}" side="${escapeAttr(demo.side ?? "right", deps)}" />` };
  if (component === "accordion") return { html: deps.accordionDemo(demo.label ?? "Documents", demo.description ?? "Driver documents are ready for review.", demo.variant ?? "single", demo.state ?? "open"), markup: `<Accordion defaultOpen="documents" items={items} />` };
  if (component === "empty-state") return { html: deps.emptyStateDemo(demo.label ?? "No active vehicles", demo.description ?? "When a vehicle connects, it will appear here.", demo.variant ?? "first-use", demo.state ?? "default", demo.icon ?? "inbox", demo.actionLabel ?? "Add vehicle"), markup: `<EmptyState icon="${escapeAttr(demo.icon ?? "inbox", deps)}" title="${escapeAttr(demo.label ?? "No active vehicles", deps)}" />` };
  if (component === "table") return { html: deps.tableDemo(demo.label ?? "Fleet table", demo.variant ?? "standard", demo.state ?? "default", Boolean(demo.dense)), markup: `<Table columns={columns} rows={rows} rowKey="id" />` };
  if (component === "avatar") return { html: deps.avatarDemo(demo.name ?? demo.label ?? "Ana Sosa", demo.density ?? "md", demo.status ?? "online", demo.state ?? "default"), markup: `<Avatar name="${escapeAttr(demo.name ?? demo.label ?? "Ana Sosa", deps)}" density="${escapeAttr(demo.density ?? "md", deps)}" status="${escapeAttr(demo.status ?? "online", deps)}" />` };
  if (component === "slider") return { html: deps.sliderDemo(demo.label ?? "Search radius", Number(demo.value ?? 12), demo.state ?? "default", demo.variant ?? "continuous"), markup: `<Slider label="${escapeAttr(demo.label ?? "Search radius", deps)}" value={${Number(demo.value ?? 12)}} min={${Number(demo.min ?? 0)}} max={${Number(demo.max ?? 100)}} />` };
  if (component === "stepper") {
    const orientation = demo.orientation ?? (demo.variant === "vertical" ? "vertical" : "horizontal");
    const density = demo.density ?? "md";
    const current = Number(demo.current ?? 1);
    return {
      html: deps.stepperDemo(demo.label ?? "Vehicle setup", current, demo.state ?? "active", orientation, orientation, density),
      markup: `<Stepper current={${current}} orientation="${escapeAttr(orientation, deps)}" density="${escapeAttr(density, deps)}" steps={steps} />`,
    };
  }
  return { html: "", markup: "" };
}

function inputPreviewIcon(demo = {}) {
  if (Object.prototype.hasOwnProperty.call(demo, "icon")) return demo.icon ?? "";
  const variant = demo.variant ?? demo.inputVariant ?? "text";
  if (variant === "email") return "mail";
  if (variant === "password") return "lock";
  if (variant === "currency") return "payments";
  if (variant === "unit" || variant === "number") return "scale";
  if (variant === "search") return "search";
  return "";
}

function setupTextAreaDemos(root = document) {
  root.querySelectorAll(".text-area-demo:not([data-demo-ready='true'])").forEach((label) => {
    const textarea = label.querySelector("textarea");
    const counter = label.querySelector("[data-text-area-counter]");
    if (!textarea || !counter) return;
    label.dataset.demoReady = "true";
    const update = () => {
      const max = Number(textarea.getAttribute("maxlength"));
      counter.textContent = Number.isFinite(max) ? `${textarea.value.length}/${max}` : String(textarea.value.length);
      counter.dataset.overLimit = String(Number.isFinite(max) && textarea.value.length >= max);
    };
    textarea.addEventListener("input", update);
    update();
  });
}

function setupIconButtonDemos(root = document) {
  root.querySelectorAll(".icon-button-demo:not([data-demo-ready='true'])").forEach((button) => {
    if (button.disabled) return;
    button.dataset.demoReady = "true";
    const isToggle = button.dataset.toggle === "true";
    button.addEventListener("click", () => {
      if (isToggle) {
        const pressed = button.getAttribute("aria-pressed") === "true";
        button.setAttribute("aria-pressed", String(!pressed));
        button.dataset.state = pressed ? "default" : "selected";
        const symbol = button.querySelector(".material-symbol");
        if (symbol) symbol.dataset.iconFill = String(!pressed);
        return;
      }
      button.dataset.state = "pressed";
      window.setTimeout(() => {
        if (button.isConnected) button.dataset.state = "default";
      }, 240);
    });
  });
}

function setupCardDemos(root = document) {
  root.querySelectorAll(".card[data-interactive='true']:not([data-demo-ready='true'])").forEach((card) => {
    if (card.getAttribute("aria-disabled") === "true") return;
    card.dataset.demoReady = "true";
    card.tabIndex = card.tabIndex >= 0 ? card.tabIndex : 0;
    if (!card.getAttribute("role")) card.setAttribute("role", "button");
    const baseState = card.dataset.state || "interactive";
    const basePressed = card.getAttribute("aria-pressed") || "false";
    const pulse = () => {
      card.dataset.state = "selected";
      card.setAttribute("aria-pressed", "true");
      window.setTimeout(() => {
        if (card.isConnected) {
          card.dataset.state = baseState;
          card.setAttribute("aria-pressed", basePressed);
        }
      }, 650);
    };
    card.addEventListener("click", pulse);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      pulse();
    });
  });
}

function setupSliderDemos(root = document) {
  root.querySelectorAll(".slider.docs-package-demo:not([data-demo-ready='true'])").forEach((slider) => {
    const input = slider.querySelector("[data-slider-input]");
    const output = slider.querySelector("[data-slider-output]");
    if (!input || !output) return;
    slider.dataset.demoReady = "true";
    const min = Number(input.min || 0);
    const max = Number(input.max || 100);
    const valueMultiplier = Number(slider.dataset.valueMultiplier || 1);
    const formatValue = () => {
      const raw = Number(input.value);
      const rendered = Number.isFinite(raw * valueMultiplier) ? raw * valueMultiplier : raw;
      return `${slider.dataset.valuePrefix ?? ""}${Number.isInteger(rendered) ? rendered : rendered.toFixed(1)}${slider.dataset.valueSuffix ?? ""}`;
    };
    const percentFor = () => {
      const range = max - min;
      if (!range) return 0;
      return Math.max(0, Math.min(100, ((Number(input.value) - min) / range) * 100));
    };
    const sync = () => {
      const text = formatValue();
      slider.dataset.value = String(input.value);
      slider.dataset.pct = String(Math.round(percentFor()));
      output.textContent = text;
      input.setAttribute("aria-valuetext", text);
    };
    input.addEventListener("input", sync);
    input.addEventListener("change", sync);
    input.addEventListener("pointerdown", () => {
      slider.dataset.dragging = "true";
      if (!["disabled", "error"].includes(slider.dataset.state)) slider.dataset.state = "dragging";
    });
    input.addEventListener("pointerup", () => {
      slider.dataset.dragging = "false";
      if (slider.dataset.state === "dragging") slider.dataset.state = "default";
    });
    input.addEventListener("focus", () => {
      if (!["disabled", "error", "dragging"].includes(slider.dataset.state)) slider.dataset.state = "focus";
    });
    input.addEventListener("blur", () => {
      slider.dataset.dragging = "false";
      if (slider.dataset.state === "focus" || slider.dataset.state === "dragging") slider.dataset.state = "default";
    });
    sync();
  });
}

function normalizeState(value) {
  if (!value || value === "default") return "";
  return value;
}

function escapeAttr(value, deps) {
  return deps.escapeHtml(String(value ?? "")).replace(/"/g, "&quot;");
}

function slugValue(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
