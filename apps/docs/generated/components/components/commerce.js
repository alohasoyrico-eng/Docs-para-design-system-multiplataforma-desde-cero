import { createButton, createIconButton } from "./actions.js?v=2";
import { createSpinner } from "./feedback.js?v=8";
import { createBadge } from "./status.js?v=2";
import { createChartsPrimitive } from "../primitives/charts.js?v=1";
import { setIconGlyph } from "../primitives/iconography.js?v=1";

function createChartSvg(tagName) {
  return document.createElementNS?.("http://www.w3.org/2000/svg", tagName) ?? document.createElement(tagName);
}

function setChartAttrs(node, attrs = {}) {
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  return node;
}

function setChartClass(node, className) {
  if (typeof node.className === "string") node.className = className;
  node.setAttribute?.("class", className);
  return node;
}

export function createTable({
  columns = [],
  rows = [],
  rowKey = "id",
  label = "Table",
  variant = "standard",
  state = "default",
  density = "md",
  dense = false,
  sortKey = "",
  sortDir = "ascending",
  selectedKey = "",
  expandedKey = "",
  renderDetail,
  onSortChange,
  onRowSelect,
  onExpandedChange,
} = {}) {
  const validVariants = new Set(["standard", "dense", "sortable", "selectable", "expandable"]);
  const validStates = new Set(["default", "hover", "focus", "selected", "sorted", "expanded"]);
  const resolvedVariant = validVariants.has(variant) ? variant : "standard";
  const resolvedState = validStates.has(state) ? state : "default";
  const resolvedDensity = dense || resolvedVariant === "dense" ? "sm" : ["sm", "md", "lg"].includes(density) ? density : "md";
  const sortable = resolvedVariant === "sortable" || columns.some((column) => column.sortable);
  const selectable = resolvedVariant === "selectable" || Boolean(onRowSelect || selectedKey);
  const expandable = resolvedVariant === "expandable" || Boolean(renderDetail || expandedKey);
  const root = document.createElement("div");
  root.className = "table";
  root.dataset.variant = resolvedVariant;
  root.dataset.state = resolvedState;
  root.dataset.density = resolvedDensity;
  const table = document.createElement("table");
  table.setAttribute("aria-label", label);
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  const sortHeaders = [];
  let currentSortKey = sortKey;
  let currentSortDir = sortDir;
  let currentRows = [...rows];
  let currentExpandedKey = expandedKey || (resolvedState === "expanded" ? String(rows[0]?.[rowKey] ?? "") : "");
  const getSortValue = (row, column) => {
    if (typeof column.sortValue === "function") return column.sortValue(row);
    return row[column.key];
  };
  const sortRows = () => {
    if (!currentSortKey) return [...rows];
    const column = columns.find((item) => item.key === currentSortKey);
    if (!column) return [...rows];
    const direction = currentSortDir === "descending" ? -1 : 1;
    return [...rows].sort((a, b) => {
      const va = getSortValue(a, column);
      const vb = getSortValue(b, column);
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * direction;
      return String(va).localeCompare(String(vb), "en") * direction;
    });
  };
  const renderCellValue = (td, row, column) => {
    const value = typeof column.render === "function" ? column.render(row) : row[column.key];
    if (value?.nodeType) {
      td.append(value);
      return;
    }
    if (value && typeof value === "object" && "label" in value) {
      td.append(createBadge({ label: value.label, tone: value.tone ?? "neutral", variant: value.variant ?? "status", icon: value.icon ?? "" }));
      return;
    }
    td.textContent = value ?? "";
  };
  const syncExpandedRows = () => {
    for (const rowNode of bodyRows) {
      const open = currentExpandedKey === rowNode.dataset.key;
      rowNode.setAttribute("aria-expanded", String(open));
      const expander = rowNode.querySelector(".table__expander");
      if (expander) {
        expander.setAttribute("aria-expanded", String(open));
        expander.setAttribute("aria-label", `${open ? "Collapse" : "Expand"} ${rowNode.dataset.label ?? rowNode.dataset.key}`);
      }
      const detailRow = bodyDetails.find((item) => item.row === rowNode)?.detail;
      if (String(detailRow?.className ?? "").includes("table__detail-row")) detailRow.hidden = !open;
    }
  };
  const renderBody = () => {
    tbody.textContent = "";
    bodyRows.length = 0;
    bodyDetails.length = 0;
    currentRows = sortRows();
    for (const [index, row] of currentRows.entries()) {
      const tr = document.createElement("tr");
      const key = row[rowKey];
      const keyString = String(key);
      const rowSelected = selectedKey ? key === selectedKey : resolvedState === "selected" && index === 1;
      const rowInteractive = selectable || expandable;
      tr.dataset.key = keyString;
      tr.dataset.label = row.label ?? row.plate ?? keyString;
      tr.dataset.selected = String(rowSelected);
      if (resolvedState === "hover" && index === 0) tr.dataset.state = "hover";
      if (resolvedState === "focus" && index === 0) tr.dataset.state = "focus";
      if (rowInteractive) {
        tr.tabIndex = 0;
        tr.addEventListener?.("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault?.();
          if (expandable) toggleExpanded(keyString);
          else selectRow(keyString);
        });
      }
      if (selectable) tr.addEventListener?.("click", () => selectRow(keyString));
      if (expandable) tr.setAttribute("aria-expanded", String(currentExpandedKey === keyString));
      if (expandable) {
        const expanderCell = document.createElement("td");
        expanderCell.className = "table__expander-cell";
        const expander = document.createElement("button");
        expander.type = "button";
        expander.className = "table__expander";
        expander.setAttribute("data-table-expand", "");
        expander.setAttribute("aria-label", `${currentExpandedKey === keyString ? "Collapse" : "Expand"} ${row.label ?? row.plate ?? keyString}`);
        expander.setAttribute("aria-expanded", String(currentExpandedKey === keyString));
        expander.textContent = "chevron_right";
        expander.addEventListener?.("click", (event) => {
          event.stopPropagation?.();
          toggleExpanded(keyString);
        });
        expanderCell.append(expander);
        tr.append(expanderCell);
      }
      for (const column of columns) {
        const td = document.createElement("td");
        if (column.align) td.dataset.align = column.align;
        if (column.mono) td.dataset.mono = "true";
        if (column.priority) td.dataset.priority = column.priority;
        renderCellValue(td, row, column);
        tr.append(td);
      }
      bodyRows.push(tr);
      tbody.append(tr);
      if (expandable) {
        const detailRow = document.createElement("tr");
        detailRow.className = "table__detail-row";
        detailRow.hidden = currentExpandedKey !== keyString;
        const detailCell = document.createElement("td");
        detailCell.colSpan = columns.length + 1;
        detailCell.className = "table__detail";
        const renderedDetail = typeof renderDetail === "function" ? renderDetail(row) : row.detail;
        if (renderedDetail?.nodeType) detailCell.append(renderedDetail);
        else detailCell.textContent = renderedDetail ?? "Recent activity and supporting row detail.";
        detailRow.append(detailCell);
        tbody.append(detailRow);
        bodyDetails.push({ row: tr, detail: detailRow });
      }
    }
  };
  const updateSortState = (nextKey) => {
    currentSortDir = currentSortKey === nextKey && currentSortDir !== "descending" ? "descending" : "ascending";
    currentSortKey = nextKey;
    for (const { th, button, key } of sortHeaders) {
      const active = key === currentSortKey;
      th.setAttribute("aria-sort", active ? currentSortDir : "none");
      button.dataset.active = String(active);
      button.dataset.dir = active && currentSortDir === "descending" ? "desc" : "asc";
    }
    root.dataset.state = "sorted";
    renderBody();
    if (typeof onSortChange === "function") onSortChange({ key: currentSortKey, direction: currentSortDir });
  };
  const bodyRows = [];
  const bodyDetails = [];
  const selectRow = (rowKeyValue) => {
    for (const rowNode of bodyRows) rowNode.dataset.selected = String(rowNode.dataset.key === String(rowKeyValue));
    if (typeof onRowSelect === "function") onRowSelect(rowKeyValue);
  };
  const toggleExpanded = (rowKeyValue) => {
    currentExpandedKey = currentExpandedKey === String(rowKeyValue) ? "" : String(rowKeyValue);
    root.dataset.state = currentExpandedKey ? "expanded" : "default";
    syncExpandedRows();
    if (typeof onExpandedChange === "function") onExpandedChange(currentExpandedKey);
  };
  if (expandable) {
    const th = document.createElement("th");
    th.scope = "col";
    th.className = "table__expander-head";
    th.textContent = "";
    headRow.append(th);
  }
  for (const column of columns) {
    const th = document.createElement("th");
    th.scope = "col";
    if (column.align) th.dataset.align = column.align;
    if (column.priority) th.dataset.priority = column.priority;
    if (column.sortable || (sortable && column.key === currentSortKey)) {
      th.setAttribute("aria-sort", sortKey === column.key ? sortDir : "none");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "table__sort";
      button.setAttribute("data-table-sort", "");
      const labelNode = document.createElement("span");
      labelNode.textContent = column.label ?? column.key ?? "";
      button.append(labelNode);
      button.dataset.active = String(sortKey === column.key);
      button.dataset.dir = sortKey === column.key && sortDir === "descending" ? "desc" : "asc";
      button.addEventListener?.("click", () => updateSortState(column.key));
      sortHeaders.push({ th, button, key: column.key });
      th.append(button);
    } else {
      th.textContent = column.label ?? column.key ?? "";
    }
    headRow.append(th);
  }
  thead.append(headRow);
  const tbody = document.createElement("tbody");
  renderBody();
  table.append(thead, tbody);
  root.append(table);
  return root;
}

export function createChartPanel({
  label,
  value = "",
  caption = "",
  values = [],
  valueLabels = [],
  labels = [],
  series = [],
  comparisons = [],
  segments = [],
  variant = "sparkline",
  state = "default",
  tone = "info",
  density = "md",
  fullWidth = false,
} = {}) {
  const chartValues = values.length ? values.map(Number) : [32, 54, 48, 70, 62, 84];
  const safeValues = chartValues.map((item) => (Number.isFinite(item) ? Math.max(0, item) : 0));
  const chartSeries = series
    .map((item, index) => ({
      label: item.label ?? `Series ${index + 1}`,
      values: Array.isArray(item.values) ? item.values.map(Number).map((seriesValue) => (Number.isFinite(seriesValue) ? Math.max(0, seriesValue) : 0)) : [],
    }))
    .filter((item) => item.values.length);
  const comparisonSeries = comparisons.length
    ? comparisons
    : chartSeries.length >= 2
      ? chartSeries
      : [
          { label: "Previous", values: safeValues.map((item) => Math.round(item * 0.78)) },
          { label: "Current", values: safeValues },
        ];
  const allValues = chartSeries.length ? chartSeries.flatMap((item) => item.values) : safeValues;
  const max = Math.max(...allValues, 1);
  const variantAlias = variant === "bar" ? "bars" : variant;
  const resolvedVariant = ["sparkline", "bars", "line", "area", "donut", "pareto", "bullet", "comparison", "compact"].includes(variantAlias) ? variantAlias : "sparkline";
  const chartPrimitive = createChartsPrimitive({
    type: resolvedVariant,
    label,
    value,
    caption,
    values: safeValues,
    labels,
    segments,
    series: chartSeries,
    comparisons: comparisonSeries,
  });
  const panel = document.createElement("article");
  panel.className = "chart-panel";
  panel.dataset.chartPrimitive = "charts";
  panel.dataset.chartEngine = "echarts-option";
  panel.dataset.variant = resolvedVariant;
  panel.dataset.state = state;
  panel.dataset.tone = tone;
  panel.dataset.density = density;
  panel.dataset.fullWidth = String(Boolean(fullWidth));
  const header = document.createElement("header");
  const title = document.createElement("strong");
  title.textContent = label ?? "Chart";
  header.append(title);
  if (value) {
    const output = document.createElement("output");
    output.textContent = value;
    header.append(output);
  }
  panel.append(header);

  const figure = document.createElement("figure");
  figure.setAttribute("role", "group");
  figure.setAttribute("aria-label", chartPrimitive.textSummary);
  const plot = document.createElement("div");
  plot.className = "chart-panel__plot";
  plot.setAttribute("role", "list");
  const tooltip = document.createElement("span");
  tooltip.className = "chart-panel__tooltip";
  tooltip.setAttribute("role", "status");
  tooltip.setAttribute("aria-live", "polite");
  const hideTooltip = () => {
    tooltip.dataset.visible = "false";
  };
  const showTooltip = ({ label: pointLabel, value: pointValue, series: pointSeries = "" }, target) => {
    tooltip.textContent = [pointLabel, pointSeries, pointValue].filter(Boolean).join(" · ");
    tooltip.dataset.visible = "true";
    if (!target?.style) return;
    const targetBox = target.getBoundingClientRect?.();
    const plotBox = plot.getBoundingClientRect?.();
    if (targetBox && plotBox) {
      const x = Math.max(12, Math.min(plotBox.width - 12, targetBox.left + targetBox.width / 2 - plotBox.left));
      const y = Math.max(12, targetBox.top - plotBox.top);
      tooltip.style = `--chart-tooltip-x: ${Math.round(x)}px; --chart-tooltip-y: ${Math.round(y)}px;`;
    }
  };
  const makeInteractiveMark = (node, data) => {
    node.tabIndex = 0;
    node.setAttribute?.("tabindex", "0");
    node.dataset.interactive = "true";
    node.dataset.tooltip = [data.label, data.series, data.value].filter(Boolean).join(" · ");
    node.setAttribute("role", "listitem");
    node.setAttribute("aria-label", [data.label, data.series, data.value].filter(Boolean).join(", "));
    node.addEventListener?.("mouseenter", () => showTooltip(data, node));
    node.addEventListener?.("mouseover", () => showTooltip(data, node));
    node.addEventListener?.("pointerenter", () => showTooltip(data, node));
    node.addEventListener?.("focus", () => showTooltip(data, node));
    node.addEventListener?.("mouseleave", hideTooltip);
    node.addEventListener?.("mouseout", hideTooltip);
    node.addEventListener?.("pointerleave", hideTooltip);
    node.addEventListener?.("blur", hideTooltip);
    return node;
  };
  const appendBars = () => {
    const barMax = Math.max(...safeValues, 1);
    for (const [index, rawValue] of safeValues.entries()) {
      const group = document.createElement("span");
      group.className = "chart-panel__bar-group";
      const valueNode = document.createElement("small");
      valueNode.textContent = valueLabels[index] ?? String(rawValue);
      const bar = document.createElement("i");
      bar.className = "chart-panel__bar";
      const percent = Math.round((Number(rawValue) / barMax) * 100);
      bar.style = `--chart-value: ${percent}%; --chart-index: ${index};`;
      bar.dataset.value = String(rawValue);
      bar.dataset.max = String(rawValue === barMax);
      const labelNode = document.createElement("em");
      labelNode.textContent = labels[index] ?? `V${index + 1}`;
      group.setAttribute("title", `${labels[index] ?? `Value ${index + 1}`}: ${valueLabels[index] ?? rawValue}`);
      makeInteractiveMark(group, { label: labels[index] ?? `Value ${index + 1}`, value: valueLabels[index] ?? rawValue });
      group.append(valueNode, bar, labelNode);
      plot.append(group);
    }
  };
  const appendLine = ({ area = false } = {}) => {
    const width = 280;
    const height = resolvedVariant === "compact" || resolvedVariant === "sparkline" ? 72 : 112;
    const pad = 8;
    const lineSeries = chartSeries.length ? chartSeries : [{ label: label ?? "Chart", values: safeValues }];
    const lineValues = lineSeries.flatMap((item) => item.values);
    const lineMax = Math.max(...lineValues, 1);
    const min = Math.min(...lineValues, 0);
    const span = max - min || 1;
    const point = (rawValue, index, count) => {
      const x = count <= 1 ? width / 2 : pad + (index / (count - 1)) * (width - pad * 2);
      const y = pad + (1 - ((rawValue - min) / (lineMax - min || 1))) * (height - pad * 2);
      return { x, y };
    };
    const svg = setChartAttrs(createChartSvg("svg"), {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: "none",
      focusable: "false",
    });
    setChartClass(svg, "chart-panel__svg");
    if (resolvedVariant === "line") {
      for (const fraction of [0.33, 0.66]) {
        const line = setChartAttrs(createChartSvg("line"), {
          x1: pad,
          x2: width - pad,
          y1: height * fraction,
          y2: height * fraction,
        });
        setChartClass(line, "chart-panel__grid-line");
        svg.append(line);
      }
    }
    const primaryPoints = lineSeries[0]?.values.map((item, index) => point(item, index, lineSeries[0].values.length)) ?? [];
    if (area && primaryPoints.length) {
      const polygon = setChartAttrs(createChartSvg("polygon"), {
        points: `${pad},${height - pad} ${primaryPoints.map((item) => `${item.x},${item.y}`).join(" ")} ${width - pad},${height - pad}`,
      });
      setChartClass(polygon, "chart-panel__area");
      svg.append(polygon);
    }
    lineSeries.slice(0, 3).forEach((seriesItem, seriesIndex) => {
      const points = seriesItem.values.map((item, index) => point(item, index, seriesItem.values.length));
      const polyline = setChartAttrs(createChartSvg("polyline"), {
        points: points.map((item) => `${item.x},${item.y}`).join(" "),
      });
      setChartClass(polyline, "chart-panel__line");
      polyline.dataset.series = String(seriesIndex + 1);
      svg.append(polyline);
      if (points.length) {
        const last = points[points.length - 1];
        const dot = setChartAttrs(createChartSvg("circle"), {
          cx: last.x,
          cy: last.y,
          r: resolvedVariant === "sparkline" ? 4 : 5,
        });
        setChartClass(dot, "chart-panel__dot");
        dot.dataset.series = String(seriesIndex + 1);
        svg.append(dot);
      }
      points.forEach((item, pointIndex) => {
        const hit = setChartAttrs(createChartSvg("circle"), {
          cx: item.x,
          cy: item.y,
          r: 10,
        });
        setChartClass(hit, "chart-panel__hit-dot");
        hit.dataset.series = String(seriesIndex + 1);
        hit.setAttribute("style", `--chart-index: ${pointIndex};`);
        makeInteractiveMark(hit, {
          label: labels[pointIndex] ?? `Value ${pointIndex + 1}`,
          series: lineSeries.length > 1 ? seriesItem.label : "",
          value: valueLabels[pointIndex] ?? seriesItem.values[pointIndex],
        });
        svg.append(hit);
      });
    });
    plot.append(svg);
  };
  const appendDonut = () => {
    const donutSegments = segments.length ? segments : safeValues.map((item, index) => ({ label: labels[index] ?? `Segment ${index + 1}`, value: item }));
    const total = donutSegments.reduce((sum, item) => sum + Number(item.value || 0), 0) || 1;
    let cursor = 0;
    const stops = donutSegments.map((item, index) => {
      const start = cursor;
      const end = cursor + (Number(item.value || 0) / total) * 100;
      cursor = end;
      return `var(--chart-segment-${(index % 5) + 1}) ${start}% ${end}%`;
    }).join(", ");
    const donut = document.createElement("span");
    donut.className = "chart-panel__donut";
    donut.style = `--chart-donut: conic-gradient(${stops});`;
    makeInteractiveMark(donut, {
      label: label ?? "Chart",
      value: donutSegments.map((item) => `${item.label}: ${item.value}`).join(", "),
    });
    const center = document.createElement("span");
    center.className = "chart-panel__donut-center";
    if (!value) {
      center.textContent = `${Math.round(total)}`;
      donut.append(center);
    }
    plot.append(donut);
  };
  const appendBullet = () => {
    const rows = safeValues.slice(0, 4);
    rows.forEach((rawValue, index) => {
      const row = document.createElement("span");
      row.className = "chart-panel__bullet";
      row.style = `--chart-value: ${Math.round((rawValue / max) * 100)}%; --chart-target: ${Math.min(100, 58 + index * 8)}%;`;
      const labelNode = document.createElement("b");
      labelNode.textContent = labels[index] ?? `Item ${index + 1}`;
      const track = document.createElement("i");
      const valueNode = document.createElement("em");
      valueNode.textContent = String(rawValue);
      makeInteractiveMark(row, { label: labels[index] ?? `Item ${index + 1}`, value: valueLabels[index] ?? rawValue });
      row.append(labelNode, track, valueNode);
      plot.append(row);
    });
  };
  const appendComparison = () => {
    const prepared = comparisonSeries.slice(0, 3).map((item, seriesIndex) => ({
      label: item.label ?? `Series ${seriesIndex + 1}`,
      values: Array.isArray(item.values) ? item.values.map(Number).map((seriesValue) => (Number.isFinite(seriesValue) ? Math.max(0, seriesValue) : 0)) : [],
    }));
    const comparisonMax = Math.max(...prepared.flatMap((item) => item.values), 1);
    const count = Math.max(...prepared.map((item) => item.values.length), 0);
    for (let index = 0; index < count; index += 1) {
      const group = document.createElement("span");
      group.className = "chart-panel__comparison-group";
      group.setAttribute("title", labels[index] ?? `Value ${index + 1}`);
      makeInteractiveMark(group, {
        label: labels[index] ?? `Value ${index + 1}`,
        value: prepared.map((item) => `${item.label}: ${item.values[index] ?? 0}`).join(", "),
      });
      prepared.forEach((seriesItem, seriesIndex) => {
        const rawValue = seriesItem.values[index] ?? 0;
        const bar = document.createElement("i");
        bar.className = "chart-panel__comparison-bar";
        bar.dataset.series = String(seriesIndex + 1);
        bar.dataset.value = String(rawValue);
        bar.style = `--chart-value: ${Math.round((rawValue / comparisonMax) * 100)}%; --chart-index: ${index + seriesIndex};`;
        group.append(bar);
      });
      plot.append(group);
    }
  };
  const appendPareto = () => {
    const width = 320;
    const height = 128;
    const padX = 10;
    const padTop = 12;
    const padBottom = 22;
    const sorted = labels.map((item, index) => ({ label: item, value: safeValues[index] ?? 0 }));
    if (!sorted.length) safeValues.forEach((item, index) => sorted.push({ label: `Item ${index + 1}`, value: item }));
    sorted.sort((a, b) => b.value - a.value);
    const total = sorted.reduce((sum, item) => sum + item.value, 0) || 1;
    const paretoMax = Math.max(...sorted.map((item) => item.value), 1);
    const barWidth = Math.max(10, Math.min(26, (width - padX * 2) / sorted.length - 8));
    let cumulative = 0;
    const points = [];
    const svg = setChartAttrs(createChartSvg("svg"), {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: "none",
      focusable: "false",
    });
    setChartClass(svg, "chart-panel__svg chart-panel__pareto-svg");
    const threshold = setChartAttrs(createChartSvg("line"), {
      x1: padX,
      x2: width - padX,
      y1: padTop + (1 - 0.8) * (height - padTop - padBottom),
      y2: padTop + (1 - 0.8) * (height - padTop - padBottom),
    });
    setChartClass(threshold, "chart-panel__threshold-line");
    svg.append(threshold);
    sorted.forEach((item, index) => {
      cumulative += item.value;
      const x = padX + (index + 0.5) / sorted.length * (width - padX * 2);
      const availableHeight = height - padTop - padBottom;
      const barHeight = Math.max(6, (item.value / paretoMax) * (availableHeight - 12));
      const y = padTop + availableHeight - barHeight;
      const bar = setChartAttrs(createChartSvg("rect"), {
        x: x - barWidth / 2,
        y,
        width: barWidth,
        height: barHeight,
        rx: 6,
      });
      setChartClass(bar, "chart-panel__pareto-bar");
      bar.setAttribute("style", `--chart-index: ${index};`);
      makeInteractiveMark(bar, { label: item.label, value: item.value });
      svg.append(bar);
      points.push({ x, y: padTop + (1 - cumulative / total) * availableHeight });
      const text = setChartAttrs(createChartSvg("text"), {
        x,
        y: height - 6,
        "text-anchor": "middle",
      });
      setChartClass(text, "chart-panel__axis-label");
      text.textContent = item.label;
      svg.append(text);
    });
    const line = setChartAttrs(createChartSvg("polyline"), {
      points: points.map((item) => `${item.x},${item.y}`).join(" "),
    });
    setChartClass(line, "chart-panel__pareto-line");
    svg.append(line);
    points.forEach((item, index) => {
      const dot = setChartAttrs(createChartSvg("circle"), { cx: item.x, cy: item.y, r: 3.5 });
      setChartClass(dot, "chart-panel__pareto-dot");
      dot.setAttribute("style", `--chart-index: ${index};`);
      makeInteractiveMark(dot, { label: sorted[index]?.label ?? `Value ${index + 1}`, series: "Cumulative", value: `${Math.round((points.length ? (index + 1) / points.length : 0) * 100)}%` });
      svg.append(dot);
    });
    plot.append(svg);
  };
  if (["line", "sparkline", "compact"].includes(resolvedVariant)) appendLine();
  else if (resolvedVariant === "area") appendLine({ area: true });
  else if (resolvedVariant === "donut") appendDonut();
  else if (resolvedVariant === "bullet") appendBullet();
  else if (resolvedVariant === "comparison") appendComparison();
  else if (resolvedVariant === "pareto") appendPareto();
  else {
    appendBars();
  }
  plot.append(tooltip);
  figure.append(plot);
  const chartMount = document.createElement("div");
  chartMount.className = "chart-panel__echarts";
  chartMount.hidden = true;
  chartMount.setAttribute("aria-hidden", "true");
  figure.append(chartMount);
  const optionNode = document.createElement("script");
  optionNode.type = "application/json";
  optionNode.className = "chart-panel__option";
  optionNode.textContent = JSON.stringify({
    engine: "apache-echarts",
    echartsOption: chartPrimitive.echartsOption,
    textSummary: chartPrimitive.textSummary,
    legendModel: chartPrimitive.legendModel,
    tableFallback: chartPrimitive.tableFallback,
  });
  figure.append(optionNode);
  if (caption) {
    const captionNode = document.createElement("figcaption");
    captionNode.textContent = caption;
    figure.append(captionNode);
  }
  panel.append(figure);
  return panel;
}

function readComputedToken(root, name, fallback = "") {
  const styles = globalThis.getComputedStyle?.(root);
  return styles?.getPropertyValue?.(name)?.trim() || fallback;
}

function resolveCssColor(root, value, fallback) {
  if (!value || typeof document === "undefined" || !root?.append) return value || fallback;
  const probe = document.createElement("span");
  if (!probe?.style || typeof probe.style === "string") return fallback;
  probe.style.color = value;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  root.append(probe);
  const resolved = globalThis.getComputedStyle?.(probe)?.color || fallback;
  probe.remove();
  return resolved;
}

function parseDurationMs(value, fallback) {
  if (!value) return fallback;
  const text = String(value).trim();
  if (text.endsWith("ms")) return Number.parseFloat(text) || fallback;
  if (text.endsWith("s")) return (Number.parseFloat(text) || 0) * 1000 || fallback;
  return Number.parseFloat(text) || fallback;
}

function enhanceEchartsOption(root, option) {
  const action = resolveCssColor(root, "var(--chart-panel-tone)", "#0b6eea");
  const text = resolveCssColor(root, "var(--sys-color-text)", "#1f2937");
  const muted = resolveCssColor(root, "var(--sys-color-text-muted)", "#667085");
  const border = resolveCssColor(root, "var(--sys-color-border)", "#d9dde5");
  const surface = resolveCssColor(root, "var(--sys-color-surface)", "#ffffff");
  const duration = parseDurationMs(readComputedToken(root, "--component-duration-reveal", ""), option.animationDuration ?? 260);
  const updateDuration = parseDurationMs(readComputedToken(root, "--component-duration-shift", ""), option.animationDurationUpdate ?? 220);
  const resolved = globalThis.structuredClone ? globalThis.structuredClone(option) : JSON.parse(JSON.stringify(option));
  resolved.color = [
    action,
    muted,
    muted,
    border,
  ];
  resolved.animation = true;
  resolved.animationDuration = duration;
  resolved.animationDurationUpdate = updateDuration;
  resolved.animationEasing = option.animationEasing ?? "cubicOut";
  resolved.animationEasingUpdate = option.animationEasingUpdate ?? "cubicOut";
  resolved.textStyle = { ...(resolved.textStyle ?? {}), color: text, fontFamily: "inherit" };
  resolved.tooltip = {
    ...(resolved.tooltip ?? {}),
    show: true,
    confine: true,
    backgroundColor: surface,
    borderColor: border,
    borderWidth: 1,
    textStyle: { color: text, fontFamily: "inherit", fontWeight: 700 },
  };
  const series = Array.isArray(resolved.series) ? resolved.series : [];
  series.forEach((item, index) => {
    item.animationDelay = (dataIndex) => dataIndex * 34 + index * 60;
    item.animationDelayUpdate = (dataIndex) => dataIndex * 18;
    if (item.type === "line") {
      item.lineStyle = { ...(item.lineStyle ?? {}), width: index === 0 ? 3 : 2 };
      item.emphasis = { ...(item.emphasis ?? {}), focus: "series" };
    }
    if (item.type === "bar") {
      item.itemStyle = { ...(item.itemStyle ?? {}), borderRadius: [6, 6, 0, 0] };
      item.emphasis = { ...(item.emphasis ?? {}), focus: "series" };
    }
    if (item.type === "pie") {
      item.padAngle = item.padAngle ?? 2;
      item.itemStyle = { ...(item.itemStyle ?? {}), borderColor: surface, borderWidth: 2 };
      item.emphasis = { ...(item.emphasis ?? {}), scale: true, scaleSize: 4 };
    }
  });
  return resolved;
}

export function hydrateChartPanel(root, { echarts } = {}) {
  if (!root || !echarts?.init) return null;
  const optionNode = root.querySelector?.(".chart-panel__option");
  const chartMount = root.querySelector?.(".chart-panel__echarts");
  const fallbackPlot = root.querySelector?.(".chart-panel__plot");
  if (!optionNode || !chartMount) return null;
  let chartModel;
  try {
    chartModel = JSON.parse(optionNode.textContent || "{}");
  } catch {
    return null;
  }
  if (!chartModel?.echartsOption) return null;
  chartMount.hidden = false;
  fallbackPlot?.setAttribute?.("hidden", "true");
  const instance = echarts.init(chartMount, null, { renderer: "svg" });
  instance.setOption(enhanceEchartsOption(root, chartModel.echartsOption));
  root.dataset.hydrated = "true";
  globalThis.requestAnimationFrame?.(() => instance.resize?.());
  return instance;
}

export function createStationPin({
  label,
  value = "",
  meta = "",
  icon = "local_gas_station",
  count,
  variant = "fuel",
  state = "default",
  density = "md",
  selected = false,
  unavailable = false,
  disabled = false,
} = {}) {
  const validVariants = new Set(["fuel", "ev", "service", "cluster"]);
  const validStates = new Set(["default", "hover", "focus", "selected", "unavailable", "disabled"]);
  const resolvedVariant = validVariants.has(variant) ? variant : "fuel";
  const resolvedState = disabled ? "disabled" : unavailable ? "unavailable" : selected ? "selected" : validStates.has(state) ? state : "default";
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const markerCount = count != null || resolvedVariant === "cluster" ? count ?? 6 : null;
  const pin = document.createElement("button");
  pin.type = "button";
  pin.className = "station-pin";
  pin.dataset.variant = resolvedVariant;
  pin.dataset.state = resolvedState;
  pin.dataset.density = resolvedDensity;
  pin.disabled = resolvedState === "disabled" || resolvedState === "unavailable";
  if (resolvedState === "selected") pin.setAttribute("aria-pressed", "true");
  const visibleValue = markerCount != null ? String(markerCount) : value || label || "Station";
  const accessibleLabel = [label ?? visibleValue, value && value !== label ? value : "", meta].filter(Boolean).join(" ");
  pin.setAttribute("aria-label", accessibleLabel);
  const marker = document.createElement("span");
  marker.className = "station-pin__marker";
  marker.setAttribute("aria-hidden", "true");
  marker.dataset.kind = markerCount != null ? "count" : "icon";
  marker.textContent = markerCount != null ? String(markerCount) : icon;
  pin.append(marker);
  if (markerCount == null) {
    const valueNode = document.createElement("span");
    valueNode.className = "station-pin__value";
    valueNode.textContent = visibleValue;
    pin.append(valueNode);
  }
  return pin;
}

export function createRouteSummary({
  label,
  description = "",
  metrics = [],
  actions = [],
  variant = "standard",
  state = "default",
  density = "md",
  tone = "neutral",
  icon = "navigation",
  selected = false,
  disabled = false,
  fullWidth = false,
} = {}) {
  const summary = document.createElement("article");
  summary.className = "route-summary";
  const resolvedState = disabled ? "disabled" : selected ? "selected" : state;
  summary.dataset.variant = variant;
  summary.dataset.state = resolvedState;
  summary.dataset.density = density;
  summary.dataset.tone = tone;
  if (fullWidth) summary.dataset.fullWidth = "true";
  if (selected || resolvedState === "selected") summary.setAttribute("aria-selected", "true");
  if (disabled || resolvedState === "disabled") summary.setAttribute("aria-disabled", "true");
  if (resolvedState === "focus") summary.tabIndex = 0;
  const header = document.createElement("header");
  if (icon) {
    const iconNode = document.createElement("span");
    iconNode.className = "route-summary__icon";
    iconNode.setAttribute("aria-hidden", "true");
    iconNode.textContent = icon;
    header.append(iconNode);
  }
  const labelNode = document.createElement("div");
  labelNode.className = "route-summary__label";
  const title = document.createElement("strong");
  title.textContent = label ?? "Route";
  labelNode.append(title);
  if (description) {
    const desc = document.createElement("small");
    desc.textContent = description;
    labelNode.append(desc);
  }
  header.append(labelNode);
  summary.append(header);
  const metricRow = document.createElement("div");
  metricRow.className = "route-summary__metrics";
  for (const metric of metrics) {
    const item = document.createElement("span");
    const metricLabel = document.createElement("small");
    metricLabel.textContent = metric.label ?? "";
    const metricValue = document.createElement("strong");
    metricValue.textContent = metric.value ?? "";
    item.append(metricLabel, metricValue);
    metricRow.append(item);
  }
  summary.append(metricRow);
  if (actions.length) {
    const footer = document.createElement("footer");
    for (const action of actions) {
      if (variant === "compact") {
        footer.append(createIconButton({
          icon: action.icon ?? "close",
          ariaLabel: action.ariaLabel ?? action.label ?? "Cancel route",
          variant: action.variant ?? "ghost",
          density: action.density ?? "sm",
          disabled: disabled || resolvedState === "disabled" || action.disabled,
        }));
      } else {
        footer.append(createButton({ ...action, disabled: disabled || resolvedState === "disabled" || action.disabled }));
      }
    }
    summary.append(footer);
  }
  return summary;
}

export function createCardSummary({
  label,
  meta = "",
  number = "",
  status = "",
  metrics = [],
  expires = "",
  variant = "physical",
  state = "default",
  density = "md",
  icon = "",
  fullWidth = false,
  disabled = false,
} = {}) {
  const validVariants = new Set(["physical", "virtual", "compact", "limit"]);
  const validStates = new Set(["default", "hover", "focus", "active", "warning", "frozen", "disabled"]);
  const validDensities = new Set(["sm", "md", "lg"]);
  const resolvedVariant = validVariants.has(variant) ? variant : "physical";
  const resolvedState = disabled ? "disabled" : validStates.has(state) ? state : "default";
  const resolvedDensity = validDensities.has(density) ? density : "md";
  const statusLabel = status || (resolvedState === "frozen" ? "Frozen" : resolvedState === "warning" ? "Review" : "Active");
  const statusTone = resolvedState === "warning" ? "warning" : resolvedState === "frozen" ? "info" : resolvedState === "disabled" ? "neutral" : "success";
  const summary = document.createElement("article");
  summary.className = "card-summary";
  summary.dataset.variant = resolvedVariant;
  summary.dataset.state = resolvedState;
  summary.dataset.density = resolvedDensity;
  summary.dataset.fullWidth = String(Boolean(fullWidth));
  if (resolvedState === "disabled") summary.setAttribute("aria-disabled", "true");
  if (["hover", "focus", "active"].includes(resolvedState)) summary.tabIndex = 0;
  const header = document.createElement("header");
  const brand = document.createElement("strong");
  brand.className = "card-summary__brand";
  brand.textContent = label ?? "Card";
  header.append(brand);
  header.append(createBadge({ label: statusLabel, tone: statusTone, variant: "status", state: resolvedState === "disabled" ? "disabled" : "default" }));
  summary.append(header);
  const tech = document.createElement("div");
  tech.className = "card-summary__tech";
  const chip = document.createElement("span");
  chip.className = "card-summary__chip";
  chip.setAttribute("aria-hidden", "true");
  tech.append(chip);
  const contactless = document.createElement("span");
  contactless.className = "card-summary__icon";
  contactless.setAttribute("aria-hidden", "true");
  contactless.textContent = icon || (resolvedVariant === "virtual" ? "smartphone" : resolvedState === "frozen" ? "ac_unit" : "contactless");
  tech.append(contactless);
  summary.append(tech);
  if (number) {
    const numberRow = document.createElement("p");
    numberRow.className = "card-summary__number-row";
    const numberNode = document.createElement("span");
    numberNode.className = "card-summary__number";
    numberNode.textContent = number;
    numberRow.append(numberNode);
    if (expires) {
      const expiryNode = document.createElement("span");
      expiryNode.className = "card-summary__expires";
      expiryNode.textContent = expires;
      numberRow.append(expiryNode);
    }
    summary.append(numberRow);
  }
  if (meta) {
    const metaNode = document.createElement("small");
    metaNode.className = "card-summary__holder";
    metaNode.textContent = meta;
    summary.append(metaNode);
  }
  if (metrics.length && resolvedVariant === "limit") {
    const metricRow = document.createElement("div");
    metricRow.className = "card-summary__metrics";
    for (const metric of metrics) {
      const item = document.createElement("span");
      const metricLabel = document.createElement("small");
      metricLabel.textContent = metric.label ?? "";
      const metricValue = document.createElement("strong");
      metricValue.textContent = metric.value ?? "";
      item.append(metricLabel, metricValue);
      metricRow.append(item);
    }
    summary.append(metricRow);
  }
  if (resolvedState === "frozen") {
    const frozenLayer = document.createElement("span");
    frozenLayer.className = "card-summary__frost";
    frozenLayer.setAttribute("aria-hidden", "true");
    const frostIcon = document.createElement("span");
    frostIcon.className = "card-summary__icon";
    setIconGlyph(frostIcon, "ac_unit");
    const frostText = document.createElement("span");
    frostText.textContent = statusLabel;
    frozenLayer.append(frostIcon, frostText);
    summary.append(frozenLayer);
  }
  return summary;
}

export function createMovementRow({
  label,
  meta = "",
  amount = "",
  status = "",
  category = "transfer",
  variant = "standard",
  state = "default",
  density = "md",
  fullWidth = false,
  disabled = false,
} = {}) {
  const validVariants = new Set(["standard", "refund", "declined", "compact"]);
  const validStates = new Set(["default", "hover", "focus", "pending", "error", "disabled"]);
  const validDensities = new Set(["sm", "md", "lg"]);
  const categoryIcons = {
    fuel: "local_gas_station",
    charge: "bolt",
    toll: "toll",
    food: "restaurant",
    transfer: "sync_alt",
    income: "south_west",
  };
  const resolvedVariant = validVariants.has(variant) ? variant : "standard";
  const resolvedState = disabled ? "disabled" : validStates.has(state) ? state : status === "Pending" ? "pending" : status === "Declined" ? "error" : "default";
  const resolvedDensity = validDensities.has(density) ? density : "md";
  const row = document.createElement("button");
  row.type = "button";
  row.className = "movement-row";
  row.dataset.variant = resolvedVariant;
  row.dataset.state = resolvedState;
  row.dataset.density = resolvedDensity;
  row.dataset.category = category;
  row.dataset.fullWidth = String(Boolean(fullWidth));
  row.disabled = disabled || resolvedState === "disabled";
  const iconNode = document.createElement("span");
  iconNode.className = "movement-row__icon";
  iconNode.setAttribute("aria-hidden", "true");
  iconNode.textContent = categoryIcons[category] || categoryIcons.transfer;
  const content = document.createElement("span");
  content.className = "movement-row__content";
  const title = document.createElement("strong");
  title.textContent = label ?? "Movement";
  content.append(title);
  if (meta) {
    const metaNode = document.createElement("small");
    metaNode.textContent = meta;
    content.append(metaNode);
  }
  const value = document.createElement("span");
  value.className = "movement-row__value";
  const amountNode = document.createElement("strong");
  amountNode.className = "movement-row__amount";
  amountNode.textContent = amount;
  value.append(amountNode);
  if (status) {
    const statusNode = document.createElement("small");
    statusNode.className = "movement-row__status";
    statusNode.textContent = status;
    value.append(statusNode);
  }
  row.append(iconNode, content, value);
  return row;
}

export function createQuickAction({
  label,
  icon = "",
  badge = "",
  variant = "standard",
  state = "default",
  density = "md",
  loading = false,
  tone = "neutral",
  disabled = false,
} = {}) {
  const validVariants = new Set(["standard", "destructive", "compact", "wide"]);
  const validStates = new Set(["default", "hover", "focus", "pressed", "loading", "warning", "disabled"]);
  const resolvedVariant = validVariants.has(variant) ? variant : tone === "danger" ? "destructive" : "standard";
  const resolvedState = disabled ? "disabled" : loading ? "loading" : validStates.has(state) ? state : "default";
  const resolvedDensity = ["sm", "md", "lg"].includes(density) ? density : "md";
  const action = document.createElement("div");
  action.className = "quick-action";
  action.dataset.variant = resolvedVariant;
  action.dataset.state = resolvedState;
  action.dataset.density = resolvedDensity;
  const control = document.createElement("button");
  control.type = "button";
  control.className = "quick-action__control";
  control.disabled = disabled;
  control.setAttribute("aria-label", label ?? "Action");
  if (resolvedState === "loading") control.setAttribute("aria-busy", "true");
  if (icon || resolvedState === "loading") {
    const iconNode = document.createElement("span");
    iconNode.className = "quick-action__icon";
    iconNode.setAttribute("aria-hidden", "true");
    if (resolvedState === "loading") {
      iconNode.append(createSpinner({ label: `${label ?? "Action"} loading`, density: "sm", decorative: true }));
    } else {
      iconNode.textContent = icon;
    }
    control.append(iconNode);
  }
  const labelNode = document.createElement("span");
  labelNode.className = "quick-action__label";
  labelNode.textContent = label ?? "Action";
  action.append(control, labelNode);
  if (badge) action.append(createBadge({ label: badge, variant: "count" }));
  return action;
}
