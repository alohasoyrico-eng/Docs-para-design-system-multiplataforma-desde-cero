export function setupReferenceDemos({ foundationCopy, icon, primitiveCopy }) {
  bindChoice("[data-density-demo]", "[data-density-choice]", (demo, button) => {
    demo.dataset.densityDemo = button.dataset.densityChoice;
  });

  bindChoice("[data-energy-demo]", "[data-energy-choice]", (demo, button) => {
    const role = button.dataset.energyChoice;
    const [title, copy, value, token, action, iconName] = foundationCopy?.explorers?.items?.Energy?.states?.[role] ?? [];
    demo.dataset.energyDemo = role;
    demo.querySelector("[data-energy-title]").textContent = title ?? "";
    demo.querySelector("[data-energy-copy]").textContent = copy ?? "";
    demo.querySelector("[data-energy-value]").textContent = value ?? "";
    demo.querySelector("[data-energy-token]").textContent = token ?? "";
    demo.querySelector("[data-energy-action]").textContent = action ?? "";
    demo.querySelector(".energy-signal").innerHTML = icon(iconName);
  });

  bindChoice("[data-voice-demo]", "[data-voice-choice]", (demo, button) => {
    const role = button.dataset.voiceChoice;
    const [title, heading, labelText, body] = foundationCopy?.explorers?.items?.Voice?.states?.[role] ?? [];
    demo.dataset.voiceDemo = role;
    demo.querySelector("[data-voice-title]").textContent = title ?? "";
    demo.querySelector("[data-voice-heading]").textContent = heading ?? "";
    demo.querySelector("[data-voice-label]").textContent = labelText ?? "";
    demo.querySelector("[data-voice-body]").textContent = body ?? "";
  });

  bindChoice("[data-depth-demo]", "[data-depth-choice]", (demo, button) => {
    const level = button.dataset.depthChoice;
    demo.dataset.depthDemo = level;
    demo.querySelector("[data-depth-label]").textContent = foundationCopy?.explorers?.items?.Depth?.labels?.[level] ?? "";
  });

  bindChoice("[data-motion-demo]", "[data-motion-choice]", (demo, button) => {
    const mode = button.dataset.motionChoice;
    const [title, copy] = foundationCopy?.explorers?.items?.Momentum?.states?.[mode] ?? [];
    demo.dataset.motionDemo = mode;
    demo.querySelector("[data-motion-title]").textContent = title ?? "";
    demo.querySelector("[data-motion-copy]").textContent = copy ?? "";
    demo.querySelector(".motion-doc-demo").style.animation = "none";
    requestAnimationFrame(() => {
      demo.querySelector(".motion-doc-demo").style.animation = "";
    });
  });

  bindChoice("[data-type-demo]", "[data-type-choice]", (demo, button) => {
    const role = button.dataset.typeChoice;
    const [sample, token] = primitiveCopy?.demos?.Typography?.samples?.[role] ?? [];
    demo.dataset.typeDemo = role;
    demo.querySelector("[data-type-sample]").textContent = sample ?? "";
    demo.querySelector("code").textContent = token ?? "";
  });

  bindChoice("[data-icon-size-demo]", "[data-icon-size-choice]", (demo, button) => {
    demo.dataset.iconSizeDemo = button.dataset.iconSizeChoice;
  });

  bindChoice("[data-color-demo]", "[data-color-choice]", (demo, button) => {
    demo.dataset.colorDemo = button.dataset.colorChoice;
  });

  bindChoice("[data-symbol-demo]", "[data-symbol-choice]", (demo, button) => {
    const role = button.dataset.symbolChoice;
    const sets = foundationCopy?.explorers?.items?.Symbol?.sets ?? {};
    demo.dataset.symbolDemo = role;
    demo.querySelector("[data-symbol-gallery]").innerHTML = (sets[role] ?? []).map((name) => `<article>${icon(name)}<span>${name}</span></article>`).join("");
  });

  bindChoice("[data-tone-demo]", "[data-tone-choice]", (demo, button) => {
    const tone = button.dataset.toneChoice;
    const [labelText, title, copy] = foundationCopy?.explorers?.items?.Tone?.states?.[tone] ?? [];
    demo.dataset.toneDemo = tone;
    demo.querySelector("[data-tone-label]").textContent = labelText ?? "";
    demo.querySelector("[data-tone-title]").textContent = title ?? "";
    demo.querySelector("[data-tone-copy]").textContent = copy ?? "";
  });

  bindChoice("[data-growth-demo]", "[data-growth-choice]", (demo, button) => {
    const stage = button.dataset.growthChoice;
    const [title, copy, eventName] = foundationCopy?.explorers?.items?.Growth?.states?.[stage] ?? [];
    demo.dataset.growthDemo = stage;
    demo.querySelector("[data-growth-title]").textContent = title ?? "";
    demo.querySelector("[data-growth-copy]").textContent = copy ?? "";
    demo.querySelector("[data-growth-event]").textContent = eventName ?? "";
  });

  bindChoice("[data-a11y-demo]", "[data-a11y-choice]", (demo, button) => {
    const check = button.dataset.a11yChoice;
    const [title, copy, action] = foundationCopy?.explorers?.items?.Accessibility?.states?.[check] ?? [];
    demo.dataset.a11yDemo = check;
    demo.querySelector("[data-a11y-title]").textContent = title ?? "";
    demo.querySelector("[data-a11y-copy]").textContent = copy ?? "";
    demo.querySelector("[data-a11y-action]").textContent = action ?? "";
  });

  bindSimpleDemo("[data-radius-demo]", "radiusChoice", "[data-radius-choice]", (demo, value) => {
    demo.dataset.radiusDemo = value;
    demo.querySelector("[data-radius-label]").textContent = value;
  });
  bindSimpleDemo("[data-motion-token-demo]", "motionTokenChoice", "[data-motion-token-choice]", (demo, value) => {
    demo.dataset.motionTokenDemo = value;
    const labels = primitiveCopy?.demos?.Duration?.labels ?? primitiveCopy?.demos?.["Motion Curves"]?.labels ?? {};
    demo.querySelector("[data-motion-token-label]").textContent = labels[value] ?? "";
  });
  bindSimpleDemo("[data-breakpoint-demo]", "breakpointChoice", "[data-breakpoint-choice]", (demo, value) => {
    demo.dataset.breakpointDemo = value;
    demo.querySelector("[data-breakpoint-label]").textContent = primitiveCopy?.demos?.Breakpoints?.labels?.[value] ?? value;
  });
  bindSimpleDemo("[data-focus-demo]", "focusChoice", "[data-focus-choice]", (demo, value) => {
    demo.dataset.focusDemo = value;
    demo.querySelector("[data-focus-copy]").textContent = primitiveCopy?.demos?.Focus?.states?.[value] ?? "";
  });
  bindSimpleDemo("[data-loading-demo]", "loadingChoice", "[data-loading-choice]", (demo, value) => {
    demo.dataset.loadingDemo = value;
    demo.querySelector("[data-loading-title]").textContent = primitiveCopy?.demos?.Loading?.states?.[value] ?? "";
  });
  bindSimpleDemo("[data-disabled-demo]", "disabledChoice", "[data-disabled-choice]", (demo, value) => {
    demo.dataset.disabledDemo = value;
    const copy = primitiveCopy?.demos?.Disabled?.states?.[value] ?? [];
    demo.querySelector("[data-disabled-action]").textContent = copy[0] ?? "";
    demo.querySelector("[data-disabled-copy]").textContent = copy[1] ?? "";
  });
  bindSimpleDemo("[data-chart-demo]", "chartChoice", "[data-chart-choice]", (demo, value) => {
    demo.dataset.chartDemo = value;
    demo.querySelector("[data-chart-copy]").textContent = primitiveCopy?.demos?.Charts?.states?.[value] ?? "";
  });
  bindSimpleDemo("[data-map-demo]", "mapChoice", "[data-map-choice]", (demo, value) => {
    demo.dataset.mapDemo = value;
    demo.querySelector("[data-map-label]").textContent = primitiveCopy?.demos?.Maps?.states?.[value] ?? "";
  });
}

function bindChoice(selector, choiceSelector, update) {
  document.querySelectorAll(`${selector}:not([data-ready='true'])`).forEach((demo) => {
    demo.dataset.ready = "true";
    demo.querySelectorAll(choiceSelector).forEach((button) => {
      button.addEventListener("click", () => {
        demo.querySelectorAll(choiceSelector).forEach((item) => item.classList.toggle("active", item === button));
        update(demo, button);
      });
    });
  });
}

function bindSimpleDemo(selector, attr, choiceSelector, update) {
  bindChoice(selector, choiceSelector, (demo, button) => {
    const value = button.dataset[attr];
    demo.dataset[attr.replace(/Choice$/, "Demo")] = value;
    update(demo, value);
  });
}
