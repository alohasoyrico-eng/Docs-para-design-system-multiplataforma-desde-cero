import { hydrateSelect } from "#design-system/components";

export function setupAdvancedFilters(root = document) {
  root.querySelectorAll("[data-advanced-filters-demo]:not([data-advanced-filters-ready='true'])").forEach((demo) => {
    demo.dataset.advancedFiltersReady = "true";
    hydrateSelect(demo);
    demo.querySelectorAll("[data-advanced-filter-table] tbody tr").forEach((row) => {
      const cells = [...row.children];
      row.dataset.region = cells[2]?.textContent.trim() ?? "";
      row.dataset.status = cells[3]?.textContent.trim() ?? "";
      row.dataset.period = cells[4]?.textContent.trim() ?? "";
      row.dataset.search = cells.map((cell) => cell.textContent.trim().toLowerCase()).join(" ");
    });
    updateAdvancedFilterChips(demo, { applied: false });
  });
}

export function markAdvancedFiltersDirty(demo) {
  if (!demo) return;
  demo.dataset.applied = "false";
  demo.querySelector("[data-advanced-filter-feedback]")?.setAttribute("hidden", "");
}

export function applyAdvancedFilters(demo) {
  if (!demo) return;
  demo.dataset.applied = "true";
  const state = advancedFilterState(demo);
  const active = activeAdvancedFilters(state);
  const rows = [...demo.querySelectorAll("[data-advanced-filter-table] tbody tr")];
  let visibleRows = 0;
  rows.forEach((row) => {
    const show = (state.region === "all" || row.dataset.region === state.region)
      && (state.status === "all" || row.dataset.status === state.status)
      && (!state.period || row.dataset.period >= state.period)
      && (!state.keyword || (row.dataset.search ?? "").includes(state.keyword));
    row.hidden = !show;
    visibleRows += show ? 1 : 0;
  });
  demo.querySelector("[data-advanced-filter-table]")?.toggleAttribute("hidden", visibleRows === 0);
  demo.querySelector("[data-advanced-filter-empty]")?.toggleAttribute("hidden", visibleRows !== 0);
  updateAdvancedFilterChips(demo, { active });
  const feedback = demo.querySelector("[data-advanced-filter-feedback] [data-doc-component='inline-validation']");
  if (feedback) feedback.querySelector(".inline-validation__message, [data-inline-validation-message]")?.replaceChildren(`Filters applied to ${visibleRows} ${visibleRows === 1 ? "operation" : "operations"}.`);
  demo.querySelector("[data-advanced-filter-feedback]")?.removeAttribute("hidden");
}

export function resetAdvancedFilters(demo) {
  if (!demo) return;
  setAdvancedFilterValue(demo, "region", "all");
  setAdvancedFilterValue(demo, "status", "all");
  setAdvancedFilterValue(demo, "period", "");
  setAdvancedFilterValue(demo, "keyword", "");
  demo.querySelectorAll("[data-advanced-filter-table] tbody tr").forEach((row) => {
    row.hidden = false;
  });
  demo.querySelector("[data-advanced-filter-table]")?.removeAttribute("hidden");
  demo.querySelector("[data-advanced-filter-empty]")?.setAttribute("hidden", "");
  updateAdvancedFilterChips(demo, { active: {} });
  demo.dataset.applied = "false";
  demo.querySelector("[data-advanced-filter-feedback]")?.setAttribute("hidden", "");
}

export function removeAdvancedFilter(demo, name) {
  if (!demo || !name) return;
  if (name === "region" || name === "status") setAdvancedFilterValue(demo, name, "all");
  else setAdvancedFilterValue(demo, name, "");
  applyAdvancedFilters(demo);
}

export function closeAdvancedFilterSelect(select, demo) {
  if (!select) return;
  select.dataset.open = "false";
  select.querySelector("[data-select-trigger]")?.setAttribute("aria-expanded", "false");
  markAdvancedFiltersDirty(demo);
}

function advancedFilterValue(demo, name) {
  const control = demo?.querySelector(`[data-advanced-filter="${name}"]`);
  const select = control?.querySelector("[data-select-control]");
  if (select) return select.dataset.value?.trim() ?? "";
  const field = control?.querySelector("select, input, textarea");
  return field?.value?.trim() ?? "";
}

function setAdvancedFilterValue(demo, name, value) {
  const control = demo?.querySelector(`[data-advanced-filter="${name}"]`);
  const select = control?.querySelector("[data-select-control]");
  if (select) {
    const option = select.querySelector(`[data-select-option][data-value="${window.CSS?.escape ? CSS.escape(value) : value}"]`);
    const fallbackOption = select.querySelector("[data-select-option]");
    const selectedOption = option || fallbackOption;
    const nextValue = selectedOption?.dataset.value ?? value;
    select.dataset.value = nextValue;
    select.querySelector("[data-select-value-label]")?.replaceChildren(selectedOption?.dataset.label ?? nextValue);
    select.querySelectorAll("[data-select-option]").forEach((item) => {
      const selected = item === selectedOption;
      item.dataset.selected = String(selected);
      item.setAttribute("aria-selected", String(selected));
    });
    return;
  }
  const field = control?.querySelector("select, input, textarea");
  if (field) field.value = value;
}

function advancedFilterState(demo) {
  return {
    region: advancedFilterValue(demo, "region") || "all",
    status: advancedFilterValue(demo, "status") || "all",
    period: advancedFilterValue(demo, "period"),
    keyword: advancedFilterValue(demo, "keyword").toLowerCase(),
  };
}

function activeAdvancedFilters(state) {
  return {
    region: state.region && state.region !== "all" ? `Region: ${state.region}` : "",
    status: state.status && state.status !== "all" ? `Status: ${state.status}` : "",
    period: state.period ? `Since: ${state.period}` : "",
    keyword: state.keyword ? `Keyword: ${state.keyword}` : "",
  };
}

function updateAdvancedFilterChips(demo, { active = {}, applied = true } = {}) {
  const source = applied ? active : {};
  let count = 0;
  demo.querySelectorAll("[data-advanced-filter-chip]").forEach((chip) => {
    const label = source[chip.dataset.advancedFilterChip] ?? "";
    chip.hidden = !label;
    if (label) {
      count += 1;
      chip.querySelector(".chip__label")?.replaceChildren(label);
      chip.setAttribute("aria-label", `Remove ${label}`);
    }
  });
  const countNode = demo.querySelector("[data-advanced-filter-count]");
  if (countNode) {
    countNode.textContent = `${count} active`;
    countNode.setAttribute("aria-label", `${count} active ${count === 1 ? "filter" : "filters"}`);
  }
}
