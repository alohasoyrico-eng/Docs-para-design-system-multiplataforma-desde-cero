import { artifactFoundationTracePanel, cardLink, findComponent, html, icon, slug, teamsPanel, ui, listPanel } from "./detail-tabs-core.js?v=3";
import { componentDemo } from "./component-demo.js?v=60";
import { patternCopy } from "./docs-state.js";
import { patternBuildGatePanel } from "./pattern-build-gates.js?v=3";
import { candidatePatternOverviewDemo } from "./pattern-candidate-demos.js?v=11";
import { desktopPatternOverviewDemo } from "./pattern-desktop-demos.js?v=5";
import { mobilePatternOverviewDemo } from "./pattern-mobile-demos.js?v=6";
import { utilityPatternOverviewDemo } from "./pattern-utility-demos.js?v=1";
import { journeyPatternOverviewDemo } from "./pattern-journey-demos.js?v=1";

export function hasPatternSource(entry) {
  return Boolean(patternSource(entry));
}

export function patternContractTabs(entry) {
  const tabs = [
    [ui("tabs.overview"), `${patternContractOverview(entry)}${teamsPanel(entry)}${artifactFoundationTracePanel(entry, "Pattern")}`],
    [ui("tabs.design"), patternContractDesign(entry)],
    [ui("tabs.build"), patternContractBuild(entry)],
    [ui("tabs.miel"), patternContractMiel(entry)],
  ];
  return tabs.map(([labelText, body]) => ({ id: slug(labelText), label: labelText, body }));
}

function patternSource(entry) {
  return patternCopy?.patterns?.[entry.id] ?? null;
}

function patternContractOverview(entry) {
  const source = patternSource(entry);
  return html`
    <section class="doc-panel wide pattern-stage-panel">
      <span class="eyebrow">Pattern contract</span>
      <h2>${entry.title}</h2>
      <p>${source.purpose ?? entry.summary}</p>
      <div class="pattern-variant-grid">
        ${patternInfoCard("Use when", source.useWhen)}
        ${patternInfoCard("Review before use", source.doNotUseWithoutReview)}
      </div>
    </section>
    ${patternOverviewDemo(entry.id)}
    ${patternDependencyPanel(entry, source)}
  `;
}

function patternOverviewDemo(patternId) {
  if (patternId === "bulk-actions") return bulkActionsDemoPanel();
  if (patternId === "multi-step-form") return multiStepFormDemoPanel();
  if (patternId === "settings") return settingsDemoPanel();
  if (patternId === "help-center") return helpCenterDemoPanel();
  return candidatePatternOverviewDemo(patternId) || desktopPatternOverviewDemo(patternId) || utilityPatternOverviewDemo(patternId) || mobilePatternOverviewDemo(patternId) || journeyPatternOverviewDemo(patternId);
}

function packageDemo(component, demo = {}, attrs = {}) {
  const markup = componentDemo(component, demo);
  if (!markup) return "";
  const attrText = Object.entries({ "data-pattern-component": component, ...attrs })
    .map(([key, value]) => value === "" ? key : `${key}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");
  return markup.replace(/^<([a-z0-9-]+)/i, `<$1 ${attrText}`);
}

function bulkActionsDemoPanel() {
  const rows = [
    { id: "jmx-214-b", plate: "JMX-214-B", driver: "Ana Sosa", status: "Active", spend: "$842" },
    { id: "kld-901-c", plate: "KLD-901-C", driver: "Luis Vera", status: "Review", spend: "$631" },
    { id: "mtr-330-a", plate: "MTR-330-A", driver: "Iris Mora", status: "Frozen", spend: "$120" },
  ];
  return html`
    <section class="doc-panel wide pattern-bulk-demo-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Bulk action selection</h2>
      <div class="pattern-bulk-demo" data-pattern-bulk-actions data-selected-count="0">
        <div class="pattern-bulk-demo__toolbar" data-bulk-toolbar hidden>
          <strong><span data-bulk-count>0</span> selected</strong>
          <div>
            ${packageDemo("button", { label: "Export", variant: "secondary", icon: "download" }, { "data-bulk-action": "export" })}
            ${packageDemo("button", { label: "Mark review", icon: "fact_check" }, { "data-bulk-action": "review" })}
            ${packageDemo("button", { label: "Freeze", intent: "danger", icon: "block" }, { "data-bulk-action": "freeze" })}
          </div>
        </div>
        <div class="pattern-bulk-demo__selection">
          ${packageDemo("checkbox", { label: "Select all visible vehicles", value: "all" }, { "data-bulk-select-all-control": "" })}
          <div class="pattern-bulk-demo__selection-list" aria-label="Selectable vehicles">
            ${rows.map((row) => packageDemo("checkbox", {
              label: row.plate,
              description: `${row.driver} - ${row.status}`,
              value: row.id,
            }, {
              "data-bulk-item-control": "",
              "data-bulk-id": row.id,
            })).join("")}
          </div>
        </div>
        ${packageDemo("table", { label: "Selected vehicle context", rows, selectedKey: "" }, { "data-bulk-table": "" })}
        <div data-bulk-dialog hidden>
          ${packageDemo("dialog", {
            label: "Freeze selected vehicles?",
            description: "This action affects selected vehicles and requires an audit trail.",
            trigger: "Freeze selected",
            tone: "danger",
            primaryLabel: "Freeze vehicles",
            actions: [{ label: "Freeze vehicles", intent: "danger", key: "confirm" }, { label: "Cancel", variant: "secondary", key: "cancel" }],
          }, { "data-pattern-dialog": "bulk" })}
        </div>
        <div data-bulk-toast hidden>
          ${packageDemo("toast", { label: "Bulk action queued", description: "Selected vehicles are being processed.", tone: "success" }, { "data-pattern-toast": "bulk" })}
        </div>
      </div>
    </section>
  `;
}

function multiStepFormDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-multi-step-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Vehicle request wizard</h2>
      <div class="pattern-multi-step" data-multi-step-demo data-step-index="0">
        <div data-stepper>${packageDemo("stepper", { current: 0, steps: [{ label: "Vehicle", description: "Basic data" }, { label: "Limit", description: "Policy" }, { label: "Review", description: "Submit" }] })}</div>
        <div class="pattern-multi-step__body">
          <form class="pattern-multi-step__form" data-step-panel="0" novalidate>
            ${packageDemo("input", { label: "Plate", value: "JMX-214-B" }, { "data-step-field": "plate" })}
            ${packageDemo("input", { label: "Driver", value: "Ana Sosa" }, { "data-step-field": "driver" })}
          </form>
          <form class="pattern-multi-step__form" data-step-panel="1" hidden novalidate>
            ${packageDemo("input", { label: "Monthly limit", value: "850", type: "number" }, { "data-step-field": "limit" })}
            ${packageDemo("input", { label: "Policy owner", value: "Fleet ops" }, { "data-step-field": "owner" })}
          </form>
          <div class="pattern-multi-step__review" data-step-panel="2" hidden>
            <article><span>Vehicle</span><strong data-step-summary="plate">JMX-214-B</strong></article>
            <article><span>Driver</span><strong data-step-summary="driver">Ana Sosa</strong></article>
            <article><span>Monthly limit</span><strong data-step-summary="limit">$850</strong></article>
            <article><span>Owner</span><strong data-step-summary="owner">Fleet ops</strong></article>
          </div>
          <p class="pattern-multi-step__error" data-step-error hidden role="alert">Complete the current step before continuing.</p>
        </div>
        <footer class="pattern-multi-step__actions">
          ${packageDemo("button", { label: "Save draft", variant: "secondary", icon: "save" }, { "data-step-save": "" })}
          <div>
            ${packageDemo("button", { label: "Back", variant: "secondary" }, { "data-step-prev": "", hidden: "" })}
            ${packageDemo("button", { label: "Continue" }, { "data-step-next": "" })}
          </div>
        </footer>
        <div data-step-toast hidden>
          ${packageDemo("toast", { label: "Draft saved", description: "Progress is available for resume.", tone: "success" }, { "data-pattern-toast": "multi-step" })}
        </div>
      </div>
    </section>
  `;
}

function settingsDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-settings-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Workspace settings</h2>
      <div class="pattern-settings-demo" data-settings-demo data-dirty="false">
        <div class="pattern-settings-demo__section">
          <header>
            <h3>Notifications</h3>
            <p>Immediate settings announce saved state after a user change.</p>
          </header>
          ${packageDemo("switch", { label: "Fuel alerts", description: "Notify managers when spend exceeds policy.", checked: true }, { "data-setting-control": "", "data-setting-mode": "immediate" })}
          ${packageDemo("select", {
            label: "Weekly summary",
            helper: "Send a Monday digest to fleet owners.",
            value: "managers",
            options: [{ label: "Managers only", value: "managers" }, { label: "All operators", value: "operators" }, { label: "Disabled", value: "disabled" }],
          }, { "data-setting-control": "", "data-setting-mode": "explicit" })}
        </div>
        <div class="pattern-settings-demo__section pattern-settings-demo__section--danger">
          <header>
            <h3>Danger zone</h3>
            <p>Destructive actions stay separated and require confirmation.</p>
          </header>
          ${packageDemo("button", { label: "Archive workspace", intent: "danger", icon: "delete" }, { "data-settings-danger": "" })}
        </div>
        <footer class="pattern-settings-demo__save" data-settings-savebar hidden>
          <span data-settings-status>Unsaved changes</span>
          ${packageDemo("button", { label: "Save changes" }, { "data-settings-save": "" })}
        </footer>
        <div data-settings-dialog hidden>
          ${packageDemo("dialog", {
            label: "Archive this workspace?",
            description: "This removes the workspace from active operations and creates an audit event.",
            trigger: "Archive workspace",
            tone: "danger",
            actions: [{ label: "Archive", intent: "danger", key: "confirm" }, { label: "Cancel", variant: "secondary", key: "cancel" }],
          }, { "data-pattern-dialog": "settings" })}
        </div>
        <div data-settings-toast hidden>
          ${packageDemo("toast", { label: "Settings saved", description: "Workspace preferences are up to date.", tone: "success" }, { "data-pattern-toast": "settings" })}
        </div>
      </div>
    </section>
  `;
}

function helpCenterDemoPanel() {
  const articles = [
    ["limits", "Card limits", "Learn how monthly limits and owner approvals work.", "Billing", "limits policy cards"],
    ["fuel", "Fuel alerts", "Set threshold alerts for stations, spend, and exceptions.", "Operations", "alerts fuel stations"],
    ["roles", "Roles and access", "Review workspace permissions before inviting operators.", "Security", "roles access permissions"],
  ];
  return html`
    <section class="doc-panel wide pattern-help-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Help center search</h2>
      <div class="pattern-help-demo" data-help-demo>
        <label class="pattern-help-demo__search">
          ${packageDemo("input", { label: "Search help articles", placeholder: "Search articles, tags, or keywords", type: "search" }, { "data-help-search-control": "" })}
        </label>
        <div class="pattern-help-demo__layout">
          <nav class="pattern-help-demo__categories" aria-label="Help categories">
            ${packageDemo("button", { label: "All", variant: "secondary" }, { "data-help-category": "all", "aria-pressed": "true" })}
            ${packageDemo("button", { label: "Billing", variant: "secondary" }, { "data-help-category": "Billing" })}
            ${packageDemo("button", { label: "Operations", variant: "secondary" }, { "data-help-category": "Operations" })}
            ${packageDemo("button", { label: "Security", variant: "secondary" }, { "data-help-category": "Security" })}
          </nav>
          <div class="pattern-help-demo__results" data-help-results>
            ${articles.map(([id, title, summary, category, keywords]) => html`
              ${packageDemo("card", { title, detail: summary, status: category }, { "data-help-article": id, "data-help-category-name": category, "data-help-keywords": keywords, role: "button", "aria-selected": "false", tabindex: "0" })}
            `).join("")}
          </div>
          <article class="pattern-help-demo__article" data-help-article-panel tabindex="-1">
            <span class="eyebrow" data-help-article-category>Billing</span>
            <h3 data-help-article-title>Card limits</h3>
            <p data-help-article-copy>Learn how monthly limits and owner approvals work.</p>
            ${packageDemo("button", { label: "Contact support", variant: "secondary", icon: "support_agent" })}
          </article>
          <div class="pattern-help-demo__empty" data-help-empty hidden role="status">
            ${packageDemo("empty-state", { label: "No articles found", description: "Try a broader keyword or contact support.", icon: "search_off", actionLabel: "Contact support" })}
          </div>
        </div>
      </div>
    </section>
  `;
}

function patternInfoCard(title, items = []) {
  return html`<article class="pattern-variant-card"><strong>${title}</strong><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`;
}

function patternDependencyPanel(entry, source) {
  const components = source.componentsUsed ?? entry.componentsUsed ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>Design System dependencies</h2>
      <div class="relation-grid">
        ${components.map((name) => cardLink("components", slug(name), "widgets", name, findComponent(name)?.summary ?? "Package component dependency.")).join("")}
      </div>
    </section>
  `;
}

function patternContractDesign(entry) {
  const source = patternSource(entry);
  return html`
    ${patternFoundationPanel(source)}
    ${patternSlotContractPanel(source)}
    ${patternVariantPanel(source)}
    ${patternMotionPanel(source)}
    ${listPanel("Accessibility contract", source.accessibility ?? [])}
  `;
}

function patternFoundationPanel(source) {
  return html`
    <section class="doc-panel wide pattern-rule-panel">
      <h2>Foundations consumed</h2>
      <div class="props-table">
        ${(source.foundations ?? []).map(([name, rule]) => `<div><code>${name}</code><span>Foundation</span><span>Required</span><span>${rule}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function patternSlotContractPanel(source) {
  return html`
    <section class="doc-panel wide pattern-rule-panel">
      <h2>Slot contract</h2>
      <div class="props-table">
        <div><strong>Slot</strong><strong>Type</strong><strong>Required</strong><strong>Notes</strong></div>
        ${(source.slots ?? []).map((row) => `<div><code>${row[0]}</code><span>${row[1]}</span><span>${row[2]}</span><span>${row[3]}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function patternVariantPanel(source) {
  return html`
    <section class="doc-panel wide pattern-design-section pattern-design-demo-panel">
      <h2>Variants and states</h2>
      <div class="pattern-variant-grid">
        ${(source.variants ?? []).map(([name, status, rule]) => `<article class="pattern-variant-card"><strong>${name}</strong><span>${status}</span><p>${rule}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function patternMotionPanel(source) {
  return html`
    <section class="doc-panel wide pattern-rule-panel">
      <h2>Motion contract</h2>
      <div class="architecture-chain">
        ${(source.motion ?? []).map(([name, rule], index) => `<article><b>${index + 1}</b><strong>${name}</strong><span>${rule}</span></article>`).join("")}
      </div>
    </section>
  `;
}

function patternContractBuild(entry) {
  const source = patternSource(entry);
  const requiredSlots = (source.slots ?? []).filter((row) => row[2] === "yes").map((row) => `Declare ${row[0]}: ${row[3]}`);
  return html`
    ${patternSlotContractPanel(source)}
    ${listPanel("Implementation checklist", [...requiredSlots, ...(source.tests ?? [])])}
    ${listPanel("Tests and rejection rules", [...(source.tests ?? []), ...((source.miel?.rejectIf ?? []).map((item) => `Reject if: ${item}`))])}
    ${patternBuildGatePanel(entry)}
  `;
}

function patternContractMiel(entry) {
  const source = patternSource(entry);
  const miel = source.miel ?? {};
  return html`
    <section class="doc-panel wide pattern-miel-panel" data-pattern-doc="miel">
      <header class="pattern-miel-header">
        <span class="eyebrow">MIEL</span>
        <h2>${entry.title} MIEL</h2>
        <p>Agent boundary, human checkpoints, and pattern rejection rules.</p>
      </header>
      <div class="pattern-miel-grid">
        ${patternMielCard(ui("miel.agentCanDecide"), miel.canDecide ?? [])}
        ${patternMielCard(ui("miel.agentMustAsk"), miel.mustAsk ?? [])}
        ${patternMielCard(ui("miel.rejectIf"), miel.rejectIf ?? [])}
      </div>
      <div class="pattern-miel-bottom">
        <article class="pattern-miel-handoff">
          <h3>${ui("miel.handoff")}</h3>
          <p>${miel.handoff ?? ""}</p>
        </article>
      </div>
    </section>
  `;
}

function patternMielCard(title, items) {
  return `<article class="pattern-miel-card"><h3>${title}</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`;
}
