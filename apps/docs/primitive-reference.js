import { referenceCallout, referenceCodeBlock, referenceSection } from "./reference-layout.js";

let primitiveCopy = {};
let html = String.raw;
let icon = () => "";
let ui = (key) => key;
let artifactContract = () => null;
let buttonDemo = () => "";

export function configurePrimitiveReference(nextDeps) {
  primitiveCopy = nextDeps.primitiveCopy;
  html = nextDeps.html;
  icon = nextDeps.icon;
  ui = nextDeps.ui;
  artifactContract = nextDeps.artifactContract;
  buttonDemo = nextDeps.buttonDemo;
}

function primitiveTemplate(value, entry) {
  return String(value ?? "")
    .replaceAll("{{title}}", entry.title)
    .replaceAll("{{titleLower}}", entry.title.toLowerCase())
    .replaceAll("{{firstToken}}", entry.tokens[0] ?? `${entry.id}.*`)
    .replaceAll("{{componentName}}", entry.title.replace(/\s+/g, ""));
}

export function primitivePurposeSection(entry) {
  const contract = artifactContract(entry);
  if (contract) {
    return referenceSection(
      ui("reference.purpose"),
      "",
      html`
        <p class="reference-lede">${contract.purpose}</p>
        <div class="reference-copy-grid">
          <p>${entry.title} consumes ${contract.governingFoundations.join(", ")} and exposes implementation-safe primitive roles.</p>
          <p>Foundation inputs: ${contract.foundationInputs.join(", ")}.</p>
          <p>Its API outputs ${contract.api.outputs.join(", ")} instead of raw styling decisions.</p>
          <p>Agents must reject outputs when: ${contract.rejectIf[0]}</p>
        </div>
      `,
      "large",
    );
  }
  const fallback = primitiveCopy?.purposeFallback?.columns ?? [];
  return referenceSection(
    ui("reference.purpose"),
    "",
    html`
      <p class="reference-lede">${entry.summary}</p>
      <div class="reference-copy-grid">
        ${fallback.map((copy) => `<p>${primitiveTemplate(copy, entry)}</p>`).join("")}
      </div>
    `,
    "large",
  );
}

export function primitiveLiveDemoSection(entry) {
  return referenceSection(
    ui("reference.liveDemo"),
    primitiveCopy?.liveDemo?.description ?? "",
    primitiveReferenceDemo(entry),
  );
}

function primitiveDemoCopy(entry) {
  return primitiveCopy?.demos?.[entry.title] ?? primitiveCopy?.demos?.fallback ?? {};
}

function primitiveChoiceButtons(choices, active, dataAttribute) {
  return (choices ?? [])
    .map(([value, label]) => `<button type="button" class="${value === active ? "active" : ""}" ${dataAttribute}="${value}">${label}</button>`)
    .join("");
}

function primitiveDemoAria(demo, entry) {
  return primitiveTemplate(demo.ariaLabel ?? demo.ariaLabelTemplate ?? "", entry);
}
function primitiveReferenceDemo(entry) {
  const demo = primitiveDemoCopy(entry);
  const initial = demo.initial ?? demo.choices?.[0]?.[0] ?? "";
  if (demo.type === "typography") {
    const [sample] = demo.samples?.[initial] ?? [];
    return html`<div class="primitive-demo typography-demo" data-type-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-type-choice")}</div><p class="voice-display" data-type-sample>${sample ?? ""}</p>${(demo.staticSamples ?? []).map(([className, value]) => `<p class="${className}">${value}</p>`).join("")}<code>${demo.code ?? ""}</code></div>`;
  }
  if (demo.type === "stack") {
    return html`<div class="primitive-demo stack-demo" data-density-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-density-choice")}</div>${(demo.items ?? []).map((item) => `<div>${item}</div>`).join("")}</div>`;
  }
  if (demo.type === "icon") {
    return html`<div class="primitive-demo icon-demo" data-icon-size-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-icon-size-choice")}</div>${(demo.icons ?? []).map((name) => `<article>${icon(name)}<span>${name}</span></article>`).join("")}</div>`;
  }
  if (demo.type === "swatch") {
    return html`<div class="primitive-demo swatch-demo" data-color-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-color-choice")}</div>${(demo.roles ?? []).map((role) => `<article><i></i><span>${role}</span></article>`).join("")}</div>`;
  }
  if (demo.type === "radius") {
    return html`<div class="primitive-demo radius-demo" data-radius-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-radius-choice")}</div><article><span>${demo.targetLabel ?? ""}</span><strong data-radius-label>${initial}</strong></article></div>`;
  }
  if (demo.type === "elevation") {
    return html`<div class="primitive-demo depth-explorer" data-depth-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-depth-choice")}</div><div class="depth-stage"><article class="depth-surface"><span data-depth-label>${demo.labels?.[initial] ?? ""}</span><strong>${demo.title ?? ""}</strong><p>${demo.copy ?? ""}</p></article></div></div>`;
  }
  if (demo.type === "motionToken") {
    return html`<div class="primitive-demo motion-primitive-demo" data-motion-token-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-motion-token-choice")}</div><div class="motion-token-track"><i></i></div><code data-motion-token-label>${demo.initialLabel ?? demo.labels?.[initial] ?? ""}</code></div>`;
  }
  if (demo.type === "breakpoint") {
    return html`<div class="primitive-demo breakpoint-demo" data-breakpoint-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-breakpoint-choice")}</div><div class="breakpoint-stage"><article><b data-breakpoint-label>${demo.labels?.[initial] ?? ""}</b><i></i><i></i><i></i></article></div></div>`;
  }
  if (demo.type === "focus") {
    return html`<div class="primitive-demo focus-demo" data-focus-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-focus-choice")}</div><button type="button" data-focus-target>${demo.action ?? ""}</button><p data-focus-copy>${demo.states?.[initial] ?? ""}</p></div>`;
  }
  if (demo.type === "loading") {
    return html`<div class="primitive-demo loading-demo" data-loading-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-loading-choice")}</div><article><b data-loading-title>${demo.states?.[initial] ?? ""}</b><i></i><i></i><i></i></article></div>`;
  }
  if (demo.type === "disabled") {
    const [action, copy] = demo.states?.[initial] ?? [];
    return html`<div class="primitive-demo disabled-demo" data-disabled-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-disabled-choice")}</div><button type="button" disabled data-disabled-action>${action ?? ""}</button><p data-disabled-copy>${copy ?? ""}</p></div>`;
  }
  if (demo.type === "chart") {
    return html`<div class="primitive-demo chart-demo" data-chart-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-chart-choice")}</div><div class="chart-bars"><i></i><i></i><i></i><i></i></div><p data-chart-copy>${demo.states?.[initial] ?? ""}</p></div>`;
  }
  if (demo.type === "map") {
    return html`<div class="primitive-demo map-demo" data-map-demo="${initial}"><div class="density-switch" aria-label="${primitiveDemoAria(demo, entry)}">${primitiveChoiceButtons(demo.choices, initial, "data-map-choice")}</div><div class="map-stage"><span class="map-pin">${icon("local_gas_station")}</span><span class="route-line"></span><article data-map-label>${demo.states?.[initial] ?? ""}</article></div></div>`;
  }
  if (demo.type === "message") {
    return html`<div class="primitive-demo message-demo">${(demo.cards ?? []).map((card) => `<article><span class="overline">${card.eyebrow}</span><strong>${card.title}</strong><p>${card.copy}</p>${card.actions ? `<div class="button-row">${card.actions.map(([label, variant, intent, size, iconName]) => buttonDemo(label, variant, intent, size, iconName)).join("")}</div>` : ""}</article>`).join("")}</div>`;
  }
  if (demo.type === "statGrid") {
    return html`<div class="primitive-demo ${demo.className ?? ""}">${(demo.rows ?? []).map(([label, value]) => `<article><span>${label}</span><strong>${value}</strong></article>`).join("")}</div>`;
  }
  const roles = demo.roles ?? [];
  return html`<div class="primitive-demo surface-demo">${roles.map((role) => `<article class="${role === "inverse" ? "inverse" : ""}"><span>${role}</span></article>`).join("")}</div>`;
}

export function primitiveResponsibilitiesReferenceSection(entry) {
  const responsibilities = primitiveResponsibilities(entry);
  return referenceSection(
    ui("reference.responsibilities"),
    "",
    html`<ul class="reference-list">${responsibilities.map((item) => `<li>${item}</li>`).join("")}</ul>`,
  );
}

export function primitiveSpecMatrixSection(entry) {
  const rows = primitiveSpecRows(entry);
  return referenceSection(
    ui("reference.specificationMatrix"),
    ui("reference.specificationMatrixIntro"),
    html`
      <div class="reference-matrix">
        ${rows.map((row) => `<article><span>${row.aspect}</span><strong>${row.contract}</strong><p>${row.notes}</p></article>`).join("")}
      </div>
    `,
  );
}

function primitiveSpecRows(entry) {
  const contract = artifactContract(entry);
  const matrix = primitiveCopy?.specMatrix ?? {};
  if (contract) {
    const rows = matrix.contractRows ?? {};
    return [
      { aspect: rows.governingFoundations?.aspect ?? "", contract: contract.governingFoundations.join(" / "), notes: rows.governingFoundations?.notes ?? "" },
      { aspect: rows.foundationInputs?.aspect ?? "", contract: contract.foundationInputs.join(" / "), notes: rows.foundationInputs?.notes ?? "" },
      { aspect: rows.roles?.aspect ?? "", contract: contract.roles.map((role) => role.id).join(" / "), notes: rows.roles?.notes ?? "" },
      { aspect: rows.states?.aspect ?? "", contract: contract.states.join(" / "), notes: rows.states?.notes ?? "" },
      { aspect: rows.apiOutputs?.aspect ?? "", contract: contract.api.outputs.join(" / "), notes: rows.apiOutputs?.notes ?? "" },
    ];
  }
  const rows = matrix.byPrimitive?.[entry.title] ?? matrix.shared ?? [];
  return rows.map((row) => ({
    aspect: row.aspect,
    contract: primitiveTemplate(row.contract ?? row.contractTemplate, entry),
    notes: primitiveTemplate(row.notes, entry),
  }));
}

function primitiveResponsibilities(entry) {
  const responsibilities = primitiveCopy?.responsibilities?.[entry.title] ?? primitiveCopy?.responsibilities?.fallback ?? [];
  return responsibilities.map((item) => primitiveTemplate(item, entry));
}

export function primitiveApiReferenceSection(entry) {
  return referenceSection(
    ui("reference.apiReference"),
    "",
    html`
      ${referenceCodeBlock(primitiveApiCode(entry))}
      ${referenceCallout("Prevents", primitivePrevents(entry), "warning")}
    `,
  );
}

function primitiveApiCode(entry) {
  const contract = artifactContract(entry);
  if (contract) {
    const componentName = entry.title.replace(/\s+/g, "");
    return `<${componentName}
  ${contract.api.props.map((prop) => `${prop}?: semantic`).join("\n  ")}
/>

outputs:
${contract.api.outputs.map((output) => `  - ${output}`).join("\n")}

tokens:
${contract.tokenDependencies.map((token) => `  - ${token}`).join("\n")}

rejectIf:
${contract.rejectIf.map((item) => `  - ${item}`).join("\n")}`;
  }
  return primitiveTemplate(primitiveCopy?.apiFallbacks?.[entry.title] ?? primitiveCopy?.apiFallbacks?.fallbackTemplate, entry);
}

function primitivePrevents(entry) {
  const contract = artifactContract(entry);
  if (contract) return contract.rejectIf.join(" ");
  return primitiveTemplate(primitiveCopy?.prevents?.[entry.title] ?? primitiveCopy?.prevents?.fallbackTemplate, entry);
}

export function primitiveTokenReferenceSection(entry) {
  const cards = primitiveCopy?.tokenReference?.cards ?? [];
  return referenceSection(
    ui("reference.tokenReference"),
    ui("reference.tokenReferenceIntro"),
    html`
      <div class="reference-token-grid">
        ${entry.tokens.map((token) => `<code>${token}</code>`).join("")}
      </div>
      <div class="reference-rule-grid">
        ${cards.map((card) => `<article><strong>${card.title}</strong><p>${primitiveTemplate(card.copyTemplate, entry)}</p></article>`).join("")}
      </div>
    `,
  );
}

function primitiveAdapterCopy(entry, title) {
  const card = (primitiveCopy?.tokenReference?.cards ?? []).find((item) => item.title === title);
  return primitiveTemplate(card?.copyTemplate, entry);
}
