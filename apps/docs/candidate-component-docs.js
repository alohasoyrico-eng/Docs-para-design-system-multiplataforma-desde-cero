import { componentDemo } from "./component-demo.js?v=60";
import { candidateCompositionPlans } from "./candidate-component-plans.js?v=2";

let html = String.raw;
let icon = () => "";
let ui = (key) => key;
let demoCell = (_label, content) => content;
let accessibilityPanel = () => "";
let guidelinesPanel = () => "";
let specPanel = () => "";
let agentPanel = () => "";
let artifactFoundationTracePanel = () => "";

export function configureCandidateComponentDocs(nextDeps) {
  html = nextDeps.html;
  icon = nextDeps.icon;
  ui = nextDeps.ui;
  demoCell = nextDeps.demoCell;
  accessibilityPanel = nextDeps.accessibilityPanel;
  guidelinesPanel = nextDeps.guidelinesPanel;
  specPanel = nextDeps.specPanel;
  agentPanel = nextDeps.agentPanel;
  artifactFoundationTracePanel = nextDeps.artifactFoundationTracePanel;
}

export function hasCandidateCompositionPlan(id) {
  return Boolean(candidateCompositionPlans[id]);
}

export function candidateComponentTabs(entry) {
  const plan = candidateCompositionPlans[entry.id];
  const overviewBody = `${candidateStandardPanel(entry)}${candidateCoveragePanel(entry, plan)}${artifactFoundationTracePanel(entry, "Component")}`;
  const designBody = `${candidateCompositionPanel(entry, plan)}${candidateBoundaryPanel(plan)}${accessibilityPanel(entry)}${guidelinesPanel(entry)}`;
  const buildBody = `${candidateDecisionPanel(entry, plan)}${specPanel(entry)}${agentPanel(entry, "Component")}`;
  return [
    { id: "overview", label: ui("tabs.overview"), body: overviewBody },
    { id: "design", label: ui("tabs.design"), body: designBody },
    { id: "build", label: ui("tabs.build"), body: buildBody },
  ];
}

function candidateStandardPanel(entry) {
  return html`
    <section class="doc-panel wide reference-section">
      <span class="eyebrow">Candidate standard</span>
      <h2>${entry.title} documentation standard</h2>
      <p>${entry.summary}</p>
      <p>This route stays in component review while Design System proves whether package-backed components already cover the bounded control.</p>
    </section>
  `;
}

function candidateCoveragePanel(entry, plan) {
  return html`
    <section class="doc-panel wide reference-section" data-candidate-component="${entry.id}">
      <span class="eyebrow">Candidate coverage</span>
      <h2>${entry.title} stays pending</h2>
      <p>${plan.decision}</p>
      <div class="token-list">${plan.coverage.map((component) => `<code>${component}</code>`).join("")}</div>
    </section>
  `;
}

function candidateCompositionPanel(entry, plan) {
  return html`
    <section class="doc-panel wide">
      <h2>Design System composition substitute</h2>
      <p>${plan.summary}</p>
      ${candidateAssessmentMarkup(plan)}
      <div class="candidate-composition-grid">
        ${plan.examples.map((example) => demoCell(example.label, candidateExampleMarkup(example))).join("")}
      </div>
    </section>
  `;
}

function candidateAssessmentMarkup(plan) {
  const assessment = plan.assessment;
  if (!assessment) return "";
  return html`
    <div class="candidate-assessment" data-candidate-assessment="${assessment.status}">
      <div><code>Coverage</code><span>${assessment.status}</span></div>
      <div><code>Gap</code><span>${assessment.gap}</span></div>
      <div><code>Next</code><span>${assessment.next}</span></div>
    </div>
  `;
}

function candidateExampleMarkup(example) {
  const components = example.components ?? [];
  return html`
    <div class="candidate-composition" data-candidate-composition="${example.id ?? ""}">
      ${components.map(({ component, demo }) => componentDemo(component, demo ?? {})).join("")}
    </div>
  `;
}

function candidateBoundaryPanel(plan) {
  return html`
    <section class="doc-panel wide">
      <h2>Pattern boundary</h2>
      <p>${plan.patternLater}</p>
      <div class="checklist-grid">
        <article>${icon("check_circle", { tone: "success", fill: true })}<span>Use package-backed components for the visible bounded controls.</span></article>
        <article>${icon("rule", { tone: "action", fill: true })}<span>Do not move this route until substitute coverage is visible and validated.</span></article>
        <article>${icon("account_tree", { tone: "warning", fill: true })}<span>Move only the orchestration, policy, and process layer to Patterns later.</span></article>
      </div>
    </section>
  `;
}

function candidateDecisionPanel(entry, plan) {
  return html`
    <section class="doc-panel wide">
      <h2>Backlog decision</h2>
      <div class="props-table">
        <div><strong>Field</strong><strong>Decision</strong></div>
        <div><code>Candidate</code><span>${entry.title}</span></div>
        <div><code>Component coverage</code><span>${plan.coverage.join(", ")}</span></div>
        <div><code>Coverage status</code><span>${plan.assessment?.status ?? "pending"}</span></div>
        <div><code>Component gap</code><span>${plan.assessment?.gap ?? "Pending assessment."}</span></div>
        <div><code>Boundary</code><span>${plan.patternLater}</span></div>
        <div><code>Next action</code><span>${plan.next}</span></div>
        <div><code>Next decision</code><span>${plan.assessment?.next ?? plan.next}</span></div>
      </div>
    </section>
  `;
}
