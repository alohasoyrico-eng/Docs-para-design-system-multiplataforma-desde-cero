export function setupJourneyPatternInteractions() {
  document.addEventListener("click", handleJourneyPatternClick);
}

function handleJourneyPatternClick(event) {
  const authSend = event.target.closest("[data-auth-send]");
  if (authSend) return showAuthOtp(authSend.closest("[data-auth-journey-demo]"));

  const authVerify = event.target.closest("[data-auth-verify]");
  if (authVerify) return verifyAuth(authVerify.closest("[data-auth-journey-demo]"));

  const authBiometric = event.target.closest("[data-auth-biometric]");
  if (authBiometric) return showAuthBiometric(authBiometric.closest("[data-auth-journey-demo]"));

  const driverNext = event.target.closest("[data-driver-next]");
  if (driverNext) return moveJourneyStep(driverNext.closest("[data-driver-onboarding-demo]"), 1, "[data-driver-toast]");

  const driverBack = event.target.closest("[data-driver-back]");
  if (driverBack) return moveJourneyStep(driverBack.closest("[data-driver-onboarding-demo]"), -1, "[data-driver-toast]");

  const fleetNext = event.target.closest("[data-fleet-next]");
  if (fleetNext) return moveJourneyStep(fleetNext.closest("[data-fleet-onboarding-demo]"), 1, "[data-fleet-toast]");

  const fleetBack = event.target.closest("[data-fleet-back]");
  if (fleetBack) return moveJourneyStep(fleetBack.closest("[data-fleet-onboarding-demo]"), -1, "[data-fleet-toast]");
}

function showAuthOtp(demo) {
  if (!demo) return;
  demo.querySelector("[data-auth-validation]")?.setAttribute("hidden", "");
  demo.querySelector("[data-auth-biometric-panel]")?.setAttribute("hidden", "");
  demo.querySelector("[data-auth-error]")?.setAttribute("hidden", "");
  demo.querySelector("[data-auth-toast]")?.setAttribute("hidden", "");
  demo.querySelector("[data-auth-otp]")?.removeAttribute("hidden");
  demo.querySelector("[data-auth-code] input")?.focus();
}

function verifyAuth(demo) {
  if (!demo) return;
  demo.querySelector("[data-auth-error]")?.setAttribute("hidden", "");
  demo.querySelector("[data-auth-toast]")?.removeAttribute("hidden");
}

function showAuthBiometric(demo) {
  if (!demo) return;
  demo.querySelector("[data-auth-otp]")?.setAttribute("hidden", "");
  demo.querySelector("[data-auth-toast]")?.setAttribute("hidden", "");
  demo.querySelector("[data-auth-biometric-panel]")?.removeAttribute("hidden");
}

function moveJourneyStep(demo, direction, toastSelector) {
  if (!demo) return;
  const current = Number(demo.dataset.journeyStep ?? 0);
  const max = demo.querySelectorAll("[data-journey-panel]").length - 1;
  if (current === max && direction > 0) {
    demo.querySelector(toastSelector)?.removeAttribute("hidden");
    return;
  }
  const next = Math.max(0, Math.min(max, current + direction));
  demo.dataset.journeyStep = String(next);
  demo.querySelector(toastSelector)?.setAttribute("hidden", "");
  demo.querySelectorAll("[data-journey-panel]").forEach((panel) => {
    panel.hidden = Number(panel.dataset.journeyPanel) !== next;
  });
  updateJourneyStepper(demo, next);
  updateJourneyActions(demo, next, max);
}

function updateJourneyStepper(demo, current) {
  const items = Array.from(demo.querySelectorAll(".stepper__item"));
  const connectors = Array.from(demo.querySelectorAll(".stepper__connector"));
  items.forEach((item, index) => {
    const state = index < current ? "complete" : index === current ? "active" : "pending";
    item.dataset.state = state;
    item.toggleAttribute("aria-current", index === current);
    const marker = item.querySelector(".stepper__marker");
    if (marker) marker.textContent = state === "complete" ? "✓" : String(index + 1);
  });
  connectors.forEach((connector, index) => {
    connector.dataset.state = index < current ? "complete" : "pending";
  });
}

function updateJourneyActions(demo, current, max) {
  const back = demo.querySelector("[data-driver-back], [data-fleet-back]");
  if (back) back.hidden = current === 0;
  const next = demo.querySelector("[data-driver-next], [data-fleet-next]");
  if (next) next.textContent = current === max ? "Finish" : next.dataset.fleetNext !== undefined ? "Continue setup" : "Continue";
}
