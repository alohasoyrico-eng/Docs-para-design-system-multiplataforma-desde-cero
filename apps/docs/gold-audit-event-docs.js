import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderAuditEventGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, auditEventDemoFromData); }
export function auditEventDemo(label = "Audit Event", state = "default") { return simpleDemo("audit-event", { label, state }); }
export function auditEventDemoFromData(demo = {}) { return simpleDemo("audit-event", demo); }
function auditEventOperationalExamplePanel() { return renderSimpleGoldSection({ id: "audit-event" }, "operational-example", auditEventDemoFromData); }
function auditEventAnatomyPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "anatomy", auditEventDemoFromData); }
function auditEventAccessibilityPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "accessibility", auditEventDemoFromData); }
function auditEventVariantsPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "variants", auditEventDemoFromData); }
function auditEventStatesPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "states", auditEventDemoFromData); }
function auditEventStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "variant-state-behavior", auditEventDemoFromData); }
function auditEventFullWidthPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "full-width", auditEventDemoFromData); }
function auditEventResponsivePanel() { return renderSimpleGoldSection({ id: "audit-event" }, "responsive-layout-patterns", auditEventDemoFromData); }
function auditEventViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "viewport-organization", auditEventDemoFromData); }
function auditEventPlaygroundPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "playground", auditEventDemoFromData); }
function auditEventContractPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "api-foundations", auditEventDemoFromData); }
function auditEventGuidelinesPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "guidelines", auditEventDemoFromData); }
function auditEventTestPanel() { return renderSimpleGoldSection({ id: "audit-event" }, "tests-rejection-rules", auditEventDemoFromData); }
