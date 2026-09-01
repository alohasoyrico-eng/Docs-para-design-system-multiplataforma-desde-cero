# Flow · Docs

El sitio de documentación de [Flow](https://github.com/alohasoyrico-eng/Design-system-multiplataforma-desde-cero), el design system multiplataforma. Aquí viven las páginas que consumen diseñadores, developers, PMs e investigadores: catálogo de piezas, playground vivo, guidance de uso, API por plataforma y el contexto para agentes.

## Correrlo

```bash
npm install
npm run dev
```

Abre `localhost:5174`. La home es el catálogo completo (foundations, primitives, components, patterns, templates); cada pieza tiene su página en `/docs/:componentId` con cuatro tabs: **Overview** (playground + guidance), **Design** (anatomía, estados, tokens), **Build** (install, usage, API, a11y) y **MIEL** (contexto para agentes — hoy es una vista previa del flujo, marcada como ejemplo).

## De dónde salen los datos

Este repo **no inventa nada**: cada página se genera desde los contratos y tokens del repo del DS.

| Qué | Archivo aquí | Fuente de verdad |
|---|---|---|
| Contratos (180) | `src/data/items.json` | `Flow/src/data/items.json` |
| Tokens ref | `src/tokens/ref/*.css` | `Flow/src/tokens/ref/` |
| Tokens sys | `src/tokens/*.css` | `Flow/src/tokens/` (salvo `fonts.css` y `a11y.css`, propios de este repo) |

La sincronización corre **desde el repo del DS**, nunca a mano:

```bash
# en el repo de Flow
npm run sync:docs          # copia contratos + tokens hacia este repo
npm run sync:docs:check    # detecta drift sin copiar
```

Si editas `items.json` o los tokens directamente aquí, el próximo sync los va a pisar. Los cambios de contrato se hacen en el DS.

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
  data/         contratos + getters (sincronizado desde el DS)
  tokens/       ref → sys (sincronizado desde el DS)
  ui/           cascada propia del sitio: primitives, components, patterns
  pages/        ComponentDetailPage (template parametrizado) + catálogo
```

La cascada de este repo sigue las mismas reglas de arquitectura que el DS (`CLAUDE.md` del repo de Flow).
