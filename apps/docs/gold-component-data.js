import { componentSectionData, html, icon } from "./gold-component-core.js?v=211";
import { buttonDemo } from "./gold-button-docs.js?v=218";
import { selectDemo } from "./gold-select-docs.js?v=221";
import { cardDemo } from "./gold-card-docs.js?v=220";

export function selectDemoFromData(demo) {
  return selectDemo(demo.field, demo.value, demo.helper, demo.density ?? "md", demo.state ?? "", demo.variant ?? "default", demo.icon ?? "");
}

export function cardDemoFromData(demo) {
  return cardDemo(demo);
}

export function buttonDemoFromData(demo) {
  return buttonDemo(demo.label, demo.variant, demo.intent ?? "", demo.size ?? "md", demo.icon ?? "", demo.state ?? "", demo.density || demo.size || "", demo.trailingIcon ?? demo.iconTrailing ?? "");
}

export function playgroundControl(control, dataAttribute = "") {
  const data = dataAttribute ? ` ${dataAttribute}="${control.name}"` : "";
  if (control.type === "select") {
    return html`
      <label>
        <span>${control.label}</span>
        <select${data}>
          ${(control.options ?? []).map((option) => `<option value="${option}"${option === control.value ? " selected" : ""}>${option}</option>`).join("")}
        </select>
      </label>
    `;
  }
  if (control.type === "checkbox") {
    return html`
      <label class="playground-check">
        <input type="checkbox"${data}${control.value ? " checked" : ""} />
        <span class="playground-check__box" aria-hidden="true">${icon("check", { tone: "current", size: "sm", fill: true })}</span>
        <span>${control.label}</span>
      </label>
    `;
  }
  const min = control.min != null ? ` min="${control.min}"` : "";
  const max = control.max != null ? ` max="${control.max}"` : "";
  return `<label><span>${control.label}</span><input type="${control.type ?? "text"}" value="${control.value ?? ""}"${min}${max}${data} /></label>`;
}

export function playgroundStaticControls(controls, dataAttribute = "") {
  return controls.map((control) => playgroundControl(control, dataAttribute)).join("");
}
