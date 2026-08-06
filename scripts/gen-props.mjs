// Anti-drift generator: extracts component prop tables from the PUBLISHED .d.ts files.
// The docs never hand-write a prop signature — they read the types shipped on npm via the
// TypeScript compiler API, so the tables cannot drift from the real components.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";
import ts from "typescript";

// Packages whose components we document, in dependency order.
const PACKAGES = [
  "@flowds/primitives",
  "@flowds/components",
  "@flowds/patterns",
  "@flowds/templates",
];

// The packages are ESM-only (exports["."] has no require condition), so resolve via
// import.meta.resolve (honors the "import" condition), then read package.json off disk —
// the strict exports map doesn't expose ./package.json.
const roots = PACKAGES.map((pkg) => {
  const entryJs = fileURLToPath(import.meta.resolve(pkg)); // .../<pkg>/dist/index.js
  const root = dirname(dirname(entryJs));
  const pkgJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const typesRel = pkgJson.exports?.["."]?.types ?? "dist/index.d.ts";
  const entry = join(root, typesRel);
  return { pkg, entry, distDir: dirname(entry) };
});

// One program over every package entry — the compiler follows imports into each dist tree.
const program = ts.createProgram(
  roots.map((r) => r.entry),
  { allowJs: false, declaration: true, noEmit: true, skipLibCheck: true },
);
const checker = program.getTypeChecker();

const jsdoc = (sym) =>
  sym ? ts.displayPartsToString(sym.getDocumentationComment(checker)).trim() : "";

const components = [];

for (const sf of program.getSourceFiles()) {
  if (sf.isDeclarationFile === false) continue;
  if (!sf.fileName.includes("/@flowds/")) continue; // only our packages
  if (sf.fileName.endsWith("/index.d.ts")) continue; // skip barrels
  const owner = roots.find((r) => sf.fileName.startsWith(r.distDir + "/"));
  if (!owner) continue;

  ts.forEachChild(sf, (node) => {
    // Exported `*Props` interface → a prop table.
    if (
      ts.isInterfaceDeclaration(node) &&
      node.name.text.endsWith("Props") &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      const type = checker.getTypeAtLocation(node);
      const props = checker
        .getPropertiesOfType(type)
        .map((p) => {
          const decl = p.valueDeclaration ?? p.declarations?.[0];
          const t = checker.getTypeOfSymbolAtLocation(p, decl ?? node);
          return {
            name: p.getName(),
            type: checker.typeToString(t).replace(/\s+/g, " "),
            optional: (p.flags & ts.SymbolFlags.Optional) !== 0,
            description: jsdoc(p),
          };
        })
        // Hide the noisy inherited DOM attributes; keep the component's own API.
        .filter((p) => p.description || !/^(aria-|on[A-Z]|data-)/.test(p.name));

      const compName = node.name.text.replace(/Props$/, "");
      // Component description = JSDoc on the exported function of the same name.
      let description = "";
      ts.forEachChild(sf, (n) => {
        if (
          (ts.isFunctionDeclaration(n) || ts.isVariableStatement(n)) &&
          sf.text.slice(n.pos, n.end).includes(compName)
        ) {
          const s = checker.getSymbolAtLocation(
            ts.isFunctionDeclaration(n) ? n.name : n.declarationList.declarations[0].name,
          );
          const d = jsdoc(s);
          if (d) description = d;
        }
      });

      components.push({
        name: compName,
        package: owner.pkg,
        file: basename(sf.fileName).replace(/\.d\.ts$/, ""),
        description,
        props,
      });
    }
  });
}

components.sort((a, b) => a.name.localeCompare(b.name));

const out = {
  generatedAt: new Date().toISOString(),
  source: PACKAGES.map((p) => `${p} (.d.ts)`),
  total: components.length,
  components,
};

mkdirSync(new URL("../src/generated/", import.meta.url), { recursive: true });
writeFileSync(new URL("../src/generated/props.json", import.meta.url), JSON.stringify(out, null, 2));
console.log(`✓ gen-props: ${components.length} componentes con props → src/generated/props.json`);
