const fs = require("fs");
const path = require("path");

const root = process.cwd();

function resolveBoundaryPath(alias, fallbackPath) {
  try {
    const target = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"))?.imports?.[alias];
    if (typeof target === "string" && target.startsWith("./")) return path.join(root, target);
    if (typeof target === "string") return require.resolve(target, { paths: [root] });
  } catch {}
  try {
    return require.resolve(alias);
  } catch {}
  return path.join(root, fallbackPath);
}

function resolveFirstExisting(paths) {
  return paths.find((file) => fs.existsSync(file)) ?? paths[0];
}

const docsAppDir = path.join(root, "apps/docs");
const docsAppFile = path.join(docsAppDir, "app.js");
const docsCatalogRenderersFile = path.join(docsAppDir, "catalog-renderers.js");
const docsContentSourcesFile = path.join(docsAppDir, "content-sources.js");
const docsChromeFile = path.join(docsAppDir, "docs-chrome.js");
const docsDetailTabsFile = path.join(docsAppDir, "detail-tabs.js");
const docsDetailTabsModuleFiles = fs.existsSync(docsAppDir)
  ? fs.readdirSync(docsAppDir)
      .filter((file) => file === "detail-tabs-core.js" || (/^(foundation|primitive|pattern|template)-tabs\.js$/.test(file)))
      .map((file) => path.join(docsAppDir, file))
  : [];
const docsLayoutFile = path.join(docsAppDir, "docs-layout.js");
const docsStateFile = path.join(docsAppDir, "docs-state.js");
const docsFamilyComponentDocsFile = path.join(docsAppDir, "family-component-docs.js");
const docsHomeStackRenderersFile = path.join(docsAppDir, "home-stack-renderers.js");
const docsInteractionsFile = path.join(docsAppDir, "doc-interactions.js");
const docsInteractionModuleFiles = fs.existsSync(docsAppDir)
  ? fs.readdirSync(docsAppDir)
      .filter((file) => /-interactions\.js$/.test(file) && file !== "doc-interactions.js")
      .map((file) => path.join(docsAppDir, file))
  : [];
const docsIconSystemFile = path.join(docsAppDir, "icon-system.js");
const docsFoundationExplorerFile = path.join(docsAppDir, "foundation-explorer.js");
const docsFoundationReferenceFile = path.join(docsAppDir, "foundation-reference.js");
const docsFoundationVisualSectionsFile = path.join(docsAppDir, "foundation-visual-sections.js");
const docsGoldComponentDocsFile = path.join(docsAppDir, "gold-component-docs.js");
const docsGoldComponentModuleFiles = fs.existsSync(docsAppDir)
  ? fs.readdirSync(docsAppDir)
      .filter((file) => /^gold-.*\.js$/.test(file))
      .map((file) => path.join(docsAppDir, file))
  : [];
const docsNavigationFile = path.join(docsAppDir, "navigation.js");
const docsPrimitiveReferenceFile = path.join(docsAppDir, "primitive-reference.js");
const docsReferenceLayoutFile = path.join(docsAppDir, "reference-layout.js");
const docsShellControlsFile = path.join(docsAppDir, "shell-controls.js");
const docsVisualExamplesFile = path.join(docsAppDir, "visual-examples.js");
const docsCssFile = path.join(docsAppDir, "styles.css");
const docsStylesDir = path.join(docsAppDir, "styles");
const docsStyleModulePaths = fs.existsSync(docsStylesDir)
  ? fs.readdirSync(docsStylesDir)
      .filter((file) => file.endsWith(".css"))
      .sort()
      .map((file) => `apps/docs/styles/${file}`)
  : [];
const docsStyleModuleFiles = docsStyleModulePaths.map((file) => path.join(root, file));
const docsIndexFile = path.join(docsAppDir, "index.html");
const specFile = resolveBoundaryPath("#design-system/specs/system", "packages/specs/specs/unison.system.json");
const componentDocsFile = resolveBoundaryPath("#design-system/content/component-docs", "packages/content/content/component-docs.json");
const componentCopyFile = resolveBoundaryPath("#design-system/content/component-copy", "packages/content/content/component-copy.json");
const componentImplementationStatusFile = resolveBoundaryPath("#design-system/content/component-implementation-status", "packages/content/content/component-implementation-status.json");
const patternCopyFile = resolveBoundaryPath("#design-system/content/pattern-copy", "packages/content/content/pattern-copy.json");
const foundationCopyFile = resolveBoundaryPath("#design-system/content/foundation-copy", "packages/content/content/foundation-copy.json");
const primitiveCopyFile = resolveBoundaryPath("#design-system/content/primitive-copy", "packages/content/content/primitive-copy.json");
const referenceCopyFile = resolveBoundaryPath("#design-system/content/reference-copy", "packages/content/content/reference-copy.json");
const catalogFile = resolveBoundaryPath("#design-system/content/catalog", "packages/content/content/catalog.json");
const homeFile = resolveBoundaryPath("#design-system/content/home", "packages/content/content/home.json");
const templateBlueprintsFile = resolveBoundaryPath("#design-system/content/template-blueprints", "packages/content/content/template-blueprints.json");
const uiI18nFile = resolveBoundaryPath("#design-system/content/i18n-ui", "packages/content/content/i18n/ui.json");
const docsRuntimeAuditFile = resolveFirstExisting([
  path.join(root, "audit/audit-docs-runtime.mjs"),
  path.join(root, "packages/audit/scripts/audit-docs-runtime.mjs"),
]);
const manifestFile = path.join(root, "system.manifest.json");

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const files = [
  "apps/docs/app.js",
  "apps/docs/button-playground-interactions.js",
  "apps/docs/catalog-renderers.js",
  "apps/docs/component-demo-interactions.js",
  "apps/docs/content-loader.js",
  "apps/docs/content-sources.js",
  "apps/docs/detail-tabs.js",
  "apps/docs/docs-chrome.js",
  "apps/docs/detail-tabs-core.js",
  "apps/docs/doc-interactions.js",
  "apps/docs/docs-layout.js",
  "apps/docs/docs-state.js",
  "apps/docs/family-component-docs.js",
  "apps/docs/foundation-explorer.js",
  "apps/docs/foundation-reference.js",
  "apps/docs/foundation-tabs.js",
  "apps/docs/foundation-visual-sections.js",
  "apps/docs/gold-button-docs.js",
  "apps/docs/gold-card-docs.js",
  "apps/docs/gold-badge-docs.js",
  "apps/docs/gold-chip-docs.js",
  "apps/docs/gold-tag-docs.js",
  "apps/docs/gold-tooltip-docs.js",
  "apps/docs/gold-toast-docs.js",
  "apps/docs/gold-inline-validation-docs.js",
  "apps/docs/gold-progress-indicator-docs.js",
  "apps/docs/gold-skeleton-docs.js",
  "apps/docs/gold-dialog-docs.js",
  "apps/docs/gold-menu-docs.js",
  "apps/docs/gold-drawer-docs.js",
  "apps/docs/gold-component-core.js",
  "apps/docs/gold-component-data.js",
  "apps/docs/gold-component-docs.js",
  "apps/docs/gold-simple-component-docs.js",
  "apps/docs/gold-tabs-docs.js",
  "apps/docs/gold-radio-button-docs.js",
  "apps/docs/gold-select-docs.js",
  "apps/docs/gold-combobox-docs.js",
  "apps/docs/gold-country-selector-docs.js",
  "apps/docs/gold-text-area-docs.js",
  "apps/docs/gold-icon-button-docs.js",
  "apps/docs/home-stack-renderers.js",
  "apps/docs/icon-system.js",
  "apps/docs/navigation.js",
  "apps/docs/pattern-tabs.js",
  "apps/docs/pattern-contract-tabs.js",
  "apps/docs/primitive-reference.js",
  "apps/docs/primitive-tabs.js",
  "apps/docs/reference-layout.js",
  "apps/docs/reference-demo-interactions.js",
  "apps/docs/shell-controls.js",
  "apps/docs/select-interactions.js",
  "apps/docs/tooltip-demo-interactions.js",
  "apps/docs/toast-demo-interactions.js",
  "apps/docs/progress-indicator-demo-interactions.js",
  "apps/docs/template-tabs.js",
  "apps/docs/utils.js",
  "apps/docs/visual-examples.js",
  "apps/docs/styles.css",
  ...docsStyleModulePaths,
  "apps/docs/index.html",
  "packages/audit/scripts/audit-context.js",
  "packages/audit/scripts/audit-component-implementation-status.js",
  "packages/audit/scripts/audit-content-ownership.js",
  "packages/audit/scripts/audit-css.js",
  "packages/audit/scripts/audit-accessibility-contracts.js",
  "packages/audit/scripts/audit-batch-zip-parity.js",
  "packages/audit/scripts/audit-complete.mjs",
  "packages/audit/scripts/audit-component-api-prop-alignment.js",
  "packages/audit/scripts/audit-demo-layout-contracts.js",
  "packages/audit/scripts/audit-density-contracts.js",
  "packages/audit/scripts/audit-docs.js",
  "packages/audit/scripts/audit-docs-content.js",
  "packages/audit/scripts/audit-docs-runtime.mjs",
  "packages/audit/scripts/audit-energy-contracts.js",
  "packages/audit/scripts/audit-foundation-contracts.js",
  "packages/audit/scripts/audit-system-scope.js",
  "packages/audit/scripts/audit-architecture-gate.js",
  "packages/audit/scripts/audit-voice-contracts.js",
  "packages/audit/scripts/audit-gold-copy.js",
  "packages/audit/scripts/audit-gold-components.js",
  "packages/audit/scripts/audit-gold-demo-quality.js",
  "packages/audit/scripts/audit-gold-docs.js",
  "packages/audit/scripts/audit-gold-page-parity.js",
  "packages/audit/scripts/audit-layout-contracts.js",
  "packages/audit/scripts/audit-integration.js",
  "packages/audit/scripts/audit-motion-contracts.js",
  "packages/audit/scripts/audit-package-api.js",
  "packages/audit/scripts/audit-platform.js",
  "packages/audit/scripts/audit-primitive-contracts.js",
  "packages/audit/scripts/audit-result.js",
  "packages/audit/scripts/audit-repo-boundary.js",
  "packages/audit/scripts/audit-repo-boundary-runner.js",
  "packages/audit/scripts/audit-routes.js",
  "packages/audit/scripts/audit-spec.js",
  "packages/audit/scripts/audit-state-contracts.js",
  "packages/audit/scripts/audit-system.js",
  "packages/audit/scripts/audit-table-contracts.js",
  "packages/specs/specs/unison.system.json",
  "packages/content/content/component-implementation-status.json",
  "agents/codex-agent.md",
  "prompts/component-authoring.md",
]
  .map((file) => path.join(root, file))
  .filter((file) => fs.existsSync(file));

const foundations = [
  "Energy",
  "Voice",
  "Frame",
  "Depth",
  "Momentum",
  "State",
  "Tone",
  "Growth",
  "Symbol",
  "Iconography",
  "Accessibility",
];
const primitiveNames = [
  "Color",
  "Typography",
  "Spacing",
  "Radius",
  "Elevation",
  "Iconography",
  "Motion Curves",
  "Duration",
  "Breakpoints",
  "Density",
  "Focus",
  "Loading",
  "Disabled",
  "Charts",
  "Maps",
  "Message",
  "Measurement",
  "Research",
];
const foundationIds = foundations.map((name) => slug(name));
const goldComponents = ["button", "select", "combobox", "country-selector", "card", "input", "checkbox", "switch", "radio-button", "text-area", "icon-button", "badge", "chip", "tag", "tabs", "tooltip", "toast", "inline-validation", "progress-indicator", "spinner", "skeleton", "dialog", "menu", "drawer", "accordion", "empty-state", "table", "avatar", "slider", "stepper", "list", "kpi-tile", "chart-panel", "station-pin", "route-summary", "code-input", "phone-input", "card-number-input", "card-expiry-input", "card-security-code-input", "date-picker", "date-range-picker", "segmented-control", "popover", "floating-action-button", "card-summary", "movement-row", "quick-action", "biometric-prompt", "breadcrumbs", "pagination", "audit-event", "error-panel", "tree-view", "motion-boundary", "animated-moment"];
const requiredFoundationContracts = foundations.map((name) => slug(name));
const requiredPrimitiveContracts = primitiveNames.map((name) => slug(name));
const requiredComponentContracts = ["button", "select", "combobox", "country-selector", "card", "input", "checkbox", "switch", "radio-button", "text-area", "icon-button", "badge", "chip", "tag", "tabs", "tooltip", "toast", "inline-validation", "progress-indicator", "spinner", "skeleton", "dialog", "menu", "drawer", "accordion", "empty-state", "table", "avatar", "slider", "stepper", "list", "kpi-tile", "chart-panel", "station-pin", "route-summary", "code-input", "phone-input", "card-number-input", "card-expiry-input", "card-security-code-input", "date-picker", "segmented-control", "popover", "floating-action-button", "card-summary", "movement-row", "quick-action", "biometric-prompt", "breadcrumbs", "pagination", "audit-event", "error-panel", "tree-view", "motion-boundary", "animated-moment"];
const requiredPatternContracts = ["action-sheet", "autocomplete", "avatar-menu", "bulk-actions", "command-palette", "confirmation-dialog", "drawer-adapter", "file-upload", "filter-chip-group", "form-section", "fullscreen-sheet", "help-center", "multi-select", "multi-step-form", "notification-panel", "quick-actions-grid", "search", "select-option-layer", "settings", "sidebar", "swipe-actions", "toolbar", "topbar"];
const cssFile = docsCssFile;

const result = {
  status: "pass",
  errors: [],
  warnings: [],
  info: [],
  inventory: {},
};

const read = (file) => fs.readFileSync(file, "utf8");
const rel = (file) => path.relative(root, file);

function readDocsCss() {
  return [docsCssFile, ...docsStyleModuleFiles]
    .filter((file) => fs.existsSync(file))
    .map((file) => read(file))
    .join("\n");
}

function readSpec() {
  return readJson(specFile);
}

function readJson(file) {
  if (!fs.existsSync(file)) return null;
  try {
    return resolveJsonShards(JSON.parse(read(file)), path.dirname(file));
  } catch {
    return null;
  }
}

function mergeJson(target, source) {
  if (Array.isArray(target) && Array.isArray(source)) return [...target, ...source];
  if (!target || typeof target !== "object" || Array.isArray(target)) return source;
  if (!source || typeof source !== "object" || Array.isArray(source)) return source;
  return Object.entries(source).reduce((next, [key, value]) => {
    next[key] = key in next ? mergeJson(next[key], value) : value;
    return next;
  }, { ...target });
}

function resolveJsonShards(content, baseDir) {
  if (!Array.isArray(content?.$systemShards)) return content;
  return content.$systemShards
    .map((shardPath) => resolveJsonShards(JSON.parse(read(path.join(baseDir, shardPath))), path.dirname(path.join(baseDir, shardPath))))
    .reduce((merged, shard) => mergeJson(merged, shard), {});
}

function add(kind, file, line, message) {
  result[kind].push({ file: rel(file), line, message });
}

function lineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

function eachMatch(file, regex, callback) {
  const text = read(file);
  for (const match of text.matchAll(regex)) {
    callback(match, text, lineNumber(text, match.index));
  }
}

module.exports = {
  fs,
  path,
  root,
  docsAppDir,
  docsAppFile,
  docsCatalogRenderersFile,
  docsContentSourcesFile,
  docsChromeFile,
  docsDetailTabsFile,
  docsDetailTabsModuleFiles,
  docsLayoutFile,
  docsStateFile,
  docsFamilyComponentDocsFile,
  docsHomeStackRenderersFile,
  docsInteractionsFile,
  docsInteractionModuleFiles,
  docsIconSystemFile,
  docsFoundationExplorerFile,
  docsFoundationReferenceFile,
  docsFoundationVisualSectionsFile,
  docsGoldComponentDocsFile,
  docsGoldComponentModuleFiles,
  docsNavigationFile,
  docsPrimitiveReferenceFile,
  docsReferenceLayoutFile,
  docsShellControlsFile,
  docsVisualExamplesFile,
  docsCssFile,
  docsStylesDir,
  docsStyleModulePaths,
  docsStyleModuleFiles,
  docsIndexFile,
  specFile,
  componentDocsFile,
  componentCopyFile,
  componentImplementationStatusFile,
  patternCopyFile,
  foundationCopyFile,
  primitiveCopyFile,
  referenceCopyFile,
  catalogFile,
  homeFile,
  templateBlueprintsFile,
  uiI18nFile,
  docsRuntimeAuditFile,
  manifestFile,
  files,
  foundations,
  foundationIds,
  primitiveNames,
  goldComponents,
  requiredFoundationContracts,
  requiredPrimitiveContracts,
  requiredComponentContracts,
  requiredPatternContracts,
  cssFile,
  result,
  resolveBoundaryPath,
  read,
  rel,
  readDocsCss,
  readSpec,
  readJson,
  slug,
  add,
  lineNumber,
  eachMatch,
};
