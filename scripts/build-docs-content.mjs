import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const outputFile = path.join(root, "apps/docs/generated/docs-content.bundle.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
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

function resolveJsonShards(file) {
  const content = readJson(file);
  if (!Array.isArray(content?.$systemShards)) return content;
  const baseDir = path.dirname(file);
  return content.$systemShards
    .map((shardPath) => resolveJsonShards(path.join(baseDir, shardPath)))
    .reduce((merged, shard) => mergeJson(merged, shard), {});
}

function resolvePackageJson(specifier) {
  return fileURLToPath(import.meta.resolve(specifier));
}

const content = {
  catalog: resolveJsonShards(resolvePackageJson("#design-system/content/catalog")),
  systemSpec: resolveJsonShards(resolvePackageJson("#design-system/specs/system")),
  componentDocs: resolveJsonShards(resolvePackageJson("#design-system/content/component-docs")),
  componentCopy: resolveJsonShards(resolvePackageJson("#design-system/content/component-copy")),
  patternCopy: resolveJsonShards(resolvePackageJson("#design-system/content/pattern-copy")),
  componentImplementationStatus: resolveJsonShards(resolvePackageJson("#design-system/content/component-implementation-status")),
  foundationCopy: resolveJsonShards(resolvePackageJson("#design-system/content/foundation-copy")),
  primitiveCopy: resolveJsonShards(resolvePackageJson("#design-system/content/primitive-copy")),
  referenceCopy: resolveJsonShards(resolvePackageJson("#design-system/content/reference-copy")),
  templateBlueprintContent: resolveJsonShards(resolvePackageJson("#design-system/content/template-blueprints")),
  homeContent: resolveJsonShards(resolvePackageJson("#design-system/content/home")),
  uiCopy: resolveJsonShards(resolvePackageJson("#design-system/content/i18n-ui")),
};

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(content, null, 2)}\n`);
console.log(`Built docs content bundle: ${path.relative(root, outputFile)}`);
