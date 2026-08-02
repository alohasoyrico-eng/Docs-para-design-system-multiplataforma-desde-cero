export function setupCommand({ label, searchIndex, ui }) {
  const topInput = document.querySelector("#topSearch");
  const results = document.querySelector("#topSearchResults");
  if (!topInput || !results) return;
  const close = () => {
    results.hidden = true;
    results.innerHTML = "";
  };
  const renderResults = (query) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      close();
      return;
    }
    const matches = searchIndex()
      .filter((entry) => !normalized || `${entry.title} ${entry.summary} ${entry.platform} ${entry.category ?? ""}`.toLowerCase().includes(normalized))
      .slice(0, 12);
    results.hidden = false;
    results.innerHTML = matches.length === 0
      ? `<div class="search-slot__empty">${ui("shell.noSearchResults")}</div>`
      : matches
          .map((entry) => {
            const href = entry.collection === "stack" ? "#/stack" : `#/${entry.collection}/${entry.id}`;
            return `<a href="${href}"><strong>${entry.title}</strong><span>${label(entry.collection)} · ${entry.platform ?? entry.category}</span></a>`;
          })
          .join("");
    results.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  };

  topInput.addEventListener("focus", () => renderResults(topInput.value));
  topInput.addEventListener("input", () => renderResults(topInput.value));
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      topInput.focus();
    }
    if (event.key === "Escape") close();
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-slot")) close();
  });
}

export function setupMenu() {
  const button = document.querySelector("#menuButton");
  if (!button) return;
  const close = ({ restoreFocus = false } = {}) => {
    document.body.dataset.navOpen = "";
    button.setAttribute("aria-expanded", "false");
    if (restoreFocus) button.focus();
  };
  button.addEventListener("click", () => {
    const isOpen = document.body.dataset.navOpen === "true";
    document.body.dataset.navOpen = isOpen ? "" : "true";
    button.setAttribute("aria-expanded", String(!isOpen));
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-nav-close]")) {
      close({ restoreFocus: true });
      return;
    }
    if (document.body.dataset.navOpen !== "true") return;
    if (button.contains(event.target) || event.target.closest(".sidebar")) return;
    close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.dataset.navOpen === "true") {
      close({ restoreFocus: true });
    }
  });
}

export function setupTopNav({ collections, groupCollection, html, icon, iconFor, label, ui }) {
  const nav = document.querySelector("#topNav");
  if (!nav) return;
  nav.innerHTML = html`
    ${Object.entries(collections).map(([key, values]) => topNavGroup({ groupCollection, html, icon, iconFor, key, label, values })).join("")}
    <a href="#/stack">${ui("shell.stack")}</a>
  `;
}

function topNavGroup({ groupCollection, html, icon, iconFor, key, label, values }) {
  const grouped = key === "components" || key === "patterns" ? groupCollection(values) : { [label(key)]: values };
  return html`
    <details class="nav-group">
      <summary>${label(key)} <small>${values.length}</small></summary>
      <div class="nav-menu ${Object.keys(grouped).length > 1 ? "is-grouped" : ""}">
        ${Object.entries(grouped)
          .map(
            ([group, entries]) => html`
              <section>
                <strong>${group}</strong>
                ${entries.map((entry) => `<a href="#/${key}/${entry.id}">${icon(iconFor(entry))}<span>${entry.title}</span></a>`).join("")}
              </section>
            `,
          )
          .join("")}
      </div>
    </details>
  `;
}
