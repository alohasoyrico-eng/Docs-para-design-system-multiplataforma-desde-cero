import { createButton } from "./actions.js";

let progressIndicatorId = 0;

export function createSpinner({
  label = "Loading",
  density = "md",
  tone = "accent",
  state = "loading",
  decorative = false,
} = {}) {
  const spinner = document.createElement("span");
  spinner.className = "spinner";
  spinner.dataset.density = density;
  spinner.dataset.tone = tone;
  spinner.dataset.state = state;

  const svg = document.createElement("svg");
  svg.className = "spinner__svg";
  svg.setAttribute("viewBox", "0 0 40 40");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("aria-hidden", "true");

  const track = document.createElement("circle");
  track.className = "spinner__track";
  track.setAttribute("cx", "20");
  track.setAttribute("cy", "20");
  track.setAttribute("r", "16");
  track.setAttribute("pathLength", "100");

  const arc = document.createElement("circle");
  arc.className = "spinner__arc";
  arc.setAttribute("cx", "20");
  arc.setAttribute("cy", "20");
  arc.setAttribute("r", "16");
  arc.setAttribute("pathLength", "100");

  svg.append(track, arc);
  spinner.append(svg);

  if (decorative || state === "decorative") {
    spinner.setAttribute("aria-hidden", "true");
  } else {
    spinner.setAttribute("role", "status");
    spinner.setAttribute("aria-label", label);
  }
  return spinner;
}

export function createProgressIndicator({
  label = "Progress",
  value = 0,
  max = 100,
  indeterminate = false,
  showValue = false,
  tone = "accent",
  state = "active",
  density = "md",
  fullWidth = false,
} = {}) {
  const numericMax = Number(max) > 0 ? Number(max) : 100;
  const numericValue = state === "complete" ? numericMax : Math.max(0, Math.min(numericMax, Number(value) || 0));
  const percent = Math.max(0, Math.min(100, (numericValue / numericMax) * 100));
  const resolvedState = ["paused", "complete", "error", "disabled"].includes(state) ? state : state === "indeterminate" ? "indeterminate" : state;
  indeterminate = !["paused", "complete", "error", "disabled"].includes(resolvedState) && (Boolean(indeterminate) || resolvedState === "indeterminate");
  const progress = document.createElement("div");
  progress.className = "progress";
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-valuemin", "0");
  progress.dataset.tone = tone;
  progress.dataset.state = resolvedState;
  progress.dataset.density = density;
  progress.dataset.fullWidth = String(Boolean(fullWidth));
  if (!indeterminate) {
    progress.setAttribute("aria-valuemax", String(numericMax));
    progress.setAttribute("aria-valuenow", String(numericValue));
    if (resolvedState === "paused") progress.setAttribute("aria-valuetext", `Paused at ${Math.round(percent)}%`);
    if (resolvedState === "complete") progress.setAttribute("aria-valuetext", "Complete");
    if (resolvedState === "error") progress.setAttribute("aria-valuetext", `Error at ${Math.round(percent)}%`);
    if (resolvedState === "disabled") {
      progress.setAttribute("aria-disabled", "true");
      progress.setAttribute("aria-valuetext", "Unavailable");
    }
  } else {
    progress.setAttribute("aria-valuetext", "In progress");
  }
  progress.dataset.indeterminate = String(indeterminate);

  const labelId = `progress-label-${++progressIndicatorId}`;
  const meta = document.createElement("span");
  meta.className = "progress__meta";
  const labelNode = document.createElement("span");
  labelNode.className = "progress__label";
  labelNode.id = labelId;
  labelNode.textContent = label;
  progress.setAttribute("aria-labelledby", labelId);
  meta.append(labelNode);
  if (showValue && !indeterminate) {
    const valueNode = document.createElement("span");
    valueNode.className = "progress__value";
    valueNode.textContent = `${Math.round(percent)}%`;
    meta.append(valueNode);
  }
  progress.append(meta);

  const track = document.createElement("span");
  track.className = "progress__track";
  const fill = document.createElement("span");
  fill.className = "progress__fill";
  fill.style = `--progress-value: ${percent}%`;
  track.append(fill);
  progress.append(track);
  return progress;
}

export function createSkeleton({
  label = "Content loading",
  variant = "text",
  lines = 3,
  busy = true,
  state = busy ? "loading" : "loaded",
  fullWidth = false,
  width = "",
  height = "",
  rows,
  columns = 4,
} = {}) {
  const skeleton = document.createElement("div");
  skeleton.className = ["skeleton", `skeleton--${variant}`].join(" ");
  skeleton.dataset.variant = variant;
  skeleton.dataset.state = state;
  skeleton.dataset.fullWidth = String(Boolean(fullWidth));
  const rowCount = Math.max(1, Math.min(8, Number(rows ?? lines)));
  const columnCount = Math.max(2, Math.min(6, Number(columns)));
  if (variant === "table") {
    skeleton.dataset.rows = String(rowCount);
    skeleton.dataset.columns = String(columnCount);
  }
  const styleVars = [];
  if (width) styleVars.push(`--skeleton-width: ${typeof width === "number" ? `${width}px` : String(width)}`);
  if (height) styleVars.push(`--skeleton-height: ${typeof height === "number" ? `${height}px` : String(height)}`);
  if (variant === "table") styleVars.push(`--skeleton-columns: ${columnCount}`);
  if (styleVars.length) skeleton.style = styleVars.join("; ");
  const isBusy = Boolean(busy) && !["loaded", "complete", "disabled"].includes(state);
  skeleton.setAttribute("role", "status");
  skeleton.setAttribute("aria-busy", String(isBusy));
  skeleton.setAttribute("aria-label", label);

  if (variant === "table") {
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      const row = document.createElement("span");
      row.className = "skeleton__row";
      row.setAttribute("aria-hidden", "true");
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
        const bone = document.createElement("span");
        bone.className = "skeleton__bone skeleton__cell";
        bone.setAttribute("aria-hidden", "true");
        row.append(bone);
      }
      skeleton.append(row);
    }
    return skeleton;
  }

  const count = ["circle", "pill", "title"].includes(variant) ? 1 : Math.max(1, Math.min(6, Number(lines)));
  for (let index = 0; index < count; index += 1) {
    const bone = document.createElement("span");
    bone.className = "skeleton__bone";
    bone.setAttribute("aria-hidden", "true");
    skeleton.append(bone);
  }
  return skeleton;
}

export function createEmptyState({
  title,
  description = "",
  icon = "",
  action,
  variant = "first-use",
  state = "default",
  density = "md",
  fullWidth = false,
  onAction,
} = {}) {
  const resolvedVariant = ["first-use", "search-empty", "permission", "error", "maintenance"].includes(variant) ? variant : "first-use";
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const resolvedState = ["default", "action", "search-empty", "permission", "loading", "error"].includes(state) ? state : "default";
  const empty = document.createElement("section");
  empty.className = "empty-state";
  empty.dataset.variant = resolvedVariant;
  empty.dataset.state = resolvedState;
  empty.dataset.density = resolvedDensity;
  empty.dataset.fullWidth = String(Boolean(fullWidth));

  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "empty-state__icon";
    iconNode.setAttribute("aria-hidden", "true");
    if (resolvedState === "loading") {
      iconNode.append(createSpinner({ label: "Loading empty state", density: "sm", decorative: true }));
    } else {
      iconNode.textContent = icon;
    }
    empty.append(iconNode);
  }

  const titleNode = document.createElement("h3");
  titleNode.className = "empty-state__title";
  titleNode.textContent = title ?? "No results";
  empty.append(titleNode);

  if (description) {
    const descriptionNode = document.createElement("p");
    descriptionNode.className = "empty-state__description";
    descriptionNode.textContent = description;
    empty.append(descriptionNode);
  }

  if (action?.label) {
    const actionNode = createButton({
      ...action,
      density: action.density ?? resolvedDensity,
      variant: action.variant ?? "primary",
    });
    actionNode.addEventListener?.("click", () => {
      if (typeof onAction === "function") onAction(action.key ?? action.label);
    });
    empty.append(actionNode);
  }
  return empty;
}

export function createErrorPanel({
  label,
  description = "",
  action,
  tone = "error",
  variant = "panel",
  state = "error",
  density = "md",
  fullWidth = false,
  icon = "",
  role,
  onAction,
} = {}) {
  const resolvedVariant = ["inline", "panel", "blocking", "empty-recovery"].includes(variant) ? variant : "panel";
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const resolvedState = ["default", "warning", "error", "critical", "loading", "disabled"].includes(state) ? state : "error";
  const resolvedTone = resolvedState === "warning" ? "warning" : resolvedState === "critical" ? "critical" : tone === "warning" ? "warning" : "error";
  const panel = document.createElement("section");
  panel.className = ["error-panel", `error-panel--${resolvedTone}`].join(" ");
  panel.dataset.variant = resolvedVariant;
  panel.dataset.state = resolvedState;
  panel.dataset.density = resolvedDensity;
  panel.dataset.fullWidth = String(Boolean(fullWidth));
  panel.setAttribute("role", role ?? (resolvedTone === "warning" || resolvedState === "loading" ? "status" : "alert"));

  const iconNode = document.createElement("span");
  iconNode.className = "error-panel__icon";
  iconNode.setAttribute("aria-hidden", "true");
  if (resolvedState === "loading") {
    iconNode.append(createSpinner({ label: "Loading error panel", density: "sm", decorative: true }));
  } else {
    iconNode.textContent = icon || (resolvedTone === "warning" ? "warning" : "error");
  }
  panel.append(iconNode);

  const content = document.createElement("div");
  content.className = "error-panel__content";
  const title = document.createElement("strong");
  title.textContent = label ?? "Something needs attention";
  content.append(title);
  if (description) {
    const descriptionNode = document.createElement("p");
    descriptionNode.textContent = description;
    content.append(descriptionNode);
  }
  panel.append(content);

  if (action?.label) {
    const actionNode = createButton({
      ...action,
      density: action.density ?? resolvedDensity,
      variant: action.variant ?? "secondary",
      disabled: resolvedState === "disabled" || action.disabled,
      loading: resolvedState === "loading" || action.loading,
    });
    actionNode.addEventListener?.("click", () => {
      if (typeof onAction === "function") onAction(action.key ?? action.label);
    });
    panel.append(actionNode);
  }
  return panel;
}
