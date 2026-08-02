import { artifactContract, artifactFoundationTracePanel, cardLink, componentAgentSpec, componentCopy, examplePanel, findComponent, findPattern, foundationExample, foundationRoles, html, icon, iconFor, interpolateList, journeyCopy, primitiveExample, referenceCopy, referenceTemplate, slug, templateBlueprintFallbacks, templateBlueprints, threeTabs, ui, visualPanel, listPanel, accessibilityPanel, engineeringPanel, specPanel, guidelinesPanel, agentPanel } from "./detail-tabs-core.js?v=3";
import { hasPatternSource, patternContractTabs } from "./pattern-contract-tabs.js?v=27";
import { patternBuildGatePanel } from "./pattern-build-gates.js?v=3";
import { focusedPatternDesignPanels, topbarMarkup } from "./pattern-focused-design.js?v=23";
import { patternMielTabs } from "./pattern-miel-tabs.js?v=6";

export function patternTabs(entry) {
  if (entry.id === "sidebar" || entry.id === "topbar") {
    const tabs = [
      [ui("tabs.overview"), `${patternExamplePanel(entry)}${patternStandardPanel(entry)}${artifactFoundationTracePanel(entry, "Pattern")}`],
      [ui("tabs.design"), patternDesignBody(entry)],
      [ui("tabs.build"), patternBuildBody(entry)],
      [ui("tabs.miel"), patternMielTabs(entry)],
    ];
    return tabs.map(([labelText, body]) => ({ id: slug(labelText), label: labelText, body }));
  }
  if (hasPatternSource(entry)) return patternContractTabs(entry);
  return threeTabs(entry, `${patternStandardPanel(entry)}${artifactFoundationTracePanel(entry, "Pattern")}${patternExamplePanel(entry)}`, patternDesignBody(entry), patternBuildBody(entry));
}

function patternDesignBody(entry) {
  if (entry.id === "sidebar" || entry.id === "topbar") {
    return focusedPatternDesignPanels(entry);
  }
  const leadPanel = journeyPanel(entry);
  const customPanels = entry.id === "sidebar"
    ? `${sidebarFoundationsPanel()}${sidebarLayoutPanel()}${sidebarMotionPanel()}${sidebarVariantsPanel()}`
    : entry.id === "topbar"
      ? `${topbarFoundationsPanel()}${topbarSlotPanel()}${topbarSearchPanel()}${topbarVariantsPanel()}`
      : "";
  return `${leadPanel}${customPanels}${patternDecisionTreePanel(entry)}${patternFailureModesPanel(entry)}${screensPanel(entry)}${metricsPanel(entry)}${researchPanel(entry)}${guidelinesPanel(entry)}`;
}

function patternBuildBody(entry) {
  const contractPanel = entry.id === "sidebar" ? sidebarContractPanel() : entry.id === "topbar" ? topbarContractPanel() : patternContractPanel(entry);
  if (entry.id === "sidebar" || entry.id === "topbar") return `${contractPanel}${patternBuildGatePanel(entry)}`;
  return `${contractPanel}${engineeringPanel(entry)}${specPanel(entry)}${agentPanel(entry, "Pattern")}`;
}

export function patternExamplePanel(entry) {
  if (entry.id === "topbar") return topbarPatternPanel(entry);
  if (entry.id === "sidebar") return sidebarPatternPanel(entry);
  return examplePanel(entry);
}

function topbarPatternPanel(entry) {
  return html`
    <section class="doc-panel wide pattern-stage-panel">
      <span class="eyebrow">${ui("reference.realExample")}</span>
      <h2>${entry.title} documentation shell</h2>
      <div class="pattern-stage pattern-stage--real-shell pattern-stage--real-topbar" data-pattern-demo="topbar">
        ${topbarMarkup({ actionVariant: "account", navVariant: "sections", idBase: "Overview" })}
        <main class="pattern-workspace" aria-label="Documentation preview">
          <section>
            <span class="eyebrow">Docs shell</span>
            <h3>Global controls stay stable while content changes</h3>
            <p>Topbar composes brand, section navigation, Search, Notification Panel, and Avatar Menu without creating local account or alert controls.</p>
          </section>
          <div class="pattern-workgrid">
            <article><strong>Search</strong><span>Shared search slot, owned by Search and Autocomplete behavior</span></article>
            <article><strong>Notification Panel</strong><span>Icon Button, Badge, List, Empty State, Toast</span></article>
            <article><strong>Avatar Menu</strong><span>Menu avatar-trigger for account and session actions</span></article>
          </div>
        </main>
      </div>
    </section>
  `;
}

function sidebarPatternPanel(entry) {
  return html`
    <section class="doc-panel wide pattern-stage-panel">
      <span class="eyebrow">${ui("reference.realExample")}</span>
      <h2>${entry.title} docs shell frame</h2>
      <div class="pattern-stage pattern-stage--real-shell pattern-stage--real-sidebar" data-pattern-demo="sidebar">
        <aside class="sidebar" aria-label="${ui("shell.designNavigation")}">
          ${docsCollections().map((collection) => html`
            <details class="sidebar-group" ${collection.id === "patterns" ? "open" : ""}>
              <summary><span class="sidebar-label">${icon(collection.icon)}<span>${collection.label}</span><b class="sidebar-count">${collection.count}</b></span></summary>
              <div>
                ${collection.items.map((item) => `<a class="${item === "Sidebar" ? "active" : ""}" ${item === "Sidebar" ? `aria-current="page"` : ""} href="#/${collection.id}/${slug(item)}">${item}</a>`).join("")}
              </div>
            </details>
          `).join("")}
          <a href="#/stack"><span class="sidebar-label">${icon("layers")}<span>${ui("shell.stack")}</span></span></a>
        </aside>
        <main class="pattern-workspace" aria-label="Section preview">
          <nav class="breadcrumbs" aria-label="Breadcrumbs">
            <a href="#/home">Home</a><span>/</span><a href="#/patterns">Patterns</a><span>/</span><strong>Sidebar</strong>
          </nav>
          <section>
            <span class="eyebrow">Docs shell</span>
            <h3>Collections stay scannable while detail pages change</h3>
            <p>Sidebar owns the persistent map of Design System: collection groups, artifact counts, active route, disclosure, and the responsive drawer opened from the topbar menu button.</p>
          </section>
          <div class="pattern-workgrid">
            <article><strong>details</strong><span>Each collection uses native disclosure semantics</span></article>
            <article><strong>active</strong><span>The current artifact is visible in the open group</span></article>
          </div>
        </main>
      </div>
    </section>
  `;
}

function docsCollections() {
  return [
    { id: "foundations", label: "Foundations", icon: "bolt", count: 11, items: ["Energy", "Voice", "Frame"] },
    { id: "primitives", label: "Primitives", icon: "token", count: 18, items: ["Color", "Typography", "Spacing"] },
    { id: "components", label: "Components", icon: "widgets", count: 64, items: ["Button", "Card", "Table"] },
    { id: "patterns", label: "Patterns", icon: "account_tree", count: 53, items: ["Topbar", "Sidebar", "Search"] },
    { id: "templates", label: "Templates", icon: "dashboard", count: 6, items: ["Driver Mobile App", "Fleet Dashboard Suite"] },
  ];
}

function sidebarFoundationsPanel() {
  const rows = [
    ["Frame", "Persistent desktop width, drawer placement, internal scroll, group spacing, and content minmax rules."],
    ["Voice", "Parent labels, child labels, disclosure names, active-route copy, and count labels stay readable."],
    ["Energy", "Surface, active state, hover/focus, border, and Badge count color use semantic tokens."],
    ["Depth", "Persistent desktop sidebar stays flat; mobile drawer gets overlay/elevation only when it leaves document system."],
    ["Momentum", "Disclosure, hover, active, drawer, and reduced-motion behavior use system duration and easing."],
    ["State", "Hover, focus, selected, pressed, disabled, and open states resolve without color-only meaning."],
    ["Tone", "Navigation stays neutral by default, assistive on selected route, and avoids urgent styling for orientation."],
    ["Growth", "Artifact counts use Badge as metadata with monospaced count treatment."],
    ["Symbol", "Parent group symbols communicate zones without adding icons to child routes."],
    ["Iconography", "Material Symbols use system family, size, optical alignment, and parent-only rules."],
    ["Accessibility", "Disclosure state, focus ring, touch target, aria-current, and reduced-motion behavior are required."]
  ];
  return html`<section class="doc-panel wide pattern-rule-panel"><h2>Foundations consumed</h2><div class="props-table">${rows.map(([name, rule]) => `<div><code>${name}</code><span>Foundation</span><span>Required</span><span>${rule}</span></div>`).join("")}</div></section>`;
}

function topbarFoundationsPanel() {
  const rows = [
    ["Frame", "Defines height, slot priority, responsive wrap, safe target size, and search/nav allocation."],
    ["Voice", "Owns brand labels, placeholder copy, accessible names, account labels, and search result labels."],
    ["Energy", "Controls surface, active collection, search focus, notification count, hover, and focus states."],
    ["Depth", "Separates sticky shell, search results, and account menu without turning the topbar into a card."],
    ["Momentum", "Controls search focus reveal, menu panel entry, action feedback, and reduced-motion fallback."],
    ["State", "Selected nav, unread notification, open account menu, search focus, pressed, and disabled states are explicit."],
    ["Tone", "Topbar remains neutral; notifications can become warning only when count/status requires it."],
    ["Growth", "Collection counts and unread counts are metadata, not primary navigation labels."],
    ["Symbol", "Action symbols support labels and slots; they never replace accessible names."],
    ["Iconography", "Utility icons use Material Symbols sizing and optical alignment; brand slot can swap logo safely."],
    ["Accessibility", "Landmarks, role search, aria-current, aria-haspopup, aria-expanded, focus ring, Escape, and reduced motion are required."]
  ];
  return html`<section class="doc-panel wide pattern-rule-panel"><h2>Topbar foundations consumed</h2><div class="props-table">${rows.map(([name, rule]) => `<div><code>${name}</code><span>Foundation</span><span>Required</span><span>${rule}</span></div>`).join("")}</div></section>`;
}

function topbarSlotPanel() {
  const rows = [
    ["leading", "Menu trigger, product switcher, or mobile sidebar entry. Uses Icon Button behavior."],
    ["brand", "Logo, wordmark, partner logo, or compact mark. Must preserve accessible home label."],
    ["navigation", "Collection links or product sections. Active item uses aria-current."],
    ["search", "Search Input slot now; Global Search pattern only when results/routing/history are owned."],
    ["actions", "Language, contrast, grid, help, notifications, or compact utility commands."],
    ["account", "Avatar trigger plus Menu for settings, profile, workspace, and sign out."]
  ];
  return html`<section class="doc-panel wide pattern-rule-panel"><h2>Topbar slots</h2><div class="props-table">${rows.map((row) => `<div><code>${row[0]}</code><span>Slot</span><span>Configurable</span><span>${row[1]}</span></div>`).join("")}</div></section>`;
}

function topbarSearchPanel() {
  const rows = [
    ["Search", "Pattern dependency", "Owns query, results, empty state, routing, recents, and recovery when the topbar search is more than a local field."],
    ["Autocomplete", "Pattern dependency", "Owns suggestions, keyboard movement, loading, no-result recovery, and selection when the search slot predicts entities."],
    ["Command Palette", "Pattern candidate", "Separate from topbar when search executes actions, not just artifact lookup."]
  ];
  return html`<section class="doc-panel wide pattern-rule-panel"><h2>Search boundary</h2><div class="props-table">${rows.map((row) => `<div><code>${row[0]}</code><span>${row[1]}</span><span>Decision</span><span>${row[2]}</span></div>`).join("")}</div></section>`;
}

function topbarVariantsPanel() {
  const variants = [
    ["Docs", "Brand, collection nav, artifact search, language, grid, contrast, and sidebar entry."],
    ["Product", "Product logo, workspace switcher, global search, notifications, help, and account menu."],
    ["Co-brand", "Primary logo plus partner/customer mark with same slot contract."],
    ["Search-focused", "Search expands; nav compresses or moves to overflow/sidebar."],
    ["Account-aware", "Avatar opens Menu with settings, workspace, profile, and logout."],
    ["Notification-aware", "Unread Badge and notification menu/panel use state and tone without hijacking navigation."]
  ];
  return html`<section class="doc-panel wide pattern-rule-panel"><h2>Topbar variants</h2><div class="role-grid">${variants.map(([name, rule]) => `<article><span>${icon("web_asset")}</span><strong>${name}</strong><p>${rule}</p></article>`).join("")}</div></section>`;
}

function sidebarLayoutPanel() {
  const rules = [
    "Desktop uses a persistent sidebar with tokenized expanded width and main content as minmax(0, 1fr).",
    "Small viewports open the sidebar from Topbar/Menu as a drawer and must not create horizontal page overflow.",
    "Maximum visible depth is two levels: parent collection to child route.",
    "Children do not use icons by default; parents own iconography because they represent collection zones.",
    "Optional footer is a separate region for help, version, workspace, or account utilities, never mixed into primary routes."
  ];
  return listPanel("Sidebar layout rules", rules);
}

function sidebarMotionPanel() {
  const rows = [
    ["Group disclosure", "Uses quick reveal/collapse; reduced motion removes animated height/opacity."],
    ["Mobile drawer", "Slides from the navigation edge with focus restoration and Escape close."],
    ["Active state", "Changes instantly; do not animate route identity in a way that delays orientation."]
  ];
  return html`<section class="doc-panel wide pattern-rule-panel"><h2>Motion contract</h2><div class="architecture-chain">${rows.map(([name, rule], index) => `<article><b>${index + 1}</b><strong>${name}</strong><span>${rule}</span></article>`).join("")}</div></section>`;
}

function sidebarVariantsPanel() {
  const variants = [
    ["Grouped", "Current docs shell. Parent icons, Badge counts, child text links, active route."],
    ["Drawer", "Mobile behavior opened from Topbar/Menu, with focus trap and close affordance."],
    ["With Footer", "Optional utility region for help, version, workspace, account, or environment status."]
  ];
  return html`<section class="doc-panel wide pattern-rule-panel"><h2>Sidebar variants</h2><div class="role-grid">${variants.map(([name, rule]) => `<article><span>${icon("view_sidebar")}</span><strong>${name}</strong><p>${rule}</p></article>`).join("")}</div></section>`;
}

function sidebarContractPanel() {
  const rows = [
    ["groups", "SidebarGroup[]", "yes", "Parent collections with icon, label, optional Badge count, and children."],
    ["activeItem", "RouteId", "yes", "Current child route; active state must not rely on color alone."],
    ["maxDepth", "2", "yes", "Only parent to child is visible. Third level moves to local nav, tabs, breadcrumbs, or Tree View."],
    ["defaultOpenGroups", "GroupId[]", "conditional", "Open groups based on active route or product default."],
    ["footer", "SidebarFooter", "optional", "Separate utility region for account, help, version, workspace, or environment."],
    ["responsiveMode", "persistent | drawer", "yes", "Breakpoint behavior coordinated with Topbar menu access."]
  ];
  return html`<section class="doc-panel wide"><h2>${ui("contract.pattern")}</h2><div class="props-table"><div><strong>${ui("table.field")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>${rows.map((row) => `<div><code>${row[0]}</code><span>${row[1]}</span><span>${row[2]}</span><span>${row[3]}</span></div>`).join("")}</div></section>`;
}

function topbarContractPanel() {
  const rows = [
    ["leading", "TopbarLeadingSlot", "yes", "Menu trigger, product switcher, or sidebar entry."],
    ["brand", "BrandSlot", "yes", "Logo, wordmark, mark, co-brand, or partner mark with accessible home label."],
    ["navigation", "TopbarNavItem[]", "conditional", "Global collections or product sections; active item uses aria-current."],
    ["search", "Search | Autocomplete", "conditional", "Topbar provides the slot; Search/Autocomplete own results, suggestions, recovery, and routing."],
    ["actions", "TopbarAction[]", "optional", "Icon Button/Menu actions such as language, contrast, grid, help, notifications."],
    ["notifications", "Badge | Notification Panel", "optional", "Badge count can be inline; notification lists, read state, and actions belong to Notification Panel."],
    ["account", "AvatarMenuSlot", "optional", "Avatar component plus Menu for settings, workspace, profile, sign out."],
    ["responsiveMode", "full | compact | mobile", "yes", "Defines which slots stay visible, compress, or move to sidebar/drawer."]
  ];
  return html`<section class="doc-panel wide"><h2>${ui("contract.pattern")}</h2><div class="props-table"><div><strong>${ui("table.field")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>${rows.map((row) => `<div><code>${row[0]}</code><span>${row[1]}</span><span>${row[2]}</span><span>${row[3]}</span></div>`).join("")}</div></section>`;
}

export function journeyPanel(entry) {
  const contract = artifactContract(entry);
  const steps = contract
    ? [
        ["Entry", contract.entryConditions?.[0]],
        ["Qualify", contract.entryConditions?.slice(1).join(" ")],
        ["Decide", contract.decisionTree?.join(" ")],
        ["Confirm", contract.successMetrics?.[0]],
        ["Recover", contract.failureModes?.[0]],
      ].filter(([, copy]) => copy)
    : ["Entry", "Orient", "Act", "Confirm", "Recover"].map((step) => [step, journeyCopy(entry, step)]);
  return html`
    <div class="timeline">
      ${steps
        .map(
          ([step, copy], index) => html`
            <article>
              <b>${index + 1}</b>
              <h2>${step}</h2>
              <p>${copy}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

export function screensPanel(entry) {
  const contract = artifactContract(entry);
  const componentsUsed = contract?.componentDependencies ?? entry.componentsUsed ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.screensComponents")}</h2>
      <p>These are the expected building blocks for ${entry.title}. Each one should link to its component contract before implementation.</p>
      <div class="relation-grid">
        ${componentsUsed.map((name) => cardLink("components", slug(name), "widgets", name, findComponent(name)?.summary ?? "Component contract.")).join("")}
      </div>
    </section>
  `;
}

export function metricsPanel(entry) {
  const contract = artifactContract(entry);
  return listPanel(ui("reference.successMetrics"), contract?.successMetrics ?? referenceCopy.metrics?.fallback ?? []);
}

export function researchPanel(entry) {
  const contract = artifactContract(entry);
  const questions = entry.type === "pattern" && contract
    ? [
        ...(contract.successMetrics ?? []).map((metric) => `Can users reach this outcome without facilitator help: ${metric}`),
        ...(contract.failureModes ?? []).slice(0, 2).map((mode) => `Where does this failure mode create confusion or support burden: ${mode}`),
      ]
    : interpolateList(referenceCopy.research?.fallbackQuestions, entry);
  return listPanel(ui("reference.researchQuestions"), questions);
}

export function patternStandardPanel(entry) {
  const contract = artifactContract(entry);
  return html`
    <section class="doc-panel wide reference-section">
      <span class="eyebrow">${ui("reference.patternStandard")}</span>
      <h2>${entry.title} playbook</h2>
      <p>${entry.summary}</p>
      <p>${contract?.purpose ?? referenceCopy.pattern?.fallbackPurpose}</p>
    </section>
  `;
}

export function patternDecisionTreePanel(entry) {
  const contract = artifactContract(entry);
  const decisions = contract?.decisionTree?.map((item, index) => [`Decision ${index + 1}`, item]) ?? [
    ...(referenceCopy.pattern?.fallbackDecisions ?? []),
  ].map((row) => row.map((value) => referenceTemplate(value, entry)));
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.decisionTree")}</h2>
      <div class="architecture-chain">
        ${decisions.map(([name, copy], index) => `<article><b>${index + 1}</b><strong>${name}</strong><span>${copy}</span></article>`).join("")}
      </div>
    </section>
  `;
}

export function patternFailureModesPanel(entry) {
  const contract = artifactContract(entry);
  return listPanel(ui("reference.failureModes"), contract?.failureModes ?? interpolateList(referenceCopy.pattern?.fallbackFailureModes, entry));
}

export function patternContractPanel(entry) {
  const contract = artifactContract(entry);
  const rows = contract
    ? [
        ["entryConditions", "Condition[]", "yes", contract.entryConditions?.join(" · ") ?? ""],
        ["decisionTree", "Branch[]", "yes", contract.decisionTree?.join(" · ") ?? ""],
        ["componentDependencies", "ComponentRef[]", "yes", contract.componentDependencies?.join(", ") ?? ""],
        ["failureModes", "State[]", "yes", contract.failureModes?.join(" · ") ?? ""],
        ["successMetrics", "Metric[]", "yes", contract.successMetrics?.join(" · ") ?? ""],
      ]
    : (referenceCopy.pattern?.fallbackContractRows ?? []).map((row) => row.map((value) => referenceTemplate(value, entry, { componentsUsed: (entry.componentsUsed ?? []).join(", ") })));
  return html`
    <section class="doc-panel wide">
      <h2>${ui("contract.pattern")}</h2>
      <div class="props-table">
        <div><strong>${ui("table.field")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>
        ${rows.map((row) => `<div><code>${row[0]}</code><span>${row[1]}</span><span>${row[2]}</span><span>${row[3]}</span></div>`).join("")}
      </div>
    </section>
  `;
}
