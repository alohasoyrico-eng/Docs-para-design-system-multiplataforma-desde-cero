const {
  fs,
  path,
  docsAppDir,
  docsAppFile,
  docsCssFile,
  docsShellControlsFile,
  docsStyleModulePaths,
  docsStyleModuleFiles,
  files,
  specFile,
  foundationCopyFile,
  cssFile,
  read,
  readDocsCss,
  readJson,
  resolveBoundaryPath,
  add,
  eachMatch,
} = require("./audit-context.js");

const tokenCssFile = resolveBoundaryPath("#design-system/tokens-css", "packages/tokens/styles/tokens.css");

function isAllowedTokenDeclaration(line) {
  return /^\s*--(?:ref|sys|comp)-[a-z0-9-]+:\s*/.test(line);
}

function checkStaticHygiene() {
  for (const file of files) {
    const basename = path.basename(file);
    const isAuditScript = file.includes("packages/audit/scripts/");
    const isImplementationStatusInventory = basename === "component-implementation-status.json";
    if (basename === "unison.system.json") continue;
    const text = read(file);
    const lines = text.split("\n");

    eachMatch(file, /\sstyle=/g, (_match, _text, line) => {
      add("errors", file, line, "Inline style attributes are not allowed.");
    });

    eachMatch(file, /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, (_match, _text, line) => {
      add("errors", file, line, "Emoji-like glyphs are not allowed as iconography.");
    });

    lines.forEach((lineText, index) => {
      const line = index + 1;
      if (/\b(?:eds|f[l]ow)-|\.eds-|\.f[l]ow-|--eds-|--f[l]ow-/.test(lineText) && !isAuditScript && !isImplementationStatusInventory) {
        add("errors", file, line, "Inherited prefixed naming is not allowed.");
      }

      if (basename.endsWith(".css")) {
        if (/#[0-9a-fA-F]{3,8}\b/.test(lineText) && !isAllowedTokenDeclaration(lineText)) {
          add("errors", file, line, "Hex colors are only allowed in token declarations.");
        }

        if (/\b\d+(?:\.\d+)?px\b/.test(lineText) && !isAllowedTokenDeclaration(lineText) && !/@media/.test(lineText)) {
          add("errors", file, line, "Raw px values are only allowed in token declarations.");
        }

        if (/box-shadow:\s*var\(--[a-z0-9-]*focus-ring\)/.test(lineText)) {
          add("errors", file, line, "Focus ring tokens are outline values; use outline and outline-offset instead of box-shadow.");
        }

        if (/--[a-z0-9-]*focus-shadow:\s*var\(--sys-(?:state|a11y)-focus-ring\)/.test(lineText)) {
          add("errors", file, line, "Focus shadow aliases must not point to outline focus-ring tokens.");
        }
      }
    });
  }

  checkMissingFoundationTokenReferences();
  const cssText = readFullDocsCss();
  const detailSummaryRule = cssText.match(/\.detail-summary\s*{(?<body>[^}]+)}/)?.groups?.body ?? "";
  if (!/font-size:\s*var\(--sys-voice-paragraph-lg-size\);/.test(detailSummaryRule)) {
    add("errors", cssFile, 1, "Detail summary must use the Voice paragraph-lg semantic size.");
  }
  if (!/line-height:\s*var\(--sys-voice-paragraph-lg-line-height\);/.test(detailSummaryRule)) {
    add("errors", cssFile, 1, "Detail summary must use the Voice paragraph-lg semantic line-height.");
  }
  if (/font-size:\s*clamp\(/.test(detailSummaryRule) || /font-size:\s*var\(--ref-voice-/.test(detailSummaryRule)) {
    add("errors", cssFile, 1, "Detail summary must not define local responsive typography outside Voice.");
  }
  const requiredVoiceRules = [
    "--ref-voice-weight-black: 900;",
    "--sys-voice-display-lg-weight: var(--ref-voice-weight-black);",
    "--sys-voice-display-md-weight: var(--ref-voice-weight-black);",
    "--sys-voice-display-sm-weight: var(--ref-voice-weight-black);",
    "--sys-voice-heading-lg-weight: var(--ref-voice-weight-black);",
    "--sys-voice-heading-md-weight: var(--ref-voice-weight-black);",
    "--sys-voice-heading-sm-weight: var(--ref-voice-weight-black);",
    "--sys-voice-numeral-family: var(--ref-voice-family-brand);",
    "--sys-voice-numeral-weight: var(--ref-voice-weight-black);",
  ];
  for (const rule of requiredVoiceRules) {
    if (!cssText.includes(rule)) add("errors", cssFile, 1, `Voice Black/numeral contract missing: ${rule}`);
  }
  if (!/h1,\s*h2,\s*h3\s*{[^}]*font-weight:\s*var\(--sys-voice-weight-black\);/s.test(cssText)) {
    add("errors", cssFile, 1, "Titles h1-h3 must use Edenred Black through Voice.");
  }

  const appText = read(docsAppFile);
  const specText = JSON.stringify(readJson(specFile) ?? {});
  const foundationCopyText = JSON.stringify(readJson(foundationCopyFile) ?? {});
  for (const required of ["Filled Status Contrast", "yellow-400", "red-500", "green-500", "blue-500", "filledStatusContrast"]) {
    if (!appText.includes(required) && !specText.includes(required) && !foundationCopyText.includes(required)) {
      add("errors", specFile, 1, `Energy filled status contrast decision missing: ${required}.`);
    }
  }
}

function checkMissingFoundationTokenReferences() {
  const cssFiles = [
    tokenCssFile,
    docsCssFile,
    path.join(docsAppDir, "generated/tokens.css"),
    ...docsStyleModuleFiles,
  ].filter((file) => fs.existsSync(file));
  const defined = new Map();
  const used = new Map();
  for (const file of cssFiles) {
    const text = read(file);
    for (const match of text.matchAll(/--([a-zA-Z0-9_-]+)\s*:/g)) {
      const token = `--${match[1]}`;
      if (!defined.has(token)) defined.set(token, new Set());
      defined.get(token).add(file);
    }
    for (const match of text.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)) {
      const token = match[1];
      if (!used.has(token)) used.set(token, new Set());
      used.get(token).add(file);
    }
  }
  for (const token of [...used.keys()].sort()) {
    if (!/^--(?:ref|sys|comp)-/.test(token)) continue;
    if (defined.has(token)) continue;
    const files = [...used.get(token)].map((file) => path.relative(process.cwd(), file)).join(", ");
    add("errors", cssFile, 1, `CSS token reference is not defined in docs foundations/components: ${token} used in ${files}.`);
  }
}

function readFullDocsCss() {
  return [
    tokenCssFile,
    path.join(docsAppDir, "generated/tokens.css"),
    readDocsCss(),
  ]
    .filter(Boolean)
    .map((entry) => (typeof entry === "string" && fs.existsSync(entry) ? read(entry) : entry))
    .join("\n");
}

function checkDocsModuleBoundaries() {
  const maxDocsModuleLines = 400;
  const docsModules = fs.readdirSync(docsAppDir)
    .filter((file) => file.endsWith(".js"))
    .map((file) => path.join(docsAppDir, file));
  for (const file of docsModules) {
    const lines = read(file).split("\n").length;
    if (lines > maxDocsModuleLines) {
      add("errors", file, 1, `Docs module has ${lines} lines; split it below ${maxDocsModuleLines} lines before scaling documentation.`);
    }
  }
}

function checkCssBalance() {
  const cssFile = docsCssFile;
  const css = readDocsCss();
  const cssIndex = read(cssFile);
  const imports = [...cssIndex.matchAll(/@import\s+"\.\/styles\/([^"?]+)(?:\?[^"]+)?";/g)].map((match) => `apps/docs/styles/${match[1]}`);
  for (const modulePath of docsStyleModulePaths) {
    if (!imports.includes(modulePath)) {
      add("errors", cssFile, 1, `CSS index must import style module: ${modulePath}.`);
    }
  }
  const nonImportLines = cssIndex
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("@import"));
  if (nonImportLines.length > 0) {
    add("errors", cssFile, 1, "styles.css must remain an import index; put rules in apps/docs/styles modules.");
  }
  for (const moduleFile of docsStyleModuleFiles) {
    if (!fs.existsSync(moduleFile)) continue;
    const lineCount = read(moduleFile).split("\n").length;
    if (lineCount > 400) {
      add("errors", moduleFile, 1, `Style module is too large (${lineCount} lines). Split it before it becomes a new monolith.`);
    }
  }
  let braces = 0;
  let parens = 0;
  for (const ch of css) {
    if (ch === "{") braces += 1;
    if (ch === "}") braces -= 1;
    if (ch === "(") parens += 1;
    if (ch === ")") parens -= 1;
  }
  if (braces !== 0 || parens !== 0) {
    add("errors", cssFile, 1, `CSS is unbalanced: braces=${braces}, parens=${parens}.`);
  }
}

function extractCssBlock(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const selectorMatch = new RegExp(`(^|\\n)${escaped}\\s*\\{`).exec(css);
  if (!selectorMatch) return "";
  const start = selectorMatch.index + selectorMatch[0].lastIndexOf(selector);
  const open = css.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < css.length; index += 1) {
    if (css[index] === "{") depth += 1;
    if (css[index] === "}") {
      depth -= 1;
      if (depth === 0) return css.slice(open + 1, index);
    }
  }
  return "";
}

function extractCssBlocks(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = [...css.matchAll(new RegExp(`(^|\\n)${escaped}\\s*\\{`, "g"))];
  return matches.map((match) => {
    const start = match.index + match[0].lastIndexOf(selector);
    const open = css.indexOf("{", start);
    let depth = 0;
    for (let index = open; index < css.length; index += 1) {
      if (css[index] === "{") depth += 1;
      if (css[index] === "}") {
        depth -= 1;
        if (depth === 0) return css.slice(open + 1, index);
      }
    }
    return "";
  }).join("\n");
}

function collectTokenDeclarations(css, { rootOnly = false, componentOnly = false } = {}) {
  const source = rootOnly ? extractCssBlocks(css, ":root") : css;
  const tokens = {};
  const pattern = componentOnly ? /(--comp-[a-z0-9-]+):\s*([^;]+);/g : /(--(?:ref|sys|comp)-[a-z0-9-]+):\s*([^;]+);/g;
  for (const match of source.matchAll(pattern)) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
}

function normalizeHex(value) {
  const hex = value.trim().toLowerCase();
  if (hex === "#fff") return "#ffffff";
  if (hex === "#000") return "#000000";
  if (/^#[0-9a-f]{3}$/.test(hex)) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  if (/^#[0-9a-f]{6}$/.test(hex)) return hex;
  return null;
}

function resolveCssColor(value, tokens, seen = new Set()) {
  const direct = normalizeHex(value);
  if (direct) return direct;
  const varName = value.match(/^var\((--[a-z0-9-]+)\)$/)?.[1];
  if (!varName || seen.has(varName) || !tokens[varName]) return null;
  seen.add(varName);
  return resolveCssColor(tokens[varName], tokens, seen);
}

function relativeLuminance(hex) {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map((channel) => parseInt(channel, 16) / 255)
    .map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground, background) {
  const light = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const dark = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (light + 0.05) / (dark + 0.05);
}

function assertButtonContrast(css, bgToken, textToken, label, minimum = 4.5) {
  const tokens = { ...collectTokenDeclarations(css, { rootOnly: true }), ...collectTokenDeclarations(css, { componentOnly: true }) };
  const background = resolveCssColor(`var(${bgToken})`, tokens);
  const foreground = resolveCssColor(`var(${textToken})`, tokens);
  if (!background || !foreground) {
    add("warnings", cssFile, 1, `Button contrast audit skipped ${label}; unresolved token.`);
    return;
  }
  const ratio = contrastRatio(foreground, background);
  if (ratio < minimum) {
    add("errors", cssFile, 1, `${label} contrast is ${ratio.toFixed(2)}:1; WCAG AA requires ${minimum}:1 for Button text.`);
  }
}

module.exports = {
  assertButtonContrast,
  checkStaticHygiene,
  checkDocsModuleBoundaries,
  checkCssBalance,
};
