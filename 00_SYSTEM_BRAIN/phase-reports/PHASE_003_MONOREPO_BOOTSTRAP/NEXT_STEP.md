# PHASE 003 — NEXT STEP

**Last updated:** 2026-05-10 (Turn 3 — local commit done)

---

## Turn 3 recap (completed)

- **Local commit:** Three commits on `phase/003-monorepo-bootstrap` (policy; skeleton; reports + `CHANGELOG` + `REPO_STRUCTURE`). **No** `pnpm-lock.yaml`; **no** push.
- **Excluded from commit (by design):** Phase 002 `README.md` link-only change, `BRANCH_HYGIENE_REPORT.md`, `.myNotes/`, `.project.json`.

---

## Turn 4 — pnpm, lockfile, push (optional)

1. **Install pnpm** if user confirms (Corepack or org-standard install); verify `pnpm -v`.
2. **Generate lockfile safely:** `pnpm install --lockfile-only` or `pnpm install` from repo root; record outcome in `IMPLEMENTATION_REPORT.md` (new Turn 4 section).
3. **Review package manager migration:** app-local `package-lock.json` vs root `pnpm-lock.yaml` — align with `docs/PACKAGE_MANAGER_POLICY.md`; no destructive deletes without ADR/plan.
4. **Optional push:** Push `phase/003-monorepo-bootstrap` when user approves (PAT rotated, remote clean). **Do not** merge `dev`/`main` unless user starts that workflow.
5. **ADR review:** Continue **Draft → Proposed/Accepted** for ADR-0006..0008 when governance ready.

---

## Turn 2 recap (completed)

- Package manager policy file added; ADR-0006 updated; docs/changelog/reports refreshed.
- No install; no root lockfile; app-local lockfiles preserved.

---

## After Phase 003 completes

- **Phase 004 — DATABASE_BOOTSTRAP:** Supabase/Postgres migrations, RLS baseline, schema conventions — **only** after Phase 003 sign-off.

---

## Blockers to watch

- Untracked local files (`.myNotes/`, `.project.json`) may affect commit scope; hygiene report lives under Phase 002 reports only.
- Polluted `phase/002-...` branch must not be reused for new work.
