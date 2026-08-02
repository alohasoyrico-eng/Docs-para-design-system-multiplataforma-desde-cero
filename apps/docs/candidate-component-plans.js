export const candidateCompositionAssessment = {
};

export const candidateCompositionPlans = {
};

export const candidateCompositionLayout = {
  fullWidthComponents: [
    "audit-event",
    "breadcrumbs",
    "card",
    "card-summary",
    "chart-panel",
    "checkbox",
    "date-picker",
    "empty-state",
    "error-panel",
    "inline-validation",
    "list",
    "movement-row",
    "pagination",
    "radio-button",
    "route-summary",
    "segmented-control",
    "select",
    "skeleton",
    "station-pin",
    "switch",
    "table",
  ],
  naturalWidthComponents: [
    "avatar",
    "badge",
    "button",
    "chip",
    "popover",
    "quick-action",
    "toast",
    "tooltip",
  ],
};

function candidate(coverage, decision, summary, patternLater, next, examples) {
  return { coverage, decision, summary, patternLater, next, examples, assessment: candidateCompositionAssessment[currentCandidateId(coverage, decision)] };
}

function assessment(status, gap, next) {
  return { status, gap, next };
}

function currentCandidateId(coverage, decision) {
  const marker = String(decision ?? "").split(" is not a package-backed component")[0].split(" is not a package-backed component yet")[0].split(" is ")[0];
  const byCoverage = Object.entries(candidateCompositionAssessment).find(([id]) => decision.toLowerCase().includes(id.replaceAll("-", " ")));
  if (byCoverage) return byCoverage[0];
  return marker.toLowerCase().replaceAll(" ", "-");
}

function example(id, label, specs) {
  return { id, label, components: specs.map(componentSpec) };
}

function componentSpec(spec) {
  const [component, label, state] = spec.split(":");
  return { component, demo: demoFor(component, label, state) };
}

function demoFor(component, label, state) {
  const demo = { label };
  if (state === "checked" || state === "selected" || state === "on") demo.checked = true;
  if (state === "disabled") demo.state = "disabled";
  if (state === "error") demo.state = "error";
  if (state === "warning") demo.state = "warning";
  if (component === "button") demo.variant = "secondary";
  if (component === "badge") demo.tone = state === "warning" ? "warning" : "info";
  if (component === "chip") demo.selected = true;
  if (component === "inline-validation") demo.message = "Resolve this before continuing.";
  if (component === "quick-action") demo.icon = quickActionIcon(label);
  if (component === "segmented-control") demo.items = segmentedItems(label);
  if (component === "table") demo.variant = "sortable";
  if (component === "tooltip") demo.content = label;
  return demo;
}

function quickActionIcon(label) {
  if (/route/i.test(label)) return "near_me";
  if (/dispute|resolve/i.test(label)) return "support_agent";
  if (/assign/i.test(label)) return "person_add";
  return "touch_app";
}

function segmentedItems(label) {
  const key = String(label ?? "week").toLowerCase();
  return [{ key: "day", label: "Day" }, { key: "week", label: label ?? "Week" }, { key: "month", label: "Month" }].map((item) => ({ ...item, selected: item.key === key }));
}
