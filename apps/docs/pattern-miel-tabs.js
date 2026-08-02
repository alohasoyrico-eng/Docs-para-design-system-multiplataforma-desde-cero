import { html, ui } from "./detail-tabs-core.js?v=3";

export function patternMielTabs(entry) {
  if (entry.id === "sidebar") return sidebarMielPanel();
  if (entry.id === "topbar") return topbarMielPanel();
  return "";
}

function sidebarMielPanel() {
  const canDecide = [
    "Variant: grouped, drawer, or logo + footer.",
    "Parent icons; child text, Badge, aria-current."
  ];
  const mustAsk = [
    "More than two levels are needed.",
    "Footer, workspace, account, or mobile owner changes."
  ];
  const rejectIf = [
    "Child items get decorative icons.",
    "It contains filters, tables, detail, or visual-only state."
  ];
  const handoff = "Confirm group order, active route, max depth, footer utilities, and mobile drawer owner.";
  return patternMielPanel("Sidebar MIEL", canDecide, mustAsk, rejectIf, handoff, {
    depth: "2 levels",
    owns: "Persistent navigation",
    dependsOn: "Badge, Icon Button, Tooltip",
    a11y: "aria-current, focus-visible, reduced motion",
  });
}

function topbarMielPanel() {
  const canDecide = [
    "Slot order: leading, brand, nav, search, actions, account.",
    "Badge counts, Avatar-trigger Menu, and compact Icon Button utilities when behavior is already defined."
  ];
  const mustAsk = [
    "Logo, co-brand, or brand hierarchy changes.",
    "Search, autocomplete, notification, logout, settings, or workspace policy changes."
  ];
  const rejectIf = [
    "Search or Autocomplete behavior is implemented inside Topbar.",
    "Notifications are visual-only, or menu/panel behavior is missing."
  ];
  const handoff = "Confirm slot priority, brand rules, search boundary, notification policy, account actions, and mobile fallback.";
  return patternMielPanel("Topbar MIEL", canDecide, mustAsk, rejectIf, handoff, {
    slots: "leading, brand, nav, search, actions, account",
    dependsOn: "Search, Autocomplete, Notification Panel, Sidebar",
    escalatesTo: "Command Palette, account/session pattern",
    a11y: "landmark, labels, focus-visible, reduced motion",
  });
}

function patternMielPanel(title, canDecide, mustAsk, rejectIf, handoff, machineContract) {
  return html`
    <section class="doc-panel wide pattern-miel-panel" data-pattern-doc="miel">
      <header class="pattern-miel-header">
        <span class="eyebrow">MIEL</span>
        <h2>${title}</h2>
        <p>Agent boundary, human checkpoints, and pattern rejection rules.</p>
      </header>
      <div class="pattern-miel-grid">
        ${mielRuleCard(ui("miel.agentCanDecide"), canDecide)}
        ${mielRuleCard(ui("miel.agentMustAsk"), mustAsk)}
        ${mielRuleCard(ui("miel.rejectIf"), rejectIf)}
      </div>
      <div class="pattern-miel-bottom">
        <article class="pattern-miel-handoff">
          <h3>${ui("miel.handoff")}</h3>
          <p>${handoff}</p>
        </article>
        <article class="pattern-miel-contract">
          <h3>${ui("miel.machineContract")}</h3>
          <ul>${Object.entries(machineContract).map(([key, value]) => `<li><strong>${key}</strong><span>${value}</span></li>`).join("")}</ul>
        </article>
      </div>
    </section>
  `;
}

function mielRuleCard(title, items) {
  return `<article class="pattern-miel-card"><h3>${title}</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`;
}
