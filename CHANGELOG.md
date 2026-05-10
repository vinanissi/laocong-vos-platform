# Changelog

Tất cả thay đổi đáng chú ý của LAOCONG_VOS_PLATFORM được ghi lại trong file này.

Format dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Repo tuân thủ append-only — KHÔNG xoá entry cũ, chỉ thêm.

---

## [Unreleased]

### Phase 003 — Monorepo Bootstrap (branch `phase/003-monorepo-bootstrap`)

#### Added

- Workspace skeleton: `pnpm-workspace.yaml` (`packages/*`, `apps/*`).
- TypeScript strict baseline: `tsconfig.base.json`.
- Line-ending and editor policy: `.gitattributes`, `.editorconfig`.
- Format/lint skeleton: `.prettierrc.json`, `eslint.config.mjs`.
- Read-only structure audit: `scripts/check-structure.mjs`; root script `check:structure` in `package.json`.
- Package skeletons (metadata only): `packages/core-contracts/`, `packages/runtime-sdk/`,
  `packages/test-console-kit/` (`package.json` + `README.md` each).
- ADR Draft: `ADR-0006-monorepo-tooling-workspace.md`, `ADR-0007-typescript-strict-baseline.md`,
  `ADR-0008-lint-format-and-line-ending-policy.md`.
- Phase report folder: `00_SYSTEM_BRAIN/phase-reports/PHASE_003_MONOREPO_BOOTSTRAP/`
  (`README.md`, `SPEC.md`, `IMPLEMENTATION_REPORT.md`, `TEST_REPORT.md`, `AI_HANDOFF.md`, `NEXT_STEP.md`).
- Doc: `docs/MONOREPO_BOOTSTRAP.md`.

#### Changed

- `docs/REPO_STRUCTURE.md`: append section **§6 Phase 003 — Monorepo baseline**.

#### Phase 003 — Turn 2 (tooling hygiene)

- Added `docs/PACKAGE_MANAGER_POLICY.md` — primary root monorepo package manager: **pnpm**; legacy app lockfiles preserved.
- Clarified pnpm as root monorepo target in `docs/MONOREPO_BOOTSTRAP.md` (Package Manager Policy section) and `00_SYSTEM_BRAIN/decisions/ADR-0006-monorepo-tooling-workspace.md` (Turn 2 constraints).
- Did **not** generate root `pnpm-lock.yaml` (pnpm not verified available / no install in Turn 2).
- Preserved existing app-local lockfiles (e.g. `apps/member-web/package-lock.json`); no deletion.
- Phase 002 `README.md`: reference to `BRANCH_HYGIENE_REPORT.md` (report already under Phase 002 folder; not at repo root).

#### Constraints honoured (Phase 003 Turn 2)

- No app/runtime/business-logic edits; no deploy; no merge; no push; no force-push; no reset.
- `.myNotes/` and `.project.json` not modified; no app-local lockfile removed.

#### Constraints honoured (Phase 003 Turn 1)

- No runtime/business logic changed in `runtime/`, `services/`, `apps/`, `integrations/` (package skeletons under `packages/` only).
- No DB migrations; no deploy; no merge; no push; no force-push; no reset.
- `.myNotes/` and `.project.json` not modified.

---

### Phase 002 — Architecture Docs Migration (branch `phase/002-architecture-docs-migration`)

> **Trạng thái:** Đã hoàn tất Turn 1..5 (governance finalize).
> **Chưa commit, chưa push.** Sẽ commit + push (PR vào `dev`) ở Turn 6 — chỉ khi
> user explicit yêu cầu và đã rotate GitHub PAT.

#### Added

- Source notes layer (snapshot tài liệu kiến trúc nguồn — append-only, immutable):
  - `00_SYSTEM_BRAIN/architecture/source-notes/INDEX.md`
  - `00_SYSTEM_BRAIN/architecture/source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md`
  - `00_SYSTEM_BRAIN/architecture/source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md`
  - 1 file `.docx` skipped (binary) — quyết định bỏ qua tạm ở Turn 5 theo user.
- 10 Draft Canonical architecture docs trong `00_SYSTEM_BRAIN/architecture/canonical/`:
  - `00_PLATFORM_OVERVIEW.md`, `10_RUNTIME_FIRST_ARCHITECTURE.md`,
    `20_INTEGRATION_BOUNDARY.md`, `30_GAS_GWS_SUPPORT_LAYER.md`,
    `40_EVENT_DRIVEN_RUNTIME.md`, `50_HUMAN_OVERRIDE_POLICY.md`,
    `60_AI_ASSISTED_OPERATION.md`, `70_GIT_AND_PHASE_GOVERNANCE.md`,
    `80_MATURITY_MODEL.md`, `90_IMPLEMENTATION_ROADMAP.md`.
  - Status: `Draft Canonical` (chưa promote — theo quyết định user ở Turn 5).
- 3 Mermaid diagrams + README trong `00_SYSTEM_BRAIN/architecture/canonical/diagrams/`:
  - `README.md` (mục đích + danh sách + render hint + guardrails).
  - `event-flow.mmd` (happy / reject / compensation / dead-letter / replay).
  - `task-state-machine.mmd` (TASK lifecycle + 13 event names + override notes).
  - `layered-architecture.mmd` (6 layer + governance + flow đúng + forbidden flows).
- 5 ADR Draft foundation trong `00_SYSTEM_BRAIN/decisions/`:
  - `ADR-0001-adopt-operational-runtime-platform.md`
  - `ADR-0002-demote-gas-gws-to-integration-layer.md`
  - `ADR-0003-runtime-first-architecture.md`
  - `ADR-0004-event-driven-operational-runtime.md`
  - `ADR-0005-human-override-policy.md`
- ADR index: `docs/ARCHITECTURE_DECISION_RECORDS.md` (purpose, lifecycle,
  current ADRs, relationship map, naming convention, document structure,
  rules, cross-reference, how-to-add checklist, open ADR slots).
- Phase report đầy đủ trong `00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/`:
  `README.md`, `SPEC.md`, `IMPLEMENTATION_REPORT.md`, `TEST_REPORT.md`,
  `AI_HANDOFF.md`, `NEXT_STEP.md` (cập nhật qua 5 turn).

#### Changed

- `00_SYSTEM_BRAIN/architecture/README.md`: viết lại để phản ánh Phase 002
  outputs (source-notes / canonical / diagrams / ADR Accepted / ADR index)
  + layer hierarchy & trust + guardrails.
- `00_SYSTEM_BRAIN/decisions/ADR-0001..0005`: promote `Status: Draft → Accepted`
  + thêm metadata `Accepted by` + `Accepted at` (Turn 5, user approval).
- `00_SYSTEM_BRAIN/architecture/canonical/00_PLATFORM_OVERVIEW.md`: APPEND 2 dòng
  reference vào mục References (`layered-architecture.mmd` + `diagrams/README.md`)
  ở Turn 4. KHÔNG rewrite nội dung.
- `00_SYSTEM_BRAIN/architecture/canonical/40_EVENT_DRIVEN_RUNTIME.md`: APPEND 2 dòng
  reference vào mục References (`event-flow.mmd` + `diagrams/README.md`) ở Turn 4.
- `00_SYSTEM_BRAIN/architecture/canonical/50_HUMAN_OVERRIDE_POLICY.md`: APPEND 2 dòng
  reference vào mục References (`task-state-machine.mmd` + `diagrams/README.md`) ở Turn 4.
- `00_SYSTEM_BRAIN/architecture/canonical/90_IMPLEMENTATION_ROADMAP.md`: cập nhật
  Phase 002 status = `Ready for Turn 6 commit` ở Turn 5 (KHÔNG rewrite).

#### Deprecated

- (Không có — phase này không deprecate gì.)

#### Removed

- (Không có — phase này append-only, không xoá file nào.)

#### Fixed

- (Không có — phase này không sửa bug.)

#### Security

- Đã sanitize GitHub Personal Access Token khỏi `origin` remote URL trong
  `.git/config` (Turn 2). Token cũ vẫn cần user **rotate trên GitHub** trước
  khi push branch `phase/002-...` ở Turn 6 (vẫn còn rủi ro server-side).
- Token KHÔNG bị in vào bất kỳ file report nào.

#### Architecture

- Định nghĩa hierarchy & trust giữa các tầng tài liệu kiến trúc:
  `ADR Accepted (luật) > Canonical docs (doctrine) > Diagrams (visualization)`.
  `Source notes` là nguồn lịch sử; `Phase reports` là nhật ký triển khai.
- Khoá rõ 5 quyền human override (STOP/ROLLBACK/REJECT/REASSIGN/OVERRIDE)
  qua canonical `50_HUMAN_OVERRIDE_POLICY.md` + ADR-0005 Accepted.
- Khoá rõ AI = Operational Assistant (suggest/draft/detect/summarize/recommend),
  KHÔNG decide runtime, qua canonical `60_AI_ASSISTED_OPERATION.md`.
- Khoá rõ event-driven runtime (command + event + queue + handler + audit
  append-only + idempotent + replayable) qua canonical `40` + ADR-0004 Accepted.
- Khoá rõ runtime-first architecture (runtime sở hữu workflow/state/audit/event/
  permission/contract) qua canonical `10` + ADR-0003 Accepted.
- Khoá rõ GAS/GWS là support layer (KHÔNG core) qua canonical `30` + ADR-0002 Accepted.

#### Constraints honoured

- KHÔNG sửa code (`runtime/`, `services/`, `apps/`, `database/`, `packages/`,
  `integrations/`, `infra/`, `src/`, `tests/`, `scripts/`).
- KHÔNG sửa runtime behavior.
- KHÔNG sửa business logic.
- KHÔNG deploy.
- KHÔNG merge.
- KHÔNG push.
- KHÔNG commit.
- KHÔNG đụng `.myNotes/`.
- KHÔNG sửa snapshot trong `source-notes/`.

---

### Phase 001 — Platform Repo Refactor (branch `phase/001-platform-repo-refactor`)

#### Added

- Cấu trúc thư mục mục tiêu (57 folder) cho Operational Runtime Platform:
  - `00_SYSTEM_BRAIN/{architecture,decisions,phase-reports,ai-handoff,runbooks}/`
  - `docs/`
  - `apps/{admin-web,staff-web,member-web,public-web}/`
  - `services/{api,worker,ai-runtime,notification,auth}/`
  - `database/{supabase,migrations,seed,schema}/`
  - `packages/{core-contracts,runtime-sdk,ui-kit,validators,event-bus,test-console-kit}/`
  - `runtime/{command,event,workflow,task,permission,audit}-engine/`
  - `integrations/{gas-support/legacy-modules,google-workspace,lark,telegram,zalo,misa,openai,gemini,anthropic,email,payment,maps,storage,ocr}/`
  - `infra/{vercel,supabase,github-actions,deployment}/`
  - `tests/{unit,integration,e2e,reports}/`
  - `scripts/`
  - `.cursor/{rules,prompts}/`
- 9 README layer chính:
  - `runtime/README.md`, `integrations/README.md`, `integrations/gas-support/README.md`,
    `apps/README.md`, `services/README.md`, `database/README.md`, `packages/README.md`,
    `00_SYSTEM_BRAIN/architecture/README.md`.
- Tài liệu quy ước:
  - `docs/REPO_STRUCTURE.md`
  - `docs/GIT_BRANCH_STRATEGY.md`
  - `docs/INTEGRATION_BOUNDARY.md`
- Cursor rule (alwaysApply): `.cursor/rules/laocong-vos-platform.md`.
- Phase report đầy đủ trong `00_SYSTEM_BRAIN/phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/`:
  `README.md`, `SPEC.md`, `IMPLEMENTATION_REPORT.md`, `TEST_REPORT.md`,
  `AI_HANDOFF.md`, `NEXT_STEP.md`.
- `CHANGELOG.md` (file này).
- Slot `integrations/gas-support/legacy-modules/` (trống — sẵn sàng nhận GAS legacy code).

#### Changed

- `README.md` (root): thay nội dung từ IDP `web-app-template` README sang
  README chính thức của LAOCONG_VOS_PLATFORM, định vị là **Operational
  Runtime Platform** với GWS/GAS = integration support layer.

#### Deprecated

- (Không có — phase này không deprecate gì.)

#### Removed

- (Không có — phase này append-only, không xoá file nào.)

#### Fixed

- (Không có — phase này không sửa bug.)

#### Security

- (Không có — phase này không đụng security.)

#### Architecture

- Định nghĩa boundary cứng: **Core Runtime sở hữu** workflow/runtime/state/audit/event/permission/contract;
  **Integration sở hữu** bridge/sync/import-export/notification/external API.
- GWS / GAS chính thức được demote xuống integration layer (không còn là core).
- Apps Script không được phép trở lại làm core runtime (Red Rule trong Cursor rule).
