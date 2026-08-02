import { setIconGlyph } from "../primitives/iconography.js?v=1";

export function createAvatar({
  name,
  src = "",
  size = "md",
  density,
  status = "none",
  state = "default",
} = {}) {
  const resolvedSize = ["sm", "md", "lg", "xl"].includes(density ?? size) ? density ?? size : "md";
  const resolvedStatus = ["none", "online", "busy", "offline"].includes(status) ? status : "none";
  const resolvedState = state === "disabled" ? "disabled" : resolvedStatus !== "none" ? resolvedStatus : state === "unknown" ? "unknown" : "default";
  const sourceName = String(name ?? "");
  let hash = 0;
  for (let index = 0; index < sourceName.length; index += 1) hash = (hash * 31 + sourceName.charCodeAt(index)) | 0;
  const colorIndex = String(Math.abs(hash) % 6);
  const avatar = document.createElement("span");
  avatar.className = ["avatar", `avatar--${resolvedSize}`].join(" ");
  avatar.dataset.status = resolvedStatus;
  avatar.dataset.state = resolvedState;
  avatar.dataset.colorIndex = colorIndex;
  avatar.setAttribute("aria-label", sourceName || "Unknown avatar");

  if (src) {
    const image = document.createElement("img");
    image.src = src;
    image.alt = sourceName;
    avatar.append(image);
  } else {
    const initials = sourceName
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";
    const initialsNode = document.createElement("span");
    initialsNode.className = "avatar__initials";
    initialsNode.setAttribute("aria-hidden", "true");
    initialsNode.textContent = initials;
    avatar.append(initialsNode);
  }

  if (resolvedStatus !== "none") {
    const statusNode = document.createElement("span");
    statusNode.className = "avatar__status";
    statusNode.setAttribute("aria-hidden", "true");
    avatar.append(statusNode);
  }
  return avatar;
}

export function createList({
  items = [],
  interactive = false,
  label = "",
  variant = "standard",
  state = "default",
  density = "md",
  onSelect,
} = {}) {
  const validVariants = new Set(["standard", "compact", "action", "status", "media"]);
  const validStates = new Set(["default", "hover", "selected", "loading", "error", "disabled"]);
  const resolvedVariant = validVariants.has(variant) ? variant : "standard";
  const resolvedState = validStates.has(state) ? state : "default";
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const isInteractive = Boolean(interactive || resolvedVariant === "action" || typeof onSelect === "function");
  const list = document.createElement("ul");
  list.className = "list";
  list.dataset.variant = resolvedVariant;
  list.dataset.state = resolvedState;
  list.dataset.density = resolvedDensity;
  list.dataset.interactive = String(isInteractive);
  list.setAttribute("role", "list");
  if (label) list.setAttribute("aria-label", label);
  if (resolvedState === "loading") list.setAttribute("aria-busy", "true");

  for (const item of items) {
    const row = document.createElement("li");
    row.className = "list__row";
    const rowState = item.state ?? resolvedState;
    const rowTone = item.tone ?? (rowState === "error" ? "danger" : "");
    const rowControl = document.createElement(isInteractive ? "button" : "span");
    rowControl.className = "list__item";
    rowControl.dataset.state = rowState;
    if (rowTone) rowControl.dataset.tone = rowTone;
    if (isInteractive) {
      rowControl.type = "button";
      rowControl.disabled = rowState === "disabled" || resolvedState === "disabled";
      rowControl.dataset.key = item.key ?? item.label ?? "";
      rowControl.addEventListener?.("click", () => {
        if (rowControl.disabled) return;
        if (typeof onSelect === "function") onSelect(rowControl.dataset.key);
      });
    }
    if (rowState === "selected") rowControl.setAttribute("aria-current", "true");
    if (rowState === "loading") rowControl.setAttribute("aria-busy", "true");

    if (item.icon) {
      const iconNode = document.createElement("span");
      iconNode.className = "list__icon";
      iconNode.setAttribute("aria-hidden", "true");
      iconNode.textContent = item.icon;
      rowControl.append(iconNode);
    }

    const content = document.createElement("span");
    content.className = "list__content";
    const title = document.createElement("strong");
    title.textContent = rowState === "loading" ? "Loading item" : item.label ?? "List item";
    content.append(title);
    if (item.meta) {
      const meta = document.createElement("small");
      meta.textContent = item.meta;
      content.append(meta);
    }
    rowControl.append(content);

    if (item.value) {
      const value = document.createElement("span");
      value.className = "list__value";
      value.textContent = item.value;
      rowControl.append(value);
    }
    row.append(rowControl);
    list.append(row);
  }
  return list;
}

export function createKpiTile({
  label,
  value,
  delta = "",
  trend = "flat",
  tone = "neutral",
  icon = "",
  variant = "standard",
  state = "default",
  density = "md",
  values = [],
  href = "",
  selected = false,
  disabled = false,
  loading = false,
  ariaLabel = "",
  onSelect,
} = {}) {
  const interactive = Boolean(href || onSelect || variant === "drill-in");
  const tile = document.createElement(href ? "a" : "article");
  const resolvedVariant = ["standard", "delta", "threshold", "sparkline", "drill-in"].includes(variant) ? variant : "standard";
  const resolvedState = loading ? "loading" : disabled ? "disabled" : state;
  tile.className = ["kpi-tile", `kpi-tile--${tone}`].join(" ");
  tile.dataset.variant = resolvedVariant;
  tile.dataset.state = resolvedState;
  tile.dataset.density = density;
  if (selected) tile.dataset.selected = "true";
  if (href) {
    tile.href = href;
    tile.setAttribute("href", href);
  }
  if (interactive && !href) {
    tile.tabIndex = disabled ? -1 : 0;
    tile.setAttribute("role", "button");
  }
  if (interactive) tile.setAttribute("aria-label", ariaLabel || `${label ?? "KPI"} ${value ?? "0"}${delta ? `, ${delta}` : ""}`);
  if (selected) tile.setAttribute("aria-pressed", "true");
  if (disabled) tile.setAttribute("aria-disabled", "true");
  tile.addEventListener?.("click", (event) => {
    if (disabled || loading) {
      event.preventDefault?.();
      return;
    }
    if (typeof onSelect === "function") onSelect({ label, value, delta, tone, variant: resolvedVariant });
  });
  tile.addEventListener?.("keydown", (event) => {
    if (!interactive || href || disabled || loading) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault?.();
      tile.click?.();
    }
  });

  const header = document.createElement("header");
  const labelNode = document.createElement("span");
  labelNode.className = "kpi-tile__label";
  labelNode.textContent = label ?? "KPI";
  header.append(labelNode);
  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "kpi-tile__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = icon;
    header.append(iconNode);
  }

  const valueNode = document.createElement("strong");
  valueNode.className = "kpi-tile__value";
  valueNode.textContent = value ?? "0";
  tile.append(header, valueNode);
  if (loading) {
    const loadingNode = document.createElement("span");
    loadingNode.className = "kpi-tile__loading";
    loadingNode.setAttribute("aria-hidden", "true");
    tile.append(loadingNode);
  } else if (delta) {
    const deltaNode = document.createElement("p");
    deltaNode.className = "kpi-tile__delta";
    deltaNode.dataset.trend = trend;
    deltaNode.textContent = delta;
    if (trend) {
      const text = document.createTextNode(delta);
      deltaNode.textContent = "";
      const trendIcon = document.createElement("span");
      trendIcon.className = "kpi-tile__trend-icon";
      trendIcon.setAttribute("aria-hidden", "true");
      trendIcon.textContent = trend === "up" ? "trending_up" : trend === "down" ? "trending_down" : "trending_flat";
      deltaNode.append(trendIcon, text);
    }
    tile.append(deltaNode);
  }
  if (resolvedVariant === "sparkline") {
    const safeValues = (values.length ? values : [24, 32, 28, 44, 38, 52]).map((item) => Number.isFinite(Number(item)) ? Math.max(0, Number(item)) : 0);
    const max = Math.max(...safeValues, 1);
    const width = 112;
    const height = 34;
    const points = safeValues.map((item, index) => {
      const x = safeValues.length === 1 ? width : (index / (safeValues.length - 1)) * width;
      const y = height - (item / max) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
    const svg = document.createElementNS?.("http://www.w3.org/2000/svg", "svg") ?? document.createElement("svg");
    svg.setAttribute("class", "kpi-tile__sparkline");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("aria-hidden", "true");
    const line = document.createElementNS?.("http://www.w3.org/2000/svg", "polyline") ?? document.createElement("polyline");
    line.setAttribute("points", points);
    svg.append(line);
    tile.append(svg);
  }
  if (resolvedVariant === "drill-in") {
    const affordance = document.createElement("span");
    affordance.className = "kpi-tile__affordance";
    affordance.setAttribute("aria-hidden", "true");
    setIconGlyph(affordance, "arrow_forward");
    tile.append(affordance);
  }
  return tile;
}

export function createAuditEvent({
  label,
  description = "",
  meta = "",
  status = "",
  icon = "",
  tone = "neutral",
  state = "default",
  density = "md",
  timestamp = "",
} = {}) {
  const validTones = new Set(["neutral", "info", "success", "warning", "danger", "action"]);
  const validStates = new Set(["default", "hover", "focus", "verified", "warning", "critical", "disabled"]);
  const resolvedState = validStates.has(state) ? state : "default";
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const statusText = status || (resolvedState === "verified" ? "Verified" : resolvedState === "warning" ? "Review" : resolvedState === "critical" ? "Critical" : "");
  const statusTone = resolvedState === "verified"
    ? "success"
    : resolvedState === "warning"
      ? "warning"
      : resolvedState === "critical"
        ? "danger"
        : validTones.has(tone)
          ? tone
          : "neutral";
  const event = document.createElement("article");
  event.className = "audit-event";
  event.dataset.tone = statusTone;
  event.dataset.state = resolvedState;
  event.dataset.density = resolvedDensity;
  if (resolvedState === "disabled") event.setAttribute("aria-disabled", "true");

  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "audit-event__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = icon;
    event.append(iconNode);
  }

  const content = document.createElement("div");
  content.className = "audit-event__content";
  const title = document.createElement("strong");
  title.textContent = label ?? "Audit event";
  content.append(title);
  if (description) {
    const descriptionNode = document.createElement("p");
    descriptionNode.textContent = description;
    content.append(descriptionNode);
  }
  const eventMeta = timestamp || "";
  if (meta || eventMeta || statusText) {
    const metaRow = document.createElement("span");
    metaRow.className = "audit-event__meta";
    if (meta) {
      const metaNode = document.createElement("small");
      metaNode.textContent = meta;
      metaRow.append(metaNode);
    }
    if (eventMeta) {
      const timeNode = document.createElement("time");
      timeNode.className = "audit-event__time";
      timeNode.textContent = eventMeta;
      metaRow.append(timeNode);
    }
    if (statusText) {
      const statusNode = document.createElement("em");
      statusNode.textContent = statusText;
      metaRow.append(statusNode);
    }
    content.append(metaRow);
  }
  event.append(content);
  return event;
}
