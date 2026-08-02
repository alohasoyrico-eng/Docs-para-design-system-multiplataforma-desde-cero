import { componentDocs, familyComponentTabs, goldComponentDocumentationTabs, configureDetailTabsContext } from "./detail-tabs-core.js?v=3";
import { foundationTabs } from "./foundation-tabs.js?v=2";
import { primitiveTabs } from "./primitive-tabs.js?v=2";
import { patternTabs } from "./pattern-tabs.js?v=53";
import { templateTabs } from "./template-tabs.js?v=14";

export { accessibilityPanel, agentPanel, guidelinesPanel, listPanel, specPanel, threeTabs } from "./detail-tabs-core.js?v=3";

export function configureDetailTabs(nextDeps) {
  configureDetailTabsContext(nextDeps);
}

export function detailTabs(collection, entry) {
  if (collection === "foundations") return foundationTabs(entry);
  if (collection === "primitives") return primitiveTabs(entry);
  if (collection === "components") return componentTabs(entry);
  if (collection === "patterns") return patternTabs(entry);
  return templateTabs(entry);
}

function componentTabs(entry) {
  if (componentDocs?.components?.[entry.id]) return goldComponentDocumentationTabs(entry);
  return familyComponentTabs(entry);
}
