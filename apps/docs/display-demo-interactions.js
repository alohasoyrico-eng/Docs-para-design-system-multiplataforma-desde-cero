export function setupAccordionDemos(root = document) {
  root.querySelectorAll('[data-doc-component="accordion"]:not([data-demo-ready="true"]), .accordion-demo:not([data-demo-ready="true"])').forEach((accordion) => {
    accordion.dataset.demoReady = "true";
    const multiple = accordion.dataset.multiple === "true";
    accordion.querySelectorAll("[data-accordion-trigger]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".accordion-demo__item, [data-accordion-item]");
        const next = item?.dataset.open !== "true";
        if (!multiple) accordion.querySelectorAll(".accordion-demo__item, [data-accordion-item]").forEach((other) => {
          other.dataset.open = "false";
          other.querySelector("[data-accordion-trigger]")?.setAttribute("aria-expanded", "false");
          const panel = other.querySelector("[data-accordion-panel]");
          if (panel) panel.hidden = true;
        });
        item.dataset.open = String(next);
        trigger.setAttribute("aria-expanded", String(next));
        const panel = item.querySelector("[data-accordion-panel]");
        if (panel) panel.hidden = !next;
      });
    });
  });
}

function tableComparableValue(row, columnIndex) {
  const cell = row.children[columnIndex];
  const text = cell?.textContent?.trim() ?? "";
  const numeric = Number(text.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(numeric) && /[0-9]/.test(text) ? numeric : text.toLowerCase();
}

function tableRowsWithDetails(tbody) {
  const groups = [];
  const rows = [...tbody.querySelectorAll("tr")];
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    if (row.classList.contains("table__detail-row") || row.classList.contains("table-demo__detail")) continue;
    const detail = rows[index + 1];
    groups.push({
      row,
      detail: detail?.classList.contains("table__detail-row") || detail?.classList.contains("table-demo__detail") ? detail : null,
    });
  }
  return groups;
}

export function setupTableDemos(root = document) {
  root.querySelectorAll('[data-doc-component="table"]:not([data-demo-ready="true"]), .table-demo:not([data-demo-ready="true"])').forEach((table) => {
    table.dataset.demoReady = "true";
    table.querySelectorAll("[data-table-sort]").forEach((button) => button.addEventListener("click", () => {
      const active = button.dataset.active === "true";
      const th = button.closest("th");
      const headerRow = th?.parentElement ?? th?.parentNode;
      const columnIndex = th && headerRow ? [...(headerRow.children ?? headerRow.childNodes ?? [])].indexOf(th) : -1;
      table.querySelectorAll("[data-table-sort]").forEach((item) => {
        item.dataset.active = "false";
        item.dataset.dir = "";
        item.closest("th")?.setAttribute("aria-sort", "none");
      });
      button.dataset.active = "true";
      button.dataset.dir = active && button.dataset.dir !== "desc" ? "desc" : "asc";
      button.closest("th")?.setAttribute("aria-sort", button.dataset.dir === "desc" ? "descending" : "ascending");
      const tbody = table.querySelector("tbody");
      if (!tbody || columnIndex < 0) return;
      const direction = button.dataset.dir === "desc" ? -1 : 1;
      tableRowsWithDetails(tbody)
        .sort((a, b) => {
          const av = tableComparableValue(a.row, columnIndex);
          const bv = tableComparableValue(b.row, columnIndex);
          if (typeof av === "number" && typeof bv === "number") return (av - bv) * direction;
          return String(av).localeCompare(String(bv), "en") * direction;
        })
        .forEach(({ row, detail }) => {
          tbody.append(row);
          if (detail) tbody.append(detail);
        });
    }));
    table.querySelectorAll("tbody tr").forEach((row) => {
      if (row.classList.contains("table__detail-row") || row.classList.contains("table-demo__detail")) return;
      row.addEventListener("click", () => {
      table.querySelectorAll("tbody tr").forEach((item) => item.dataset.selected = "false");
      row.dataset.selected = "true";
      });
    });
    table.querySelectorAll("[data-table-expand], .table__expander").forEach((button) => button.addEventListener("click", (event) => {
      event.stopPropagation();
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      const detail = button.closest("tr")?.nextElementSibling;
      button.closest("tr")?.setAttribute("aria-expanded", String(!expanded));
      if (detail?.classList.contains("table-demo__detail") || detail?.classList.contains("table__detail-row")) detail.hidden = expanded;
    }));
  });
}

export function setupListDemos(root = document) {
  root.querySelectorAll('[data-doc-component="list"]:not([data-demo-ready="true"])').forEach((list) => {
    list.dataset.demoReady = "true";
    const items = [...list.querySelectorAll("button.list__item")];
    items.forEach((item) => item.addEventListener("click", () => {
      items.forEach((candidate) => {
        candidate.dataset.state = candidate.dataset.state === "disabled" ? "disabled" : "default";
        candidate.removeAttribute("aria-current");
      });
      item.dataset.state = "selected";
      item.setAttribute("aria-current", "true");
    }));
  });
}
