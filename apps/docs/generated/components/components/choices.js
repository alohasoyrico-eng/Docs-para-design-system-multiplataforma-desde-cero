export function createCheckbox({
  label,
  description = "",
  error = "",
  variant = "default",
  state = "unchecked",
  density = "md",
  checked = false,
  indeterminate = false,
  disabled = false,
  name = "",
  value = "on",
  required = false,
} = {}) {
  const allowedVariants = new Set(["default", "descriptive", "select-all", "compact"]);
  const allowedStates = new Set(["unchecked", "checked", "indeterminate", "focus", "error", "disabled"]);
  const allowedDensities = new Set(["sm", "md", "lg"]);
  const normalizedVariant = allowedVariants.has(variant) ? variant : "default";
  const normalizedState = disabled
    ? "disabled"
    : indeterminate
      ? "indeterminate"
      : checked
        ? "checked"
        : allowedStates.has(state)
          ? state
          : "unchecked";
  const isInvalid = normalizedState === "error" || Boolean(error);

  const field = document.createElement("label");
  field.className = "choice checkbox";
  field.dataset.checked = String(Boolean(checked));
  field.dataset.indeterminate = String(Boolean(indeterminate));
  field.dataset.variant = normalizedVariant;
  field.dataset.state = normalizedState;
  field.dataset.density = allowedDensities.has(density) ? density : "md";
  if (isInvalid) field.dataset.invalid = "true";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "choice__input";
  input.name = name;
  input.value = value;
  input.checked = Boolean(checked);
  input.indeterminate = Boolean(indeterminate);
  input.disabled = disabled;
  input.required = required;
  input.setAttribute("aria-checked", indeterminate ? "mixed" : String(Boolean(checked)));
  if (isInvalid) input.setAttribute("aria-invalid", "true");

  const mark = document.createElement("span");
  mark.className = "choice__mark";
  mark.setAttribute("aria-hidden", "true");
  const indicator = document.createElement("span");
  indicator.className = "choice__indicator material-symbol";
  indicator.textContent = indeterminate ? "remove" : "check";
  mark.append(indicator);

  const text = document.createElement("span");
  text.className = "choice__text";
  const labelNode = document.createElement("span");
  labelNode.className = "choice__label";
  labelNode.textContent = label ?? "Checkbox";
  text.append(labelNode);
  if (description) {
    const descriptionNode = document.createElement("span");
    descriptionNode.className = "choice__description";
    descriptionNode.textContent = description;
    text.append(descriptionNode);
  }
  if (error) {
    const errorNode = document.createElement("span");
    errorNode.className = "choice__error";
    errorNode.textContent = error;
    text.append(errorNode);
  }

  if (!disabled && typeof input.addEventListener === "function") {
    input.addEventListener("change", () => {
      input.indeterminate = false;
      field.dataset.indeterminate = "false";
      field.dataset.checked = String(input.checked);
      field.dataset.state = input.checked ? "checked" : "unchecked";
      input.setAttribute("aria-checked", String(input.checked));
      indicator.textContent = "check";
    });
  }

  field.append(input, mark, text);
  return field;
}

export function createSwitch({
  label,
  description = "",
  error = "",
  state = "off",
  density = "md",
  checked = false,
  disabled = false,
  name = "",
  required = false,
} = {}) {
  const field = document.createElement("label");
  field.className = "switch";
  field.dataset.state = disabled ? "disabled" : state;
  field.dataset.density = density;
  field.dataset.checked = String(Boolean(checked));
  if (error || state === "error") field.dataset.invalid = "true";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "switch__input";
  input.name = name;
  input.checked = Boolean(checked);
  input.disabled = disabled;
  input.required = required;
  input.setAttribute("role", "switch");
  input.setAttribute("aria-checked", String(Boolean(checked)));
  if (error) input.setAttribute("aria-invalid", "true");

  const text = document.createElement("span");
  text.className = "switch__text";
  const labelNode = document.createElement("span");
  labelNode.className = "switch__label";
  labelNode.textContent = label ?? "Switch";
  text.append(labelNode);
  if (description) {
    const descriptionNode = document.createElement("span");
    descriptionNode.className = "switch__description";
    descriptionNode.textContent = description;
    text.append(descriptionNode);
  }
  if (error) {
    const errorNode = document.createElement("span");
    errorNode.className = "switch__error";
    errorNode.textContent = error;
    text.append(errorNode);
  }

  const track = document.createElement("span");
  track.className = "switch__track";
  track.setAttribute("aria-hidden", "true");
  const thumb = document.createElement("span");
  thumb.className = "switch__thumb";
  track.append(thumb);

  const syncSwitchState = () => {
    const nextChecked = input.checked;
    input.setAttribute("aria-checked", String(nextChecked));
    field.dataset.checked = String(nextChecked);
    if (field.dataset.state === "on" || field.dataset.state === "off") {
      field.dataset.state = nextChecked ? "on" : "off";
    }
  };
  const syncSwitchSoon = () => {
    requestAnimationFrame(syncSwitchState);
    setTimeout(syncSwitchState, 40);
  };
  const toggleSwitch = (event) => {
    if (disabled) return;
    event.preventDefault();
    event.stopPropagation();
    input.checked = !input.checked;
    syncSwitchState();
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };

  if (!disabled && typeof input.addEventListener === "function") {
    input.addEventListener("change", syncSwitchState);
    input.addEventListener("input", syncSwitchState);
    input.addEventListener("click", toggleSwitch);
  }
  if (!disabled && typeof field.addEventListener === "function") {
    field.addEventListener("click", (event) => {
      if (event.target === input) return;
      toggleSwitch(event);
    });
    field.addEventListener("keyup", syncSwitchSoon);
  }

  field.append(input, track, text);
  return field;
}

export function createRadioButton({
  label,
  description = "",
  error = "",
  variant = "default",
  state = "unselected",
  density = "md",
  checked = false,
  disabled = false,
  name = "",
  value = "",
  required = false,
} = {}) {
  const allowedVariants = new Set(["default", "descriptive", "compact", "critical"]);
  const allowedStates = new Set(["unselected", "selected", "focus", "error", "disabled"]);
  const allowedDensities = new Set(["sm", "md", "lg"]);
  const normalizedVariant = allowedVariants.has(variant) ? variant : "default";
  const normalizedState = disabled
    ? "disabled"
    : checked
      ? "selected"
      : allowedStates.has(state)
        ? state
        : "unselected";
  const isInvalid = normalizedState === "error" || Boolean(error);

  const field = document.createElement("label");
  field.className = "choice radio";
  field.dataset.checked = String(Boolean(checked));
  field.dataset.variant = normalizedVariant;
  field.dataset.state = normalizedState;
  field.dataset.density = allowedDensities.has(density) ? density : "md";
  if (isInvalid) field.dataset.invalid = "true";

  const input = document.createElement("input");
  input.type = "radio";
  input.className = "choice__input";
  input.name = name;
  input.value = value;
  input.checked = Boolean(checked);
  input.disabled = disabled;
  input.required = required;
  if (isInvalid) input.setAttribute("aria-invalid", "true");

  const mark = document.createElement("span");
  mark.className = "choice__mark";
  mark.setAttribute("aria-hidden", "true");

  const text = document.createElement("span");
  text.className = "choice__text";
  const labelNode = document.createElement("span");
  labelNode.className = "choice__label";
  labelNode.textContent = label ?? "Radio button";
  text.append(labelNode);
  if (description) {
    const descriptionNode = document.createElement("span");
    descriptionNode.className = "choice__description";
    descriptionNode.textContent = description;
    text.append(descriptionNode);
  }
  if (error) {
    const errorNode = document.createElement("span");
    errorNode.className = "choice__error";
    errorNode.textContent = error;
    text.append(errorNode);
  }

  if (!disabled && typeof input.addEventListener === "function") {
    input.addEventListener("change", () => {
      field.dataset.checked = String(input.checked);
      field.dataset.state = input.checked ? "selected" : "unselected";
    });
  }

  field.append(input, mark, text);
  return field;
}
