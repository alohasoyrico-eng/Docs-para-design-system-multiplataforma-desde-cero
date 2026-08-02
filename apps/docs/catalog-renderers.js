let deps = {};

export function configureCatalogRenderers(nextDeps) {
  deps = nextDeps;
}

export function artifactCard(collection, entry) {
  const { iconFor } = deps;
  const meta = collection === "components" ? [entry.platform, componentImplementationLabel(entry)] : entry.platform;
  return cardLink(collection, entry.id, iconFor(entry), entry.title, entry.summary, meta);
}

export function cardLink(collection, id, symbol, title, summary, meta = "") {
  const { html, icon } = deps;
  const href = collection === "stack" ? "#/stack" : `#/${collection}/${id}`;
  const layerClass = collection === "stack" ? "stack-link" : collection.slice(0, -1);
  const metaItems = (Array.isArray(meta) ? meta : [meta]).filter(Boolean);
  return html`
    <a class="artifact-card ${layerClass}" href="${href}">
      <span class="card-icon">${icon(symbol)}</span>
      <span class="eyebrow card-meta-row">${metaItems.map((item) => `<span>${item}</span>`).join("")}</span>
      <h3>${title}</h3>
      <p>${summary}</p>
    </a>
  `;
}

export function groupCollection(values) {
  return values.reduce((groups, entry) => {
    const group = entry.group ?? entry.platform ?? "System";
    groups[group] ??= [];
    groups[group].push(entry);
    return groups;
  }, {});
}

export function label(key) {
  const { ui } = deps;
  return ui(`collections.${key}`) !== `collections.${key}` ? ui(`collections.${key}`) : key.charAt(0).toUpperCase() + key.slice(1);
}

export function artifactTypeLabel(collection) {
  const { collectionMeta, ui } = deps;
  const singular = collectionMeta[collection]?.singular ?? collection.replace(/s$/, "");
  return ui(`artifact.${singular.toLowerCase()}`) !== `artifact.${singular.toLowerCase()}` ? ui(`artifact.${singular.toLowerCase()}`) : singular;
}

function componentImplementationLabel(entry) {
  const { componentImplementationStatus } = deps;
  return componentImplementationStatus?.components?.[entry.id] ? "Package component" : "Candidate scope";
}
