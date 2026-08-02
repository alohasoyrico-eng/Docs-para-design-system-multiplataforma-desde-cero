let deps = {};

export function configureReferenceLayout(nextDeps) {
  deps = nextDeps;
}

export function referenceBreadcrumbs(collection, entry) {
  const { html, label, ui } = deps;
  return html`
    <nav class="breadcrumbs" aria-label="${ui("shell.breadcrumbs")}">
      <a href="#/home">${ui("shell.home")}</a>
      <span>/</span>
      <a href="#/${collection}">${label(collection)}</a>
      <span>/</span>
      <strong>${entry.title}</strong>
    </nav>
  `;
}

export function referencePeerNav(collection, entry) {
  const { collections, html, icon, iconFor, label, ui } = deps;
  const values = collections[collection];
  return html`
    <aside class="reference-peer-nav" aria-label="${label(collection)} ${ui("shell.detailNavigation")}">
      <strong>${label(collection)}</strong>
      <nav>
        ${values.map((item) => `<a class="${item.id === entry.id ? "active" : ""}" href="#/${collection}/${item.id}">${icon(iconFor(item))}<span>${item.title}</span></a>`).join("")}
      </nav>
    </aside>
  `;
}

export function referenceHeader(collection, entry, options = {}) {
  const { html } = deps;
  const { chapter = "", subtitle = "" } = options;
  return html`
    <header class="reference-header">
      ${referenceBreadcrumbs(collection, entry)}
      <span>${chapter}</span>
      <div class="reference-title-row">
        <b class="reference-badge" data-foundation="${entry.id}">${entry.title.charAt(0)}</b>
        <div>
          <h1>${entry.title}</h1>
          <p class="reference-subtitle">${subtitle}</p>
        </div>
      </div>
      <p>${entry.summary}</p>
    </header>
  `;
}

export function referenceCallout(title, copy, intent = "accent") {
  const { html } = deps;
  return html`
    <aside class="reference-callout" data-intent="${intent}">
      <strong>${title}</strong>
      <p>${copy}</p>
    </aside>
  `;
}

export function referenceSection(title, description, body, headingRole = "display") {
  const { html } = deps;
  return html`
    <section class="reference-section-block" data-heading-role="${headingRole}">
      <div class="reference-section-head">
        <h2>${title}</h2>
        ${description ? `<p>${description}</p>` : ""}
      </div>
      ${body}
    </section>
  `;
}

export function referenceDivider() {
  return `<hr class="reference-divider" />`;
}

export function referenceCodeBlock(code) {
  const { escapeHtml } = deps;
  return `<pre class="reference-code"><code>${escapeHtml(code)}</code></pre>`;
}
