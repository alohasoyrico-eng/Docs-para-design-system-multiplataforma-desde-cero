import { createSpinner } from "./feedback.js?v=8";

export function createButton({
  label,
  variant = "primary",
  intent = "default",
  density = "md",
  state = "default",
  disabled = false,
  loading = false,
  icon = "",
  trailingIcon = "",
  fullWidth = false,
  type = "button",
} = {}) {
  const resolvedState = loading || state === "loading" ? "loading" : disabled || state === "disabled" ? "disabled" : state || "default";
  const button = document.createElement("button");
  button.type = type;
  button.className = ["button", `button--${variant}`, intent !== "default" ? `button--${intent}` : ""].filter(Boolean).join(" ");
  button.disabled = resolvedState === "disabled" || resolvedState === "loading";
  button.dataset.density = density;
  button.dataset.state = resolvedState;
  button.dataset.fullWidth = String(Boolean(fullWidth));
  if (resolvedState === "loading") button.setAttribute("aria-busy", "true");
  const leadingIcon = resolvedState === "loading" ? "" : icon;
  if (resolvedState === "loading") {
    button.append(createSpinner({ label: `${label ?? "Button"} loading`, density: "sm", decorative: true }));
  } else if (leadingIcon) {
    const iconNode = document.createElement("span");
    iconNode.className = "button__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = leadingIcon;
    button.append(iconNode);
  }
  const labelNode = document.createElement("span");
  labelNode.className = "button__label";
  labelNode.textContent = label ?? "Button";
  button.append(labelNode);
  if (trailingIcon && resolvedState !== "loading") {
    const iconNode = document.createElement("span");
    iconNode.className = "button__icon button__icon--trailing";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = trailingIcon;
    button.append(iconNode);
  }
  return button;
}

export function createIconButton({
  label,
  ariaLabel,
  icon,
  variant = "ghost",
  density = "md",
  selected = false,
  badge = false,
  disabled = false,
  type = "button",
} = {}) {
  const resolvedLabel = ariaLabel ?? label ?? icon ?? "Action";
  const canToggle = typeof selected === "boolean" && selected;
  const button = document.createElement("button");
  button.type = type;
  button.className = [
    "icon-button",
    `icon-button--${variant}`,
  ].filter(Boolean).join(" ");
  button.disabled = disabled;
  button.setAttribute("aria-label", resolvedLabel);
  button.dataset.density = density;
  if (canToggle) button.setAttribute("aria-pressed", "true");

  const iconNode = document.createElement("span");
  iconNode.className = "icon-button__icon";
  iconNode.setAttribute("aria-hidden", "true");
  iconNode.textContent = icon ?? "more_horiz";
  button.append(iconNode);

  if (badge) {
    const badgeNode = document.createElement("span");
    badgeNode.className = "icon-button__badge";
    badgeNode.setAttribute("aria-hidden", "true");
    button.append(badgeNode);
  }

  return button;
}
