# PHASE 003 — MONOREPO BOOTSTRAP

> **Goal:** Establish **workspace and tooling baseline** (pnpm workspace skeleton, TS strict base config, lint/format/line-ending policy drafts, package skeletons, read-only structure check). **No** production runtime engine, **no** real DB migrations, **no** business-logic changes.

---

## 1. Phase metadata

| Field | Value |
|---|---|
| Phase ID | `PHASE_003_MONOREPO_BOOTSTRAP` |
| Branch | `phase/003-monorepo-bootstrap` |
| Tách từ | `dev` (merge Phase 002 tại `4e75a8f`) |
| Loại | Tooling / monorepo hygiene |
| Risk | LOW (scaffold + docs; no runtime behavior change) |
| Owner | LAOCONG_VOS Architect (human) + AI assistant |
| Started | 2026-05-10 |
| Status | Turn 1 — bootstrap scaffold (Draft ADRs, skeleton packages, structure check) |

---

## 2. In-scope

- ADR Draft: `ADR-0006` (workspace), `ADR-0007` (TS strict baseline), `ADR-0008` (lint/format/line endings).
- Root tooling files: `pnpm-workspace.yaml`, `tsconfig.base.json`, `.editorconfig`, `.gitattributes`, `.prettierrc.json`, `eslint.config.mjs`.
- Package skeletons under `packages/{core-contracts,runtime-sdk,test-console-kit}/`.
- `scripts/check-structure.mjs` + root `npm run check:structure` (append-only `package.json` script).
- Docs: `docs/MONOREPO_BOOTSTRAP.md`; append Phase 003 notes to `docs/REPO_STRUCTURE.md`; append `CHANGELOG.md`.

## 3. Out-of-scope (explicit)

- Runtime engine implementation, command/event bus, workflow execution.
- Database migrations, RLS policies, Supabase project changes.
- Changing business rules in `apps/`, `services/`, `runtime/`, `integrations/` (beyond skeleton metadata).
- Deploy, merge, push, force-push, history rewrite.
- Automation thật (CI jobs, hooks) — chỉ skeleton config có thể kích hoạt sau.

## 4. Artifacts

| Artifact | Path |
|---|---|
| Spec | `SPEC.md` |
| Implementation log | `IMPLEMENTATION_REPORT.md` |
| Test / verification | `TEST_REPORT.md` |
| AI handoff | `AI_HANDOFF.md` |
| Next step | `NEXT_STEP.md` |

---

## 5. References

- `docs/MONOREPO_BOOTSTRAP.md`
- `00_SYSTEM_BRAIN/decisions/ADR-0006-monorepo-tooling-workspace.md`
- `00_SYSTEM_BRAIN/decisions/ADR-0007-typescript-strict-baseline.md`
- `00_SYSTEM_BRAIN/decisions/ADR-0008-lint-format-and-line-ending-policy.md`
