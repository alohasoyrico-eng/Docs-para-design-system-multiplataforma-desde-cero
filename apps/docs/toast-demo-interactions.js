export function setupToastDemos(root = document) {
  root.querySelectorAll('[data-doc-component="toast"]:not([data-demo-ready="true"]), .toast-demo:not([data-demo-ready="true"])').forEach((toast) => {
    toast.dataset.demoReady = "true";
    toast.querySelector("[data-toast-dismiss]")?.addEventListener("click", () => {
      toast.dataset.toastDismissed = "true";
      window.setTimeout(() => toast.remove(), 220);
    });
    toast.querySelector("[data-toast-action]")?.addEventListener("click", (event) => {
      const button = event.currentTarget;
      button.textContent = "Synced";
      toast.dataset.state = "visible";
      toast.dataset.tone = "success";
    });
  });
}
