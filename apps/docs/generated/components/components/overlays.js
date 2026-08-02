import { createButton, createIconButton } from "./actions.js?v=2";
import { createAvatar } from "./display.js?v=3";
import { createProgressIndicator } from "./feedback.js?v=8";
import { createInput } from "./fields.js?v=18";
import { createBadge } from "./status.js?v=2";

function focusNode(node) {
  if (typeof node?.focus === "function") node.focus();
}

function attachOutsideClose(root, onClose) {
  globalThis.document?.addEventListener?.("pointerdown", (event) => {
    if (typeof root.contains === "function" && root.contains(event.target)) return;
    onClose();
  });
}

function focusableNodes(root) {
  const result = [];
  const visit = (node) => {
    if (!node || node.hidden) return;
    const tag = String(node.tagName ?? "").toLowerCase();
    const naturallyFocusable = ["button", "input", "select", "textarea"].includes(tag) || Boolean(node.href);
    if (!node.disabled && (naturallyFocusable || node.tabIndex >= 0)) result.push(node);
    for (const child of Array.from(node.children ?? [])) visit(child);
  };
  visit(root);
  return result;
}

function nodesWithAttribute(root, attribute) {
  const result = [];
  const visit = (node) => {
    if (!node) return;
    if (node.attributes?.[attribute] != null) result.push(node);
    for (const child of Array.from(node.children ?? [])) visit(child);
  };
  visit(root);
  return result;
}

function attachOverlayShell({
  root,
  trigger,
  surface,
  panel,
  open,
  initialFocus,
  stateOnOpen,
  stateOnClose,
  onOpenChange,
}) {
  const setOpen = (nextOpen, restoreFocus = false) => {
    root.dataset.open = String(Boolean(nextOpen));
    if (stateOnOpen || stateOnClose) root.dataset.state = nextOpen ? (stateOnOpen ?? "open") : (stateOnClose ?? "closed");
    trigger.setAttribute("aria-expanded", String(Boolean(nextOpen)));
    surface.hidden = !nextOpen;
    if (nextOpen) {
      focusNode(initialFocus ?? focusableNodes(panel)[0] ?? panel);
    } else if (restoreFocus) {
      focusNode(trigger);
    }
    if (typeof onOpenChange === "function") onOpenChange(Boolean(nextOpen));
  };
  trigger.addEventListener?.("click", () => setOpen(surface.hidden));
  surface.addEventListener?.("click", (event) => {
    if (event.target === surface) setOpen(false, true);
  });
  root.addEventListener?.("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault?.();
      setOpen(false, true);
      return;
    }
    if (event.key !== "Tab" || surface.hidden) return;
    const focusables = focusableNodes(panel);
    if (!focusables.length) return;
    const current = globalThis.document?.activeElement;
    const currentIndex = focusables.indexOf(current);
    let nextIndex = currentIndex;
    if (event.shiftKey) {
      nextIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
    } else {
      nextIndex = currentIndex >= focusables.length - 1 ? 0 : currentIndex + 1;
    }
    event.preventDefault?.();
    focusNode(focusables[nextIndex]);
  });
  for (const control of nodesWithAttribute(panel, "data-overlay-close")) {
    control.addEventListener?.("click", () => setOpen(false, true));
  }
  if (open) focusNode(initialFocus ?? focusableNodes(panel)[0] ?? panel);
  return setOpen;
}

export function createTooltip({
  triggerLabel,
  content,
  id = "",
  placement = "top",
  variant = "default",
  density = "md",
  state = "default",
  disabled = false,
  onOpenChange,
} = {}) {
  const resolvedPlacement = ["top", "right", "bottom", "left"].includes(placement) ? placement : "top";
  const resolvedVariant = ["default", "icon-help", "metric", "disabled-help"].includes(variant) ? variant : "default";
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const resolvedState = disabled ? "disabled" : ["default", "hover", "focus", "open", "disabled", "dismissed"].includes(state) ? state : "default";
  const tooltip = document.createElement("span");
  tooltip.className = "tooltip";
  tooltip.dataset.placement = resolvedPlacement;
  tooltip.dataset.variant = resolvedVariant;
  tooltip.dataset.density = resolvedDensity;
  tooltip.dataset.state = resolvedState;

  const tooltipId = id || `tooltip-${String(triggerLabel ?? "info").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "tooltip__trigger";
  trigger.setAttribute("data-tooltip-trigger", "");
  trigger.textContent = triggerLabel ?? "Info";
  if (resolvedState === "disabled") {
    trigger.disabled = true;
    trigger.setAttribute("aria-disabled", "true");
  }

  const bubble = document.createElement("span");
  bubble.className = "tooltip__bubble";
  bubble.setAttribute("data-tooltip-bubble", "");
  bubble.id = tooltipId;
  bubble.setAttribute("role", "tooltip");
  bubble.textContent = content ?? "Tooltip";

  const setOpen = (open) => {
    const nextOpen = Boolean(open) && tooltip.dataset.state !== "dismissed";
    tooltip.dataset.open = String(nextOpen);
    bubble.hidden = !nextOpen;
    bubble.setAttribute("aria-hidden", String(!nextOpen));
    if (nextOpen) trigger.setAttribute("aria-describedby", tooltipId);
    else if (typeof trigger.removeAttribute === "function") trigger.removeAttribute("aria-describedby");
    else delete trigger.attributes["aria-describedby"];
    if (typeof onOpenChange === "function") onOpenChange(Boolean(open));
  };
  const initiallyOpen = ["hover", "focus", "open", "disabled"].includes(resolvedState);
  setOpen(initiallyOpen);
  trigger.addEventListener?.("mouseenter", () => {
    if (tooltip.dataset.state === "disabled") return;
    tooltip.dataset.state = "hover";
    setOpen(true);
  });
  trigger.addEventListener?.("mouseleave", () => {
    if (tooltip.dataset.state === "disabled") return;
    tooltip.dataset.state = "default";
    setOpen(false);
  });
  trigger.addEventListener?.("focus", () => {
    if (tooltip.dataset.state === "disabled") return;
    tooltip.dataset.state = "focus";
    setOpen(true);
  });
  trigger.addEventListener?.("blur", () => {
    if (tooltip.dataset.state === "disabled") return;
    tooltip.dataset.state = "default";
    setOpen(false);
  });
  trigger.addEventListener?.("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault?.();
    tooltip.dataset.state = "dismissed";
    setOpen(false);
  });

  tooltip.append(trigger, bubble);
  return tooltip;
}

export function createToast({
  label,
  description = "",
  tone = "neutral",
  variant = "status",
  state = "visible",
  density = "md",
  icon = "",
  actionLabel = "",
  dismissible = false,
  onAction,
  onDismiss,
} = {}) {
  const resolvedTone = ["neutral", "info", "success", "warning", "danger"].includes(tone) ? tone : "neutral";
  const resolvedVariant = ["status", "progress", "warning", "recovery", "undo"].includes(variant) ? variant : "status";
  const resolvedState = ["default", "visible", "action", "stacked", "exiting"].includes(state) ? state : "visible";
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const toneIcon = {
    neutral: "info",
    info: "info",
    success: "check_circle",
    warning: "warning",
    danger: "error",
  };
  const toast = document.createElement("article");
  toast.className = "toast";
  toast.dataset.tone = resolvedTone;
  toast.dataset.variant = resolvedVariant;
  toast.dataset.state = resolvedState;
  toast.dataset.density = resolvedDensity;
  if (resolvedState === "default") toast.hidden = true;
  const role = resolvedTone === "danger" || resolvedTone === "warning" ? "alert" : "status";
  toast.setAttribute("role", role);
  toast.setAttribute("aria-live", role === "alert" ? "assertive" : "polite");

  const iconNode = document.createElement("span");
  iconNode.className = "toast__icon";
  iconNode.setAttribute("aria-hidden", "true");
  iconNode.textContent = icon || toneIcon[resolvedTone];
  toast.append(iconNode);

  const content = document.createElement("div");
  content.className = "toast__content";
  const title = document.createElement("strong");
  title.textContent = label ?? "Toast";
  content.append(title);
  if (description) {
    const descriptionNode = document.createElement("p");
    descriptionNode.textContent = description;
    content.append(descriptionNode);
  }
  toast.append(content);

  if (actionLabel) {
    const action = createButton({ label: actionLabel, variant: "ghost", density: "sm" });
    action.className = `toast__action ${action.className}`;
    action.setAttribute("data-toast-action", "");
    action.addEventListener?.("click", () => {
      if (typeof onAction === "function") onAction();
    });
    toast.append(action);
  }
  if (dismissible) {
    const dismiss = createIconButton({ label: "Dismiss notification", icon: "close" });
    dismiss.className = `${dismiss.className} toast__dismiss`;
    dismiss.setAttribute("data-toast-dismiss", "");
    dismiss.addEventListener?.("click", () => {
      toast.hidden = true;
      if (typeof onDismiss === "function") onDismiss();
    });
    toast.append(dismiss);
  }
  return toast;
}

export function createDialog({
  label,
  description = "",
  triggerLabel = "Open dialog",
  actions = [],
  open,
  tone = "neutral",
  variant = "confirmation",
  state = "open",
  density = "md",
  icon = "",
  fields = [],
  id = "",
  onOpenChange,
  onAction,
} = {}) {
  const resolvedVariant = ["confirmation", "destructive", "form", "review", "success"].includes(variant) ? variant : "confirmation";
  const resolvedTone = ["neutral", "info", "success", "danger"].includes(tone) ? tone : resolvedVariant === "success" ? "success" : resolvedVariant === "destructive" ? "danger" : "neutral";
  const resolvedState = ["open", "focus", "closing", "default", "closed"].includes(state) ? state : "open";
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const shouldOpen = open ?? ["open", "focus", "closing"].includes(resolvedState);
  const renderedState = shouldOpen ? resolvedState : (resolvedState === "default" ? "default" : "closed");
  const toneIcon = {
    danger: "warning",
    info: "info",
    success: "check_circle",
    neutral: "",
  };
  const root = document.createElement("div");
  root.className = ["dialog", `dialog--${resolvedTone}`].join(" ");
  root.dataset.open = String(Boolean(shouldOpen));
  root.dataset.variant = resolvedVariant;
  root.dataset.state = renderedState;
  root.dataset.tone = resolvedTone;
  root.dataset.density = resolvedDensity;
  const dialogId = id || `dialog-${String(label ?? "dialog").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  const titleId = `${dialogId}-title`;
  const trigger = createButton({ label: triggerLabel, variant: "secondary", density: resolvedDensity });
  trigger.className = `${trigger.className} dialog__trigger`;
  trigger.setAttribute("data-overlay-open", "");
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", String(Boolean(shouldOpen)));
  trigger.setAttribute("aria-controls", dialogId);
  const overlay = document.createElement("div");
  overlay.className = "dialog__overlay";
  overlay.setAttribute("data-overlay-dismiss", "");
  overlay.hidden = !shouldOpen;
  const panel = document.createElement("section");
  panel.className = "dialog__panel";
  panel.id = dialogId;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-labelledby", titleId);
  const close = createIconButton({ label: "Close dialog", icon: "close", density: resolvedDensity });
  close.className = `${close.className} dialog__close`;
  close.setAttribute("data-overlay-close", "");
  const header = document.createElement("header");
  header.className = "dialog__header";
  const resolvedIcon = icon || toneIcon[resolvedTone];
  if (resolvedIcon) {
    const iconNode = document.createElement("span");
    iconNode.className = "dialog__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = resolvedIcon;
    header.append(iconNode);
  }
  const content = document.createElement("div");
  content.className = "dialog__content";
  const title = document.createElement("h3");
  title.id = titleId;
  title.textContent = label ?? "Dialog";
  content.append(title);
  if (description) {
    const copy = document.createElement("p");
    copy.textContent = description;
    content.append(copy);
  }
  header.append(content, close);
  panel.append(header);
  if (fields.length) {
    const body = document.createElement("div");
    body.className = "dialog__body";
    for (const field of fields) {
      body.append(createInput({
        label: field.label,
        value: field.value ?? "",
        placeholder: field.placeholder ?? "",
        helper: field.helper ?? "",
        error: field.error ?? "",
        density: field.density ?? resolvedDensity,
        disabled: field.disabled,
        invalid: field.invalid,
      }));
    }
    panel.append(body);
  }
  if (actions.length) {
    const footer = document.createElement("footer");
    actions.forEach((action, index) => {
      const needsDangerIntent = action.intent == null && (resolvedTone === "danger" || resolvedVariant === "destructive") && index === 0;
      const actionVariant = action.variant === "danger" ? "primary" : action.variant ?? (index === 0 ? "primary" : "secondary");
      const actionIntent = action.variant === "danger" ? "danger" : needsDangerIntent ? "danger" : action.intent;
      const actionNode = createButton({
        ...action,
        variant: actionVariant,
        intent: actionIntent,
        density: action.density ?? resolvedDensity,
      });
      actionNode.setAttribute("data-overlay-close", "");
      actionNode.dataset.key = action.key ?? action.label ?? "";
      actionNode.addEventListener?.("click", () => {
        if (typeof onAction === "function") onAction(actionNode.dataset.key);
      });
      footer.append(actionNode);
    });
    panel.append(footer);
  }
  overlay.append(panel);
  root.append(trigger, overlay);
  attachOverlayShell({
    root,
    trigger,
    surface: overlay,
    panel,
    open: shouldOpen,
    initialFocus: close,
    stateOnOpen: ["closed", "default"].includes(resolvedState) ? "open" : resolvedState,
    stateOnClose: resolvedState === "default" ? "default" : "closed",
    onOpenChange,
  });
  return root;
}

export function createMenu({
  triggerLabel = "Actions",
  items = [],
  open = false,
  label = "Menu",
  variant = "actions",
  avatarName = "",
  avatarStatus = "none",
  avatarSize = "md",
  density = "md",
  state = "default",
  align = "start",
  disabled = false,
  onOpenChange,
  onSelect,
} = {}) {
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const root = document.createElement("span");
  root.className = "menu";
  root.dataset.variant = variant;
  root.dataset.density = resolvedDensity;
  root.dataset.state = disabled || state === "disabled" ? "disabled" : state || "default";
  root.dataset.align = align === "end" || align === "right" ? "end" : "start";
  root.dataset.open = String(Boolean(open));
  const menuId = `menu-${String(label).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  const trigger = variant === "icon-trigger"
    ? createIconButton({ ariaLabel: label, icon: "more_horiz", variant: "ghost", density: resolvedDensity, disabled })
    : variant === "avatar-trigger"
      ? createAvatarMenuTrigger({ label, name: avatarName || triggerLabel, status: avatarStatus, size: avatarSize, disabled })
    : createButton({ label: triggerLabel, variant: "secondary", density: resolvedDensity, trailingIcon: "expand_more", disabled });
  trigger.className = `${trigger.className} menu__trigger`;
  trigger.setAttribute("data-menu-trigger", "");
  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", String(Boolean(open)));
  trigger.setAttribute("aria-controls", menuId);
  const panel = document.createElement("div");
  panel.className = "menu__panel";
  panel.setAttribute("data-menu-panel", "");
  panel.id = menuId;
  panel.hidden = !open;
  panel.setAttribute("role", "menu");
  panel.setAttribute("aria-label", label);
  const actions = [];
  const enabledActions = () => actions.filter((action) => !action.disabled);
  const setOpen = (nextOpen, restoreFocus = false) => {
    if (disabled) return;
    root.dataset.open = String(Boolean(nextOpen));
    root.dataset.state = nextOpen ? "open" : "closed";
    trigger.setAttribute("aria-expanded", String(Boolean(nextOpen)));
    panel.hidden = !nextOpen;
    if (restoreFocus) focusNode(trigger);
    if (typeof onOpenChange === "function") onOpenChange(Boolean(nextOpen));
  };
  const focusAction = (action) => focusNode(action);
  const moveAction = (current, direction) => {
    const enabled = enabledActions();
    if (!enabled.length) return;
    const currentIndex = Math.max(0, enabled.indexOf(current));
    focusAction(enabled[(currentIndex + direction + enabled.length) % enabled.length]);
  };
  trigger.addEventListener?.("click", () => {
    const nextOpen = panel.hidden;
    setOpen(nextOpen);
    if (nextOpen) focusAction(enabledActions()[0]);
  });
  trigger.addEventListener?.("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault?.();
      setOpen(true);
      focusAction(enabledActions()[0]);
    } else if (event.key === "Escape") {
      event.preventDefault?.();
      setOpen(false, true);
    }
  });
  panel.addEventListener?.("keydown", (event) => {
    const current = event.target;
    if (event.key === "ArrowDown") {
      event.preventDefault?.();
      moveAction(current, 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault?.();
      moveAction(current, -1);
    } else if (event.key === "Home") {
      event.preventDefault?.();
      focusAction(enabledActions()[0]);
    } else if (event.key === "End") {
      event.preventDefault?.();
      const enabled = enabledActions();
      focusAction(enabled[enabled.length - 1]);
    } else if (event.key === "Escape") {
      event.preventDefault?.();
      setOpen(false, true);
    }
  });
  for (const item of items) {
    if (item === "divider" || item?.separator) {
      const separator = document.createElement("span");
      separator.className = "menu__separator";
      separator.setAttribute("role", "separator");
      panel.append(separator);
      continue;
    }
    const action = document.createElement("button");
    action.type = "button";
    action.className = "menu__item";
    action.disabled = Boolean(item.disabled);
    action.setAttribute("role", "menuitem");
    action.tabIndex = -1;
    action.dataset.key = item.key ?? item.label ?? "";
    if (item.tone) action.dataset.tone = item.tone;
    if (item.disabled) action.setAttribute("aria-disabled", "true");
    if (item.icon) {
      const icon = document.createElement("span");
      icon.className = "menu__item-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = item.icon;
      action.append(icon);
    }
    const actionLabel = document.createElement("span");
    actionLabel.className = "menu__item-label";
    actionLabel.textContent = item.label ?? "";
    action.append(actionLabel);
    if (item.shortcut) {
      const shortcut = document.createElement("kbd");
      shortcut.className = "menu__item-shortcut";
      shortcut.textContent = item.shortcut;
      action.append(shortcut);
    }
    action.addEventListener?.("click", () => {
      if (action.disabled) return;
      if (typeof onSelect === "function") onSelect(item);
      setOpen(false, true);
    });
    action.addEventListener?.("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault?.();
        moveAction(action, 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault?.();
        moveAction(action, -1);
      } else if (event.key === "Home") {
        event.preventDefault?.();
        focusAction(enabledActions()[0]);
      } else if (event.key === "End") {
        event.preventDefault?.();
        const enabled = enabledActions();
        focusAction(enabled[enabled.length - 1]);
      } else if (event.key === "Escape") {
        event.preventDefault?.();
        setOpen(false, true);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault?.();
        action.click?.();
      }
    });
    actions.push(action);
    panel.append(action);
  }
  attachOutsideClose(root, () => {
    if (!panel.hidden) setOpen(false);
  });
  root.append(trigger, panel);
  return root;
}

function createAvatarMenuTrigger({ label, name, status, size, disabled }) {
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "menu__trigger--avatar";
  trigger.disabled = Boolean(disabled);
  trigger.setAttribute("aria-label", label || "Account menu");
  trigger.append(createAvatar({ name, status, size }));
  return trigger;
}

export function createDrawer({
  label,
  description = "",
  triggerLabel = "Open drawer",
  variant = "side-sheet",
  state = "closed",
  tone = "neutral",
  density = "md",
  side = "right",
  fields = [],
  content = [],
  actions = [],
  open,
  id = "",
  onOpenChange,
  onAction,
} = {}) {
  const resolvedState = state ?? "closed";
  const shouldOpen = open ?? ["open", "focus", "closing"].includes(resolvedState);
  const renderedState = shouldOpen ? resolvedState : (resolvedState === "default" ? "default" : "closed");
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const resolvedTone = ["neutral", "info", "danger"].includes(tone) ? tone : "neutral";
  const root = document.createElement("div");
  root.className = `drawer drawer--${resolvedTone}`;
  root.dataset.variant = variant;
  root.dataset.state = renderedState;
  root.dataset.tone = resolvedTone;
  root.dataset.density = resolvedDensity;
  root.dataset.open = String(Boolean(shouldOpen));
  root.dataset.side = side;
  const drawerId = id || `drawer-${String(label ?? "drawer").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  const titleId = `${drawerId}-title`;
  const trigger = createButton({ label: triggerLabel, variant: "secondary", density: resolvedDensity });
  trigger.className = `${trigger.className} drawer__trigger`;
  trigger.setAttribute("data-overlay-open", "");
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", String(Boolean(shouldOpen)));
  trigger.setAttribute("aria-controls", drawerId);
  const overlay = document.createElement("div");
  overlay.className = "drawer__overlay";
  overlay.setAttribute("data-overlay-dismiss", "");
  overlay.hidden = !shouldOpen;
  const panel = document.createElement("aside");
  panel.className = "drawer__panel";
  panel.id = drawerId;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-labelledby", titleId);
  const header = document.createElement("header");
  const title = document.createElement("strong");
  title.id = titleId;
  title.textContent = label ?? "Drawer";
  header.append(title);
  const closeButton = createIconButton({ icon: "close", ariaLabel: "Close drawer", density: resolvedDensity });
  closeButton.className = `${closeButton.className} drawer__close`;
  closeButton.setAttribute("data-overlay-close", "");
  header.append(closeButton);
  if (description) {
    const copy = document.createElement("p");
    copy.textContent = description;
    header.append(copy);
  }
  const body = document.createElement("div");
  body.className = "drawer__body";
  for (const item of content) {
    if (item?.type === "badge") {
      const badgeRow = document.createElement("div");
      badgeRow.className = "drawer__status-row";
      badgeRow.append(createBadge({ label: item.label, tone: item.tone ?? "success", variant: item.variant ?? "status", live: Boolean(item.live) }));
      body.append(badgeRow);
      continue;
    }
    if (item?.type === "progress") {
      const progressRow = document.createElement("div");
      progressRow.className = "drawer__progress-row";
      progressRow.append(createProgressIndicator({ label: item.label ?? "Progress", value: item.value ?? 0, max: item.max ?? 100, showValue: item.showValue ?? true, tone: item.tone ?? "accent", density: resolvedDensity, fullWidth: true }));
      body.append(progressRow);
      continue;
    }
    if (item?.type === "text") {
      const textRow = document.createElement("p");
      textRow.className = "drawer__supporting-copy";
      textRow.textContent = item.copy ?? item.label ?? "";
      body.append(textRow);
    }
  }
  for (const field of fields) {
    body.append(createInput({ label: field.label ?? field, value: field.value ?? "", density: field.density ?? resolvedDensity }));
  }
  panel.append(header, body);
  if (actions.length) {
    const footer = document.createElement("footer");
    for (const action of actions) {
      const actionVariant = action.intent === "danger" || action.variant === "danger" ? "primary" : action.variant;
      const actionNode = createButton({ ...action, variant: actionVariant, intent: action.intent ?? (action.variant === "danger" ? "danger" : undefined), density: action.density ?? resolvedDensity });
      actionNode.setAttribute("data-overlay-close", "");
      actionNode.dataset.key = action.key ?? action.label ?? "";
      actionNode.addEventListener?.("click", () => {
        if (typeof onAction === "function") onAction(actionNode.dataset.key);
      });
      footer.append(actionNode);
    }
    panel.append(footer);
  }
  overlay.append(panel);
  root.append(trigger, overlay);
  attachOverlayShell({
    root,
    trigger,
    surface: overlay,
    panel,
    open: shouldOpen,
    initialFocus: closeButton,
    stateOnOpen: ["closed", "default"].includes(resolvedState) ? "open" : resolvedState,
    stateOnClose: resolvedState === "default" ? "default" : "closed",
    onOpenChange,
  });
  return root;
}

export function createBottomSheet({
  label,
  description = "",
  triggerLabel = "Open sheet",
  items = [],
  actions = [],
  open = true,
  id = "",
  onOpenChange,
  onAction,
} = {}) {
  const root = document.createElement("div");
  root.className = "bottom-sheet";
  root.dataset.open = String(Boolean(open));
  const sheetId = id || `bottom-sheet-${String(label ?? "sheet").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  const titleId = `${sheetId}-title`;
  const trigger = createButton({ label: triggerLabel, variant: "secondary" });
  trigger.className = `${trigger.className} bottom-sheet__trigger`;
  trigger.setAttribute("data-overlay-open", "");
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", String(Boolean(open)));
  trigger.setAttribute("aria-controls", sheetId);
  const scrim = document.createElement("div");
  scrim.className = "bottom-sheet__scrim";
  scrim.setAttribute("data-overlay-dismiss", "");
  scrim.hidden = !open;
  const panel = document.createElement("section");
  panel.className = "bottom-sheet__panel";
  panel.id = sheetId;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-labelledby", titleId);
  const handle = document.createElement("span");
  handle.className = "bottom-sheet__handle";
  handle.setAttribute("aria-hidden", "true");
  const header = document.createElement("header");
  const copy = document.createElement("div");
  const title = document.createElement("strong");
  title.id = titleId;
  title.textContent = label ?? "Bottom sheet";
  copy.append(title);
  if (description) {
    const detail = document.createElement("p");
    detail.textContent = description;
    copy.append(detail);
  }
  const close = createIconButton({ label: "Close sheet", icon: "close" });
  close.className = `${close.className} bottom-sheet__close`;
  close.setAttribute("data-overlay-close", "");
  header.append(copy, close);
  const body = document.createElement("div");
  body.className = "bottom-sheet__body";
  for (const item of items) {
    const itemNode = document.createElement("span");
    itemNode.textContent = item.label ?? item;
    body.append(itemNode);
  }
  panel.append(handle, header, body);
  if (actions.length) {
    const footer = document.createElement("footer");
    for (const action of actions) {
      const actionNode = createButton(action);
      actionNode.setAttribute("data-overlay-close", "");
      actionNode.dataset.key = action.key ?? action.label ?? "";
      actionNode.addEventListener?.("click", () => {
        if (typeof onAction === "function") onAction(actionNode.dataset.key);
      });
      footer.append(actionNode);
    }
    panel.append(footer);
  }
  scrim.append(panel);
  root.append(trigger, scrim);
  attachOverlayShell({
    root,
    trigger,
    surface: scrim,
    panel,
    open,
    initialFocus: close,
    onOpenChange,
  });
  return root;
}

export function createPopover({
  triggerLabel,
  title,
  description = "",
  id = "",
  open = false,
  variant = "information",
  state = "default",
  placement = "bottom",
  density = "md",
  fullWidth = false,
  disabled = false,
  actions = [],
  field,
  onOpenChange,
  onAction,
} = {}) {
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const resolvedVariant = ["information", "action", "form", "metric"].includes(variant) ? variant : "information";
  const resolvedPlacement = ["top", "right", "bottom", "left"].includes(placement) ? placement : "bottom";
  const resolvedState = disabled ? "disabled" : ["default", "closed", "open", "hover", "focus", "warning", "disabled"].includes(state) ? state : "default";
  const isOpen = Boolean(open) || resolvedState === "open" || resolvedState === "focus" || resolvedState === "warning";
  const popover = document.createElement("span");
  popover.className = "popover";
  popover.dataset.open = String(isOpen);
  popover.dataset.variant = resolvedVariant;
  popover.dataset.state = resolvedState;
  popover.dataset.placement = resolvedPlacement;
  popover.dataset.density = resolvedDensity;
  popover.dataset.fullWidth = String(Boolean(fullWidth));
  const panelId = id || `popover-${String(triggerLabel ?? "popover").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  const trigger = createButton({
    label: triggerLabel ?? "Open",
    variant: resolvedVariant === "metric" ? "tertiary" : "secondary",
    density: resolvedDensity,
    trailingIcon: isOpen ? "expand_less" : "expand_more",
    disabled,
    fullWidth,
  });
  trigger.className = `${trigger.className} popover__trigger`;
  trigger.setAttribute("data-popover-trigger", "");
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", String(isOpen));
  trigger.setAttribute("aria-controls", panelId);
  if (resolvedState === "focus") trigger.dataset.state = "focus";
  if (resolvedState === "hover") trigger.dataset.state = "hover";
  const panel = document.createElement("section");
  panel.className = "popover__panel";
  panel.hidden = !isOpen;
  panel.id = panelId;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", title ?? triggerLabel ?? "Popover");
  const heading = document.createElement("strong");
  heading.textContent = title ?? "Popover";
  panel.append(heading);
  if (description) {
    const copy = document.createElement("p");
    copy.textContent = description;
    panel.append(copy);
  }
  if (resolvedVariant === "form") {
    panel.append(createInput({
      label: field?.label ?? "Label",
      value: field?.value ?? "",
      placeholder: field?.placeholder ?? "Short value",
      helper: field?.helper ?? "Keep this field local to the trigger.",
      density: resolvedDensity,
    }));
  }
  const resolvedActions = actions.length ? actions : resolvedVariant === "action"
    ? [{ label: "Apply", variant: "primary" }, { label: "Cancel", variant: "secondary" }]
    : [];
  if (resolvedActions.length) {
    const footer = document.createElement("footer");
    footer.className = "popover__actions";
    for (const action of resolvedActions) {
      const actionNode = createButton({
        ...action,
        density: action.density ?? resolvedDensity,
        variant: action.variant ?? "secondary",
      });
      actionNode.setAttribute("data-popover-action", "");
      actionNode.dataset.key = action.key ?? action.label ?? "";
      actionNode.addEventListener?.("click", () => {
        if (typeof onAction === "function") onAction(actionNode.dataset.key);
        setOpen(false, true);
      });
      footer.append(actionNode);
    }
    panel.append(footer);
  }
  const setOpen = (nextOpen, restoreFocus = false) => {
    popover.dataset.open = String(Boolean(nextOpen));
    popover.dataset.state = nextOpen ? "open" : "closed";
    trigger.setAttribute("aria-expanded", String(Boolean(nextOpen)));
    const icon = trigger.querySelector(".button__icon--trailing");
    if (icon) icon.textContent = nextOpen ? "expand_less" : "expand_more";
    panel.hidden = !nextOpen;
    if (restoreFocus) focusNode(trigger);
    if (typeof onOpenChange === "function") onOpenChange(Boolean(nextOpen));
  };
  trigger.addEventListener?.("click", () => setOpen(panel.hidden));
  trigger.addEventListener?.("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault?.();
    setOpen(false, true);
  });
  panel.addEventListener?.("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault?.();
    setOpen(false, true);
  });
  panel.addEventListener?.("click", (event) => {
    if (!event.target?.closest?.("[data-popover-action]")) return;
    setOpen(false, true);
  });
  attachOutsideClose(popover, () => {
    if (!panel.hidden) setOpen(false);
  });
  popover.append(trigger, panel);
  return popover;
}
