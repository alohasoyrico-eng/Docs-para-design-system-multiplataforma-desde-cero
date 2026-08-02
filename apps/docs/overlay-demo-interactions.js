export function setupOverlayDemos(root = document) {
  root.querySelectorAll('[data-doc-component="dialog"]:not([data-demo-ready="true"]), [data-doc-component="drawer"]:not([data-demo-ready="true"]), .dialog-demo:not([data-demo-ready="true"]), .drawer-demo:not([data-demo-ready="true"])').forEach((demo) => {
    demo.dataset.demoReady = "true";
    const setOpen = (open) => {
      demo.dataset.open = String(open);
      demo.dataset.state = open ? "open" : "closed";
      demo.querySelectorAll("[data-overlay-dismiss]").forEach((overlay) => {
        overlay.hidden = !open;
      });
      const trigger = demo.querySelector("[data-overlay-open]");
      trigger?.setAttribute("aria-expanded", String(open));
      if (open) demo.querySelector("[data-overlay-close]")?.focus?.();
      else trigger?.focus?.();
    };
    demo.querySelectorAll("[data-overlay-open]").forEach((button) => button.addEventListener("click", () => setOpen(true)));
    demo.querySelectorAll("[data-overlay-close]").forEach((button) => button.addEventListener("click", () => setOpen(false)));
    demo.querySelectorAll("[data-overlay-dismiss]").forEach((overlay) => {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) setOpen(false);
      });
    });
    demo.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  });
}

export function setupMenuDemos(root = document) {
  root.querySelectorAll('[data-doc-component="menu"]:not([data-demo-ready="true"]), .menu-demo:not([data-demo-ready="true"])').forEach((demo) => {
    demo.dataset.demoReady = "true";
    const trigger = demo.querySelector("[data-menu-trigger]");
    const enabledItems = () => [...demo.querySelectorAll('[role="menuitem"]')].filter((item) => !item.disabled);
    const focusItem = (item) => {
      if (typeof item?.focus === "function") item.focus();
    };
    const moveItem = (current, direction) => {
      const items = enabledItems();
      if (!items.length) return;
      const currentIndex = Math.max(0, items.indexOf(current));
      focusItem(items[(currentIndex + direction + items.length) % items.length]);
    };
    const setOpen = (open) => {
      demo.dataset.open = String(open);
      demo.dataset.state = open ? "open" : "closed";
      trigger?.setAttribute("aria-expanded", String(open));
      const panel = demo.querySelector("[data-menu-panel], .menu-demo__panel");
      if (panel) panel.hidden = !open;
      if (open) focusItem(enabledItems()[0]);
      if (!open && typeof trigger?.focus === "function") trigger.focus();
    };
    trigger?.addEventListener("click", () => setOpen(demo.dataset.open !== "true"));
    trigger?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    });
    demo.querySelectorAll('[role="menuitem"]').forEach((item) => {
      item.addEventListener("click", () => setOpen(false));
      item.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          moveItem(item, 1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          moveItem(item, -1);
        } else if (event.key === "Home") {
          event.preventDefault();
          focusItem(enabledItems()[0]);
        } else if (event.key === "End") {
          event.preventDefault();
          const items = enabledItems();
          focusItem(items[items.length - 1]);
        } else if (event.key === "Escape") {
          event.preventDefault();
          setOpen(false);
        }
      });
    });
    demo.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  });
}
