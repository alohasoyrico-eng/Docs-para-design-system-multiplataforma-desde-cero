export function setupProcessPatternInteractions() {
  document.addEventListener("click", handleProcessPatternClick);
  document.addEventListener("click", syncFilterChipAfterSystemClick, true);
  document.addEventListener("input", handleProcessPatternInput);
}

function handleProcessPatternClick(event) {
  const formSave = event.target.closest("[data-form-section-save]");
  if (formSave) return saveFormSection(formSave.closest("[data-form-section-demo]"));

  const toolbarExport = event.target.closest("[data-toolbar-export]");
  if (toolbarExport) return showProcessToast(toolbarExport.closest("[data-toolbar-demo]"), "[data-toolbar-toast]");

  const filterChip = event.target.closest("[data-filter-chip]");
  if (filterChip) return removeFilterChip(filterChip.closest("[data-filter-chip-demo]"), filterChip);

  const filterClear = event.target.closest("[data-filter-chip-clear]");
  if (filterClear) return clearFilterChips(filterClear.closest("[data-filter-chip-demo]"));

  const fileChoose = event.target.closest("[data-file-upload-choose]");
  if (fileChoose) return chooseUploadFile(fileChoose.closest("[data-file-upload-demo]"));

  const fileRemove = event.target.closest("[data-file-upload-remove]");
  if (fileRemove) return removeUploadFile(fileRemove.closest("[data-file-upload-demo]"));
}

function handleProcessPatternInput(event) {
  const formField = event.target.closest("[data-form-section-field]");
  if (!formField) return;
  const demo = formField.closest("[data-form-section-demo]");
  if (demo) demo.dataset.formState = "dirty";
  const validation = demo?.querySelector("[data-form-section-validation]");
  if (validation) validation.hidden = true;
}

function syncFilterChipAfterSystemClick(event) {
  const chip = event.target.closest("[data-filter-chip]");
  if (!chip) return;
  const demo = chip.closest("[data-filter-chip-demo]");
  window.setTimeout(() => updateFilterChipCount(demo), 0);
}

function saveFormSection(demo) {
  if (!demo) return;
  const name = demo.querySelector('[data-form-section-field="name"] input')?.value.trim() ?? "";
  const validation = demo.querySelector("[data-form-section-validation]");
  if (!name) {
    if (validation) validation.hidden = false;
    demo.querySelector('[data-form-section-field="name"] input')?.focus();
    return;
  }
  if (validation) validation.hidden = true;
  demo.dataset.formState = "saved";
  showProcessToast(demo, "[data-form-section-toast]");
}

function removeFilterChip(demo, chip) {
  if (!demo || !chip) return;
  chip.hidden = true;
  updateFilterChipCount(demo);
}

function clearFilterChips(demo) {
  if (!demo) return;
  demo.querySelectorAll("[data-filter-chip]").forEach((chip) => {
    chip.hidden = true;
  });
  updateFilterChipCount(demo);
  showProcessToast(demo, "[data-filter-chip-toast]");
}

function updateFilterChipCount(demo) {
  const visibleCount = Array.from(demo.querySelectorAll("[data-filter-chip]")).filter((chip) => !chip.hidden).length;
  const count = demo.querySelector("[data-filter-chip-count]");
  if (count) {
    count.textContent = `${visibleCount} active`;
    count.setAttribute("aria-label", `${visibleCount} active filters`);
  }
  const empty = demo.querySelector("[data-filter-chip-empty]");
  if (empty) empty.hidden = visibleCount > 0;
}

function chooseUploadFile(demo) {
  if (!demo) return;
  demo.dataset.fileState = "uploading";
  demo.querySelector("[data-file-upload-empty]")?.setAttribute("hidden", "");
  demo.querySelector("[data-file-upload-summary]")?.removeAttribute("hidden");
  demo.querySelector("[data-file-upload-progress]")?.removeAttribute("hidden");
  demo.querySelector("[data-file-upload-validation]")?.setAttribute("hidden", "");
  demo.querySelector("[data-file-upload-remove]")?.removeAttribute("hidden");
  showProcessToast(demo, "[data-file-upload-toast]");
}

function removeUploadFile(demo) {
  if (!demo) return;
  demo.dataset.fileState = "empty";
  demo.querySelector("[data-file-upload-empty]")?.removeAttribute("hidden");
  demo.querySelector("[data-file-upload-summary]")?.setAttribute("hidden", "");
  demo.querySelector("[data-file-upload-progress]")?.setAttribute("hidden", "");
  demo.querySelector("[data-file-upload-toast]")?.setAttribute("hidden", "");
  demo.querySelector("[data-file-upload-remove]")?.setAttribute("hidden", "");
}

function showProcessToast(demo, selector) {
  const toast = demo?.querySelector(selector);
  if (toast) toast.hidden = false;
}
