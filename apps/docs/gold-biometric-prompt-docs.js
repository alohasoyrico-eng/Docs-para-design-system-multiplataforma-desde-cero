import { renderSimpleGoldSection, simpleDemo } from "./gold-simple-component-docs.js?v=253";

export function renderBiometricPromptGoldSection(entry, section) { return renderSimpleGoldSection(entry, section, biometricPromptDemoFromData); }
export function biometricPromptDemo(label = "Biometric Prompt", state = "default") { return simpleDemo("biometric-prompt", { label, state }); }
export function biometricPromptDemoFromData(demo = {}) { return simpleDemo("biometric-prompt", demo); }
function biometricPromptOperationalExamplePanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "operational-example", biometricPromptDemoFromData); }
function biometricPromptAnatomyPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "anatomy", biometricPromptDemoFromData); }
function biometricPromptAccessibilityPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "accessibility", biometricPromptDemoFromData); }
function biometricPromptVariantsPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "variants", biometricPromptDemoFromData); }
function biometricPromptStatesPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "states", biometricPromptDemoFromData); }
function biometricPromptStateVariantMatrixPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "variant-state-behavior", biometricPromptDemoFromData); }
function biometricPromptFullWidthPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "full-width", biometricPromptDemoFromData); }
function biometricPromptResponsivePanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "responsive-layout-patterns", biometricPromptDemoFromData); }
function biometricPromptViewportOrganizationPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "viewport-organization", biometricPromptDemoFromData); }
function biometricPromptPlaygroundPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "playground", biometricPromptDemoFromData); }
function biometricPromptContractPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "api-foundations", biometricPromptDemoFromData); }
function biometricPromptGuidelinesPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "guidelines", biometricPromptDemoFromData); }
function biometricPromptTestPanel() { return renderSimpleGoldSection({ id: "biometric-prompt" }, "tests-rejection-rules", biometricPromptDemoFromData); }
