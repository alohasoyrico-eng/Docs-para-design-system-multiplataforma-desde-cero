const { fs, path, docsAppDir, docsCssFile, resolveBoundaryPath, read, readDocsCss, add } = require("./audit-context.js");

function checkDocsComponentCssOwnership() {
  const cssIndex = read(docsCssFile);
  const removedDemoFiles = [
    path.join(docsAppDir, "gold-final-keep-component-demos.js"),
    path.join(docsAppDir, "styles/05q-final-keep-components-docs.css"),
  ];
  for (const file of removedDemoFiles) {
    if (fs.existsSync(file)) {
      add("errors", file, 1, "Removed docs-owned component demo implementation must not exist; render package components through component-demo.js and the package registry.");
    }
  }
  if (/05q-final-keep-components-docs\.css/.test(cssIndex)) {
    add("errors", docsCssFile, 1, "Removed docs-owned component CSS import must not return; component anatomy belongs to packages/components.");
  }

  const cssText = readDocsCss();
  const removedSelectors = [".biometric-prompt-demo", ".breadcrumbs-demo", ".pagination-demo", ".audit-event-demo", ".error-panel-demo", ".tree-view-demo", ".motion-boundary-demo", ".animated-moment-demo", ".progress-indicator-demo"];
  for (const selector of removedSelectors) {
    if (cssText.includes(selector)) add("errors", docsCssFile, 1, `Docs CSS must not own package component selector ${selector}.`);
  }

  const docsInputCss = path.join(docsAppDir, "styles/04c-input-docs.css");
  if (fs.existsSync(docsInputCss) && /--comp-input-/.test(read(docsInputCss))) {
    add("errors", docsInputCss, 1, "Input docs CSS must not declare component anatomy tokens; Input anatomy belongs to packages/components.");
  }

  for (const file of walkFiles(path.join(docsAppDir, "styles"), (candidate) => /\.css$/.test(candidate))) {
    const text = read(file);
    const broadButtonSelector = /(^|})\s*\.button(?::not\(\.docs-package-demo\)|[\s.#:[,{>+~])/gm;
    let match;
    while ((match = broadButtonSelector.exec(text))) {
      add("errors", file, lineForIndex(text, match.index + match[1].length), "Docs CSS must not style .button directly; Button anatomy belongs to packages/components and docs may only compose package Button demos.");
    }
    const buttonAnatomyToken = /--comp-button-[a-z0-9-]+/g;
    while ((match = buttonAnatomyToken.exec(text))) {
      add("errors", file, lineForIndex(text, match.index), "Docs CSS must not declare Button component anatomy tokens; Button anatomy belongs to packages/components.");
    }
  }

  for (const file of walkFiles(docsAppDir, (candidate) => /\.css$/.test(candidate))) {
    const text = read(file);
    const customSpinnerIndex = text.search(/(?:__spinner|@keyframes\s+[a-z0-9-]*spin|border-block-start-color:\s*transparent)/i);
    if (customSpinnerIndex >= 0) {
      add("errors", file, lineForIndex(text, customSpinnerIndex), "Docs must not define custom loading spinner anatomy; use the package Spinner component.");
    }
  }
}

function walkFiles(dir, matcher, output = []) {
  if (!fs.existsSync(dir)) return output;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "generated" || entry.name === "node_modules") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, matcher, output);
      continue;
    }
    if (matcher(fullPath)) output.push(fullPath);
  }
  return output;
}

function lineForIndex(text, index) {
  return text.slice(0, index).split("\n").length;
}

function checkPublicClassNamespaceOwnership() {
  const sourceFiles = [
    ...walkFiles(docsAppDir, (file) => /\.(css|html|js)$/.test(file)),
    ...walkFiles(path.dirname(resolveBoundaryPath("#design-system/components", "packages/components/src/index.js")), (file) => /\.js$/.test(file)),
    ...walkFiles(path.dirname(resolveBoundaryPath("#design-system/components-css", "packages/components/styles/components.css")), (file) => /\.css$/.test(file)),
  ];
  const checks = [
    {
      pattern: /(^|[,{]\s*)\.system-[a-z0-9_-]+/gim,
      message: "Public CSS classes must not use the system- prefix; reserve Design System naming for packages and token namespaces.",
    },
    {
      pattern: /class(?:Name)?\s*[:=]\s*["'`][^"'`]*\bf[l]ow-[a-z0-9_-]+/gim,
      message: `Public markup classes must not use the ${"fl" + "ow-"} prefix; use the component or primitive class name instead.`,
    },
    {
      pattern: /classList\.(?:add|remove|toggle)\(\s*["'`]system-[a-z0-9_-]+/gim,
      message: "Runtime class mutations must not use the system- prefix; use the component or primitive class name instead.",
    },
  ];
  for (const file of sourceFiles) {
    const text = read(file);
    for (const check of checks) {
      check.pattern.lastIndex = 0;
      let match;
      while ((match = check.pattern.exec(text))) {
        add("errors", file, lineForIndex(text, match.index), check.message);
      }
    }
  }
}

function checkDocsPackageImportBoundary() {
  const docsJsFiles = walkFiles(docsAppDir, (file) => /\.js$/.test(file));
  const forbiddenComponentImport = /from\s+["'](?:\.\.\/)+packages\/components\/src\//;
  const forbiddenContentSource = /(?:\.\.\/)+packages\/system-(?:content|specs)\//;
  for (const file of docsJsFiles) {
    const text = read(file);
    const match = forbiddenComponentImport.exec(text);
    if (match) {
      add("errors", file, lineForIndex(text, match.index), "Docs must consume Package components through #design-system/components, not package source paths.");
    }
    const contentMatch = forbiddenContentSource.exec(text);
    if (contentMatch) {
      add("errors", file, lineForIndex(text, contentMatch.index), "Docs runtime must consume generated content bundles, not Design System content/spec source paths.");
    }
  }

  const indexFile = path.join(docsAppDir, "index.html");
  const indexText = read(indexFile);
  if (!indexText.includes('"#design-system/components"')) {
    add("errors", indexFile, 1, "Docs must declare a #design-system/components import map entry while running in the monorepo browser.");
  }
  if (indexText.includes("../../packages/")) {
    add("errors", indexFile, 1, "Docs browser import maps must target generated assets, not package source paths.");
  }
  if (!indexText.includes("./generated/components/index.js")) {
    add("errors", indexFile, 1, "Docs browser import map must target the generated Package component JS bridge.");
  }

  const docsCss = read(docsCssFile);
  if (docsCss.includes("../../packages/components/styles/")) {
    add("errors", docsCssFile, 1, "Docs CSS must consume the generated Package component CSS asset, not package source paths.");
  }
  if (docsCss.includes("./generated/package-components.css") || docsCss.includes("./generated/system-tokens.css")) {
    add("errors", docsCssFile, 1, "Docs CSS generated asset imports must use generic names, not prefixed file names.");
  }
  if (!docsCss.includes("./generated/components.css")) {
    add("errors", docsCssFile, 1, "Docs CSS must import the generated Package component CSS asset.");
  }

  const componentCssFile = resolveBoundaryPath("#design-system/components-css", "packages/components/styles/components.css");
  const tokenCssFile = resolveBoundaryPath("#design-system/tokens-css", "packages/tokens/styles/tokens.css");
  const componentModuleDir = path.dirname(resolveBoundaryPath("#design-system/components", "packages/components/src/index.js"));
  const generatedComponentModuleDir = path.join(docsAppDir, "generated/components");
  const generatedCssFile = path.join(docsAppDir, "generated/components.css");
  const generatedTokenCssFile = path.join(docsAppDir, "generated/tokens.css");
  if (!fs.existsSync(path.join(generatedComponentModuleDir, "index.js"))) {
    add("errors", generatedComponentModuleDir, 1, "Generated Package component JS bridge is missing; run npm run build:docs-assets.");
    return;
  }
  if (!fs.existsSync(generatedCssFile)) {
    add("errors", generatedCssFile, 1, "Generated Package component CSS asset is missing; run npm run build:docs-assets.");
    return;
  }
  if (!fs.existsSync(generatedTokenCssFile)) {
    add("errors", generatedTokenCssFile, 1, "Generated Design System token CSS asset is missing; run npm run build:docs-assets.");
    return;
  }
  const stripHeader = (text) => text.replace(/^\/\* Generated by scripts\/build-docs-assets\.mjs\.\n\s+Source: [^\n]+\n\s+Do not edit this file by hand\. \*\/\n/, "");
  const generatedCss = stripHeader(read(generatedCssFile));
  const componentCss = read(componentCssFile).replace(
    /@import "\.\.\/\.\.\/tokens\/styles\/tokens\.css\?v=\d+";/,
    '@import "./tokens.css?v=1";'
  );
  if (generatedCss !== componentCss) {
    add("errors", generatedCssFile, 1, "Generated Package component CSS asset is stale; run npm run build:docs-assets.");
  }
  if (stripHeader(read(generatedTokenCssFile)) !== read(tokenCssFile)) {
    add("errors", generatedTokenCssFile, 1, "Generated Design System token CSS asset is stale; run npm run build:docs-assets.");
  }

  for (const sourceFile of walkFiles(componentModuleDir, (file) => /\.js$/.test(file))) {
    const relativeFile = path.relative(componentModuleDir, sourceFile);
    const generatedFile = path.join(generatedComponentModuleDir, relativeFile);
    if (!fs.existsSync(generatedFile) || read(generatedFile) !== read(sourceFile)) {
      add("errors", generatedComponentModuleDir, 1, "Generated Package component JS bridge is stale; run npm run build:docs-assets.");
      break;
    }
  }
}

module.exports = { checkDocsComponentCssOwnership, checkPublicClassNamespaceOwnership, checkDocsPackageImportBoundary };
