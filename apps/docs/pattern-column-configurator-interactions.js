const COLUMN_KEYS = ["plate", "driver", "status", "region", "spend"];
const COLUMN_LABELS = {
  plate: "Plate",
  driver: "Driver",
  status: "Status",
  region: "Region",
  spend: "Spend",
};

export function setupColumnConfigurators(root = document) {
  root.querySelectorAll("[data-column-config-demo]:not([data-column-config-ready='true'])").forEach((demo) => {
    demo.dataset.columnConfigReady = "true";
    annotateColumnTable(demo);
    applyColumnConfig(demo, { quiet: true });
  });
}

export function markColumnConfigDirty(demo) {
  if (!demo) return;
  updateColumnCount(demo);
  demo.dataset.dirty = "true";
  demo.querySelector("[data-column-feedback]")?.setAttribute("hidden", "");
}

export function applyColumnConfig(demo, options = {}) {
  if (!demo) return;
  annotateColumnTable(demo);
  const visibleKeys = new Set(getVisibleColumnKeys(demo));
  demo.querySelectorAll("[data-column-key]").forEach((node) => {
    node.hidden = !visibleKeys.has(node.dataset.columnKey);
  });
  updateColumnCount(demo);
  demo.dataset.dirty = "false";
  if (!options.quiet) demo.querySelector("[data-column-feedback]")?.removeAttribute("hidden");
}

export function resetColumnConfig(demo) {
  if (!demo) return;
  demo.querySelectorAll("[data-column-toggle] input").forEach((input) => {
    input.checked = true;
  });
  demo.querySelector("[data-column-feedback]")?.setAttribute("hidden", "");
  applyColumnConfig(demo, { quiet: true });
}

function getVisibleColumnKeys(demo) {
  return [...demo.querySelectorAll("[data-column-toggle]")]
    .filter((toggle) => {
      const input = toggle.querySelector("input");
      return input?.checked || input?.disabled;
    })
    .map((toggle) => toggle.dataset.columnToggle)
    .filter(Boolean);
}

function updateColumnCount(demo) {
  const visible = getVisibleColumnKeys(demo).length;
  const count = demo.querySelector("[data-column-count]");
  if (!count) return;
  count.textContent = `${visible} visible`;
  count.setAttribute("aria-label", `${visible} visible columns`);
}

function annotateColumnTable(demo) {
  const table = demo.querySelector("[data-column-table] table");
  if (!table) return;
  const headers = [...table.querySelectorAll("thead th")];
  headers.forEach((header, index) => {
    const label = header.textContent.trim();
    const key = COLUMN_KEYS.find((candidate) => COLUMN_LABELS[candidate] === label) ?? COLUMN_KEYS[index];
    if (key) header.dataset.columnKey = key;
  });
  table.querySelectorAll("tbody tr").forEach((row) => {
    [...row.children].forEach((cell, index) => {
      const key = headers[index]?.dataset.columnKey;
      if (key) cell.dataset.columnKey = key;
    });
  });
}
