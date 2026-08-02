export function setupCandidatePatternInteractions() {
  document.addEventListener("click", handleCandidatePatternClick);
  document.addEventListener("input", handleCandidatePatternInput);
  document.addEventListener("keydown", handleCandidatePatternKeydown);
}

function handleCandidatePatternClick(event) {
  const commandOpen = event.target.closest("[data-command-open]");
  if (commandOpen) return openCommandPalette(commandOpen.closest("[data-command-demo]"));

  const commandResult = event.target.closest("[data-command-result]");
  if (commandResult) return selectCommandResult(commandResult.closest("[data-command-demo]"), commandResult);

  const commandAction = event.target.closest("[data-command-surface] [data-key], [data-command-surface] [data-overlay-close], [data-command-surface] [data-overlay-dismiss]");
  if (commandAction) return closeCommandPalette(commandAction.closest("[data-command-demo]"));

  const notificationOpen = event.target.closest("[data-notification-open]");
  if (notificationOpen) return openNotificationPanel(notificationOpen.closest("[data-notification-demo]"));

  const notificationRead = event.target.closest("[data-notification-read]");
  if (notificationRead) return markNotificationsRead(notificationRead.closest("[data-notification-demo]"));

  const notificationClose = event.target.closest("[data-notification-panel] [data-overlay-close], [data-notification-panel] [data-overlay-dismiss]");
  if (notificationClose) return closeNotificationPanel(notificationClose.closest("[data-notification-demo]"));

  const confirmationOpen = event.target.closest("[data-confirmation-open]");
  if (confirmationOpen) return openConfirmationDialog(confirmationOpen.closest("[data-confirmation-demo]"));

  const confirmationAction = event.target.closest("[data-confirmation-dialog] [data-key], [data-confirmation-dialog] [data-overlay-close], [data-confirmation-dialog] [data-overlay-dismiss]");
  if (confirmationAction) {
    const demo = confirmationAction.closest("[data-confirmation-demo]");
    if (confirmationAction.dataset.key === "confirm") return confirmConfirmationDialog(demo);
    return closeConfirmationDialog(demo);
  }

  const actionSheetOpen = event.target.closest("[data-action-sheet-open]");
  if (actionSheetOpen) return openActionSheet(actionSheetOpen.closest("[data-action-sheet-demo]"));

  const actionSheetClose = event.target.closest("[data-action-sheet-close], [data-action-sheet] [data-overlay-close], [data-action-sheet] [data-overlay-dismiss]");
  if (actionSheetClose) return closeActionSheet(actionSheetClose.closest("[data-action-sheet-demo]"));

  const actionSheetMenu = event.target.closest("[data-action-menu] [data-key], [data-action-menu] button");
  if (actionSheetMenu) return selectActionSheetItem(actionSheetMenu.closest("[data-action-sheet-demo]"));

  const searchResult = event.target.closest("[data-search-result]");
  if (searchResult) return selectSearchResult(searchResult.closest("[data-search-demo]"), searchResult);

  const searchScopeOption = event.target.closest("[data-search-scope] [data-select-option]");
  if (searchScopeOption) return filterSearchDemo(searchScopeOption.closest("[data-search-demo]"));

  const selectLayerChoose = event.target.closest("[data-select-layer-choose]");
  if (selectLayerChoose) return chooseSelectLayerOption(selectLayerChoose.closest("[data-select-layer-demo]"), selectLayerChoose.dataset.selectLayerChoose);

  const selectLayerBlocked = event.target.closest("[data-select-layer-blocked]");
  if (selectLayerBlocked) return showSelectLayerValidation(selectLayerBlocked.closest("[data-select-layer-demo]"));

  const multiSelectApply = event.target.closest("[data-multi-select-apply]");
  if (multiSelectApply) return applyMultiSelect(multiSelectApply.closest("[data-multi-select-demo]"));
}

function handleCandidatePatternInput(event) {
  const commandSearch = event.target.closest("[data-command-search-control]");
  if (commandSearch) filterCommandPalette(commandSearch.closest("[data-command-demo]"));

  const searchControl = event.target.closest("[data-search-control]");
  if (searchControl) filterSearchDemo(searchControl.closest("[data-search-demo]"));

  const autocompleteControl = event.target.closest("[data-autocomplete-control]");
  if (autocompleteControl) filterAutocompleteDemo(autocompleteControl.closest("[data-autocomplete-demo]"));
}

document.addEventListener("change", (event) => {
  const searchScope = event.target.closest("[data-search-scope]");
  if (searchScope) return filterSearchDemo(searchScope.closest("[data-search-demo]"));

  const multiSelectOption = event.target.closest("[data-multi-select-option]");
  if (multiSelectOption) return updateMultiSelect(multiSelectOption.closest("[data-multi-select-demo]"));
});

function fieldValue(control) {
  const nativeField = control?.querySelector("input, select");
  if (nativeField) return nativeField.value?.trim() ?? "";
  const selectControl = control?.querySelector("[data-select-control]");
  if (selectControl?.dataset?.value) return selectControl.dataset.value.trim();
  const selectedOption = control?.querySelector("[data-select-option][aria-selected='true']");
  return selectedOption?.dataset?.value?.trim() ?? selectedOption?.textContent?.trim() ?? "";
}

function handleCandidatePatternKeydown(event) {
  if (event.key !== "Escape") return;
  document.querySelectorAll("[data-command-surface]:not([hidden])").forEach((surface) => closeCommandPalette(surface.closest("[data-command-demo]")));
  document.querySelectorAll("[data-notification-panel]:not([hidden])").forEach((panel) => closeNotificationPanel(panel.closest("[data-notification-demo]")));
  document.querySelectorAll("[data-confirmation-dialog]:not([hidden])").forEach((dialog) => closeConfirmationDialog(dialog.closest("[data-confirmation-demo]")));
  document.querySelectorAll("[data-action-sheet]:not([hidden])").forEach((sheet) => closeActionSheet(sheet.closest("[data-action-sheet-demo]")));
}

function openCommandPalette(demo) {
  const surface = demo?.querySelector("[data-command-surface]");
  if (!surface) return;
  surface.hidden = false;
  demo.dataset.commandState = "open";
  surface.querySelector("[data-command-search-control] input")?.focus();
}

function closeCommandPalette(demo) {
  const surface = demo?.querySelector("[data-command-surface]");
  if (!surface) return;
  surface.hidden = true;
  demo.dataset.commandState = "closed";
  demo.querySelector("[data-command-open]")?.focus();
}

function filterCommandPalette(demo) {
  if (!demo) return;
  const query = demo.querySelector("[data-command-search-control] input")?.value.trim().toLowerCase() ?? "";
  let visibleCount = 0;
  demo.querySelectorAll("[data-command-result]").forEach((result) => {
    const text = `${result.textContent} ${result.dataset.commandKeywords ?? ""}`.toLowerCase();
    const isVisible = query === "" || text.includes(query);
    result.hidden = !isVisible;
    visibleCount += isVisible ? 1 : 0;
  });
  const empty = demo.querySelector("[data-command-empty]");
  if (empty) empty.hidden = visibleCount > 0;
}

function selectCommandResult(demo, result) {
  if (!demo || result.hidden) return;
  const toast = demo.querySelector("[data-command-toast]");
  const copyNode = toast?.querySelector("[data-pattern-toast] p");
  if (copyNode) copyNode.textContent = `${result.dataset.commandLabel ?? "Command"} is ready to run.`;
  if (toast) toast.hidden = false;
}

function openNotificationPanel(demo) {
  const panel = demo?.querySelector("[data-notification-panel]");
  if (!panel) return;
  panel.hidden = false;
  demo.dataset.notificationState = "open";
  demo.querySelector("[data-notification-open]")?.setAttribute("aria-expanded", "true");
  panel.querySelector("[data-notification-read]")?.focus();
}

function closeNotificationPanel(demo) {
  const panel = demo?.querySelector("[data-notification-panel]");
  if (!panel) return;
  panel.hidden = true;
  demo.dataset.notificationState = "closed";
  const trigger = demo.querySelector("[data-notification-open]");
  trigger?.setAttribute("aria-expanded", "false");
  trigger?.focus();
}

function markNotificationsRead(demo) {
  if (!demo) return;
  demo.dataset.count = "0";
  const badge = demo.querySelector("[data-notification-badge]");
  if (badge) {
    const label = badge.querySelector(".badge__label");
    if (label) label.textContent = "0";
    badge.setAttribute("aria-label", "0 unread notifications");
    badge.dataset.state = "hidden";
    badge.hidden = true;
  }
  const list = demo.querySelector("[data-notification-list]");
  if (list) list.hidden = true;
  const empty = demo.querySelector("[data-notification-empty]");
  if (empty) empty.hidden = false;
  const toast = demo.querySelector("[data-notification-toast]");
  if (toast) toast.hidden = false;
}

function openConfirmationDialog(demo) {
  const validation = demo?.querySelector("[data-confirmation-validation]");
  const dialog = demo?.querySelector("[data-confirmation-dialog]");
  if (validation) validation.hidden = false;
  if (!dialog) return;
  dialog.hidden = false;
  dialog.querySelector("[data-key='confirm']")?.focus();
}

function closeConfirmationDialog(demo) {
  const dialog = demo?.querySelector("[data-confirmation-dialog]");
  if (dialog) dialog.hidden = true;
  demo?.querySelector("[data-confirmation-open]")?.focus();
}

function confirmConfirmationDialog(demo) {
  closeConfirmationDialog(demo);
  const toast = demo?.querySelector("[data-confirmation-toast]");
  if (toast) toast.hidden = false;
}

function openActionSheet(demo) {
  const sheet = demo?.querySelector("[data-action-sheet]");
  if (!sheet) return;
  sheet.hidden = false;
  demo.dataset.actionSheetState = "open";
  sheet.querySelector("[data-action-sheet-close]")?.focus();
}

function closeActionSheet(demo) {
  const sheet = demo?.querySelector("[data-action-sheet]");
  if (sheet) sheet.hidden = true;
  if (demo) demo.dataset.actionSheetState = "closed";
  demo?.querySelector("[data-action-sheet-open]")?.focus();
}

function selectActionSheetItem(demo) {
  closeActionSheet(demo);
  const toast = demo?.querySelector("[data-action-sheet-toast]");
  if (toast) toast.hidden = false;
}

function filterSearchDemo(demo) {
  if (!demo) return;
  const query = fieldValue(demo.querySelector("[data-search-control]")).toLowerCase();
  const scope = fieldValue(demo.querySelector("[data-search-scope]")) || "all";
  const validation = demo.querySelector("[data-search-validation]");
  const selected = demo.querySelector("[data-search-selected]");
  if (selected) selected.hidden = true;
  const isIdle = query.length === 0 && scope === "all";
  const isInvalid = query.length === 1;
  if (validation) validation.hidden = !isInvalid;
  let visibleCount = 0;
  demo.querySelectorAll("[data-search-result]").forEach((result) => {
    const text = `${result.textContent} ${result.dataset.searchKeywords ?? ""}`.toLowerCase();
    const matchesScope = scope === "all" || result.dataset.searchType === scope;
    const matchesQuery = query.length === 0 || text.includes(query);
    const isVisible = !isIdle && !isInvalid && matchesScope && matchesQuery;
    result.hidden = !isVisible;
    visibleCount += isVisible ? 1 : 0;
  });
  const list = demo.querySelector("[data-search-list]");
  if (list) list.hidden = !isIdle;
  const results = demo.querySelector("[data-search-results]");
  if (results) results.hidden = isIdle || isInvalid || visibleCount === 0;
  const empty = demo.querySelector("[data-search-empty]");
  if (empty) empty.hidden = isIdle || isInvalid || visibleCount > 0;
  const status = demo.querySelector("[data-search-status]");
  if (isIdle) {
    demo.dataset.searchState = "idle";
    if (status) status.textContent = "Recent entities";
    return;
  }
  if (isInvalid) {
    demo.dataset.searchState = "invalid";
    if (status) status.textContent = "Type at least 2 characters";
    return;
  }
  demo.dataset.searchState = visibleCount > 0 ? "results" : "empty";
  if (status) status.textContent = `${visibleCount} ${visibleCount === 1 ? "result" : "results"}`;
}

function selectSearchResult(demo, result) {
  if (!demo || result.hidden) return;
  const selected = demo.querySelector("[data-search-selected]");
  const message = selected?.querySelector(".inline-validation__message");
  if (message) message.textContent = `${result.dataset.searchLabel ?? "Result"} selected.`;
  if (selected) selected.hidden = false;
  demo.dataset.searchState = "selected";
  const status = demo.querySelector("[data-search-status]");
  if (status) status.textContent = `${result.dataset.searchLabel ?? "Result"} selected`;
}

function filterAutocompleteDemo(demo) {
  if (!demo) return;
  const query = fieldValue(demo.querySelector("[data-autocomplete-control]")).toLowerCase();
  const loading = demo.querySelector("[data-autocomplete-loading]");
  const isLoadingPreview = query.length === 1;
  if (loading) loading.hidden = !isLoadingPreview;
  let visibleCount = 0;
  demo.querySelectorAll("[data-autocomplete-control] [data-combobox-option]").forEach((option) => {
    if (!option.hidden) visibleCount += 1;
  });
  const comboboxEmpty = demo.querySelector("[data-autocomplete-control] [data-combobox-empty]");
  if (comboboxEmpty) comboboxEmpty.hidden = true;
  const empty = demo.querySelector("[data-autocomplete-empty]");
  if (empty) empty.hidden = query.length === 0 || isLoadingPreview || visibleCount > 0;
  const validation = demo.querySelector("[data-autocomplete-validation]");
  if (validation) validation.hidden = true;
}

function chooseSelectLayerOption(demo, key) {
  if (!demo) return;
  demo.querySelectorAll("[data-select-layer-option]").forEach((option) => {
    option.dataset.selected = String(option.dataset.selectLayerOption === key);
  });
  const select = demo.querySelector("[data-select-layer-field] select");
  if (select) select.value = key;
  const validation = demo.querySelector("[data-select-layer-validation]");
  if (validation) validation.hidden = true;
}

function showSelectLayerValidation(demo) {
  const validation = demo?.querySelector("[data-select-layer-validation]");
  if (validation) validation.hidden = false;
}

function updateMultiSelect(demo) {
  if (!demo) return;
  const checkedControls = Array.from(demo.querySelectorAll("[data-multi-select-option]")).filter((control) => control.querySelector("input")?.checked);
  const checkedIds = checkedControls.map((control) => control.dataset.multiSelectOption);
  const max = Number(demo.dataset.max ?? 2);
  demo.querySelectorAll("[data-multi-select-chip]").forEach((chip) => {
    chip.hidden = !checkedIds.includes(chip.dataset.multiSelectChip);
  });
  const empty = demo.querySelector("[data-multi-select-empty]");
  if (empty) empty.hidden = checkedIds.length > 0;
  const validation = demo.querySelector("[data-multi-select-validation]");
  if (validation) validation.hidden = checkedIds.length <= max;
  const count = demo.querySelector("[data-multi-select-count]");
  if (count) {
    count.textContent = `${checkedIds.length} selected`;
    count.setAttribute("aria-label", `${checkedIds.length} filters selected`);
  }
}

function applyMultiSelect(demo) {
  if (!demo) return;
  updateMultiSelect(demo);
  const count = demo.querySelectorAll("[data-multi-select-option] input:checked").length;
  const toast = demo.querySelector("[data-multi-select-toast]");
  const copy = toast?.querySelector("[data-pattern-toast] p");
  if (copy) copy.textContent = `${count} ${count === 1 ? "filter is" : "filters are"} active.`;
  if (toast) toast.hidden = false;
}
