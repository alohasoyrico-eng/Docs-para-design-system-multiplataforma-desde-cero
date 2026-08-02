# Docs App

This app is a consumer of Design System packages.

It may render specs and content from `packages/specs` and `packages/content`, but canonical product rules, component contracts, content fixtures, and audit gates must stay outside `apps/docs`.

`apps/docs/generated/docs-content.bundle.json` is a generated delivery artifact. Rebuild it with `npm run build:docs-content`; do not edit it by hand or treat it as canonical truth.
