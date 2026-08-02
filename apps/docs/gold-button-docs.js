import { componentMielPanel, componentSectionCopy, componentSectionData, componentDemoData, demoCell, html, icon, artifactContract, componentApiProps, ui, slug } from "./gold-component-core.js?v=211";
import { componentDemo } from "./component-demo.js?v=60";

import { buttonDemoFromData, playgroundControl } from "./gold-component-data.js?v=204";

export function renderButtonGoldSection(entry, section) {
  const renderers = {
    "operational-example": () => buttonOperationalExamplePanel(),
    anatomy: () => buttonAnatomyPanel(entry),
    accessibility: () => buttonAccessibilitySummaryPanel(entry),
    variants: () => buttonVariantsPanel(),
    states: () => buttonStatesPanel(),
    "variant-state-behavior": () => buttonStateVariantMatrixPanel(),
    "full-width": () => buttonFullWidthPanel(),
    "responsive-layout-patterns": () => buttonResponsivePanel(),
    "viewport-organization": () => buttonViewportOrganizationPanel(),
    playground: () => buttonPlaygroundPanel(),
    guidelines: () => buttonGuidelinesFromSpecPanel(entry),
    "api-foundations": () => buttonContractFromSpecPanel(entry),
    "tests-rejection-rules": () => buttonTestContractFromSpecPanel(entry),
    miel: () => componentMielPanel(entry),
  };
  return renderers[section]?.() ?? "";
}

function buttonContract(entry) {
  return artifactContract(entry) ?? {};
}

function buttonOperationalExamplePanel() {
  const scenario = componentSectionData("button", "operational-example").scenario;
  return html`
    <section class="doc-panel wide button-operational-panel">
      <h2>${ui("component.operationalExample")}</h2>
      <p>${componentSectionCopy("button", "operational-example")}</p>
      <div class="button-scenario" data-density-context="md">
        <div class="driver-sheet">
          <header>
            <span>${icon(scenario.sheet.icon)}</span>
            <div><strong>${scenario.sheet.title}</strong><small>${scenario.sheet.meta}</small></div>
          </header>
          <p>${scenario.sheet.body}</p>
          <div class="button-row">
            ${scenario.sheet.actions.map(buttonDemoFromData).join("")}
          </div>
        </div>
        <div class="fleet-panel-mini">
          <strong>${scenario.rationaleTitle ?? "Why Button"}</strong>
          <ul>
            ${(scenario.rationale ?? scenario.decisions?.map((row) => row.note) ?? []).map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>
    </section>
  `;
}

function buttonAnatomyPanel(entry) {
  const anatomy = buttonContract(entry).anatomy ?? componentSectionData("button", "anatomy").items ?? [];
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
                  <div class="token-list">${(item.tokens ?? []).map((token) => `<code>${token}</code>`).join("")}</div>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function buttonAccessibilitySummaryPanel(entry) {
  const contract = buttonContract(entry);
  const accessibility = componentSectionData("button", "accessibility");
  const items = accessibility.items ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.accessibility")}</h2>
      <p>${contract.statePrecedence ? `State precedence: ${contract.statePrecedence}.` : accessibility.statePrecedence ? `State precedence: ${accessibility.statePrecedence}.` : referenceCopy.accessibility?.statePrecedenceFallback}</p>
      <div class="checklist-grid">
        ${items.map((item) => `<article>${icon("check_circle", { tone: "success", fill: true })}<span>${item}</span></article>`).join("")}
      </div>
    </section>
  `;
}

function buttonViewportOrganizationPanel() {
  const groups = componentDemoData("button", "viewport-organization", "items");
  return html`
    <section class="doc-panel wide button-viewport-panel">
      <h2>${ui("component.viewportOrganization")}</h2>
      <p>${componentSectionCopy("button", "viewport-organization")}</p>
      <div class="viewport-doc-grid">
        ${groups
          .map(
            (group) => html`
              <article data-density-context="${group.density}">
                <header>${icon(group.icon)}<h3>${group.title}</h3></header>
                <p>${group.rule}</p>
                <code>${group.layout}</code>
                ${buttonViewportSurface(group)}
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function buttonViewportSurface(group) {
  if (group.surface === "phone") {
    return html`
      <div class="viewport-phone-demo">
        <div>
          <strong>${group.titleText}</strong>
          <p>${group.detail}</p>
        </div>
        ${group.buttons.map(buttonDemoFromData).join("")}
      </div>
    `;
  }
  if (group.surface === "laptop") {
    return html`
      <div class="viewport-laptop-demo">
        <header><strong>${group.titleText}</strong><span>${group.detail}</span></header>
        <div class="button-row">${group.buttons.map(buttonDemoFromData).join("")}</div>
      </div>
    `;
  }
  return html`
    <div class="viewport-tv-demo">
      <strong>${group.titleText}</strong>
      <span>${group.detail}</span>
      <div class="button-row">${group.buttons.map(buttonDemoFromData).join("")}</div>
    </div>
  `;
}

function buttonPlaygroundPanel() {
  const playground = componentSectionData("button", "playground");
  return html`
    <section class="doc-panel wide button-playground" data-button-playground data-ready="false">
      <h2>${ui("component.playground")}</h2>
      <p>${componentSectionCopy("button", "playground")}</p>
      <div class="playground-layout">
        <form class="playground-controls" aria-label="${ui("playground.buttonControls")}">
          ${(playground.controls ?? []).map((control) => playgroundControl(control, "data-button-playground-input")).join("")}
        </form>
        <div class="playground-preview">
          <div data-button-preview data-density-context="${playground.preview?.density ?? "md"}">${buttonDemoFromData(playground.preview ?? {})}</div>
          <div class="playground-warning" data-button-warning hidden></div>
          <pre data-button-markup></pre>
        </div>
      </div>
    </section>
  `;
}

function buttonContractFromSpecPanel(entry) {
  const contract = buttonContract(entry);
  const props = (contract.props ?? []).filter((prop) => prop.name !== "density");
  const foundations = Object.entries(contract.foundations ?? {});
  return html`
    <section class="doc-panel wide">
      <h2>${ui("build.apiAndFoundations")}</h2>
      <div class="props-table">
        <div><strong>${ui("table.prop")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.default")}</strong><strong>${ui("table.rule")}</strong></div>
        ${props
          .map((prop) => `<div><code>${prop.name}</code><span>${prop.type}</span><span>${prop.default ?? (prop.required ? "required" : "none")}</span><span>${prop.description}</span></div>`)
          .join("")}
      </div>
      <div class="foundation-compact-list">
        ${foundations
          .map(([name, coverage]) => {
            const data = typeof coverage === "string" ? { status: "covered", decision: coverage, behavior: coverage, tokens: [] } : coverage;
            return html`
              <article>
                <header><strong>${name}</strong><span>${data.status}</span></header>
                <p>${data.decision}</p>
                <small>${data.behavior}</small>
                <div class="token-list">${(data.tokens ?? []).map((token) => `<code>${token}</code>`).join("")}</div>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function buttonGuidelinesFromSpecPanel(entry) {
  const guidelines = buttonContract(entry).guidelines ?? {};
  const groups = [
    [ui("guidelines.do"), guidelines.do ?? []],
    [ui("guidelines.doNot"), guidelines.dont ?? []],
    [ui("guidelines.notes"), guidelines.info ?? []],
  ];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("guidelines.title")}</h2>
      <div class="guidelines-grid">
        ${groups
          .map(
            ([title, items]) => html`
              <article>
                <h3>${title}</h3>
                <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function buttonTestContractFromSpecPanel(entry) {
  const tests = (buttonContract(entry).tests ?? []).filter((item) => !/density/i.test(item));
  const rejectIf = (buttonContract(entry).rejectIf ?? []).filter((item) => !/density/i.test(item));
  return html`
    <section class="doc-panel wide">
      <h2>${ui("tests.title")}</h2>
      <div class="two-column-list">
        <article>
          <h3>${ui("tests.mustTest")}</h3>
          <ul>${tests.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article>
          <h3>${ui("tests.rejectIf")}</h3>
          <ul>${rejectIf.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
      </div>
    </section>
  `;
}

function buttonStatesPanel() {
  const states = componentDemoData("button", "states");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.states")}</h2>
      <p>${componentSectionCopy("button", "states")}</p>
      <div class="button-demo-grid states-grid">
        ${states.map((demo) => demoCell(demo.label, buttonDemoFromData(demo.button))).join("")}
      </div>
    </section>
  `;
}

function buttonVariantsPanel() {
  const variants = componentDemoData("button", "variants");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.variants")}</h2>
      <p>${componentSectionCopy("button", "variants")}</p>
      <div class="button-demo-grid variant-grid">
        ${variants.map((demo) => demoCell(demo.label, buttonDemoFromData(demo.button))).join("")}
      </div>
    </section>
  `;
}

function buttonStateVariantMatrixPanel() {
  const rows = componentDemoData("button", "variant-state-behavior", "rows");
  const states = componentDemoData("button", "variant-state-behavior", "states");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.variantStateBehavior")}</h2>
      <p>${componentSectionCopy("button", "variant-state-behavior")}</p>
      <div class="button-demo-grid state-behavior-grid">
        ${rows
          .flatMap((row) =>
            states.map((state) =>
              demoCell(`${row.label} · ${state}`, buttonDemo(state === "loading" ? "Saving..." : row.label, row.variant, row.intent, "sm", state === "loading" ? "progress_activity" : "", state === "default" ? "" : state, "sm")),
            ),
          )
          .join("")}
      </div>
    </section>
  `;
}

function buttonFullWidthPanel() {
  const items = componentDemoData("button", "full-width", "items");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.fullWidth")}</h2>
      <p>${componentSectionCopy("button", "full-width")}</p>
      <div class="full-width-demo">
        ${items.map((item) => html`
          <div>
            <span class="overline">${item.label}</span>
            ${item.layout === "container"
              ? `<div class="container-demo">${item.buttons.map((demo) => `<div data-span="${demo.span}">${buttonDemoFromData(demo)}</div>`).join("")}</div>`
              : `<div class="button-stack${item.layout === "stack-natural" ? " natural" : ""}">${item.buttons.map(buttonDemoFromData).join("")}</div>`}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function buttonResponsivePanel() {
  const examples = componentDemoData("button", "responsive-layout-patterns", "examples");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.responsiveLayoutPatterns")}</h2>
      <p>${componentSectionCopy("button", "responsive-layout-patterns")}</p>
      <div class="responsive-actions-demo">
        ${examples.map((example) => html`
          <article>
            <span class="overline">${example.label}</span>
            <div class="${example.layout}">${example.buttons.map(buttonDemoFromData).join("")}</div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

export function buttonDemo(label, variant = "primary", intent = "", size = "", iconName = "", state = "", density = "", trailingIcon = "") {
  const resolvedDensity = density || size || "md";
  const implemented = componentDemo("button", { label, variant: variant.replace(" full", ""), intent: intent || "default", icon: iconName, trailingIcon, state, density: resolvedDensity, fullWidth: variant.includes("full") });
  if (implemented) return implemented;
  const cleanVariant = variant.replace(" full", "");
  const fullWidth = variant.includes("full") ? " data-full-width=\"true\"" : "";
  const intentAttr = intent ? ` data-intent="${intent}"` : "";
  const stateAttr = state ? ` data-state="${state}"` : "";
  const densityAttr = resolvedDensity ? ` data-density="${resolvedDensity}"` : "";
  const disabled = state === "disabled" ? " disabled aria-disabled=\"true\"" : "";
  const ariaBusy = state === "loading" ? " aria-busy=\"true\"" : "";
  const growthStage = state === "loading" ? "measured" : intent === "danger" || intent === "warning" ? "stable" : "seed";
  const eventName = `button.${slug(label)}`;
  return `<button type="button" class="button" data-variant="${cleanVariant}" data-growth-stage="${growthStage}" data-analytics-event="${eventName}"${densityAttr}${intentAttr}${stateAttr}${fullWidth}${disabled}${ariaBusy}>${iconName ? icon(iconName) : ""}<span class="button__label">${label}</span>${trailingIcon ? icon(trailingIcon) : ""}</button>`;
}
