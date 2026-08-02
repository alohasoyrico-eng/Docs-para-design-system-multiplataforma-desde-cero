const {
  fs,
  docsAppFile,
  docsContentSourcesFile,
  foundationCopyFile,
  primitiveCopyFile,
  referenceCopyFile,
  homeFile,
  foundations,
  read,
  readJson,
  add,
  lineNumber,
} = require("./audit-context.js");

function checkHomeContentOwnership() {
  const app = read(docsAppFile);
  const home = readJson(homeFile);
  if (!home) {
    add("errors", homeFile, 1, "Home content must live in packages/content/content/home.json.");
    return;
  }
  for (const field of ["hero", "coverage", "documentationStatus", "visualMigration", "architecture", "fastPaths"]) {
    if (!home[field]) add("errors", homeFile, 1, `Home content missing field: ${field}.`);
  }
  const contentSources = fs.existsSync(docsContentSourcesFile) ? read(docsContentSourcesFile) : "";
  if (!contentSources.includes("generated/docs-content.bundle.json") || !app.includes("homeContent")) {
    add("errors", docsAppFile, 1, "Docs app must consume Home content from the generated docs content bundle.");
  }
  for (const forbidden of ["Button gold, Select interactive", "Coverage is broad. Depth is uneven.", "Nothing skips a layer.", "Start where the work is."]) {
    if (app.includes(forbidden)) add("errors", docsAppFile, 1, `Home editorial content must not live in app.js: ${forbidden}`);
  }
}

function checkFoundationCopyOwnership() {
  const app = read(docsAppFile);
  const copy = readJson(foundationCopyFile);
  if (!copy) {
    add("errors", foundationCopyFile, 1, "Foundation copy must live in packages/content/content/foundation-copy.json.");
    return;
  }
  for (const foundation of foundations) {
    if (!copy.foundations?.[foundation]?.subtitle) {
      add("errors", foundationCopyFile, 1, `Foundation copy missing subtitle: ${foundation}.`);
    }
    if (!copy.referenceDetails?.[foundation]?.primaryParagraphs?.length) {
      add("errors", foundationCopyFile, 1, `Foundation copy missing reference detail: ${foundation}.`);
    }
  }
  for (const field of ["purposePoints", "specSection", "specFallbacks", "tokenArchitecture", "dependencyRules", "visualSections", "explorers"]) {
    if (!copy[field]) add("errors", foundationCopyFile, 1, `Foundation copy missing field: ${field}.`);
  }
  if (!copy.purposePoints?.fallback?.ledeTemplate || !Array.isArray(copy.purposePoints?.fallback?.columns)) {
    add("errors", foundationCopyFile, 1, "Foundation purpose fallback must live in foundation-copy.json.");
  }
  for (const field of [
    "Energy",
    "Frame",
    "Voice",
    "Depth",
    "Momentum",
    "Symbol",
    "Tone",
    "Growth",
    "Accessibility",
  ]) {
    if (!copy.explorers?.items?.[field]) add("errors", foundationCopyFile, 1, `Foundation explorer missing field: ${field}.`);
  }
  for (const field of [
    "energyPalette",
    "energyFilledStatus",
    "voiceTypography",
    "voiceTokens",
    "frameSpacing",
    "frameGrid",
    "frameDensity",
    "frameTokens",
    "frameSystem",
  ]) {
    if (!copy.visualSections?.[field]) add("errors", foundationCopyFile, 1, `Foundation visual section missing field: ${field}.`);
  }
  const contentSources = fs.existsSync(docsContentSourcesFile) ? read(docsContentSourcesFile) : "";
  if (!contentSources.includes("generated/docs-content.bundle.json") || !app.includes("foundationCopy")) {
    add("errors", docsAppFile, 1, "Docs app must consume foundation copy from the generated docs content bundle.");
  }
  for (const forbidden of [
    "Color, semantic roles and product intensity",
    "Language, typography and communication structure",
    "Layout, density and rhythm",
    "This is the working contract a designer, developer, PM",
    "Reference decisions are classified before implementation.",
    "Primitives consume this foundation through semantic roles.",
    "Energy uses a strict 10-step scale per family.",
    "Voice uses the same structure as the reference zip:",
    "Frame follows the zip as a spatial foundation:",
    "Primary route action is available and should be visually discoverable without overwhelming the map.",
    "Document the use case, owner, tokens, and first validation path before broad adoption.",
    "Every route action, sheet, and map fallback can be reached without pointer input.",
  ]) {
    if (app.includes(forbidden)) add("errors", docsAppFile, 1, `Foundation editorial copy must not live in app.js: ${forbidden}`);
  }
}

function checkPrimitiveCopyOwnership() {
  const app = read(docsAppFile);
  const copy = readJson(primitiveCopyFile);
  if (!copy) {
    add("errors", primitiveCopyFile, 1, "Primitive copy must live in packages/content/content/primitive-copy.json.");
    return;
  }
  for (const field of ["purposeFallback", "liveDemo", "specMatrix", "responsibilities", "apiFallbacks", "prevents", "tokenReference", "demos"]) {
    if (!copy[field]) add("errors", primitiveCopyFile, 1, `Primitive copy missing field: ${field}.`);
  }
  for (const field of ["Typography", "Spacing", "Iconography", "Color", "Radius", "Elevation", "Duration", "Breakpoints", "Density", "Focus", "Loading", "Disabled", "Charts", "Maps", "Message", "Measurement", "Research", "fallback"]) {
    if (!copy.demos?.[field]) add("errors", primitiveCopyFile, 1, `Primitive demo missing field: ${field}.`);
  }
  for (const field of ["Typography", "Spacing", "Iconography", "Density", "fallback"]) {
    if (!copy.responsibilities?.[field]) add("errors", primitiveCopyFile, 1, `Primitive responsibilities missing field: ${field}.`);
  }
  const contentSources = fs.existsSync(docsContentSourcesFile) ? read(docsContentSourcesFile) : "";
  if (!contentSources.includes("generated/docs-content.bundle.json") || !app.includes("primitiveCopy")) {
    add("errors", docsAppFile, 1, "Docs app must consume primitive copy from the generated docs content bundle.");
  }
  for (const forbidden of [
    "It consumes semantic tokens and exposes a narrow API.",
    "Primitive decisions are downstream from these foundations.",
    "Renders text with Voice tokens: family, size, weight, line height, and role.",
    "Raw font-size, font-weight, font-family, or text rendered without semantic hierarchy.",
    "Expose {{title}} as a typed component or CSS utility with token-backed props.",
    "Visible focus ring uses system focus tokens.",
    "Fuel spend by week with accessible summary.",
    "Block card ending 1842?",
    "Does the manager understand the consequence?",
  ]) {
    if (app.includes(forbidden)) add("errors", docsAppFile, 1, `Primitive editorial copy must not live in app.js: ${forbidden}`);
  }
}

function checkReferenceCopyOwnership() {
  const app = read(docsAppFile);
  const copy = readJson(referenceCopyFile);
  if (!copy) {
    add("errors", referenceCopyFile, 1, "Reference copy must live in packages/content/content/reference-copy.json.");
    return;
  }
  for (const field of ["teamNotes", "rules", "decisionTree", "tokenModel", "agentFallback", "foundation", "primitive", "density", "stateLabels", "research", "pattern", "engineering", "spec", "guidelines", "demoMatrix", "mielGeneric", "examples", "metrics", "accessibility", "testingEvidence", "primitiveSurface"]) {
    if (!copy[field]) add("errors", referenceCopyFile, 1, `Reference copy missing field: ${field}.`);
  }
  for (const field of ["overviewCopy", "roleGridCopy", "architectureCopy", "architectureSteps", "visualExplanationCopy", "contractRows", "roles"]) {
    if (!copy.foundation?.[field]) add("errors", referenceCopyFile, 1, `Reference foundation copy missing field: ${field}.`);
  }
  for (const field of ["Product Designers", "Developers", "PMs", "fallback"]) {
    if (!copy.teamNotes?.[field]) add("errors", referenceCopyFile, 1, `Reference team note missing field: ${field}.`);
  }
  for (const field of ["overviewCopy", "demoCopy", "responsibilities", "tokenChainCopy", "tokenChainSteps", "apiRows", "usageRules", "anatomy", "states", "accessibility"]) {
    if (!copy.primitive?.[field]) add("errors", referenceCopyFile, 1, `Reference primitive copy missing field: ${field}.`);
  }
  for (const field of ["coordinatorCopy", "dependencies", "decisionCopy", "decisionRows"]) {
    if (!copy.density?.[field]) add("errors", referenceCopyFile, 1, `Reference density copy missing field: ${field}.`);
  }
  for (const field of ["fallbackPurpose", "fallbackDecisions", "fallbackFailureModes", "fallbackContractRows"]) {
    if (!copy.pattern?.[field]) add("errors", referenceCopyFile, 1, `Reference pattern copy missing field: ${field}.`);
  }
  for (const field of ["qualityGates", "componentProps", "patternProps", "defaultProps"]) {
    if (!copy.spec?.[field]) add("errors", referenceCopyFile, 1, `Reference spec copy missing field: ${field}.`);
  }
  for (const field of ["do", "doNot"]) {
    if (!copy.guidelines?.[field]) add("errors", referenceCopyFile, 1, `Reference guidelines copy missing field: ${field}.`);
  }
  for (const field of ["brief", "canDecide", "mustAsk", "preserve"]) {
    if (!copy.mielGeneric?.[field]) add("errors", referenceCopyFile, 1, `Reference MIEL copy missing field: ${field}.`);
  }
  for (const field of ["titleTemplates", "copy", "foundationCases", "componentCases", "componentChecklist", "patternSteps", "journeyCopy"]) {
    if (!copy.examples?.[field]) add("errors", referenceCopyFile, 1, `Reference example copy missing field: ${field}.`);
  }
  const contentSources = fs.existsSync(docsContentSourcesFile) ? read(docsContentSourcesFile) : "";
  if (!contentSources.includes("generated/docs-content.bundle.json") || !app.includes("referenceCopy")) {
    add("errors", docsAppFile, 1, "Docs app must consume reference copy from the generated docs content bundle.");
  }
  for (const forbidden of [
    "Use this to decide behavior, hierarchy, states, density, motion, and responsive composition.",
    "The rule must be visible in human copy and in agent-readable specs.",
    "Which semantic primitive expresses that decision?",
    "Public API is semantic. Raw hex, pixel, bezier, duration, and implementation values stay private behind platform adapters.",
    "Use semantic tokens only",
    "Define success, loading, empty, error, disabled, permission, offline, and recovery states",
    "Keep human documentation and machine specification synchronized",
    "Density is not a component size switch.",
    "Fleet manager tables, filters, comparison views, repeated desktop actions.",
    "Semantic role consumed by components and agents.",
    "Container: owns layout, density, focus boundary, and responsive behavior.",
    "No meaning may depend only on color, position, pointer hover, speed, or memory.",
    "Patterns are no longer just journeys.",
    "Every blocking state needs owner, recovery copy, and support or retry path.",
    "Expose semantic props, events, and states. Do not expose raw token values.",
    "No raw values outside reference tokens.",
    "Show concrete user context and operational consequence.",
    "Include the product context, states, accessibility, reusable output, and tests.",
    "Copying behavior from the ZIP instead of translating it through Design System.",
    "The example shows how the foundation changes product behavior",
    "The rule is visible to humans and agents.",
    "The interface explains current state, available actions, constraints, and risks.",
    "Task completion without support contact.",
    "State precedence must be explicit and stable.",
    "viewport + density matrix",
    "Edenred Black title + Ubuntu body",
    "What product condition activates the foundation.",
    "Calm base state for ordinary work.",
    "Page-level composition.",
    "Timing scale for interaction.",
  ]) {
    if (app.includes(forbidden)) add("errors", docsAppFile, 1, `Reference editorial copy must not live in app.js: ${forbidden}`);
  }
}

function checkDocsContentOwnership() {
  const appFile = docsAppFile;
  const app = read(appFile);
  const structuralLiterals = [
    "Operational example",
    "Operational scenario",
    "Anatomy",
    "Accessibility",
    "Viewport organization",
    "Playground",
    "States",
    "Variants",
    "Variant x state behavior",
    "Full width",
    "Responsive layout patterns",
    "API and foundations",
    "Tests and rejection rules",
    "Must test",
    "Reject if",
    "Human + agent process",
    "Brief the agent",
    "Agent can decide",
    "Agent must ask",
    "Human review",
    "Machine contract",
    "Search results",
    "No matching artifacts",
    "Button playground controls",
    "Select playground controls",
    "Card playground controls",
    "Foundation contract",
    "Primitive API",
    "Pattern contract",
    "Template contract",
    "Decision tree",
    "Screen system",
    "Information architecture",
    "Data and permissions",
  ];

  for (const literal of structuralLiterals) {
    const patterns = [
      new RegExp(`<h[1-6]>${escapeRegExp(literal)}<\\/h[1-6]>`),
      new RegExp(`aria-label=(["'])${escapeRegExp(literal)}\\1`),
      new RegExp(`listPanel\\((["'])${escapeRegExp(literal)}\\1`),
      new RegExp(`referenceSection\\(\\s*(["'])${escapeRegExp(literal)}\\1`),
    ];
    const match = patterns.map((pattern) => ({ pattern, index: app.search(pattern) })).find((item) => item.index >= 0);
    if (match) {
      add("errors", appFile, lineNumber(app, match.index), `Structural UI copy must come from ui.json, not app.js: ${literal}.`);
    }
  }

  const editorialFindings = hardcodedEditorialStrings(app);
  const maxWarnings = 80;
  for (const finding of editorialFindings.slice(0, maxWarnings)) {
    add("warnings", appFile, finding.line, `Editorial content still lives in app.js; migrate to content/i18n/content packages: "${finding.value}".`);
  }
  if (editorialFindings.length > maxWarnings) {
    add("info", appFile, 1, `Editorial content audit found ${editorialFindings.length} hardcoded strings in app.js; showing first ${maxWarnings}.`);
  } else {
    add("info", appFile, 1, `Editorial content audit found ${editorialFindings.length} hardcoded strings in app.js.`);
  }
}

function hardcodedEditorialStrings(app) {
  const findings = [];
  const seen = new Set();
  const stringPattern = /(["'])((?:\\.|(?!\1)[^\\\n]){8,})\1/g;
  for (const match of app.matchAll(stringPattern)) {
    const before = app[match.index - 1] ?? "";
    const after = app[match.index + match[0].length] ?? "";
    if (/[A-Za-z0-9]/.test(before) || /[A-Za-z0-9]/.test(after)) continue;
    const value = match[2]
      .replace(/\\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!isEditorialString(value)) continue;
    const key = `${lineNumber(app, match.index)}:${value}`;
    if (seen.has(key)) continue;
    seen.add(key);
    findings.push({
      line: lineNumber(app, match.index),
      value: value.length > 140 ? `${value.slice(0, 137)}...` : value,
    });
  }
  return findings;
}

function isEditorialString(value) {
  if (!/[A-Za-z][a-z]/.test(value)) return false;
  if (!/\s/.test(value)) return false;
  if (value.length < 18) return false;
  if (/^[,;:)\]}]/.test(value)) return false;
  if (/[;{}<>]|=>|function\s|\?\?|\.\w+\(|\)\s*=>/.test(value)) return false;
  if (/^(?:https?:|\.{0,2}\/|#\/|--|data-|aria-|role=|<|<\/|\[|\{)/.test(value)) return false;
  if (/[{}][^ ]/.test(value)) return false;
  if (/^(?:shell|grid|tabs|overview|build|contract|table|guidelines|tests|component|playground|select|reference|miel|collections|artifact)\./.test(value)) return false;
  if (/^Design System .+ (?:unavailable|contract unavailable)\.?$/.test(value)) return false;
  if (/^\.[a-z][\w-]*(?:\s+[a-z.[\]="'#:-]+|,\s*\.[a-z][\w-]*(?:\s+[a-z.[\]="'#:-]+)*)+$/.test(value)) return false;
  if (/^(?:Material Symbols|Design System OS|Edenred Black|Ubuntu|Apache ECharts)$/.test(value)) return false;
  if (/^[a-z0-9.-]+\.(?:json|html|css|js|md)$/.test(value)) return false;
  if (/^(?:default|hover|focus|loading|disabled|error|success|warning|danger)(?: \| |, |$)/.test(value)) return false;
  if (/^(?:sm|md|lg|mobile|tablet|laptop|desktop)(?: \| |, |$)/i.test(value)) return false;
  if (value.includes("${")) return true;
  return /[.!?]/.test(value) || value.split(/\s+/).length >= 4;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = {
  checkHomeContentOwnership,
  checkFoundationCopyOwnership,
  checkPrimitiveCopyOwnership,
  checkReferenceCopyOwnership,
  checkDocsContentOwnership,
};
