let translate = (key) => key;

function syncBrandLogo() {
  const logo = document.querySelector(".brand img");
  if (!logo) return;
  logo.dataset.defaultSrc ||= logo.getAttribute("src") || "";
  const isQuiet = document.body.dataset.contrast === "quiet";
  logo.src = isQuiet ? logo.dataset.quietSrc : logo.dataset.defaultSrc;
}

export function setupContrastToggle() {
  syncBrandLogo();
  document.querySelector("#themeToggle")?.addEventListener("click", () => {
    const willQuiet = document.body.dataset.contrast !== "quiet";
    document.body.dataset.contrast = willQuiet ? "quiet" : "";
    document.querySelector("#themeToggle")?.setAttribute("aria-pressed", String(willQuiet));
    syncBrandLogo();
  });
}

function activeFrameTier() {
  if (window.innerWidth >= 992) return { id: "lg", label: translate("grid.desktop"), columns: 12 };
  if (window.innerWidth >= 576) return { id: "md", label: translate("grid.tablet"), columns: 6 };
  return { id: "sm", label: translate("grid.mobile"), columns: 1 };
}

function pxValue(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function resolvedCssLength(value) {
  const probe = document.createElement("span");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.inlineSize = value;
  document.body.append(probe);
  const width = getComputedStyle(probe).inlineSize;
  probe.remove();
  return width;
}

function frameOverlayTarget() {
  const selectors = [".detail-layout", ".hero", ".page-hero", ".reference-doc", ".section > :not(.section-head)", ".content-shell"];
  return selectors.map((selector) => document.querySelector(selector)).find((node) => node?.getBoundingClientRect().width > 0);
}

export function updateGridOverlay() {
  const overlay = document.querySelector("#layoutGridOverlay");
  if (!overlay || overlay.hidden) return;
  const target = frameOverlayTarget();
  if (!target) return;

  const tier = activeFrameTier();
  const rect = target.getBoundingClientRect();
  const outerRect = document.querySelector(".content-shell")?.getBoundingClientRect();
  const rootStyles = getComputedStyle(document.documentElement);
  const left = Math.max(0, Math.round(rect.left));
  const right = Math.max(0, Math.round(window.innerWidth - rect.right));
  const outerLeft = Math.max(0, Math.round(outerRect?.left ?? 0));
  const outerRight = Math.min(window.innerWidth, Math.round(outerRect?.right ?? window.innerWidth));
  const topbar = document.querySelector(".topbar")?.getBoundingClientRect();
  const top = Math.round(topbar?.bottom ?? 0);
  const columnRoot = overlay.querySelector(".layout-grid-overlay__columns");
  const info = overlay.querySelector(".layout-grid-overlay__info");
  const columnsToken = rootStyles.getPropertyValue("--frame-grid-columns").trim();
  const gutterToken = rootStyles.getPropertyValue("--frame-grid-gutter").trim();
  const marginToken = rootStyles.getPropertyValue("--frame-grid-margin").trim();
  const columns = Number.parseInt(columnsToken, 10) || tier.columns;
  const margin = pxValue(resolvedCssLength(marginToken));
  const columnLeft = left + margin;
  const columnWidth = Math.max(0, Math.round(rect.width - margin * 2));

  overlay.style.setProperty("--frame-grid-overlay-left", `${left}px`);
  overlay.style.setProperty("--frame-grid-overlay-right", `${right}px`);
  overlay.style.setProperty("--frame-grid-overlay-outer-left", `${outerLeft}px`);
  overlay.style.setProperty("--frame-grid-overlay-outer-right", `${outerRight}px`);
  overlay.style.setProperty("--frame-grid-overlay-column-left", `${Math.round(columnLeft)}px`);
  overlay.style.setProperty("--frame-grid-overlay-column-width", `${columnWidth}px`);
  overlay.style.setProperty("--frame-grid-overlay-margin", marginToken);
  const gutter = resolvedCssLength(gutterToken);
  overlay.style.setProperty("--frame-grid-overlay-gap", gutterToken);
  overlay.style.setProperty("--frame-grid-overlay-columns", String(columns));
  overlay.style.setProperty("--frame-grid-overlay-top", `${top}px`);

  if (columnRoot) {
    columnRoot.innerHTML = Array.from({ length: columns }, () => `<span class="layout-grid-overlay__column"></span>`).join("");
  }
  if (info) {
    info.textContent = `${tier.label} · ${translate("grid.pageGrid")} · ${columns} ${columns === 1 ? translate("grid.column") : translate("grid.columns")} · ${translate("grid.gutter")} ${gutter}`;
  }
}

export function setupGridOverlay(options = {}) {
  translate = options.ui ?? translate;
  document.querySelector("#gridToggle")?.addEventListener("click", (event) => {
    const overlay = document.querySelector("#layoutGridOverlay");
    if (!overlay) return;
    const willShow = overlay.hidden;
    overlay.hidden = !willShow;
    event.currentTarget.setAttribute("aria-pressed", String(willShow));
    event.currentTarget.setAttribute("aria-label", willShow ? translate("shell.hideGrid") : translate("shell.showGrid"));
    const iconNode = event.currentTarget.querySelector(".material-symbol");
    if (iconNode) {
      const iconName = willShow ? "grid_on" : "grid_off";
      iconNode.textContent = iconName;
      iconNode.dataset.icon = iconName;
    }
    updateGridOverlay();
  });
  window.addEventListener("resize", () => requestAnimationFrame(updateGridOverlay));
  window.addEventListener("hashchange", () => requestAnimationFrame(() => requestAnimationFrame(updateGridOverlay)));
}
