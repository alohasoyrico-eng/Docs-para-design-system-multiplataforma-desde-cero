const {
  fs,
  docsAppFile,
  docsDetailTabsFile,
  docsDetailTabsModuleFiles,
  docsFoundationExplorerFile,
  docsFoundationReferenceFile,
  docsFoundationVisualSectionsFile,
  docsPrimitiveReferenceFile,
  primitiveCopyFile,
  specFile,
  catalogFile,
  foundations,
  primitiveNames,
  read,
  readJson,
  readSpec,
  slug,
  add,
} = require("./audit-context.js");

function checkFoundationRoutesAndContent() {
  const appFile = docsAppFile;
  const app = read(appFile);
  const foundationRuntime = [
    app,
    fs.existsSync(docsFoundationExplorerFile) ? read(docsFoundationExplorerFile) : "",
    fs.existsSync(docsFoundationReferenceFile) ? read(docsFoundationReferenceFile) : "",
    fs.existsSync(docsFoundationVisualSectionsFile) ? read(docsFoundationVisualSectionsFile) : "",
  ].join("\n");
  const spec = readSpec();
  const catalog = readJson(catalogFile);
  const catalogFoundations = new Set((catalog?.foundations ?? []).map((entry) => entry.title));
  for (const foundation of foundations) {
    const id = slug(foundation);
    if (!catalogFoundations.has(foundation)) {
      add("errors", catalogFile, 1, `Missing foundation inventory entry: ${foundation}.`);
    }
    const hasMachineContract = Boolean(spec?.artifacts?.foundations?.[id]);
    if (!hasMachineContract && !foundationRuntime.includes(`data-foundation="${id}"`) && !foundationRuntime.includes(`"${id}"`) && !foundationRuntime.includes(`${id}:`)) {
      add("warnings", appFile, 1, `Foundation ${foundation} may not have enough detail-route evidence.`);
    }
  }

  const requiredSections = [
    "foundationReferenceContent",
    "foundationVisualReferenceSection",
    "foundationExplorerSection",
    "foundationSpecSection",
    "foundationTokenArchitectureSection",
    "foundationRulesSection",
  ];

  for (const section of requiredSections) {
    if (!foundationRuntime.includes(`function ${section}`) && !foundationRuntime.includes(`function ${section}`.replace("function ", "export function "))) {
      add("errors", appFile, 1, `Missing foundation detail section function: ${section}.`);
    }
  }
}

function checkPrimitiveRoutesAndContent() {
  const appFile = docsAppFile;
  const app = read(appFile);
  const primitiveRuntime = [
    app,
    fs.existsSync(docsDetailTabsFile) ? read(docsDetailTabsFile) : "",
    ...docsDetailTabsModuleFiles.map((file) => read(file)),
    fs.existsSync(docsPrimitiveReferenceFile) ? read(docsPrimitiveReferenceFile) : "",
  ].join("\n");
  const spec = readSpec();
  const catalog = readJson(catalogFile);
  const catalogPrimitives = new Set((catalog?.primitives ?? []).map((entry) => entry.title));
  for (const primitive of primitiveNames) {
    if (!catalogPrimitives.has(primitive)) {
      add("errors", catalogFile, 1, `Missing primitive inventory entry: ${primitive}.`);
    }
  }

  const requiredSections = [
    "primitivePurposeSection",
    "primitiveLiveDemoSection",
    "primitiveResponsibilitiesReferenceSection",
    "primitiveApiReferenceSection",
    "primitiveSpecMatrixSection",
    "primitiveTokenReferenceSection",
  ];

  for (const section of requiredSections) {
    if (!primitiveRuntime.includes(`function ${section}`)) {
      add("errors", appFile, 1, `Missing primitive detail section function: ${section}.`);
    }
  }

  const primitiveCopyText = JSON.stringify(readJson(primitiveCopyFile) ?? {});
  for (const required of ["densityCoordinatorPanel", "densityDecisionPanel", "Coordinates Spacing, Typography, Iconography, Focus, Loading, Disabled, and Breakpoints", "component exposes public size", "Change rhythm and grouping before sacrificing readability"]) {
    if (!primitiveRuntime.includes(required) && !JSON.stringify(spec ?? {}).includes(required) && !primitiveCopyText.includes(required)) {
      add("errors", appFile, 1, `Density primitive coordinator contract missing: ${required}.`);
    }
  }

  const densityContract = spec?.artifacts?.primitives?.density;
  const coordinated = densityContract?.coordinatesPrimitives ?? [];
  for (const primitive of ["Spacing", "Typography", "Iconography", "Focus", "Loading", "Disabled", "Breakpoints"]) {
    if (!coordinated.includes(primitive)) {
      add("errors", specFile, 1, `Density primitive must coordinate ${primitive}.`);
    }
  }
}

module.exports = {
  checkFoundationRoutesAndContent,
  checkPrimitiveRoutesAndContent,
};
