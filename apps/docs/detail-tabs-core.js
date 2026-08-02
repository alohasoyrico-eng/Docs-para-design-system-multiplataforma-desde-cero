export let html = String.raw;
export let icon = () => "";
export let iconFor = () => "";
export let ui = (key) => key;
export let slug = (value) => String(value ?? "");
export let interpolateList = () => [];
export let referenceTemplate = (value) => value ?? "";
export let referenceCopy = {};
export let componentCopy = {};
export let patternCopy = {};
export let componentDocs = {};
export let templateBlueprints = {};
export let templateBlueprintFallbacks = {};
export let artifactContract = () => null;
export let componentAgentSpec = () => ({});
export let foundationRoles = () => [];
export let foundationExample = () => "";
export let primitiveExample = () => "";
export let examplePanel = () => "";
export let visualPanel = () => "";
export let journeyCopy = () => "";
export let cardLink = () => "";
export let findComponent = () => null;
export let findPattern = () => null;
export let goldComponentDocumentationTabs = () => [];
export let familyComponentTabs = () => [];
export let artifactFoundationTracePanel = () => "";

export function configureDetailTabsContext(nextDeps) {
  html = nextDeps.html;
  icon = nextDeps.icon;
  iconFor = nextDeps.iconFor;
  ui = nextDeps.ui;
  slug = nextDeps.slug;
  interpolateList = nextDeps.interpolateList;
  referenceTemplate = nextDeps.referenceTemplate;
  referenceCopy = nextDeps.referenceCopy;
  componentCopy = nextDeps.componentCopy;
  patternCopy = nextDeps.patternCopy;
  componentDocs = nextDeps.componentDocs;
  templateBlueprints = nextDeps.templateBlueprints;
  templateBlueprintFallbacks = nextDeps.templateBlueprintFallbacks;
  artifactContract = nextDeps.artifactContract;
  componentAgentSpec = nextDeps.componentAgentSpec;
  foundationRoles = nextDeps.foundationRoles;
  foundationExample = nextDeps.foundationExample;
  primitiveExample = nextDeps.primitiveExample;
  examplePanel = nextDeps.examplePanel;
  visualPanel = nextDeps.visualPanel;
  journeyCopy = nextDeps.journeyCopy;
  cardLink = nextDeps.cardLink;
  findComponent = nextDeps.findComponent;
  findPattern = nextDeps.findPattern;
  goldComponentDocumentationTabs = nextDeps.goldComponentDocumentationTabs;
  familyComponentTabs = nextDeps.familyComponentTabs;
  artifactFoundationTracePanel = nextDeps.artifactFoundationTracePanel;
}

export function threeTabs(entry, overviewExtra, designBody, buildBody) {
  const tabs = [
    [ui("tabs.overview"), `${overviewPanel(entry)}${teamsPanel(entry)}${overviewExtra}`],
    [ui("tabs.design"), designBody],
    [ui("tabs.build"), buildBody],
  ];
  return tabs.map(([labelText, body]) => ({ id: slug(labelText), label: labelText, body }));
}

export function overviewPanel(entry) {
  return html`
    <div class="panel-grid">
      <section class="doc-panel wide">
        <h2>${ui("overview.whyItExists")}</h2>
        <p>${entry.summary}</p>
        <p>${ui("overview.intentCopy")}</p>
      </section>
      <section class="doc-panel">
        <h2>${ui("overview.platform")}</h2>
        <p>${entry.platform}</p>
      </section>
      <section class="doc-panel">
        <h2>${ui("overview.publicTokens")}</h2>
        <div class="token-list">${entry.tokens.map((token) => `<code>${token}</code>`).join("")}</div>
      </section>
    </div>
  `;
}

export function teamsPanel(entry) {
  const teamNotes = referenceCopy.teamNotes ?? {};
  const audiences = entry.audiences.length ? entry.audiences : ["Product Designers", "Developers", "PMs"];
  return html`
    <div class="audience-grid">
      ${audiences
        .map(
          (audience) => html`
            <section class="doc-panel">
              <h2>${audience}</h2>
              <p>${teamNotes[audience] ?? teamNotes.fallback}</p>
            </section>
          `,
        )
        .join("")}
    </div>
  `;
}

export function rulesPanel(entry) {
  return listPanel(ui("reference.rules"), interpolateList(referenceCopy.rules, entry));
}

export function decisionPanel(entry) {
  return listPanel(ui("reference.decisionTree"), interpolateList(referenceCopy.decisionTree, entry));
}

export function tokenPanel(entry) {
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.tokenModel")}</h2>
      <p>${referenceCopy.tokenModel?.copy}</p>
      <div class="token-list">${entry.tokens.map((token) => `<code>${token}</code>`).join("")}</div>
    </section>
  `;
}

export function accessibilityPanel(entry) {
  return listPanel(ui("reference.accessibilityContract"), interpolateList(referenceCopy.primitive?.accessibility, entry));
}

export function engineeringPanel(entry) {
  const contract = artifactContract(entry);
  const items = contract
    ? [
        contract.primitiveDependencies?.length ? `Primitive dependencies: ${contract.primitiveDependencies.join(", ")}.` : "",
        contract.componentDependencies?.length ? `Component dependencies: ${contract.componentDependencies.join(", ")}.` : "",
        contract.patternDependencies?.length ? `Pattern dependencies: ${contract.patternDependencies.join(", ")}.` : "",
        contract.tokenDependencies?.length ? `Token dependencies: ${contract.tokenDependencies.join(", ")}.` : "",
        contract.states?.length ? `States: ${contract.states.join(", ")}.` : "",
        contract.agentInstructions?.length ? `Implementation instructions: ${contract.agentInstructions.join(" ")}` : "",
      ].filter(Boolean)
    : referenceCopy.engineering?.fallbackItems ?? [];
  const payload = contract
    ? {
        artifact: entry.title,
        layer: contract.layer,
        platform: contract.platform,
        tokenDependencies: contract.tokenDependencies ?? [],
        primitiveDependencies: contract.primitiveDependencies ?? [],
        componentDependencies: contract.componentDependencies ?? [],
        patternDependencies: contract.patternDependencies ?? [],
      }
    : {
        artifact: entry.title,
        layer: entry.type,
        platform: entry.platform,
        tokens: entry.tokens,
      };
  return html`
    <section class="doc-panel wide">
      <h2>${ui("build.engineeringContract")}</h2>
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <pre>${JSON.stringify(payload, null, 2)}</pre>
    </section>
  `;
}

export function specPanel(entry) {
  const props = specProps(entry);
  const gates = specQualityGates(entry);
  return html`
    <section class="doc-panel wide">
      <h2>${ui("build.specAndApi")}</h2>
      <p>${ui("build.specIntro")}</p>
      <div class="props-table">
        <div><strong>${ui("table.name")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>
        ${props
          .map(
            (prop) => html`
              <div>
                <code>${prop[0]}</code>
                <span>${prop[1]}</span>
                <span>${prop[2]}</span>
                <span>${prop[3]}</span>
              </div>
            `,
          )
          .join("")}
      </div>
      <div class="quality-gates">
        <h3>${ui("build.qualityGates")}</h3>
        <ul>
          ${gates.map((gate) => `<li>${gate}</li>`).join("")}
        </ul>
      </div>
    </section>
  `;
}

export function specProps(entry) {
  const contract = artifactContract(entry);
  const blueprint = entry.type === "template" ? templateBlueprints[entry.title] : null;
  const contractProps = contract?.api?.props;
  if (Array.isArray(contractProps) && contractProps.length) {
    return contractProps.map((prop) => Array.isArray(prop)
      ? prop
      : [prop, "contract prop", "conditional", `Declared by the ${entry.title} contract.`]);
  }
  if (blueprint) {
    return [
      ["modules", "TemplateModule[]", "yes", "Screen modules owned by the template."],
      ["states", "TemplateState[]", "yes", "Critical states covered by the template."],
      ["permissions", "Permission[]", "conditional", "Only when the product surface requires access control."],
      ["telemetry", "TelemetryEvent[]", "yes", "Signals tied to product decisions."],
    ];
  }
  return interpolateList(referenceCopy.primitive?.apiRows ?? referenceCopy.spec?.apiRows ?? [], entry);
}

export function specQualityGates(entry) {
  const blueprint = entry.type === "template" ? templateBlueprints[entry.title] : null;
  if (blueprint?.qualityGates?.length) return blueprint.qualityGates;
  return referenceCopy.spec?.qualityGates ?? [];
}

export function guidelinesPanel(entry) {
  const contract = artifactContract(entry);
  const doItems = ["pattern", "template"].includes(entry.type) && contract?.agentInstructions ? contract.agentInstructions : referenceCopy.guidelines?.do ?? [];
  const dontItems = ["pattern", "template"].includes(entry.type) && contract?.rejectIf ? contract.rejectIf : referenceCopy.guidelines?.doNot ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("guidelines.title")}</h2>
      <div class="guidelines-grid">
        <article>
          <h3>${ui("guidelines.do")}</h3>
          <ul>
            ${doItems.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
        <article>
          <h3>${ui("guidelines.doNot")}</h3>
          <ul>
            ${dontItems.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
      </div>
    </section>
  `;
}

export function demoMatrixPanel(entry) {
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.demoMatrix")}</h2>
      <p>${referenceCopy.demoMatrix?.copy}</p>
      <div class="demo-matrix">
        ${(referenceCopy.demoMatrix?.states ?? []).map((state) => `<span>${state}</span>`).join("")}
        ${(referenceCopy.demoMatrix?.platforms ?? []).map((state) => `<span>${state}</span>`).join("")}
      </div>
    </section>
  `;
}

export function agentPanel(entry, layerName) {
  const contract = artifactContract(entry);
  const agentSpec = componentAgentSpec(entry, layerName);
  const briefExamples = interpolateList(referenceCopy.mielGeneric?.brief, entry);
  const canDecide = interpolateList(referenceCopy.mielGeneric?.canDecide, entry);
  const mustAsk = interpolateList(referenceCopy.mielGeneric?.mustAsk, entry);
  const preserve = interpolateList(referenceCopy.mielGeneric?.preserve, entry);
  if (contract) {
    return html`
      <section class="doc-panel wide">
        <span class="eyebrow">MIEL</span>
        <h2>${ui("miel.title")}</h2>
        <p>${ui("miel.intro")}</p>
        <div class="guidelines-grid">
          <article><h3>${ui("miel.briefAgent")}</h3><ul>${briefExamples.map((item) => `<li>${item}</li>`).join("")}</ul></article>
          <article><h3>${ui("miel.agentCanDecide")}</h3><ul>${canDecide.map((item) => `<li>${item}</li>`).join("")}</ul></article>
          <article><h3>${ui("miel.agentMustAsk")}</h3><ul>${mustAsk.map((item) => `<li>${item}</li>`).join("")}</ul></article>
        </div>
      </section>
      <section class="doc-panel wide">
        <h2>${ui("miel.humanReview")}</h2>
        <div class="checklist-grid">
          ${preserve.map((item) => `<article>${icon("check_circle")}<span>${item}</span></article>`).join("")}
        </div>
      </section>
      <section class="doc-panel wide">
        <h2>${ui("miel.machineContract")}</h2>
        <pre>${JSON.stringify(agentSpec, null, 2)}</pre>
      </section>
    `;
  }
  return html`
    <section class="doc-panel wide">
      <span class="eyebrow">MIEL</span>
      <h2>${ui("miel.title")}</h2>
      <p>${ui("miel.intro")}</p>
      <div class="guidelines-grid">
        <article><h3>${ui("miel.briefAgent")}</h3><ul>${briefExamples.map((item) => `<li>${item}</li>`).join("")}</ul></article>
        <article><h3>${ui("miel.agentCanDecide")}</h3><ul>${canDecide.map((item) => `<li>${item}</li>`).join("")}</ul></article>
        <article><h3>${ui("miel.agentMustAsk")}</h3><ul>${mustAsk.map((item) => `<li>${item}</li>`).join("")}</ul></article>
      </div>
    </section>
    <section class="doc-panel wide">
      <h2>${ui("miel.humanReview")}</h2>
      <div class="checklist-grid">
        ${preserve.map((item) => `<article>${icon("check_circle")}<span>${item}</span></article>`).join("")}
      </div>
    </section>
    <section class="doc-panel wide">
      <h2>${ui("miel.machineContract")}</h2>
      <pre>${JSON.stringify(agentSpec, null, 2)}</pre>
    </section>
  `;
}

export function listPanel(title, items) {
  return html`
    <section class="doc-panel wide">
      <h2>${title}</h2>
      <ul>${items.map((entry) => `<li>${entry}</li>`).join("")}</ul>
    </section>
  `;
}
