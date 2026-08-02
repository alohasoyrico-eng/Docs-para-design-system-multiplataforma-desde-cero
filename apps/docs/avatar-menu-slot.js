import { patternPackageDemo } from "./search-slot.js?v=2";

export const accountMenuSections = [
  { label: "Account", items: [{ icon: "account_circle", label: "Profile" }, { icon: "settings", label: "Settings" }] },
  { label: "Session", items: [{ icon: "logout", label: "Sign out", tone: "danger" }] },
];

export function avatarMenuItems(sections = accountMenuSections) {
  return sections.flatMap((section, index) => [
    ...(index ? [{ separator: true }] : []),
    ...section.items.map((item) => ({ label: item.label, icon: item.icon, tone: item.tone })),
  ]);
}

export function avatarMenuMarkup({
  label = "Account menu",
  trigger = "Ana Sosa",
  avatarName = "Ana Sosa",
  avatarStatus = "online",
  avatarSize = "md",
  align = "end",
  density = "md",
  sections = accountMenuSections,
  attrs = {},
} = {}) {
  return patternPackageDemo("menu", {
    label,
    trigger,
    variant: "avatar-trigger",
    avatarName,
    avatarStatus,
    avatarSize,
    align,
    density,
    items: avatarMenuItems(sections),
  }, attrs);
}
