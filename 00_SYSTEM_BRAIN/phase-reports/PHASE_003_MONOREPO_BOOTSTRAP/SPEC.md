# PHASE 003 — SPEC — Monorepo Bootstrap

**Version:** 1.0 (2026-05-10)  
**Status:** Active — Turn 1 scaffold

---

## 1. Purpose

Prepare the repository for multi-package development: consistent workspaces, TypeScript baseline, formatting/lint policy, and a **non-destructive** structure audit script. Phase 003 does **not** deliver a runnable operational runtime.

---

## 2. Requirements

### 2.1 Workspace

- Introduce `pnpm-workspace.yaml` including `packages/*` and `apps/*`.
- Preserve existing root `package.json` scripts and dependencies; only add `check:structure` if safe.

### 2.2 TypeScript

- Add root `tsconfig.base.json` with `strict` baseline.
- Do not require converting existing JS to TS in this phase.

### 2.3 Lint / format / line endings

- Add `.gitattributes` (LF normalization), `.editorconfig`, `.prettierrc.json`, `eslint.config.mjs` (skeleton).

### 2.4 Package skeletons

- `packages/core-contracts`, `packages/runtime-sdk`, `packages/test-console-kit`: `package.json` + `README.md` placeholder only.

### 2.5 Boundary check

- `scripts/check-structure.mjs`: verify required top-level folders; warn on `apps-script/` root, root `*.gs`, missing `integrations/gas-support/`; exit `1` only on missing required dirs.

### 2.6 Documentation

- `docs/MONOREPO_BOOTSTRAP.md` — rationale and layout.
- Append Phase 003 section to `docs/REPO_STRUCTURE.md`.
- Append Phase 003 entry to `CHANGELOG.md` under `[Unreleased]`.

### 2.7 ADRs

- Draft only: ADR-0006, ADR-0007, ADR-0008.

---

## 3. Non-goals

- Production database changes.
- Real CI/CD or deploy pipelines.
- Deleting legacy folders (`src/`, `.myNotes/`, IDP configs).
- Modifying Phase 002 polluted branch (`phase/002-architecture-docs-migration`).

---

## 4. Success criteria

- All artifacts exist; `node scripts/check-structure.mjs` exits `0` on this repo.
- No changes to runtime behavior or business logic.
- No push/merge/commit in Turn 1 unless user explicitly requests.
