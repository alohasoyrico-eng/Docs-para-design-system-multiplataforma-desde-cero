const supportedChartTypes = new Set(["sparkline", "bars", "line", "area", "donut", "pareto", "bullet", "comparison", "compact"]);

function normalizeValues(values = []) {
  return values.map(Number).map((value) => (Number.isFinite(value) ? Math.max(0, value) : 0));
}

function normalizeSeries(series = [], fallbackValues = []) {
  const normalized = series
    .map((item, index) => ({
      id: item.id ?? `series-${index + 1}`,
      label: item.label ?? `Series ${index + 1}`,
      values: normalizeValues(Array.isArray(item.values) ? item.values : []),
    }))
    .filter((item) => item.values.length);
  return normalized.length ? normalized : [{ id: "series-1", label: "Series 1", values: fallbackValues }];
}

function normalizeSegments(segments = [], values = [], labels = []) {
  const source = segments.length
    ? segments
    : values.map((item, index) => ({ label: labels[index] ?? `Segment ${index + 1}`, value: item }));
  return source.map((item, index) => ({
    id: item.id ?? `segment-${index + 1}`,
    label: item.label ?? `Segment ${index + 1}`,
    value: Number.isFinite(Number(item.value)) ? Math.max(0, Number(item.value)) : 0,
  }));
}

function createTextSummary({ label, value, caption, type, rows }) {
  const points = rows.map((row) => `${row.label}: ${row.value}`).join(", ");
  return [label, value, caption, `${type} chart`, points].filter(Boolean).join(". ");
}

function createTableFallback(rows = []) {
  return rows.map((row) => ({
    label: row.label,
    value: row.value,
    series: row.series ?? "",
  }));
}

export function createChartsPrimitive({
  type = "sparkline",
  label = "Chart",
  value = "",
  caption = "",
  values = [],
  labels = [],
  series = [],
  comparisons = [],
  segments = [],
  thresholds = [],
} = {}) {
  const resolvedType = type === "bar" ? "bars" : supportedChartTypes.has(type) ? type : "sparkline";
  const resolvedValues = normalizeValues(values.length ? values : [32, 54, 48, 70, 62, 84]);
  const resolvedLabels = labels.length ? labels : resolvedValues.map((_, index) => `Value ${index + 1}`);
  const lineSeries = normalizeSeries(series, resolvedValues);
  const comparisonSeries = normalizeSeries(comparisons.length ? comparisons : series, resolvedValues);
  const segmentRows = normalizeSegments(segments, resolvedValues, resolvedLabels);
  const baseRows = resolvedValues.map((item, index) => ({ label: resolvedLabels[index] ?? `Value ${index + 1}`, value: item }));
  const rows = resolvedType === "donut"
    ? segmentRows
    : resolvedType === "comparison"
      ? comparisonSeries.flatMap((item) => item.values.map((seriesValue, index) => ({
          label: resolvedLabels[index] ?? `Value ${index + 1}`,
          value: seriesValue,
          series: item.label,
        })))
      : baseRows;
  const tableFallback = createTableFallback(rows);
  const legendModel = resolvedType === "donut"
    ? segmentRows.map((item) => ({ id: item.id, label: item.label, value: item.value }))
    : lineSeries.map((item) => ({ id: item.id, label: item.label }));
  const axisData = resolvedLabels;
  const echartsOption = {
    animation: true,
    animationDuration: 260,
    animationDurationUpdate: 220,
    animationEasing: "cubicOut",
    animationEasingUpdate: "cubicOut",
    aria: {
      enabled: true,
      label: {
        description: createTextSummary({ label, value, caption, type: resolvedType, rows: tableFallback }),
      },
    },
    dataset: {
      source: tableFallback,
    },
    grid: resolvedType === "donut" ? undefined : { left: 0, right: 0, top: 8, bottom: 0, containLabel: false },
    legend: ["donut", "line", "area", "comparison"].includes(resolvedType) ? { show: false, data: legendModel.map((item) => item.label) } : undefined,
    series: [],
    tooltip: {
      show: true,
      confine: true,
      trigger: ["bars", "comparison", "pareto", "bullet", "line", "area", "sparkline", "compact"].includes(resolvedType) ? "axis" : "item",
    },
    xAxis: ["donut", "bullet"].includes(resolvedType) ? undefined : { type: "category", data: axisData, show: false },
    yAxis: ["donut", "bullet"].includes(resolvedType) ? undefined : { type: "value", show: false },
  };

  if (["sparkline", "compact", "line", "area"].includes(resolvedType)) {
    echartsOption.series = lineSeries.slice(0, 3).map((item) => ({
      name: item.label,
      type: "line",
      data: item.values,
      smooth: true,
      showSymbol: false,
      areaStyle: resolvedType === "area" ? {} : undefined,
    }));
  } else if (resolvedType === "bars") {
    echartsOption.series = [{ name: label, type: "bar", data: resolvedValues, barCategoryGap: "36%" }];
  } else if (resolvedType === "comparison") {
    echartsOption.series = comparisonSeries.slice(0, 3).map((item) => ({ name: item.label, type: "bar", data: item.values }));
  } else if (resolvedType === "donut") {
    echartsOption.series = [{ name: label, type: "pie", radius: ["58%", "84%"], data: segmentRows.map((item) => ({ name: item.label, value: item.value })) }];
  } else if (resolvedType === "pareto") {
    const sorted = [...baseRows].sort((a, b) => b.value - a.value);
    const total = sorted.reduce((sum, item) => sum + item.value, 0) || 1;
    let cumulative = 0;
    echartsOption.xAxis = { type: "category", data: sorted.map((item) => item.label), show: false };
    echartsOption.yAxis = [{ type: "value", show: false }, { type: "value", min: 0, max: 100, show: false }];
    echartsOption.series = [
      { name: label, type: "bar", data: sorted.map((item) => item.value) },
      {
        name: "Cumulative",
        type: "line",
        yAxisIndex: 1,
        data: sorted.map((item) => {
          cumulative += item.value;
          return Math.round((cumulative / total) * 100);
        }),
      },
    ];
  } else if (resolvedType === "bullet") {
    echartsOption.series = [{ name: label, type: "bar", data: resolvedValues, markLine: { data: thresholds } }];
  }

  return {
    type: resolvedType,
    echartsOption,
    textSummary: echartsOption.aria.label.description,
    legendModel,
    tableFallback,
  };
}
