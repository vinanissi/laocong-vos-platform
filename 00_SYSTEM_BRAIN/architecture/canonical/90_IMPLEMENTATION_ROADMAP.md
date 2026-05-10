# 90 — Implementation Roadmap

## Status
Draft Canonical

## Purpose

Roadmap triển khai LAOCONG_VOS_PLATFORM theo các phase rõ ràng, append-only.
Tài liệu này khoá rõ:

- Phase nào đã DONE / IN PROGRESS / PENDING.
- Output dự kiến mỗi phase.
- Open questions cần user quyết.

> Roadmap này là **draft canonical** — sẽ được rà soát lại ở cuối Phase 002.
> Các phase tương lai (003+) là **dự kiến** — sẽ chốt bằng ADR riêng khi tới.

---

## Core Principles

```txt
1. Mỗi phase có folder report 6 file đầy đủ trước khi merge.
2. Mỗi phase có branch riêng phase/<NNN>-<short-name>.
3. Phase append-only — KHÔNG xoá phase cũ.
4. Build for L2/L3 + Architect for L4 + Guardrail for L5.
5. Production-safe trước, tốc độ sau.
```

---

## Roadmap mức cao

| Phase | Tên ngắn | Status | Branch | Commit |
|---|---|---|---|---|
| 001 | Platform Repo Refactor | **DONE** | `phase/001-platform-repo-refactor` (đã push) + `dev` | `d27b7b9` |
| 002 | Architecture Docs Migration | **Ready for Turn 6 commit** (Turn 1..5 DONE — ADR Accepted, ADR index, README, CHANGELOG; canonical giữ Draft Canonical theo user) | `phase/002-architecture-docs-migration` (chưa commit, chưa push — chờ user duyệt + PAT rotated) | — |
| 003 | Monorepo Bootstrap | PENDING | `phase/003-monorepo-bootstrap` | — |
| 004 | Database Bootstrap | PENDING | `phase/004-database-bootstrap` | — |
| 005 | Runtime — Command Engine Skeleton | PENDING | `phase/005-runtime-command-engine` | — |
| 006 | Runtime — Event + Audit Engine | PENDING | `phase/006-runtime-event-audit` | — |
| 007 | Runtime — Workflow + Task Engine | PENDING | `phase/007-runtime-workflow-task` | — |
| 008 | Runtime — Permission Engine | PENDING | `phase/008-runtime-permission` | — |
| 009 | Services — API Gateway | PENDING | `phase/009-services-api` | — |
| 010 | Services — Worker (queue consumer) | PENDING | `phase/010-services-worker` | — |
| 011 | Apps — Admin Web Scaffold (Next.js) | PENDING | `phase/011-apps-admin-web` | — |
| 012 | Apps — Staff Web Scaffold | PENDING | `phase/012-apps-staff-web` | — |
| 013 | Integrations — Google Workspace + GAS Support Adapter | PENDING | `phase/013-integration-gas-gws` | — |
| 014 | Integrations — Notification (email/telegram/zalo) | PENDING | `phase/014-integration-notification` | — |
| 015 | Services — AI Runtime (assist only) | PENDING | `phase/015-services-ai-runtime` | — |
| 016 | Infra — CI/CD Bootstrap | PENDING | `phase/016-infra-ci-cd` | — |
| 017 | Test Infra — E2E + Reports | PENDING | `phase/017-test-infra` | — |

---

## Phase 001 — DONE

**Mục tiêu:** Refactor cấu trúc repo theo kiến trúc Operational Runtime
Platform; tạo nền tảng tài liệu + Cursor rule; demote GAS/GWS xuống integration.

**Output:**

- 57 thư mục mục tiêu.
- 9 layer README.
- 3 docs convention (`REPO_STRUCTURE`, `GIT_BRANCH_STRATEGY`, `INTEGRATION_BOUNDARY`).
- `.cursor/rules/laocong-vos-platform.md` (alwaysApply).
- 6 file phase report.
- `CHANGELOG.md`.

**Trạng thái:** committed `d27b7b9`, pushed lên `origin/phase/001-...` và `origin/dev`.

---

## Phase 002 — IN PROGRESS

**Mục tiêu:** Migrate tài liệu kiến trúc rải rác (`.myNotes/*`) vào
`00_SYSTEM_BRAIN/architecture/` theo cấu trúc canonical, append-only.

**Pipeline (6 turn):**

| Turn | Việc | Status |
|---|---|---|
| 1 | Scaffold phase + 5 ADR Draft | ✅ DONE |
| 2 | Sanitize PAT + snapshot 2 source-notes (1 SKIPPED .docx) + INDEX.md | ✅ DONE |
| 3 | Build 10 canonical docs `00_..90_` | ✅ DONE |
| 4 | Diagrams Mermaid (`event-flow`, `task-state-machine`, `layered-architecture`) + append refs vào canonical 00/40/50 | ✅ DONE |
| 5 | ADR-0001..0005 Accepted + `docs/ARCHITECTURE_DECISION_RECORDS.md` + update `00_SYSTEM_BRAIN/architecture/README.md` + `CHANGELOG.md` (canonical giữ Draft Canonical theo user; .docx bỏ qua tạm) | ✅ DONE |
| 6 | Commit (chia nhỏ) + `git push -u origin phase/002-...` + PR vào `dev` (**CHỈ KHI USER YÊU CẦU + ĐÃ rotate PAT**) | **Ready for Turn 6 commit** |

---

## Phase 003 — Monorepo Bootstrap (đề xuất)

**Mục tiêu:** Monorepo-fy `package.json` (pnpm/npm workspaces), TypeScript
baseline, lint/format, `.gitattributes`.

**Output dự kiến:**

```txt
- package.json (root) → workspaces.
- pnpm-workspace.yaml (nếu chọn pnpm).
- packages/core-contracts/package.json (skeleton).
- packages/runtime-sdk/package.json (skeleton).
- packages/test-console-kit/package.json (skeleton).
- tsconfig.base.json.
- .editorconfig, .prettierrc, .eslintrc.
- .gitattributes (LF normalization + binary).
- scripts/check-structure.mjs (CI verify boundary).
- ADR-0006: choose pnpm vs npm workspaces.
- ADR-0007: TypeScript strict baseline.
- ADR-0008: lint/format toolchain.
```

---

## Phase 004 — Database Bootstrap (đề xuất)

**Mục tiêu:** Khởi tạo Supabase + migration baseline.

**Output dự kiến:**

```txt
- database/supabase/config.toml.
- database/migrations/202605XXXXXX__init_tenant_schema.sql.
- database/migrations/202605XXXXXX__init_event_store.sql.
- database/migrations/202605XXXXXX__init_audit_log.sql.
- database/seed/dev/00_tenants.sql.
- database/schema/README.md (ERD reference).
- infra/supabase/README.md.
- ADR-0009: Postgres event_store schema policy.
- ADR-0010: RLS policy default + tenant isolation.
```

Quy tắc:

```txt
- Append-only migration (KHÔNG sửa migration đã merge).
- RLS bật mặc định.
- KHÔNG seed prod.
- Mọi bảng có: id, created_at, updated_at, created_by, updated_by, tenant_id.
```

---

## Phase 005 — Runtime Command Engine Skeleton (đề xuất)

**Mục tiêu:** Engine đầu tiên trong `runtime/`. Lần đầu áp Test Console Standard chính thức.

**Output dự kiến:**

```txt
- runtime/command-engine/src/CommandBus.ts (skeleton).
- runtime/command-engine/src/types.ts.
- runtime/command-engine/test-console/ (TEST CONSOLE STANDARD).
- packages/core-contracts/src/command.ts.
- tests/unit/command-engine/*.test.ts.
- ADR-0011: command-engine design + DI strategy.
```

Quy tắc Test Console (lần đầu áp dụng chính thức):

```txt
- Test console PHẢI chạy được offline.
- Mock command in → quan sát event out + state + audit.
- PR không pass nếu thiếu test console + screenshot.
```

---

## Phase 006–008 — Runtime engines còn lại (đề xuất)

| Phase | Engine | Phụ thuộc |
|---|---|---|
| 006 | event-engine + audit-engine | command-engine (005) |
| 007 | workflow-engine + task-engine | event-engine (006) |
| 008 | permission-engine | command-engine + audit-engine (005, 006) |

Mỗi phase: Test Console + ADR + 6 file report.

---

## Phase 009–010 — Services (đề xuất)

| Phase | Service | Mục tiêu |
|---|---|---|
| 009 | services/api | HTTP gateway, dispatch command |
| 010 | services/worker | Queue consumer, retry/backoff/DLQ |

---

## Phase 011–012 — Apps (đề xuất)

| Phase | App | Mục tiêu |
|---|---|---|
| 011 | apps/admin-web | Scaffold Next.js + auth + first projection page |
| 012 | apps/staff-web | Scaffold Next.js + operational UI (next-step / focus mode) |

---

## Phase 013–015 — Integrations + AI (đề xuất)

| Phase | Scope | Mục tiêu |
|---|---|---|
| 013 | integrations/google-workspace + integrations/gas-support adapter | Bridge Sheet/Drive + GAS HTTP adapter |
| 014 | integrations/email + telegram + zalo + lark | Notification dispatcher |
| 015 | services/ai-runtime + integrations/openai (hoặc gemini/anthropic) | AI assist (suggest only, audit đầy đủ) |

---

## Phase 016–017 — Infra + Test (đề xuất)

| Phase | Scope | Mục tiêu |
|---|---|---|
| 016 | infra/github-actions + infra/vercel + infra/supabase | CI/CD baseline |
| 017 | tests/e2e + tests/reports | E2E test infra + report dashboard |

---

## Open Questions (cần user quyết trước phase tương ứng)

```txt
Q1 (P003): pnpm vs npm workspaces?
Q2 (P003): TypeScript strict mode bật full ngay từ đầu?
Q3 (P003): có bật .gitattributes LF normalization toàn repo?
Q4 (P004): event_store dùng JSONB hay typed columns cho payload?
Q5 (P004): RLS theo tenant_id hay theo organization_id?
Q6 (P005): command-engine dùng DI container nào (tsyringe / inversify / none)?
Q7 (P006): event-bus giai đoạn 1: Postgres LISTEN/NOTIFY hay polling table?
Q8 (P011): admin-web theme/UI kit (Mantine / Radix / shadcn / custom)?
Q9 (P013): GAS adapter auth: service account hay JWT?
Q10 (P016): GitHub Actions runner self-hosted hay GitHub-hosted?
```

(KHÔNG tự trả lời ở Turn 3 — sẽ ADR ở phase tương ứng.)

---

## Guardrails

```txt
G-1  Mỗi phase = 1 branch + 1 folder report.
G-2  Mỗi phase mới PHẢI từ dev (sau khi phase trước merge).
G-3  Mỗi phase tạo ra runtime engine PHẢI có Test Console.
G-4  KHÔNG bỏ phase nào trong dependency chain.
G-5  KHÔNG ép tốc độ — production-safe trước.
G-6  KHÔNG redesign cấu trúc Phase 001 — chỉ extend.
G-7  Mỗi quyết định lớn ở phase mới PHẢI có ADR-00XX.
G-8  Mỗi phase đi kèm cập nhật roadmap này (file 90).
G-9  Roadmap append-only — KHÔNG xoá phase cũ.
G-10 KHÔNG push khi user chưa yêu cầu rõ.
```

---

## Non-goals

```txt
- Không phase "all-in-one" (1 phase làm runtime + apps + integration).
- Không skip Test Console "vì gấp".
- Không scaffold UI trước khi có runtime engine tối thiểu.
- Không deploy production khi chưa qua release/* + regression test.
- Không tự đẩy maturity (xem 80_MATURITY_MODEL.md).
```

---

## References

- Phase 001 report: [`../../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/`](../../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/)
- Phase 002 (current): [`../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/`](../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/)
- Phase 002 NEXT_STEP: [`../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/NEXT_STEP.md`](../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/NEXT_STEP.md)
- Phase 001 NEXT_STEP: [`../../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/NEXT_STEP.md`](../../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/NEXT_STEP.md)
- ADR foundation: [`../../decisions/`](../../decisions/)
- Repo structure: [`../../../docs/REPO_STRUCTURE.md`](../../../docs/REPO_STRUCTURE.md)
- Git workflow: [`../../../docs/GIT_BRANCH_STRATEGY.md`](../../../docs/GIT_BRANCH_STRATEGY.md)
- Maturity: [`./80_MATURITY_MODEL.md`](./80_MATURITY_MODEL.md)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 3 — Initial canonical version.
```
