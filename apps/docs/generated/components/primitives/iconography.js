const materialSymbolAliases = Object.freeze({
  menu_open: "keyboard_arrow_down",
  toast: "notifications",
});

export function iconGlyph(name = "") {
  return materialSymbolAliases[name] ?? name;
}

export function setIconGlyph(node, name = "") {
  if (!node) return node;
  node.textContent = iconGlyph(name);
  return node;
}
