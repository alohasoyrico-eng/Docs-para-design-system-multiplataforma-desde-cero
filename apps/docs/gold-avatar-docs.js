import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderAvatarGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, avatarDemoFromData); }
export function avatarDemo(name = "Ana Sosa", density = "md", status = "online", state = "default") { return simpleDemo("avatar", { name, density, status, state }); }
export function avatarDemoFromData(demo = {}) { return simpleDemo("avatar", demo); }
function avatarOperationalExamplePanel() { return renderSimpleGoldSection({ id: "avatar" }, "operational-example", avatarDemoFromData); }
function avatarAnatomyPanel() { return renderSimpleGoldSection({ id: "avatar" }, "anatomy", avatarDemoFromData); }
function avatarAccessibilityPanel() { return renderSimpleGoldSection({ id: "avatar" }, "accessibility", avatarDemoFromData); }
function avatarVariantsPanel() { return renderSimpleGoldSection({ id: "avatar" }, "variants", avatarDemoFromData); }
function avatarStatesPanel() { return renderSimpleGoldSection({ id: "avatar" }, "states", avatarDemoFromData); }
function avatarStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "avatar" }, "variant-state-behavior", avatarDemoFromData); }
function avatarFullWidthPanel() { return renderSimpleGoldSection({ id: "avatar" }, "full-width", avatarDemoFromData); }
function avatarResponsivePanel() { return renderSimpleGoldSection({ id: "avatar" }, "responsive-layout-patterns", avatarDemoFromData); }
function avatarViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "avatar" }, "viewport-organization", avatarDemoFromData); }
function avatarPlaygroundPanel() { return renderSimpleGoldSection({ id: "avatar" }, "playground", avatarDemoFromData); }
function avatarGuidelinesPanel() { return renderSimpleGoldSection({ id: "avatar" }, "guidelines", avatarDemoFromData); }
function avatarContractPanel() { return renderSimpleGoldSection({ id: "avatar" }, "api-foundations", avatarDemoFromData); }
function avatarTestPanel() { return renderSimpleGoldSection({ id: "avatar" }, "tests-rejection-rules", avatarDemoFromData); }
