import { artifactContract, artifactFoundationTracePanel, cardLink, examplePanel, findPattern, html, icon, interpolateList, referenceCopy, referenceTemplate, slug, templateBlueprintFallbacks, templateBlueprints, ui, listPanel, engineeringPanel, specPanel, guidelinesPanel, agentPanel, overviewPanel, teamsPanel } from "./detail-tabs-core.js?v=3";
import { desktopTemplateDemo } from "./template-desktop-demos.js?v=15";

export function templateTabs(entry) {
  const blueprint = templateBlueprints[entry.title];
  const tabs = [
    [ui("tabs.overview"), `${desktopTemplateDemo(entry, blueprint)}${overviewPanel(entry)}${teamsPanel(entry)}${templateStandardPanel(entry)}${artifactFoundationTracePanel(entry, "Template")}${productPanel(entry)}${examplePanel(entry)}`],
    [ui("tabs.design"), `${templateScreenSystemPanel(entry)}${iaPanel(entry)}${flowsPanel(entry)}${templateStateMatrixPanel(entry)}${dataPanel(entry)}${guidelinesPanel(entry)}`],
    [ui("tabs.build"), `${templateContractPanel(entry)}${engineeringPanel(entry)}${specPanel(entry)}${agentPanel(entry, "Template")}`],
  ];
  return tabs.map(([labelText, body]) => ({ id: slug(labelText), label: labelText, body }));
}

export function productPanel(entry) {
  const blueprint = templateBlueprints[entry.title];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.productContext")}</h2>
      <p>${entry.summary}</p>
      <p>${blueprint?.primary ?? templateBlueprintFallbacks.primary}</p>
      ${
        blueprint
          ? `<div class="blueprint-grid">${blueprint.modules.map((module) => `<article><strong>${module}</strong><span>${moduleBlueprintCopy(blueprint, module)}</span></article>`).join("")}</div>`
          : ""
      }
    </section>
  `;
}

export function templateStandardPanel(entry) {
  const blueprint = templateBlueprints[entry.title];
  return html`
    <section class="doc-panel wide reference-section">
      <span class="eyebrow">${ui("reference.templateStandard")}</span>
      <h2>${entry.title} production model</h2>
      <p>${entry.summary}</p>
      <p>${blueprint?.standard ?? templateBlueprintFallbacks.standard}</p>
    </section>
  `;
}

export function templateScreenSystemPanel(entry) {
  const blueprint = templateBlueprints[entry.title];
  const modules = blueprint?.modules ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.screenSystem")}</h2>
      <p>${blueprint?.screenSystem ?? templateBlueprintFallbacks.screenSystem}</p>
      <div class="role-grid">
        ${modules.map((module) => `<article><span>${icon(moduleBlueprintIcon(blueprint, module))}</span><strong>${module}</strong><p>${moduleBlueprintCopy(blueprint, module)}</p></article>`).join("")}
      </div>
    </section>
  `;
}

export function templateStateMatrixPanel(entry) {
  const blueprint = templateBlueprints[entry.title];
  const states = blueprint?.states ?? ["loaded", "loading", "empty", "error", "permission", "offline"];
  const surfaces = blueprint?.surfaces ?? ["Mobile", "Tablet", "Laptop", "Desktop"];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.templateStateMatrix")}</h2>
      <p>${referenceTemplate(templateBlueprintFallbacks.stateMatrixCopy, entry)}</p>
      <div class="button-matrix">
        <span></span>
        ${surfaces.map((surface) => `<strong>${surface}</strong>`).join("")}
        ${states.map((state) => `<b>${state}</b>${surfaces.map((surface) => `<div class="standard-chip ${state}"><strong>${surface}</strong><span>${stateLabel(state)}</span></div>`).join("")}`).join("")}
      </div>
    </section>
  `;
}

export function stateLabel(state) {
  const fallback = `${state.charAt(0).toUpperCase()}${state.slice(1)}`;
  return referenceCopy.stateLabels?.[state] ?? referenceTemplate(referenceCopy.stateLabels?.fallbackTemplate, {}, { state: fallback }) ?? `${fallback} state`;
}

export function templateContractPanel(entry) {
  const blueprint = templateBlueprints[entry.title];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("contract.template")}</h2>
      <div class="props-table">
        <div><strong>${ui("table.field")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>
        ${[
          ["patternsUsed", "PatternRef[]", "yes", (entry.patternsUsed ?? []).join(", ")],
          ["dataSources", "DataSource[]", "yes", blueprint?.data?.join(", ") ?? templateBlueprintFallbacks.dataSources],
          ["permissions", "PermissionRole[]", "yes", blueprint?.permissions?.join(", ") ?? templateBlueprintFallbacks.permissions],
          ["states", "StateMatrix", "yes", blueprint?.states?.join(", ") ?? templateBlueprintFallbacks.states],
          ["telemetry", "EventSpec[]", "yes", blueprint?.telemetry?.join(", ") ?? templateBlueprintFallbacks.telemetry],
        ].map((row) => `<div><code>${row[0]}</code><span>${row[1]}</span><span>${row[2]}</span><span>${row[3]}</span></div>`).join("")}
      </div>
    </section>
  `;
}

export function iaPanel(entry) {
  const patternsUsed = entry.patternsUsed ?? [];
  const blueprint = templateBlueprints[entry.title];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.informationArchitecture")}</h2>
      <p>${blueprint?.informationArchitecture ?? templateBlueprintFallbacks.informationArchitecture}</p>
      ${blueprint ? `<div class="nav-model">${blueprint.nav.map((item) => `<span>${item}</span>`).join("")}</div>` : ""}
      <div class="relation-grid">
        ${patternsUsed.map((name) => cardLink("patterns", slug(name), "account_tree", name, findPattern(name)?.summary ?? "Pattern contract.")).join("")}
      </div>
    </section>
  `;
}

export function flowsPanel(entry) {
  const blueprint = templateBlueprints[entry.title];
  const flows = (entry.patternsUsed ?? []).map((patternName) => `${patternName}: ${blueprint?.processDetails?.[patternName] ?? templateBlueprintFallbacks.processDetail}`);
  return html`
    ${listPanel(ui("reference.coreProcesses"), flows)}
    ${blueprint ? listPanel(ui("reference.templateModules"), blueprint.modules) : ""}
  `;
}

export function dataPanel(entry) {
  const blueprint = templateBlueprints[entry.title];
  return listPanel(ui("reference.dataPermissions"), [
    ...(blueprint ? blueprint.data.map((item) => `Data source: ${item}.`) : [templateBlueprintFallbacks.dataPermissions?.[0]]),
    ...(blueprint ? blueprint.permissions.map((item) => `Permission: ${item}.`) : [templateBlueprintFallbacks.dataPermissions?.[1]]),
    ...(blueprint?.telemetry ? blueprint.telemetry.map((item) => `Telemetry: ${item}.`) : [templateBlueprintFallbacks.dataPermissions?.[2]]),
    ...(blueprint?.qualityGates ?? [templateBlueprintFallbacks.dataPermissions?.[3]]),
  ]);
}

export function moduleBlueprintCopy(blueprint, module) {
  return blueprint?.moduleDetails?.[module]?.copy ?? templateBlueprintFallbacks.moduleDetail;
}

export function moduleBlueprintIcon(blueprint, module) {
  return blueprint?.moduleDetails?.[module]?.icon ?? "view_quilt";
}
