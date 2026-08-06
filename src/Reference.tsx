import { useMemo, useState } from "react";
import { Stack, Text, Surface, Inline } from "@flowds/design-system";
import { FlowBadge, FlowInput } from "@flowds/design-system";
import tokensData from "./generated/tokens.json";
import propsData from "./generated/props.json";

// Everything here is GENERATED from the published packages (tokens.json + .d.ts).
// Nothing on this page is hand-authored, so it cannot drift from what ships on npm.

function TokenRow({ name, value, isColor }: { name: string; value: string; isColor: boolean }) {
  return (
    <tr className="ref-row">
      <td>
        <code className="ref-mono">{name}</code>
      </td>
      <td>
        <Inline gap="2" align="center">
          {isColor && <span className="ref-swatch" style={{ background: value }} />}
          <code className="ref-mono ref-muted">{value}</code>
        </Inline>
      </td>
    </tr>
  );
}

function Tokens() {
  const { tree, total } = tokensData;
  const tiers = Object.keys(tree) as (keyof typeof tree)[];
  const [active, setActive] = useState<string>(tiers[0]);
  const tier = tree[active as keyof typeof tree] as Record<
    string,
    { path: string; name: string; value: string; isColor: boolean }[]
  >;
  return (
    <Stack gap="5">
      <Inline gap="3" align="center" wrap>
        <Text variant="title" as="h2">
          Tokens
        </Text>
        <FlowBadge tone="neutral">{total} generados desde @flowds/tokens/json</FlowBadge>
      </Inline>
      <Inline gap="2" wrap>
        {tiers.map((t) => (
          <button
            key={t}
            className={`ref-chip ${active === t ? "is-active" : ""}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </Inline>
      <Stack gap="6">
        {Object.entries(tier).map(([category, rows]) => (
          <Surface key={category} variant="card" padding="5" radius="md">
            <Stack gap="3">
              <Text variant="title-sm" as="h3">
                {active}.{category}{" "}
                <Text variant="caption" color="muted" as="span">
                  ({rows.length})
                </Text>
              </Text>
              <table className="ref-table">
                <tbody>
                  {rows.map((r) => (
                    <TokenRow key={r.path} name={r.name} value={r.value} isColor={r.isColor} />
                  ))}
                </tbody>
              </table>
            </Stack>
          </Surface>
        ))}
      </Stack>
    </Stack>
  );
}

function Props() {
  const { components, total } = propsData;
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      components.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.package.toLowerCase().includes(query.toLowerCase()),
      ),
    [components, query],
  );
  return (
    <Stack gap="5">
      <Inline gap="3" align="center" wrap>
        <Text variant="title" as="h2">
          Componentes
        </Text>
        <FlowBadge tone="neutral">{total} con props desde .d.ts</FlowBadge>
      </Inline>
      <div className="ref-search">
        <FlowInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filtrar por nombre o paquete…"
          aria-label="Filtrar componentes"
        />
      </div>
      <Stack gap="6">
        {filtered.map((c) => (
          <Surface key={c.name} variant="card" padding="5" radius="md">
            <Stack gap="3">
              <Inline gap="2" align="center" wrap>
                <Text variant="title-sm" as="h3">
                  {c.name}
                </Text>
                <FlowBadge tone="neutral">{c.package.replace("@flowds/", "")}</FlowBadge>
              </Inline>
              {c.description && (
                <Text variant="body" color="secondary">
                  {c.description.split("\n")[0]}
                </Text>
              )}
              {c.props.length > 0 ? (
                <table className="ref-table">
                  <thead>
                    <tr>
                      <th>prop</th>
                      <th>tipo</th>
                      <th>req.</th>
                      <th>descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.props.map((p) => (
                      <tr key={p.name} className="ref-row">
                        <td>
                          <code className="ref-mono">{p.name}</code>
                        </td>
                        <td>
                          <code className="ref-mono ref-muted">{p.type}</code>
                        </td>
                        <td>{p.optional ? "" : "●"}</td>
                        <td>
                          <Text variant="caption" color="muted" as="span">
                            {p.description}
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Text variant="caption" color="muted">
                  Sin props propias.
                </Text>
              )}
            </Stack>
          </Surface>
        ))}
      </Stack>
    </Stack>
  );
}

export function Reference() {
  const [section, setSection] = useState<"tokens" | "components">("tokens");
  return (
    <Stack gap="6">
      <Inline gap="2">
        <button
          className={`ref-chip ${section === "tokens" ? "is-active" : ""}`}
          onClick={() => setSection("tokens")}
        >
          Tokens
        </button>
        <button
          className={`ref-chip ${section === "components" ? "is-active" : ""}`}
          onClick={() => setSection("components")}
        >
          Componentes
        </button>
      </Inline>
      {section === "tokens" ? <Tokens /> : <Props />}
    </Stack>
  );
}
