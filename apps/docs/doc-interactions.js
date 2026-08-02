import { setupButtonPlaygrounds } from "./button-playground-interactions.js";
import { setupComponentDemoInteractions } from "./component-demo-interactions.js?v=275";
import { setupCandidatePatternInteractions } from "./pattern-candidate-interactions.js?v=9";
import { setupDesktopPatternInteractions } from "./pattern-desktop-interactions.js?v=9";
import { setupMobilePatternInteractions } from "./pattern-mobile-interactions.js?v=4";
import { setupUtilityPatternInteractions } from "./pattern-utility-interactions.js?v=1";
import { setupJourneyPatternInteractions } from "./pattern-journey-interactions.js?v=1";
import { setupDesktopTemplateInteractions } from "./template-desktop-interactions.js?v=6";
import { setupProcessPatternInteractions } from "./pattern-process-interactions.js?v=2";
import { setupReferenceDemos } from "./reference-demo-interactions.js";
import { closeSelect, setupSelectDemos } from "./select-interactions.js?v=8";

export function setupDocumentationInteractions(deps) {
  setupComponentDemoInteractions({ ...deps, setupSelectDemos });
  setupSelectDemos();
  setupButtonPlaygrounds(deps);
  setupReferenceDemos(deps);
}

export function setupGlobalDocumentInteractions() {
  setupCandidatePatternInteractions(); setupDesktopPatternInteractions(); setupMobilePatternInteractions(); setupUtilityPatternInteractions(); setupJourneyPatternInteractions(); setupDesktopTemplateInteractions(); setupProcessPatternInteractions();
  document.addEventListener("click", (event) => {
    const bulkAction = event.target.closest("[data-bulk-action]");
    if (bulkAction) {
      handleBulkAction(bulkAction); return;
    }

    const bulkDialogAction = event.target.closest("[data-bulk-dialog] [data-key], [data-bulk-dialog] [data-overlay-close], [data-bulk-dialog] [data-overlay-dismiss]");
    if (bulkDialogAction) {
      const demo = bulkDialogAction.closest("[data-pattern-bulk-actions]");
      if (bulkDialogAction.dataset.key === "confirm") confirmBulkAction(demo);
      else closeBulkDialog(demo);
      return;
    }

    const stepPrev = event.target.closest("[data-step-prev]");
    if (stepPrev) {
      moveMultiStep(stepPrev.closest("[data-multi-step-demo]"), -1);
      return;
    }

    const stepNext = event.target.closest("[data-step-next]");
    if (stepNext) {
      moveMultiStep(stepNext.closest("[data-multi-step-demo]"), 1);
      return;
    }

    const stepSave = event.target.closest("[data-step-save]");
    if (stepSave) {
      showStepToast(stepSave.closest("[data-multi-step-demo]"));
      return;
    }

    const settingsSave = event.target.closest("[data-settings-save]");
    if (settingsSave) {
      saveSettings(settingsSave.closest("[data-settings-demo]"));
      return;
    }

    const settingsDanger = event.target.closest("[data-settings-danger]");
    if (settingsDanger) {
      openSettingsDialog(settingsDanger.closest("[data-settings-demo]"));
      return;
    }

    const settingsDialogAction = event.target.closest("[data-settings-dialog] [data-key], [data-settings-dialog] [data-overlay-close], [data-settings-dialog] [data-overlay-dismiss]");
    if (settingsDialogAction) {
      const demo = settingsDialogAction.closest("[data-settings-demo]");
      if (settingsDialogAction.dataset.key === "confirm") confirmSettingsDanger(demo);
      else closeSettingsDialog(demo);
      return;
    }

    const helpCategory = event.target.closest("[data-help-category]");
    if (helpCategory) {
      selectHelpCategory(helpCategory.closest("[data-help-demo]"), helpCategory.dataset.helpCategory);
      return;
    }

    const helpArticle = event.target.closest("[data-help-article]");
    if (helpArticle) {
      selectHelpArticle(helpArticle.closest("[data-help-demo]"), helpArticle);
      return;
    }

    const demoNavToggle = event.target.closest("[data-pattern-demo-nav-toggle]");
    if (demoNavToggle) {
      const demo = demoNavToggle.closest("[data-pattern-demo-nav]");
      if (demo) {
        const isOpen = demo.dataset.patternDemoNav === "open";
        demo.dataset.patternDemoNav = isOpen ? "closed" : "open";
        demoNavToggle.setAttribute("aria-expanded", String(!isOpen));
      }
    }

    const navLink = event.target.closest(".topnav a, .sidebar a");
    if (navLink) {
      const demo = navLink.closest("[data-pattern-demo-nav]");
      if (demo) {
        demo.dataset.patternDemoNav = "closed";
        demo.querySelector("[data-pattern-demo-nav-toggle]")?.setAttribute("aria-expanded", "false");
        return;
      }
      document.querySelectorAll(".topnav details[open]").forEach((details) => details.removeAttribute("open"));
      document.body.dataset.navOpen = "";
      document.querySelector("#menuButton")?.setAttribute("aria-expanded", "false");
    }
    document.querySelectorAll(".topnav details[open]").forEach((details) => {
      if (!details.contains(event.target)) details.removeAttribute("open");
    });
    document.querySelectorAll(".select.is-open").forEach((select) => {
      if (!select.contains(event.target)) closeSelect(select);
    });
  });

  document.addEventListener("change", (event) => {
    const selectAll = event.target.closest("[data-bulk-select-all-control]");
    if (selectAll) {
      const demo = selectAll.closest("[data-pattern-bulk-actions]");
      const checked = Boolean(selectAll.querySelector("input")?.checked);
      demo?.querySelectorAll("[data-bulk-item]").forEach((input) => {
        input.checked = checked;
      });
      demo?.querySelectorAll("[data-bulk-item-control] input").forEach((input) => {
        input.checked = checked;
      });
      updateBulkDemo(demo);
      return;
    }

    const item = event.target.closest("[data-bulk-item-control]");
    if (item) {
      updateBulkDemo(item.closest("[data-pattern-bulk-actions]"));
      return;
    }

    const settingControl = event.target.closest("[data-setting-control]");
    if (settingControl) updateSettingsDemo(settingControl);
  });

  document.addEventListener("input", (event) => {
    const helpSearch = event.target.closest("[data-help-search-control]");
    if (helpSearch) {
      filterHelpDemo(helpSearch.closest("[data-help-demo]"));
      return;
    }

    const formControl = event.target.closest("[data-step-field]");
    if (!formControl) return;
    const demo = formControl.closest("[data-multi-step-demo]");
    formControl.removeAttribute("aria-invalid");
    demo?.querySelector("[data-step-error]")?.setAttribute("hidden", "");
    updateStepSummary(demo);
  });

  document.addEventListener("keydown", (event) => {
    const helpArticle = event.target.closest?.("[data-help-article]");
    if (helpArticle && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      selectHelpArticle(helpArticle.closest("[data-help-demo]"), helpArticle);
      return;
    }

    if (event.key === "Escape") {
      document.querySelectorAll("[data-bulk-dialog]:not([hidden])").forEach((dialog) => closeBulkDialog(dialog.closest("[data-pattern-bulk-actions]")));
      document.querySelectorAll("[data-settings-dialog]:not([hidden])").forEach((dialog) => closeSettingsDialog(dialog.closest("[data-settings-demo]")));
      document.querySelectorAll('[data-pattern-demo-nav="open"]').forEach((demo) => {
        demo.dataset.patternDemoNav = "closed";
        demo.querySelector("[data-pattern-demo-nav-toggle]")?.setAttribute("aria-expanded", "false");
      });
      document.querySelectorAll(".select.is-open").forEach((select) => {
        closeSelect(select);
        select.querySelector("button")?.focus();
      });
    }
  });
}

function updateBulkDemo(demo) {
  if (!demo) return;
  const items = Array.from(demo.querySelectorAll("[data-bulk-item-control]"));
  const selectedItems = items.filter((control) => control.querySelector("input")?.checked);
  const selectedCount = selectedItems.length;
  const selectAll = demo.querySelector("[data-bulk-select-all-control] input");
  const toolbar = demo.querySelector("[data-bulk-toolbar]");
  demo.dataset.selectedCount = String(selectedCount);
  demo.querySelectorAll("[data-bulk-count]").forEach((node) => {
    node.textContent = String(selectedCount);
  });
  demo.querySelectorAll("[data-bulk-dialog-count]").forEach((node) => {
    node.textContent = String(selectedCount);
  });
  if (selectAll) {
    selectAll.checked = selectedCount === items.length;
    selectAll.indeterminate = selectedCount > 0 && selectedCount < items.length;
  }
  items.forEach((control) => {
    const checked = Boolean(control.querySelector("input")?.checked);
    const row = demo.querySelector(`[data-bulk-table] [data-key="${control.dataset.bulkId}"]`);
    if (row) row.dataset.selected = String(checked);
  });
  if (toolbar) toolbar.hidden = selectedCount === 0;
  if (selectedCount === 0) closeBulkDialog(demo);
}

function handleBulkAction(action) {
  const demo = action.closest("[data-pattern-bulk-actions]");
  if (!demo || Number(demo.dataset.selectedCount ?? 0) === 0) return;
  const actionType = action.dataset.bulkAction;
  if (actionType === "freeze") {
    openBulkDialog(demo);
    return;
  }
  showBulkToast(demo, actionType === "export" ? "Export is being prepared for selected vehicles." : "Selected vehicles were marked for review.");
}

function openBulkDialog(demo) {
  const dialog = demo?.querySelector("[data-bulk-dialog]");
  if (!dialog) return;
  dialog.hidden = false;
  dialog.querySelector("[data-overlay-close]")?.focus();
}

function closeBulkDialog(demo) {
  const dialog = demo?.querySelector("[data-bulk-dialog]");
  if (dialog) dialog.hidden = true;
}

function confirmBulkAction(demo) {
  closeBulkDialog(demo);
  showBulkToast(demo, "Freeze action was queued with an audit event.");
}

function showBulkToast(demo, copy) {
  const toast = demo?.querySelector("[data-bulk-toast]");
  if (!toast) return;
  const copyNode = toast.querySelector("[data-pattern-toast] p");
  if (copyNode) copyNode.textContent = copy;
  toast.hidden = false;
}

function moveMultiStep(demo, direction) {
  if (!demo) return;
  const currentIndex = Number(demo.dataset.stepIndex ?? 0);
  if (direction > 0 && !validateCurrentStep(demo, currentIndex)) return;
  const nextIndex = Math.max(0, Math.min(2, currentIndex + direction));
  if (currentIndex === 2 && direction > 0) {
    showStepToast(demo, "Request submitted for approval.");
    return;
  }
  demo.dataset.stepIndex = String(nextIndex);
  updateStepSummary(demo);
  renderMultiStep(demo);
}

function validateCurrentStep(demo, currentIndex) {
  const fields = Array.from(demo.querySelectorAll(`[data-step-panel="${currentIndex}"] [data-step-field]`));
  const invalidField = fields.find((field) => (field.querySelector("input")?.value ?? "").trim() === "");
  const error = demo.querySelector("[data-step-error]");
  fields.forEach((field) => field.querySelector("input")?.setAttribute("aria-invalid", String(field === invalidField)));
  if (!invalidField) {
    if (error) error.hidden = true;
    return true;
  }
  if (error) error.hidden = false;
  invalidField.querySelector("input")?.focus();
  return false;
}

function renderMultiStep(demo) {
  const currentIndex = Number(demo.dataset.stepIndex ?? 0);
  demo.querySelectorAll("[data-step-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.stepPanel !== String(currentIndex);
  });
  demo.querySelectorAll("[data-stepper] li").forEach((step, stepIndex) => {
    if (stepIndex === currentIndex) step.setAttribute("aria-current", "step");
    else step.removeAttribute("aria-current");
    step.dataset.state = stepIndex < currentIndex ? "complete" : stepIndex === currentIndex ? "active" : "pending";
    const marker = step.querySelector("span");
    if (marker) marker.textContent = String(stepIndex + 1);
  });
  const prev = demo.querySelector("[data-step-prev]");
  const next = demo.querySelector("[data-step-next]");
  if (prev) prev.hidden = currentIndex === 0;
  if (next) next.textContent = currentIndex === 2 ? "Submit" : "Continue";
  demo.querySelector("[data-step-error]")?.setAttribute("hidden", "");
}

function updateStepSummary(demo) {
  if (!demo) return;
  const values = {};
  demo.querySelectorAll("[data-step-field]").forEach((field) => {
    values[formControl.dataset.stepField] = (field.querySelector("input")?.value ?? "").trim();
  });
  demo.querySelectorAll("[data-step-summary]").forEach((node) => {
    const key = node.dataset.stepSummary;
    const value = values[key] || "Not set";
    node.textContent = key === "limit" && values[key] ? `$${values[key]}` : value;
  });
}

function showStepToast(demo, copy = "Progress is available for resume.") {
  const toast = demo?.querySelector("[data-step-toast]");
  if (!toast) return;
  const copyNode = toast.querySelector("[data-pattern-toast] p");
  if (copyNode) copyNode.textContent = copy;
  toast.hidden = false;
}

function updateSettingsDemo(control) {
  const demo = control.closest("[data-settings-demo]");
  const row = control.closest(".pattern-settings-demo__row");
  if (!demo) return;
  const settingControl = control.closest("[data-setting-control]") ?? control;
  if (settingControl.dataset.settingMode === "immediate") {
    showSettingsToast(demo, "Fuel alerts saved.");
    return;
  }
  demo.dataset.dirty = "true";
  if (settingControl) settingControl.dataset.dirty = "true";
  const savebar = demo.querySelector("[data-settings-savebar]");
  if (savebar) savebar.hidden = false;
}

function saveSettings(demo) {
  if (!demo) return;
  demo.dataset.dirty = "false";
  demo.querySelectorAll("[data-setting-control][data-dirty]").forEach((row) => {
    row.dataset.dirty = "false";
  });
  const savebar = demo.querySelector("[data-settings-savebar]");
  if (savebar) savebar.hidden = true;
  showSettingsToast(demo, "Workspace preferences are up to date.");
}

function openSettingsDialog(demo) {
  const dialog = demo?.querySelector("[data-settings-dialog]");
  if (!dialog) return;
  dialog.hidden = false;
  dialog.querySelector("[data-overlay-close]")?.focus();
}

function closeSettingsDialog(demo) {
  const dialog = demo?.querySelector("[data-settings-dialog]");
  if (dialog) dialog.hidden = true;
}

function confirmSettingsDanger(demo) {
  closeSettingsDialog(demo);
  showSettingsToast(demo, "Archive request queued with an audit event.");
}

function showSettingsToast(demo, copy) {
  const toast = demo?.querySelector("[data-settings-toast]");
  if (!toast) return;
  const copyNode = toast.querySelector("[data-pattern-toast] p");
  if (copyNode) copyNode.textContent = copy;
  toast.hidden = false;
}

function selectHelpCategory(demo, category) {
  if (!demo) return;
  demo.dataset.helpCategory = category;
  demo.querySelectorAll("[data-help-category]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.helpCategory === category));
  });
  filterHelpDemo(demo);
}

function filterHelpDemo(demo) {
  if (!demo) return;
  const query = demo.querySelector("[data-help-search-control] input")?.value.trim().toLowerCase() ?? "";
  const category = demo.dataset.helpCategory ?? "all";
  const articles = Array.from(demo.querySelectorAll("[data-help-article]"));
  let visibleCount = 0;
  articles.forEach((article) => {
    const text = `${article.textContent} ${article.dataset.helpKeywords ?? ""}`.toLowerCase();
    const matchesCategory = category === "all" || article.dataset.helpCategoryName === category;
    const matchesQuery = query === "" || text.includes(query);
    const isVisible = matchesCategory && matchesQuery;
    article.hidden = !isVisible;
    visibleCount += isVisible ? 1 : 0;
  });
  const empty = demo.querySelector("[data-help-empty]");
  if (empty) empty.hidden = visibleCount > 0;
}

function selectHelpArticle(demo, article) {
  if (!demo || !article || article.hidden) return;
  demo.querySelectorAll("[data-help-article]").forEach((item) => {
    item.setAttribute("aria-selected", String(item === article));
  });
  const panel = demo.querySelector("[data-help-article-panel]");
  if (!panel) return;
  panel.querySelector("[data-help-article-category]").textContent = article.dataset.helpCategoryName ?? "";
  panel.querySelector("[data-help-article-title]").textContent = article.querySelector("[data-pattern-component='card'] strong")?.textContent ?? "";
  panel.querySelector("[data-help-article-copy]").textContent = article.querySelector("[data-pattern-component='card'] p")?.textContent ?? "";
  panel.focus();
}
