import { configureFoundationExplorer, foundationExplorerSection } from "./foundation-explorer.js";
import {
  configureFoundationVisualSections,
  energyFilledStatusSection,
  energyPaletteSection,
  frameDensitySection,
  frameGridSection,
  frameSpacingSection,
  frameTokenSection,
  voiceTokenSection,
  voiceTypographySection,
} from "./foundation-visual-sections.js";
import { referenceCodeBlock, referenceDivider, referenceSection } from "./reference-layout.js";

let foundationCopy = {};
let referenceCopy = {};
let html = String.raw;
let icon = () => "";
let iconFor = () => "";
let ui = (key) => key;
let artifactContract = () => null;
let referenceTemplate = (value) => value ?? "";

export function configureFoundationReference(nextDeps) {
  foundationCopy = nextDeps.foundationCopy;
  referenceCopy = nextDeps.referenceCopy;
  html = nextDeps.html;
  icon = nextDeps.icon;
  iconFor = nextDeps.iconFor;
  ui = nextDeps.ui;
  artifactContract = nextDeps.artifactContract;
  referenceTemplate = nextDeps.referenceTemplate;
  configureFoundationExplorer(nextDeps);
  configureFoundationVisualSections(nextDeps);
}

export function foundationSubtitle(entry) {
  return foundationCopy?.foundations?.[entry.title]?.subtitle ?? foundationCopy?.fallbackSubtitle ?? "";
}

function foundationPurposeSection(entry) {
  const points = foundationPurposePoints(entry);
  return referenceSection(
    "Overview",
    "",
    html`
      <p class="reference-lede">${points.lede}</p>
      <div class="reference-copy-grid">
        ${points.columns.map((copy) => `<p>${copy}</p>`).join("")}
      </div>
    `,
    "large",
  );
}

export function foundationReferenceContent(entry) {
  if (entry.title === "Energy") {
    return [
      foundationTextSection("Overview", "", foundationReferenceDetail(entry).primaryParagraphs, "large"),
      referenceDivider(),
      foundationVisualReferenceSection(entry),
      referenceDivider(),
      energyPaletteSection(),
      referenceDivider(),
      energyFilledStatusSection(),
      referenceDivider(),
      foundationExplorerSection(entry),
    ].join("");
  }
  if (entry.title === "Voice") {
    return [
      foundationTextSection("Overview", "", foundationReferenceDetail(entry).primaryParagraphs, "large"),
      referenceDivider(),
      foundationVisualReferenceSection(entry),
      referenceDivider(),
      voiceTypographySection(),
      referenceDivider(),
      voiceTokenSection(),
      referenceDivider(),
      foundationExplorerSection(entry),
    ].join("");
  }
  if (entry.title === "Frame") {
    return [
      foundationTextSection("Overview", "", foundationReferenceDetail(entry).primaryParagraphs, "large"),
      referenceDivider(),
      foundationVisualReferenceSection(entry),
      referenceDivider(),
      frameSpacingSection(),
      referenceDivider(),
      frameGridSection(),
      referenceDivider(),
      frameDensitySection(),
      referenceDivider(),
      frameTokenSection(),
      referenceDivider(),
      foundationExplorerSection(entry),
    ].join("");
  }
  const detail = foundationReferenceDetail(entry);
  const blocks = [
    foundationTextSection(detail.primaryTitle, detail.primaryDescription, detail.primaryParagraphs, "large"),
    ...(detail.secondarySections ?? []).flatMap((section) => [
      referenceDivider(),
      section.type === "code"
        ? foundationCodeSection(section.title, section.description, section.code)
        : section.type === "cards"
          ? foundationCardsSection(section.title, section.description, section.cards)
          : foundationTextSection(section.title, section.description, section.paragraphs),
    ]),
    referenceDivider(),
    foundationTokenArchitectureSection(entry),
    referenceDivider(),
    foundationSpecSection(entry),
    referenceDivider(),
    foundationVisualReferenceSection(entry),
    referenceDivider(),
    foundationExplorerSection(entry),
  ];
  return blocks.join("");
}

function foundationTextSection(title, description, paragraphs, headingRole = "display") {
  const [lede, ...rest] = paragraphs;
  return referenceSection(
    title,
    description,
    html`
      ${headingRole === "large" ? `<p class="reference-lede">${lede}</p>` : ""}
      <div class="reference-copy-grid">
        ${(headingRole === "large" ? rest : paragraphs).map((copy) => `<p>${copy}</p>`).join("")}
      </div>
    `,
    headingRole,
  );
}

function foundationCodeSection(title, description, code) {
  return referenceSection(title, description, referenceCodeBlock(code));
}

function foundationCardsSection(title, description, cards) {
  return referenceSection(
    title,
    description,
    html`
      <div class="reference-spec-grid">
        ${cards.map((card) => `<article><span>${card.label}</span><strong>${card.title}</strong><p>${card.copy}</p></article>`).join("")}
      </div>
    `,
  );
}

function foundationReferenceDetail(entry) {
  return foundationCopy?.referenceDetails?.[entry.title] ?? {
    primaryTitle: "Overview",
    primaryDescription: "",
    primaryParagraphs: foundationPurposePoints(entry).columns,
    secondarySections: [],
  };
}

function foundationPurposePoints(entry) {
  const fallback = foundationCopy?.purposePoints?.fallback;
  return foundationCopy?.purposePoints?.[entry.title] ?? {
    lede: foundationTemplate(fallback?.ledeTemplate, entry),
    columns: (fallback?.columns ?? []).map((item) => foundationTemplate(item, entry)),
  };
}

function foundationVisualReferenceSection(entry) {
  const roles = foundationRoles(entry);
  return referenceSection(
    "Visual Explanation",
    `The following role cards represent the semantic groups that ${entry.title} defines. Each role remains stable across components, patterns, and templates.`,
    html`<div class="reference-role-grid">${roles.map((role) => referenceRoleCard(role)).join("")}</div>`,
  );
}

function referenceRoleCard(role) {
  return html`
    <article class="reference-role-card">
      <span>${icon(role.icon)}</span>
      <strong>${role.name}</strong>
      <p>${role.copy}</p>
    </article>
  `;
}

function foundationTemplate(value, entry) {
  return String(value ?? "")
    .replaceAll("{{title}}", entry.title)
    .replaceAll("{{titleLower}}", entry.title.toLowerCase())
    .replaceAll("{{id}}", entry.id);
}

function foundationSpecSection(entry) {
  const spec = foundationSpec(entry);
  const section = foundationCopy?.specSection ?? {};
  return referenceSection(
    section.title ?? "Specification",
    section.description ?? "",
    html`
      <div class="reference-spec-grid">
        ${spec.cards.map((card) => `<article><span>${card.label}</span><strong>${card.value}</strong><p>${card.copy}</p></article>`).join("")}
      </div>
      ${referenceCodeBlock(spec.code)}
    `,
  );
}

function foundationSpec(entry) {
  const contract = artifactContract(entry);
  const section = foundationCopy?.specSection ?? {};
  const labels = section.labels ?? {};
  if (contract) {
    return {
      cards: [
        { label: labels.layer ?? "Layer", value: contract.layer, copy: contract.purpose },
        { label: labels.reference ?? "Reference", value: contract.referenceDecision, copy: section.contractCopy?.reference ?? "" },
        { label: labels.maturity ?? "Maturity", value: `Level ${contract.maturityTarget}`, copy: section.contractCopy?.maturity ?? "" },
        { label: labels.roles ?? "Roles", value: `${contract.roles.length} semantic roles`, copy: contract.roles.map((role) => role.id).join(", ") },
        { label: labels.examples ?? "Examples", value: `${contract.productExamples.length} product cases`, copy: contract.productExamples.map((example) => example.context).join(", ") },
        { label: labels.rejectIf ?? "Reject if", value: `${contract.rejectIf.length} blockers`, copy: contract.rejectIf[0] },
      ],
      code: `${entry.id}.foundation
source: packages/specs/specs/unison.system.json
purpose: ${contract.purpose}
roles:
${contract.roles.map((role) => `  - ${role.id}: ${role.token} -> ${role.use}`).join("\n")}
primitiveDependencies: ${contract.primitiveDependencies.join(" | ")}
componentDependencies: ${contract.componentDependencies.join(" | ")}
agentInstructions:
${contract.agentInstructions.map((item) => `  - ${item}`).join("\n")}
rejectIf:
${contract.rejectIf.map((item) => `  - ${item}`).join("\n")}`,
    };
  }
  const fallbackSpec = foundationCopy?.specFallbacks?.[entry.title];
  if (fallbackSpec) return fallbackSpec;
  const fallback = section.fallback ?? {};
  return {
    cards: [
      { label: labels.layer ?? "Layer", value: fallback.layerValue ?? "L1 foundation", copy: foundationTemplate(fallback.layerCopyTemplate, entry) },
      { label: labels.consumers ?? "Consumers", value: fallback.consumersValue ?? "", copy: fallback.consumersCopy ?? "" },
      { label: labels.output ?? "Output", value: fallback.outputValue ?? "", copy: fallback.outputCopy ?? "" },
    ],
    code: foundationTemplate(fallback.codeTemplate, entry),
  };
}

function foundationTokenArchitectureSection(entry) {
  const copy = foundationCopy?.tokenArchitecture ?? {};
  return referenceSection(
    copy.title ?? "Architecture",
    copy.description ?? "",
    html`
      ${referenceCodeBlock(foundationTemplate(copy.codeTemplate, entry))}
      <div class="token-list">${entry.tokens.map((token) => `<code>${token}</code>`).join("")}</div>
    `,
  );
}

function foundationRulesSection(entry) {
  const copy = foundationCopy?.dependencyRules ?? {};
  const items = copy.items ?? [];
  return referenceSection(
    copy.title ?? "Dependency Rules",
    "",
    html`
      <div class="reference-rule-grid">
        ${items.map((item) => {
          const title = item.title ?? foundationTemplate(item.titleTemplate, entry);
          return `<article><strong>${title}</strong><p>${item.copy ?? ""}</p></article>`;
        }).join("")}
      </div>
    `,
  );
}

export function foundationRoles(entry) {
  const roles = referenceCopy.foundation?.roles?.[entry.title] ?? referenceCopy.foundation?.roles?.fallback ?? [];
  return roles.map(([name, copy, iconName]) => ({ name, copy, icon: referenceTemplate(iconName, entry, { icon: iconFor(entry) }) }));
}
