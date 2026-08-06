// Anti-drift generator: turns the PUBLISHED @flowds/tokens/json into grouped display data.
// The docs never hand-write token values — they read the resolved artifact from npm.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const tokensPath = require.resolve("@flowds/tokens/json");
const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));

// Flat "tier.category.rest…" → { tier: { category: [{ path, name, value }] } }
const tree = {};
for (const [path, value] of Object.entries(tokens)) {
  const [tier, category, ...rest] = path.split(".");
  if (!tier || !category) continue;
  ((tree[tier] ??= {})[category] ??= []).push({
    path,
    name: rest.join(".") || category,
    value: String(value),
    isColor: /^#|^rgb|^hsl/.test(String(value)),
  });
}

const out = {
  generatedAt: new Date().toISOString(),
  source: "@flowds/tokens/json",
  total: Object.keys(tokens).length,
  tree,
};

mkdirSync(new URL("../src/generated/", import.meta.url), { recursive: true });
writeFileSync(
  new URL("../src/generated/tokens.json", import.meta.url),
  JSON.stringify(out, null, 2),
);
console.log(
  `✓ gen-tokens: ${out.total} tokens → src/generated/tokens.json (${Object.keys(tree).length} tiers)`,
);
