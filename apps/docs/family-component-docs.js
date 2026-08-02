import { candidateComponentTabs, configureCandidateComponentDocs, hasCandidateCompositionPlan } from "./candidate-component-docs.js?v=1";

let componentCopy = {};
let referenceCopy = {};
let html = String.raw;
let icon = () => "";
let iconFor = () => "";
let ui = (key) => key;
let referenceTemplate = (value) => value ?? "";
let interpolateList = () => [];
let artifactContract = () => null;
let selectDemo = () => "";
let demoCell = (_label, content) => content;
let threeTabs = (_entry, overviewExtra, designBody, buildBody) => [overviewExtra, designBody, buildBody];
let accessibilityPanel = () => "";
let guidelinesPanel = () => "";
let specPanel = () => "";
let agentPanel = () => "";
let listPanel = () => "";

export function configureFamilyComponentDocs(nextDeps) {
  componentCopy = nextDeps.componentCopy;
  referenceCopy = nextDeps.referenceCopy;
  html = nextDeps.html;
  icon = nextDeps.icon;
  iconFor = nextDeps.iconFor;
  ui = nextDeps.ui;
  referenceTemplate = nextDeps.referenceTemplate;
  interpolateList = nextDeps.interpolateList;
  artifactContract = nextDeps.artifactContract;
  selectDemo = nextDeps.selectDemo;
  demoCell = nextDeps.demoCell;
  threeTabs = nextDeps.threeTabs;
  accessibilityPanel = nextDeps.accessibilityPanel;
  guidelinesPanel = nextDeps.guidelinesPanel;
  specPanel = nextDeps.specPanel;
  agentPanel = nextDeps.agentPanel;
  listPanel = nextDeps.listPanel;
  configureCandidateComponentDocs({ ...nextDeps, artifactFoundationTracePanel });
}

export function familyComponentTabs(entry) {
  if (hasCandidateCompositionPlan(entry.id)) return candidateComponentTabs(entry);
  const profile = componentFamilyProfile(entry);
  return threeTabs(
    entry,
    `${componentStandardPanel(entry, profile)}${componentScenarioPanel(entry, profile)}${artifactFoundationTracePanel(entry, "Component")}`,
    `${componentFamilyDemoPanel(entry, profile)}${componentStateMatrixPanel(entry, profile)}${componentResponsiveContractPanel(entry, profile)}${accessibilityPanel(entry)}${guidelinesPanel(entry)}`,
    `${componentFamilyApiPanel(entry, profile)}${componentFamilyTestPanel(entry, profile)}${specPanel(entry)}${agentPanel(entry, "Component")}`,
  );
}

function componentFamilyProfile(entry) {
  const standards = componentCopy?.familyStandards ?? {};
  const [family, scenario, states] = standards.profiles?.[entry.group] ?? standards.fallbackProfile ?? ["", "", []];
  return { family, scenario, states };
}

function componentStandardPanel(entry, profile) {
  return html`
    <section class="doc-panel wide reference-section">
      <span class="eyebrow">${entry.group} standard</span>
      <h2>${entry.title} documentation standard</h2>
      <p>${entry.summary}</p>
      <p>${referenceTemplate(componentCopy?.familyStandards?.standardCopy, entry, { family: profile.family })}</p>
    </section>
  `;
}

function componentScenarioPanel(entry, profile) {
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.operationalScenario")}</h2>
      <p>${profile.scenario}</p>
      <div class="component-standard-demo">
        <article>
          <header><span>${icon(iconFor(entry))}</span><strong>${entry.title}</strong></header>
          <p>${componentScenarioCopy(entry)}</p>
          <div class="component-standard-surface">${componentFamilyDemo(entry, "default")}</div>
        </article>
        <article>
          <strong>${ui("reference.mustProve")}</strong>
          <ul>${(componentCopy?.familyStandards?.mustProve ?? []).map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
      </div>
    </section>
  `;
}

function componentFamilyDemoPanel(entry, profile) {
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.groupDemo")}</h2>
      <p>${referenceTemplate(componentCopy?.familyStandards?.demoCopy, entry, { group: entry.group })}</p>
      <div class="button-demo-grid states-grid">
        ${profile.states.map((state) => demoCell(state, componentFamilyDemo(entry, state))).join("")}
      </div>
    </section>
  `;
}

function componentStateMatrixPanel(entry, profile) {
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.stateMatrix")}</h2>
      <p>${componentCopy?.familyStandards?.stateMatrixCopy}</p>
      <div class="button-demo-grid states-grid">
        ${profile.states.slice(0, 6).map((state) => demoCell(state, componentFamilyDemo(entry, state))).join("")}
      </div>
    </section>
  `;
}

function componentResponsiveContractPanel(entry) {
  return listPanel(ui("reference.responsiveBehavior"), interpolateList(componentCopy?.familyStandards?.responsiveBehavior, entry));
}

function componentFamilyApiPanel(entry) {
  const props = componentCopy?.familyStandards?.apiRows ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${entry.group} ${ui("contract.api")}</h2>
      <div class="props-table">
        <div><strong>${ui("table.prop")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>
        ${props.map((prop) => `<div><code>${prop[0]}</code><span>${prop[1]}</span><span>${prop[2]}</span><span>${prop[3]}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function componentFamilyTestPanel(entry, profile) {
  const rows = (componentCopy?.familyStandards?.testRows ?? []).map((row) =>
    row.map((value) => referenceTemplate(value, entry, { states: profile.states.join(", ") })),
  );
  return componentTestingContractPanel(entry.title, rows);
}

function componentTestingContractPanel(title, rows) {
  return html`
    <section class="doc-panel wide">
      <span class="eyebrow">${ui("reference.componentTestingContract")}</span>
      <h2>${ui("tests.required")}</h2>
      <p>${referenceTemplate(componentCopy?.familyStandards?.testingModelCopy, { title })}</p>
      <div class="props-table testing-contract-table">
        <div><strong>${ui("table.layer")}</strong><strong>${ui("table.expectation")}</strong><strong>${ui("table.foundation")}</strong><strong>${ui("table.evidence")}</strong></div>
        ${rows.map(([layer, expectation]) => `<div><code>${layer}</code><span>${expectation}</span><span>${testingFoundationFor(layer)}</span><span>${testingEvidenceFor(layer)}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function testingFoundationFor(layer) {
  const foundations = {
    Rendering: "Voice + Accessibility",
    Props: "State + Growth",
    States: "State + Energy",
    Interaction: "State + Momentum",
    Accessibility: "Accessibility + Frame",
    Responsive: "Frame + Voice",
    "Token compliance": "All foundations",
    "Product contract": "Growth + Tone",
  };
  return foundations[layer] ?? "Foundation contract";
}

function testingEvidenceFor(layer) {
  return referenceCopy.testingEvidence?.[layer] ?? referenceCopy.testingEvidence?.fallback;
}

export function artifactFoundationTracePanel(entry, artifactType) {
  const rows = artifactFoundationTraceRows(entry, artifactType);
  return html`
    <section class="doc-panel wide">
      <span class="eyebrow">${ui("reference.foundationTrace")}</span>
      <h2>${ui("reference.howFoundationsGovern")} ${entry.title}</h2>
      <p>${entry.title} must be implemented through foundation decisions before it becomes a component, pattern, or template surface.</p>
      <div class="role-grid foundation-trace-grid">
        ${rows
          .map(
            (row) => html`
              <article>
                <span>${icon(iconFor({ title: row.foundation }))}</span>
                <strong>${row.foundation}</strong>
                <p>${row.decision}</p>
                <code>${row.contract}</code>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function artifactFoundationTraceRows(entry, artifactType) {
  const contract = artifactContract(entry);
  const contractFoundations = contract?.governingFoundations ?? Object.keys(contract?.foundations ?? {});
  if (contractFoundations.length) {
    return contractFoundations.slice(0, 8).map((foundation) => ({
      foundation,
      decision: foundationTraceDecision(foundation, entry, artifactType),
      contract: foundationTraceContractFromSpec(foundation, contract) ?? foundationTraceContract(foundation),
    }));
  }

  const names = new Set(["Energy", "Voice", "Frame", "State", "Accessibility"]);
  const text = `${entry.title} ${entry.group ?? ""} ${entry.platform ?? ""} ${entry.summary ?? ""}`.toLowerCase();

  if (artifactType !== "Component") names.add("Growth");
  if (artifactType === "Template") names.add("Depth");
  if (artifactType === "Template" || artifactType === "Pattern" || /mobile|map|route|sheet|overlay|dialog|drawer|feedback|motion|loading|auth/.test(text)) names.add("Momentum");
  if (/overlay|sheet|dialog|drawer|modal|dashboard|map|detail|template|desktop/.test(text)) names.add("Depth");
  if (/feedback|error|empty|auth|otp|permission|support|content|input|onboarding/.test(text) || artifactType !== "Component") names.add("Tone");
  if (/icon|quick action|pin|map|status|illustration|symbol|station|vehicle/.test(text)) {
    names.add("Iconography");
    names.add("Symbol");
  }

  return Array.from(names)
    .slice(0, 8)
    .map((foundation) => ({
      foundation,
      decision: foundationTraceDecision(foundation, entry, artifactType),
      contract: foundationTraceContract(foundation),
    }));
}

function foundationTraceDecision(foundation, entry, artifactType) {
  const label = `${artifactType.toLowerCase()} ${entry.title}`;
  const decisions = {
    Energy: `Defines color roles for ${label}: action, status, surface, border, and feedback cannot use raw values.`,
    Voice: `Sets type scale, title rhythm, labels, helper copy, captions, and code text for ${label}.`,
    Frame: `Controls spacing, density, radius, grid, control height, and responsive rhythm for ${label}.`,
    State: `Owns hover, focus, pressed, selected, loading, disabled, error, and permission precedence for ${label}.`,
    Accessibility: `Requires keyboard, touch target, focus restoration, names, contrast, reduced motion, and recovery behavior.`,
    Growth: `Connects ${label} to adoption, maturity, telemetry, deprecation, and validation signals.`,
    Momentum: `Defines transitions, entrance, exit, loading, route change, and reduced-motion behavior for ${label}.`,
    Depth: `Defines elevation, overlay, stacking, focus layer, and spatial priority for ${label}.`,
    Tone: `Controls neutral, assistive, urgent, success, warning, and repair language for ${label}.`,
    Iconography: `Uses Material Symbols by semantic name, size, weight, label visibility, and accessible name.`,
    Symbol: `Defines the visual metaphor only when ${label} needs status, domain, or explanatory imagery.`,
  };
  return decisions[foundation] ?? `Defines the semantic rule that ${label} must follow.`;
}

function foundationTraceContract(foundation) {
  const contracts = {
    Energy: "--sys-energy-*",
    Voice: "--sys-voice-*",
    Frame: "--sys-frame-*",
    State: "--sys-state-*",
    Accessibility: "--sys-a11y-*",
    Growth: "--sys-growth-*",
    Momentum: "--sys-momentum-*",
    Depth: "--sys-depth-*",
    Tone: "--sys-tone-*",
    Iconography: "--sys-icon-*",
    Symbol: "--sys-symbol-*",
  };
  return contracts[foundation] ?? "foundation contract";
}

function foundationTraceContractFromSpec(foundation, contract) {
  const key = foundation.toLowerCase();
  return contract.tokenDependencies?.find((token) => token.toLowerCase().includes(`.${key}.`)) ?? null;
}

function componentScenarioCopy(entry) {
  return componentCopy?.familyStandards?.scenarioCopy?.[entry.group] ?? componentCopy?.familyStandards?.scenarioCopy?.fallback ?? "";
}

function componentFamilyDemo(entry, state) {
  if (entry.group === "Selection" || entry.group === "Inputs") return selectDemo(entry.title, state === "empty" ? "Choose value" : `${entry.title} value`, stateLabel(state), "sm", normalizeDemoState(state));
  if (entry.group === "Feedback") return `<div class="standard-chip ${state}">${icon(iconFor(entry))}<strong>${stateLabel(state)}</strong></div>`;
  if (entry.group === "Overlay") return `<div class="standard-popover"><button type="button">${entry.title}</button><span>${stateLabel(state)}</span></div>`;
  if (entry.group === "Dashboards" || entry.group === "Data") return `<div class="standard-metric"><strong>${state === "empty" ? "--" : "24"}</strong><span>${stateLabel(state)}</span></div>`;
  if (entry.group === "Mobile" || entry.group === "Maps") return `<div class="standard-phone-row">${icon(iconFor(entry))}<span>${stateLabel(state)}</span></div>`;
  return `<div class="standard-chip ${state}">${icon(iconFor(entry))}<strong>${stateLabel(state)}</strong></div>`;
}

function normalizeDemoState(state) {
  if (["focus", "loading", "error", "disabled", "open"].includes(state)) return state;
  if (state === "selected" || state === "filled") return "filled";
  return "";
}

function stateLabel(state) {
  const fallback = `${state.charAt(0).toUpperCase()}${state.slice(1)}`;
  return referenceCopy.stateLabels?.[state] ?? referenceTemplate(referenceCopy.stateLabels?.fallbackTemplate, {}, { state: fallback }) ?? `${fallback} state`;
}
