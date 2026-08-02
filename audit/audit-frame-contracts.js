const {
  fs,
  path,
  cssFile,
  docsAppDir,
  docsCssFile,
  docsShellControlsFile,
  docsStyleModuleFiles,
  read,
  readDocsCss,
  resolveBoundaryPath,
  add,
} = require("./audit-context.js");

const tokenCssFile = resolveBoundaryPath("#design-system/tokens-css", "packages/tokens/styles/tokens.css");

function lineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

function extractCssBlock(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const selectorMatch = new RegExp(`(^|\\n)${escaped}\\s*\\{`).exec(css);
  if (!selectorMatch) return "";
  const start = selectorMatch.index + selectorMatch[0].lastIndexOf(selector);
  const open = css.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < css.length; index += 1) {
    const char = css[index];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return css.slice(open + 1, index);
    }
  }
  return "";
}

function extractCssBlocks(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|\\n)${escaped}\\s*\\{`, "g");
  const blocks = [];
  let match;
  while ((match = pattern.exec(css))) {
    const start = match.index + match[0].lastIndexOf(selector);
    const open = css.indexOf("{", start);
    let depth = 0;
    for (let index = open; index < css.length; index += 1) {
      const char = css[index];
      if (char === "{") depth += 1;
      if (char === "}") {
        depth -= 1;
        if (depth === 0) {
          blocks.push(css.slice(open + 1, index));
          pattern.lastIndex = index + 1;
          break;
        }
      }
    }
  }
  return blocks.join("\n");
}

function requireCss(selector, rules) {
  const cssText = readDocsCss();
  const body = extractCssBlock(cssText, selector);
  if (!body) {
    add("errors", cssFile, 1, `Frame layout contract missing selector: ${selector}.`);
    return;
  }
  for (const [pattern, message] of rules) {
    if (!pattern.test(body)) add("errors", cssFile, 1, message);
  }
}

function checkFrameLayoutContract() {
  const cssText = readDocsCss();
  const tokenCss = read(tokenCssFile);
  const rootBlock = extractCssBlocks(cssText, ":root");
  const tokenRootBlock = extractCssBlocks(tokenCss, ":root");
  const runtimeRootBlock = `${tokenRootBlock}\n${rootBlock}`;

  for (const token of [
    "--ref-frame-space-1",
    "--ref-frame-space-4",
    "--ref-frame-space-8",
    "--ref-frame-radius-3",
    "--ref-frame-height-control-md",
    "--ref-frame-grid-sm-margin",
    "--ref-frame-grid-md-gutter",
    "--ref-frame-grid-lg-columns",
    "--density-control-height",
    "--density-card-padding",
    "--density-component-gap",
    "--sys-frame-padding-control",
    "--sys-frame-radius-control",
    "--sys-frame-height-control-md",
    "--sys-frame-grid-lg-margin",
    "--sys-frame-border-thin",
  ]) {
    if (!tokenRootBlock.includes(token)) add("errors", tokenCssFile, 1, `Frame token package missing token: ${token}.`);
  }

  for (const file of docsStyleModuleFiles) {
    const source = read(file);
    for (const match of source.matchAll(/--(?:ref|sys)-frame-[a-z0-9-]+(?=\s*:)/g)) {
      add("errors", file, lineNumber(source, match.index), `Docs must consume Frame tokens, not declare ${match[0]}.`);
    }
  }

  for (const token of [
    "--frame-grid-columns",
    "--frame-grid-gutter",
    "--frame-grid-margin",
    "--frame-page-x",
    "--density-control-height",
    "--density-panel-padding",
    "--density-card-padding",
    "--density-component-gap",
    "--density-section-gap",
    "--density-row-height",
  ]) {
    if (!runtimeRootBlock.includes(token)) add("errors", cssFile, 1, `Frame runtime token missing: ${token}.`);
  }
  if (!/--frame-page-x:\s*var\(--frame-grid-margin\);/.test(rootBlock)) {
    add("errors", cssFile, 1, "Frame page padding must resolve from the active grid margin.");
  }

  const densityContracts = [
    [/--sys-frame-padding-control:\s*var\(--density-control-padding-x\);/, "Frame control padding must resolve from Density."],
    [/--sys-frame-padding-container:\s*var\(--density-panel-padding\);/, "Frame container padding must resolve from Density."],
    [/--sys-frame-padding-surface:\s*var\(--density-surface-padding\);/, "Frame surface padding must resolve from Density."],
    [/--sys-frame-gap-component:\s*var\(--density-component-gap\);/, "Frame component gap must resolve from Density."],
    [/--sys-frame-gap-component-lg:\s*var\(--density-component-gap-lg\);/, "Frame large component gap must resolve from Density."],
    [/--sys-frame-gap-subsection:\s*var\(--density-subsection-gap\);/, "Frame subsection gap must resolve from Density."],
    [/--sys-frame-gap-section:\s*var\(--density-section-gap\);/, "Frame section gap must resolve from Density."],
    [/--sys-frame-gap-page:\s*var\(--density-page-gap\);/, "Frame page gap must resolve from Density."],
    [/--sys-frame-height-control-md:\s*var\(--density-control-height\);/, "Frame medium control height must resolve from Density."],
    [/--frame-section-y:\s*var\(--density-section-gap\);/, "Frame page rhythm must resolve from Density."],
  ];
  for (const [pattern, message] of densityContracts) {
    if (!pattern.test(runtimeRootBlock)) add("errors", tokenCssFile, 1, message);
  }

  for (const selector of ['[data-density="sm"]', '[data-density="md"]', '[data-density="lg"]', '[data-density-demo="sm"]', '[data-density-demo="md"]', '[data-density-demo="lg"]']) {
    if (!cssText.includes(selector)) add("errors", cssFile, 1, `Density context selector missing: ${selector}.`);
  }
  if (!/--button-default-font-size:\s*var\(--ref-voice-size-5\);/.test(cssText)) {
    add("errors", cssFile, 1, "Density sm must keep Button text readable; do not regress to smaller type.");
  }
  if (!/--density-row-height:\s*var\(--ref-frame-height-control-sm\);/.test(cssText)) {
    add("errors", cssFile, 1, "Density sm must preserve readable row and target rhythm.");
  }
  if (!/--density-control-height:\s*var\(--ref-frame-height-control-lg-comfortable\);/.test(cssText)) {
    add("errors", cssFile, 1, "Density lg must use a visibly comfortable control height.");
  }
  if (!/--button-default-font-size:\s*var\(--ref-voice-size-8\);/.test(cssText)) {
    add("errors", cssFile, 1, "Density lg must increase component text hierarchy visibly.");
  }
  if (/\.reference-doc\s*{[^}]*padding-inline:\s*var\(--ref-frame-space-4\);/s.test(cssText)) {
    add("errors", cssFile, 1, "Reference docs must not override Frame page x with raw spacing.");
  }
  if (/\.detail-layout\s*,[\s\S]*?padding-inline:\s*var\(--ref-frame-space-4\);/s.test(cssText)) {
    add("errors", cssFile, 1, "Detail layout mobile padding must stay tied to Frame page x.");
  }

  requireCss(".detail-layout", [
    [/inline-size:\s*min\(100%,\s*var\(--frame-page-shell\)\);/, "Detail layout must use the Frame page shell."],
    [/padding:\s*var\(--sys-frame-gap-subsection\)\s*var\(--frame-page-x\)\s*var\(--frame-section-y\);/, "Detail layout padding must use Frame page x."],
  ]);
  requireCss(".reference-doc", [
    [/inline-size:\s*min\(100%,\s*var\(--frame-page-shell\)\);/, "Reference docs must use the Frame page shell."],
    [/padding:\s*var\(--sys-frame-gap-subsection\)\s*var\(--frame-page-x\)\s*var\(--frame-section-y\);/, "Reference docs must use Frame page x."],
  ]);
  requireCss(".tab-panel", [
    [/min-inline-size:\s*0;/, "Tab panel must be shrinkable inside the Frame shell."],
    [/max-inline-size:\s*100%;/, "Tab panel must not exceed the Frame shell."],
  ]);
  requireCss(".doc-panel", [
    [/min-inline-size:\s*0;/, "Documentation panels must be shrinkable inside Frame."],
    [/max-inline-size:\s*100%;/, "Documentation panels must not exceed Frame."],
    [/overflow-wrap:\s*anywhere;/, "Documentation panels must protect Frame from long content overflow."],
  ]);

  const shellControlsText = fs.existsSync(docsShellControlsFile) ? read(docsShellControlsFile) : "";
  for (const token of ["--frame-grid-columns", "--frame-grid-gutter", "--frame-grid-margin"]) {
    if (!shellControlsText.includes(token)) add("errors", docsShellControlsFile, 1, `Grid overlay must read Frame token: ${token}.`);
  }
}

module.exports = { checkFrameLayoutContract };
