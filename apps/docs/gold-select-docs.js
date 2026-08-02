import { componentCopy, componentMielPanel, componentSectionCopy, componentSectionData, componentDemoData, componentApiProps, demoCell, html, icon, ui, slug } from "./gold-component-core.js?v=211";
import { componentDemo } from "./component-demo.js?v=60";
import { playgroundStaticControls, selectDemoFromData } from "./gold-component-data.js?v=206";

export function renderSelectGoldSection(entry, section) {
  const renderers = {
    "operational-example": () => selectOperationalExamplePanel(),
    anatomy: () => selectAnatomyPanel(),
    accessibility: () => selectAccessibilityPanel(),
    variants: () => selectVariantsPanel(),
    states: () => selectStatesPanel(),
    "variant-state-behavior": () => selectStateVariantMatrixPanel(),
    "full-width": () => selectFullWidthPanel(),
    "responsive-layout-patterns": () => selectResponsivePanel(),
    "viewport-organization": () => selectViewportOrganizationPanel(),
    playground: () => selectPlaygroundPanel(),
    guidelines: () => selectGuidelinesPanel(),
    "api-foundations": () => selectContractPanel(),
    "tests-rejection-rules": () => selectTestPanel(),
    miel: () => componentMielPanel(entry),
  };
  return renderers[section]?.() ?? "";
}

function selectOperationalExamplePanel() {
  const scenario = componentSectionData("select", "operational-example").scenario;
  return html`
    <section class="doc-panel wide button-operational-panel">
      <h2>${ui("component.operationalExample")}</h2>
      <p>${componentSectionCopy("select", "operational-example")}</p>
      <div class="select-scenario">
        <div class="filter-console">
          <header>
            <span>${icon(scenario.console.icon)}</span>
            <div><strong>${scenario.console.title}</strong><small>${scenario.console.meta}</small></div>
          </header>
          <div class="select-stack">
            ${scenario.console.fields.map(selectDemoFromData).join("")}
          </div>
        </div>
        <div class="fleet-panel-mini">
          <strong>${scenario.rationaleTitle}</strong>
          <ul>
            ${scenario.rationale.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>
    </section>
  `;
}

function selectAnatomyPanel() {
  const anatomy = componentSectionData("select", "anatomy").items ?? [];
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

function selectAccessibilityPanel() {
  const accessibility = componentSectionData("select", "accessibility");
  const items = accessibility.items ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.accessibility")}</h2>
      <p>State precedence: ${accessibility.statePrecedence ?? "disabled, loading, error, open, focus, filled, default"}.</p>
      <div class="checklist-grid">
        ${items.map((item) => `<article>${icon("check_circle", { tone: "success", fill: true })}<span>${item}</span></article>`).join("")}
      </div>
    </section>
  `;
}

function selectViewportOrganizationPanel() {
  const items = componentDemoData("select", "viewport-organization", "items");
  return html`
    <section class="doc-panel wide button-viewport-panel">
      <h2>${ui("component.viewportOrganization")}</h2>
      <p>${componentSectionCopy("select", "viewport-organization")}</p>
      <div class="viewport-doc-grid">
        ${items.map((item) => html`
          <article data-density-context="${item.density}">
            <header>${icon(item.icon)}<h3>${item.title}</h3></header>
            <p>${item.rule}</p>
            <code>${item.title}</code>
            ${selectDemoFromData(item.demo)}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function selectVariantsPanel() {
  const variants = componentDemoData("select", "variants");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.variants")}</h2>
      <p>${componentSectionCopy("select", "variants")}</p>
      <div class="button-demo-grid states-grid">
        ${variants.map((demo) => demoCell(demo.label, selectDemo(demo.field, demo.value, demo.helper, demo.density, demo.state, demo.variant, demo.icon ?? ""))).join("")}
      </div>
    </section>
  `;
}

function selectStatesPanel() {
  const states = componentDemoData("select", "states");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.states")}</h2>
      <p>${componentSectionCopy("select", "states")}</p>
      <div class="button-demo-grid states-grid">
        ${states.map((demo) => demoCell(demo.label, selectDemo(demo.field, demo.value, demo.helper, demo.density, demo.state, demo.variant ?? "default", demo.icon ?? ""))).join("")}
      </div>
    </section>
  `;
}

function selectStateVariantMatrixPanel() {
  const rows = componentDemoData("select", "variant-state-behavior", "rows");
  const states = componentDemoData("select", "variant-state-behavior", "states");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.variantStateBehavior")}</h2>
      <p>${componentSectionCopy("select", "variant-state-behavior")}</p>
      <div class="button-demo-grid state-behavior-grid">
        ${rows
          .flatMap((row) =>
            states.map((state) =>
              demoCell(`${row.label} · ${state}`, selectDemo(row.field, state === "loading" ? "Loading..." : row.value, state === "disabled" ? "No permission" : "Operational filter", "sm", state === "default" ? "" : state, "default", row.icon ?? "")),
            ),
          )
          .join("")}
      </div>
    </section>
  `;
}

function selectFullWidthPanel() {
  const items = componentDemoData("select", "full-width", "items");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.fullWidth")}</h2>
      <p>${componentSectionCopy("select", "full-width")}</p>
      <div class="full-width-demo">
        ${items.map((item) => html`
          <div>
            <span class="overline">${item.label}</span>
            ${item.layout === "container"
              ? `<div class="container-demo">${item.demos.map((demo) => `<div data-span="${demo.span}">${selectDemoFromData(demo)}</div>`).join("")}</div>`
              : `<div class="button-stack${item.layout === "stack-natural" ? " natural" : ""}">${selectDemoFromData(item.demo)}</div>`}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function selectResponsivePanel() {
  const examples = componentDemoData("select", "responsive-layout-patterns", "examples");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("component.responsiveLayoutPatterns")}</h2>
      <p>${componentSectionCopy("select", "responsive-layout-patterns")}</p>
      <div class="responsive-actions-demo">
        ${examples.map((example) => html`
          <article>
            <span class="overline">${example.label}</span>
            ${example.layout === "density-scale"
                ? `<div class="select-density-scale">${example.demos.map((demo) => `<div data-density-label="${demo.density}">${selectDemoFromData(demo)}</div>`).join("")}</div>`
              : `<div class="${example.layout}">${example.demos.map((demo) => selectDemoFromData(demo)).join("")}</div>`}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function selectPlaygroundPanel() {
  const playground = componentSectionData("select", "playground");
  return html`
    <section class="doc-panel wide button-playground" data-component-playground="select" data-ready="false">
      <h2>${ui("component.playground")}</h2>
      <p>${componentSectionCopy("select", "playground")}</p>
      <div class="playground-layout">
        <div class="playground-controls" aria-label="${ui("playground.selectControls")}">
          ${playgroundStaticControls(playground.controls ?? [], "data-component-playground-input")}
        </div>
        <div class="playground-preview">
          <div data-component-preview data-density-context="${playground.preview?.density ?? "md"}">${selectDemoFromData(playground.preview ?? {})}</div>
          <pre data-component-markup>${playground.snippet ?? ""}</pre>
        </div>
      </div>
    </section>
  `;
}

function selectContractPanel() {
  const props = componentApiProps("select");
  return html`
    <section class="doc-panel wide">
      <h2>${ui("build.apiAndFoundations")}</h2>
      <p>${componentSectionCopy("select", "api-foundations")}</p>
      <div class="props-table">
        <div><strong>${ui("table.prop")}</strong><strong>${ui("table.type")}</strong><strong>${ui("table.required")}</strong><strong>${ui("table.notes")}</strong></div>
        ${props.map((prop) => `<div><code>${prop.name}</code><span>${prop.type}</span><span>${prop.required}</span><span>${prop.notes}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function selectGuidelinesPanel() {
  const groups = componentSectionData("select", "guidelines").groups ?? [];
  return html`
    <section class="doc-panel wide">
      <h2>${ui("guidelines.title")}</h2>
      <div class="guidelines-grid">
        ${groups.map((group) => `<article><h3>${group.title}</h3><ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`).join("")}
      </div>
    </section>
  `;
}

function selectTestPanel() {
  const tests = componentSectionData("select", "tests-rejection-rules");
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

export function selectDemo(label, value, helper, density = "", state = "", variant = "default", leadingIcon = "") {
  const implemented = componentDemo("select", { field: label, value, helper, density, state, variant, icon: leadingIcon });
  if (implemented) return implemented;
  const classes = ["select"];
  if (state) classes.push(`is-${state}`);
  const isBlocked = ["loading", "disabled", "error"].includes(state);
  const options = selectDemoOptions(label, value);
  const densityAttr = density ? ` data-density-context="${density}"` : "";
  const menuId = `select-demo-${slug(`${label}-${value}-${density || "inherited"}-${state}`)}-${Math.random().toString(36).slice(2, 7)}`;
  return html`
    <div class="${classes.join(" ")}"${densityAttr} data-interactive-select="${isBlocked ? "false" : "true"}" role="combobox" aria-expanded="${state === "open"}" aria-disabled="${state === "disabled"}" aria-controls="${menuId}">
      <label>${label}</label>
      <button type="button"${isBlocked ? " disabled" : ""}>
        <span data-select-value>${value}</span>
        ${state === "loading" ? icon("progress_activity") : icon("menu_open")}
      </button>
      <small data-select-helper>${helper}</small>
      ${
        isBlocked
          ? ""
          : `<div class="select-menu" id="${menuId}" role="listbox" hidden>
              ${options
                .map(
                  (option) => `<button type="button" role="option" aria-selected="${option.label === value}" data-value="${option.label}" data-helper="${option.helper}">
                    ${icon(option.icon)}
                    <span><strong>${option.label}</strong><small>${option.helper}</small></span>
                  </button>`,
                )
                .join("")}
            </div>`
      }
    </div>
  `;
}

function selectDemoOptions(label, value) {
  const options = componentCopy?.components?.select?.demoOptions?.[label] ?? [
    { label: value, helper: "Selected value", icon: "check" },
    { label: "All", helper: "No filter applied", icon: "filter_alt" },
    { label: "None", helper: "Clear selection", icon: "block" },
  ];
  const normalizedOptions = options.map((option) => ({ label: option.label, helper: option.helper, icon: option.icon }));
  if (!normalizedOptions.some((option) => option.label === value)) normalizedOptions.unshift({ label: value, helper: ui("select.currentSelection"), icon: "check" });
  return normalizedOptions;
}
