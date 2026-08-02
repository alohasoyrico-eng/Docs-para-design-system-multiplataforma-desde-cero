export function renderHomeContent({ cardLink, collections, findAny, homeContent, html, icon, slug, stack, ui }) {
  const home = homeContent ?? {};
  const collectionCount = (collection) => (collection === "stack" ? stack.length : collections[collection]?.length ?? 0);
  return html`
    <section class="hero">
      <div class="hero-copy">
        <p class="kicker">${home.hero?.kicker ?? ""}</p>
        <h1>${home.hero?.title ?? ui("shell.home")}</h1>
        <p class="lede">${home.hero?.lede ?? ""}</p>
        <div class="hero-actions">
          ${(home.hero?.actions ?? []).map((action) => `<a class="hero-action ${action.variant}" href="${action.href}">${icon(action.icon)} ${action.label}</a>`).join("")}
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <img class="hero-visual__image hero-visual__image--light" src="./assets/hero-visual-light.png?v=2" alt="" loading="eager" />
        <img class="hero-visual__image hero-visual__image--dark" src="./assets/hero-visual-dark.png?v=1" alt="" loading="eager" />
      </div>
    </section>
    <section class="section tight">
      <div class="section-head">
        <p class="kicker">${home.coverage?.kicker ?? ""}</p>
        <h2>${home.coverage?.title ?? ""}</h2>
        <p>${home.coverage?.copy ?? ""}</p>
      </div>
      <div class="coverage-grid">
        ${(home.coverage?.items ?? [])
          .map(
            (item) => html`
              <article>
                <span>${item.status}</span>
                <strong>${collectionCount(item.collection)}</strong>
                <h3>${item.label}</h3>
                <p>${item.reference}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
    <section class="section tight">
      <div class="section-head">
        <p class="kicker">${home.documentationStatus?.kicker ?? ""}</p>
        <h2>${home.documentationStatus?.title ?? ""}</h2>
        <p>${home.documentationStatus?.copy ?? ""}</p>
      </div>
      <div class="doc-status-grid">
        ${(home.documentationStatus?.items ?? [])
          .map(
            (item) => html`
              <article>
                <span>${item.layer}</span>
                <strong>${item.status}</strong>
                <p>${item.detail}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
    <section class="section tight">
      <div class="section-head">
        <p class="kicker">${home.visualMigration?.kicker ?? ""}</p>
        <h2>${home.visualMigration?.title ?? ""}</h2>
        <p>${home.visualMigration?.copy ?? ""}</p>
      </div>
      <div class="doc-status-grid">
        ${(home.visualMigration?.items ?? [])
          .map(
            (item) => html`
              <article>
                <span>${item.status}</span>
                <strong>${item.label}</strong>
                <p>${item.detail}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
    <section class="section">
      <div class="section-head">
        <p class="kicker">${home.architecture?.kicker ?? ""}</p>
        <h2>${home.architecture?.title ?? ""}</h2>
        <p>${home.architecture?.copy ?? ""}</p>
      </div>
      <div class="layer-grid">
        ${(home.architecture?.layers ?? [])
          .map((layer, index) => `<article><b>${index + 1}</b><h3>${layer.name}</h3><p>${layer.copy}</p></article>`)
          .join("")}
      </div>
    </section>
    <section class="section band">
      <div class="section-head">
        <p class="kicker">${home.fastPaths?.kicker ?? ""}</p>
        <h2>${home.fastPaths?.title ?? ""}</h2>
      </div>
      <div class="spotlight-grid">
        ${(home.fastPaths?.items ?? [])
          .map((item) => cardLink(item.collection, slug(item.title), item.icon, item.title, findAny(item.title)?.summary ?? item.summary ?? ""))
          .join("")}
      </div>
    </section>
  `;
}

export function renderStackContent({ html, referenceCopy, stack }) {
  const page = referenceCopy.stackPage ?? {};
  return html`
    <section class="page-hero">
      <p class="kicker">${page.kicker ?? ""}</p>
      <h1>${page.title ?? ""}</h1>
      <p>${page.copy ?? ""}</p>
    </section>
    <section class="section tight">
      <div class="stack-grid">
        ${stack
          .map(
            (entry) => html`
              <article class="stack-card">
                <span class="eyebrow">${entry.category}</span>
                <h2>${entry.title}</h2>
                <p>${entry.summary}</p>
                <div class="rule"><strong>${page.ruleLabel ?? ""}</strong><span>${entry.rule}</span></div>
                <div class="token-list">${entry.tokens.map((token) => `<code>${token}</code>`).join("")}</div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}
