import { createBadge } from "#design-system/components";

const PERMISSION_COLUMNS = ["capability", "manager", "finance", "support"];
const CONTROL_RULES = {
  "fuel-manager": {
    cell: ["Approve fuel limits", "manager"],
    on: { label: "Enabled", tone: "success" },
    off: { label: "Blocked", tone: "danger" },
  },
  "card-finance-review": {
    cell: ["Freeze cards", "finance"],
    on: { label: "Review", tone: "warning" },
    off: { label: "Enabled", tone: "success" },
    warningWhenOff: true,
  },
  "card-support-freeze": {
    cell: ["Freeze cards", "support"],
    on: { label: "Enabled", tone: "success" },
    off: { label: "Review", tone: "warning" },
    warningWhenOn: true,
  },
};

export function setupRolesAndPermissions(root = document) {
  root.querySelectorAll("[data-roles-demo]:not([data-roles-ready='true'])").forEach((demo) => {
    demo.dataset.rolesReady = "true";
    annotateRolesTable(demo);
    syncRolesMatrix(demo, { dirty: false });
  });
}

export function markRolesDirty(demo) {
  syncRolesMatrix(demo, { dirty: true });
}

export function saveRolesReview(demo) {
  if (!demo) return;
  syncRolesMatrix(demo, { dirty: false });
  demo.querySelector("[data-roles-validation]")?.setAttribute("hidden", "");
  demo.querySelector("[data-roles-toast]")?.removeAttribute("hidden");
  updateAuditEvent(demo, {
    label: "Permissions saved",
    description: "Changed permission states were logged for audit.",
    status: "Saved",
  });
}

function syncRolesMatrix(demo, { dirty }) {
  if (!demo) return;
  annotateRolesTable(demo);
  let needsApproval = false;
  Object.entries(CONTROL_RULES).forEach(([key, rule]) => {
    const input = demo.querySelector(`[data-role-control="${key}"] input`);
    const checked = Boolean(input?.checked);
    const next = checked ? rule.on : rule.off;
    renderRoleBadge(findRoleCell(demo, rule.cell[0], rule.cell[1]), next);
    needsApproval ||= Boolean((rule.warningWhenOn && checked) || (rule.warningWhenOff && !checked));
  });
  demo.dataset.dirty = String(dirty);
  demo.querySelector("[data-roles-validation]")?.toggleAttribute("hidden", !needsApproval);
  if (dirty) {
    demo.querySelector("[data-roles-toast]")?.setAttribute("hidden", "");
    updateAuditEvent(demo, {
      label: "Permission review pending",
      description: needsApproval ? "Sensitive changes need owner approval before save." : "Permission changes are ready to save.",
      status: "Pending save",
      state: needsApproval ? "warning" : "default",
      tone: needsApproval ? "warning" : "neutral",
    });
  }
}

function annotateRolesTable(demo) {
  const table = demo.querySelector("[data-roles-table] table");
  if (!table) return;
  table.querySelectorAll("thead th").forEach((header, index) => {
    header.dataset.roleColumn = PERMISSION_COLUMNS[index] ?? "";
  });
  table.querySelectorAll("tbody tr").forEach((row) => {
    const capability = row.children[0]?.textContent.trim() ?? "";
    row.dataset.capability = capability;
    [...row.children].forEach((cell, index) => {
      cell.dataset.roleColumn = PERMISSION_COLUMNS[index] ?? "";
      cell.dataset.capability = capability;
    });
  });
}

function findRoleCell(demo, capability, column) {
  return [...demo.querySelectorAll(`[data-roles-table] tbody td[data-role-column="${column}"]`)]
    .find((cell) => cell.dataset.capability === capability);
}

function renderRoleBadge(cell, state) {
  if (!cell) return;
  cell.replaceChildren(createBadge({ label: state.label, tone: state.tone, variant: "status" }));
}

function updateAuditEvent(demo, { label, description, status, state = "verified", tone = "success" }) {
  const event = demo.querySelector("[data-roles-audit][data-doc-component='audit-event'], [data-roles-audit] [data-doc-component='audit-event']");
  if (!event) return;
  event.dataset.state = state;
  event.dataset.tone = tone;
  event.querySelector("strong")?.replaceChildren(label);
  event.querySelector("p")?.replaceChildren(description);
  event.querySelector(".audit-event__meta em")?.replaceChildren(status);
}
