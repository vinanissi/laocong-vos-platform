# LAOCONG_VOS_PLATFORM

> **Operational Runtime Platform** — a runtime-first, human-guided, AI-assisted Operational Workspace OS for SMEs, cooperatives, fleet/logistics, field workforce and service operations.

---

## 1. Định vị hệ thống

LAOCONG_VOS_PLATFORM **không** phải là:

- một hệ Google Sheet + Apps Script làm trung tâm
- một bộ automation script
- một AI demo / chatbot wrapper
- một hệ "AI tự quyết định runtime"

LAOCONG_VOS_PLATFORM **là**:

```txt
Operational Runtime Platform
+
Human-guided
+
AI-assisted
+
Append-only
+
Audit-first
+
Event-driven
+
Production-safe
```

Triết lý cuối cùng:

> "LAOCONG_VOS không thay thế con người.
> Nó giúp con người vận hành mạnh hơn
> bằng runtime + automation + AI assistance."

---

## 2. Phân lớp kiến trúc

| Layer | Vai trò | Sở hữu |
|---|---|---|
| **Core Runtime** (`runtime/`) | Lõi vận hành — nguồn sự thật của hệ | workflow, runtime, state, audit, event, permission, contract |
| **Services** (`services/`) | Backend services bao quanh runtime | api, worker, ai-runtime, notification, auth |
| **Database** (`database/`) | Storage layer (Supabase / Postgres) | schema, migration, seed |
| **Apps** (`apps/`) | UI layer (React / Next.js) | admin-web, staff-web, member-web, public-web |
| **Packages** (`packages/`) | Shared contracts & SDK dùng chung | core-contracts, runtime-sdk, ui-kit, validators, event-bus, test-console-kit |
| **Integrations** (`integrations/`) | Cầu nối ra hệ ngoài — **không** giữ business truth | bridge, sync, import/export, notification, external API |
| **Infra** (`infra/`) | Deployment / CI / Vercel / Supabase config | — |
| **Tests** (`tests/`) | unit / integration / e2e / reports | — |
| **00_SYSTEM_BRAIN** | Bộ não tài liệu & report của hệ | architecture, decisions, phase-reports, ai-handoff, runbooks |

---

## 3. Vai trò Google Workspace / Apps Script

> **GWS / GAS chỉ còn là Integration Support Layer.**

| Đúng | Sai |
|---|---|
| GAS = adapter hỗ trợ | Business logic nằm trong Apps Script |
| Sheet = export / import target | Sheet = source of truth |
| Drive = file storage | Drive = state store |
| GWS = 1 integration trong hệ sinh thái | GWS = core runtime |

Xem chi tiết tại [`docs/INTEGRATION_BOUNDARY.md`](./docs/INTEGRATION_BOUNDARY.md).

---

## 4. Stack giai đoạn 1

| Vai trò | Công nghệ |
|---|---|
| AI operator-builder IDE | Cursor Pro |
| Source of truth + CI/CD | GitHub |
| FE deployment + preview env | Vercel |
| Postgres + Auth + Realtime + Storage | Supabase |
| Support layer (Drive/Gmail/Docs/report) | Google Workspace |

---

## 5. Cấu trúc repo

Xem chi tiết tại [`docs/REPO_STRUCTURE.md`](./docs/REPO_STRUCTURE.md).

```txt
LAOCONG_VOS_PLATFORM/
├─ 00_SYSTEM_BRAIN/   # tài liệu, phase reports, ai-handoff, runbooks
├─ docs/              # tài liệu sản phẩm & quy ước
├─ apps/              # UI layer
├─ services/          # backend services
├─ database/          # supabase schema/migrations/seed
├─ packages/          # shared contracts + SDK
├─ runtime/           # CORE — command/event/workflow/task/permission/audit engines
├─ integrations/      # GWS/GAS/Lark/Telegram/AI providers/...
├─ infra/             # vercel/supabase/github-actions
├─ tests/             # unit/integration/e2e/reports
├─ scripts/
└─ .cursor/           # rules + prompts cho Cursor
```

---

## 6. Git workflow

Xem chi tiết tại [`docs/GIT_BRANCH_STRATEGY.md`](./docs/GIT_BRANCH_STRATEGY.md).

Luồng chuẩn:

```txt
feature/*  →  phase/*  →  dev  →  release/*  →  main
```

---

## 7. Production-safe rules

```txt
1. Không code trực tiếp trên main
2. Không merge nếu chưa có test report
3. Không redesign core tùy tiện
4. Không destructive migration
5. Không automation-first
6. Không để integration giữ business truth
7. Mỗi phase phải có report
8. Mỗi module phải có test console
9. Append-only
10. Audit-friendly
```

---

## 8. Commands (template — sẽ thay khi monorepo lên runtime)

Xem `package.json`. Hiện tại đang giữ template IDP để không phá script hiện hữu.

---

## 9. Tham chiếu nội bộ

- Kiến trúc đầy đủ: [`.myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md`](./.myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md)
- Triết lý vận hành: [`.myNotes/00_prompt`](./.myNotes/00_prompt)
- Operational Runtime Architecture Summary: `.myNotes/LAOCONG_VOS_Operational_Runtime_Architecture_Summary.docx`
- Cursor rules: [`.cursor/rules/laocong-vos-platform.md`](./.cursor/rules/laocong-vos-platform.md)
- Integration boundary: [`docs/INTEGRATION_BOUNDARY.md`](./docs/INTEGRATION_BOUNDARY.md)

---

## 10. Trạng thái hiện tại

| Item | Trạng thái |
|---|---|
| Repo bootstrap | DONE (IDP WEB_APP template) |
| Phase 001 — Repo structure refactor | IN PROGRESS (branch `phase/001-platform-repo-refactor`) |
| Core Runtime modules | NOT YET (placeholder folders only) |
| Services | NOT YET (placeholder folders only) |
| Apps | NOT YET (placeholder folders only) |
| Integrations | NOT YET (placeholder folders only) |
| GAS legacy modules | NONE FOUND in repo (slot reserved at `integrations/gas-support/legacy-modules/`) |
