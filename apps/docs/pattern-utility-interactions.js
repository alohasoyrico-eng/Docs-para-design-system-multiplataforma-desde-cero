export function setupUtilityPatternInteractions() {
  document.addEventListener("click", handleUtilityPatternClick);
  document.addEventListener("input", handleUtilityPatternInput);
}

function handleUtilityPatternClick(event) {
  const applyRange = event.target.closest("[data-date-range-apply]");
  if (applyRange) return applyDateRange(applyRange.closest("[data-date-range-demo]"));

  const resetRange = event.target.closest("[data-date-range-reset]");
  if (resetRange) return resetDateRange(resetRange.closest("[data-date-range-demo]"));

  const snackbarAdd = event.target.closest("[data-snackbar-add]");
  if (snackbarAdd) return showSnackbar(snackbarAdd.closest("[data-snackbar-demo]"), snackbarAdd.dataset.snackbarAdd);

  const timelineFilter = event.target.closest("[data-timeline-filter]");
  if (timelineFilter) return filterTimeline(timelineFilter.closest("[data-timeline-demo]"), timelineFilter.dataset.timelineFilter);

  const refresh = event.target.closest("[data-pull-refresh-action]");
  if (refresh) return runPullRefresh(refresh.closest("[data-pull-refresh-demo]"));

  const avatarToggle = event.target.closest("[data-avatar-group-toggle]");
  if (avatarToggle) return toggleUtilityHidden(avatarToggle.closest("[data-avatar-group-demo]"), "[data-avatar-group-detail]");

  const transferMove = event.target.closest("[data-transfer-move]");
  if (transferMove) return moveTransferItem(transferMove.closest("[data-transfer-demo]"));

  const sortUp = event.target.closest("[data-sortable-up]");
  if (sortUp) return moveSortableItem(sortUp.closest("li"), -1);

  const sortDown = event.target.closest("[data-sortable-down]");
  if (sortDown) return moveSortableItem(sortDown.closest("li"), 1);
}

function handleUtilityPatternInput(event) {
  const rangeField = event.target.closest("[data-date-range-start], [data-date-range-end]");
  if (rangeField) rangeField.closest("[data-date-range-demo]")?.querySelector("[data-date-range-validation]")?.setAttribute("hidden", "");
}

function applyDateRange(demo) {
  if (!demo) return;
  const start = demo.querySelector("[data-date-range-start] input")?.value ?? "";
  const end = demo.querySelector("[data-date-range-end] input")?.value ?? "";
  const invalid = Boolean(start && end && start > end);
  demo.querySelector("[data-date-range-validation]")?.toggleAttribute("hidden", !invalid);
  demo.querySelector("[data-date-range-toast]")?.toggleAttribute("hidden", invalid);
}

function resetDateRange(demo) {
  if (!demo) return;
  const start = demo.querySelector("[data-date-range-start] input");
  const end = demo.querySelector("[data-date-range-end] input");
  if (start) start.value = "2026-07-01";
  if (end) end.value = "2026-07-15";
  demo.querySelector("[data-date-range-validation]")?.setAttribute("hidden", "");
  demo.querySelector("[data-date-range-toast]")?.setAttribute("hidden", "");
}

function showSnackbar(demo, key) {
  if (!demo) return;
  demo.querySelector("[data-snackbar-empty]")?.setAttribute("hidden", "");
  demo.querySelector(`[data-snackbar-item="${key}"]`)?.removeAttribute("hidden");
  const visible = demo.querySelectorAll("[data-snackbar-item]:not([hidden])").length;
  const count = demo.querySelector("[data-snackbar-count]");
  if (count) {
    count.textContent = `${visible} queued`;
    count.setAttribute("aria-label", `${visible} feedback messages queued`);
  }
}

function filterTimeline(demo, filter) {
  if (!demo) return;
  let visible = 0;
  demo.querySelectorAll("[data-timeline-event]").forEach((event) => {
    const match = filter === "all" || event.dataset.timelineEvent === filter;
    event.hidden = !match;
    visible += match ? 1 : 0;
  });
  demo.querySelector("[data-timeline-empty]")?.toggleAttribute("hidden", visible > 0);
  const count = demo.querySelector("[data-timeline-count]");
  if (count) {
    count.textContent = `${visible} ${visible === 1 ? "event" : "events"}`;
    count.setAttribute("aria-label", `${visible} visible timeline ${visible === 1 ? "event" : "events"}`);
  }
}

function runPullRefresh(demo) {
  if (!demo) return;
  demo.querySelector("[data-pull-refresh-progress]")?.removeAttribute("hidden");
  demo.querySelector("[data-pull-refresh-toast]")?.removeAttribute("hidden");
}

function toggleUtilityHidden(demo, selector) {
  const node = demo?.querySelector(selector);
  if (node) node.hidden = !node.hidden;
}

function moveTransferItem(demo) {
  if (!demo) return;
  demo.querySelector("[data-transfer-selected]").innerHTML = `<strong>JMX-214-B</strong><span>Ana Sosa - Active</span>`;
  const count = demo.querySelector("[data-transfer-count]");
  if (count) {
    count.textContent = "1 selected";
    count.setAttribute("aria-label", "1 selected vehicle");
  }
}

function moveSortableItem(item, direction) {
  if (!item) return;
  const sibling = direction < 0 ? item.previousElementSibling : item.nextElementSibling;
  if (!sibling) return;
  if (direction < 0) item.parentNode.insertBefore(item, sibling);
  else item.parentNode.insertBefore(sibling, item);
  item.closest("[data-sortable-demo]")?.querySelector("[data-sortable-toast]")?.removeAttribute("hidden");
}
