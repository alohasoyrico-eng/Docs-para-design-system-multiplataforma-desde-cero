export function setupButtonPlaygrounds({ buttonDemo, componentSectionData, escapeHtml }) {
  document.querySelectorAll("[data-button-playground]:not([data-ready='true'])").forEach((playground) => {
    playground.dataset.ready = "true";
    const inputs = [...playground.querySelectorAll("[data-button-playground-input]")];
    const preview = playground.querySelector("[data-button-preview]");
    const markup = playground.querySelector("[data-button-markup]");
    const warning = playground.querySelector("[data-button-warning]");

    const read = (name) => {
      const input = playground.querySelector(`[data-button-playground-input="${name}"]`);
      if (!input) return "";
      if (input.type === "checkbox") return input.checked;
      return input.value;
    };

    const renderPlayground = () => {
      const rawLabel = read("label").trim() || "Button";
      const label = escapeHtml(rawLabel);
      const variant = read("variant") || "primary";
      const intent = read("intent") === "default" ? "" : read("intent");
      const density = read("density") || "md";
      const state = read("state") === "default" ? "" : read("state");
      const iconName = read("icon") === "none" ? "" : read("icon");
      const full = read("fullWidth") ? " full" : "";
      preview.dataset.densityContext = density;
      preview.innerHTML = buttonDemo(label, `${variant}${full}`, intent, "", iconName, state);
      const button = preview.querySelector(".button");
      const attrs = [...button.attributes].map((attr) => `${attr.name}="${attr.value}"`).join(" ");
      markup.textContent = `<button ${attrs}>${rawLabel}</button>`;

      const context = { intent: intent || "default", state: state || "default", label: rawLabel.toLowerCase() };
      const messages = (componentSectionData("button", "playground").warnings ?? [])
        .filter((rule) => playgroundWarningMatches(rule.when, context))
        .map((rule) => rule.message);
      warning.hidden = messages.length === 0;
      warning.innerHTML = messages.map((message) => `<p>${message}</p>`).join("");
    };

    inputs.forEach((input) => input.addEventListener("input", renderPlayground));
    inputs.forEach((input) => input.addEventListener("change", renderPlayground));
    renderPlayground();
  });
}

function playgroundWarningMatches(condition, context) {
  const [key, value] = String(condition ?? "").split(":");
  return context[key] === value;
}
