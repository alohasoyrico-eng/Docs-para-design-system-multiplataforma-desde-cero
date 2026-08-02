export function createFieldAction({
  ariaLabel,
  icon = "more_horiz",
  pressed,
  disabled = false,
  action = "",
  type = "button",
} = {}) {
  const button = document.createElement("button");
  button.type = type;
  button.className = "field-action";
  button.disabled = Boolean(disabled);
  button.setAttribute("aria-label", ariaLabel ?? "Field action");
  if (pressed != null) button.setAttribute("aria-pressed", String(Boolean(pressed)));
  if (action) button.dataset.fieldAction = action;

  const iconNode = document.createElement("span");
  iconNode.className = "field-action__icon field__icon";
  iconNode.setAttribute("aria-hidden", "true");
  iconNode.textContent = icon;
  button.append(iconNode);

  return button;
}
