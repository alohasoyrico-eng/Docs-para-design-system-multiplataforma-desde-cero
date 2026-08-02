const motionBoundaryVariants = new Set(["fade", "slide", "collapse", "route"]);
const motionBoundaryStates = new Set(["idle", "entering", "active", "exiting", "reduced-motion", "disabled"]);
const animatedMomentVariants = new Set(["success", "empty", "loading", "celebration"]);
const animatedMomentStates = new Set(["idle", "playing", "paused", "complete", "reduced-motion", "disabled"]);

let motionBoundaryId = 0;

function normalizeMotionBoundaryVariant(variant) {
  return motionBoundaryVariants.has(variant) ? variant : "fade";
}

function normalizeMotionBoundaryState(state, reducedMotion) {
  if (state === "disabled") return "disabled";
  if (reducedMotion || state === "reduced-motion") return "reduced-motion";
  return motionBoundaryStates.has(state) ? state : "active";
}

function motionBoundaryStateLabel(state) {
  const labels = {
    idle: "Idle",
    entering: "Entering",
    active: "Active",
    exiting: "Exiting",
    "reduced-motion": "Reduced motion",
    disabled: "Disabled",
  };
  return labels[state] ?? labels.active;
}

function normalizeAnimatedMomentVariant(variant) {
  return animatedMomentVariants.has(variant) ? variant : "success";
}

function normalizeAnimatedMomentState(state) {
  return animatedMomentStates.has(state) ? state : "idle";
}

function animatedMomentStateLabel(state) {
  const labels = {
    idle: "Idle",
    playing: "Playing",
    paused: "Paused",
    complete: "Complete",
    "reduced-motion": "Reduced motion",
    disabled: "Disabled",
  };
  return labels[state] ?? labels.idle;
}

function animatedMomentIcon(variant, icon) {
  if (icon) return icon;
  const icons = {
    success: "shield",
    empty: "account_balance_wallet",
    loading: "sync",
    celebration: "auto_awesome",
  };
  return icons[variant] ?? "auto_awesome";
}

export function createMotionBoundary({
  label,
  description = "",
  variant = "fade",
  state = "active",
  icon = "transition_slide",
  reducedMotion = false,
} = {}) {
  const id = `motion-boundary-${++motionBoundaryId}`;
  const resolvedVariant = normalizeMotionBoundaryVariant(variant);
  const resolvedState = normalizeMotionBoundaryState(state, reducedMotion);
  const boundary = document.createElement("div");
  boundary.className = "motion-boundary";
  boundary.dataset.variant = resolvedVariant;
  boundary.dataset.state = resolvedState;
  boundary.dataset.reducedMotion = String(Boolean(reducedMotion || resolvedState === "reduced-motion"));
  boundary.setAttribute("role", "group");
  boundary.setAttribute("aria-labelledby", `${id}-label`);
  boundary.setAttribute("aria-describedby", `${id}-description ${id}-state`);
  if (resolvedState === "disabled") boundary.setAttribute("aria-disabled", "true");
  const iconNode = document.createElement("span");
  iconNode.className = "motion-boundary__icon";
  iconNode.setAttribute("aria-hidden", "true");
  iconNode.textContent = icon;
  const content = document.createElement("div");
  content.className = "motion-boundary__content";
  const title = document.createElement("strong");
  title.id = `${id}-label`;
  title.textContent = label ?? "Panel transition";
  const copy = document.createElement("p");
  copy.id = `${id}-description`;
  copy.textContent = description || "Controls the entrance, exit, and reduced-motion behavior of one bounded region.";
  const stateNode = document.createElement("span");
  stateNode.className = "motion-boundary__state";
  stateNode.id = `${id}-state`;
  stateNode.textContent = motionBoundaryStateLabel(resolvedState);
  content.append(title, copy, stateNode);
  const cue = document.createElement("span");
  cue.className = "motion-boundary__cue";
  cue.setAttribute("data-motion-cue", "");
  cue.setAttribute("aria-hidden", "true");
  boundary.append(iconNode, content, cue);
  return boundary;
}

export function createAnimatedMoment({
  label,
  description = "",
  variant = "success",
  state = "playing",
  density = "md",
  fullWidth = false,
  icon = "",
  reducedMotionFallback = "Short controlled animation with reduced-motion fallback.",
} = {}) {
  const resolvedVariant = normalizeAnimatedMomentVariant(variant);
  const resolvedState = normalizeAnimatedMomentState(state);
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const moment = document.createElement("div");
  moment.className = "animated-moment";
  moment.dataset.variant = resolvedVariant;
  moment.dataset.state = resolvedState;
  moment.dataset.density = resolvedDensity;
  moment.dataset.fullWidth = String(Boolean(fullWidth));
  moment.setAttribute("role", "img");
  moment.setAttribute("aria-label", `${label ?? "Animated moment"}: ${animatedMomentStateLabel(resolvedState)}`);
  if (resolvedState === "disabled") moment.setAttribute("aria-disabled", "true");
  const iconNode = document.createElement("span");
  iconNode.className = "animated-moment__icon";
  iconNode.setAttribute("aria-hidden", "true");
  iconNode.textContent = animatedMomentIcon(resolvedVariant, icon);
  const stage = document.createElement("span");
  stage.className = "animated-moment__stage";
  stage.setAttribute("data-animated-moment-stage", "");
  stage.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 3; index += 1) {
    const dot = document.createElement("span");
    stage.append(dot);
  }
  const title = document.createElement("strong");
  title.textContent = label ?? "Action complete";
  const stateNode = document.createElement("span");
  stateNode.className = "animated-moment__state";
  stateNode.textContent = animatedMomentStateLabel(resolvedState);
  const copy = document.createElement("small");
  copy.textContent = description || reducedMotionFallback;
  const cue = document.createElement("span");
  cue.className = "animated-moment__cue";
  cue.setAttribute("data-animated-moment-cue", "");
  cue.setAttribute("aria-hidden", "true");
  moment.append(iconNode, stage, title, stateNode, copy, cue);
  return moment;
}
