import { createFieldAction } from "../primitives/field-actions.js?v=2";
import { createSpinner } from "./feedback.js?v=8";

let inputId = 0;
let selectId = 0;
let comboboxId = 0;
let textAreaId = 0;

export function resolveFieldState({ disabled = false, loading = false, error = "", state, value = "" } = {}) {
  if (disabled) return "disabled";
  if (loading) return "loading";
  if (error) return "error";
  return state ?? (value ? "filled" : "default");
}

export function createFieldShell({
  id,
  label,
  fallbackLabel,
  state,
  density = "md",
  variant,
  mono = false,
  align = "start",
  tag = "label",
  className = "",
} = {}) {
  const root = document.createElement(tag);
  root.className = ["field", className].filter(Boolean).join(" ");
  root.dataset.state = state ?? "default";
  root.dataset.density = density;
  if (variant) root.dataset.variant = variant;
  if (mono) root.dataset.mono = "true";
  if (align === "end") root.dataset.align = "end";

  const labelNode = document.createElement("span");
  labelNode.className = "field__label";
  if (id) labelNode.id = `${id}-label`;
  labelNode.textContent = label ?? fallbackLabel ?? "Field";
  root.append(labelNode);
  return { root, labelNode };
}

export function createFieldSurface({ className = "" } = {}) {
  const surface = document.createElement("span");
  surface.className = ["field__control", className].filter(Boolean).join(" ");
  return surface;
}

export function appendFieldHelper(root, { id, text, target, className = "" } = {}) {
  if (!text) return null;
  const helperNode = document.createElement("span");
  helperNode.className = ["field__helper", className].filter(Boolean).join(" ");
  helperNode.id = `${id}-helper`;
  helperNode.textContent = text;
  if (root?.dataset?.state === "error" || target?.attributes?.["aria-invalid"] === "true") {
    helperNode.setAttribute("role", "alert");
  }
  if (target) appendAriaDescribedBy(target, helperNode.id);
  root.append(helperNode);
  return helperNode;
}

export function appendAriaDescribedBy(node, id) {
  if (!node || !id) return;
  const existing = node.getAttribute?.("aria-describedby") ?? node.attributes?.["aria-describedby"] ?? "";
  const current = existing.split(/\s+/).filter(Boolean);
  if (!current.includes(id)) current.push(id);
  node.setAttribute?.("aria-describedby", current.join(" "));
}

export function createInput({
  label,
  helper = "",
  helperText,
  error = "",
  value = "",
  name = "",
  placeholder = "",
  variant = "text",
  disabled = false,
  loading = false,
  required = false,
  density = "md",
  state,
  icon = "",
  prefix = "",
  suffix = "",
  mono = false,
  type = "text",
  inputMode = "",
  autocomplete = "",
  align = "start",
  revealable = false,
  onValueChange,
} = {}) {
  const id = `input-${++inputId}`;
  const resolvedType = inputTypeForVariant(variant, type);
  const resolvedAlign = align === "end" || (align === "start" && ["number", "currency", "unit"].includes(variant)) ? "end" : "start";
  const isRevealable = Boolean(revealable) || variant === "password" || resolvedType === "password";
  const isDisabled = Boolean(disabled) || Boolean(loading);
  const resolvedHelper = error || helperText || helper;
  const resolvedState = resolveFieldState({ disabled, loading, error, state, value });
  const { root: formControl } = createFieldShell({
    id,
    label,
    fallbackLabel: "Input",
    state: resolvedState,
    density,
    variant,
    mono,
    align: resolvedAlign,
  });
  const control = createFieldSurface();

  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "field__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = icon;
    control.append(iconNode);
  }

  if (prefix) {
    const prefixNode = document.createElement("span");
    prefixNode.className = "field__prefix";
    prefixNode.setAttribute("aria-hidden", "true");
    prefixNode.textContent = prefix;
    control.append(prefixNode);
  }

  const input = document.createElement("input");
  input.className = "input";
  input.id = id;
  input.name = name;
  input.type = resolvedType;
  input.value = formatInputValue(value, variant);
  if (value) input.setAttribute("value", input.value);
  input.placeholder = placeholder;
  if (placeholder) input.setAttribute("placeholder", placeholder);
  input.disabled = isDisabled;
  input.required = Boolean(required);
  input.inputMode = inputMode || inputModeForVariant(variant);
  if (input.inputMode) input.setAttribute("inputmode", input.inputMode);
  input.autocomplete = autocomplete || autocompleteForVariant(variant);
  if (input.autocomplete) input.setAttribute("autocomplete", input.autocomplete);
  if (error) input.setAttribute("aria-invalid", "true");
  input.addEventListener?.("input", () => {
    const next = normalizeInputValue(input.value, variant);
    onValueChange?.(next.value, next);
  });

  control.append(input);

  if (suffix) {
    const suffixNode = document.createElement("span");
    suffixNode.className = "field__suffix";
    suffixNode.setAttribute("aria-hidden", "true");
    suffixNode.textContent = suffix;
    control.append(suffixNode);
  }

  if (isRevealable) {
    const revealNode = createFieldAction({
      action: "reveal",
      ariaLabel: "Show value",
      disabled: isDisabled,
      icon: "visibility",
      pressed: false,
    });
    revealNode.className = `${revealNode.className} field__action`;
    revealNode.setAttribute("data-input-reveal", "");
    control.append(revealNode);
  }

  if (loading) {
    const loadingNode = createSpinner({ label: `${label ?? "Input"} loading`, density: "sm", decorative: true });
    loadingNode.className = `${loadingNode.className} field__icon field__icon--loading`;
    loadingNode.setAttribute("aria-hidden", "true");
    control.append(loadingNode);
  }

  formControl.append(control);
  appendFieldHelper(formControl, { id, text: resolvedHelper, target: input });
  attachInputReveal(formControl);
  return formControl;
}

export function hydrateInput(root = document) {
  const controls = root?.matches?.(".field") ? [root] : Array.from(root?.querySelectorAll?.(".field") ?? []);
  for (const controlRoot of controls) {
    if (controlRoot.dataset?.inputReady === "true") continue;
    if (attachInputReveal(controlRoot)) controlRoot.dataset.inputReady = "true";
  }
}

export function hydrateTextArea(root = document) {
  const controls = root?.matches?.(".field") ? [root] : Array.from(root?.querySelectorAll?.(".field") ?? []);
  for (const controlRoot of controls) {
    if (controlRoot.dataset?.textAreaReady === "true") continue;
    if (attachTextAreaCounter(controlRoot)) controlRoot.dataset.textAreaReady = "true";
  }
}

function attachInputReveal(controlRoot) {
  const input = controlRoot.querySelector?.(".input");
  const reveal = controlRoot.querySelector?.("[data-input-reveal]") ?? controlRoot.querySelector?.("[data-field-action='reveal']") ?? controlRoot.querySelector?.(".field-action");
  if (!input || !reveal || reveal.__inputRevealHydrated === true) return false;
  reveal.__inputRevealHydrated = true;
  const iconNode = reveal.querySelector?.(".field-action__icon");
  const setVisible = (visible) => {
    input.type = visible ? "text" : "password";
    reveal.setAttribute("aria-pressed", String(Boolean(visible)));
    reveal.setAttribute("aria-label", visible ? "Hide value" : "Show value");
    if (iconNode) iconNode.textContent = visible ? "visibility_off" : "visibility";
  };
  reveal.addEventListener?.("click", () => setVisible(input.type === "password"));
  return true;
}

function inputTypeForVariant(variant, type) {
  if (variant === "email") return "email";
  if (variant === "password") return "password";
  if (variant === "search") return "search";
  if (variant === "number" || variant === "currency" || variant === "unit") return "text";
  return type || "text";
}

function inputModeForVariant(variant) {
  if (variant === "email") return "email";
  if (variant === "number" || variant === "currency" || variant === "unit") return "decimal";
  if (variant === "search") return "search";
  return "";
}

function autocompleteForVariant(variant) {
  if (variant === "email") return "email";
  if (variant === "password") return "current-password";
  if (variant === "search") return "off";
  return "";
}

function formatInputValue(value, variant) {
  const stringValue = value == null ? "" : String(value);
  if (!stringValue || variant !== "currency") return stringValue;
  const numeric = Number(stringValue.replace(/[^\d.-]/g, ""));
  if (!Number.isFinite(numeric)) return stringValue;
  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}

function normalizeInputValue(value, variant) {
  const displayValue = value == null ? "" : String(value);
  if (!["number", "currency", "unit"].includes(variant)) {
    return { value: displayValue, displayValue, rawValue: displayValue };
  }
  const normalized = displayValue.replace(/[^\d.,-]/g, "").replace(/,/g, "");
  return {
    value: normalized,
    displayValue,
    rawValue: displayValue,
    numericValue: normalized === "" || normalized === "-" ? null : Number(normalized),
  };
}

export function createSelect({
  label,
  helper = "",
  icon = "",
  options = [],
  value = "",
  name = "",
  disabled = false,
  density = "md",
  variant = "default",
  state = "default",
  onValueChange,
} = {}) {
  const id = `select-${++selectId}`;
  const { root: formControl } = createFieldShell({
    id,
    label,
    fallbackLabel: "Select",
    state: state || "default",
    density,
  });

  const control = createSelectControl({ id, label, icon, options, value, name, disabled, density, variant, state, onValueChange });
  formControl.append(control);
  appendFieldHelper(formControl, { id, text: helper, target: control.querySelector("[data-select-trigger]") });
  return formControl;
}

function createSelectControl({ id, label, icon, options, value, name, disabled, density = "md", variant, state, onValueChange }) {
  const selectedOption =
    options.find((option) => (option.value ?? option.label ?? "") === value) ??
    options.find((option) => !option.disabled) ??
    options[0] ??
    { label: value, value };
  const selectedValue = selectedOption.value ?? selectedOption.label ?? "";
  const control = document.createElement("span");
  control.className = ["select-control", variant === "inline" ? "select-control--inline" : ""].filter(Boolean).join(" ");
  control.dataset.open = String(state === "open");
  control.dataset.state = state || "default";
  control.dataset.density = density;
  control.dataset.value = selectedValue;
  control.setAttribute("data-select-control", "");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "select-control__trigger";
  trigger.disabled = disabled;
  trigger.setAttribute("data-select-trigger", "");
  trigger.setAttribute("role", "combobox");
  trigger.setAttribute("aria-expanded", String(state === "open"));
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-controls", `${id}-listbox`);
  trigger.setAttribute("aria-label", label ?? "Select");
  if (state === "error") trigger.setAttribute("aria-invalid", "true");

  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "select-control__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = icon;
    trigger.append(iconNode);
  }
  const valueNode = document.createElement("span");
  valueNode.className = "select-control__value";
  valueNode.setAttribute("data-select-value-label", "");
  valueNode.textContent = selectedOption.label ?? selectedOption.value ?? "";
  trigger.append(valueNode);
  if (selectedOption.meta) {
    const valueMeta = document.createElement("span");
    valueMeta.className = "select-control__option-code";
    valueMeta.setAttribute("data-select-value-meta", "");
    valueMeta.textContent = selectedOption.meta;
    trigger.append(valueMeta);
  }
  const chevronNode = state === "loading"
    ? createSpinner({ label: `${label ?? "Select"} loading`, density: "sm", decorative: true })
    : document.createElement("span");
  chevronNode.className = `${chevronNode.className} select-control__chevron`.trim();
  chevronNode.setAttribute("aria-hidden", "true");
  if (state !== "loading") chevronNode.textContent = "expand_more";
  trigger.append(chevronNode);

  const listbox = document.createElement("span");
  listbox.id = `${id}-listbox`;
  listbox.className = "select-control__listbox";
  listbox.setAttribute("role", "listbox");
  listbox.setAttribute("data-select-listbox", "");
  listbox.setAttribute("aria-label", `${label ?? "Select"} options`);

  options.forEach((option, index) => {
    const optionValue = option.value ?? option.label ?? "";
    const isSelected = optionValue === selectedValue;
    const optionNode = document.createElement("span");
    optionNode.id = `${id}-option-${index}`;
    optionNode.className = "select-control__option";
    optionNode.setAttribute("role", "option");
    optionNode.setAttribute("tabindex", "-1");
    optionNode.setAttribute("aria-selected", String(isSelected));
    optionNode.setAttribute("data-select-option", "");
    optionNode.dataset.selected = String(isSelected);
    optionNode.dataset.value = optionValue;
    optionNode.dataset.label = option.label ?? option.value ?? "";
    if (option.meta) optionNode.dataset.meta = option.meta;
    if (option.disabled) {
      optionNode.dataset.disabled = "true";
      optionNode.setAttribute("aria-disabled", "true");
    }
    const optionLabel = document.createElement("span");
    optionLabel.className = "select-control__option-label";
    optionLabel.textContent = option.label ?? option.value ?? "";
    if (option.meta) {
      const optionCode = document.createElement("span");
      optionCode.className = "select-control__option-code";
      optionCode.textContent = option.meta;
      optionNode.append(optionLabel, optionCode);
    } else {
      optionNode.append(optionLabel);
    }
    listbox.append(optionNode);
    if (isSelected) trigger.setAttribute("aria-activedescendant", optionNode.id);
  });

  control.append(trigger, listbox);
  if (name) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = name;
    hiddenInput.value = selectedValue;
    hiddenInput.setAttribute("data-select-input", "");
    control.append(hiddenInput);
  }
  hydrateSelect(control, { onValueChange });
  return control;
}

export function hydrateSelect(root, { onValueChange } = {}) {
  const attributeControls = Array.from(root?.querySelectorAll?.("[data-select-control]") ?? []);
  const classControls = Array.from(root?.querySelectorAll?.(".select-control") ?? []);
  const controls = root?.matches?.("[data-select-control]")
    ? [root]
    : root?.className?.split?.(" ")?.includes("select-control")
      ? [root]
      : attributeControls.length ? attributeControls : classControls;
  controls.forEach((control) => {
    if (control.__selectHydrated === true) return;
    const trigger = control.querySelector("[data-select-trigger]") ?? control.querySelector(".select-control__trigger");
    const input = control.querySelector("[data-select-input]")
      ?? Array.from(control.querySelectorAll?.("input") ?? []).find((node) => node.attributes?.["data-select-input"] !== undefined || node.type === "hidden");
    const attributeOptions = Array.from(control.querySelectorAll("[data-select-option]") ?? []);
    const classOptions = Array.from(control.querySelectorAll(".select-control__option") ?? []);
    const options = attributeOptions.length ? attributeOptions : classOptions;
    if (!trigger || !options.length) return;
    control.__selectHydrated = true;
    const setOpen = (open) => {
      control.dataset.open = String(open);
      trigger.setAttribute("aria-expanded", String(open));
    };
    const enabledOptions = () => options.filter((option) => option.dataset.disabled !== "true");
    const selectedOption = () => options.find((option) => option.dataset.selected === "true") ?? enabledOptions()[0];
    const focusOption = (option) => {
      if (!option) return;
      trigger.setAttribute("aria-activedescendant", option.id);
      option.focus?.();
    };
    const moveFocus = (currentOption, delta) => {
      const enabled = enabledOptions();
      if (!enabled.length) return;
      const currentIndex = Math.max(enabled.indexOf(currentOption), 0);
      const nextIndex = Math.max(0, Math.min(enabled.length - 1, currentIndex + delta));
      focusOption(enabled[nextIndex]);
    };
    const choose = (option) => {
      if (option.dataset.disabled === "true") return;
      options.forEach((item) => {
        const selected = item === option;
        item.dataset.selected = String(selected);
        item.setAttribute("aria-selected", String(selected));
      });
      control.dataset.value = option.dataset.value ?? "";
      const valueLabel = trigger.querySelector("[data-select-value-label]") ?? trigger.querySelector(".select-control__value");
      const valueMeta = trigger.querySelector("[data-select-value-meta]");
      if (valueLabel) valueLabel.textContent = option.dataset.label ?? option.textContent.trim();
      if (valueMeta) valueMeta.textContent = option.dataset.meta ?? "";
      if (input) input.value = option.dataset.value ?? "";
      trigger.setAttribute("aria-activedescendant", option.id);
      onValueChange?.(option.dataset.value ?? "", { label: option.dataset.label ?? "", meta: option.dataset.meta ?? "" });
      setOpen(false);
      trigger.focus?.();
    };
    document.addEventListener?.("mousedown", (event) => {
      if (control.dataset.open !== "true") return;
      if (control.contains?.(event.target)) return;
      setOpen(false);
    });
    trigger.addEventListener?.("click", () => setOpen(control.dataset.open !== "true"));
    trigger.addEventListener?.("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault?.();
        setOpen(control.dataset.open !== "true");
      }
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowDown") {
        event.preventDefault?.();
        setOpen(true);
        focusOption(selectedOption());
      }
      if (event.key === "ArrowUp") {
        event.preventDefault?.();
        setOpen(true);
        focusOption(selectedOption());
      }
    });
    options.forEach((option, index) => {
      option.addEventListener?.("click", () => choose(option));
      option.addEventListener?.("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault?.();
          choose(option);
        }
        if (event.key === "Escape") {
          setOpen(false);
          trigger.focus?.();
        }
        if (event.key === "ArrowDown") {
          event.preventDefault?.();
          moveFocus(option, 1);
        }
        if (event.key === "ArrowUp") {
          event.preventDefault?.();
          moveFocus(option, -1);
        }
        if (event.key === "Home") {
          event.preventDefault?.();
          focusOption(enabledOptions()[0]);
        }
        if (event.key === "End") {
          event.preventDefault?.();
          const enabled = enabledOptions();
          focusOption(enabled[enabled.length - 1]);
        }
      });
    });
  });
  return root;
}

export function createCombobox({
  label,
  helper = "",
  icon = "search",
  options = [],
  value = "",
  name = "",
  placeholder = "Search or select",
  emptyText = "No results",
  disabled = false,
  density = "md",
  state = "default",
  onValueChange,
} = {}) {
  const id = `combobox-${++comboboxId}`;
  const selectedOption = options.find((option) => (option.value ?? option.label ?? "") === value);
  const resolvedState = disabled ? "disabled" : state || (selectedOption ? "filled" : "default");
  const { root: formControl } = createFieldShell({
    id,
    label,
    fallbackLabel: "Combobox",
    state: resolvedState,
    density,
  });
  const control = createFieldSurface({ className: "combobox" });
  control.dataset.open = String(state === "open");
  control.dataset.state = resolvedState;
  control.dataset.value = selectedOption?.value ?? value ?? "";
  control.setAttribute("data-combobox-control", "");

  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "field__icon combobox__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = icon;
    control.append(iconNode);
  }

  const input = document.createElement("input");
  input.className = "input combobox__input";
  input.id = id;
  input.name = name;
  input.type = "text";
  input.value = selectedOption?.label ?? value ?? "";
  if (input.value) input.setAttribute("value", input.value);
  input.placeholder = placeholder;
  if (placeholder) input.setAttribute("placeholder", placeholder);
  input.disabled = Boolean(disabled);
  input.autocomplete = "off";
  input.spellcheck = false;
  input.setAttribute("role", "combobox");
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-expanded", String(state === "open"));
  input.setAttribute("aria-haspopup", "listbox");
  input.setAttribute("aria-controls", `${id}-listbox`);
  input.setAttribute("aria-labelledby", `${id}-label`);
  if (resolvedState === "error") input.setAttribute("aria-invalid", "true");
  control.append(input);

  const clearButton = createFieldAction({
    action: "clear",
    ariaLabel: "Clear selection",
    disabled: disabled || !input.value,
    icon: "close",
  });
  clearButton.className = `${clearButton.className} field__action combobox__clear`;
  clearButton.setAttribute("data-combobox-clear", "");
  control.append(clearButton);

  const chevronNode = document.createElement("span");
  chevronNode.className = "select-control__chevron combobox__chevron";
  chevronNode.setAttribute("aria-hidden", "true");
  chevronNode.textContent = "expand_more";
  control.append(chevronNode);

  const listbox = document.createElement("span");
  listbox.id = `${id}-listbox`;
  listbox.className = "select-control__listbox combobox__listbox";
  listbox.setAttribute("role", "listbox");
  listbox.setAttribute("data-combobox-listbox", "");
  listbox.setAttribute("aria-label", `${label ?? "Combobox"} options`);

  options.forEach((option, index) => {
    const optionValue = option.value ?? option.label ?? "";
    const isSelected = optionValue === (selectedOption?.value ?? value);
    const optionNode = document.createElement("span");
    optionNode.id = `${id}-option-${index}`;
    optionNode.className = "select-control__option combobox__option";
    optionNode.setAttribute("role", "option");
    optionNode.setAttribute("tabindex", "-1");
    optionNode.setAttribute("aria-selected", String(isSelected));
    optionNode.setAttribute("data-combobox-option", "");
    optionNode.dataset.selected = String(isSelected);
    optionNode.dataset.value = optionValue;
    optionNode.dataset.label = option.label ?? option.value ?? "";
    if (option.meta) optionNode.dataset.meta = option.meta;
    if (option.disabled) {
      optionNode.dataset.disabled = "true";
      optionNode.setAttribute("aria-disabled", "true");
    }
    const optionLabel = document.createElement("span");
    optionLabel.className = "select-control__option-label combobox__option-label";
    optionLabel.textContent = option.label ?? option.value ?? "";
    if (option.meta) {
      const optionMeta = document.createElement("span");
      optionMeta.className = "select-control__option-code combobox__option-meta";
      optionMeta.textContent = option.meta;
      optionNode.append(optionLabel, optionMeta);
    } else {
      optionNode.append(optionLabel);
    }
    listbox.append(optionNode);
    if (isSelected) input.setAttribute("aria-activedescendant", optionNode.id);
  });

  const emptyNode = document.createElement("span");
  emptyNode.className = "combobox__empty";
  emptyNode.setAttribute("data-combobox-empty", "");
  emptyNode.setAttribute("role", "status");
  emptyNode.hidden = true;
  emptyNode.textContent = emptyText;
  listbox.append(emptyNode);

  control.append(listbox);
  formControl.append(control);
  appendFieldHelper(formControl, { id, text: helper, target: input });
  hydrateCombobox(formControl, { onValueChange });
  return formControl;
}

export function hydrateCombobox(root, { onValueChange } = {}) {
  const attributeControls = Array.from(root?.querySelectorAll?.("[data-combobox-control]") ?? []);
  const classControls = Array.from(root?.querySelectorAll?.(".combobox") ?? []);
  const controls = root?.matches?.("[data-combobox-control]")
    ? [root]
    : root?.className?.split?.(" ")?.includes("combobox")
      ? [root]
      : attributeControls.length ? attributeControls : classControls;
  controls.forEach((control) => {
    if (control.__comboboxHydrated === true) return;
    const input = control.querySelector?.("[role='combobox']") ?? control.querySelector?.(".combobox__input");
    const clearButton = control.querySelector?.("[data-combobox-clear]") ?? control.querySelector?.(".combobox__clear");
    const listbox = control.querySelector?.("[data-combobox-listbox]") ?? control.querySelector?.(".combobox__listbox");
    const attributeOptions = Array.from(control.querySelectorAll?.("[data-combobox-option]") ?? []);
    const classOptions = Array.from(control.querySelectorAll?.(".combobox__option") ?? []);
    const options = attributeOptions.length ? attributeOptions : classOptions;
    const emptyNode = control.querySelector?.("[data-combobox-empty]");
    if (!input || !listbox) return;
    control.__comboboxHydrated = true;
    let activeIndex = Math.max(options.findIndex((option) => option.dataset.selected === "true"), 0);

    const enabledOptions = () => options.filter((option) => option.dataset.disabled !== "true" && option.hidden !== true);
    const activeOption = () => enabledOptions()[activeIndex] ?? enabledOptions()[0];
    const syncClear = () => {
      if (clearButton) clearButton.disabled = input.disabled || !input.value;
    };
    const setOpen = (open) => {
      control.dataset.open = String(open);
      input.setAttribute("aria-expanded", String(open));
    };
    const filter = () => {
      const query = input.value.trim().toLowerCase();
      let visibleCount = 0;
      options.forEach((option) => {
        const haystack = `${option.dataset.label ?? ""} ${option.dataset.meta ?? ""}`.toLowerCase();
        const visible = !query || haystack.includes(query);
        option.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (emptyNode) emptyNode.hidden = visibleCount > 0;
      activeIndex = 0;
      const next = activeOption();
      if (next) input.setAttribute("aria-activedescendant", next.id);
      else input.removeAttribute?.("aria-activedescendant");
      syncClear();
    };
    const choose = (option) => {
      if (!option || option.dataset.disabled === "true") return;
      options.forEach((item) => {
        const selected = item === option;
        item.dataset.selected = String(selected);
        item.setAttribute("aria-selected", String(selected));
      });
      input.value = option.dataset.label ?? option.dataset.value ?? "";
      control.dataset.value = option.dataset.value ?? "";
      input.setAttribute("aria-activedescendant", option.id);
      onValueChange?.(option.dataset.value ?? "", { label: option.dataset.label ?? "", meta: option.dataset.meta ?? "" });
      setOpen(false);
      syncClear();
      input.focus?.();
    };
    const move = (delta) => {
      const enabled = enabledOptions();
      if (!enabled.length) return;
      activeIndex = Math.max(0, Math.min(enabled.length - 1, activeIndex + delta));
      const next = enabled[activeIndex];
      input.setAttribute("aria-activedescendant", next.id);
      next.scrollIntoView?.({ block: "nearest" });
    };

    filter();
    input.addEventListener?.("focus", () => {
      filter();
      setOpen(true);
    });
    input.addEventListener?.("input", () => {
      filter();
      setOpen(true);
      onValueChange?.(input.value, { label: input.value, meta: "", inputValue: input.value });
    });
    input.addEventListener?.("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault?.();
        filter();
        setOpen(true);
        move(1);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault?.();
        filter();
        setOpen(true);
        move(-1);
      }
      if (event.key === "Enter") {
        event.preventDefault?.();
        choose(activeOption());
      }
      if (event.key === "Escape") setOpen(false);
    });
    options.forEach((option) => {
      option.addEventListener?.("mousedown", (event) => event.preventDefault?.());
      option.addEventListener?.("click", () => choose(option));
    });
    clearButton?.addEventListener?.("click", () => {
      input.value = "";
      control.dataset.value = "";
      options.forEach((option) => {
        option.dataset.selected = "false";
        option.setAttribute("aria-selected", "false");
      });
      onValueChange?.("", { label: "", meta: "", cleared: true });
      filter();
      setOpen(true);
      input.focus?.();
    });
    document.addEventListener?.("mousedown", (event) => {
      if (control.dataset.open !== "true") return;
      if (control.contains?.(event.target)) return;
      setOpen(false);
    });
  });
  return root;
}

export function createTextArea({
  label,
  helper = "",
  helperText,
  error = "",
  value = "",
  name = "",
  placeholder = "",
  disabled = false,
  loading = false,
  required = false,
  rows = 3,
  maxLength,
  density = "md",
  state,
  onChange,
} = {}) {
  const id = `text-area-${++textAreaId}`;
  const resolvedHelper = error || helperText || helper;
  const resolvedState = resolveFieldState({ disabled, loading, error, state, value });
  const isDisabled = Boolean(disabled) || Boolean(loading);
  const { root: formControl } = createFieldShell({
    id,
    label,
    fallbackLabel: "Text area",
    state: resolvedState,
    density,
  });

  const textarea = document.createElement("textarea");
  textarea.className = "text-area";
  textarea.id = id;
  textarea.name = name;
  textarea.value = value;
  if (value) textarea.textContent = value;
  textarea.placeholder = placeholder;
  if (placeholder) textarea.setAttribute("placeholder", placeholder);
  textarea.disabled = isDisabled;
  textarea.required = Boolean(required);
  textarea.rows = rows;
  if (maxLength != null) textarea.maxLength = Number(maxLength);
  if (error) textarea.setAttribute("aria-invalid", "true");

  const surface = document.createElement("span");
  surface.className = "text-area__surface";
  surface.append(textarea);
  formControl.append(surface);
  const describedBy = [];
  if (resolvedHelper) {
    const helperNode = appendFieldHelper(formControl, { id, text: resolvedHelper });
    describedBy.push(helperNode.id);
  }
  let counterNode = null;
  if (maxLength != null) {
    counterNode = document.createElement("span");
    counterNode.className = "text-area__counter";
    counterNode.id = `${id}-counter`;
    counterNode.setAttribute("data-text-area-counter", "");
    counterNode.textContent = `${String(value ?? "").length}/${Number(maxLength)}`;
    surface.dataset.hasCounter = "true";
    describedBy.push(counterNode.id);
    surface.append(counterNode);
  }
  if (describedBy.length) textarea.setAttribute("aria-describedby", describedBy.join(" "));
  attachTextAreaCounter(formControl, onChange);
  return formControl;
}

function attachTextAreaCounter(controlRoot, onChange) {
  const textarea = controlRoot.querySelector?.(".text-area");
  if (!textarea || textarea.__textAreaHydrated === true) return false;
  textarea.__textAreaHydrated = true;
  const counterNode = controlRoot.querySelector?.(".text-area__counter");
  const maxLength = Number(textarea.maxLength);
  const update = () => {
    if (counterNode && Number.isFinite(maxLength) && maxLength >= 0) {
      counterNode.textContent = `${String(textarea.value ?? "").length}/${maxLength}`;
    }
    onChange?.(textarea.value);
  };
  textarea.addEventListener?.("input", update);
  return true;
}
