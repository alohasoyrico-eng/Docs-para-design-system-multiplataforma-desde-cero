import { createButton } from "./actions.js?v=2";

export function createBiometricPrompt({
  label,
  description = "",
  variant = "fingerprint",
  state = "default",
  actionLabel = "Use biometrics",
  fallback = "Use passcode instead",
  icon = "",
  density = "md",
  fullWidth = false,
} = {}) {
  const resolvedVariant = ["fingerprint", "face", "passcode", "fallback"].includes(variant) ? variant : "fingerprint";
  const resolvedState = state === "scanning" ? "authenticating" : state;
  const disabled = resolvedState === "disabled";
  const stateCopy = {
    default: description || "Confirm your identity to continue.",
    focus: description || "Confirm your identity to continue.",
    authenticating: description || "Verifying identity...",
    success: description || "Identity confirmed.",
    warning: description || "Use the secure fallback if biometrics are not available.",
    error: description || "We could not verify you. Try again or use the fallback.",
    disabled: description || "Biometric authentication is not available right now.",
  };
  const variantIcon = {
    fingerprint: "fingerprint",
    face: "face",
    passcode: "pin",
    fallback: "lock",
  };
  const stateIcon = {
    success: "check_circle",
    error: "error",
    warning: "warning",
  };
  const prompt = document.createElement("section");
  prompt.className = "biometric-prompt";
  prompt.dataset.variant = resolvedVariant;
  prompt.dataset.state = resolvedState;
  prompt.dataset.density = density;
  prompt.dataset.fullWidth = String(Boolean(fullWidth));
  prompt.setAttribute("role", "group");
  prompt.setAttribute("aria-label", label ?? "Biometric authentication");
  const iconNode = document.createElement("span");
  iconNode.className = "biometric-prompt__icon";
  iconNode.setAttribute("aria-hidden", "true");
  iconNode.textContent = icon || stateIcon[resolvedState] || variantIcon[resolvedVariant];
  const content = document.createElement("div");
  content.className = "biometric-prompt__content";
  const title = document.createElement("strong");
  title.textContent = label ?? "Confirm it is you";
  const copy = document.createElement("p");
  copy.setAttribute("role", "status");
  copy.textContent = stateCopy[resolvedState] || stateCopy.default;
  content.append(title, copy);
  const action = createButton({
    label: resolvedState === "error" ? "Try again" : actionLabel,
    disabled,
    loading: resolvedState === "authenticating",
    fullWidth: true,
  });
  action.className = `${action.className} biometric-prompt__action`;
  action.setAttribute("data-biometric-action", "");
  const fallbackNode = createButton({ label: fallback, variant: "tertiary", disabled, density: "sm" });
  fallbackNode.className = `${fallbackNode.className} biometric-prompt__fallback`;
  fallbackNode.setAttribute("data-biometric-fallback", "");
  prompt.append(iconNode, content, action, fallbackNode);
  return prompt;
}
