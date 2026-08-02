export function setupSliderDemos(root = document) {
  root.querySelectorAll(".slider-demo:not([data-demo-ready='true'])").forEach((slider) => {
    slider.dataset.demoReady = "true";
    const input = slider.querySelector('input[type="range"]');
    const output = slider.querySelector("output");
    if (!input) return;
    const initialText = output?.textContent ?? "";
    const match = initialText.match(/^(.*?)(-?\d+(?:\.\d+)?)(.*)$/);
    const prefix = match?.[1] ?? "";
    const suffix = match?.[3] ?? "";
    const update = () => {
      const min = Number(input.min || 0);
      const max = Number(input.max || 100);
      const value = Number(input.value || 0);
      const pct = max === min ? 0 : Math.round(((value - min) / (max - min)) * 100);
      slider.dataset.value = String(value);
      slider.dataset.pct = String(Math.max(0, Math.min(100, pct)));
      if (output) output.textContent = `${prefix}${value}${suffix}`;
    };
    input.addEventListener("input", update);
    input.addEventListener("change", update);
    update();
  });
}
