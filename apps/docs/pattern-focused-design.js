import { html, icon } from "./detail-tabs-core.js?v=3";
import { avatarMenuMarkup, accountMenuSections } from "./avatar-menu-slot.js?v=1";
import { notificationPanelMarkup } from "./notification-panel-slot.js?v=1";
import { patternPackageDemo as packageDemo, searchSlotMarkup } from "./search-slot.js?v=2";

const sidebarDemoCollections = [
  { symbol: "bolt", label: "Foundations", count: "11", items: [{ label: "Energy", href: "#/foundations/energy" }, { label: "Voice", href: "#/foundations/voice" }, { label: "Frame", href: "#/foundations/frame" }] },
  { symbol: "widgets", label: "Components", count: "64", items: [{ label: "Button", href: "#/components/button" }, { label: "Card", href: "#/components/card" }, { label: "Table", href: "#/components/table" }] },
  { symbol: "account_tree", label: "Patterns", count: "53", items: [{ label: "Topbar", href: "#/patterns/topbar" }, { label: "Sidebar", href: "#/patterns/sidebar" }, { label: "Search", href: "#/patterns/search" }], open: true },
];

const topbarSectionItems = [
  { label: "Foundations", children: [{ label: "Energy", href: "#/foundations/energy" }, { label: "Voice", href: "#/foundations/voice" }, { label: "Frame", href: "#/foundations/frame" }] },
  { label: "Components", children: [{ label: "Button", href: "#/components/button" }, { label: "Icon Button", href: "#/components/icon-button" }, { label: "Avatar", href: "#/components/avatar" }] },
  { label: "Patterns", children: [{ label: "Topbar", href: "#/patterns/topbar" }, { label: "Sidebar", href: "#/patterns/sidebar" }] },
];

const sidebarFooterSlotData = {
  action: { icon: "help", label: "Help" },
  meta: "v0.3",
};

export function focusedPatternDesignPanels(entry) {
  if (entry.id === "sidebar") return sidebarDesignPanels();
  if (entry.id === "topbar") return topbarDesignPanels();
  return "";
}

function sidebarDesignPanels() {
  return `${sidebarViewportOrganizationPanel()}${sidebarResponsiveLayoutPanel()}${sidebarSlotContractPanel()}${sidebarVariantStatusPanel()}`;
}

function topbarDesignPanels() {
  return `${topbarViewportOrganizationPanel()}${topbarResponsiveLayoutPanel()}${topbarSlotContractPanel()}${topbarVariantStatusPanel()}`;
}

function sidebarViewportOrganizationPanel() {
  return html`
    <section class="doc-panel wide pattern-design-section pattern-design-demo-panel">
      <span class="eyebrow">Design</span>
      <h2>Viewport organization</h2>
      <div class="pattern-design-demo-grid">
        ${demoCard("Desktop", "Persistent docs sidebar beside content", sidebarDesktopDemo())}
        ${demoCard("Mobile", "Same sidebar opens from the docs menu button", sidebarMobileDemo())}
      </div>
    </section>
  `;
}

function sidebarResponsiveLayoutPanel() {
  return html`
    <section class="doc-panel wide pattern-design-section pattern-design-demo-panel">
      <h2>Responsive layout patterns</h2>
      <div class="pattern-design-demo-grid">
        ${demoCard("Hierarchy", "Parent groups carry icons, children stay text-first", sidebarDesktopDemo("hierarchy"))}
        ${demoCard("Active route", "Selected child uses the same active treatment as docs", sidebarDesktopDemo("active"))}
        ${demoCard("Logo + footer", "Brand slot above navigation and support/version slot at the bottom", sidebarLogoFooterDemo())}
        ${demoCard("Drawer", "Mobile interaction starts closed until the user opens it", sidebarMobileDemo())}
      </div>
    </section>
  `;
}

function topbarViewportOrganizationPanel() {
  return html`
    <section class="doc-panel wide pattern-design-section pattern-design-demo-panel">
      <span class="eyebrow">Design</span>
      <h2>Viewport organization</h2>
      <div class="pattern-design-demo-grid pattern-design-demo-grid--topbar">
        ${demoCard("Desktop", "Brand, search, and utility actions", topbarDesktopDemo())}
        ${demoCard("Compact", "Menu button appears before the brand", topbarCompactDemo())}
      </div>
    </section>
  `;
}

function topbarResponsiveLayoutPanel() {
  return html`
    <section class="doc-panel wide pattern-design-section pattern-design-demo-panel">
      <h2>Responsive layout patterns</h2>
      <div class="pattern-design-demo-grid pattern-design-demo-grid--topbar">
        ${demoCard("Search priority", "Topbar keeps the search slot; Search and Autocomplete own result behavior", topbarSearchDemo())}
        ${demoCard("Utilities", "Language, grid, and theme remain icon buttons", topbarUtilitiesDemo())}
        ${demoCard("Sections + account", "Parent/child links sit before search; notifications and Avatar extend actions", topbarAccountActionsDemo())}
        ${demoCard("Menu entry", "The menu button controls the sidebar drawer on small viewports", topbarCompactDemo())}
      </div>
    </section>
  `;
}

function sidebarVariantStatusPanel() {
  return html`
    <section class="doc-panel wide pattern-design-section pattern-design-demo-panel">
      <h2>Variant status</h2>
      <div class="pattern-variant-grid">
        ${variantCard("Persistent", "Current", "Desktop and wide tablet use the real sidebar beside content.")}
        ${variantCard("Drawer", "Current", "Small viewports open the same sidebar from the docs menu button.")}
        ${variantCard("Logo + footer", "Candidate", "Useful when a product shell needs its own brand slot plus help, version, or workspace metadata at the bottom.")}
      </div>
    </section>
  `;
}

function topbarVariantStatusPanel() {
  return html`
    <section class="doc-panel wide pattern-design-section pattern-design-demo-panel">
      <h2>Variant status</h2>
      <div class="pattern-variant-grid">
        ${variantCard("Docs shell", "Current", "Brand, search, language, grid, and theme actions use the real topbar.")}
        ${variantCard("Compact menu", "Current", "The menu button appears for the responsive sidebar drawer.")}
        ${variantCard("Brand slot", "Candidate", "Logo swaps and co-branding need a product rule before becoming a documented variant.")}
        ${variantCard("Sections + account", "Candidate", "Documented as parent/child section navigation before search, plus Badge, Avatar, and account menu actions.")}
      </div>
    </section>
  `;
}

function sidebarSlotContractPanel() {
  const rows = [
    ["brand", "Candidate", "Optional product identity above navigation groups; current docs shell keeps brand in Topbar."],
    ["groups", "Current", "Collection parents use icons, disclosure, and count metadata."],
    ["items", "Current", "Child routes are text-first links with aria-current for the active page."],
    ["drawer", "Current", "Mobile opens the same sidebar from the Topbar menu button."],
    ["footer", "Candidate", "Optional support, workspace, environment, or version metadata anchored below navigation."],
  ];
  return slotContractPanel("Sidebar slot contract", rows);
}

function topbarSlotContractPanel() {
  const rows = [
    ["brand", "Current", "Home link with Design System identity."],
    ["sections", "Candidate", "Parent/child section navigation before search for product shells."],
    ["search", "Dependency", "Consumes Search and Autocomplete patterns when results, suggestions, recents, or routing are owned."],
    ["actions", "Current", "Language, grid, and contrast icon buttons."],
    ["notifications", "Dependency", "Badge count can live in Topbar; notification lists/actions belong to Notification Panel."],
    ["account", "Current", "Avatar-trigger Menu owns profile, settings, and session actions without local account buttons."],
  ];
  return slotContractPanel("Topbar slot contract", rows);
}

function slotContractPanel(title, rows) {
  return html`
    <section class="doc-panel wide pattern-rule-panel">
      <h2>${title}</h2>
      <div class="props-table">
        ${rows.map(([slot, status, rule]) => `<div><code>${slot}</code><span>Slot</span><span>${status}</span><span>${rule}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function demoCard(title, note, demo) {
  return html`<article class="pattern-design-demo-card"><header><strong>${title}</strong><span>${note}</span></header>${demo}</article>`;
}

function variantCard(title, status, copy) {
  return html`<article class="pattern-variant-card" data-status="${status.toLowerCase().replaceAll(" ", "-")}"><strong>${title}</strong><span>${status}</span><p>${copy}</p></article>`;
}

function sidebarDesktopDemo(mode = "default") {
  const active = mode === "hierarchy" ? "Topbar" : "Sidebar";
  return html`
    <div class="pattern-design-shell-demo pattern-design-shell-demo--desktop" data-pattern-demo="sidebar-${mode}">
      <div class="app-shell">
        ${sidebarMarkup({ active })}
        ${workspacePreview("Documentation shell", "The demo uses the same app-shell, sidebar, sidebar-group, sidebar-label, and sidebar-count classes used by this page.")}
      </div>
    </div>
  `;
}

function sidebarMobileDemo() {
  return html`
    <div class="pattern-design-shell-demo pattern-design-shell-demo--mobile" data-pattern-demo-nav="closed">
      ${topbarMarkup({ compact: true, toggleDemoNav: true })}
      <div class="app-shell">
        ${sidebarMarkup({ active: "Sidebar" })}
        ${workspacePreview("Mobile drawer", "The sidebar starts closed. Open it from the menu button to see the same drawer behavior used by the docs shell.")}
      </div>
    </div>
  `;
}

function sidebarLogoFooterDemo() {
  return html`
    <div class="pattern-design-shell-demo pattern-design-shell-demo--desktop pattern-design-shell-demo--sidebar-slots" data-pattern-demo="sidebar-logo-footer">
      <div class="app-shell">
        ${sidebarMarkup({ active: "Sidebar", footer: true, logo: true })}
        ${workspacePreview("Brand and utility slots", "This candidate keeps navigation groups stable while identity sits above them and support/version metadata stays in a footer slot.")}
      </div>
    </div>
  `;
}

function topbarDesktopDemo() {
  return html`
    <div class="pattern-design-shell-demo pattern-design-shell-demo--topbar pattern-design-shell-demo--topbar-standard" data-pattern-demo="topbar-desktop">
      ${topbarMarkup({ idBase: "Desktop" })}
      ${workspacePreview("Topbar anatomy", "This is the real docs topbar: brand, global search, language, layout grid, and theme controls.")}
    </div>
  `;
}

function topbarCompactDemo() {
  return html`
    <div class="pattern-design-shell-demo pattern-design-shell-demo--topbar pattern-design-shell-demo--topbar-compact" data-pattern-demo-nav="closed">
      ${topbarMarkup({ compact: true, toggleDemoNav: true, idBase: "Compact" })}
      <div class="app-shell">
        ${sidebarMarkup({ active: "Topbar" })}
        ${workspacePreview("Compact shell", "The menu button is the entry point to navigation and opens the same sidebar as a drawer.")}
      </div>
    </div>
  `;
}

function topbarSearchDemo() {
  return html`
    <div class="pattern-design-shell-demo pattern-design-shell-demo--topbar pattern-design-shell-demo--topbar-standard pattern-design-shell-demo--search" data-pattern-demo="topbar-search">
      ${topbarMarkup({ idBase: "Search" })}
      ${workspacePreview("Search slot", "Topbar owns placement and density; Search and Autocomplete own results, suggestions, recovery, and routing.")}
    </div>
  `;
}

function topbarUtilitiesDemo() {
  return html`
    <div class="pattern-design-shell-demo pattern-design-shell-demo--topbar pattern-design-shell-demo--topbar-standard" data-pattern-demo="topbar-utilities">
      ${topbarMarkup({ utilityEmphasis: true, idBase: "Utilities" })}
      ${workspacePreview("Utility actions", "Actions stay as icon buttons and keep labels on the controls instead of becoming custom buttons.")}
    </div>
  `;
}

function topbarAccountActionsDemo() {
  return html`
    <div class="pattern-design-shell-demo pattern-design-shell-demo--topbar pattern-design-shell-demo--topbar-standard pattern-design-shell-demo--topbar-with-sections" data-pattern-demo="topbar-account-actions">
      ${topbarMarkup({ actionVariant: "account", idBase: "Account", navVariant: "sections" })}
      ${workspacePreview("Section navigation variant", "Parent links expose child subsections before search. Notifications use Badge, and Avatar opens account actions only after interaction.")}
    </div>
  `;
}

export function topbarMarkup({ actionVariant = "utilities", compact = false, focusSearch = false, navVariant = "none", toggleDemoNav = false, utilityEmphasis = false, idBase = "Default" } = {}) {
  return html`
    <header class="topbar" aria-label="Primary">
      ${topbarIconButton({ ariaLabel: "Open navigation", iconName: "menu", attrs: { class: "menu-button", "aria-expanded": "false", ...(toggleDemoNav ? { "data-pattern-demo-nav-toggle": "" } : {}) } })}
      <a class="brand" href="#/home" aria-label="Design System OS home">
        <img src="./assets/logo.svg" data-quiet-src="./assets/logo-dark.svg" alt="Design System" />
      </a>
      ${navVariant === "sections" ? topbarSectionNav() : ""}
      ${searchSlotMarkup({
        label: "Search Design System",
        placeholder: "Search foundations, components, patterns...",
        attrs: { "data-topbar-search-input": "" },
        results: searchResults(),
        focused: focusSearch,
        ariaLabel: "Search Design System",
      })}
      <div class="top-actions ${utilityEmphasis ? "is-demo-emphasis" : ""}">
        ${topbarActions(actionVariant)}
      </div>
    </header>
  `;
}

function topbarSectionNav() {
  return html`
    <nav class="pattern-topbar-sections" aria-label="Section navigation">
      ${topbarSectionItems.map(({ label, children }) => html`
        <details class="pattern-topbar-section">
          <summary>${label}</summary>
          <div>
            ${children.map((child) => `<a href="${child.href}">${child.label}</a>`).join("")}
          </div>
        </details>
      `).join("")}
    </nav>
  `;
}

function topbarActions(variant) {
  if (variant === "account") {
    return html`
      <span class="pattern-topbar-action pattern-notification-button">
        ${notificationPanelMarkup({ slotClass: "pattern-notification-slot", attrs: { "data-topbar-notification-panel": "" } })}
      </span>
      ${avatarMenuMarkup({ sections: accountMenuSections, attrs: { "data-topbar-account-menu": "" } })}
    `;
  }
  return html`
    <span class="pattern-topbar-action pattern-topbar-language" aria-live="polite">
      ${topbarIconButton({ ariaLabel: "Switch language", iconName: "language" })}
      <span class="language-toggle__code">EN</span>
    </span>
    ${topbarIconButton({ ariaLabel: "Show column grid", iconName: "grid_off", attrs: { "aria-pressed": "false" } })}
    ${topbarIconButton({ ariaLabel: "Toggle contrast", iconName: "contrast", attrs: { "aria-pressed": "false" } })}
  `;
}

function topbarIconButton({ ariaLabel, iconName, attrs = {} }) {
  return packageDemo("icon-button", { ariaLabel, icon: iconName, variant: "ghost", density: "md" }, attrs);
}

function sidebarMarkup({ active = "Sidebar", footer = false, logo = false } = {}) {
  return html`
    <aside class="sidebar" aria-label="Design navigation">
      ${logo ? sidebarLogoSlot() : ""}
      ${sidebarDemoCollections.map((collection) => sidebarGroup(collection.symbol, collection.label, collection.count, collection.items, active, collection.open)).join("")}
      <a href="#/stack"><span class="sidebar-label">${icon("layers")}<span>Stack</span></span></a>
      ${footer ? sidebarFooterSlot() : ""}
    </aside>
  `;
}

function sidebarLogoSlot() {
  return html`
    <a class="pattern-sidebar-brand" href="#/home" aria-label="Design System OS home">
      <img src="./assets/logo.svg" data-quiet-src="./assets/logo-dark.svg" alt="Design System" />
    </a>
  `;
}

function sidebarFooterSlot() {
  return html`
    <footer class="pattern-sidebar-footer" aria-label="Sidebar utility">
      <button type="button">${icon(sidebarFooterSlotData.action.icon)}<span>${sidebarFooterSlotData.action.label}</span></button>
      <span>${sidebarFooterSlotData.meta}</span>
    </footer>
  `;
}

function sidebarGroup(symbol, label, count, items, active, open = false) {
  return html`
    <details class="sidebar-group" ${open ? "open" : ""}>
      <summary><span class="sidebar-label">${icon(symbol)}<span>${label}</span><b class="sidebar-count">${count}</b></span></summary>
      <div>
        ${items.map((item) => `<a class="${item.label === active ? "active" : ""}" ${item.label === active ? `aria-current="page"` : ""} href="${item.href}">${item.label}</a>`).join("")}
      </div>
    </details>
  `;
}

function searchResults() {
  return html`<a href="#/patterns/sidebar"><strong>Sidebar</strong><span>Pattern · Navigation</span></a>`;
}

function workspacePreview(title, copy) {
  return html`
    <main class="content-shell density-responsive pattern-design-workspace">
      <section>
        <span class="eyebrow">Pattern demo</span>
        <h3>${title}</h3>
        <p>${copy}</p>
      </section>
    </main>
  `;
}
