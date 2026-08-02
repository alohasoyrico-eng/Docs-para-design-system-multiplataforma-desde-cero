export function setupSelectDemos() {
  document.querySelectorAll(".select[data-interactive-select='true']:not([data-ready='true'])").forEach((select) => {
    const trigger = select.querySelector("button");
    const menu = select.querySelector(".select-menu");
    if (!trigger || !menu) return;
    select.dataset.ready = "true";

    const close = () => closeSelect(select);
    const open = () => {
      document.querySelectorAll(".select.is-open").forEach((other) => {
        if (other !== select) closeSelect(other);
      });
      select.classList.add("is-open");
      select.setAttribute("aria-expanded", "true");
      menu.hidden = false;
    };

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      select.classList.contains("is-open") ? close() : open();
    });

    trigger.addEventListener("keydown", (event) => {
      if (["Enter", " ", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        open();
        menu.querySelector("[role='option']")?.focus();
      }
    });

    menu.querySelectorAll("[role='option']").forEach((option) => {
      option.addEventListener("click", () => {
        select.querySelector("[data-select-value]").textContent = option.dataset.value;
        select.querySelector("[data-select-helper]").textContent = option.dataset.helper;
        menu.querySelectorAll("[role='option']").forEach((item) => item.setAttribute("aria-selected", "false"));
        option.setAttribute("aria-selected", "true");
        select.classList.add("is-filled");
        close();
        trigger.focus();
      });
      option.addEventListener("keydown", (event) => {
        const options = [...menu.querySelectorAll("[role='option']")];
        const index = options.indexOf(option);
        if (event.key === "Escape") {
          close();
          trigger.focus();
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          options[Math.min(index + 1, options.length - 1)]?.focus();
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          options[Math.max(index - 1, 0)]?.focus();
        }
      });
    });
  });
}

export function closeSelect(select) {
  select.classList.remove("is-open");
  select.setAttribute("aria-expanded", "false");
  select.querySelector(".select-menu")?.setAttribute("hidden", "");
}
