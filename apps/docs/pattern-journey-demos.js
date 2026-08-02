import { html } from "./detail-tabs-core.js?v=3";
import { componentDemo } from "./component-demo.js?v=60";

function packageDemo(component, demo = {}, attrs = {}) {
  const markup = componentDemo(component, demo);
  if (!markup) return "";
  const attrText = Object.entries({ "data-pattern-component": component, ...attrs })
    .map(([key, value]) => value === "" ? key : `${key}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");
  return markup.replace(/^<([a-z0-9-]+)/i, `<$1 ${attrText}`);
}

export function journeyPatternOverviewDemo(patternId) {
  if (patternId === "authentication-login-biometrics-and-otp") return authJourneyDemoPanel();
  if (patternId === "driver-onboarding-mobile") return driverOnboardingDemoPanel();
  if (patternId === "fleet-manager-onboarding-desktop") return fleetManagerOnboardingDemoPanel();
  return "";
}

function authJourneyDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-journey-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Recoverable sign-in</h2>
      <div class="pattern-auth-demo pattern-journey-demo" data-auth-journey-demo>
        <div class="pattern-auth-demo__identity">
          ${packageDemo("phone-input", { label: "Phone number", value: "55 1842 9011", helper: "Used for OTP and account recovery." }, { "data-auth-phone": "" })}
          <div data-auth-validation hidden>${packageDemo("inline-validation", { label: "Phone number", message: "Enter a valid phone number before requesting a code.", state: "warning" })}</div>
          <div class="pattern-journey-actions">
            ${packageDemo("button", { label: "Send OTP", icon: "sms" }, { "data-auth-send": "" })}
            ${packageDemo("button", { label: "Use biometric", variant: "secondary", icon: "fingerprint" }, { "data-auth-biometric": "" })}
          </div>
        </div>
        <div class="pattern-auth-demo__otp" data-auth-otp hidden>
          ${packageDemo("code-input", { label: "Security code", value: "", helper: "Code expires in 00:42." }, { "data-auth-code": "" })}
          <div class="pattern-journey-actions">
            ${packageDemo("button", { label: "Verify code", icon: "verified_user" }, { "data-auth-verify": "" })}
            ${packageDemo("button", { label: "Send again", variant: "secondary", icon: "refresh" }, { "data-auth-resend": "" })}
          </div>
        </div>
        <div class="pattern-auth-demo__biometric" data-auth-biometric-panel hidden>
          ${packageDemo("biometric-prompt", { label: "Confirm it is you", description: "Use device biometrics or continue with OTP.", actionLabel: "Confirm biometric", fallback: "Use OTP instead" }, { "data-auth-biometric-card": "" })}
        </div>
        <div data-auth-error hidden>${packageDemo("error-panel", { label: "Authentication needs review", description: "Retry OTP or use account recovery before continuing.", actionLabel: "Review recovery" })}</div>
        <div data-auth-toast hidden>${packageDemo("toast", { label: "Sign-in verified", description: "The session can continue.", tone: "success" })}</div>
      </div>
    </section>
  `;
}

function driverOnboardingDemoPanel() {
  return html`
    <section class="doc-panel wide pattern-journey-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Driver mobile setup</h2>
      <div class="pattern-driver-onboarding pattern-journey-demo pattern-journey-demo--mobile" data-driver-onboarding-demo data-journey-step="0">
        <div data-journey-stepper>
          ${packageDemo("stepper", { current: 0, steps: [{ label: "Identity", description: "Phone" }, { label: "Trust", description: "Device" }, { label: "Ready", description: "Start" }] })}
        </div>
        <div class="pattern-journey-step" data-journey-panel="0">
          ${packageDemo("phone-input", { label: "Driver phone", value: "55 1030 4481", helper: "Used for dispatch and verification." })}
          <div data-driver-validation hidden>${packageDemo("inline-validation", { label: "Driver phone", message: "Phone verification is required before device setup.", state: "warning" })}</div>
        </div>
        <div class="pattern-journey-step" data-journey-panel="1" hidden>
          ${packageDemo("code-input", { label: "Verification code", value: "", helper: "Enter the SMS code before enabling biometrics." })}
          ${packageDemo("biometric-prompt", { label: "Enable quick access", description: "Let the driver unlock trip tools faster on this device.", actionLabel: "Enable", fallback: "Skip for now" })}
        </div>
        <div class="pattern-journey-step pattern-journey-step--summary" data-journey-panel="2" hidden>
          ${packageDemo("animated-moment", { label: "Setup ready", state: "idle", meta: "Driver can start after confirmation.", icon: "check_circle" })}
          ${packageDemo("card-summary", { label: "Driver readiness", description: "Phone verified, device trust optional, support fallback available.", meta: "3 of 3 setup checks" })}
        </div>
        <footer class="pattern-journey-actions pattern-journey-actions--split">
          ${packageDemo("button", { label: "Back", variant: "secondary" }, { "data-driver-back": "", hidden: "" })}
          ${packageDemo("button", { label: "Continue", icon: "arrow_forward" }, { "data-driver-next": "" })}
        </footer>
        <div data-driver-toast hidden>${packageDemo("toast", { label: "Driver setup complete", description: "Mobile onboarding is ready for first use.", tone: "success" })}</div>
      </div>
    </section>
  `;
}

function fleetManagerOnboardingDemoPanel() {
  const rows = [
    { id: "jmx-214-b", plate: "JMX-214-B", driver: "Ana Sosa", status: "Ready", spend: "$842" },
    { id: "kld-901-c", plate: "KLD-901-C", driver: "Luis Vera", status: "Needs role", spend: "$631" },
  ];
  return html`
    <section class="doc-panel wide pattern-journey-panel">
      <span class="eyebrow">Interactive demo</span>
      <h2>Fleet manager workspace setup</h2>
      <div class="pattern-fleet-onboarding pattern-journey-demo" data-fleet-onboarding-demo data-journey-step="0">
        <div data-journey-stepper>
          ${packageDemo("stepper", { current: 0, steps: [{ label: "Workspace", description: "Profile" }, { label: "Fleet", description: "Import" }, { label: "Access", description: "Roles" }] })}
        </div>
        <div class="pattern-fleet-onboarding__layout">
          <div class="pattern-journey-step" data-journey-panel="0">
            ${packageDemo("input", { label: "Workspace name", value: "North fleet operations" }, { "data-fleet-field": "workspace" })}
            ${packageDemo("select", { label: "Operating region", value: "mx", options: [{ label: "Mexico", value: "mx" }, { label: "Colombia", value: "co" }, { label: "Brazil", value: "br" }] })}
          </div>
          <div class="pattern-journey-step" data-journey-panel="1" hidden>
            <div class="pattern-fleet-onboarding__metrics">
              ${packageDemo("kpi-tile", { label: "Vehicles", value: "42", trend: "12 ready", tone: "info", icon: "directions_car" })}
              ${packageDemo("kpi-tile", { label: "Policies", value: "8", trend: "2 need review", tone: "warning", icon: "rule" })}
            </div>
            ${packageDemo("table", { label: "Import preview", rows }, { "data-fleet-import-table": "" })}
          </div>
          <div class="pattern-journey-step" data-journey-panel="2" hidden>
            ${packageDemo("checkbox", { label: "Invite operations owner", description: "Can approve limits and review exceptions.", value: "ops-owner" }, { "data-fleet-permission": "" })}
            ${packageDemo("checkbox", { label: "Invite finance reviewer", description: "Can review spend and export reports.", value: "finance" }, { "data-fleet-permission": "" })}
            ${packageDemo("badge", { label: "2 roles pending", tone: "warning", variant: "standard" }, { "data-fleet-role-count": "" })}
          </div>
          <aside class="pattern-fleet-onboarding__aside">
            ${packageDemo("empty-state", { label: "Setup stays in draft", description: "Save when workspace, fleet data, and access are reviewed.", icon: "inventory" })}
            <div data-fleet-validation hidden>${packageDemo("inline-validation", { label: "Workspace setup", message: "Review each setup stage before finishing.", state: "warning" })}</div>
          </aside>
        </div>
        <footer class="pattern-journey-actions pattern-journey-actions--split">
          ${packageDemo("button", { label: "Back", variant: "secondary" }, { "data-fleet-back": "", hidden: "" })}
          ${packageDemo("button", { label: "Continue setup", icon: "arrow_forward" }, { "data-fleet-next": "" })}
        </footer>
        <div data-fleet-toast hidden>${packageDemo("toast", { label: "Workspace setup saved", description: "The fleet manager can continue into templates.", tone: "success" })}</div>
      </div>
    </section>
  `;
}
