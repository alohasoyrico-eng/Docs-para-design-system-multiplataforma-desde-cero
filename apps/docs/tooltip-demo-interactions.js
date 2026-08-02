export function setupTooltipDemos(root = document) {
  root.querySelectorAll('[data-doc-component="tooltip"]:not([data-demo-ready="true"]), .tooltip-demo:not([data-demo-ready="true"])').forEach((tooltip) => {
    tooltip.dataset.demoReady = "true";
    const trigger = tooltip.querySelector(".tooltip-demo__trigger, [data-tooltip-trigger]");
    const bubble = tooltip.querySelector(".tooltip-demo__bubble, [data-tooltip-bubble]");
    if (!trigger || !bubble) return;
    const staticState = tooltip.dataset.state;
    const open = () => {
      tooltip.dataset.open = "true";
      bubble.hidden = false;
      bubble.setAttribute("aria-hidden", "false");
      trigger.setAttribute("aria-describedby", bubble.id);
    };
    const close = () => {
      tooltip.dataset.open = "false";
      bubble.hidden = true;
      bubble.setAttribute("aria-hidden", "true");
      trigger.removeAttribute?.("aria-describedby");
    };
    if (staticState === "open") open();
    else close();
    trigger.addEventListener("mouseenter", () => {
      tooltip.dataset.state = "hover";
      open();
    });
    trigger.addEventListener("focus", () => {
      tooltip.dataset.state = "focus";
      open();
    });
    trigger.addEventListener("mouseleave", () => {
      tooltip.dataset.state = "default";
      close();
    });
    trigger.addEventListener("blur", () => {
      tooltip.dataset.state = "default";
      close();
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      tooltip.dataset.state = "dismissed";
      tooltip.dataset.open = "false";
      bubble.hidden = true;
      bubble.setAttribute("aria-hidden", "true");
      trigger.removeAttribute?.("aria-describedby");
    });
  });
}
