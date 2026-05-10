# Branch hygiene report — Phase 002 (architecture docs migration)

**Generated:** 2026-05-10 (local inspection, no push, no merge)

## Snapshot

| Item | Value |
|------|--------|
| **Current branch (at inspection)** | `dev` |
| **`dev` HEAD** | `4e75a8f` — Merge branch `phase/002-architecture-docs-migration` into `dev` |
| **`phase/002-architecture-docs-migration` HEAD** | `ec6fa3c` |
| **Phase 002 expected final commit (governance closure)** | `38a2126` — `docs(governance): accept foundational ADRs and finalize phase 002 reports` |
| **Actual `phase/002` tip** | `ec6fa3c` — `chore(member-web): connect supabase client` |

## Confirmations

1. **Phase 002 commits are on `dev`.**  
   The merge commit `4e75a8f` integrates the phase branch; `38a2126` and the rest of the Phase 002 doc/governance chain are ancestors of `dev`.

2. **`dev` has merge commit `4e75a8f`.**  
   Confirmed: `HEAD -> dev` at `4e75a8f` with message matching the Phase 002 merge.

3. **`phase/002` has an extra commit after `38a2126`.**  
   Tip `ec6fa3c` is **not** the governance closure commit; it is one commit **on top of** `38a2126` on the phase branch.

4. **Classification of `ec6fa3c`.**  
   - **Not** Phase 002 architecture/docs/governance scope.  
   - **Belongs to** `member-web` / Supabase client wiring (`chore(member-web): connect supabase client`).  
   - Treat as **application integration** work; label as “Phase 003” only if your phase charter explicitly includes monorepo/app bootstrap—functionally it is **member-web + Supabase**, not ADR/docs migration.

## Status

- **Phase 002:** Completed **in `dev`** via merge `4e75a8f` (includes doc/governance history through `38a2126` and the subsequent phase tip that was merged).
- **Risk:** The named branch `phase/002-architecture-docs-migration` is **no longer a clean “Phase 002 only” line** for a pristine PR or for pushing as “Phase 002 tip = `38a2126`”.
- **Decision:** **Do not push** `phase/002-architecture-docs-migration` as the canonical Phase 002 branch tip while it points at `ec6fa3c` if the requirement is a governance-only tip; **do not** use it for future Phase 002 work.

## Recommendations

1. **Treat Phase 002 as completed in `dev`** (merge already records intent and history).
2. **Do not use `phase/002-architecture-docs-migration` for new work**; avoid further commits on that branch name for clarity.
3. **Start Phase 003 from `dev`** (current integrated line) so new phases track `dev`, not a polluted phase branch.
4. **Optional:** Keep `phase/002` **local** as historical reference, or add an **`archive/phase-002-…`** (or similar) later **without rewriting history**—only if your process requires a frozen pointer; not required for this recovery.

## Commands used (read-only inspection)

- `git branch --show-current`
- `git status --short`
- `git log --oneline --decorate --graph -20`
- `git branch --contains 38a2126`
- `git branch --contains ec6fa3c`
- `git branch -vv`
- `git show -s --format=fuller ec6fa3c`

## Constraints honored

- No push, no merge, no force-push, no `reset --hard`, no branch deletion, no code or runtime logic edits as part of this report.
