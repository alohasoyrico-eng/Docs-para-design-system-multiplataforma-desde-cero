let componentCopy = {};
let componentDocs = {};
let html = String.raw;
let icon = () => "";
let ui = (key) => key;
let slug = (value) => String(value ?? "");
let artifactContract = () => null;
let componentAgentSpec = () => ({});
let referenceCopy = {};

export function configureGoldComponentContext(nextDeps) {
  componentCopy = nextDeps.componentCopy;
  componentDocs = nextDeps.componentDocs;
  html = nextDeps.html;
  icon = nextDeps.icon;
  ui = nextDeps.ui;
  slug = nextDeps.slug;
  artifactContract = nextDeps.artifactContract;
  componentAgentSpec = nextDeps.componentAgentSpec;
  referenceCopy = nextDeps.referenceCopy;
}

function componentSectionCopy(componentId, sectionId) {
  return componentCopy?.components?.[componentId]?.[sectionId]?.copy ?? "";
}

function componentSectionData(componentId, sectionId) {
  return componentCopy?.components?.[componentId]?.[sectionId] ?? {};
}

function componentApiProps(componentId) {
  return componentSectionData(componentId, "api-foundations").props ?? [];
}

function componentDemoData(componentId, sectionId, key = "demos") {
  return componentSectionData(componentId, sectionId)[key] ?? [];
}

export function demoCell(label, content) {
  return `<div class="demo-cell" data-density-context="md"><h3 class="demo-cell__title">${label}</h3><div class="demo-cell__body">${content}</div></div>`;
}

export function buttonPrimitive({ label, content = "", className = "docs-primitive-button", iconBefore = "", iconAfter = "", variant = "secondary", state = "default", attrs = "" } = {}) {
  const body = content || `${iconBefore}<span>${label ?? "Action"}</span>${iconAfter}`;
  return html`<button class="${className}" data-docs-primitive="button" data-variant="${variant}" data-state="${state}" type="button" ${attrs}>${body}</button>`;
}

export function inputPrimitive({ value = "", className = "", state = "default", attrs = "" } = {}) {
  return html`<input class="${className}" data-docs-primitive="input" data-state="${state}" value="${value}" ${attrs} />`;
}

export function componentMielPanel(entry) {
  const miel = componentSectionData(entry.id, "miel");
  const agentSpec = componentAgentSpec(entry, "Component");
  return html`
      <section class="doc-panel wide">
        <span class="eyebrow">MIEL</span>
      <h2>${ui("miel.title")}</h2>
      <p>${miel.copy}</p>
      <div class="guidelines-grid">
        <article><h3>${ui("miel.agentCanDecide")}</h3><ul>${(miel.canDecide ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article>
        <article><h3>${ui("miel.agentMustAsk")}</h3><ul>${(miel.mustAsk ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article>
        <article><h3>${ui("miel.rejectIf")}</h3><ul>${(miel.rejectIf ?? []).map((item) => `<li>${item}</li>`).join("")}</ul></article>
      </div>
    </section>
    <section class="doc-panel wide">
      <h2>${ui("miel.handoff")}</h2>
      <div class="fleet-panel-mini">
        ${icon("hive", { tone: "action", fill: true })}
        <p>${miel.handoff ?? ""}</p>
      </div>
    </section>
    <section class="doc-panel wide">
      <h2>${ui("miel.machineContract")}</h2>
      <pre>${JSON.stringify(agentSpec, null, 2)}</pre>
    </section>
  `;
}

export {
  artifactContract,
  componentAgentSpec,
  componentApiProps,
  componentCopy,
  componentDemoData,
  componentSectionCopy,
  componentSectionData,
  html,
  icon,
  referenceCopy,
  slug,
  ui,
};
