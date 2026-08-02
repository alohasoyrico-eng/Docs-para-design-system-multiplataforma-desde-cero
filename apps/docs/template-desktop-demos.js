import { html, slug } from "./detail-tabs-core.js?v=3";
import { componentDemo } from "./component-demo.js?v=60";
import { renderSidebarPattern, renderTopbarPattern } from "./pattern-shell-renderers.js?v=6";
import { renderAdminRiskReviewPattern, renderDriverVehicleAdministrationPattern, renderRolesAndPermissionsPattern, renderRolesAndPermissionsToolbar } from "./pattern-business-renderers.js?v=5";

const templateFoundations = "energy frame voice depth momentum state tone growth symbol iconography accessibility";

function packageDemo(component, demo = {}, attrs = {}) {
  const markup = componentDemo(component, demo);
  if (!markup) return "";
  const attrText = Object.entries({ "data-template-component": component, ...attrs })
    .map(([key, value]) => value === "" ? key : `${key}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");
  return markup.replace(/^<([a-z0-9-]+)/i, `<$1 ${attrText}`);
}

function patternAttr(name) {
  return `data-template-pattern="${slug(name)}"`;
}

function patternBadges(patterns = []) {
  return html`
    <div class="template-desktop-patterns" aria-label="Patterns consumed">
      ${patterns.map((pattern) => packageDemo("badge", { label: pattern, tone: "neutral", variant: "standard" }, { "data-template-pattern-badge": slug(pattern) })).join("")}
    </div>
  `;
}

function templateModuleCard({ title, detail, status = "", pattern, attrs = {}, body = "" }) {
  return packageDemo("card", { title, detail, status }, { "data-template-module-card": "", "data-template-pattern": slug(pattern), ...attrs })
    .replace("</article>", `<div class="template-module-content">${body}</div></article>`);
}

function navPatternFor(item) {
  const patterns = {
    overview: "Fleet Dashboard Overview",
    combustible: "Fuel Dashboard",
    fuel: "Fuel Dashboard",
    mantenimiento: "Maintenance Dashboard",
    maintenance: "Maintenance Dashboard",
    ev: "Electromobility Dashboard",
    peaje: "Toll Dashboard",
    fleet: "Fleet Dashboard",
    flotilla: "Fleet Dashboard",
    finanzas: "Finance Dashboard",
    config: "Roles and Permissions",
    roles: "Roles and Permissions",
    drivers: "Driver and Vehicle Administration",
    vehicles: "Driver and Vehicle Administration",
    audit: "Roles and Permissions",
  };
  return patterns[slug(item)] ?? item;
}

export function desktopTemplateDemo(entry, blueprint) {
  if (entry.id === "fleet-manager-desktop") return fleetManagerDesktopDemo(entry, blueprint);
  if (entry.id === "fleet-dashboard-suite") return dashboardSuiteDemo(entry, blueprint);
  if (entry.id === "configuration-console") return configurationConsoleDemo(entry, blueprint);
  return "";
}

function templateShell(entry, blueprint, body) {
  const frame = templateDesktopFrame(entry, blueprint, body);
  const patterns = entry.patternsUsed ?? [];
  return html`
    <section class="doc-panel wide template-desktop-panel">
      <div class="template-desktop-panel__header">
        <div>
          <span class="eyebrow">Product demo</span>
          <h2>${entry.title}</h2>
        </div>
        ${packageDemo("button", { label: "Open full screen", icon: "open_in_full" }, { "data-template-fullscreen-open": "" })}
      </div>
      ${patternBadges(patterns)}
      <div class="template-desktop-preview">
        ${frame}
      </div>
      <div class="template-desktop-fullscreen" data-template-fullscreen hidden role="dialog" aria-modal="true" aria-label="${entry.title} full screen demo">
        <header class="template-desktop-fullscreen__bar">
          <strong>${entry.title}</strong>
          ${packageDemo("button", { label: "Close", variant: "secondary", icon: "close" }, { "data-template-fullscreen-close": "" })}
        </header>
        <div class="template-desktop-fullscreen__canvas">
          ${frame}
        </div>
      </div>
    </section>
  `;
}

function templateDesktopFrame(entry, blueprint, body) {
  return html`
    <div class="template-desktop-demo" data-template-desktop="${entry.id}" data-template-foundations="${templateFoundations}">
      ${renderTopbarPattern({ packageDemo })}
      <div class="template-desktop-demo__body">
        ${renderSidebarPattern({ title: entry.title, nav: blueprint.nav, packageDemo, navPatternFor })}
        <div class="template-desktop-demo__workspace">
          ${body}
        </div>
      </div>
    </div>
  `;
}

function fleetManagerDesktopDemo(entry, blueprint) {
  const rows = [
    { id: "fuel", exception: "Fuel limit spike", owner: "Ana Sosa", severity: "High", age: "18 min" },
    { id: "docs", exception: "Vehicle docs expired", owner: "Luis Vera", severity: "Review", age: "2 h" },
    { id: "route", exception: "Route variance", owner: "Iris Mora", severity: "Medium", age: "4 h" },
  ];
  return templateShell(entry, blueprint, html`
    <div class="template-desktop-demo__filters" ${patternAttr("Fleet Dashboard Overview")}>
      ${packageDemo("segmented-control", { selectedKey: "week", items: [{ key: "today", label: "Today" }, { key: "week", label: "Week" }, { key: "month", label: "Month" }] })}
      ${packageDemo("select", { label: "Cost center", value: "north", options: [{ label: "North", value: "north" }, { label: "Central", value: "central" }, { label: "All", value: "all" }] })}
      ${packageDemo("badge", { label: "Scope: North", tone: "neutral", variant: "standard" }, { "data-template-scope": "" })}
    </div>
    <section class="template-desktop-demo__kpis" ${patternAttr("Fleet Dashboard Overview")}>
      ${packageDemo("kpi-tile", { label: "Fleet health", value: "93%", delta: "18 open exceptions", tone: "info", icon: "monitoring" })}
      ${packageDemo("kpi-tile", { label: "Fuel spend", value: "$84.2k", delta: "+12% vs last week", tone: "warning", icon: "local_gas_station" })}
      ${packageDemo("kpi-tile", { label: "Vehicles ready", value: "128", delta: "4 need review", tone: "success", icon: "directions_car" })}
    </section>
    <section class="template-desktop-demo__grid">
      ${templateModuleCard({
        title: "Exception inbox",
        detail: "Open operational exceptions with owner, severity, and age.",
        status: "3 open",
        pattern: "Fleet Dashboard Overview",
        body: html`
        ${packageDemo("table", { label: "Open exceptions", rows, columns: [{ key: "exception", label: "Exception" }, { key: "owner", label: "Owner" }, { key: "severity", label: "Severity" }, { key: "age", label: "Age" }] }, { "data-template-table": "" })}
        `,
      })}
      ${templateModuleCard({
        title: "Activity timeline",
        detail: "Recent configuration and exception actions with auditable evidence.",
        status: "Logged",
        pattern: "Roles and Permissions",
        body: html`
        ${packageDemo("audit-event", { label: "Fuel limit changed", description: "North fleet policy updated for JMX-214-B.", meta: "Today 09:42 - Operations", status: "Logged", icon: "manage_history" })}
        ${packageDemo("audit-event", { label: "Exception assigned", description: "Route variance sent to Luis Vera.", meta: "Today 08:10 - Fleet ops", status: "Review", icon: "assignment_ind" })}
        `,
      })}
    </section>
    <div data-template-feedback hidden>${packageDemo("toast", { label: "Dashboard exported", description: "Current scope and filters were included.", tone: "success" })}</div>
  `);
}

function dashboardSuiteDemo(entry, blueprint) {
  const domains = ["overview", "combustible", "mantenimiento", "ev", "peaje", "finanzas"];
  const rows = [
    { id: "north", domain: "North", metric: "Fuel spend", value: "$84.2k", trend: "+12%" },
    { id: "ev", domain: "EV", metric: "Charging use", value: "72%", trend: "+8%" },
    { id: "toll", domain: "Toll", metric: "Reconciliation", value: "96%", trend: "Stable" },
  ];
  return templateShell(entry, blueprint, html`
    <div class="template-desktop-demo__filters" ${patternAttr("Fleet Dashboard Overview")}>
      ${packageDemo("date-picker", { label: "Period", value: "2026-07-15" })}
      ${packageDemo("select", { label: "Fleet segment", value: "all", options: [{ label: "All segments", value: "all" }, { label: "EV", value: "ev" }, { label: "Heavy duty", value: "heavy" }] })}
      ${packageDemo("button", { label: "Apply filters", icon: "filter_alt" }, { "data-template-apply": "" })}
    </div>
    <nav class="template-dashboard-switcher" ${patternAttr("Fleet Dashboard Overview")} aria-label="Dashboard domains">
      ${domains.map((domain, index) => packageDemo("button", { label: domain, variant: index === 0 ? "primary" : "secondary" }, { "data-dashboard-domain": domain, "data-template-pattern": slug(navPatternFor(domain)), "aria-pressed": String(index === 0) })).join("")}
    </nav>
    <section class="template-desktop-demo__kpis" ${patternAttr("Fleet Dashboard Overview")} data-dashboard-kpis>
      ${packageDemo("kpi-tile", { label: "Monthly spend", value: "$1.8M", delta: "7 dashboards", tone: "info", icon: "monitoring" })}
      ${packageDemo("kpi-tile", { label: "Thresholds", value: "14", delta: "3 high priority", tone: "warning", icon: "rule" })}
      ${packageDemo("kpi-tile", { label: "Exports ready", value: "6", delta: "Finance visible", tone: "success", icon: "download_done" })}
    </section>
    <section class="template-desktop-demo__grid">
      ${templateModuleCard({
        title: "Overview drill-down",
        detail: "Current domain trend with accessible summary and shared dashboard scope.",
        status: "Live",
        pattern: "Fleet Dashboard Overview",
        attrs: { "data-dashboard-title-card": "" },
        body: html`
        <h3 data-dashboard-title hidden>Overview drill-down</h3>
        ${packageDemo("chart-panel", { label: "Domain trend", value: "$1.8M", caption: "Current filters apply to every dashboard.", values: [42, 48, 62, 56, 78, 84] })}
        `,
      })}
      ${templateModuleCard({
        title: "Evidence table",
        detail: "Dashboard evidence for finance review and export readiness.",
        status: "Finance",
        pattern: "Finance Dashboard",
        body: html`
        ${packageDemo("table", { label: "Dashboard evidence", rows, columns: [{ key: "domain", label: "Domain" }, { key: "metric", label: "Metric" }, { key: "value", label: "Value" }, { key: "trend", label: "Trend" }] })}
        `,
      })}
    </section>
    <div data-template-feedback hidden>${packageDemo("toast", { label: "Filters applied", description: "Dashboard scope is shared across domains.", tone: "success" })}</div>
  `);
}

function configurationConsoleDemo(entry, blueprint) {
  const roleRows = [
    { id: "manager", role: "Fleet manager", permissions: "18 enabled", review: "2 warnings" },
    { id: "finance", role: "Finance reviewer", permissions: "12 enabled", review: "Export gated" },
    { id: "support", role: "Support", permissions: "8 enabled", review: "No risky actions" },
  ];
  const driverRows = [
    { id: "ana", driver: "Ana Sosa", status: "Active", vehicle: "JMX-214-B" },
    { id: "luis", driver: "Luis Vera", status: "Review", vehicle: "KLD-901-C" },
    { id: "iris", driver: "Iris Mora", status: "Suspended", vehicle: "Unassigned" },
  ];
  const vehicleRows = [
    { id: "jmx", vehicle: "JMX-214-B", status: "Active", driver: "Ana Sosa", docs: "Ready" },
    { id: "kld", vehicle: "KLD-901-C", status: "Review", driver: "Luis Vera", docs: "Expires soon" },
    { id: "mtr", vehicle: "MTR-330-A", status: "Blocked", driver: "Unassigned", docs: "Missing" },
  ];
  return templateShell(entry, blueprint, html`
    <section class="template-config-status" data-config-status>
      ${packageDemo("kpi-tile", { label: "Pending changes", value: "24", delta: "2 approval gates", tone: "warning", icon: "pending_actions" }, { "data-config-kpi": "pending" })}
      ${packageDemo("kpi-tile", { label: "Roles", value: "6", delta: "3 admin profiles", tone: "info", icon: "admin_panel_settings" })}
      ${packageDemo("kpi-tile", { label: "Lifecycle blockers", value: "4", delta: "Drivers and vehicles", tone: "warning", icon: "warning" }, { "data-config-kpi": "blockers" })}
    </section>
    ${renderRolesAndPermissionsToolbar({ packageDemo })}
    <div data-config-permission-message hidden>
      ${packageDemo("error-panel", { label: "Audit viewer mode", description: "Audit viewers can inspect evidence but cannot save permission or lifecycle changes.", actionLabel: "Switch role", state: "warning" })}
    </div>
    <section class="template-desktop-demo__grid" data-config-panel-grid>
      ${renderRolesAndPermissionsPattern({ packageDemo, rows: roleRows })}
      ${renderDriverVehicleAdministrationPattern({ packageDemo, driverRows, vehicleRows })}
    </section>
    ${renderAdminRiskReviewPattern({ packageDemo })}
    <div data-template-feedback hidden>${packageDemo("toast", { label: "Review saved", description: "Admin changes were logged for audit.", tone: "success" })}</div>
  `);
}
