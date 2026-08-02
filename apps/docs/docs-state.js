let configureIconSystem = () => {};
let slug = (value) => String(value ?? "");

export let foundations = [];
export let primitives = [];
export let components = [];
export let patterns = [];
export let templates = [];
export let stack = [];
export let collections = {
  foundations,
  primitives,
  components,
  patterns,
  templates,
};
export let collectionMeta = {};
export let collectionIcons = {};
export let systemSpec = null;
export let componentDocs = null;
export let componentCopy = null;
export let patternCopy = {};
export let componentImplementationStatus = {};
export let foundationCopy = {};
export let primitiveCopy = {};
export let referenceCopy = {};
export let templateBlueprints = {};
export let templateBlueprintFallbacks = {};
export let homeContent = {};
export let uiCopy = {};
export let currentLocale = "en";
let rawDocsContent = {};

export function configureDocsState(nextDeps) {
  configureIconSystem = nextDeps.configureIconSystem;
  slug = nextDeps.slug;
}

export function applyDocsContent(content) {
  rawDocsContent = content;
  uiCopy = content.uiCopy ?? { defaultLocale: "en", locales: { en: {} } };
  const storedLocale = localStorage.getItem("system.locale");
  currentLocale = uiCopy.locales?.[storedLocale] ? storedLocale : uiCopy.defaultLocale ?? "en";
  applyLocalizedDocsContent();
}

export function setCurrentLocale(nextLocale) {
  currentLocale = nextLocale;
  localStorage.setItem("system.locale", currentLocale);
  applyLocalizedDocsContent();
}

export function ui(key) {
  return uiCopy?.locales?.[currentLocale]?.[key] ?? uiCopy?.locales?.en?.[key] ?? key;
}

export function componentAgentSpec(entry, layerName = "Component") {
  const contract = artifactContract(entry);
  return contract
    ? {
        source: "packages/specs/specs/unison.system.json",
        name: entry.id,
        layer: contract.layer,
        platform: contract.platform,
        audiences: contract.audiences ?? [],
        purpose: contract.purpose,
        governingFoundations: contract.governingFoundations ?? Object.keys(contract.foundations ?? {}),
        primitiveDependencies: contract.primitiveDependencies ?? [],
        componentDependencies: contract.componentDependencies ?? [],
        patternDependencies: contract.patternDependencies ?? [],
        tokenDependencies: contract.tokenDependencies ?? [],
        props: contract.props ?? [],
        states: contract.states ?? [],
        agentInstructions: contract.agentInstructions ?? [],
        rejectIf: contract.rejectIf ?? [],
      }
    : {
        name: entry.id,
        layer: layerName,
        summary: entry.summary,
        must: referenceCopy.agentFallback?.must ?? [],
        reject_if: referenceCopy.agentFallback?.rejectIf ?? [],
      };
}

export function artifactContract(entry) {
  if (!systemSpec?.artifacts) return null;
  if (entry.type === "foundation") return systemSpec.artifacts.foundations?.[entry.id] ?? null;
  if (entry.type === "primitive") return systemSpec.artifacts.primitives?.[entry.id] ?? null;
  if (entry.type === "component") return systemSpec.artifacts.components?.[entry.id] ?? null;
  if (entry.type === "pattern") return systemSpec.artifacts.patterns?.[entry.id] ?? null;
  if (entry.type === "template") return systemSpec.artifacts.templates?.[entry.id] ?? null;
  return null;
}

export function findAny(title) {
  return Object.values(collections)
    .flat()
    .find((entry) => entry.title === title || slug(entry.title) === slug(title));
}

export function findComponent(title) {
  return components.find((entry) => entry.title === title || slug(entry.title) === slug(title));
}

export function findPattern(title) {
  return patterns.find((entry) => entry.title === title || slug(entry.title) === slug(title));
}

export function searchIndex() {
  return Object.entries(collections).flatMap(([collection, values]) =>
    values.map((entry) => ({
      ...entry,
      collection,
    })),
  );
}

function applyCatalog(catalog) {
  foundations = catalog.foundations ?? [];
  primitives = catalog.primitives ?? [];
  components = catalog.components ?? [];
  patterns = catalog.patterns ?? [];
  templates = catalog.templates ?? [];
  stack = catalog.stack ?? [];
  collections = { foundations, primitives, components, patterns, templates };
  collectionMeta = catalog.collectionMeta ?? {};
  collectionIcons = catalog.collectionIcons ?? {};
  configureIconSystem({ collectionIcons });
}

function applyLocalizedDocsContent() {
  applyCatalog(localizedContent(rawDocsContent.catalog ?? {}));
  systemSpec = rawDocsContent.systemSpec;
  componentDocs = localizedContent(rawDocsContent.componentDocs);
  componentCopy = localizedContent(rawDocsContent.componentCopy);
  patternCopy = localizedContent(rawDocsContent.patternCopy ?? {});
  componentImplementationStatus = localizedContent(rawDocsContent.componentImplementationStatus ?? {});
  foundationCopy = localizedContent(rawDocsContent.foundationCopy ?? {});
  primitiveCopy = localizedContent(rawDocsContent.primitiveCopy ?? {});
  referenceCopy = localizedContent(rawDocsContent.referenceCopy ?? {});
  templateBlueprints = localizedContent(rawDocsContent.templateBlueprints ?? {});
  templateBlueprintFallbacks = localizedContent(rawDocsContent.templateBlueprintFallbacks ?? {});
  homeContent = localizedContent(rawDocsContent.homeContent ?? {});
}

function localizedContent(content) {
  return applyLocaleOverlay(content, currentLocale);
}

function applyLocaleOverlay(value, locale) {
  if (Array.isArray(value)) return value.map((item) => applyLocaleOverlay(item, locale));
  if (!value || typeof value !== "object") return value;
  const { locales, ...base } = value;
  const resolvedBase = Object.fromEntries(Object.entries(base).map(([key, item]) => [key, applyLocaleOverlay(item, locale)]));
  const overlay = locales?.[locale];
  return overlay ? mergeLocalized(resolvedBase, applyLocaleOverlay(overlay, locale)) : resolvedBase;
}

function mergeLocalized(target, source) {
  if (Array.isArray(target) || Array.isArray(source)) return source;
  if (!target || typeof target !== "object") return source;
  if (!source || typeof source !== "object") return source;
  return Object.entries(source).reduce((next, [key, value]) => {
    next[key] = key in next ? mergeLocalized(next[key], value) : value;
    return next;
  }, { ...target });
}
