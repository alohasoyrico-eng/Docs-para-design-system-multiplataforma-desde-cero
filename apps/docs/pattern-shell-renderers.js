import { html, slug } from "./detail-tabs-core.js?v=3";
import { avatarMenuMarkup } from "./avatar-menu-slot.js?v=1";
import { searchSlotMarkup } from "./search-slot.js?v=2";

const templateFoundations = "energy frame voice depth momentum state tone growth symbol iconography accessibility";

export function renderSidebarPattern({ title, nav = [], packageDemo, navPatternFor }) {
  return html`
    <aside class="sidebar template-pattern-sidebar" data-template-pattern="${slug("Sidebar")}" data-pattern-renderer="sidebar" data-foundation-scope="${templateFoundations}" aria-label="${title} sections">
      <details class="sidebar-group" open>
        <summary>
          <span class="sidebar-label">
            <span class="material-symbol" aria-hidden="true">dashboard</span>
            <span>Workspace</span>
          </span>
          <span class="sidebar-count">${nav.length}</span>
        </summary>
        <div>
          ${nav.map((item, index) => html`
            <a href="#${slug(item)}" class="${index === 0 ? "active" : ""}" data-template-section="${slug(item)}" data-template-pattern="${slug(navPatternFor(item))}" ${index === 0 ? 'aria-current="page"' : ""}>
              <span class="sidebar-label"><span>${item}</span></span>
            </a>
          `).join("")}
        </div>
      </details>
    </aside>
  `;
}

export function renderTopbarPattern({ packageDemo }) {
  return html`
    <header class="topbar template-pattern-topbar" data-template-pattern="${slug("Topbar")}" data-pattern-renderer="topbar" data-foundation-scope="${templateFoundations}">
      <a class="brand" href="#/home" aria-label="Design System OS home">
        <img src="./assets/logo.svg" data-quiet-src="./assets/logo-dark.svg" alt="Design System" />
      </a>
      ${searchSlotMarkup({
        label: "Search Design System",
        placeholder: "Search foundations, components, patterns...",
        slotClass: "template-pattern-topbar__search",
        inputId: "templateTopSearch",
        inputAttrs: { "data-template-search": "", autocomplete: "off" },
        ariaLabel: "Search Design System",
      })}
      <div class="top-actions template-pattern-topbar__actions">
        <button class="icon-button pattern-notification-button" type="button" aria-label="Notifications: 3 unread" data-template-notifications>
          <span class="material-symbol" data-icon="notifications" aria-hidden="true">notifications</span>
          <span class="pattern-action-badge">
            ${packageDemo("badge", { label: "3", tone: "warning", variant: "count", ariaLabel: "3 unread notifications" })}
          </span>
        </button>
        ${avatarMenuMarkup({ avatarName: "Fleet Ops", trigger: "Fleet Ops", attrs: { "data-template-account-menu": "" } })}
      </div>
    </header>
  `;
}
