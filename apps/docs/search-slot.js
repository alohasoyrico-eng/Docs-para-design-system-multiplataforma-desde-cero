import { html } from "./detail-tabs-core.js?v=3";
import { componentDemo } from "./component-demo.js?v=60";

function escapeAttr(value) {
  return String(value).replace(/"/g, "&quot;");
}

function attrsToText(attrs = {}) {
  return Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => value === "" || value === true ? key : `${key}="${escapeAttr(value)}"`)
    .join(" ");
}

function addInputAttrs(markup, attrs = {}) {
  const attrText = attrsToText(attrs);
  if (!attrText) return markup;
  return markup.replace(/<input\b([^>]*)>/i, (_match, existingAttrs) => {
    const cleanedAttrs = attrs.id ? existingAttrs.replace(/\s+id="[^"]*"/i, "") : existingAttrs;
    return `<input ${attrText}${cleanedAttrs}>`;
  });
}

export function patternPackageDemo(component, demo = {}, attrs = {}) {
  const markup = componentDemo(component, demo);
  if (!markup) return "";
  const { class: className, ...restAttrs } = attrs;
  const withClass = className
    ? markup.replace(/class="([^"]*)"/, `class="$1 ${escapeAttr(className)}"`)
    : markup;
  const attrText = attrsToText({ "data-pattern-component": component, ...restAttrs });
  return withClass.replace(/^<([a-z0-9-]+)/i, `<$1 ${attrText}`);
}

export function searchSlotMarkup({
  label = "Search",
  placeholder = "Search",
  attrs = {},
  inputAttrs = {},
  inputId = "",
  resultsId = "",
  slotClass = "",
  results = "",
  focused = false,
  ariaLabel = label,
} = {}) {
  const resolvedInputAttrs = { ...inputAttrs };
  if (inputId) resolvedInputAttrs.id = inputId;
  const resolvedResultsAttrs = attrsToText({
    id: resultsId || undefined,
    "aria-label": resultsId ? "Search results" : undefined,
  });
  const fieldMarkup = addInputAttrs(patternPackageDemo("input", {
    label,
    variant: "search",
    type: "search",
    icon: "search",
    placeholder,
    density: "sm",
    autocomplete: "off",
  }, attrs), resolvedInputAttrs);
  return html`
    <div class="search-slot search-slot--package ${slotClass} ${focused ? "is-demo-focused" : ""}" role="search" aria-label="${ariaLabel}">
      ${fieldMarkup}
      <div class="search-slot__results" ${resolvedResultsAttrs} ${focused && results ? "" : "hidden"}>${focused ? results : ""}</div>
    </div>
  `;
}
