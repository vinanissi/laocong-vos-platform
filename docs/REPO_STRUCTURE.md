# Repo Structure — LAOCONG_VOS_PLATFORM

> Mô tả cây thư mục, vai trò từng layer, và phân biệt **Core Runtime** với **Integration**.

---

## 1. Cây thư mục mục tiêu

```txt
LAOCONG_VOS_PLATFORM/
│
├─ 00_SYSTEM_BRAIN/            # Bộ não tài liệu & report của hệ
│  ├─ architecture/            # Tài liệu kiến trúc sống
│  ├─ decisions/               # ADR (Architecture Decision Records)
│  ├─ phase-reports/           # Report mỗi phase (PHASE_XXX_<NAME>/)
│  ├─ ai-handoff/              # Handoff giữa các phiên AI
│  └─ runbooks/                # Runbook vận hành
│
├─ docs/                       # Tài liệu sản phẩm & quy ước
│  ├─ REPO_STRUCTURE.md        # (file này)
│  ├─ GIT_BRANCH_STRATEGY.md
│  └─ INTEGRATION_BOUNDARY.md
│
├─ apps/                       # UI layer (KHÔNG giữ business truth)
│  ├─ admin-web/
│  ├─ staff-web/
│  ├─ member-web/
│  └─ public-web/
│
├─ services/                   # Backend services bao quanh runtime
│  ├─ api/                     # HTTP/RPC gateway
│  ├─ worker/                  # Background worker / queue consumer
│  ├─ ai-runtime/              # AI orchestration (assist only)
│  ├─ notification/            # Notification dispatcher
│  └─ auth/                    # Auth + session
│
├─ database/                   # Storage layer (Supabase / Postgres)
│  ├─ supabase/                # Cấu hình project Supabase
│  ├─ migrations/              # SQL migrations (append-only)
│  ├─ seed/                    # Seed dev/staging
│  └─ schema/                  # ERD / generated types
│
├─ packages/                   # Shared contracts + SDK nội bộ
│  ├─ core-contracts/          # Type-safe contracts
│  ├─ runtime-sdk/             # SDK gọi runtime
│  ├─ ui-kit/                  # UI components dùng chung
│  ├─ validators/              # Schema validators
│  ├─ event-bus/               # Event bus client abstraction
│  └─ test-console-kit/        # Bộ chuẩn build Test Console
│
├─ runtime/                    # CORE — operational brain (SỞ HỮU business truth)
│  ├─ command-engine/          # CommandBus, dispatch, validate, audit
│  ├─ event-engine/            # Event store + handler registry
│  ├─ workflow-engine/         # Workflow definition runtime
│  ├─ task-engine/             # Task lifecycle / state machine
│  ├─ permission-engine/       # Capability-based permission
│  └─ audit-engine/            # Append-only audit trail
│
├─ integrations/               # External capability layer (KHÔNG giữ business truth)
│  ├─ gas-support/             # Adapter cho Apps Script (legacy support)
│  │  └─ legacy-modules/       # Slot cho code GAS cũ khi import
│  ├─ google-workspace/        # Drive / Gmail / Docs / Sheet bridge
│  ├─ lark/
│  ├─ telegram/
│  ├─ zalo/
│  ├─ misa/                    # ERP/kế toán
│  ├─ openai/                  # AI provider (assist only)
│  ├─ gemini/                  # AI provider (assist only)
│  ├─ anthropic/               # AI provider (assist only)
│  ├─ email/                   # SMTP / transactional email
│  ├─ payment/                 # Payment gateway
│  ├─ maps/                    # Maps / geocoding / routing
│  ├─ storage/                 # External object storage
│  └─ ocr/                     # OCR provider
│
├─ infra/                      # Deployment / CI / cloud config
│  ├─ vercel/
│  ├─ supabase/
│  ├─ github-actions/
│  └─ deployment/
│
├─ tests/                      # Tầng test toàn hệ
│  ├─ unit/
│  ├─ integration/
│  ├─ e2e/
│  └─ reports/                 # Test report xuất ra
│
├─ scripts/                    # Script vận hành / dev tooling
│
├─ .cursor/                    # Cursor IDE config
│  ├─ rules/                   # Rules (laocong-vos-platform.md, ...)
│  └─ prompts/                 # Prompt template dùng chung
│
├─ .myNotes/                   # (legacy) tài liệu nguồn — KHÔNG xoá
├─ src/                        # (legacy) entry IDP template — KHÔNG xoá vội
├─ .github/                    # GitHub workflows / templates
│
├─ README.md
├─ CHANGELOG.md
├─ package.json
├─ .idp.config.json
├─ .idp-environments.json
└─ .project.json
```

---

## 2. Phân biệt Core Runtime vs Integration

| | Core Runtime (`runtime/`) | Integration (`integrations/`) |
|---|---|---|
| Sở hữu business truth | ✅ | ❌ |
| Định nghĩa workflow | ✅ | ❌ |
| Giữ state nghiệp vụ | ✅ | ❌ |
| Append-only audit nghiệp vụ | ✅ | ❌ |
| Phát business event | ✅ | ❌ |
| Quản lý permission | ✅ | ❌ |
| Định nghĩa contract | ✅ | ❌ |
| Bridge ra hệ ngoài | ❌ | ✅ |
| Sync sheet / form | ❌ | ✅ |
| Import / Export | ❌ | ✅ |
| Notification ra ngoài | ❌ | ✅ |
| Gọi AI provider | ❌ | ✅ |
| File storage external | ❌ | ✅ |

Xem chi tiết: [`./INTEGRATION_BOUNDARY.md`](./INTEGRATION_BOUNDARY.md).

---

## 3. Vai trò từng layer

### `00_SYSTEM_BRAIN/`
"Bộ não" tài liệu — kiến trúc sống, decision log, phase report,
ai-handoff, runbook. Đây là source of truth về **kiến trúc** (không
phải về dữ liệu — dữ liệu nằm ở runtime).

### `docs/`
Tài liệu sản phẩm & quy ước repo (structure, branch strategy,
integration boundary). Khác với `00_SYSTEM_BRAIN` ở chỗ: docs là
quy ước "đọc nhanh" cho dev; system_brain là tài liệu "thiết kế sâu".

### `apps/`
UI cho từng phân vai (admin / staff / member / public). KHÔNG chứa
nghiệp vụ. Gọi command qua `services/api` hoặc `packages/runtime-sdk`.

### `services/`
Tầng dịch vụ backend bao quanh runtime. KHÔNG thay thế runtime.
Mỗi service có scope rõ (api / worker / ai / notification / auth).

### `database/`
Supabase + Postgres. Append-only migrations. RLS bật mặc định.

### `packages/`
Code dùng chung — contract, SDK, UI kit, validator, event bus,
test console kit. Thấp hơn `apps`/`services` trong dependency graph.

### `runtime/`
**Core** của hệ — 6 engine (command/event/workflow/task/permission/audit).
Là **nguồn duy nhất** giữ business truth.

### `integrations/`
Cầu nối ra hệ ngoài. KHÔNG giữ business truth. Mỗi integration có
adapter / contract / bridge / test-console riêng.

### `infra/`
Cấu hình deployment, CI/CD, Vercel, Supabase, GitHub Actions.

### `tests/`
Test toàn hệ (unit / integration / e2e) + thư mục report.

### `scripts/`
Script vận hành & dev tooling (codegen, lint hook, migration helper, …).

### `.cursor/`
Rules & prompts để Cursor / AI agent hành xử đúng quy ước.

---

## 4. Folder legacy còn giữ

| Folder/File | Trạng thái | Hành động |
|---|---|---|
| `.myNotes/` | Tài liệu nguồn (architecture, prompt, docx) | KHÔNG xoá. Sẽ dần convert sang `00_SYSTEM_BRAIN/architecture/`. |
| `src/index.js` | Entry mặc định IDP template | KHÔNG xoá vội. Sẽ thay/đổi vai trò khi có monorepo runtime thực sự. |
| `.idp*.json`, `.project.json` | Cấu hình IDP Universal Workspace Manager | Giữ — không can thiệp. |
| `.github/workflows/` | Trống | Giữ — sẽ được populate ở `phase/00X-ci-cd-bootstrap`. |

---

## 5. Trạng thái hiện tại sau Phase 001

```txt
- 57 thư mục mới được tạo theo cấu trúc mục tiêu.
- Các leaf folder chưa có file = giữ bằng .gitkeep để git track.
- README.md được tạo cho 8 layer chính theo spec.
- Tài liệu quy ước (REPO_STRUCTURE / GIT_BRANCH_STRATEGY / INTEGRATION_BOUNDARY) đã có.
- Cursor rule laocong-vos-platform.md đã có.
- KHÔNG có code GAS / Apps Script trong repo này — slot legacy được tạo sẵn.
- KHÔNG có file/code cũ nào bị xoá hay đổi tên.
```

---

## 6. Phase 003 — Monorepo baseline (tooling only)

```txt
- pnpm workspace skeleton: pnpm-workspace.yaml (packages/*, apps/*).
- TypeScript strict baseline: tsconfig.base.json (extends target for future packages).
- Policy / skeleton: .gitattributes (LF), .editorconfig, .prettierrc.json, eslint.config.mjs.
- Package skeletons: packages/core-contracts, packages/runtime-sdk, packages/test-console-kit
  (package.json + README placeholder — no runtime implementation).
- Boundary check: scripts/check-structure.mjs + npm script check:structure (read-only console report).
- ADR Draft: ADR-0006 (workspace), ADR-0007 (TS baseline), ADR-0008 (lint/format/line endings).
- Docs: docs/MONOREPO_BOOTSTRAP.md; CHANGELOG [Unreleased] Phase 003 entry.
- KHÔNG build runtime engine thật; KHÔNG migration DB; KHÔNG đổi business logic trong Phase 003.
- Package manager policy: docs/PACKAGE_MANAGER_POLICY.md (root ưu tiên pnpm workspace; app-local package-lock giữ nguyên trong Turn 2).
```

