import { createButton, createIconButton } from "./actions.js";
import { createSpinner } from "./feedback.js?v=8";
import { createInput } from "./fields.js";

export function createCard({
  title,
  value = "",
  unit = "",
  detail = "",
  status = "",
  trend = "neutral",
  icon = "",
  media = "",
  mediaAlt = "",
  variant = "default",
  composition = "standard",
  state = "default",
  density = "md",
  fullWidth = false,
  interactive = false,
  selected = false,
  disabled = false,
  loading = false,
  actions = [],
  onAction,
} = {}) {
  const resolvedVariant = ["default", "minimal", "elevated", "ghost"].includes(variant) ? variant : "default";
  const resolvedComposition = ["standard", "compact", "media", "stats"].includes(composition) ? composition : "standard";
  const resolvedState = disabled
    ? "disabled"
    : loading
      ? "loading"
      : selected
        ? "selected"
        : ["default", "hover", "focus", "selected", "loading", "error", "disabled", "muted", "interactive"].includes(state)
          ? state
          : "default";
  const isInteractive = actions.length
    ? false
    : Boolean(interactive || resolvedState === "interactive" || resolvedState === "hover" || resolvedState === "focus" || selected || onAction);
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.variant = resolvedVariant;
  card.dataset.composition = resolvedComposition;
  card.dataset.state = resolvedState;
  card.dataset.density = density;
  card.dataset.fullWidth = String(Boolean(fullWidth));
  card.dataset.interactive = String(isInteractive);
  if (isInteractive) {
    card.tabIndex = resolvedState === "disabled" || resolvedState === "loading" ? -1 : 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", String(resolvedState === "selected"));
  }
  if (resolvedState === "disabled") card.setAttribute("aria-disabled", "true");
  if (resolvedState === "loading") card.setAttribute("aria-busy", "true");

  const header = document.createElement("div");
  header.className = "card__header";

  const heading = document.createElement("div");
  heading.className = "card__heading";

  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "card__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = icon;
    heading.append(iconNode);
  }

  const titleNode = document.createElement("h3");
  titleNode.className = "card__title";
  titleNode.textContent = title ?? "Card";
  heading.append(titleNode);
  header.append(heading);

  if (status) {
    const statusNode = document.createElement("span");
    statusNode.className = "card__status";
    if (resolvedComposition === "stats") {
      statusNode.dataset.trend = ["up", "down", "neutral"].includes(trend) ? trend : "neutral";
    }
    statusNode.textContent = status;
    header.append(statusNode);
  }

  const valueNode = document.createElement("p");
  valueNode.className = "card__value";
  valueNode.textContent = resolvedComposition === "stats" ? `${unit}${value}` : value;

  const detailNode = document.createElement("p");
  detailNode.className = "card__detail";
  detailNode.textContent = detail;

  const actionRow = document.createElement("div");
  actionRow.className = "card__actions";
  for (const action of actions) {
    const isIconOnly = Boolean(action.iconOnly) || (!action.label && Boolean(action.icon));
    actionRow.append(isIconOnly
      ? createIconButton({ density, variant: action.variant ?? "ghost", ...action })
      : createButton({ density, ...action }));
  }

  if (resolvedComposition === "media" && media) {
    const mediaNode = document.createElement("img");
    mediaNode.className = "card__media";
    mediaNode.setAttribute("src", media);
    mediaNode.setAttribute("alt", mediaAlt || "");
    if (!mediaAlt) mediaNode.setAttribute("aria-hidden", "true");
    card.append(mediaNode);
  }
  const contentRoot = resolvedComposition === "media" ? document.createElement("div") : card;
  if (resolvedComposition === "media") {
    contentRoot.className = "card__body";
    card.append(contentRoot);
  }
  contentRoot.append(header);
  if (resolvedState === "loading") {
    const loadingRow = document.createElement("div");
    loadingRow.className = "card__loading";
    loadingRow.append(createSpinner({ label: `${title ?? "Card"} loading`, density: "sm" }));
    const loadingText = document.createElement("span");
    loadingText.textContent = value || "Loading";
    loadingRow.append(loadingText);
    contentRoot.append(loadingRow);
  } else {
    if (value) contentRoot.append(valueNode);
    if (detail) contentRoot.append(detailNode);
  }
  if (actions.length) contentRoot.append(actionRow);
  if (isInteractive && typeof onAction === "function" && resolvedState !== "disabled" && resolvedState !== "loading") {
    card.addEventListener("click", onAction);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      onAction(event);
    });
  }
  return card;
}

export function createFloatingActionButton({
  label,
  icon = "add",
  variant = "primary",
  state = "default",
  density = "md",
  extended = false,
  loading = false,
  disabled = false,
  type = "button",
} = {}) {
  const resolvedVariant = ["primary", "accent", "extended", "mini"].includes(variant) ? variant : "primary";
  const resolvedState = loading || state === "loading" ? "loading" : disabled || state === "disabled" ? "disabled" : state || "default";
  const isExtended = Boolean(extended) || resolvedVariant === "extended";
  const button = document.createElement("button");
  button.type = type;
  button.className = "fab";
  button.dataset.variant = resolvedVariant;
  button.dataset.state = resolvedState;
  button.dataset.density = density;
  button.dataset.extended = String(isExtended);
  button.disabled = resolvedState === "disabled" || resolvedState === "loading";
  button.setAttribute("aria-label", label ?? "Create");
  if (resolvedState === "loading") button.setAttribute("aria-busy", "true");

  if (resolvedState === "loading") {
    button.append(createSpinner({ label: `${label ?? "Create"} loading`, density: "sm", decorative: true }));
  } else {
    const iconNode = document.createElement("span");
    iconNode.className = "fab__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = icon;
    button.append(iconNode);
  }

  if (isExtended) {
    const labelNode = document.createElement("span");
    labelNode.className = "fab__label";
    labelNode.textContent = label ?? "Create";
    button.append(labelNode);
  }
  return button;
}

export function createInlineValidation({
  label,
  value = "",
  message = "",
  state = "default",
  id = "",
  fullWidth = false,
  field,
  live = false,
} = {}) {
  const root = document.createElement("div");
  root.className = "inline-validation";
  root.dataset.state = state;
  root.dataset.fullWidth = String(Boolean(fullWidth));
  const showField = field ?? value !== "";
  root.dataset.field = String(Boolean(showField));
  const fieldId = id || `inline-validation-${String(label ?? "field").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  const messageId = `${fieldId}-message`;

  if (showField) {
    const inputControl = createInput({
      label: label ?? "Input",
      value,
      state,
      disabled: state === "disabled",
    });
    const input = inputControl.querySelector("input");
    input.id = fieldId;
    if (message) input.setAttribute("aria-describedby", messageId);
    if (state === "error") input.setAttribute("aria-invalid", "true");
    root.append(inputControl);
  } else if (label) {
    root.setAttribute("aria-label", label);
  }

  if (message) {
    const messageNode = document.createElement("p");
    messageNode.className = "inline-validation__message";
    messageNode.id = messageId;
    if (live && state === "error") messageNode.setAttribute("role", "alert");
    if (live && state !== "error" && state !== "disabled") messageNode.setAttribute("role", "status");
    messageNode.textContent = message;
    root.append(messageNode);
  }
  return root;
}
