export function setupMobilePatternInteractions() {
  document.addEventListener("click", handleMobilePatternClick);
  document.addEventListener("input", handleFullscreenInput);
}

function handleMobilePatternClick(event) {
  const fullscreenOpen = event.target.closest("[data-fullscreen-sheet-open]");
  if (fullscreenOpen) return openFullscreenSheet(fullscreenOpen.closest("[data-fullscreen-sheet-demo]"));

  const fullscreenClose = event.target.closest("[data-fullscreen-sheet-close]");
  if (fullscreenClose) return closeFullscreenSheet(fullscreenClose.closest("[data-fullscreen-sheet-demo]"));

  const fullscreenPrev = event.target.closest("[data-fullscreen-sheet-prev]");
  if (fullscreenPrev) return moveFullscreenStep(fullscreenPrev.closest("[data-fullscreen-sheet-demo]"), -1);

  const fullscreenNext = event.target.closest("[data-fullscreen-sheet-next]");
  if (fullscreenNext) return moveFullscreenStep(fullscreenNext.closest("[data-fullscreen-sheet-demo]"), 1);

  const swipeReveal = event.target.closest("[data-swipe-reveal]");
  if (swipeReveal) return setSwipeActions(swipeReveal.closest("[data-swipe-actions-demo]"), true);

  const swipeHide = event.target.closest("[data-swipe-hide]");
  if (swipeHide) return setSwipeActions(swipeHide.closest("[data-swipe-actions-demo]"), false);

  const swipeAction = event.target.closest("[data-swipe-action]");
  if (swipeAction) return showMobileToast(swipeAction.closest("[data-swipe-actions-demo]"), "[data-swipe-toast]");

  const quickBlocked = event.target.closest("[data-quick-grid-blocked]");
  if (quickBlocked) return toggleHidden(quickBlocked.closest("[data-quick-actions-grid-demo]"), "[data-quick-grid-tooltip]", false);

  const quickAction = event.target.closest("[data-quick-grid-action]");
  if (quickAction) return handleQuickGridAction(quickAction.closest("[data-quick-actions-grid-demo]"), quickAction.dataset.quickGridAction);

  const quickDialogAction = event.target.closest("[data-quick-grid-dialog] [data-key], [data-quick-grid-dialog] [data-overlay-close], [data-quick-grid-dialog] [data-overlay-dismiss]");
  if (quickDialogAction) return closeQuickGridDialog(quickDialogAction.closest("[data-quick-actions-grid-demo]"), quickDialogAction.dataset.key === "confirm");

  const drawerOpen = event.target.closest("[data-drawer-adapter-open]");
  if (drawerOpen) return setDrawerAdapter(drawerOpen.closest("[data-drawer-adapter-demo]"), true);

  const drawerClose = event.target.closest("[data-drawer-adapter-close]");
  if (drawerClose) return setDrawerAdapter(drawerClose.closest("[data-drawer-adapter-demo]"), false);

  const drawerRisk = event.target.closest("[data-drawer-adapter-risk]");
  if (drawerRisk) return toggleHidden(drawerRisk.closest("[data-drawer-adapter-demo]"), "[data-drawer-adapter-dialog]", false);

  const drawerPackageAction = event.target.closest("[data-drawer-adapter-component] [data-key]");
  if (drawerPackageAction) return handleDrawerAdapterAction(drawerPackageAction.closest("[data-drawer-adapter-demo]"), drawerPackageAction.dataset.key);

  const drawerDialogAction = event.target.closest("[data-drawer-adapter-dialog] [data-key], [data-drawer-adapter-dialog] [data-overlay-close], [data-drawer-adapter-dialog] [data-overlay-dismiss]");
  if (drawerDialogAction) return closeDrawerDialog(drawerDialogAction.closest("[data-drawer-adapter-demo]"), drawerDialogAction.dataset.key === "confirm");
}

function openFullscreenSheet(demo) {
  if (!demo) return;
  demo.querySelector("[data-fullscreen-sheet]")?.removeAttribute("hidden");
  const sheet = demo.querySelector("[data-fullscreen-sheet-component]");
  const scrim = sheet?.querySelector(".bottom-sheet__scrim");
  if (scrim?.hidden) sheet.querySelector("[data-overlay-open]")?.click();
  updateFullscreenStep(demo, Number(demo.dataset.stepIndex || 0));
}

function closeFullscreenSheet(demo) {
  if (!demo) return;
  demo.querySelector("[data-fullscreen-sheet]")?.setAttribute("hidden", "");
  demo.querySelector("[data-fullscreen-sheet-open]")?.focus();
}

function moveFullscreenStep(demo, direction) {
  if (!demo) return;
  const current = Number(demo.dataset.stepIndex || 0);
  if (direction > 0 && current === 1 && !demo.querySelector('[data-fullscreen-field="limit"] input')?.value.trim()) {
    demo.querySelector("[data-fullscreen-validation]")?.removeAttribute("hidden");
    return;
  }
  if (direction > 0 && current >= 2) {
    showMobileToast(demo, "[data-fullscreen-toast]");
    closeFullscreenSheet(demo);
    return;
  }
  updateFullscreenStep(demo, Math.max(0, Math.min(2, current + direction)));
}

function updateFullscreenStep(demo, index) {
  demo.dataset.stepIndex = String(index);
  demo.querySelectorAll("[data-fullscreen-step]").forEach((panel) => {
    panel.hidden = panel.dataset.fullscreenStep !== String(index);
  });
  demo.querySelector("[data-fullscreen-sheet-prev]")?.toggleAttribute("hidden", index === 0);
  const next = demo.querySelector("[data-fullscreen-sheet-next]");
  if (next) next.textContent = index >= 2 ? "Save policy" : "Continue";
}

function handleFullscreenInput(event) {
  const formControl = event.target.closest("[data-fullscreen-field]");
  if (!formControl) return;
  formControl.closest("[data-fullscreen-sheet-demo]")?.querySelector("[data-fullscreen-validation]")?.setAttribute("hidden", "");
}

function setSwipeActions(demo, revealed) {
  if (!demo) return;
  demo.querySelector("[data-swipe-actions-rail]")?.toggleAttribute("hidden", !revealed);
  demo.querySelector("[data-swipe-reveal]")?.toggleAttribute("hidden", revealed);
  demo.querySelector("[data-swipe-hide]")?.toggleAttribute("hidden", !revealed);
}

function handleQuickGridAction(demo, action) {
  if (!demo) return;
  if (action === "freeze") {
    toggleHidden(demo, "[data-quick-grid-dialog]", false);
    return;
  }
  showMobileToast(demo, "[data-quick-grid-toast]");
}

function closeQuickGridDialog(demo, confirmed) {
  if (!demo) return;
  toggleHidden(demo, "[data-quick-grid-dialog]", true);
  if (confirmed) showMobileToast(demo, "[data-quick-grid-toast]");
}

function setDrawerAdapter(demo, open) {
  if (!demo) return;
  toggleHidden(demo, "[data-drawer-adapter-panel]", !open);
  if (open) {
    const drawer = demo.querySelector("[data-drawer-adapter-component]");
    const overlay = drawer?.querySelector(".drawer__overlay");
    if (overlay?.hidden) drawer.querySelector("[data-overlay-open]")?.click();
  }
  if (!open) demo.querySelector("[data-drawer-adapter-open]")?.focus();
}

function handleDrawerAdapterAction(demo, key) {
  if (!demo) return;
  setDrawerAdapter(demo, false);
  if (key === "risk") toggleHidden(demo, "[data-drawer-adapter-dialog]", false);
}

function closeDrawerDialog(demo, confirmed) {
  if (!demo) return;
  toggleHidden(demo, "[data-drawer-adapter-dialog]", true);
  if (confirmed) showMobileToast(demo, "[data-drawer-adapter-toast]");
}

function toggleHidden(demo, selector, hidden) {
  demo?.querySelector(selector)?.toggleAttribute("hidden", hidden);
}

function showMobileToast(demo, selector) {
  const toast = demo?.querySelector(selector);
  if (toast) toast.hidden = false;
}
