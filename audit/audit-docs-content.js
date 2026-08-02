const {
  fs,
  docsAppFile,
  docsCatalogRenderersFile,
  docsChromeFile,
  docsContentSourcesFile,
  docsDetailTabsFile,
  docsDetailTabsModuleFiles,
  docsLayoutFile,
  docsStateFile,
  docsFamilyComponentDocsFile,
  docsFoundationExplorerFile,
  docsFoundationReferenceFile,
  docsFoundationVisualSectionsFile,
  docsGoldComponentDocsFile,
  docsGoldComponentModuleFiles,
  docsHomeStackRenderersFile,
  docsInteractionsFile,
  docsInteractionModuleFiles,
  docsIndexFile,
  docsNavigationFile,
  docsPrimitiveReferenceFile,
  docsReferenceLayoutFile,
  docsRuntimeAuditFile,
  docsShellControlsFile,
  docsVisualExamplesFile,
  templateBlueprintsFile,
  uiI18nFile,
  catalogFile,
  read,
  readJson,
  readSpec,
  add,
} = require("./audit-context.js");

function checkTemplateBlueprints() {
  const appFile = docsAppFile;
  const app = read(appFile);
  const spec = readSpec();
  if (app.includes("const templateBlueprints = {")) {
    add("errors", appFile, 1, "Template blueprints must live in content/template-blueprints.json, not app.js.");
  }
  const contentSources = fs.existsSync(docsContentSourcesFile) ? read(docsContentSourcesFile) : "";
  if (!contentSources.includes("generated/docs-content.bundle.json") || !contentSources.includes("templateBlueprintContent")) {
    add("errors", appFile, 1, "App must load template blueprints from the generated docs content bundle.");
  }

  if (!fs.existsSync(templateBlueprintsFile)) {
    add("errors", templateBlueprintsFile, 1, "Template blueprints must live in content/template-blueprints.json.");
    return;
  }

  let blueprintContent = null;
  let blueprints = null;
  try {
    blueprintContent = JSON.parse(read(templateBlueprintsFile));
    blueprints = blueprintContent.templates;
  } catch (error) {
    add("errors", templateBlueprintsFile, 1, `Template blueprints JSON is invalid: ${error.message}`);
    return;
  }
  for (const field of ["primary", "standard", "screenSystem", "informationArchitecture", "processDetail", "moduleDetail", "dataSources", "permissions", "states", "telemetry", "surfaces", "modules", "patternDependencies", "stateMatrixCopy", "dataPermissions"]) {
    if (!blueprintContent.fallbacks?.[field]) add("errors", templateBlueprintsFile, 1, `Template blueprint fallback missing field: ${field}.`);
  }

  const templateTitles = [...app.matchAll(/template\("([^"]+)"/g)].map((match) => match[1]);
  for (const title of templateTitles) {
    const blueprint = blueprints?.[title];
    if (!blueprint) {
      add("errors", templateBlueprintsFile, 1, `Template blueprint missing: ${title}.`);
      continue;
    }
    const templateId = slug(title);
    const contract = spec?.artifacts?.templates?.[templateId];
    if (!contract) {
      add("errors", specFile, 1, `Missing machine-readable template contract: artifacts.templates.${templateId}.`);
      continue;
    }
    const requiredContractFields = ["layer", "platform", "audiences", "purpose", "governingFoundations", "primitiveDependencies", "patternDependencies", "tokenDependencies", "densityContext", "modules", "dataSources", "permissions", "states", "surfaces", "telemetry", "qualityGates", "agentInstructions", "rejectIf"];
    for (const field of requiredContractFields) {
      const value = contract[field];
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const isEmptyObject = value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0;
      if (value === undefined || value === "" || isEmptyArray || isEmptyObject) {
        add("errors", specFile, 1, `Template contract ${templateId} missing ${field}.`);
      }
    }
    if (contract.layer !== "Template") {
      add("errors", specFile, 1, `Template contract ${templateId} must declare layer Template.`);
    }
    for (const field of ["nav", "metrics", "modules", "moduleDetails", "processDetails", "standard", "screenSystem", "informationArchitecture", "primary", "permissions", "data", "states", "surfaces", "telemetry", "qualityGates"]) {
      const value = blueprint[field];
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      const isEmptyObject = value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0;
      if (value === undefined || value === "" || isEmptyArray || isEmptyObject) {
        add("errors", templateBlueprintsFile, 1, `Template blueprint ${title} missing ${field}.`);
      }
    }
    for (const moduleName of blueprint.modules ?? []) {
      const detail = blueprint.moduleDetails?.[moduleName];
      if (!detail?.copy || !detail?.icon) {
        add("errors", templateBlueprintsFile, 1, `Template blueprint ${title} module missing detail: ${moduleName}.`);
      }
    }
    const appTemplateMatch = app.match(new RegExp(`template\\("${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?\\[(.*?)\\]\\)`, "m"));
    const patternNames = appTemplateMatch?.[1]?.match(/"([^"]+)"/g)?.map((item) => item.slice(1, -1)) ?? [];
    for (const patternName of patternNames) {
      if (!blueprint.processDetails?.[patternName]) {
        add("errors", templateBlueprintsFile, 1, `Template blueprint ${title} system missing detail: ${patternName}.`);
      }
    }
    const syncChecks = [
      ["modules", blueprint.modules, contract.modules],
      ["dataSources", blueprint.data, contract.dataSources],
      ["permissions", blueprint.permissions, contract.permissions],
      ["states", blueprint.states, contract.states],
      ["surfaces", blueprint.surfaces, contract.surfaces],
      ["telemetry", blueprint.telemetry, contract.telemetry],
      ["qualityGates", blueprint.qualityGates, contract.qualityGates],
      ["patternDependencies", patternNames, contract.patternDependencies],
    ];
    for (const [field, sourceValue, contractValue] of syncChecks) {
      if (JSON.stringify(sourceValue ?? []) !== JSON.stringify(contractValue ?? [])) {
        add("errors", specFile, 1, `Template contract ${templateId} ${field} must stay synchronized with template-blueprints.json.`);
      }
    }
  }

  const templateRuntime = [
    app,
    fs.existsSync(docsDetailTabsFile) ? read(docsDetailTabsFile) : "",
    ...docsDetailTabsModuleFiles.map((file) => read(file)),
  ].join("\n");
  for (const rendererGuard of ["blueprint?.telemetry", "blueprint?.qualityGates", "blueprint?.surfaces", "blueprint?.standard", "blueprint?.screenSystem", "blueprint?.informationArchitecture", "specQualityGates(entry)"]) {
    if (!templateRuntime.includes(rendererGuard)) {
      add("errors", appFile, 1, `Template pages must render blueprint data instead of fixed generic copy: ${rendererGuard}.`);
    }
  }
  if (!templateRuntime.includes("patternDependencies: contract.patternDependencies")) {
    add("errors", appFile, 1, "Template MIEL and engineering contracts must expose patternDependencies from specs.");
  }
  if (!templateRuntime.includes('["pattern", "template"].includes(entry.type) && contract?.agentInstructions') || !templateRuntime.includes('["pattern", "template"].includes(entry.type) && contract?.rejectIf')) {
    add("errors", appFile, 1, "Template Guidelines must render agentInstructions and rejectIf from specs.");
  }
  for (const forbidden of ["module.toLowerCase().includes", "Persistent context, saved views", "Document purpose, states, permissions", "complete success, empty, loading", "A template is done only", "Templates need a system", "Core areas are organized", "Primary work area", "Owner, freshness, privacy", "Task completion, recovery", "Declared at the template surface", "Template cannot invent behavior"]) {
    if (templateRuntime.includes(forbidden)) {
      add("errors", appFile, 1, `Template module behavior must come from content/template-blueprints.json, not heuristics: ${forbidden}.`);
    }
  }
}

function checkI18nReadiness() {
  const appFile = docsAppFile;
  const app = read(appFile);
  const uiCopy = readJson(uiI18nFile);
  if (!uiCopy) {
    add("errors", uiI18nFile, 1, "UI i18n copy must live in packages/content/content/i18n/ui.json.");
    return;
  }
  if (uiCopy.defaultLocale !== "en") {
    add("errors", uiI18nFile, 1, "UI i18n defaultLocale must be en until localization rollout is explicit.");
  }
  const requiredKeys = [
    "shell.skipToContent",
    "shell.primaryNavigation",
    "shell.designNavigation",
    "shell.searchLabel",
    "shell.searchPlaceholder",
    "shell.searchResults",
    "shell.noSearchResults",
    "shell.openNavigation",
    "shell.showGrid",
    "shell.hideGrid",
    "shell.toggleContrast",
    "shell.languageToggle",
    "shell.languageCurrent",
    "shell.breadcrumbs",
    "shell.artifactMetadata",
    "shell.sections",
    "shell.detailNavigation",
    "shell.brandHome",
    "grid.desktop",
    "grid.tablet",
    "grid.mobile",
    "grid.pageGrid",
    "grid.column",
    "grid.columns",
    "grid.gutter",
    "tabs.overview",
    "tabs.design",
    "tabs.build",
    "overview.whyItExists",
    "overview.intentCopy",
    "overview.platform",
    "overview.publicTokens",
    "build.engineeringContract",
    "build.specAndApi",
    "build.specIntro",
    "build.qualityGates",
    "build.apiAndFoundations",
    "contract.pattern",
    "contract.template",
    "contract.api",
    "table.name",
    "table.prop",
    "table.field",
    "table.type",
    "table.required",
    "table.notes",
    "table.default",
    "table.rule",
    "table.contract",
    "table.meaning",
    "table.prevents",
    "table.layer",
    "table.expectation",
    "table.foundation",
    "table.evidence",
    "guidelines.title",
    "guidelines.do",
    "guidelines.doNot",
    "guidelines.notes",
    "tests.title",
    "tests.required",
    "tests.mustTest",
    "tests.rejectIf",
    "component.operationalExample",
    "component.anatomy",
    "component.accessibility",
    "component.viewportOrganization",
    "component.playground",
    "component.states",
    "component.variants",
    "component.variantStateBehavior",
    "component.fullWidth",
    "component.responsiveLayoutPatterns",
    "playground.buttonControls",
    "playground.selectControls",
    "playground.cardControls",
    "select.currentSelection",
    "reference.rules",
    "reference.decisionTree",
    "reference.tokenModel",
    "reference.overview",
    "reference.semanticRoleGroups",
    "reference.architecture",
    "reference.visualExplanation",
    "reference.foundationContract",
    "reference.primitiveOverview",
    "reference.coordinatorRole",
    "reference.densityDecision",
    "reference.liveDemo",
    "reference.responsibilities",
    "reference.tokenChain",
    "reference.primitiveApi",
    "reference.purpose",
    "reference.apiReference",
    "reference.specificationMatrix",
    "reference.specificationMatrixIntro",
    "reference.tokenReference",
    "reference.tokenReferenceIntro",
    "reference.usageRules",
    "reference.requiredStates",
    "reference.anatomy",
    "reference.accessibilityContract",
    "reference.screensComponents",
    "reference.successMetrics",
    "reference.operationalScenario",
    "reference.mustProve",
    "reference.groupDemo",
    "reference.stateMatrix",
    "reference.responsiveBehavior",
    "reference.componentTestingContract",
    "reference.foundationTrace",
    "reference.howFoundationsGovern",
    "reference.demoMatrix",
    "reference.visualExample",
    "reference.realExample",
    "reference.semanticContract",
    "reference.researchQuestions",
    "reference.failureModes",
    "reference.patternStandard",
    "reference.templateStandard",
    "reference.productContext",
    "reference.screenSystem",
    "reference.templateStateMatrix",
    "reference.informationArchitecture",
    "reference.coreProcesses",
    "reference.templateModules",
    "reference.dataPermissions",
    "miel.title",
    "miel.intro",
    "miel.briefAgent",
    "miel.agentCanDecide",
    "miel.agentMustAsk",
    "miel.rejectIf",
    "miel.handoff",
    "miel.humanReview",
    "miel.machineContract",
    "collections.foundations",
    "collections.primitives",
    "collections.components",
    "collections.patterns",
    "collections.templates",
    "artifact.foundation",
    "artifact.primitive",
    "artifact.component",
    "artifact.pattern",
    "artifact.template",
  ];
  for (const locale of ["en", "es"]) {
    const localeCopy = uiCopy.locales?.[locale];
    if (!localeCopy) {
      add("errors", uiI18nFile, 1, `UI i18n missing locale: ${locale}.`);
      continue;
    }
    for (const key of requiredKeys) {
      if (!localeCopy[key]) {
        add("errors", uiI18nFile, 1, `UI i18n locale ${locale} missing key: ${key}.`);
      }
    }
  }
  const docsRuntime = [
    app,
    fs.existsSync(docsCatalogRenderersFile) ? read(docsCatalogRenderersFile) : "",
    fs.existsSync(docsContentSourcesFile) ? read(docsContentSourcesFile) : "",
    fs.existsSync(docsChromeFile) ? read(docsChromeFile) : "",
    fs.existsSync(docsDetailTabsFile) ? read(docsDetailTabsFile) : "",
    ...docsDetailTabsModuleFiles.map((file) => read(file)),
    fs.existsSync(docsLayoutFile) ? read(docsLayoutFile) : "",
    fs.existsSync(docsStateFile) ? read(docsStateFile) : "",
    fs.existsSync(docsFamilyComponentDocsFile) ? read(docsFamilyComponentDocsFile) : "",
    fs.existsSync(docsFoundationExplorerFile) ? read(docsFoundationExplorerFile) : "",
    fs.existsSync(docsFoundationReferenceFile) ? read(docsFoundationReferenceFile) : "",
    fs.existsSync(docsFoundationVisualSectionsFile) ? read(docsFoundationVisualSectionsFile) : "",
    fs.existsSync(docsGoldComponentDocsFile) ? read(docsGoldComponentDocsFile) : "",
    ...docsGoldComponentModuleFiles.map((file) => read(file)),
    fs.existsSync(docsHomeStackRenderersFile) ? read(docsHomeStackRenderersFile) : "",
    fs.existsSync(docsInteractionsFile) ? read(docsInteractionsFile) : "",
    ...docsInteractionModuleFiles.map((file) => read(file)),
    fs.existsSync(docsNavigationFile) ? read(docsNavigationFile) : "",
    fs.existsSync(docsPrimitiveReferenceFile) ? read(docsPrimitiveReferenceFile) : "",
    fs.existsSync(docsReferenceLayoutFile) ? read(docsReferenceLayoutFile) : "",
    fs.existsSync(docsShellControlsFile) ? read(docsShellControlsFile) : "",
    fs.existsSync(docsVisualExamplesFile) ? read(docsVisualExamplesFile) : "",
  ].join("\n");
  for (const required of ["loadDocsContent", "function ui(", "applyLocalizedChrome", "setupLanguageToggle", "localStorage.setItem(\"system.locale\"", "ui(\"tabs.overview\")", "ui(\"overview.whyItExists\")", "ui(\"overview.publicTokens\")", "ui(\"build.specAndApi\")", "ui(\"build.qualityGates\")", "ui(\"build.apiAndFoundations\")", "ui(\"contract.pattern\")", "ui(\"contract.template\")", "ui(\"contract.api\")", "ui(\"table.name\")", "ui(\"table.prop\")", "ui(\"table.field\")", "ui(\"table.default\")", "ui(\"table.contract\")", "ui(\"table.layer\")", "ui(\"guidelines.title\")", "ui(\"guidelines.notes\")", "ui(\"tests.title\")", "ui(\"tests.required\")", "ui(\"tests.mustTest\")", "ui(\"component.operationalExample\")", "ui(\"component.variantStateBehavior\")", "ui(\"component.responsiveLayoutPatterns\")", "ui(\"playground.buttonControls\")", "ui(\"playground.selectControls\")", "ui(\"playground.cardControls\")", "ui(\"select.currentSelection\")", "ui(\"reference.tokenModel\")", "ui(\"reference.foundationContract\")", "ui(\"reference.primitiveApi\")", "ui(\"reference.purpose\")", "ui(\"reference.apiReference\")", "ui(\"reference.specificationMatrix\")", "ui(\"reference.tokenReference\")", "ui(\"reference.decisionTree\")", "ui(\"reference.screenSystem\")", "ui(\"reference.dataPermissions\")", "ui(\"reference.operationalScenario\")", "ui(\"reference.componentTestingContract\")", "ui(\"reference.foundationTrace\")", "ui(\"reference.semanticContract\")", "ui(\"miel.title\")", "ui(\"miel.briefAgent\")", "ui(\"miel.rejectIf\")", "ui(\"miel.handoff\")", "ui(\"miel.machineContract\")", "ui(\"shell.searchResults\")", "ui(\"shell.noSearchResults\")", "ui(\"shell.breadcrumbs\")", "ui(\"shell.sections\")", "ui(\"shell.detailNavigation\")", "ui(\"shell.brandHome\")", "grid.pageGrid", "ui(`collections.${key}`)", "function artifactTypeLabel"]) {
    if (!docsRuntime.includes(required)) {
      add("errors", appFile, 1, `Docs app must use i18n UI readiness helper: ${required}.`);
    }
  }
  const index = read(docsIndexFile);
  if (!index.includes('id="languageToggle"')) {
    add("errors", docsIndexFile, 1, "Docs app must expose a language toggle for i18n readiness.");
  }
}

module.exports = {
  checkTemplateBlueprints,
  checkI18nReadiness,
};
