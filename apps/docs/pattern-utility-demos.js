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

export function utilityPatternOverviewDemo(patternId) {
  if (patternId === "snackbar-provider") return snackbarProviderDemoPanel();
  if (patternId === "timeline") return timelineDemoPanel();
  if (patternId === "section-header") return sectionHeaderDemoPanel();
  if (patternId === "pull-to-refresh") return pullToRefreshDemoPanel();
  if (patternId === "avatar-group") return avatarGroupDemoPanel();
  if (patternId === "transfer-list") return transferListDemoPanel();
  if (patternId === "drag-sortable-list") return dragSortableListDemoPanel();
  if (patternId === "calendar-view") return calendarViewDemoPanel();
  return "";
}

function snackbarProviderDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-utility-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Shared feedback queue</h2>
      <div class="pattern-snackbar-demo pattern-utility-demo" data-snackbar-demo>
        <div class="pattern-snackbar-demo__actions">
          ${packageDemo("button", { label: "Save view", icon: "bookmark_added" }, { "data-snackbar-add": "save" })}
          ${packageDemo("button", { label: "Queue retry", variant: "secondary", icon: "sync" }, { "data-snackbar-add": "retry" })}
          ${packageDemo("badge", { label: "0 queued", tone: "neutral", variant: "standard" }, { "data-snackbar-count": "" })}
        </div>
        <div class="pattern-snackbar-demo__region" data-snackbar-region aria-live="polite">
          <div data-snackbar-empty>${packageDemo("empty-state", { label: "No feedback queued", description: "Trigger a product event to preview provider behavior.", icon: "notifications_none" })}</div>
          <div data-snackbar-item="save" hidden>${packageDemo("toast", { label: "View saved", description: "This dashboard view is available to your team.", tone: "success", actionLabel: "Undo" })}</div>
          <div data-snackbar-item="retry" hidden>${packageDemo("toast", { label: "Retry queued", description: "Sync will retry without blocking the task.", tone: "warning", actionLabel: "View" })}</div>
        </div>
      </div>
    </section>
  `;
}

function timelineDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-utility-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Fleet activity timeline</h2>
      <div class="pattern-timeline-demo pattern-utility-demo" data-timeline-demo>
        <div class="pattern-timeline-demo__filters">
          ${packageDemo("chip", { label: "All", selected: true }, { "data-timeline-filter": "all" })}
          ${packageDemo("chip", { label: "Warnings", removable: true }, { "data-timeline-filter": "warning" })}
          ${packageDemo("badge", { label: "3 events", tone: "neutral", variant: "standard" }, { "data-timeline-count": "" })}
        </div>
        <div class="pattern-timeline-demo__events" data-timeline-events>
          ${packageDemo("audit-event", { label: "Fuel limit changed", description: "Ana Sosa updated JMX-214-B policy.", meta: "Today 09:42 - Operations", status: "Logged", icon: "manage_history" }, { "data-timeline-event": "default" })}
          ${packageDemo("audit-event", { label: "Sync warning", description: "Vehicle KLD-901-C needs document refresh.", meta: "Today 08:10 - System", status: "Warning", icon: "warning" }, { "data-timeline-event": "warning" })}
          ${packageDemo("audit-event", { label: "Route completed", description: "Station 24 route closed with receipt attached.", meta: "Yesterday 18:22 - Driver", status: "Verified", icon: "route" }, { "data-timeline-event": "default" })}
        </div>
        <div data-timeline-empty hidden>${packageDemo("empty-state", { label: "No events match", description: "Clear filters to restore the timeline.", icon: "timeline" })}</div>
      </div>
    </section>
  `;
}

function sectionHeaderDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-utility-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Dense section entry</h2>
      <div class="pattern-section-header-demo pattern-utility-demo" data-section-header-demo>
        <header class="pattern-section-header-demo__header">
          <div>
            <span class="eyebrow">Dashboard module</span>
            <h3>Fleet exceptions</h3>
            <p>Review vehicles and cards that need attention before the next sync.</p>
          </div>
          <div class="pattern-section-header-demo__meta">
            ${packageDemo("badge", { label: "9 open", tone: "warning", variant: "standard" })}
            ${packageDemo("button", { label: "Export", variant: "secondary", icon: "download" })}
            ${packageDemo("button", { label: "Review", icon: "fact_check" })}
          </div>
        </header>
      </div>
    </section>
  `;
}

function pullToRefreshDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-utility-panel"><span class="eyebrow">Interactive demo</span><h2>Refreshable movement feed</h2>
      <div class="pattern-pull-refresh-demo pattern-utility-demo" data-pull-refresh-demo>
        ${packageDemo("button", { label: "Refresh feed", icon: "refresh" }, { "data-pull-refresh-action": "" })}
        <div data-pull-refresh-progress hidden>${packageDemo("progress-indicator", { label: "Refreshing movements", value: 72 })}</div>
        ${packageDemo("list", { label: "Recent movements", items: [{ label: "Fuel purchase", meta: "Station 24 - Today", value: "$842", icon: "local_gas_station" }, { label: "Receipt synced", meta: "Route 18 - Yesterday", value: "Done", icon: "receipt_long" }] })}
        <div data-pull-refresh-toast hidden>${packageDemo("toast", { label: "Feed refreshed", description: "Latest movements are now visible.", tone: "success" })}</div>
      </div>
    </section>`;
}

function avatarGroupDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-utility-panel"><span class="eyebrow">Interactive demo</span><h2>Accountable team group</h2>
      <div class="pattern-avatar-group-demo pattern-utility-demo" data-avatar-group-demo>
        <div class="pattern-avatar-group-demo__stack">
          ${packageDemo("avatar", { name: "Ana Sosa", status: "online" })}
          ${packageDemo("avatar", { name: "Luis Vera", status: "away" })}
          ${packageDemo("avatar", { name: "Iris Mora", status: "none" })}
          ${packageDemo("badge", { label: "+4", tone: "neutral", variant: "count", ariaLabel: "4 more team members" })}
          ${packageDemo("button", { label: "Show team", variant: "secondary", icon: "groups" }, { "data-avatar-group-toggle": "" })}
        </div>
        <div data-avatar-group-detail hidden>${packageDemo("list", { label: "Team members", items: [{ label: "Ana Sosa", meta: "Owner", value: "Online", icon: "person" }, { label: "Luis Vera", meta: "Approver", value: "Away", icon: "person" }, { label: "4 hidden members", meta: "Permission limited", value: "Private", icon: "lock" }] })}</div>
      </div>
    </section>`;
}

function transferListDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-utility-panel"><span class="eyebrow">Interactive demo</span><h2>Assign vehicles to policy</h2>
      <div class="pattern-transfer-list-demo pattern-utility-demo" data-transfer-demo>
        ${packageDemo("input", { label: "Search available", placeholder: "Vehicle or driver" }, { "data-transfer-search": "" })}
        <div class="pattern-transfer-list-demo__panes">
          <div><h3>Available</h3><div data-transfer-available>${packageDemo("list", { label: "Available vehicles", interactive: true, items: [{ label: "JMX-214-B", meta: "Ana Sosa", value: "Move", icon: "directions_car" }, { label: "KLD-901-C", meta: "Luis Vera", value: "Move", icon: "directions_car" }] })}</div></div>
          <div><h3>Selected</h3><div data-transfer-selected>${packageDemo("empty-state", { label: "No vehicles selected", description: "Move vehicles into the policy before saving.", icon: "playlist_add" })}</div></div>
        </div>
        <footer>${packageDemo("button", { label: "Move selected", icon: "arrow_forward" }, { "data-transfer-move": "" })}${packageDemo("badge", { label: "0 selected", tone: "neutral", variant: "standard" }, { "data-transfer-count": "" })}</footer>
      </div>
    </section>`;
}

function dragSortableListDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-utility-panel"><span class="eyebrow">Interactive demo</span><h2>Dashboard module order</h2>
      <div class="pattern-sortable-demo pattern-utility-demo" data-sortable-demo>
        ${packageDemo("motion-boundary", { label: "Dashboard order", state: "ready" })}
        <ol class="pattern-sortable-demo__list" data-sortable-list>
          <li data-sortable-item="Spend overview">Spend overview ${packageDemo("button", { label: "Move down", variant: "secondary", icon: "arrow_downward" }, { "data-sortable-down": "" })}</li>
          <li data-sortable-item="Exceptions">Exceptions ${packageDemo("button", { label: "Move up", variant: "secondary", icon: "arrow_upward" }, { "data-sortable-up": "" })}</li>
          <li data-sortable-item="Maintenance">Maintenance ${packageDemo("button", { label: "Move up", variant: "secondary", icon: "arrow_upward" }, { "data-sortable-up": "" })}</li>
        </ol>
        <div data-sortable-toast hidden>${packageDemo("toast", { label: "Order updated", description: "Dashboard module order changed.", tone: "success" })}</div>
      </div>
    </section>`;
}

function calendarViewDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-utility-panel"><span class="eyebrow">Interactive demo</span><h2>Maintenance calendar</h2>
      <div class="pattern-calendar-demo pattern-utility-demo" data-calendar-demo>
        ${packageDemo("date-picker", { label: "Selected date", value: "2026-07-18" }, { "data-calendar-date": "" })}
        <div class="pattern-calendar-demo__events" data-calendar-events>
          ${packageDemo("list", { label: "Scheduled events", items: [{ label: "Brake inspection", meta: "JMX-214-B - 09:00", value: "Due", icon: "event" }, { label: "Policy renewal", meta: "Fleet North - 14:00", value: "Review", icon: "event_available" }] })}
        </div>
        ${packageDemo("button", { label: "Review schedule", icon: "calendar_month" }, { "data-calendar-review": "" })}
      </div>
    </section>`;
}
