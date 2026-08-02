import { referenceSection } from "./reference-layout.js";

let foundationCopy = {};
let html = String.raw;

export function configureFoundationVisualSections(nextDeps) {
  foundationCopy = nextDeps.foundationCopy;
  html = nextDeps.html;
}

export function energyPaletteSection() {
  const section = foundationCopy?.visualSections?.energyPalette ?? {};
  const steps = section.steps ?? [];
  return referenceSection(
    section.title ?? "",
    section.description ?? "",
    html`
      <div class="energy-palette-summary">
        ${(section.summary ?? []).map((item) => `<article><strong>${item.value}</strong><span>${item.label}</span></article>`).join("")}
      </div>
      <div class="energy-palette-grid">
        ${(section.families ?? []).map((item) => energyPaletteFamily(item.label, item.family, steps)).join("")}
      </div>
    `,
  );
}

export function energyFilledStatusSection() {
  const section = foundationCopy?.visualSections?.energyFilledStatus ?? {};
  const labels = section.labels ?? {};
  return referenceSection(
    section.title ?? "",
    section.description ?? "",
    html`
      <div class="energy-status-contract">
        ${(section.rows ?? []).map(({ tone, title, scale, foreground, use }) => `
          <article data-status-tone="${tone}">
            <div class="energy-status-samples" aria-label="${title} state colors">
              <span>${labels.default ?? ""}</span>
              <span>${labels.hover ?? ""}</span>
              <span>${labels.pressed ?? ""}</span>
            </div>
            <h3>${title}</h3>
            <dl>
              <div><dt>${labels.ramp ?? ""}</dt><dd>${scale}</dd></div>
              <div><dt>${labels.foreground ?? ""}</dt><dd>${foreground}</dd></div>
              <div><dt>${labels.use ?? ""}</dt><dd>${use}</dd></div>
            </dl>
          </article>
        `).join("")}
      </div>
    `,
  );
}

export function voiceTypographySection() {
  const section = foundationCopy?.visualSections?.voiceTypography ?? {};
  return referenceSection(
    section.title ?? "",
    section.description ?? "",
    html`
      <div class="voice-type-summary">
        ${(section.summary ?? []).map((item) => `<article><strong>${item.value}</strong><span>${item.label}</span></article>`).join("")}
      </div>
      <div class="voice-type-grid">
        ${(section.groups ?? []).map(({ name, meta, variants }) => voiceTypeRow(name, meta, variants)).join("")}
      </div>
      <div class="voice-utility-grid">
        ${(section.utilities ?? []).map(([style, label, size, copy]) => voiceTypeSample(style, label, size, copy)).join("")}
      </div>
    `,
  );
}

export function voiceTokenSection() {
  const section = foundationCopy?.visualSections?.voiceTokens ?? {};
  return referenceSection(
    section.title ?? "",
    section.description ?? "",
    html`
      <div class="voice-token-summary">
        ${(section.summary ?? []).map((item) => `<article><strong>${item.value}</strong><span>${item.label}</span></article>`).join("")}
      </div>
      <div class="voice-token-grid">
        ${(section.groups ?? []).map(({ label, count, tokens }) => voiceTokenCard(label, count, tokens)).join("")}
      </div>
    `,
  );
}

export function frameSpacingSection() {
  const section = foundationCopy?.visualSections?.frameSpacing ?? {};
  return referenceSection(
    section.title ?? "",
    section.description ?? "",
    html`
      <div class="frame-spacing-demo">
        ${(section.rows ?? []).map(([step, value, token, useCase]) => `
          <article data-space="${step}">
            <strong>${step}</strong>
            <span>${value}</span>
            <i></i>
            <p>${useCase}</p>
            <code>${token}</code>
          </article>
        `).join("")}
      </div>
    `,
  );
}

export function frameGridSection() {
  const section = foundationCopy?.visualSections?.frameGrid ?? {};
  return referenceSection(
    section.title ?? "",
    section.description ?? "",
    html`
      <div class="frame-grid-demo">
        ${(section.tiers ?? []).map(([name, columns, margin, gutter, count, tokenTier]) => `
          <article data-columns="${count}">
            <header>
              <strong>${name}</strong>
              <span>${columns} · ${margin} · ${gutter}</span>
            </header>
            <div>${Array.from({ length: count }, (_, index) => `<i>${index + 1}</i>`).join("")}</div>
            <footer>
              <code>ref.frame.grid.${tokenTier}</code>
            </footer>
          </article>
        `).join("")}
      </div>
    `,
  );
}

export function frameDensitySection() {
  const section = foundationCopy?.visualSections?.frameDensity ?? {};
  return referenceSection(
    section.title ?? "",
    section.description ?? "",
    html`
      <div class="frame-density-demo">
        <div class="frame-density-table">
          <div>${(section.headers ?? []).map((label) => `<b>${label}</b>`).join("")}</div>
          ${(section.rows ?? []).map(([token, compact, normal, comfortable]) => `
            <div>
              <code>${token}</code>
              <span>${compact}</span>
              <span>${normal}</span>
              <span>${comfortable}</span>
            </div>
          `).join("")}
        </div>
        <div class="frame-density-cards">
          ${(section.cards ?? []).map(({ density, label }) => `
            <article data-density-demo="${density}">
              <header>
                <strong>${density}</strong>
                <span>${label}</span>
              </header>
              <button type="button">${section.demoAction ?? ""}</button>
              <div>
                <b>${section.demoTitle ?? ""}</b>
                <p>${section.demoCopy ?? ""}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    `,
  );
}

export function frameTokenSection() {
  const section = foundationCopy?.visualSections?.frameTokens ?? {};
  return referenceSection(
    section.title ?? "",
    section.description ?? "",
    html`
      <div class="frame-token-summary">
        ${(section.summary ?? []).map((item) => `<article><strong>${item.value}</strong><span>${item.label}</span></article>`).join("")}
      </div>
      <div class="frame-token-grid">
        ${(section.groups ?? []).map(([label, count, description, chips]) => frameTokenCard(label, count, description, chips)).join("")}
      </div>
    `,
  );
}

export function frameSystemSection() {
  const section = foundationCopy?.visualSections?.frameSystem ?? {};
  return referenceSection(
    section.title ?? "",
    section.description ?? "",
    html`
      <div class="frame-system-grid">
        <article>
          <header>
            <strong>${section.densityTitle ?? ""}</strong>
            <span>${section.densityMeta ?? ""}</span>
          </header>
          ${(section.densities ?? []).map(([name, use, padding, gap]) => `
            <div>
              <b>${name}</b>
              <p>${use}</p>
              <code>${padding} · ${gap}</code>
            </div>
          `).join("")}
        </article>
        <article>
          <header>
            <strong>${section.gridTitle ?? ""}</strong>
            <span>${section.gridMeta ?? ""}</span>
          </header>
          ${(section.grids ?? []).map(([name, columns, margin, gutter]) => `
            <div>
              <b>${name}</b>
              <p>${columns}</p>
              <code>${margin} · ${gutter}</code>
            </div>
          `).join("")}
        </article>
      </div>
    `,
  );
}

function energyPaletteFamily(label, family, steps) {
  return html`
    <article class="energy-palette-family">
      <header>
        <strong>${label}</strong>
        <span>${steps.length} tokens</span>
      </header>
      <div>
        ${steps.map((step) => {
          const token = `--ref-energy-${family}-${step}`;
          return `<i class="energy-swatch-${family}-${step}" title="${token}"><span>${step}</span></i>`;
        }).join("")}
      </div>
    </article>
  `;
}

function voiceTypeRow(name, meta, variants) {
  return html`
    <article class="voice-type-row">
      <header>
        <strong>${name}</strong>
        <span>${meta}</span>
      </header>
      <div class="voice-type-samples">
        ${variants.map(([style, label, size, copy]) => voiceTypeSample(style, label, size, copy)).join("")}
      </div>
    </article>
  `;
}

function voiceTypeSample(style, label, size, copy) {
  return html`
    <article class="voice-type-sample" data-style="${style}">
      <p>${copy}</p>
      <code>sys.voice.${style.replace("-", ".")} · ${size}</code>
    </article>
  `;
}

function voiceTokenCard(label, count, tokens) {
  return html`
    <article class="voice-token-card">
      <header>
        <strong>${label}</strong>
        <span>${count} tokens</span>
      </header>
      <ul class="voice-token-list">
        ${tokens.map(([name, value]) => `<li><code>${name}</code><span>${value}</span></li>`).join("")}
      </ul>
    </article>
  `;
}

function frameTokenCard(label, count, description, chips) {
  return html`
    <article class="frame-token-card">
      <header>
        <strong>${label}</strong>
        <span>${count} tokens</span>
      </header>
      <p>${description}</p>
      <div>${chips.map((chip) => `<code>${chip}</code>`).join("")}</div>
    </article>
  `;
}
