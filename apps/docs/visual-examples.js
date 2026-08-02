let deps = {};

export function configureVisualExamples(nextDeps) {
  deps = nextDeps;
}

export function visualExample(collection, entry) {
  const { html, icon, iconFor } = deps;
  const type = entry.type ?? collection.replace(/s$/, "");
  if (type === "foundation") {
    return html`
      <div class="visual-example foundation-visual">
        <div class="signal-card strong"><span>${icon(iconFor(entry))}</span><b>${entry.title}</b></div>
        <div class="rule-lines"><i></i><i></i><i></i></div>
        <p>Decision signal before UI.</p>
      </div>
    `;
  }
  if (type === "primitive") {
    return html`
      <div class="visual-example primitive-visual">
        <div class="token-stack">
          ${entry.tokens.map((token) => `<code>${token}</code>`).join("")}
        </div>
        <div class="swatches"><i></i><i></i><i></i><i></i></div>
      </div>
    `;
  }
  if (type === "component") {
    return html`
      <div class="visual-example component-visual">
        <div class="component-demo">
          <header><span>${icon(iconFor(entry))}</span><b>${entry.title}</b></header>
          <p>${entry.platform}</p>
          <div class="demo-actions"><i></i><i></i><i></i></div>
        </div>
      </div>
    `;
  }
  if (type === "pattern") {
    return html`
      <div class="visual-example pattern-visual">
        ${["Entry", "Orient", "Act", "Recover"].map((step, index) => `<div><b>${index + 1}</b><span>${step}</span></div>`).join("")}
      </div>
    `;
  }
  if (type === "template") {
    return html`
      <div class="visual-example template-visual">
        <div class="product-window">
          <header><span></span><span></span><span></span></header>
          <main>
            <aside></aside>
            <section>
              <b>${entry.title}</b>
              <i></i><i></i><i></i>
            </section>
          </main>
        </div>
      </div>
    `;
  }
  return "";
}

export function visualPanel(entry, kind) {
  const { html, ui } = deps;
  return html`
    <section class="doc-panel wide">
      <h2>${ui("reference.visualExample")}</h2>
      <p>This example shows the expected visual grammar for ${entry.title}. It is intentionally schematic: enough to teach structure without becoming a fake final screen.</p>
      ${visualExample(kind + "s", entry)}
    </section>
  `;
}

export function examplePanel(entry) {
  const { html, ui } = deps;
  return html`
    <section class="doc-panel wide example-panel">
      <span class="eyebrow">${ui("reference.realExample")}</span>
      <h2>${exampleTitle(entry)}</h2>
      <p>${exampleCopy(entry)}</p>
      ${realExample(entry)}
    </section>
  `;
}

function exampleTitle(entry) {
  const { referenceCopy, referenceTemplate } = deps;
  const template = referenceCopy.examples?.titleTemplates?.[entry.type] ?? referenceCopy.examples?.titleTemplates?.fallback;
  return referenceTemplate(template, entry);
}

function exampleCopy(entry) {
  const { referenceCopy } = deps;
  return referenceCopy.examples?.copy?.[entry.type] ?? referenceCopy.examples?.copy?.fallback;
}

function realExample(entry) {
  if (entry.type === "foundation") return foundationExample(entry);
  if (entry.type === "primitive") return primitiveExample(entry);
  if (entry.type === "component") return componentExample(entry);
  if (entry.type === "pattern") return patternExample(entry);
  if (entry.type === "template") return templateExample(entry);
  return "";
}

export function foundationExample(entry) {
  const { html, icon, iconFor, referenceCopy, referenceTemplate } = deps;
  const example = (referenceCopy.examples?.foundationCases?.[entry.title] ?? referenceCopy.examples?.foundationCases?.fallback ?? []).map((value) => referenceTemplate(value, entry));
  return html`
    <div class="real-example foundation-case">
      <div class="case-copy">
        <strong>${example[0]}</strong>
        <p>${example[1]}</p>
        <blockquote>${example[2]}</blockquote>
      </div>
      <div class="phone-card">
        <header>${icon(iconFor(entry))}<b>${example[0]}</b></header>
        <p>${example[2]}</p>
        <button type="button">Primary recovery</button>
      </div>
    </div>
  `;
}

export function primitiveExample(entry) {
  const { html, referenceCopy, ui } = deps;
  return html`
    <div class="real-example primitive-case">
      <div>
        <h3>${ui("reference.semanticContract")}</h3>
        <div class="token-list">${entry.tokens.map((token) => `<code>${token}</code>`).join("")}</div>
      </div>
      <div class="primitive-surface">
        <span>${entry.title}</span>
        <b>${entry.title === "Typography" ? referenceCopy.primitiveSurface?.typographySample : referenceCopy.primitiveSurface?.defaultSample}</b>
        <p>${entry.summary}</p>
      </div>
    </div>
  `;
}

function componentExample(entry) {
  const { html, icon, iconFor, interpolateList, referenceCopy, referenceTemplate } = deps;
  const examples = (referenceCopy.examples?.componentCases?.[entry.title] ?? referenceCopy.examples?.componentCases?.fallback ?? []).map((value) => referenceTemplate(value, entry, { platform: entry.platform }));
  const checklist = interpolateList(referenceCopy.examples?.componentChecklist, entry, { icon: iconFor(entry) });
  return html`
    <div class="real-example component-case">
      <div class="component-screen">
        <header><span>${icon(iconFor(entry))}</span><strong>${examples[0]}</strong></header>
        <b>${examples[1]}</b>
        <p>${examples[2]}</p>
        <button type="button">${examples[3]}</button>
      </div>
      <ul>
        ${checklist.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

function patternExample(entry) {
  const { html, referenceCopy } = deps;
  const steps = entry.title.includes("Routes")
    ? referenceCopy.examples?.patternSteps?.routes
    : entry.title.includes("Dashboard")
      ? referenceCopy.examples?.patternSteps?.dashboard
      : referenceCopy.examples?.patternSteps?.fallback;
  return html`
    <div class="real-example pattern-case">
      ${steps
        .map(
          (step, index) => html`
            <article>
              <b>${index + 1}</b>
              <h3>${step}</h3>
              <p>${journeyCopy(entry, ["Entry", "Orient", "Act", "Recover"][index] ?? "Recover")}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function templateExample(entry) {
  const { html, templateBlueprintFallbacks, templateBlueprints } = deps;
  const blueprint = templateBlueprints[entry.title];
  if (!blueprint) return `<div class="real-example template-case">${templateBlueprintFallbacks.primary}</div>`;
  return html`
    <div class="real-example template-case">
      <div class="template-product ${entry.platform.toLowerCase()}">
        <aside>${blueprint.nav.map((item) => `<span>${item}</span>`).join("")}</aside>
        <main>
          <header>
            <strong>${entry.title}</strong>
            <small>${entry.platform}</small>
          </header>
          <section class="metric-row">
            ${blueprint.metrics.map(([value, label]) => `<div><b>${value}</b><span>${label}</span></div>`).join("")}
          </section>
          <section class="work-area">
            ${blueprint.modules.slice(0, 4).map((module) => `<article><strong>${module}</strong><i></i><i></i></article>`).join("")}
          </section>
        </main>
      </div>
    </div>
  `;
}

export function journeyCopy(entry, step) {
  const { referenceCopy, referenceTemplate } = deps;
  return referenceTemplate(referenceCopy.examples?.journeyCopy?.[step], entry, { summary: entry.summary });
}
