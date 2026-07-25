# Flow Design System — Documentación

Sitio de documentación pública del **Flow Design System**. Este repo tiene dueños y gobierno
propios, distintos del repo del sistema.

## Relación con el DS

La frontera entre los dos repos es el **paquete publicado y versionado** en npm. Esta doc
**consume** `@flow/*` como dependencia — nunca redefine un token ni una prop; los importa.

- Repo del sistema (publica `@flow/*`): https://github.com/alohasoyrico-eng/Design-system-multiplataforma-desde-cero
- Contrato: `@flow/design-system` (y capas sueltas) en npm, versionado con SemVer (lockstep).

## Estado

Las dependencias `@flow/*` están declaradas a `^0.1.0` pero **aún no publicadas** en npm.
Cuando el repo del DS haga su primer `npm run release`, aquí basta:

```bash
npm install
npm run dev      # http://localhost:5183
```

## Principio anti-drift

Todo lo generable se **genera** desde el paquete publicado (props desde los `.d.ts`, tokens
desde `@flow/tokens/json`), no se escribe a mano. Lo escrito a mano se limita al juicio humano:
cuándo usar cada componente, rationale, guías por audiencia. Doc que puede mentir es peor que
no tener doc.

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (Vite) en el puerto 5183 |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Sirve el build |
| `npm run typecheck` | `tsc --noEmit` |
