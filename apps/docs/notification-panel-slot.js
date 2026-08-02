import { patternPackageDemo } from "./search-slot.js?v=2";

export const notificationPanelItems = [
  { label: "Approval pending", meta: "Fleet ops - 2 min", value: "Review", icon: "approval" },
  { label: "Sync issue", meta: "Cards service - 12 min", value: "Retry", icon: "sync_problem" },
  { label: "Fuel alert", meta: "Station 24 - Today", value: "High", icon: "warning", tone: "danger" },
];

export function notificationPanelMarkup({
  label = "Notifications",
  description = "Operational alerts that need review.",
  count = "3",
  items = notificationPanelItems,
  slotClass = "",
  attrs = {},
} = {}) {
  const attrText = Object.entries({ "data-notification-demo": "", "data-count": count, ...attrs })
    .map(([key, value]) => value === "" ? key : `${key}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");

  return `
    <span class="pattern-notification-demo ${slotClass}" ${attrText}>
      <span class="pattern-notification-demo__trigger">
        <span class="pattern-notification-demo__trigger-control">
          ${patternPackageDemo("icon-button", { ariaLabel: `Open notifications: ${count} unread`, icon: "notifications", variant: "ghost" }, { "data-notification-open": "", "aria-haspopup": "dialog", "aria-expanded": "false" })}
          <span class="pattern-action-badge">${patternPackageDemo("badge", { label: count, tone: "warning", variant: "count", ariaLabel: `${count} unread notifications`, live: true }, { "data-notification-badge": "" })}</span>
        </span>
      </span>
      <span class="pattern-notification-demo__panel" data-notification-panel hidden>
        <header>
          <strong>${label}</strong>
          <span>${description}</span>
        </header>
        ${patternPackageDemo("list", { label: "Notification list", items }, { "data-notification-list": "" })}
        <footer>${patternPackageDemo("button", { label: "Mark all read" }, { "data-notification-read": "" })}</footer>
        <span data-notification-empty hidden>${patternPackageDemo("empty-state", { label: "All clear", description: "No notifications need attention.", icon: "notifications_none" })}</span>
        <span data-notification-toast hidden>${patternPackageDemo("toast", { label: "Notifications updated", description: "All items were marked as read.", tone: "success" }, { "data-pattern-toast": "notification" })}</span>
      </span>
    </span>
  `;
}
