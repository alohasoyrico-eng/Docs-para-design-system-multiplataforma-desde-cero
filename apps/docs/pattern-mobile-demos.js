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

function bottomSheetPatternDemo({
  label = "Mobile sheet",
  description = "",
  items = [],
  state = "open",
  actions = [],
} = {}, attrs = {}) {
  const attrText = Object.entries(attrs)
    .map(([key, value]) => value === "" ? key : `${key}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");
  return html`
    <section class="bottom-sheet-demo" data-pattern-sheet="bottom-sheet" data-state="${state}" ${attrText}>
      <div class="bottom-sheet-demo__scrim">
        <div class="bottom-sheet-demo__panel" role="dialog" aria-modal="true" aria-label="${label}">
          <span class="bottom-sheet-demo__handle" aria-hidden="true"></span>
          <header>
            <div>
              <strong>${label}</strong>
              ${description ? `<p>${description}</p>` : ""}
            </div>
          </header>
          <div class="bottom-sheet-demo__body">
            ${items.map((item) => `<span>${typeof item === "string" ? item : item.label}</span>`).join("")}
          </div>
          ${actions.length ? `<footer>${actions.map((action) => packageDemo("button", action, { "data-sheet-action": action.variant === "secondary" ? "secondary" : "primary" })).join("")}</footer>` : ""}
        </div>
      </div>
    </section>
  `;
}

export function mobilePatternOverviewDemo(patternId) {
  if (patternId === "fullscreen-sheet") return fullscreenSheetDemoPanel();
  if (patternId === "swipe-actions") return swipeActionsDemoPanel();
  if (patternId === "quick-actions-grid") return quickActionsGridDemoPanel();
  if (patternId === "drawer-adapter") return drawerAdapterDemoPanel();
  return "";
}

function fullscreenSheetDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-mobile-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Mobile station edit</h2>
      <div class="pattern-fullscreen-sheet-demo pattern-mobile-demo" data-fullscreen-sheet-demo data-step-index="0">
        ${packageDemo("button", { label: "Edit station policy", icon: "open_in_full" }, { "data-fullscreen-sheet-open": "" })}
        <div class="pattern-fullscreen-sheet-demo__sheet" data-fullscreen-sheet hidden>
          ${bottomSheetPatternDemo({ label: "Station policy", description: "Edit contextual mobile settings without losing the route.", state: "closed", items: ["Station", "Limits", "Review"] }, { "data-fullscreen-sheet-component": "" })}
          <div data-fullscreen-stepper>
            ${packageDemo("stepper", { current: 0, steps: [{ label: "Station", description: "Context" }, { label: "Limit", description: "Policy" }, { label: "Review", description: "Confirm" }] })}
          </div>
          <div class="pattern-fullscreen-sheet-demo__body">
            <div data-fullscreen-step="0">
              ${packageDemo("input", { label: "Station name", value: "Station 24" }, { "data-fullscreen-field": "station" })}
              ${packageDemo("input", { label: "Route owner", value: "North ops" }, { "data-fullscreen-field": "owner" })}
            </div>
            <div data-fullscreen-step="1" hidden>
              ${packageDemo("input", { label: "Daily fuel limit", value: "1200", type: "number" }, { "data-fullscreen-field": "limit" })}
              <div data-fullscreen-validation hidden>${packageDemo("inline-validation", { label: "Daily fuel limit", message: "Enter a limit before reviewing.", state: "warning" })}</div>
            </div>
            <div class="pattern-fullscreen-sheet-demo__review" data-fullscreen-step="2" hidden>
              ${packageDemo("card-summary", { label: "Station 24", meta: "North ops", number: "Daily fuel limit", available: "$1,200", limit: "$1,200", status: "Ready" })}
            </div>
          </div>
          <footer>
            ${packageDemo("button", { label: "Close", variant: "secondary" }, { "data-fullscreen-sheet-close": "" })}
            ${packageDemo("button", { label: "Back", variant: "secondary" }, { "data-fullscreen-sheet-prev": "", hidden: "" })}
            ${packageDemo("button", { label: "Continue" }, { "data-fullscreen-sheet-next": "" })}
          </footer>
        </div>
        <div data-fullscreen-toast hidden>${packageDemo("toast", { label: "Station policy saved", description: "Mobile task completed and focus returned.", tone: "success" }, { "data-pattern-toast": "fullscreen-sheet" })}</div>
      </div>
    </section>
  `;
}

function swipeActionsDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-mobile-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Row actions with explicit reveal</h2>
      <div class="pattern-swipe-actions-demo pattern-mobile-demo" data-swipe-actions-demo>
        <div class="pattern-swipe-actions-demo__row">
          ${packageDemo("movement-row", { label: "Fuel purchase", meta: "Today - Station 24 - JMX-214-B", amount: "-$842", status: "Approved" }, { "data-swipe-row": "" })}
          <div class="pattern-swipe-actions-demo__rail" data-swipe-actions-rail hidden>
            ${packageDemo("quick-action", { label: "Receipt", icon: "receipt_long" }, { "data-swipe-action": "receipt" })}
            ${packageDemo("quick-action", { label: "Dispute", icon: "report" }, { "data-swipe-action": "dispute" })}
          </div>
        </div>
        <footer>
          ${packageDemo("button", { label: "Reveal actions", variant: "secondary", icon: "swipe" }, { "data-swipe-reveal": "" })}
          ${packageDemo("button", { label: "Hide actions", variant: "secondary" }, { "data-swipe-hide": "", hidden: "" })}
        </footer>
        <div data-swipe-toast hidden>${packageDemo("toast", { label: "Action selected", description: "Row action is ready.", tone: "success" }, { "data-pattern-toast": "swipe-actions" })}</div>
      </div>
    </section>
  `;
}

function quickActionsGridDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-mobile-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Card shortcut grid</h2>
      <div class="pattern-quick-actions-grid-demo pattern-mobile-demo" data-quick-actions-grid-demo>
        <div class="pattern-quick-actions-grid-demo__grid">
          ${packageDemo("quick-action", { label: "Freeze", icon: "block", badge: "Risk" }, { "data-quick-grid-action": "freeze" })}
          ${packageDemo("quick-action", { label: "Limits", icon: "tune" }, { "data-quick-grid-action": "limits" })}
          ${packageDemo("quick-action", { label: "PIN", icon: "pin" }, { "data-quick-grid-action": "pin" })}
          ${packageDemo("quick-action", { label: "Travel", icon: "flight", badge: "Locked" }, { "data-quick-grid-blocked": "" })}
        </div>
        <div data-quick-grid-tooltip hidden>${packageDemo("tooltip", { trigger: "Travel", label: "Travel requires finance approval before activation." }, { "data-pattern-tooltip": "quick-actions-grid" })}</div>
        <div data-quick-grid-dialog hidden>${packageDemo("dialog", { label: "Freeze card?", description: "The driver cannot use this card until it is reactivated.", trigger: "Freeze card", tone: "danger", actions: [{ label: "Freeze card", intent: "danger", key: "confirm" }, { label: "Cancel", variant: "secondary", key: "cancel" }] }, { "data-pattern-dialog": "quick-actions-grid" })}</div>
        <div data-quick-grid-toast hidden>${packageDemo("toast", { label: "Shortcut applied", description: "Quick action was completed.", tone: "success" }, { "data-pattern-toast": "quick-actions-grid" })}</div>
        ${packageDemo("badge", { label: "4 shortcuts", tone: "neutral", variant: "standard" }, { "data-quick-grid-count": "" })}
      </div>
    </section>
  `;
}

function drawerAdapterDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-mobile-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Inspector drawer adapter</h2>
      <div class="pattern-drawer-adapter-demo pattern-mobile-demo" data-drawer-adapter-demo>
        ${packageDemo("button", { label: "Open mobile drawer", icon: "dock_to_left" }, { "data-drawer-adapter-open": "" })}
        <div class="pattern-drawer-adapter-demo__drawer" data-drawer-adapter-panel hidden>
          ${packageDemo("drawer", { label: "Vehicle inspector", description: "Adapted side panel content for mobile.", trigger: "Open drawer", state: "closed", fields: ["Overview", "Documents", "Risk"], actions: [{ label: "Open risk review", variant: "secondary", key: "risk" }, { label: "Close drawer", variant: "secondary", key: "close" }] }, { "data-drawer-adapter-component": "" })}
          ${packageDemo("menu", { trigger: "Inspector sections", label: "Inspector sections", state: "closed", items: [{ label: "Overview" }, { label: "Documents" }, { label: "Risk review" }] }, { "data-drawer-adapter-menu": "" })}
        </div>
        <div data-drawer-adapter-dialog hidden>${packageDemo("dialog", { label: "Open risk review?", description: "Risk review pauses the drawer task and requires a decision.", trigger: "Risk review", actions: [{ label: "Open review", key: "confirm" }, { label: "Cancel", variant: "secondary", key: "cancel" }] }, { "data-pattern-dialog": "drawer-adapter" })}</div>
        <div data-drawer-adapter-toast hidden>${packageDemo("toast", { label: "Drawer action complete", description: "Adapted drawer selection was handled.", tone: "success" }, { "data-pattern-toast": "drawer-adapter" })}</div>
      </div>
    </section>
  `;
}
