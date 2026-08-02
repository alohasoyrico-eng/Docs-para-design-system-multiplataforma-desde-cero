import { html, icon, ui } from "./detail-tabs-core.js?v=3";

export function patternBuildGatePanel(entry) {
  const gates = entry.id === "sidebar"
    ? [
        "Parent items are the only navigation rows with icons.",
        "Active child uses aria-current and a non-color-only marker.",
        "Drawer state keeps the current route discoverable.",
        "Footer utilities stay separate from navigation groups."
      ]
    : [
        "Each slot declares ownership before implementation.",
        "Search stays a slot until Search Input or Global Search is documented.",
        "Notification and account triggers use Badge, Avatar, and Menu contracts.",
        "Mobile fallback preserves navigation, search, and account access."
      ];
  return html`
    <section class="doc-panel wide pattern-build-gates">
      <h2>${ui("build.qualityGates")}</h2>
      <div class="checklist-grid">
        ${gates.map((gate) => `<article>${icon("check_circle")}<span>${gate}</span></article>`).join("")}
      </div>
    </section>
  `;
}
