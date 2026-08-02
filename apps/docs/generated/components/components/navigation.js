export function createBreadcrumbs({
  items = [],
  label = "Breadcrumbs",
  variant = "standard",
  state = "default",
  density = "md",
  maxItems,
  separator = "chevron_right",
  disabled = false,
  fullWidth = false,
} = {}) {
  const resolvedVariant = ["standard", "compact", "overflow", "mobile"].includes(variant) ? variant : "standard";
  const resolvedState = disabled ? "disabled" : state;
  const sourceItems = Array.isArray(items) && items.length ? items : [{ label: "Home", href: "#" }];
  const normalizedItems = sourceItems.map((item, index) => ({
    ...item,
    current: Boolean(item.current) || index === sourceItems.length - 1,
  }));
  const visibleItems = resolveBreadcrumbItems(normalizedItems, { variant: resolvedVariant, maxItems });

  const nav = document.createElement("nav");
  nav.className = "breadcrumbs";
  nav.setAttribute("aria-label", label);
  nav.dataset.variant = resolvedVariant;
  nav.dataset.state = resolvedState;
  nav.dataset.density = density;
  if (fullWidth) nav.dataset.fullWidth = "true";
  if (disabled) nav.setAttribute("aria-disabled", "true");

  const list = document.createElement("ol");
  for (const [index, item] of visibleItems.entries()) {
    const listItem = document.createElement("li");
    listItem.className = "breadcrumbs__item";
    if (item.collapsed) {
      const collapsed = document.createElement("span");
      collapsed.className = "breadcrumbs__target breadcrumbs__target--collapsed";
      collapsed.setAttribute("aria-label", item.label ?? "Collapsed breadcrumb items");
      collapsed.textContent = "...";
      listItem.dataset.collapsed = "true";
      listItem.append(collapsed);
    } else if (item.current || disabled) {
      const current = document.createElement("span");
      current.className = "breadcrumbs__target";
      if (item.current) current.setAttribute("aria-current", "page");
      current.textContent = item.label ?? "";
      listItem.append(current);
    } else {
      const link = document.createElement("a");
      link.className = "breadcrumbs__target";
      link.href = item.href ?? "#";
      link.textContent = item.label ?? "";
      if (typeof item.onClick === "function") {
        link.addEventListener?.("click", (event) => {
          event.preventDefault?.();
          item.onClick(item);
        });
      }
      listItem.append(link);
    }
    if (index < visibleItems.length - 1) {
      const separatorNode = document.createElement("span");
      separatorNode.className = "breadcrumbs__separator";
      separatorNode.setAttribute("aria-hidden", "true");
      separatorNode.textContent = separator;
      listItem.append(separatorNode);
    }
    list.append(listItem);
  }
  nav.append(list);
  return nav;
}

function resolveBreadcrumbItems(items, { variant, maxItems } = {}) {
  if (variant === "mobile" && items.length > 2) {
    return [
      { ...items[items.length - 2], current: false },
      { ...items[items.length - 1], current: true },
    ];
  }
  const limit = Number(maxItems ?? (variant === "overflow" ? 4 : items.length));
  if (!Number.isFinite(limit) || limit < 3 || items.length <= limit) return items;
  const head = items[0];
  const tailCount = Math.max(1, limit - 2);
  const tail = items.slice(-tailCount);
  return [
    { ...head, current: false },
    { label: "Collapsed breadcrumb items", collapsed: true, current: false },
    ...tail.map((item, index) => ({ ...item, current: index === tail.length - 1 })),
  ];
}

export function createPagination({
  page = 1,
  pageCount = 1,
  label = "Pagination",
  variant = "numbered",
  state = "default",
  density = "md",
  fullWidth = false,
  disabled = false,
  onPageChange,
} = {}) {
  const totalPages = Math.max(1, Number(pageCount) || 1);
  const resolvedState = disabled ? "disabled" : state;
  const resolvedVariant = "numbered";
  let currentPage = Math.max(1, Math.min(Number(page) || 1, totalPages));
  const nav = document.createElement("nav");
  nav.className = "pagination";
  nav.setAttribute("aria-label", label);
  nav.dataset.variant = resolvedVariant;
  nav.dataset.state = resolvedState;
  nav.dataset.density = density;
  nav.dataset.page = String(currentPage);
  nav.dataset.pageCount = String(totalPages);
  if (fullWidth) nav.dataset.fullWidth = "true";
  if (disabled) nav.setAttribute("aria-disabled", "true");

  const setPage = (nextPage, notify = true) => {
    if (disabled) return;
    const normalizedPage = Math.max(1, Math.min(Number(nextPage) || 1, totalPages));
    if (normalizedPage === currentPage && notify) return;
    currentPage = normalizedPage;
    nav.dataset.page = String(currentPage);
    renderControls();
    if (notify && typeof onPageChange === "function") onPageChange(currentPage);
  };

  const renderControls = () => {
    clearNode(nav);
    const prev = createPaginationButton({
      icon: "chevron_left",
      label: "Previous page",
      kind: "prev",
      disabled: disabled || currentPage <= 1,
    });
    prev.addEventListener?.("click", () => setPage(currentPage - 1));
    nav.append(prev);

    for (const item of resolvePaginationItems(currentPage, totalPages)) {
      if (item === "...") {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination__ellipsis";
        ellipsis.setAttribute("aria-hidden", "true");
        ellipsis.textContent = "...";
        nav.append(ellipsis);
      } else {
        const pageButton = createPaginationButton({
          label: String(item),
          kind: "page",
          page: item,
          current: item === currentPage,
          disabled,
        });
        pageButton.addEventListener?.("click", () => setPage(item));
        nav.append(pageButton);
      }
    }

    const next = createPaginationButton({
      icon: "chevron_right",
      label: "Next page",
      kind: "next",
      disabled: disabled || currentPage >= totalPages,
    });
    next.addEventListener?.("click", () => setPage(currentPage + 1));
    nav.append(next);
  };

  renderControls();
  return nav;
}

function clearNode(node) {
  if (typeof node.replaceChildren === "function") {
    node.replaceChildren();
    return;
  }
  node.children = [];
  node.textContent = "";
}

function createPaginationButton({ label, icon, kind, page, current = false, disabled = false } = {}) {
  const button = document.createElement("button");
  button.className = "pagination__button";
  button.type = "button";
  button.dataset.kind = kind;
  button.dataset.state = current ? "selected" : "default";
  if (page) button.dataset.page = String(page);
  if (disabled) button.disabled = true;
  if (current) button.setAttribute("aria-current", "page");
  button.setAttribute("aria-label", kind === "page" ? `Page ${label}` : label);
  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "pagination__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = icon;
    button.append(iconNode);
  } else {
    button.textContent = label;
  }
  return button;
}

function resolvePaginationItems(page, pages) {
  const items = [];
  for (let index = 1; index <= pages; index += 1) {
    if (index === 1 || index === pages || Math.abs(index - page) <= 1) {
      items.push(index);
    } else if (items[items.length - 1] !== "...") {
      items.push("...");
    }
  }
  return items;
}

export function createStepper({
  steps = [],
  current = 0,
  label = "Progress",
  orientation = "horizontal",
  density = "md",
} = {}) {
  const resolvedOrientation = orientation === "vertical" ? "vertical" : "horizontal";
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const resolvedSteps = Array.isArray(steps) && steps.length ? steps : [{ label: "Step 1" }];
  const currentIndex = Math.max(0, Math.min(Number(current) || 0, resolvedSteps.length - 1));
  const stepper = document.createElement("ol");
  stepper.className = "stepper";
  stepper.setAttribute("aria-label", label);
  stepper.dataset.orientation = resolvedOrientation;
  stepper.dataset.density = resolvedDensity;
  stepper.dataset.current = String(currentIndex);
  for (const [index, step] of resolvedSteps.entries()) {
    const item = document.createElement("li");
    item.className = "stepper__item";
    const state = index < currentIndex ? "complete" : index === currentIndex ? "active" : "pending";
    item.dataset.state = state;
    if (index === currentIndex) item.setAttribute("aria-current", "step");
    const marker = document.createElement("span");
    marker.className = "stepper__marker";
    marker.setAttribute("aria-hidden", "true");
    marker.textContent = state === "complete" ? "check" : String(index + 1);
    const text = document.createElement("span");
    text.className = "stepper__text";
    const title = document.createElement("strong");
    title.textContent = step.label ?? `Step ${index + 1}`;
    text.append(title);
    if (step.description) {
      const description = document.createElement("small");
      description.textContent = step.description;
      text.append(description);
    }
    item.append(marker, text);
    stepper.append(item);
    if (index < resolvedSteps.length - 1) {
      const connector = document.createElement("span");
      connector.className = "stepper__connector";
      connector.dataset.state = index < currentIndex ? "complete" : "pending";
      connector.setAttribute("aria-hidden", "true");
      stepper.append(connector);
    }
  }
  return stepper;
}
