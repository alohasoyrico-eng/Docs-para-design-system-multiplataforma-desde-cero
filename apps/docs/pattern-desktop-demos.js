import { html } from "./detail-tabs-core.js?v=3";
import { componentDemo } from "./component-demo.js?v=60";

function packageDemo(component, demo = {}, attrs = {}) {
  const markup = componentDemo(component, demo);
  if (!markup) return "";
  const attrText = Object.entries({ "data-pattern-component": component, ...attrs })
    .map(([key, value]) => value === "" ? key : `${key}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");
  return markup.replace(/^<([a-z0-9-]+)/i, `<$1 ${attrText}`);
}

export function desktopPatternOverviewDemo(patternId) {
  if (patternId === "kpi-card") return kpiCardDemoPanel();
  if (patternId === "chart-wrapper") return chartWrapperDemoPanel();
  if (patternId === "virtual-data-table") return virtualDataTableDemoPanel();
  if (patternId === "advanced-filters") return advancedFiltersDemoPanel();
  if (patternId === "column-configurator") return columnConfiguratorDemoPanel();
  if (patternId === "roles-and-permissions") return rolesAndPermissionsDemoPanel();
  if (patternId === "driver-and-vehicle-administration") return driverVehicleAdministrationDemoPanel();
  return "";
}

function kpiCardDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-desktop-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Dashboard KPI band</h2>
      <div class="pattern-kpi-card-demo pattern-desktop-demo" data-kpi-card-demo>
        <div class="pattern-kpi-card-demo__grid">
          ${packageDemo("kpi-tile", { label: "Fuel spend", value: "$84.2k", delta: "+12% vs last week", tone: "warning", icon: "local_gas_station" })}
          ${packageDemo("kpi-tile", { label: "Active vehicles", value: "128", delta: "4 need review", tone: "info", icon: "directions_car" })}
          ${packageDemo("kpi-tile", { label: "Policy exceptions", value: "9", delta: "3 high priority", tone: "warning", icon: "warning" })}
        </div>
        <footer>
          ${packageDemo("badge", { label: "Updated 4 min ago", tone: "neutral", variant: "standard" })}
          ${packageDemo("button", { label: "Investigate exceptions", icon: "troubleshoot" }, { "data-kpi-investigate": "" })}
        </footer>
      </div>
    </section>
  `;
}

function chartWrapperDemoPanel() {
  const rows = [
    { id: "jan", period: "Jan", spend: "$62k", variance: "+4%" },
    { id: "feb", period: "Feb", spend: "$70k", variance: "+9%" },
    { id: "mar", period: "Mar", spend: "$84k", variance: "+12%" },
  ];
  return html`
    <section class="doc-panel wide pattern-desktop-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Chart module with accessible summary</h2>
      <div class="pattern-chart-wrapper-demo pattern-desktop-demo" data-chart-wrapper-demo>
        <header class="pattern-chart-wrapper-demo__header">
          ${packageDemo("kpi-tile", { label: "Fuel trend", value: "84%", delta: "Compared with last quarter", tone: "info" })}
          <div>
            ${packageDemo("button", { label: "Export", variant: "secondary", icon: "download" }, { "data-chart-export": "" })}
          </div>
        </header>
        ${packageDemo("chart-panel", { label: "Fuel spend by period", value: "$84.2k", caption: "Last 6 periods. March is the highest visible value.", values: [32, 54, 48, 70, 62, 84] })}
        <div class="pattern-chart-wrapper-demo__summary">
          ${packageDemo("table", { label: "Chart data summary", rows, columns: [{ key: "period", label: "Period" }, { key: "spend", label: "Spend", align: "right" }, { key: "variance", label: "Variance", align: "right" }] })}
        </div>
      </div>
    </section>
  `;
}

function virtualDataTableDemoPanel() {
  const rows = [
    { id: "jmx-214-b", plate: "JMX-214-B", driver: "Ana Sosa", status: { label: "Active", tone: "success" }, region: "North", spend: "$842", spendValue: 842 },
    { id: "kld-901-c", plate: "KLD-901-C", driver: "Luis Vera", status: { label: "Review", tone: "warning" }, region: "North", spend: "$631", spendValue: 631 },
    { id: "mtr-330-a", plate: "MTR-330-A", driver: "Iris Mora", status: { label: "Frozen", tone: "danger" }, region: "Central", spend: "$120", spendValue: 120 },
    { id: "pzn-118-d", plate: "PZN-118-D", driver: "Noe Ruiz", status: { label: "Active", tone: "success" }, region: "West", spend: "$410", spendValue: 410 },
    { id: "hjm-402-e", plate: "HJM-402-E", driver: "Mar Vega", status: { label: "Active", tone: "success" }, region: "North", spend: "$720", spendValue: 720 },
    { id: "qra-775-f", plate: "QRA-775-F", driver: "Rafa Leon", status: { label: "Review", tone: "warning" }, region: "South", spend: "$508", spendValue: 508 },
    { id: "lpa-009-g", plate: "LPA-009-G", driver: "Sofia Rios", status: { label: "Active", tone: "success" }, region: "Central", spend: "$299", spendValue: 299 },
    { id: "vtc-660-h", plate: "VTC-660-H", driver: "Bruno Diaz", status: { label: "Frozen", tone: "danger" }, region: "West", spend: "$86", spendValue: 86 },
  ];
  return html`
    <section class="doc-panel wide pattern-desktop-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Operational data table</h2>
      <div class="pattern-virtual-table-demo pattern-desktop-demo" data-virtual-table-demo data-page="1" data-page-size="5" data-status="all">
        <div class="pattern-virtual-table-demo__toolbar">
          ${packageDemo("input", { label: "Search vehicles", placeholder: "Plate, driver, or status" }, { "data-virtual-table-search": "" })}
          <div class="pattern-virtual-table-demo__actions" aria-label="Table actions">
            ${packageDemo("button", { label: "Refresh", variant: "secondary", icon: "sync" }, { "data-virtual-table-refresh": "" })}
            ${packageDemo("button", { label: "Export", variant: "secondary", icon: "download" }, { "data-virtual-table-export": "" })}
          </div>
        </div>
        <div class="pattern-virtual-table-demo__filters" aria-label="Status filters">
          ${packageDemo("button", { label: "All", variant: "secondary" }, { "data-virtual-table-status": "all", "aria-pressed": "true" })}
          ${packageDemo("button", { label: "Active", variant: "secondary" }, { "data-virtual-table-status": "active", "aria-pressed": "false" })}
          ${packageDemo("button", { label: "Review", variant: "secondary" }, { "data-virtual-table-status": "review", "aria-pressed": "false" })}
          ${packageDemo("button", { label: "Frozen", variant: "secondary" }, { "data-virtual-table-status": "frozen", "aria-pressed": "false" })}
        </div>
        <div class="pattern-virtual-table-demo__bulk" data-virtual-table-bulk hidden>
          ${packageDemo("badge", { label: "0 selected", tone: "neutral", variant: "standard", ariaLabel: "0 selected rows" }, { "data-virtual-table-selected-count": "" })}
          ${packageDemo("button", { label: "Open selected", variant: "secondary", icon: "open_in_new" }, { "data-virtual-table-open": "" })}
          ${packageDemo("button", { label: "Mark review", icon: "fact_check" }, { "data-virtual-table-review": "" })}
        </div>
        <div data-virtual-table-loading hidden>
          ${packageDemo("skeleton", { label: "Loading vehicle operations", variant: "table", rows: 5, columns: 5, fullWidth: true })}
        </div>
        <div data-virtual-table-error hidden>
          ${packageDemo("error-panel", { label: "Unable to load vehicle operations", description: "Keep the current rows visible and try syncing again.", action: { label: "Retry", variant: "secondary" } })}
        </div>
        <div data-virtual-table-empty hidden>
          ${packageDemo("empty-state", { title: "No vehicles match", description: "Adjust search or status filters to recover the table.", icon: "search_off", action: { label: "Clear filters", variant: "secondary" } }, { "data-virtual-table-clear": "" })}
        </div>
        ${packageDemo("table", {
          label: "Vehicle operations",
          rows,
          variant: "selectable",
          density: "sm",
          sortKey: "plate",
          columns: [
            { key: "plate", label: "Plate", mono: true, sortable: true, priority: "primary" },
            { key: "driver", label: "Driver", sortable: true, priority: "secondary" },
            { key: "status", label: "Status", priority: "secondary" },
            { key: "region", label: "Region", sortable: true, priority: "tertiary" },
            { key: "spend", label: "Spend", mono: true, align: "right", sortable: true, sortValue: (row) => row.spendValue ?? 0, priority: "tertiary" },
          ],
        }, { "data-virtual-table": "" })}
        <footer>
          ${packageDemo("badge", { label: "8 rows", tone: "neutral", variant: "standard", ariaLabel: "8 visible rows" }, { "data-virtual-table-count": "" })}
          ${packageDemo("pagination", { page: 1, pageCount: 2, label: "Vehicle operation pages", density: "sm" }, { "data-virtual-table-pagination": "" })}
        </footer>
      </div>
    </section>
  `;
}

function advancedFiltersDemoPanel() {
  const rows = [
    { id: "north-review", vehicle: "KLD-901-C", driver: "Luis Vera", region: "North", status: "Review", period: "2026-07-18" },
    { id: "north-active", vehicle: "JMX-214-B", driver: "Ana Sosa", region: "North", status: "Active", period: "2026-07-22" },
    { id: "central-review", vehicle: "MTR-330-A", driver: "Iris Mora", region: "Central", status: "Review", period: "2026-07-14" },
    { id: "west-frozen", vehicle: "PZN-118-D", driver: "Noe Ruiz", region: "West", status: "Frozen", period: "2026-07-08" },
  ];
  return html`
    <section class="doc-panel wide pattern-desktop-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Dashboard filter set</h2>
      <div class="pattern-advanced-filters-demo pattern-desktop-demo" data-advanced-filters-demo data-applied="false">
        <div class="pattern-advanced-filters-demo__controls">
          ${packageDemo("select", { label: "Region", value: "all", options: [{ label: "All regions", value: "all" }, { label: "North", value: "North" }, { label: "Central", value: "Central" }, { label: "West", value: "West" }] }, { "data-advanced-filter": "region" })}
          ${packageDemo("select", { label: "Status", value: "all", options: [{ label: "All status", value: "all" }, { label: "Active", value: "Active" }, { label: "Needs review", value: "Review" }, { label: "Frozen", value: "Frozen" }] }, { "data-advanced-filter": "status" })}
          ${packageDemo("date-picker", { label: "Since", value: "2026-07-01", helper: "Applied to operation date" }, { "data-advanced-filter": "period" })}
          ${packageDemo("input", { label: "Keyword", placeholder: "Driver, vehicle, station" }, { "data-advanced-filter": "keyword" })}
        </div>
        <div class="pattern-advanced-filters-demo__chips" data-advanced-filter-chips aria-label="Applied filters">
          ${packageDemo("chip", { label: "Region: All", selected: true, removable: true }, { "data-advanced-filter-chip": "region", hidden: "" })}
          ${packageDemo("chip", { label: "Status: All", selected: true, removable: true }, { "data-advanced-filter-chip": "status", hidden: "" })}
          ${packageDemo("chip", { label: "Since: 2026-07-01", selected: true, removable: true }, { "data-advanced-filter-chip": "period", hidden: "" })}
          ${packageDemo("chip", { label: "Keyword", selected: true, removable: true }, { "data-advanced-filter-chip": "keyword", hidden: "" })}
          ${packageDemo("badge", { label: "0 active", tone: "neutral", variant: "standard", ariaLabel: "0 active filters" }, { "data-advanced-filter-count": "" })}
        </div>
        <div class="pattern-advanced-filters-demo__results" data-advanced-filter-results>
          ${packageDemo("table", {
            label: "Filtered operations",
            rows,
            density: "sm",
            columns: [
              { key: "vehicle", label: "Vehicle", mono: true, priority: "primary" },
              { key: "driver", label: "Driver", priority: "secondary" },
              { key: "region", label: "Region", priority: "tertiary" },
              { key: "status", label: "Status", priority: "secondary" },
              { key: "period", label: "Date", mono: true, priority: "tertiary" },
            ],
          }, { "data-advanced-filter-table": "" })}
          <div data-advanced-filter-empty hidden>
            ${packageDemo("empty-state", { title: "No operations match", description: "Adjust filters or reset the view.", icon: "filter_alt_off", action: { label: "Reset filters", variant: "secondary" } }, { "data-advanced-filter-reset": "" })}
          </div>
        </div>
        <footer>
          ${packageDemo("button", { label: "Reset", variant: "secondary" }, { "data-advanced-filter-reset": "" })}
          ${packageDemo("button", { label: "Apply filters", icon: "filter_alt" }, { "data-advanced-filter-apply": "" })}
        </footer>
        <div data-advanced-filter-feedback hidden>
          ${packageDemo("inline-validation", { label: "Filters", message: "Filters applied to dashboard and table modules.", state: "success" })}
        </div>
      </div>
    </section>
  `;
}

function columnConfiguratorDemoPanel() {
  const rows = [
    { id: "jmx-214-b", plate: "JMX-214-B", driver: "Ana Sosa", status: { label: "Active", tone: "success" }, region: "North", spend: "$842" },
    { id: "kld-901-c", plate: "KLD-901-C", driver: "Luis Vera", status: { label: "Review", tone: "warning" }, region: "Center", spend: "$631" },
    { id: "mtr-330-a", plate: "MTR-330-A", driver: "Iris Mora", status: { label: "Frozen", tone: "danger" }, region: "West", spend: "$120" },
  ];
  const columns = [
    { key: "plate", label: "Plate", mono: true, priority: "primary" },
    { key: "driver", label: "Driver", priority: "secondary" },
    { key: "status", label: "Status", priority: "secondary" },
    { key: "region", label: "Region", priority: "tertiary" },
    { key: "spend", label: "Spend", mono: true, align: "right", priority: "tertiary" },
  ];
  return html`
    <section class="doc-panel wide pattern-desktop-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Column visibility controls</h2>
      <div class="pattern-column-config-demo pattern-desktop-demo" data-column-config-demo>
        <div class="pattern-column-config-demo__layout">
          <aside class="pattern-column-config-demo__panel" aria-label="Column controls">
            ${packageDemo("checkbox", { label: "Plate", description: "Required identity column", checked: true, state: "disabled" }, { "data-column-toggle": "plate" })}
            ${packageDemo("checkbox", { label: "Driver", description: "Assigned operator", checked: true }, { "data-column-toggle": "driver" })}
            ${packageDemo("checkbox", { label: "Status", description: "Operational state", checked: true }, { "data-column-toggle": "status" })}
            ${packageDemo("checkbox", { label: "Region", description: "Operating zone", checked: true }, { "data-column-toggle": "region" })}
            ${packageDemo("checkbox", { label: "Spend", description: "Current period spend", checked: true }, { "data-column-toggle": "spend" })}
            ${packageDemo("badge", { label: "5 visible", tone: "neutral", variant: "standard" }, { "data-column-count": "" })}
          </aside>
          <div class="pattern-column-config-demo__table">
            ${packageDemo("table", { label: "Column preview", rows, columns }, { "data-column-table": "" })}
          </div>
        </div>
        <footer>
          ${packageDemo("button", { label: "Reset", variant: "secondary" }, { "data-column-reset": "" })}
          ${packageDemo("button", { label: "Apply columns", icon: "view_column" }, { "data-column-apply": "" })}
        </footer>
        <div data-column-feedback hidden>${packageDemo("toast", { label: "Columns applied", description: "The table view was updated.", tone: "success" })}</div>
      </div>
    </section>
  `;
}

function rolesAndPermissionsDemoPanel() {
  const rows = [
    { id: "fuel", capability: "Approve fuel limits", manager: { label: "Enabled", tone: "success" }, finance: { label: "Review", tone: "warning" }, support: { label: "Blocked", tone: "danger" } },
    { id: "cards", capability: "Freeze cards", manager: { label: "Enabled", tone: "success" }, finance: { label: "Review", tone: "warning" }, support: { label: "Review", tone: "warning" } },
    { id: "roles", capability: "Manage roles", manager: { label: "Blocked", tone: "danger" }, finance: { label: "Blocked", tone: "danger" }, support: { label: "Blocked", tone: "danger" } },
  ];
  return html`
    <section class="doc-panel wide pattern-desktop-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Permission review matrix</h2>
      <div class="pattern-roles-demo pattern-desktop-demo" data-roles-demo data-dirty="false">
        <div class="pattern-roles-demo__toolbar">
          ${packageDemo("badge", { label: "3 roles", tone: "neutral", variant: "standard" })}
          ${packageDemo("button", { label: "Save review", icon: "verified_user" }, { "data-roles-save": "" })}
        </div>
        ${packageDemo("table", { label: "Role permissions", rows, columns: [{ key: "capability", label: "Capability" }, { key: "manager", label: "Manager" }, { key: "finance", label: "Finance" }, { key: "support", label: "Support" }] }, { "data-roles-table": "" })}
        <div class="pattern-roles-demo__controls">
          ${packageDemo("switch", { label: "Manager can approve fuel limits", checked: true }, { "data-role-control": "fuel-manager" })}
          ${packageDemo("checkbox", { label: "Require finance review for card freeze", checked: true }, { "data-role-control": "card-finance-review" })}
          ${packageDemo("checkbox", { label: "Allow support to freeze cards", checked: false }, { "data-role-control": "card-support-freeze" })}
          <div data-roles-validation hidden>${packageDemo("inline-validation", { label: "Owner approval required", message: "Sensitive permission changes remain pending until an admin owner approves them.", state: "warning" })}</div>
        </div>
        ${packageDemo("audit-event", { label: "Permission review ready", description: "No unpublished permission changes.", meta: "Fleet admin", status: "Current", icon: "admin_panel_settings" }, { "data-roles-audit": "" })}
        <div data-roles-toast hidden>${packageDemo("toast", { label: "Permissions saved", description: "Role changes were logged for audit.", tone: "success" })}</div>
      </div>
    </section>
  `;
}

function driverVehicleAdministrationDemoPanel() {
  const driverRows = [
    { id: "ana", name: "Ana Sosa", status: "Active", vehicle: "JMX-214-B", action: "Suspend" },
    { id: "luis", name: "Luis Vera", status: "Review", vehicle: "KLD-901-C", action: "Edit" },
    { id: "iris", name: "Iris Mora", status: "Suspended", vehicle: "Unassigned", action: "Recover" },
  ];
  const vehicleRows = [
    { id: "jmx-214-b", plate: "JMX-214-B", status: "Active", driver: "Ana Sosa", action: "Assign" },
    { id: "kld-901-c", plate: "KLD-901-C", status: "Review", driver: "Luis Vera", action: "Documents" },
    { id: "mtr-330-a", plate: "MTR-330-A", status: "Maintenance", driver: "Unassigned", action: "Recover" },
  ];
  return html`
    <section class="doc-panel wide pattern-desktop-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Driver and vehicle lifecycle</h2>
      <div class="pattern-admin-demo pattern-desktop-demo" data-admin-demo data-view="drivers">
        <div class="pattern-admin-demo__switcher">
          ${packageDemo("button", { label: "Drivers", icon: "badge" }, { "data-admin-view": "drivers", "aria-pressed": "true" })}
          ${packageDemo("button", { label: "Vehicles", variant: "secondary", icon: "directions_car" }, { "data-admin-view": "vehicles", "aria-pressed": "false" })}
        </div>
        <div data-admin-panel="drivers">
          <div class="pattern-admin-demo__summary">
            ${packageDemo("avatar", { name: "Ana Sosa", status: "online" })}
            ${packageDemo("badge", { label: "Active", tone: "success", variant: "standard" })}
            ${packageDemo("quick-action", { label: "Invite", icon: "person_add" })}
          </div>
          ${packageDemo("table", { label: "Drivers", rows: driverRows, columns: [{ key: "name", label: "Driver", sortable: true }, { key: "status", label: "Status" }, { key: "vehicle", label: "Vehicle" }, { key: "action", label: "Action" }] })}
        </div>
        <div data-admin-panel="vehicles" hidden>
          ${packageDemo("card-summary", { label: "JMX-214-B", meta: "Assigned to Ana Sosa", number: "Vehicle card", available: "Active", limit: "Docs OK", status: "Ready" })}
          ${packageDemo("table", { label: "Vehicles", rows: vehicleRows, columns: [{ key: "plate", label: "Plate", sortable: true, mono: true }, { key: "status", label: "Status" }, { key: "driver", label: "Driver" }, { key: "action", label: "Action" }] })}
        </div>
        <footer>
          ${packageDemo("pagination", { page: 1, pageCount: 3 })}
          ${packageDemo("button", { label: "Export view", variant: "secondary", icon: "download" })}
        </footer>
        ${packageDemo("audit-event", { label: "Lifecycle action logged", description: "Driver recovery request created for Iris Mora.", meta: "Today 10:15 - Operations", status: "Logged", icon: "manage_history" })}
      </div>
    </section>
  `;
}
