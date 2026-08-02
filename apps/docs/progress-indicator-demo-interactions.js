export function setupProgressIndicatorDemos(root = document) {
  root.querySelectorAll('[data-doc-component="progress-indicator"]:not([data-progress-ready="true"])').forEach((demo) => {
    demo.dataset.progressReady = "true";
    const progress = demo.matches?.(".progress") ? demo : demo.querySelector?.(".progress");
    const value = Number(demo.dataset.value ?? progress?.getAttribute("aria-valuenow") ?? 0);
    const max = Math.max(1, Number(demo.dataset.max ?? progress?.getAttribute("aria-valuemax") ?? 100));
    const fill = progress?.querySelector?.(".progress__fill");
    const indeterminate = progress?.dataset.indeterminate === "true";
    const percent = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
    if (fill && !indeterminate) fill.style.setProperty("--progress-value", `${percent}%`);
    if (progress && !indeterminate) {
      progress.setAttribute("aria-valuenow", String(value));
      progress.setAttribute("aria-valuemax", String(max));
    }
  });
}

export function renderProgressIndicatorPreview(demo, deps) {
  const state = demo.state ?? "active";
  const variant = demo.variant ?? "linear";
  return {
    html: deps.progressIndicatorDemo(demo.label ?? "Card import", Number(demo.value ?? 68), variant, state, Boolean(demo.fullWidth)),
    markup: `<ProgressIndicator label="${deps.escapeHtml(demo.label ?? "Card import")}" value={${Number(demo.value ?? 68)}} variant="${deps.escapeHtml(variant)}" state="${deps.escapeHtml(state)}" />`,
  };
}
