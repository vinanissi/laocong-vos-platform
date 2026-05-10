# PHASE 001 — NEXT STEP

> Đề xuất phase tiếp theo dựa trên trạng thái sau Phase 001.

---

## 1. Việc cần làm NGAY (trước khi bắt đầu phase 002)

```txt
[ ] User review toàn bộ thay đổi của phase 001.
[ ] User xác nhận có commit không, commit message thế nào.
[ ] (Nếu commit) commit theo convention: phase(001): scaffold platform repo structure.
[ ] (Nếu push) chỉ push branch phase/001-platform-repo-refactor — KHÔNG merge.
[ ] User xác nhận có mở PR vào dev hay giữ branch riêng làm baseline.
```

---

## 2. Phase 002 đề xuất — `PHASE_002_ARCHITECTURE_DOCS_MIGRATION`

### Mục tiêu

Convert tài liệu nguồn từ `.myNotes/` sang `00_SYSTEM_BRAIN/architecture/`
một cách append-only, có versioning rõ.

### Deliverable

```txt
00_SYSTEM_BRAIN/architecture/
├─ 00_overview.md                     (từ LAOCONG_VOS_PLATFORM_ARCHITECTURE.md + 00_prompt)
├─ 10_core-runtime.md
├─ 20_services.md
├─ 30_apps.md
├─ 40_integrations.md
├─ 50_database.md
├─ 60_event-flow.md
├─ 70_state-machines.md
├─ 80_security-permission.md
├─ 90_maturity-model.md
└─ diagrams/
   ├─ event-flow.mmd
   ├─ task-state-machine.mmd
   └─ layered-architecture.mmd

00_SYSTEM_BRAIN/decisions/
└─ ADR-0001-adopt-operational-runtime-platform.md

docs/
└─ ARCHITECTURE_DECISION_RECORDS.md   (index)
```

### Out-of-scope phase 002

```txt
- KHÔNG xoá .myNotes/ (giữ làm raw vault).
- KHÔNG sửa code.
- KHÔNG scaffold engine.
```

---

## 3. Phase 003 đề xuất — `PHASE_003_MONOREPO_BOOTSTRAP`

### Mục tiêu

Monorepo-fy `package.json` (pnpm workspaces hoặc npm workspaces) để chuẩn
bị cho việc scaffold `apps/` + `services/` + `packages/` + `runtime/`.

### Deliverable

```txt
- package.json (root) chuyển sang workspaces.
- pnpm-workspace.yaml (nếu chọn pnpm).
- packages/core-contracts/package.json (skeleton).
- packages/runtime-sdk/package.json (skeleton).
- packages/test-console-kit/package.json (skeleton).
- tsconfig.base.json (TypeScript chuẩn).
- .editorconfig, .prettierrc, .eslintrc (lint/style chung).
- scripts/check-structure.mjs (CI check không vi phạm boundary).
```

### ADR cần có

- ADR-0002: choose pnpm vs npm workspaces.
- ADR-0003: TypeScript baseline + strict mode.
- ADR-0004: lint/format toolchain.

---

## 4. Phase 004 đề xuất — `PHASE_004_DATABASE_BOOTSTRAP`

### Mục tiêu

Khởi tạo Supabase project skeleton + migration đầu tiên.

### Deliverable

```txt
- database/supabase/config.toml.
- database/migrations/202605XXXXXX__init_tenant_schema.sql.
- database/migrations/202605XXXXXX__init_event_store.sql.
- database/migrations/202605XXXXXX__init_audit_log.sql.
- database/seed/dev/00_tenants.sql.
- database/schema/README.md (ERD reference).
- infra/supabase/README.md (cấu hình project link).
```

### Quy tắc

```txt
- Append-only migration.
- RLS bật mặc định.
- KHÔNG seed prod.
- Mọi bảng có: id (uuid), created_at, updated_at, created_by, updated_by, tenant_id.
```

---

## 5. Phase 005 đề xuất — `PHASE_005_RUNTIME_COMMAND_ENGINE_SKELETON`

### Mục tiêu

Bắt đầu code Core Runtime — engine đầu tiên: `runtime/command-engine/`.

### Deliverable

```txt
- runtime/command-engine/src/CommandBus.ts (skeleton).
- runtime/command-engine/src/types.ts (Command, CommandResult, Handler).
- runtime/command-engine/test-console/ (TEST CONSOLE STANDARD).
- packages/core-contracts/src/command.ts.
- tests/unit/command-engine/*.test.ts.
- 00_SYSTEM_BRAIN/decisions/ADR-0005-command-engine-design.md.
```

### Quy tắc Test Console (lần đầu áp dụng)

```txt
- Test console phải chạy được offline.
- Mock command in → quan sát event out + state + audit.
- PR không pass nếu không có test console + screenshot.
```

---

## 6. Roadmap dài hạn (tham khảo)

```txt
PHASE_001  Platform repo refactor                    [DONE - branch chưa merge]
PHASE_002  Architecture docs migration               [đề xuất]
PHASE_003  Monorepo bootstrap                        [đề xuất]
PHASE_004  Database bootstrap                        [đề xuất]
PHASE_005  Runtime — command-engine skeleton         [đề xuất]
PHASE_006  Runtime — event-engine + audit-engine     [tương lai]
PHASE_007  Runtime — workflow-engine + task-engine   [tương lai]
PHASE_008  Runtime — permission-engine               [tương lai]
PHASE_009  Services — api gateway                    [tương lai]
PHASE_010  Services — worker (queue consumer)        [tương lai]
PHASE_011  Apps — admin-web scaffold (Next.js)       [tương lai]
PHASE_012  Apps — staff-web scaffold (Next.js)       [tương lai]
PHASE_013  Integrations — google-workspace + gas-support adapter [tương lai]
PHASE_014  Integrations — notification (email/telegram/zalo)     [tương lai]
PHASE_015  Services — ai-runtime (assist only)       [tương lai]
PHASE_016  CI/CD — GitHub Actions + Vercel + Supabase deploy    [tương lai]
PHASE_017  Test infra — e2e + reports                [tương lai]
```

---

## 7. Khuyến nghị cho user

```txt
1. Review IMPLEMENTATION_REPORT.md trước khi commit.
2. Cân nhắc tạo dev branch (git checkout -b dev) ngay phase 001 để chuẩn bị
   luồng feature → phase → dev → release → main.
3. Chưa cần push remote ngay — có thể giữ phase 001 local làm baseline,
   gộp với phase 002 (docs migration) thành 1 PR đầu tiên vào dev.
4. Nếu muốn thử nghiệm trước, dùng experiment/* branch — đừng dùng phase/*.
```
