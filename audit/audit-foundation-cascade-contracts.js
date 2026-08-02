const {
  fs,
  path,
  root,
  docsAppDir,
  docsStyleModuleFiles,
  read,
  readJson,
  resolveBoundaryPath,
  add,
} = require("./audit-context.js");

const tokenCssFile = resolveBoundaryPath("#design-system/tokens-css", "packages/tokens/styles/tokens.css");
const componentCssFile = resolveBoundaryPath("#design-system/components-css", "packages/components/styles/components.css");
const foundationDependencyMatrixFile = path.join(root, "docs/audits/foundation-dependency-matrix.json");

function lineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

function extractFirstRootBlock(source) {
  const start = source.indexOf(":root");
  if (start < 0) return "";
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(open + 1, index);
    }
  }
  return "";
}

function withoutFirstRootBlock(source) {
  const start = source.indexOf(":root");
  if (start < 0) return source;
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") {
      depth -= 1;
      if (depth === 0) return `${source.slice(0, start)}\n${source.slice(index + 1)}`;
    }
  }
  return source;
}

function assertTokenPackageOwnsFoundationTokens(tokenCss) {
  const required = [
    "--ref-voice-family-brand",
    "--sys-voice-heading-md-size",
    "--ref-energy-blue-500",
    "--sys-energy-action-primary",
    "--ref-frame-space-4",
    "--sys-frame-padding-container",
    "--ref-state-opacity-disabled",
    "--sys-state-focus-ring",
    "--ref-momentum-duration-fast",
    "--sys-momentum-easing-exit",
    "--ref-depth-shadow-color-rgb",
    "--sys-depth-elevation-3",
    "--ref-tone-weight-neutral",
    "--sys-tone-repair-color",
    "--ref-a11y-touch-target-min",
    "--sys-a11y-focus-ring",
    "--ref-symbol-family-material",
    "--sys-symbol-color-action",
    "--sys-iconography-family",
    "--sys-iconography-focus-ring",
    "--ref-growth-stage-seed",
    "--sys-growth-stage-stable-color",
  ];
  for (const token of required) {
    if (!tokenCss.includes(`${token}:`)) {
      add("errors", tokenCssFile, 1, `Foundation cascade missing package-owned token: ${token}.`);
    }
  }
}

function declarationForToken(source, token) {
  const marker = `${token}:`;
  const start = source.indexOf(marker);
  if (start < 0) return "";
  const end = source.indexOf(";", start);
  if (end < 0) return source.slice(start);
  return source.slice(start, end + 1);
}

function assertFoundationDependencyMatrix(tokenCss) {
  if (!fs.existsSync(foundationDependencyMatrixFile)) {
    add("errors", foundationDependencyMatrixFile, 1, "Foundation dependency matrix is required before adding or moving foundations.");
    return;
  }

  const matrix = readJson(foundationDependencyMatrixFile);
  const requiredFoundations = ["Energy", "Voice", "Frame", "State", "Momentum", "Depth", "Tone", "Accessibility", "Symbol", "Iconography", "Growth"];
  const activeFoundations = Array.isArray(matrix.activeFoundations) ? matrix.activeFoundations : [];
  for (const foundation of requiredFoundations) {
    if (!activeFoundations.includes(foundation)) {
      add("errors", foundationDependencyMatrixFile, 1, `Foundation dependency matrix must list active foundation: ${foundation}.`);
    }
  }

  const dependencies = Array.isArray(matrix.dependencies) ? matrix.dependencies : [];
  const dependencyKeys = new Set(dependencies.map((dependency) => `${dependency.from}->${dependency.to}`));
  const requiredEdges = [
    "State->Energy",
    "Accessibility->State",
    "Accessibility->Momentum",
    "Tone->Voice",
    "Tone->Energy",
    "Depth->Energy",
    "Depth->Frame",
    "State->Frame",
    "Frame->Density",
    "Density->Frame",
    "Density->Voice",
    "Symbol->Energy",
    "Iconography->Symbol",
    "Iconography->Accessibility",
    "Iconography->Energy",
    "Growth->Energy",
    "Growth->Voice",
  ];
  for (const edge of requiredEdges) {
    if (!dependencyKeys.has(edge)) {
      add("errors", foundationDependencyMatrixFile, 1, `Foundation dependency matrix missing required edge: ${edge}.`);
    }
  }

  for (const dependency of dependencies) {
    if (!dependency.from || !dependency.to || !dependency.reason) {
      add("errors", foundationDependencyMatrixFile, 1, "Each foundation dependency must include from, to, and reason.");
    }
    if (!Array.isArray(dependency.evidence) || dependency.evidence.length === 0) {
      add("errors", foundationDependencyMatrixFile, 1, `Foundation dependency ${dependency.from}->${dependency.to} must include token evidence.`);
      continue;
    }

    const skipPackageEvidence = dependency.status === "pending-foundation-migration";
    if (skipPackageEvidence) continue;

    for (const evidence of dependency.evidence) {
      if (!evidence.token || !evidence.uses) {
        add("errors", foundationDependencyMatrixFile, 1, `Foundation dependency ${dependency.from}->${dependency.to} has incomplete evidence.`);
        continue;
      }
      const declaration = declarationForToken(tokenCss, evidence.token);
      if (!declaration) {
        add("errors", tokenCssFile, 1, `Foundation dependency evidence missing token declaration: ${evidence.token}.`);
        continue;
      }
      if (!declaration.includes(evidence.uses)) {
        add("errors", tokenCssFile, lineNumber(tokenCss, tokenCss.indexOf(evidence.token)), `Foundation dependency ${dependency.from}->${dependency.to} expects ${evidence.token} to use ${evidence.uses}.`);
      }
    }
  }
}

function assertDocsDoNotOwnFoundationTokens() {
  const declarationPattern = /--(?<layer>ref|sys)-(?<foundation>voice|frame|energy|state|momentum|depth|tone|a11y|symbol|iconography|growth)-[a-z0-9-]+(?=\s*:)/g;
  for (const file of docsStyleModuleFiles) {
    const source = read(file);
    let match;
    while ((match = declarationPattern.exec(source))) {
      const foundation = match.groups.foundation;
      const isEnergyThemeOverride = foundation === "energy" && path.basename(file) === "00-foundations-03.css" && match.groups.layer === "sys";
      const isDepthThemeOverride = foundation === "depth" && path.basename(file) === "00-foundations-03.css" && match.groups.layer === "sys";
      if (isEnergyThemeOverride || isDepthThemeOverride) continue;
      add("errors", file, lineNumber(source, match.index), `Docs must not own ${match[0]}; consume the token package or theme context.`);
    }
  }
}

function assertComponentAliasBridge(componentCss) {
  const aliasBlock = extractFirstRootBlock(componentCss);
  const requiredAliasMappings = [
    ["--component-font-size-label", "var(--sys-voice-label-md-size)"],
    ["--component-font-size-body", "var(--sys-voice-paragraph-sm-size)"],
    ["--component-font-size-title-sm", "var(--sys-voice-heading-sm-size)"],
  ];
  for (const [alias, value] of requiredAliasMappings) {
    if (!aliasBlock.includes(`${alias}: ${value}`)) {
      add("errors", componentCssFile, 1, `Component alias bridge must map ${alias} to ${value}.`);
    }
  }
}

function assertComponentImplementationConsumesCascade(componentCss) {
  const implementationCss = withoutFirstRootBlock(componentCss);
  const forbiddenDirectRefs = /var\(--ref-(?:voice|energy|frame)-[a-z0-9-]+\)/g;
  let match;
  while ((match = forbiddenDirectRefs.exec(implementationCss))) {
    add("errors", componentCssFile, lineNumber(componentCss, componentCss.indexOf(match[0], componentCss.indexOf("}") + 1)), `Component implementation must consume component/sys aliases, not direct ${match[0]}.`);
  }
}

function checkFoundationCascadeContracts() {
  const tokenCss = read(tokenCssFile);
  const componentCss = read(componentCssFile);
  assertTokenPackageOwnsFoundationTokens(tokenCss);
  assertFoundationDependencyMatrix(tokenCss);
  assertDocsDoNotOwnFoundationTokens();
  assertComponentAliasBridge(componentCss);
  assertComponentImplementationConsumesCascade(componentCss);

  const generatedTokenCss = path.join(docsAppDir, "generated/tokens.css");
  if (fs.existsSync(generatedTokenCss) && read(generatedTokenCss).includes("--ref-energy-blue-500") && !read(generatedTokenCss).includes("--sys-frame-padding-container")) {
    add("errors", generatedTokenCss, 1, "Generated token bridge must carry all active foundation cascades, not just Energy.");
  }
}

module.exports = { checkFoundationCascadeContracts };
