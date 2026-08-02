export const slug = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function html(strings, ...values) {
  return strings.reduce((output, string, index) => output + string + (values[index] ?? ""), "");
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

export function referenceTemplate(value = "", entry = {}, replacements = {}) {
  const values = {
    title: entry.title ?? "",
    id: entry.id ?? "",
    ...replacements,
  };
  return String(value).replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? "");
}

export function interpolateList(items = [], entry = {}, replacements = {}) {
  return items.map((item) => referenceTemplate(item, entry, replacements));
}
