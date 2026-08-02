export function setupDesktopTemplateInteractions() {
  document.addEventListener("click", handleDesktopTemplateClick);
}

function handleDesktopTemplateClick(event) {
  const openFullscreen = event.target.closest("[data-template-fullscreen-open]");
  if (openFullscreen) return openTemplateFullscreen(openFullscreen.closest(".template-desktop-panel"));

  const closeFullscreen = event.target.closest("[data-template-fullscreen-close]");
  if (closeFullscreen) return closeTemplateFullscreen(closeFullscreen.closest(".template-desktop-panel"));

  const section = event.target.closest("[data-template-section]");
  if (section) return activateTemplateSection(section);

  const roleControl = event.target.closest("[data-config-role-control] [data-key]");
  if (roleControl) return setConfigurationRole(roleControl.closest("[data-template-desktop]"), roleControl.dataset.key);

  const dirtyControl = event.target.closest("[data-config-dirty-control]");
  if (dirtyControl) return markConfigurationDirty(dirtyControl.closest("[data-template-desktop]"), dirtyControl.dataset.configControlLabel ?? "Configuration changed");

  const lifecycleAction = event.target.closest("[data-config-lifecycle-action]");
  if (lifecycleAction) return addConfigurationAuditEvent(lifecycleAction.closest("[data-template-desktop]"), lifecycleAction.dataset.configLifecycleAction);

  const domain = event.target.closest("[data-dashboard-domain]");
  if (domain) return switchDashboardDomain(domain);

  const action = event.target.closest("[data-template-export], [data-template-apply], [data-template-save]");
  if (action) {
    const demo = action.closest("[data-template-desktop]");
    if (action.matches("[data-template-save]")) addConfigurationAuditEvent(demo, "Review saved");
    demo?.querySelector("[data-template-feedback]")?.removeAttribute("hidden");
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".template-desktop-panel").forEach(closeTemplateFullscreen);
});

document.addEventListener("input", (event) => {
  const search = event.target.closest("[data-template-search]");
  if (search) filterTemplateModules(search.closest("[data-template-desktop]"), search.value);
});

function openTemplateFullscreen(panel) {
  const fullscreen = panel?.querySelector("[data-template-fullscreen]");
  if (!fullscreen) return;
  fullscreen.hidden = false;
  document.body.classList.add("template-fullscreen-active");
  fullscreen.querySelector("[data-template-fullscreen-close]")?.focus();
}

function closeTemplateFullscreen(panel) {
  const fullscreen = panel?.querySelector("[data-template-fullscreen]");
  if (!fullscreen || fullscreen.hidden) return;
  fullscreen.hidden = true;
  document.body.classList.remove("template-fullscreen-active");
  panel.querySelector("[data-template-fullscreen-open]")?.focus();
}

function pressSiblingButtons(button) {
  button.parentElement?.querySelectorAll("button[aria-pressed]").forEach((item) => {
    item.setAttribute("aria-pressed", String(item === button));
  });
}

function activateTemplateSection(section) {
  const container = section.closest("[data-pattern-renderer='sidebar'], .template-dashboard-switcher") ?? section.parentElement;
  container?.querySelectorAll("[data-template-section]").forEach((item) => {
    item.classList.toggle("active", item === section);
    if (item === section) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
    if (item.matches("button[aria-pressed]")) item.setAttribute("aria-pressed", String(item === section));
  });
  const demo = section.closest("[data-template-desktop]");
  const panel = section.dataset.templateSection;
  if (!demo || !panel) return;
  demo.querySelectorAll("[data-template-panel]").forEach((item) => {
    item.hidden = item.dataset.templatePanel !== panel;
  });
  const panelGrid = demo.querySelector("[data-config-panel-grid]");
  if (panelGrid) panelGrid.hidden = panel === "audit";
  if (panel === "audit") demo.querySelector("[data-template-panel='audit']")?.removeAttribute("hidden");
}

function switchDashboardDomain(button) {
  pressSiblingButtons(button);
  const demo = button.closest("[data-template-desktop]");
  const title = demo?.querySelector("[data-dashboard-title]");
  if (title) title.textContent = `${button.textContent.trim()} drill-down`;
  const visibleTitle = demo?.querySelector("[data-dashboard-title-card] .card__title");
  if (visibleTitle) visibleTitle.textContent = `${button.textContent.trim()} drill-down`;
}

function setConfigurationRole(demo, role) {
  if (!demo) return;
  demo.dataset.configRole = role;
  const readOnly = role === "audit-viewer";
  demo.querySelector("[data-config-permission-message]")?.toggleAttribute("hidden", !readOnly);
  demo.querySelectorAll("[data-template-save], [data-config-lifecycle-action]").forEach((control) => {
    control.toggleAttribute("disabled", readOnly);
    control.setAttribute("aria-disabled", String(readOnly));
  });
  addConfigurationAuditEvent(demo, `Role mode changed to ${role.replace(/-/g, " ")}`);
}

function markConfigurationDirty(demo, label) {
  if (!demo) return;
  demo.dataset.configDirty = "true";
  const badge = demo.querySelector("[data-config-pending-badge]");
  if (badge) badge.textContent = "25 pending changes";
  addConfigurationAuditEvent(demo, label);
}

function addConfigurationAuditEvent(demo, label = "Configuration changed") {
  if (!demo) return;
  const log = demo.querySelector("[data-config-audit-log]");
  if (!log) return;
  const event = document.createElement("article");
  event.className = "audit-event docs-package-demo";
  event.dataset.componentSource = "package";
  event.dataset.docComponent = "audit-event";
  event.innerHTML = `<span class="audit-event__icon" aria-hidden="true">manage_history</span><div class="audit-event__content"><strong>${label}</strong><p>Action captured by Configuration Console.</p><small>Just now - Admin</small></div><em>Logged</em>`;
  log.prepend(event);
}

function filterTemplateModules(demo, query = "") {
  if (!demo) return;
  const value = query.trim().toLowerCase();
  demo.querySelectorAll("[data-template-panel]").forEach((panel) => {
    if (!value) {
      panel.removeAttribute("data-search-hidden");
      return;
    }
    panel.toggleAttribute("data-search-hidden", !panel.textContent.toLowerCase().includes(value));
  });
}
