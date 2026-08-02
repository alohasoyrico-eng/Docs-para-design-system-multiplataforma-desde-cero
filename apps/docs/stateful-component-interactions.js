import { hydrateDatePicker, hydrateDateRangePicker, hydrateCardExpiryInput, hydrateCardNumberInput, hydrateCardSecurityCodeInput, hydrateCodeInput, hydrateCombobox, hydrateCountrySelector, hydratePhoneInput, hydrateInput, hydrateSelect, hydrateTextArea } from "#design-system/components";
import { iconGlyph } from "./icon-system.js";

export function setupStatefulComponentDemos(root = document) {
  setupInputDemos(root);
  setupTextAreaPackageDemos(root);
  setupSelectDemos(root);
  setupComboboxDemos(root);
  setupCountrySelectorDemos(root);
  setupChipDemos(root);
  setupTabsDemos(root);
  setupSliderDemos(root);
  setupSegmentedControlDemos(root);
  setupPaginationDemos(root);
  setupPopoverDemos(root);
  setupCodeInputDemos(root);
  setupPhoneInputDemos(root);
  setupCardNumberInputDemos(root);
  setupCardExpiryInputDemos(root);
  setupCardSecurityCodeInputDemos(root);
  setupDatePickerDemos(root);
  setupDateRangePickerDemos(root);
  setupTreeViewDemos(root);
}

function setStyleProperty(node, name, value) {
  if (node?.style?.setProperty) {
    node.style.setProperty(name, value);
    return;
  }
  if (node?.style?.values) {
    node.style.values[name] = value;
    return;
  }
  node?.setAttribute?.("style", `${node.getAttribute?.("style") ?? ""}; ${name}: ${value}`);
}

function setupTextAreaPackageDemos(root = document) {
  root.querySelectorAll('[data-doc-component="text-area"]:not([data-stateful-ready="true"])').forEach((demo) => {
    demo.dataset.statefulReady = "true";
    hydrateTextArea(demo);
  });
}

function setupCardNumberInputDemos(root = document) {
  root.querySelectorAll('[data-doc-component="card-number-input"]:not([data-stateful-ready="true"])').forEach((demo) => {
    demo.dataset.statefulReady = "true";
    hydrateCardNumberInput(demo);
  });
}

function setupCardExpiryInputDemos(root = document) {
  root.querySelectorAll('[data-doc-component="card-expiry-input"]:not([data-stateful-ready="true"])').forEach((demo) => {
    demo.dataset.statefulReady = "true";
    hydrateCardExpiryInput(demo);
  });
}

function setupCardSecurityCodeInputDemos(root = document) {
  root.querySelectorAll('[data-doc-component="card-security-code-input"]:not([data-stateful-ready="true"])').forEach((demo) => {
    demo.dataset.statefulReady = "true";
    hydrateCardSecurityCodeInput(demo);
  });
}

function setupInputDemos(root = document) {
  root.querySelectorAll('[data-doc-component="input"]:not([data-stateful-ready="true"])').forEach((demo) => {
    demo.dataset.statefulReady = "true";
    hydrateInput(demo);
  });
}

function setupSelectDemos(root = document) {
  root.querySelectorAll('[data-doc-component="select"]:not([data-stateful-ready="true"])').forEach((demo) => {
    demo.dataset.statefulReady = "true";
    hydrateSelect(demo);
  });
}

function setupComboboxDemos(root = document) {
  root.querySelectorAll('[data-doc-component="combobox"]:not([data-stateful-ready="true"])').forEach((demo) => {
    demo.dataset.statefulReady = "true";
    hydrateCombobox(demo);
  });
}

function setupCountrySelectorDemos(root = document) {
  root.querySelectorAll('[data-doc-component="country-selector"]:not([data-stateful-ready="true"])').forEach((demo) => {
    demo.dataset.statefulReady = "true";
    hydrateCountrySelector(demo);
  });
}

function setupChipDemos(root = document) {
  root.querySelectorAll('[data-doc-component="chip"]:not([data-stateful-ready="true"])').forEach((chip) => {
    chip.dataset.statefulReady = "true";
    if (chip.tagName !== "BUTTON") return;
    chip.addEventListener("click", () => {
      if (chip.disabled) return;
      if (chip.getAttribute("data-chip-remove") === "true" || chip.querySelector("[data-chip-remove]")) {
        chip.remove();
        return;
      }
      const selected = chip.getAttribute("aria-pressed") === "true";
      chip.setAttribute("aria-pressed", String(!selected));
      chip.dataset.selected = String(!selected);
      chip.dataset.state = selected ? "default" : "selected";
    });
  });
}

function setupTabsDemos(root = document) {
  root.querySelectorAll('[data-doc-component="tabs"]:not([data-stateful-ready="true"]), .tabs-demo:not([data-stateful-ready="true"])').forEach((tablist) => {
    tablist.dataset.statefulReady = "true";
    const tabs = [...tablist.querySelectorAll("[data-tabs-item], [role='tab']")];
    const updateIndicator = (tab) => {
      if (!tab) return;
      tablist.style.setProperty("--comp-tabs-indicator-left", `${tab.offsetLeft}px`);
      tablist.style.setProperty("--comp-tabs-indicator-width", `${tab.offsetWidth}px`);
    };
    const activateTab = (tab) => {
      tabs.forEach((item) => {
        item.setAttribute("aria-selected", String(item === tab));
        item.tabIndex = item === tab ? 0 : -1;
      });
      updateIndicator(tab);
    };
    updateIndicator(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ?? tabs[0]);
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", (event) => {
        const nextTab = horizontalItemForKey(event.key, tabs, index);
        if (!nextTab) return;
        event.preventDefault();
        nextTab.focus();
        activateTab(nextTab);
      });
    });
    window.addEventListener("resize", () => updateIndicator(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ?? tabs[0]));
  });
}

function setupSliderDemos(root = document) {
  root.querySelectorAll('[data-doc-component="slider"]:not([data-stateful-ready="true"]), .slider-demo:not([data-stateful-ready="true"])').forEach((slider) => {
    slider.dataset.statefulReady = "true";
    const input = slider.querySelector("[data-slider-input], input[type='range']");
    const output = slider.querySelector("[data-slider-output], output");
    if (!input) return;
    const initialText = output?.textContent ?? "";
    const match = initialText.match(/^(.*?)(-?\d+(?:\.\d+)?)(.*)$/);
    const prefix = match?.[1] ?? "";
    const suffix = match?.[3] ?? "";
    const update = () => {
      const min = Number(input.min || 0);
      const max = Number(input.max || 100);
      const value = Number(input.value || 0);
      const pct = max === min ? 0 : Math.round(((value - min) / (max - min)) * 100);
      slider.dataset.value = String(value);
      slider.dataset.pct = String(Math.max(0, Math.min(100, pct)));
      if (output) output.textContent = `${prefix}${value}${suffix}`;
    };
    input.addEventListener("input", update);
    input.addEventListener("change", update);
    input.addEventListener("pointerdown", () => {
      slider.dataset.dragging = "true";
    });
    input.addEventListener("pointerup", () => {
      slider.dataset.dragging = "false";
    });
    input.addEventListener("pointercancel", () => {
      slider.dataset.dragging = "false";
    });
    input.addEventListener("blur", () => {
      slider.dataset.dragging = "false";
    });
    update();
  });
}

function setupSegmentedControlDemos(root = document) {
  root.querySelectorAll('[data-doc-component="segmented-control"]:not([data-stateful-ready="true"])').forEach((control) => {
    control.dataset.statefulReady = "true";
    const items = [...control.querySelectorAll('[role="tab"], [data-segmented-control-item]')];
    const indicator = control.querySelector(".segmented-control__indicator");
    const syncIndicator = (item) => {
      const index = Math.max(0, items.indexOf(item));
      setStyleProperty(control, "--segmented-control-count", String(Math.max(items.length, 1)));
      setStyleProperty(indicator, "--segmented-control-count", String(Math.max(items.length, 1)));
      setStyleProperty(indicator, "--segmented-control-index", String(index));
    };
    const activate = (item) => {
      items.forEach((option) => {
        option.setAttribute("aria-selected", String(option === item));
        option.tabIndex = option === item ? 0 : -1;
      });
      syncIndicator(item);
    };
    items.forEach((item, index) => {
      item.addEventListener("click", () => activate(item));
      item.addEventListener("keydown", (event) => {
        const next = horizontalItemForKey(event.key, items, index);
        if (!next) return;
        event.preventDefault();
        next.focus();
        activate(next);
      });
    });
    syncIndicator(items.find((item) => item.getAttribute("aria-selected") === "true") ?? items[0]);
  });
}

function setupTreeViewDemos(root = document) {
  root.querySelectorAll('[data-doc-component="tree-view"]:not([data-stateful-ready="true"])').forEach((tree) => {
    tree.dataset.statefulReady = "true";
    const items = [...tree.querySelectorAll("[data-tree-item]")];
    const controls = items.map((item) => item.querySelector("[data-tree-control]")).filter(Boolean);
    const visibleItems = () => items.filter((item) => !item.hidden);
    const updateNestedVisibility = () => {
      const collapsedLevels = [];
      items.forEach((item) => {
        const level = Number(item.getAttribute("aria-level") ?? 1);
        while (collapsedLevels.length && collapsedLevels[collapsedLevels.length - 1] >= level) collapsedLevels.pop();
        item.hidden = collapsedLevels.length > 0;
        if (item.getAttribute("aria-expanded") === "false") collapsedLevels.push(level);
      });
    };
    const setExpanded = (item, expanded) => {
      if (!item.hasAttribute("aria-expanded")) return;
      const value = String(Boolean(expanded));
      item.setAttribute("aria-expanded", value);
      const control = item.querySelector("[data-tree-control]");
      control?.setAttribute("aria-expanded", value);
      const disclosure = control?.querySelector(".button__icon--trailing");
      if (disclosure) disclosure.textContent = iconGlyph("expand_more");
      updateNestedVisibility();
    };
    const selectItem = (item) => {
      items.forEach((option) => {
        const selected = option === item;
        option.setAttribute("aria-selected", String(selected));
        option.removeAttribute("tabindex");
        const control = option.querySelector("[data-tree-control]");
        control?.setAttribute("aria-selected", String(selected));
        control?.setAttribute("tabindex", selected ? "0" : "-1");
      });
    };
    const moveTo = (index) => {
      const next = visibleItems()[index];
      if (!next) return;
      selectItem(next);
      next.querySelector("[data-tree-control]")?.focus();
    };
    items.forEach((item, index) => {
      item.removeAttribute("tabindex");
      const control = controls[index];
      control?.addEventListener("click", () => {
        selectItem(item);
        if (item.hasAttribute("aria-expanded")) {
          setExpanded(item, item.getAttribute("aria-expanded") !== "true");
        }
      });
      control?.addEventListener("keydown", (event) => {
        const keyActions = {
          ArrowDown: () => Math.min(visibleItems().length - 1, visibleItems().indexOf(item) + 1),
          ArrowUp: () => Math.max(0, visibleItems().indexOf(item) - 1),
          Home: () => 0,
          End: () => visibleItems().length - 1,
        };
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          const expanded = item.getAttribute("aria-expanded");
          if (expanded == null) return;
          event.preventDefault();
          setExpanded(item, event.key === "ArrowRight");
          return;
        }
        const nextIndex = keyActions[event.key]?.();
        if (nextIndex == null) return;
        event.preventDefault();
        moveTo(nextIndex);
      });
    });
    updateNestedVisibility();
    if (!items.some((item) => item.getAttribute("aria-selected") === "true")) selectItem(items[0]);
  });
}

function horizontalItemForKey(key, items, index) {
  const keyActions = {
    ArrowLeft: () => items[(index - 1 + items.length) % items.length],
    ArrowRight: () => items[(index + 1) % items.length],
    Home: () => items[0],
    End: () => items[items.length - 1],
  };
  return keyActions[key]?.();
}

function setupPaginationDemos(root = document) {
  root.querySelectorAll('[data-doc-component="pagination"]:not([data-stateful-ready="true"])').forEach((pagination) => {
    pagination.dataset.statefulReady = "true";
    const buttons = [...pagination.querySelectorAll("button")];
    const pageButtons = buttons.filter((button) => button.dataset.kind === "page");
    const pageCount = Number(pagination.dataset.pageCount || pageButtons[pageButtons.length - 1]?.dataset.page || 1);
    const setPage = (page) => {
      const nextPage = Math.max(1, Math.min(Number(page) || 1, pageCount));
      pagination.dataset.page = String(nextPage);
      pageButtons.forEach((button) => {
        const selected = Number(button.dataset.page) === nextPage;
        if (selected) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
        button.dataset.state = selected ? "selected" : "default";
      });
      const [prev] = buttons;
      const next = buttons[buttons.length - 1];
      if (prev) prev.disabled = nextPage <= 1;
      if (next) next.disabled = nextPage >= pageCount;
    };
    const current = Number(pageButtons.find((button) => button.getAttribute("aria-current") === "page")?.dataset.page ?? pagination.dataset.page ?? 1);
    setPage(current);
    pageButtons.forEach((button) => button.addEventListener("click", () => setPage(Number(button.dataset.page))));
    buttons[0]?.addEventListener("click", () => {
      const active = Number(pagination.dataset.page || 1);
      setPage(Math.max(1, active - 1));
    });
    buttons[buttons.length - 1]?.addEventListener("click", () => {
      const active = Number(pagination.dataset.page || 1);
      setPage(Math.min(pageCount, active + 1));
    });
  });
}

function setupPopoverDemos(root = document) {
  root.querySelectorAll('[data-doc-component="popover"]:not([data-stateful-ready="true"]), .popover-demo:not([data-stateful-ready="true"])').forEach((popover) => {
    popover.dataset.statefulReady = "true";
    const trigger = popover.querySelector("[data-popover-trigger], .popover-demo__trigger");
    const panel = popover.querySelector("[role='dialog']");
    if (!trigger || !panel) return;
    const setOpen = (open) => {
      popover.dataset.open = String(open);
      trigger.setAttribute("aria-expanded", String(open));
      const trailingIcon = trigger.querySelector(".button__icon--trailing");
      if (trailingIcon) trailingIcon.textContent = open ? "expand_less" : "expand_more";
      panel.hidden = !open;
    };
    setOpen(popover.dataset.open === "true" || ["open", "focus", "warning"].includes(popover.dataset.state));
    trigger.addEventListener("click", () => setOpen(popover.dataset.open !== "true"));
    popover.querySelectorAll("[data-popover-action]").forEach((action) => {
      action.addEventListener("click", () => {
        setOpen(false);
        trigger.focus();
      });
    });
    popover.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      trigger.focus();
    });
  });
}

function setupCodeInputDemos(root = document) {
  root.querySelectorAll('[data-doc-component="code-input"]:not([data-stateful-ready="true"]), .code-input-demo:not([data-stateful-ready="true"])').forEach((otp) => {
    otp.dataset.statefulReady = "true";
    hydrateCodeInput(otp);
  });
}

function setupPhoneInputDemos(root = document) {
  root.querySelectorAll('[data-doc-component="phone-input"]:not([data-stateful-ready="true"]), .phone-input-demo:not([data-stateful-ready="true"])').forEach((phoneInput) => {
    phoneInput.dataset.statefulReady = "true";
    hydratePhoneInput(phoneInput);
  });
}

function setupDatePickerDemos(root = document) {
  root.querySelectorAll('[data-doc-component="date-picker"]:not([data-stateful-ready="true"]), .date-picker-demo:not([data-stateful-ready="true"])').forEach((picker) => {
    picker.dataset.statefulReady = "true";
    hydrateDatePicker(picker);
  });
}

function setupDateRangePickerDemos(root = document) {
  root.querySelectorAll('[data-doc-component="date-range-picker"]:not([data-stateful-ready="true"])').forEach((picker) => {
    picker.dataset.statefulReady = "true";
    hydrateDateRangePicker(picker);
  });
}
