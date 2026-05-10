# Changelog

Tất cả thay đổi đáng chú ý của LAOCONG_VOS_PLATFORM được ghi lại trong file này.

Format dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Repo tuân thủ append-only — KHÔNG xoá entry cũ, chỉ thêm.

---

## [Unreleased]

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
