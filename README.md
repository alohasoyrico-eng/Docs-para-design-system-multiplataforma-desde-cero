# Flow · Docs

El sitio de documentación de [Flow](https://github.com/alohasoyrico-eng/Design-system-multiplataforma-desde-cero), el design system multiplataforma. Aquí viven las páginas que consumen diseñadores, developers, PMs e investigadores: catálogo de piezas, playground vivo, guidance de uso, API por plataforma y el contexto para agentes.

## Correrlo

```bash
npm install
npm run dev
```

Abre `localhost:5174`. La home es el catálogo completo (foundations, primitives, components, patterns, templates); cada pieza tiene su página en `/docs/:componentId` con cuatro tabs: **Overview** (playground + guidance), **Design** (anatomía, estados, tokens), **Build** (install, usage, API, a11y) y **MIEL** (contexto para agentes — hoy es una vista previa del flujo, marcada como ejemplo).

## De dónde salen los datos

Este repo **no inventa nada — y ya no forkea nada**: es el primer consumidor real del paquete del DS.

| Qué | De dónde viene |
|---|---|
| Componentes, tokens, estilos, hooks | `@alohasoyrico-eng/flow-react` (git dependency del DS) — no hay cascada paralela aquí |
| Contratos (181) | `src/data/items.json`, sincronizado desde el DS |
| Diccionario de eventos | `src/data/growth-events.json`, sincronizado desde el DS |

Para traer una versión nueva del DS:

```bash
npm update @alohasoyrico-eng/flow-react
```

Los datos se sincronizan **desde el repo del DS**, nunca a mano:

```bash
# en el repo de Flow
npm run sync:docs          # copia contratos + diccionario hacia este repo
npm run sync:docs:check    # detecta drift sin copiar
```

Si editas `items.json` directamente aquí, el próximo sync lo va a pisar. Los cambios de contrato, componentes y tokens se hacen en el DS. Si una pieza de documentación de este repo necesita algo que el DS no tiene, la mejora **se sube al DS** (así se hizo con `specLabels` de PlaygroundCanvas, el `variant="inline"` de CodeBlock y el `contained` de SectionBar) — nunca se reintroduce un fork local.

## Honestidad de la documentación

Reglas que este sitio se compromete a cumplir (y que ya le costaron una auditoría):

- El estatus de cada pieza y plataforma se muestra **tal cual viene del contrato** — `reference` nunca se disfraza de `stable`.
- Una pieza `proposed` sin implementación lo dice explícitamente en el playground y el snippet.
- La metadata del footer es real (path del código fuente), no versiones inventadas.
- El contenido demo (tab MIEL: changelog, proposals) está etiquetado como ejemplo ilustrativo.

## Verificación

```bash
npm run typecheck
npm run build
```

CI (GitHub Actions) corre ambos en cada push y PR.

## Estructura

```
src/
  data/         contratos, diccionario de eventos y specimens
  layout/       DocsLayout (TopBar + GlobalSearch del paquete)
  pages/        ComponentDetailPage (template parametrizado), GrowthPage, catálogo
  styles.css    un solo import: los estilos completos del paquete
```

Este repo solo contiene templates de documentación; toda la cascada (primitives → patterns) vive en el DS y llega por el paquete.
