const countryFlagData = Object.freeze({
  AR: {
    label: "Argentina",
    stripes: [["#74acdf", 0, 33.333], ["#ffffff", 33.333, 33.334], ["#74acdf", 66.667, 33.333]],
    mark: "sun",
  },
  BR: {
    label: "Brazil",
    stripes: [["#009b3a", 0, 100]],
    diamond: "#ffdf00",
    disc: "#002776",
  },
  CA: {
    label: "Canada",
    stripes: [["#d52b1e", 0, 28], ["#ffffff", 28, 44], ["#d52b1e", 72, 28]],
    mark: "leaf",
  },
  CL: {
    label: "Chile",
    stripes: [["#ffffff", 0, 50], ["#d52b1e", 50, 50]],
    canton: "#0039a6",
    star: "#ffffff",
  },
  CO: {
    label: "Colombia",
    stripes: [["#fcd116", 0, 50], ["#003893", 50, 25], ["#ce1126", 75, 25]],
  },
  CU: {
    label: "Cuba",
    stripes: [["#002a8f", 0, 100], ["#ffffff", 20, 100], ["#002a8f", 40, 100], ["#ffffff", 60, 100], ["#002a8f", 80, 100]],
    triangle: "#cf142b",
    star: "#ffffff",
  },
  ES: {
    label: "Spain",
    stripes: [["#aa151b", 0, 25], ["#f1bf00", 25, 50], ["#aa151b", 75, 25]],
    mark: "seal",
  },
  MX: {
    label: "Mexico",
    stripes: [["#006341", 0, 33.333], ["#ffffff", 33.333, 33.334], ["#ce1126", 66.667, 33.333]],
    mark: "seal",
  },
  PE: {
    label: "Peru",
    stripes: [["#d91023", 0, 33.333], ["#ffffff", 33.333, 33.334], ["#d91023", 66.667, 33.333]],
  },
  US: {
    label: "United States",
    stripes: [
      ["#b22234", 0, 7.692], ["#ffffff", 7.692, 7.692], ["#b22234", 15.384, 7.692],
      ["#ffffff", 23.076, 7.692], ["#b22234", 30.768, 7.692], ["#ffffff", 38.46, 7.692],
      ["#b22234", 46.152, 7.692], ["#ffffff", 53.844, 7.692], ["#b22234", 61.536, 7.692],
      ["#ffffff", 69.228, 7.692], ["#b22234", 76.92, 7.692], ["#ffffff", 84.612, 7.692],
      ["#b22234", 92.304, 7.696],
    ],
    canton: "#3c3b6e",
  },
});

let countryFlagId = 0;

function starPoints(cx, cy, outer, inner, points = 5) {
  const values = [];
  for (let index = 0; index < points * 2; index += 1) {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (index * Math.PI) / points;
    values.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`);
  }
  return values.join(" ");
}

export function createCountryFlag(country = "MX", { label, hidden = true } = {}) {
  const code = String(country || "MX").toUpperCase();
  const flag = countryFlagData[code] ?? countryFlagData.MX;
  const clipId = `country-flag-clip-${code.toLowerCase()}-${++countryFlagId}`;
  const root = document.createElement("span");
  root.className = "country-flag";
  root.dataset.country = countryFlagData[code] ? code : "MX";
  if (hidden) {
    root.setAttribute("aria-hidden", "true");
  } else {
    root.setAttribute("role", "img");
    root.setAttribute("aria-label", label ?? `${flag.label} flag`);
  }

  const svg = document.createElementNS?.("http://www.w3.org/2000/svg", "svg") ?? document.createElement("svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("aria-hidden", "true");
  const clip = document.createElementNS?.("http://www.w3.org/2000/svg", "clipPath") ?? document.createElement("clipPath");
  clip.setAttribute("id", clipId);
  const circle = document.createElementNS?.("http://www.w3.org/2000/svg", "circle") ?? document.createElement("circle");
  circle.setAttribute("cx", "50");
  circle.setAttribute("cy", "50");
  circle.setAttribute("r", "50");
  clip.append(circle);
  const defs = document.createElementNS?.("http://www.w3.org/2000/svg", "defs") ?? document.createElement("defs");
  defs.append(clip);
  const group = document.createElementNS?.("http://www.w3.org/2000/svg", "g") ?? document.createElement("g");
  group.setAttribute("clip-path", `url(#${clipId})`);
  for (const [color, start, size] of flag.stripes) {
    const rect = document.createElementNS?.("http://www.w3.org/2000/svg", "rect") ?? document.createElement("rect");
    const vertical = ["MX", "CA", "PE"].includes(code);
    rect.setAttribute("x", vertical ? String(start) : "0");
    rect.setAttribute("y", vertical ? "0" : String(start));
    rect.setAttribute("width", vertical ? String(size) : "100");
    rect.setAttribute("height", vertical ? "100" : String(size));
    rect.setAttribute("fill", color);
    group.append(rect);
  }
  if (flag.canton) {
    const canton = document.createElementNS?.("http://www.w3.org/2000/svg", "rect") ?? document.createElement("rect");
    canton.setAttribute("x", "0");
    canton.setAttribute("y", "0");
    canton.setAttribute("width", code === "CL" ? "50" : "45");
    canton.setAttribute("height", code === "CL" ? "50" : "54");
    canton.setAttribute("fill", flag.canton);
    group.append(canton);
  }
  if (flag.diamond) {
    const diamond = document.createElementNS?.("http://www.w3.org/2000/svg", "polygon") ?? document.createElement("polygon");
    diamond.setAttribute("points", "50,18 84,50 50,82 16,50");
    diamond.setAttribute("fill", flag.diamond);
    group.append(diamond);
  }
  if (flag.disc) {
    const disc = document.createElementNS?.("http://www.w3.org/2000/svg", "circle") ?? document.createElement("circle");
    disc.setAttribute("cx", "50");
    disc.setAttribute("cy", "50");
    disc.setAttribute("r", "18");
    disc.setAttribute("fill", flag.disc);
    group.append(disc);
  }
  if (flag.triangle) {
    const triangle = document.createElementNS?.("http://www.w3.org/2000/svg", "polygon") ?? document.createElement("polygon");
    triangle.setAttribute("points", "0,0 48,50 0,100");
    triangle.setAttribute("fill", flag.triangle);
    group.append(triangle);
    const star = document.createElementNS?.("http://www.w3.org/2000/svg", "polygon") ?? document.createElement("polygon");
    star.setAttribute("points", starPoints(18, 50, 10, 4));
    star.setAttribute("fill", flag.star);
    group.append(star);
  }
  if (flag.mark === "seal") {
    const seal = document.createElementNS?.("http://www.w3.org/2000/svg", "circle") ?? document.createElement("circle");
    seal.setAttribute("cx", "50");
    seal.setAttribute("cy", "50");
    seal.setAttribute("r", "8");
    seal.setAttribute("fill", "#b08a2e");
    group.append(seal);
  }
  if (flag.mark === "sun") {
    const sun = document.createElementNS?.("http://www.w3.org/2000/svg", "circle") ?? document.createElement("circle");
    sun.setAttribute("cx", "50");
    sun.setAttribute("cy", "50");
    sun.setAttribute("r", "7");
    sun.setAttribute("fill", "#f6b40e");
    group.append(sun);
  }
  if (flag.mark === "leaf") {
    const leaf = document.createElementNS?.("http://www.w3.org/2000/svg", "polygon") ?? document.createElement("polygon");
    leaf.setAttribute("points", "50,26 56,43 70,39 61,51 74,58 58,59 62,76 50,64 38,76 42,59 26,58 39,51 30,39 44,43");
    leaf.setAttribute("fill", "#d52b1e");
    group.append(leaf);
  }
  svg.append(defs, group);
  root.append(svg);
  return root;
}

export function listCountryFlags() {
  return Object.keys(countryFlagData);
}
