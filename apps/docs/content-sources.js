import { loadContentBundle } from "./content-loader.js?v=195";

export async function loadDocsContent() {
  return normalizeDocsContent(await loadContentBundle("./generated/docs-content.bundle.json"));
}

function normalizeDocsContent(content) {
  return {
    catalog: content.catalog ?? {},
    systemSpec: content.systemSpec ?? null,
    componentDocs: content.componentDocs ?? null,
    componentCopy: content.componentCopy ?? null,
    patternCopy: content.patternCopy ?? {},
    componentImplementationStatus: content.componentImplementationStatus ?? {},
    foundationCopy: content.foundationCopy ?? {},
    primitiveCopy: content.primitiveCopy ?? {},
    referenceCopy: content.referenceCopy ?? {},
    templateBlueprints: content.templateBlueprintContent?.templates ?? {},
    templateBlueprintFallbacks: content.templateBlueprintContent?.fallbacks ?? {},
    homeContent: content.homeContent ?? {},
    uiCopy: content.uiCopy ?? { defaultLocale: "en", locales: { en: {} } },
  };
}
