# ADR-0006 — Monorepo tooling and workspace layout

## Status

Draft

## Date

2026-05-10

## Context

LAOCONG_VOS_PLATFORM is evolving from an IDP web-app template toward a multi-package operational runtime platform. Phase 003 focuses on **workspace and tooling baseline** only: no production runtime engine, no new business rules. The repo already contains `apps/`, `services/`, `runtime/`, `packages/`, and legacy root `package.json` from the template. We need a consistent way to link shared packages and apps without breaking IDP metadata or existing scripts.

## Decision

1. Adopt **pnpm workspaces** as the preferred Node/TS workspace mechanism for this repository, expressed via `pnpm-workspace.yaml` at the repo root.
2. Root `package.json` remains the **IDP-compatible** entry: existing scripts and dependencies are preserved; we only add tooling scripts (e.g. structure checks) when safe.
3. If full workspace wiring would conflict with the IDP template or unclear app layouts, **defer** heavy `package.json` restructuring and document intent in `docs/MONOREPO_BOOTSTRAP.md` instead of forcing a breaking change.
4. Package naming uses a scoped convention (e.g. `@laocong/*`) for new `packages/*` skeletons; implementation stays empty in Phase 003.

## Consequences

- Developers can run workspace-aware commands with pnpm once lockfiles and dependencies are aligned in a later turn.
- Apps that still maintain their own `package-lock.json` (e.g. legacy app folders) may coexist until a dedicated migration phase consolidates installs.
- CI and local onboarding docs must mention pnpm as the primary workspace tool for the monorepo baseline.

## Guardrails

- Do **not** remove or rewrite existing root scripts or dependencies for template compatibility in Phase 003.
- Do **not** introduce production automation (deploy hooks, real DB migrations) under this ADR.
- Phase 003 does **not** claim Accepted status until reviewed and promoted in a later governance turn.
- **Turn 2 (2026-05-10):** Root monorepo **targets pnpm** as the primary package manager; `docs/PACKAGE_MANAGER_POLICY.md` records the decision and transition rules.
- **Turn 2 constraint:** Do **not** generate root `pnpm-lock.yaml` until `pnpm` is available on the machine and `pnpm install` (or `pnpm install --lockfile-only`) is run under explicit user/architect confirmation — absent that, the repo remains **skeleton + policy only** for workspace installs.
- **Legacy lockfiles:** Preserve existing app-local `package-lock.json` files (e.g. under `apps/member-web/`); do **not** delete them in Phase 003 Turn 2. Consolidation is a separate migration decision.
- **Non-destructive migration:** Do not switch or remove package managers or lockfiles in a way that breaks IDP template usage or app builds without a documented plan.
