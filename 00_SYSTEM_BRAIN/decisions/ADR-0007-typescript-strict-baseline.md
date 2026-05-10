# ADR-0007 — TypeScript strict baseline

## Status

Draft

## Date

2026-05-10

## Context

Shared packages and future runtime code benefit from a single **strict** TypeScript baseline. The repository currently mixes template JS (`src/index.js`) and TS in some apps (e.g. Next apps). Phase 003 must set a **canonical compiler baseline** without forcing a bulk JS-to-TS conversion.

## Decision

1. Add a root `tsconfig.base.json` with **strict** compiler options enabled (`strict`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noUncheckedIndexedAccess`, etc.), suitable as `extends` for packages and services in later phases.
2. Individual projects (apps, packages) add their own `tsconfig.json` that extends `../../tsconfig.base.json` (or appropriate relative path) when they adopt TS.
3. **No requirement** in Phase 003 to convert existing JavaScript files to TypeScript; conversion is phased by package or app when owners are ready.

## Consequences

- New TS code should align with the strict baseline from the start, reducing drift.
- Some existing projects may temporarily use looser configs until migrated; that is explicit technical debt, not a violation of Phase 003 scope.

## Guardrails

- Do not change runtime or business behavior solely to satisfy types in Phase 003.
- Do not delete or rename legacy JS entrypoints for IDP compatibility in this phase.
- Promoting this ADR to Accepted requires architect review and alignment with CI typecheck gates (future phase).
