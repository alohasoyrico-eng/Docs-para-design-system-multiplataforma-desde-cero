import { applyAdvancedFilters, closeAdvancedFilterSelect, markAdvancedFiltersDirty, removeAdvancedFilter, resetAdvancedFilters, setupAdvancedFilters } from "./pattern-advanced-filter-interactions.js?v=1";
import { applyColumnConfig, markColumnConfigDirty, resetColumnConfig, setupColumnConfigurators } from "./pattern-column-configurator-interactions.js?v=1";
import { markRolesDirty, saveRolesReview, setupRolesAndPermissions } from "./pattern-roles-permissions-interactions.js?v=1";

export function setupDesktopPatternInteractions() {
  document.addEventListener("input", handleDesktopPatternInput);
  document.addEventListener("change", handleDesktopPatternChange);
  document.addEventListener("click", handleVirtualTablePaginationCapture, true);
  document.addEventListener("click", handleDesktopPatternClick);
  setupVirtualDataTables();
  setupAdvancedFilters();
  setupColumnConfigurators();
  setupRolesAndPermissions();
  if (typeof MutationObserver === "undefined") return;
  const observer = new MutationObserver(() => {
    setupVirtualDataTables();
    setupAdvancedFilters();
    setupColumnConfigurators();
    setupRolesAndPermissions();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function handleVirtualTablePaginationCapture(event) {
  const tablePagination = event.target.closest?.("[data-virtual-table-pagination] .pagination__button");
  if (!tablePagination) return;
  event.preventDefault();
  event.stopPropagation();
  pageVirtualTable(tablePagination.closest("[data-virtual-table-demo]"), tablePagination);
}

function handleDesktopPatternInput(event) {
  const tableSearch = event.target.closest("[data-virtual-table-search]");
  if (tableSearch) updateVirtualTable(tableSearch.closest("[data-virtual-table-demo]"), { page: 1 });

  const advancedFilter = event.target.closest("[data-advanced-filter]");
  if (advancedFilter) markAdvancedFiltersDirty(advancedFilter.closest("[data-advanced-filters-demo]"));

  const roleControl = event.target.closest("[data-role-control]");
  if (roleControl) markRolesDirty(roleControl.closest("[data-roles-demo]"));
}

function handleDesktopPatternChange(event) {
  const advancedFilter = event.target.closest("[data-advanced-filter]");
  if (advancedFilter) markAdvancedFiltersDirty(advancedFilter.closest("[data-advanced-filters-demo]"));

  const columnToggle = event.target.closest("[data-column-toggle]");
  if (columnToggle) markColumnConfigDirty(columnToggle.closest("[data-column-config-demo]"));

  const roleControl = event.target.closest("[data-role-control]");
  if (roleControl) markRolesDirty(roleControl.closest("[data-roles-demo]"));
}

function handleDesktopPatternClick(event) {
  const advancedSelectOption = event.target.closest("[data-advanced-filters-demo] [data-select-option]");
  if (advancedSelectOption) window.setTimeout(() => closeAdvancedFilterSelect(advancedSelectOption.closest("[data-select-control]"), advancedSelectOption.closest("[data-advanced-filters-demo]")), 0);

  const tableStatus = event.target.closest("[data-virtual-table-status]");
  if (tableStatus) return setVirtualTableStatus(tableStatus.closest("[data-virtual-table-demo]"), tableStatus.dataset.virtualTableStatus);

  const tableRefresh = event.target.closest("[data-virtual-table-refresh]");
  if (tableRefresh) return refreshVirtualTable(tableRefresh.closest("[data-virtual-table-demo]"));

  const tableClear = event.target.closest("[data-virtual-table-clear]");
  if (tableClear) return clearVirtualTableFilters(tableClear.closest("[data-virtual-table-demo]"));

  const tablePagination = event.target.closest("[data-virtual-table-pagination] .pagination__button");
  if (tablePagination) {
    event.preventDefault();
    event.stopPropagation();
    return pageVirtualTable(tablePagination.closest("[data-virtual-table-demo]"), tablePagination);
  }

  const tableSort = event.target.closest("[data-virtual-table] [data-table-sort]");
  if (tableSort) window.setTimeout(() => updateVirtualTable(tableSort.closest("[data-virtual-table-demo]")), 0);

  const tableRow = event.target.closest("[data-virtual-table] tbody tr");
  if (tableRow && !tableRow.classList.contains("table__detail-row")) window.setTimeout(() => updateVirtualSelection(tableRow.closest("[data-virtual-table-demo]")), 0);

  const columnToggle = event.target.closest("[data-column-toggle]");
  if (columnToggle) window.setTimeout(() => markColumnConfigDirty(columnToggle.closest("[data-column-config-demo]")), 0);

  const columnApply = event.target.closest("[data-column-apply]");
  if (columnApply) return applyColumnConfig(columnApply.closest("[data-column-config-demo]"));

  const columnReset = event.target.closest("[data-column-reset]");
  if (columnReset) return resetColumnConfig(columnReset.closest("[data-column-config-demo]"));

  const rolesSave = event.target.closest("[data-roles-save]");
  if (rolesSave) return saveRolesReview(rolesSave.closest("[data-roles-demo]"));

  const adminView = event.target.closest("[data-admin-view]");
  if (adminView) return switchAdminView(adminView.closest("[data-admin-demo]"), adminView.dataset.adminView);

  const applyFilters = event.target.closest("[data-advanced-filter-apply]");
  if (applyFilters) return applyAdvancedFilters(applyFilters.closest("[data-advanced-filters-demo]"));

  const resetFilters = event.target.closest("[data-advanced-filter-reset]");
  if (resetFilters) return resetAdvancedFilters(resetFilters.closest("[data-advanced-filters-demo]"));

  const removableFilter = event.target.closest("[data-advanced-filter-chip]");
  if (removableFilter) return removeAdvancedFilter(removableFilter.closest("[data-advanced-filters-demo]"), removableFilter.dataset.advancedFilterChip);
}

function setupVirtualDataTables(root = document) {
  root.querySelectorAll("[data-virtual-table-demo]:not([data-virtual-table-ready='true'])").forEach((demo) => {
    demo.dataset.virtualTableReady = "true";
    demo.querySelectorAll("[data-virtual-table] tbody tr").forEach((row) => {
      if (row.classList.contains("table__detail-row")) return;
      const cells = [...row.children];
      row.dataset.status = cells[2]?.textContent.trim().toLowerCase() ?? "";
      row.dataset.search = cells.map((cell) => cell.textContent.trim().toLowerCase()).join(" ");
    });
    updateVirtualTable(demo);
  });
}

function filteredVirtualRows(demo) {
  if (!demo) return;
  const query = demo.querySelector("[data-virtual-table-search] input")?.value.trim().toLowerCase() ?? "";
  const status = demo.dataset.status ?? "all";
  return [...demo.querySelectorAll("[data-virtual-table] tbody tr")]
    .filter((row) => !row.classList.contains("table__detail-row"))
    .filter((row) => {
      const matchesQuery = !query || (row.dataset.search ?? row.textContent.toLowerCase()).includes(query);
      const matchesStatus = status === "all" || row.dataset.status === status;
      return matchesQuery && matchesStatus;
    });
}

function updateVirtualTable(demo, updates = {}) {
  if (!demo) return;
  if (updates.page) demo.dataset.page = String(updates.page);
  const allRows = [...demo.querySelectorAll("[data-virtual-table] tbody tr")].filter((row) => !row.classList.contains("table__detail-row"));
  const matches = filteredVirtualRows(demo) ?? [];
  const pageSize = Math.max(1, Number(demo.dataset.pageSize) || 5);
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  const page = Math.max(1, Math.min(Number(demo.dataset.page) || 1, pageCount));
  demo.dataset.page = String(page);
  const start = (page - 1) * pageSize;
  const pageRows = new Set(matches.slice(start, start + pageSize));
  let visible = 0;
  allRows.forEach((row) => {
    const show = pageRows.has(row);
    row.hidden = !show;
    visible += show ? 1 : 0;
  });
  demo.querySelector("[data-virtual-table]")?.toggleAttribute("hidden", matches.length === 0);
  demo.querySelector("[data-virtual-table-empty]")?.toggleAttribute("hidden", matches.length !== 0);
  const count = demo.querySelector("[data-virtual-table-count]");
  if (count) {
    count.textContent = `${matches.length} ${matches.length === 1 ? "row" : "rows"}`;
    count.setAttribute("aria-label", `${matches.length} matching ${matches.length === 1 ? "row" : "rows"}`);
  }
  syncVirtualPagination(demo, page, pageCount);
  updateVirtualSelection(demo);
}

function syncVirtualPagination(demo, page, pageCount) {
  const pagination = demo?.querySelector("[data-virtual-table-pagination]");
  if (!pagination) return;
  demo.dataset.page = String(page);
  pagination.dataset.page = String(page);
  pagination.dataset.pageCount = String(pageCount);
  pagination.querySelectorAll(".pagination__button").forEach((button) => {
    const kind = button.dataset.kind;
    const buttonPage = Number(button.dataset.page);
    const current = kind === "page" && buttonPage === page;
    button.dataset.state = current ? "selected" : "default";
    button.toggleAttribute("aria-current", current);
    if (kind === "prev") button.disabled = page <= 1;
    if (kind === "next") button.disabled = page >= pageCount;
    if (kind === "page" && buttonPage > pageCount) button.hidden = true;
    else button.hidden = false;
  });
}

function setVirtualTableStatus(demo, status = "all") {
  if (!demo) return;
  demo.dataset.status = status;
  demo.querySelectorAll("[data-virtual-table-status]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.virtualTableStatus === status));
  });
  updateVirtualTable(demo, { page: 1 });
}

function pageVirtualTable(demo, button) {
  if (!demo || button.disabled) return;
  const current = Number(demo.dataset.page || demo.querySelector("[data-virtual-table-pagination]")?.dataset.page) || 1;
  const pageCount = Number(demo.querySelector("[data-virtual-table-pagination]")?.dataset.pageCount) || 1;
  const next = button.dataset.kind === "prev"
    ? current - 1
    : button.dataset.kind === "next"
      ? current + 1
      : Number(button.dataset.page) || current;
  updateVirtualTable(demo, { page: Math.max(1, Math.min(next, pageCount)) });
}

function clearVirtualTableFilters(demo) {
  if (!demo) return;
  const input = demo.querySelector("[data-virtual-table-search] input");
  if (input) input.value = "";
  setVirtualTableStatus(demo, "all");
}

function refreshVirtualTable(demo) {
  if (!demo) return;
  const loading = demo.querySelector("[data-virtual-table-loading]");
  const table = demo.querySelector("[data-virtual-table]");
  loading?.removeAttribute("hidden");
  table?.setAttribute("hidden", "");
  window.setTimeout(() => {
    loading?.setAttribute("hidden", "");
    updateVirtualTable(demo);
  }, 650);
}

function updateVirtualSelection(demo) {
  if (!demo) return;
  const selected = [...demo.querySelectorAll("[data-virtual-table] tbody tr[data-selected='true']")]
    .filter((row) => !row.hidden && !row.classList.contains("table__detail-row"));
  const bulk = demo.querySelector("[data-virtual-table-bulk]");
  bulk?.toggleAttribute("hidden", selected.length === 0);
  const count = demo.querySelector("[data-virtual-table-selected-count]");
  if (count) {
    count.textContent = `${selected.length} selected`;
    count.setAttribute("aria-label", `${selected.length} selected ${selected.length === 1 ? "row" : "rows"}`);
  }
}

function switchAdminView(demo, view) {
  if (!demo || !view) return;
  demo.dataset.view = view;
  demo.querySelectorAll("[data-admin-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.adminPanel !== view;
  });
  demo.querySelectorAll("[data-admin-view]").forEach((button) => {
    const active = button.dataset.adminView === view;
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("button--primary", active);
    button.classList.toggle("button--secondary", !active);
  });
}
