import { createButton } from "./actions.js?v=2";
import { createBadge } from "./status.js?v=2";
import { setIconGlyph } from "../primitives/iconography.js?v=1";

function setStyleProperty(node, name, value) {
  if (node?.style?.setProperty) {
    node.style.setProperty(name, value);
    return;
  }
  if (node?.style?.values) {
    node.style.values[name] = value;
    return;
  }
  const next = `${name}: ${value}`;
  node.style = [node?.style, next].filter(Boolean).join("; ");
}

export function createTabs({
  label = "Tabs",
  items = [],
  selectedKey = "",
  variant = "default",
  onValueChange,
} = {}) {
  const tabs = document.createElement("div");
  tabs.className = "tabs";
  tabs.dataset.variant = variant;
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", label);

  const itemKey = (item) => item?.key ?? item?.value ?? item?.label ?? "";
  const selected = selectedKey || itemKey(items.find((item) => item.selected)) || itemKey(items[0]) || "";
  const buttons = [];
  const enabledButtons = () => buttons.filter((button) => !button.disabled);
  const isSelectedTab = (button) => button?.attributes?.["aria-selected"] === "true" || button?.getAttribute?.("aria-selected") === "true";
  const updateIndicator = (button = buttons.find((candidate) => isSelectedTab(candidate))) => {
    if (!button) return;
    tabs.style = `--comp-tabs-indicator-left: ${button.offsetLeft ?? 0}px; --comp-tabs-indicator-width: ${button.offsetWidth ?? 0}px`;
    tabs.dataset.indicatorSynced = "true";
  };
  const selectTab = (button, notify = true) => {
    if (!button || button.disabled) return;
    for (const candidate of buttons) {
      const active = candidate === button;
      candidate.setAttribute("aria-selected", String(active));
      candidate.tabIndex = active ? 0 : -1;
    }
    updateIndicator(button);
    if (notify && typeof onValueChange === "function") onValueChange(button.dataset.key);
  };
  const moveTab = (current, direction) => {
    const enabled = enabledButtons();
    if (!enabled.length) return;
    const currentIndex = Math.max(0, enabled.indexOf(current));
    const next = enabled[(currentIndex + direction + enabled.length) % enabled.length];
    selectTab(next);
    if (typeof next.focus === "function") next.focus();
  };

  for (const item of items) {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "tabs__tab";
    tab.setAttribute("data-tabs-item", "");
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(item.key === selected));
    tab.tabIndex = item.key === selected ? 0 : -1;
    tab.disabled = Boolean(item.disabled);
    tab.dataset.key = item.key ?? item.label ?? "";
    if (item.icon) {
      const iconNode = document.createElement("span");
      iconNode.className = "tabs__icon";
      iconNode.setAttribute("aria-hidden", "true");
      iconNode.textContent = item.icon;
      tab.append(iconNode);
    }
    const labelNode = document.createElement("span");
    labelNode.className = "tabs__label";
    labelNode.textContent = item.label ?? item.key ?? "Tab";
    tab.append(labelNode);
    const badge = item.badge ?? (item.count != null ? { label: String(item.count), variant: "count", tone: "neutral" } : null);
    if (badge) {
      tab.append(createBadge({
        label: badge.label ?? String(badge.count ?? ""),
        tone: badge.tone ?? "neutral",
        variant: badge.variant ?? "count",
        ariaLabel: badge.ariaLabel ?? "",
      }));
    }
    tab.addEventListener?.("click", () => selectTab(tab));
    tab.addEventListener?.("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault?.();
        moveTab(tab, 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault?.();
        moveTab(tab, -1);
      } else if (event.key === "Home") {
        event.preventDefault?.();
        const first = enabledButtons()[0];
        selectTab(first);
        first?.focus?.();
      } else if (event.key === "End") {
        event.preventDefault?.();
        const enabled = enabledButtons();
        const last = enabled[enabled.length - 1];
        selectTab(last);
        last?.focus?.();
      }
    });
    buttons.push(tab);
    tabs.append(tab);
  }
  updateIndicator(buttons.find((button) => isSelectedTab(button)) ?? buttons[0]);
  globalThis.ResizeObserver && new globalThis.ResizeObserver(() => updateIndicator()).observe(tabs);
  globalThis.window?.addEventListener?.("resize", () => updateIndicator());
  return tabs;
}

export function createAccordion({
  items = [],
  multiple = false,
  density = "md",
  onExpandedChange,
} = {}) {
  const accordion = document.createElement("div");
  accordion.className = "accordion";
  accordion.dataset.multiple = String(Boolean(multiple));
  accordion.dataset.density = density;
  const sections = [];
  const expandedIds = () => sections
    .filter(({ section }) => section.dataset.open === "true")
    .map(({ panel }) => panel.id);
  const setOpen = (entry, open, notify = true) => {
    if (!entry) return;
    if (open && !multiple) {
      for (const candidate of sections) {
        if (candidate !== entry) setOpen(candidate, false, false);
      }
    }
    entry.section.dataset.open = String(Boolean(open));
    entry.trigger.setAttribute("aria-expanded", String(Boolean(open)));
    entry.panel.hidden = !open;
    if (notify && typeof onExpandedChange === "function") onExpandedChange(expandedIds());
  };

  for (const [index, item] of items.entries()) {
    const open = Boolean(item.open);
    const panelId = item.id || `accordion-panel-${index}`;
    const controlId = `${panelId}-trigger`;

    const section = document.createElement("section");
    section.className = "accordion__item";
    section.setAttribute("data-accordion-item", "");
    section.dataset.open = String(open);

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "accordion__trigger";
    trigger.setAttribute("data-accordion-trigger", "");
    trigger.id = controlId;
    trigger.setAttribute("aria-expanded", String(open));
    trigger.setAttribute("aria-controls", panelId);
    trigger.disabled = Boolean(item.disabled);
    if (item.icon) {
      const iconNode = document.createElement("span");
      iconNode.className = "accordion__icon";
      iconNode.setAttribute("aria-hidden", "true");
      iconNode.textContent = item.icon;
      trigger.append(iconNode);
    }
    const titleNode = document.createElement("span");
    titleNode.className = "accordion__title";
    titleNode.textContent = item.title ?? item.label ?? `Section ${index + 1}`;
    trigger.append(titleNode);
    if (item.meta) {
      const metaNode = document.createElement("span");
      metaNode.className = "accordion__meta";
      metaNode.textContent = item.meta;
      trigger.append(metaNode);
    }
    const chevron = document.createElement("span");
    chevron.className = "accordion__chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "expand_more";
    trigger.append(chevron);

    const panel = document.createElement("div");
    panel.className = "accordion__panel";
    panel.setAttribute("data-accordion-panel", "");
    panel.id = panelId;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", controlId);
    panel.hidden = !open;
    const panelClip = document.createElement("div");
    panelClip.className = "accordion__panel-clip";
    const panelBody = document.createElement("div");
    panelBody.className = "accordion__panel-body";
    if (typeof item.content === "object" && item.content?.nodeType) {
      panelBody.append(item.content);
    } else {
      panelBody.textContent = item.content ?? item.description ?? "";
    }
    panelClip.append(panelBody);
    panel.append(panelClip);

    const entry = { section, trigger, panel };
    trigger.addEventListener?.("click", () => setOpen(entry, section.dataset.open !== "true"));
    sections.push(entry);
    section.append(trigger, panel);
    accordion.append(section);
  }
  return accordion;
}

export function createSlider({
  label,
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  variant = "continuous",
  state = "default",
  density = "md",
  unit = "",
  disabled = false,
  name = "",
  valueLabel = "",
  onValueChange,
  formatValue,
} = {}) {
  const allowedVariants = new Set(["continuous", "stepped", "bounded", "threshold", "paired-value"]);
  const allowedStates = new Set(["default", "focus", "dragging", "disabled", "error", "complete"]);
  const normalizedVariant = allowedVariants.has(variant) ? variant : "continuous";
  const normalizedState = disabled ? "disabled" : allowedStates.has(state) ? state : "default";
  const field = document.createElement("label");
  field.className = "slider";
  field.dataset.variant = normalizedVariant;
  field.dataset.state = normalizedState;
  field.dataset.density = density;
  field.dataset.value = String(value);
  field.dataset.unit = unit;
  const valueText = (nextValue) => {
    if (typeof formatValue === "function") return formatValue(Number(nextValue));
    return valueLabel && String(nextValue) === String(value) ? valueLabel : `${nextValue}${unit}`;
  };
  const initialValueText = valueText(value);
  const valueFormatParts = String(initialValueText).match(/^([^0-9.-]*)([0-9.,]+)(.*)$/);
  if (valueFormatParts) {
    const [, prefix, numeric, suffix] = valueFormatParts;
    const numericValue = Number(numeric.replace(/,/g, ""));
    field.dataset.valuePrefix = prefix;
    field.dataset.valueSuffix = unit || suffix;
    field.dataset.valueMultiplier = Number.isFinite(numericValue) && Number(value) !== 0 ? String(numericValue / Number(value)) : "1";
  }
  const percentFor = (nextValue) => {
    const range = Number(max) - Number(min);
    if (!range) return 0;
    return Math.max(0, Math.min(100, ((Number(nextValue) - Number(min)) / range) * 100));
  };
  const setSliderValue = (nextValue) => {
    field.dataset.pct = String(Math.round(percentFor(nextValue)));
  };

  const meta = document.createElement("span");
  meta.className = "slider__meta";
  const labelNode = document.createElement("span");
  labelNode.className = "slider__label";
  labelNode.textContent = label ?? "Slider";
  const output = document.createElement("output");
  output.className = "slider__value";
  output.setAttribute("data-slider-output", "");
  output.textContent = initialValueText;
  meta.append(labelNode, output);

  const input = document.createElement("input");
  input.type = "range";
  input.className = "slider__input";
  input.setAttribute("data-slider-input", "");
  input.setAttribute("aria-label", label ?? "Slider");
  input.name = name;
  input.value = value;
  input.min = min;
  input.max = max;
  input.step = step;
  input.disabled = disabled || normalizedState === "disabled";
  input.setAttribute("aria-valuetext", valueText(value));
  if (normalizedState === "error") input.setAttribute("aria-invalid", "true");
  input.addEventListener?.("input", () => {
    field.dataset.value = String(input.value);
    setSliderValue(input.value);
    output.textContent = valueText(input.value);
    input.setAttribute("aria-valuetext", valueText(input.value));
    if (typeof onValueChange === "function") onValueChange(Number(input.value));
  });
  input.addEventListener?.("pointerdown", () => {
    field.dataset.dragging = "true";
    if (!["disabled", "error"].includes(field.dataset.state)) field.dataset.state = "dragging";
  });
  input.addEventListener?.("pointerup", () => {
    field.dataset.dragging = "false";
    if (field.dataset.state === "dragging") field.dataset.state = "default";
  });
  input.addEventListener?.("focus", () => {
    if (!["disabled", "error", "dragging"].includes(field.dataset.state)) field.dataset.state = "focus";
  });
  input.addEventListener?.("blur", () => {
    field.dataset.dragging = "false";
    if (field.dataset.state === "focus" || field.dataset.state === "dragging") field.dataset.state = "default";
  });
  const control = document.createElement("span");
  control.className = "slider__control";
  const track = document.createElement("span");
  track.className = "slider__track";
  track.setAttribute("aria-hidden", "true");
  const fill = document.createElement("span");
  fill.className = "slider__fill";
  fill.setAttribute("aria-hidden", "true");
  const thumb = document.createElement("span");
  thumb.className = "slider__thumb";
  thumb.setAttribute("aria-hidden", "true");
  control.append(input, track, fill, thumb);
  setSliderValue(value);

  field.append(meta, control);
  return field;
}

export function createTreeView({
  label = "Tree view",
  nodes = [],
  state = "expanded",
  density = "md",
  onSelect,
  onExpandedChange,
} = {}) {
  const tree = document.createElement("ul");
  tree.className = "tree-view";
  tree.dataset.state = state;
  tree.dataset.density = density;
  tree.setAttribute("role", "tree");
  tree.setAttribute("aria-label", label);
  const entries = [];
  const visibleEntries = () => entries.filter(({ item }) => !item.hidden);
  const expandedKeys = () => entries
    .filter(({ item }) => item.getAttribute("aria-expanded") === "true")
    .map(({ key }) => key);
  const updateNestedVisibility = () => {
    const collapsedLevels = [];
    for (const entry of entries) {
      const level = Number(entry.item.getAttribute("aria-level") ?? 1);
      while (collapsedLevels.length && collapsedLevels[collapsedLevels.length - 1] >= level) collapsedLevels.pop();
      entry.item.hidden = collapsedLevels.length > 0;
      if (entry.item.getAttribute("aria-expanded") === "false") collapsedLevels.push(level);
    }
  };
  const setActive = (entry) => {
    if (!entry || entry.control.disabled || entry.item.hidden) return;
    for (const candidate of entries) candidate.control.tabIndex = candidate === entry ? 0 : -1;
    entry.control.focus?.();
  };
  const selectEntry = (entry) => {
    if (!entry || entry.control.disabled) return;
    for (const candidate of entries) {
      const active = candidate === entry;
      candidate.item.setAttribute("aria-selected", String(active));
      candidate.control.setAttribute("aria-selected", String(active));
    }
    setActive(entry);
    if (typeof onSelect === "function") onSelect(entry.key);
  };
  const setExpanded = (entry, expanded) => {
    if (!entry || !entry.item.hasAttribute("aria-expanded")) return;
    entry.item.setAttribute("aria-expanded", String(Boolean(expanded)));
    entry.control.setAttribute("aria-expanded", String(Boolean(expanded)));
    const disclosure = entry.control.querySelector?.(".button__icon--trailing");
    if (disclosure) setIconGlyph(disclosure, "expand_more");
    updateNestedVisibility();
    if (typeof onExpandedChange === "function") onExpandedChange(expandedKeys());
  };
  const moveActive = (entry, direction) => {
    const visible = visibleEntries();
    const index = Math.max(0, visible.indexOf(entry));
    setActive(visible[Math.max(0, Math.min(visible.length - 1, index + direction))]);
  };
  for (const [index, node] of nodes.entries()) {
    const item = document.createElement("li");
    const key = node.key ?? node.id ?? node.label ?? `tree-item-${index}`;
    item.className = "tree-view__item";
    item.setAttribute("data-tree-item", "");
    item.dataset.key = String(key);
    const level = Math.max(1, Math.min(5, Number(node.level ?? 1)));
    const expandable = node.expanded != null;
    item.dataset.level = String(level);
    if (item.style?.setProperty) item.style.setProperty("--tree-view-depth-offset", String(level - 1));
    else item.style = `--tree-view-depth-offset: ${level - 1}`;
    item.setAttribute("role", "none");
    item.setAttribute("aria-level", String(level));
    if (expandable) item.setAttribute("aria-expanded", String(Boolean(node.expanded)));
    item.setAttribute("aria-selected", String(Boolean(node.selected)));
    const control = createButton({
      label: node.label ?? "Tree item",
      variant: "secondary",
      disabled: node.disabled,
      icon: expandable ? node.icon ?? "folder" : node.icon ?? "",
      trailingIcon: expandable ? "expand_more" : "",
      density,
    });
    control.className = `${control.className} tree-view__control`;
    control.setAttribute("data-tree-control", "");
    control.setAttribute("role", "treeitem");
    control.setAttribute("aria-level", String(level));
    if (expandable) control.setAttribute("aria-expanded", String(Boolean(node.expanded)));
    control.setAttribute("aria-selected", String(Boolean(node.selected)));
    control.tabIndex = node.selected ? 0 : -1;
    const entry = { item, control, key };
    control.addEventListener?.("click", () => {
      selectEntry(entry);
      if (item.hasAttribute("aria-expanded")) setExpanded(entry, item.getAttribute("aria-expanded") !== "true");
    });
    control.addEventListener?.("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault?.();
        moveActive(entry, 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault?.();
        moveActive(entry, -1);
      } else if (event.key === "Home") {
        event.preventDefault?.();
        setActive(visibleEntries()[0]);
      } else if (event.key === "End") {
        event.preventDefault?.();
        const visible = visibleEntries();
        setActive(visible[visible.length - 1]);
      } else if (event.key === "ArrowRight") {
        event.preventDefault?.();
        setExpanded(entry, true);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault?.();
        setExpanded(entry, false);
      }
    });
    entries.push(entry);
    item.append(control);
    tree.append(item);
  }
  updateNestedVisibility();
  if (!entries.some((entry) => entry.control.tabIndex === 0) && entries[0]) entries[0].control.tabIndex = 0;
  return tree;
}

export function createSegmentedControl({
  label = "Options",
  items = [],
  selectedKey = "",
  onValueChange,
  density = "md",
  variant = "outlined",
} = {}) {
  const control = document.createElement("div");
  control.className = "segmented-control";
  control.dataset.variant = variant;
  control.dataset.density = density;
  control.setAttribute("role", "tablist");
  control.setAttribute("aria-label", label);
  const itemKey = (item) => item?.key ?? item?.value ?? item?.label ?? "";
  const selected = selectedKey || itemKey(items.find((item) => item.selected)) || itemKey(items[0]) || "";
  const indicator = document.createElement("span");
  indicator.className = "segmented-control__indicator";
  indicator.setAttribute("aria-hidden", "true");
  setStyleProperty(indicator, "--segmented-control-index", "0");
  setStyleProperty(indicator, "--segmented-control-count", String(Math.max(items.length, 1)));
  setStyleProperty(control, "--segmented-control-count", String(Math.max(items.length, 1)));
  control.append(indicator);
  const buttons = [];
  const syncIndicator = (button) => {
    const index = Math.max(0, buttons.indexOf(button));
    setStyleProperty(indicator, "--segmented-control-index", String(index));
    setStyleProperty(indicator, "--segmented-control-count", String(Math.max(buttons.length, 1)));
    setStyleProperty(control, "--segmented-control-count", String(Math.max(buttons.length, 1)));
  };
  const enabledButtons = () => buttons.filter((button) => !button.disabled);
  const selectItem = (button, notify = true) => {
    if (!button || button.disabled) return;
    for (const candidate of buttons) {
      const active = candidate === button;
      candidate.setAttribute("aria-selected", String(active));
      candidate.tabIndex = active ? 0 : -1;
    }
    syncIndicator(button);
    if (notify && typeof onValueChange === "function") onValueChange(button.dataset.key);
  };
  const moveItem = (current, direction) => {
    const enabled = enabledButtons();
    if (!enabled.length) return;
    const currentIndex = Math.max(0, enabled.indexOf(current));
    const next = enabled[(currentIndex + direction + enabled.length) % enabled.length];
    selectItem(next);
    next?.focus?.();
  };
  for (const item of items) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "segmented-control__item";
    button.setAttribute("data-segmented-control-item", "");
    button.setAttribute("role", "tab");
    const key = itemKey(item);
    button.setAttribute("aria-selected", String(key === selected));
    button.tabIndex = key === selected ? 0 : -1;
    button.disabled = Boolean(item.disabled);
    button.dataset.key = key;
    const isIconOnly = variant === "icon-only" && Boolean(item.icon);
    if (isIconOnly) {
      button.dataset.iconOnly = "true";
      button.setAttribute("aria-label", item.label ?? key ?? "Option");
    }
    if (item.icon) {
      const iconNode = document.createElement("span");
      iconNode.className = "segmented-control__icon";
      iconNode.setAttribute("aria-hidden", "true");
      iconNode.textContent = item.icon;
      button.append(iconNode);
    }
    const labelNode = document.createElement("span");
    labelNode.className = "segmented-control__label";
    if (isIconOnly) labelNode.setAttribute("aria-hidden", "true");
    labelNode.textContent = item.label ?? key ?? "Option";
    button.append(labelNode);
    button.addEventListener?.("click", () => selectItem(button));
    button.addEventListener?.("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault?.();
        moveItem(button, 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault?.();
        moveItem(button, -1);
      } else if (event.key === "Home") {
        event.preventDefault?.();
        const first = enabledButtons()[0];
        selectItem(first);
        first?.focus?.();
      } else if (event.key === "End") {
        event.preventDefault?.();
        const enabled = enabledButtons();
        const last = enabled[enabled.length - 1];
        selectItem(last);
        last?.focus?.();
      }
    });
    buttons.push(button);
    control.append(button);
  }
  syncIndicator(buttons.find((button) => button.dataset.key === selected) ?? buttons[0]);
  return control;
}
