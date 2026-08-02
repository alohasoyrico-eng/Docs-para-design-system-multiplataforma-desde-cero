import { examplePanel, html, icon, interpolateList, primitiveExample, referenceCopy, threeTabs, ui, listPanel, guidelinesPanel, specPanel, agentPanel } from "./detail-tabs-core.js?v=3";

export function primitiveTabs(entry) {
  if (entry.title === "Density") {
    return threeTabs(
      entry,
      `${primitiveOverviewPanel(entry)}${densityCoordinatorPanel()}${primitiveDemoPanel(entry)}${examplePanel(entry)}`,
      `${densityDecisionPanel()}${primitiveResponsibilitiesPanel(entry)}${primitiveTokenChainPanel(entry)}${guidelinesPanel(entry)}`,
      `${primitiveApiPanel(entry)}${specPanel(entry)}${agentPanel(entry, "Primitive")}`,
    );
  }
  return threeTabs(entry, `${primitiveOverviewPanel(entry)}${primitiveDemoPanel(entry)}${examplePanel(entry)}`, `${primitiveResponsibilitiesPanel(entry)}${primitiveTokenChainPanel(entry)}${guidelinesPanel(entry)}`, `${primitiveApiPanel(entry)}${specPanel(entry)}${agentPanel(entry, "Primitive")}`);
}

export function primitiveOverviewPanel(entry) {
  return html`
    <section class="doc-panel wide reference-section">
      <span class="eyebrow">${ui("reference.primitiveOverview")}</span>
      <h2>${entry.title}</h2>
      <p>${entry.summary}</p>
      <p>${referenceCopy.primitive?.overviewCopy}</p>
    </section>
  `;
}

export function densityCoordinatorPanel() {
  const dependencies = referenceCopy.density?.dependencies ?? [];
  return html`
    <section class="doc-panel wide density-coordinator-panel">
      <h2>${ui("reference.coordinatorRole")}</h2>
      <p>${referenceCopy.density?.coordinatorCopy}</p>
      <div class="density-coordinator-grid">
        ${dependencies
          .map(
            ([name, copy, iconName]) => html`
              <article>
                ${icon(iconName)}
                <strong>${name}</strong>
                <span>${copy}</span>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

export function densityDecisionPanel() {
  const rows = referenceCopy.density?.decisionRows ?? [];
  return html`
    <section class="doc-panel wide density-decision-panel">
      <h2>${ui("reference.densityDecision")}</h2>
      <p>${referenceCopy.density?.decisionCopy}</p>
      <div class="density-decision-grid">
        ${rows
          .map(
            ([density, title, context, outcome]) => html`
              <article data-density-context="${density}">
                <header><strong>${density}</strong><span>${title}</span></header>
                <p>${context}</p>
                <small>${outcome}</small>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

export function primitiveDemoPanel(entry) {
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.liveDemo")}</h2>
      <p>${referenceCopy.primitive?.demoCopy}</p>
      ${primitiveExample(entry)}
    </section>
  `;
}

export function primitiveResponsibilitiesPanel(entry) {
  return listPanel(ui("reference.responsibilities"), interpolateList(referenceCopy.primitive?.responsibilities, entry));
}

export function primitiveTokenChainPanel(entry) {
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.tokenChain")}</h2>
      <p>${referenceCopy.primitive?.tokenChainCopy}</p>
      <div class="architecture-chain">
        ${(referenceCopy.primitive?.tokenChainSteps ?? []).map((step, index) => `<article><b>${index + 1}</b><span>${step}</span></article>`).join("")}
      </div>
      <div class="token-list">${entry.tokens.map((token) => `<code>${token}</code>`).join("")}</div>
    </section>
  `;
}

export function primitiveApiPanel(entry) {
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.primitiveApi")}</h2>
      <div class="props-table">
        <div><strong>${ui("table.prop")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>
        ${(referenceCopy.primitive?.apiRows ?? [])
          .map((row) => row.map((value) => referenceTemplate(value, entry)))
          .map((row) => `<div><code>${row[0]}</code><span>${row[1]}</span><span>${row[2]}</span><span>${row[3]}</span></div>`)
          .join("")}
      </div>
    </section>
  `;
}

export function usagePanel(entry) {
  return listPanel(ui("reference.usageRules"), interpolateList(referenceCopy.primitive?.usageRules, entry));
}

export function anatomyPanel(entry) {
  return listPanel(ui("reference.anatomy"), interpolateList(referenceCopy.primitive?.anatomy, entry));
}

export function statesPanel() {
  return listPanel(ui("reference.requiredStates"), interpolateList(referenceCopy.primitive?.states));
}
