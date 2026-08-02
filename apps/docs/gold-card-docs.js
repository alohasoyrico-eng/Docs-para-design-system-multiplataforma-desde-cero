import { componentMielPanel, componentSectionCopy, componentSectionData, componentDemoData, componentApiProps, demoCell, html, icon, ui } from "./gold-component-core.js?v=211";
import { componentDemo } from "./component-demo.js?v=60";
import { cardDemoFromData, playgroundStaticControls } from "./gold-component-data.js?v=207";

export function renderCardGoldSection(entry, section) {
  const renderers = {
    "operational-example": () => cardOperationalExamplePanel(),
    anatomy: () => cardAnatomyPanel(),
    accessibility: () => cardAccessibilityPanel(),
    variants: () => cardVariantsPanel(),
    states: () => cardStatesPanel(),
    "variant-state-behavior": () => cardStateVariantMatrixPanel(),
    "full-width": () => cardFullWidthPanel(),
    "responsive-layout-patterns": () => cardResponsivePanel(),
    "viewport-organization": () => cardViewportOrganizationPanel(),
    playground: () => cardPlaygroundPanel(),
    guidelines: () => cardGuidelinesPanel(),
    "api-foundations": () => cardContractPanel(),
    "tests-rejection-rules": () => cardTestPanel(),
    miel: () => componentMielPanel(entry),
  };
  return renderers[section]?.() ?? "";
}

function cardOperationalExamplePanel() {
  const scenario = componentSectionData("card", "operational-example").scenario;
  return html`
    <section class="doc-panel wide button-operational-panel">
      <h2>${ui("component.operationalExample")}</h2>
      <p>${componentSectionCopy("card", "operational-example")}</p>
      <div class="card-scenario">
        <div class="card-scenario-grid">
          ${scenario.cards.map(cardDemoFromData).join("")}
        </div>
        <div class="fleet-panel-mini">
          <strong>${scenario.rationaleTitle}</strong>
          <ul>${(scenario.rationale ?? []).map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
    </section>
  `;
}

function cardAnatomyPanel() {
  const anatomy = componentSectionData("card", "anatomy").items ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.anatomy")}</h2>
      <div class="button-anatomy">
        ${anatomy
          .map(
            (item, index) => html`
              <article>
                <b>${index + 1}</b>
                <div>
                  <strong>${item.part}</strong>
                  <p>${item.rule}</p>
                  <div class="token-list">${item.tokens.map((token) => `<code>${token}</code>`).join("")}</div>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function cardAccessibilityPanel() {
  const accessibility = componentSectionData("card", "accessibility");
  const items = accessibility.items ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.accessibility")}</h2>
      <p>State precedence: ${accessibility.statePrecedence ?? "disabled, loading, error, selected, focus, hover, default"}.</p>
      <div class="checklist-grid">
        ${items.map((item) => `<article>${icon("check_circle", { tone: "success", fill: true })}<span>${item}</span></article>`).join("")}
      </div>
    </section>
  `;
}

function cardViewportOrganizationPanel() {
  const items = componentDemoData("card", "viewport-organization", "items");
  return html`
    <section class="doc-panel wide button-viewport-panel">
      <h2>${ui("component.viewportOrganization")}</h2>
      <p>${componentSectionCopy("card", "viewport-organization")}</p>
      <div class="viewport-doc-grid">
        ${items.map((item) => html`
          <article data-density-context="${item.density}">
            <header>${icon(item.icon)}<h3>${item.title}</h3></header>
            <p>${item.rule}</p>
            <code>${item.title}</code>
            ${cardDemoFromData(item.demo)}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function cardVariantsPanel() {
  const variants = componentDemoData("card", "variants");
  const compositions = componentSectionData("card", "reference-compositions").items ?? [];
  const defaultVariant = variants.find((demo) => demo.variant === "default") ?? variants[0];
  const mappedItems = [
    {
      label: "Default",
      reference: "Card",
      component: "card",
      demo: defaultVariant,
      flowDecision: "Base Card surface variant for stable reading surfaces."
    },
    ...compositions
  ];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.variants")}</h2>
      <p>${componentSectionCopy("card", "variants")}</p>
      <div class="card-reference-compositions">
        <p>${componentSectionCopy("card", "reference-compositions")}</p>
        <div class="card-reference-compositions__grid">
          ${mappedItems.map((item) => html`
            <article>
              <header>
                <strong>${item.label}</strong>
                <code>${item.reference}</code>
              </header>
              <div class="card-reference-compositions__demo">
                ${cardReferenceCompositionDemo(item)}
              </div>
              <p>${item.flowDecision}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function cardReferenceCompositionDemo(item) {
  if (item.reference === "CardStats") return cardStatsGridDemo(item.demos ?? [item.demo]);
  if (item.reference === "CardCompact") return cardCompactStackDemo(item.demos ?? [item.demo]);
  if (item.reference === "CardGhost") return cardGhostContextDemo(item.demo ?? {});
  return cardDemo(item.demo ?? {});
}

function cardStatsGridDemo(demos = []) {
  return html`
    <div class="card-stats-grid" aria-label="Stats card grid">
      ${demos.filter(Boolean).map((demo) => cardDemo(demo)).join("")}
    </div>
  `;
}

function cardCompactStackDemo(demos = []) {
  return html`
    <div class="card-compact-stack" aria-label="Compact card list">
      ${demos.filter(Boolean).map((demo) => cardDemo(demo)).join("")}
    </div>
  `;
}

function cardGhostContextDemo(demo = {}) {
  return html`
    <div class="card-ghost-context">
      ${cardDemo(demo)}
    </div>
  `;
}

function cardStatesPanel() {
  const states = componentDemoData("card", "states");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.states")}</h2>
      <p>${componentSectionCopy("card", "states")}</p>
      <div class="button-demo-grid states-grid">
        ${states.map((demo) => demoCell(demo.label, cardDemo(demo))).join("")}
      </div>
    </section>
  `;
}

function cardStateVariantMatrixPanel() {
  const rows = componentDemoData("card", "variant-state-behavior", "rows");
  const states = componentDemoData("card", "variant-state-behavior", "states");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.variantStateBehavior")}</h2>
      <p>${componentSectionCopy("card", "variant-state-behavior")}</p>
      <div class="button-demo-grid state-behavior-grid">
        ${rows
          .flatMap((row) =>
            states.map((state) =>
              demoCell(`${row.label} · ${state}`, cardDemo({
                title: row.label,
                value: state === "loading" ? "Loading" : "Ready",
                detail: state === "disabled" ? "No permission" : "Operational state",
                icon: "credit_card",
                variant: row.variant,
                state: state === "default" ? row.state ?? "default" : state,
                interactive: Boolean(row.interactive),
                selected: Boolean(row.selected),
              })),
            ),
          )
          .join("")}
      </div>
    </section>
  `;
}

function cardFullWidthPanel() {
  const items = componentDemoData("card", "full-width", "items");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.fullWidth")}</h2>
      <p>${componentSectionCopy("card", "full-width")}</p>
      <div class="full-width-demo">
        ${items.map((item) => html`
          <div>
            <span class="overline">${item.label}</span>
            ${item.layout === "container"
              ? `<div class="container-demo">${item.demos.map((demo) => `<div data-span="${demo.span}">${cardDemoFromData(demo)}</div>`).join("")}</div>`
              : `<div class="button-stack${item.layout === "stack-natural" ? " natural" : ""}">${cardDemoFromData(item.demo)}</div>`}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function cardResponsivePanel() {
  const examples = componentDemoData("card", "responsive-layout-patterns", "examples");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.responsiveLayoutPatterns")}</h2>
      <p>${componentSectionCopy("card", "responsive-layout-patterns")}</p>
      <div class="responsive-actions-demo">
        ${examples.map((example) => html`
          <article data-density-context="${example.density}">
            <span class="overline">${example.label}</span>
            ${example.layout === "mini-grid"
              ? `<div class="card-mini-grid">${example.demos.map((demo) => cardDemoFromData(demo)).join("")}</div>`
              : cardDemoFromData(example.demo)}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function cardPlaygroundPanel() {
  const playground = componentSectionData("card", "playground");
  return html`
    <section class="doc-panel wide button-playground" data-component-playground="card" data-ready="false">
      <h2>${ui("component.playground")}</h2>
      <p>${componentSectionCopy("card", "playground")}</p>
      <div class="playground-layout">
        <div class="playground-controls" aria-label="${ui("playground.cardControls")}">
          ${playgroundStaticControls(playground.controls ?? [], "data-component-playground-input")}
        </div>
        <div class="playground-preview">
          <div data-component-preview data-density-context="${playground.preview?.density ?? "md"}">${cardDemoFromData(playground.preview ?? {})}</div>
          <pre data-component-markup>${playground.snippet ?? ""}</pre>
        </div>
      </div>
    </section>
  `;
}

function cardContractPanel() {
  const props = componentApiProps("card");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("build.apiAndFoundations")}</h2>
      <p>${componentSectionCopy("card", "api-foundations")}</p>
      <div class="props-table">
        <div><strong>${ui("table.prop")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>
        ${props.map((prop) => `<div><code>${prop.name}</code><span>${prop.type}</span><span>${prop.required}</span><span>${prop.notes}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function cardGuidelinesPanel() {
  const groups = componentSectionData("card", "guidelines").groups ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("guidelines.title")}</h2>
      <div class="guidelines-grid">
        ${groups.map((group) => `<article><h3>${group.title}</h3><ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`).join("")}
      </div>
    </section>
  `;
}

function cardTestPanel() {
  const tests = componentSectionData("card", "tests-rejection-rules");
  const mustTest = tests.mustTest ?? [];
  const rejectIf = tests.rejectIf ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("tests.title")}</h2>
      <div class="two-column-list">
        <article><h3>${ui("tests.mustTest")}</h3><ul>${mustTest.map((item) => `<li>${item}</li>`).join("")}</ul></article>
        <article><h3>${ui("tests.rejectIf")}</h3><ul>${rejectIf.map((item) => `<li>${item}</li>`).join("")}</ul></article>
      </div>
    </section>
  `;
}

export function cardDemo(demo = {}, value, detail, iconName, state = "default") {
  const resolvedDemo = typeof demo === "object"
    ? demo
    : { title: demo, value, detail, icon: iconName, state };
  return componentDemo("card", resolvedDemo);
}
