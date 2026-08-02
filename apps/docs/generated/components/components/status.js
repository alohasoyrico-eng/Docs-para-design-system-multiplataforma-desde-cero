import { setIconGlyph } from "../primitives/iconography.js?v=1";

export function createBadge({
  label,
  tone = "neutral",
  variant = "status",
  state = "default",
  hidden = false,
  live = false,
  icon = "",
  ariaLabel = "",
} = {}) {
  const validTones = new Set(["neutral", "info", "success", "warning", "danger", "accent"]);
  const validVariants = new Set(["count", "dot", "status", "icon"]);
  const validStates = new Set(["default", "hover", "focus", "overflow", "hidden", "disabled"]);
  const resolvedTone = validTones.has(tone) ? tone : "neutral";
  const resolvedVariant = validVariants.has(variant) ? variant : "status";
  const resolvedState = hidden ? "hidden" : validStates.has(state) ? state : "default";
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.dataset.tone = resolvedTone;
  badge.dataset.variant = resolvedVariant;
  badge.dataset.state = resolvedState;
  badge.hidden = resolvedState === "hidden";
  if (ariaLabel) badge.setAttribute("aria-label", ariaLabel);
  if (resolvedState === "disabled") badge.setAttribute("aria-disabled", "true");
  if (live) {
    badge.setAttribute("role", "status");
    badge.setAttribute("aria-live", "polite");
    badge.dataset.live = "true";
  }
  if (live) {
    const liveNode = document.createElement("span");
    liveNode.className = "badge__live";
    liveNode.setAttribute("aria-hidden", "true");
    badge.append(liveNode);
  }
  if (resolvedVariant === "icon" && icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "badge__icon";
    iconNode.setAttribute("aria-hidden", "true");
    setIconGlyph(iconNode, icon);
    badge.append(iconNode);
  }
  const valueNode = document.createElement("span");
  valueNode.className = "badge__label";
  valueNode.textContent = resolvedVariant === "dot" ? "" : label ?? "Badge";
  badge.append(valueNode);
  return badge;
}

export function createChip({
  label,
  variant = "filter",
  tone = "default",
  state = "default",
  selected = false,
  disabled = false,
  removable = false,
  icon = "",
  interactive = false,
  onRemoveLabel = "",
  onRemove,
  onSelectedChange,
} = {}) {
  const validVariants = new Set(["filter", "input", "suggestion", "assist"]);
  const validTones = new Set(["default", "danger", "warning"]);
  const validStates = new Set(["default", "hover", "pressed", "selected", "focus", "disabled"]);
  const resolvedVariant = validVariants.has(variant) ? variant : "filter";
  const resolvedTone = validTones.has(tone) ? tone : "default";
  const isSelected = Boolean(selected) || state === "selected";
  const resolvedState = disabled || state === "disabled" ? "disabled" : validStates.has(state) ? state : isSelected ? "selected" : "default";
  interactive = Boolean(interactive) || isSelected || removable || typeof onSelectedChange === "function" || typeof onRemove === "function";
  const chip = document.createElement(interactive ? "button" : "span");
  chip.className = "chip";
  chip.dataset.variant = resolvedVariant;
  chip.dataset.tone = resolvedTone;
  chip.dataset.state = resolvedState;
  chip.dataset.selected = String(isSelected);
  if (chip.tagName === "BUTTON") {
    chip.type = "button";
    chip.disabled = resolvedState === "disabled";
    chip.setAttribute("aria-pressed", String(isSelected));
    chip.addEventListener?.("click", () => {
      if (chip.disabled) return;
      if (removable) {
        chip.hidden = true;
        if (typeof onRemove === "function") onRemove(label ?? "Chip");
        return;
      }
      const nextSelected = chip.dataset.selected !== "true";
      chip.dataset.selected = String(nextSelected);
      chip.dataset.state = nextSelected ? "selected" : "default";
      chip.setAttribute("aria-pressed", String(nextSelected));
      if (typeof onSelectedChange === "function") onSelectedChange(nextSelected);
    });
  }
  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "chip__icon";
    iconNode.setAttribute("aria-hidden", "true");
    setIconGlyph(iconNode, icon);
    chip.append(iconNode);
  }
  const labelNode = document.createElement("span");
  labelNode.className = "chip__label";
  labelNode.textContent = label ?? "Chip";
  chip.append(labelNode);
  if (removable) {
    chip.setAttribute("aria-label", onRemoveLabel || `Remove ${label ?? "chip"}`);
    chip.dataset.chipRemove = "true";
    const removeNode = document.createElement("span");
    removeNode.className = "chip__remove";
    removeNode.dataset.chipRemoveIcon = "true";
    removeNode.setAttribute("aria-hidden", "true");
    setIconGlyph(removeNode, "close");
    chip.append(removeNode);
  }
  return chip;
}

export function createTag({
  label,
  variant = "metadata",
  tone = "neutral",
  state = "default",
  icon = "",
  interactive = false,
  disabled = false,
} = {}) {
  const validVariants = new Set(["metadata", "status", "platform", "link"]);
  const validTones = new Set(["neutral", "info", "success", "warning", "danger"]);
  const validStates = new Set(["default", "hover", "pressed", "focus", "disabled"]);
  const resolvedVariant = validVariants.has(variant) ? variant : "metadata";
  const resolvedTone = validTones.has(tone) ? tone : "neutral";
  const resolvedState = disabled ? "disabled" : validStates.has(state) ? state : "default";
  const isInteractive = Boolean(interactive) || resolvedVariant === "link";
  const tag = document.createElement(isInteractive ? "button" : "span");
  tag.className = "tag";
  tag.dataset.variant = resolvedVariant;
  tag.dataset.tone = resolvedTone;
  tag.dataset.state = resolvedState;
  if (isInteractive) {
    tag.type = "button";
    tag.disabled = resolvedState === "disabled";
    tag.dataset.interactive = "true";
  }
  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "tag__icon";
    iconNode.setAttribute("aria-hidden", "true");
    setIconGlyph(iconNode, icon);
    tag.append(iconNode);
  }
  const labelNode = document.createElement("span");
  labelNode.className = "tag__label";
  labelNode.textContent = label ?? "Tag";
  tag.append(labelNode);
  return tag;
}
