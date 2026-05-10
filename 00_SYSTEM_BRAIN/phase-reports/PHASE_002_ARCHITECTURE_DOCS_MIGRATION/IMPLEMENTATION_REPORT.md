# PHASE 002 — IMPLEMENTATION REPORT

> Báo cáo việc đã làm trong Phase 002.
> **Trạng thái:** TURN 5 DONE — đã promote ADR-0001..0005 từ Draft → Accepted, tạo `docs/ARCHITECTURE_DECISION_RECORDS.md`, update `architecture/README.md`, update `CHANGELOG.md`, mark Phase 002 = "Ready for Turn 6 commit". Canonical docs + diagrams giữ Status: `Draft Canonical` (theo quyết định user). Chưa commit, chưa push.

---

## 1. Branch & Git

| Item | Giá trị |
|---|---|
| Branch hiện tại | `phase/002-architecture-docs-migration` |
| Tách từ | `dev` (commit `d27b7b9` — Phase 001 baseline) |
| Trạng thái commit | **CHƯA commit Phase 002** (theo yêu cầu user) |
| Trạng thái push | **CHƯA push Phase 002** |
| Trạng thái merge | **CHƯA merge** |

---

## 2. Pre-context — kết quả Phase 001 trước Phase 002

| Item | Trạng thái |
|---|---|
| `phase/001-platform-repo-refactor` commit | `d27b7b9` — `phase(001): scaffold operational runtime platform structure` |
| Push `phase/001-platform-repo-refactor` | DONE → `origin/phase/001-platform-repo-refactor` |
| `dev` branch | TẠO MỚI từ `d27b7b9` → push `origin/dev` |
| `main` branch | KHÔNG đụng (vẫn ở commit gốc IDP `7288da0`) |

---

## 3. Folder đã tạo trong Phase 002 (turn 1)

| Folder | Trạng thái | Nội dung |
|---|---|---|
| `00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/` | NEW | 6 file phase report |
| `00_SYSTEM_BRAIN/architecture/source-notes/` | NEW | trống — sẽ chứa snapshot ở turn 2 |
| `00_SYSTEM_BRAIN/architecture/canonical/` | NEW | trống — sẽ chứa canonical docs ở turn 3 |
| `00_SYSTEM_BRAIN/decisions/` | EXISTED (Phase 001 đã tạo) | nay có thêm 5 ADR |

---

## 4. File phase report đã tạo (6 file)

| File | Trạng thái |
|---|---|
| `00_SYSTEM_BRAIN/phase-reports/PHASE_002_*/README.md` | NEW |
| `00_SYSTEM_BRAIN/phase-reports/PHASE_002_*/SPEC.md` | NEW |
| `00_SYSTEM_BRAIN/phase-reports/PHASE_002_*/IMPLEMENTATION_REPORT.md` | NEW (file này) |
| `00_SYSTEM_BRAIN/phase-reports/PHASE_002_*/TEST_REPORT.md` | NEW |
| `00_SYSTEM_BRAIN/phase-reports/PHASE_002_*/AI_HANDOFF.md` | NEW |
| `00_SYSTEM_BRAIN/phase-reports/PHASE_002_*/NEXT_STEP.md` | NEW |

---

## 5. ADR foundation đã tạo (5 file, Status: Draft)

| File | Status | Tóm tắt quyết định |
|---|---|---|
| `00_SYSTEM_BRAIN/decisions/ADR-0001-adopt-operational-runtime-platform.md` | Draft | Định vị LAOCONG_VOS là Operational Runtime Platform, không còn GAS-as-core. |
| `00_SYSTEM_BRAIN/decisions/ADR-0002-demote-gas-gws-to-integration-layer.md` | Draft | GAS/GWS chính thức chuyển xuống integration support layer. |
| `00_SYSTEM_BRAIN/decisions/ADR-0003-runtime-first-architecture.md` | Draft | Runtime-first; UI/services/integration/AI bao quanh runtime. |
| `00_SYSTEM_BRAIN/decisions/ADR-0004-event-driven-operational-runtime.md` | Draft | Event-driven, append-only, idempotent handler, replayable. |
| `00_SYSTEM_BRAIN/decisions/ADR-0005-human-override-policy.md` | Draft | Human override luôn tồn tại: stop/rollback/reject/reassign/override. |

> Status sẽ được nâng lên **Accepted** ở turn cuối cùng của Phase 002, sau khi
> canonical/ và index ADR đã hoàn tất và user đã review.

---

## 6. Việc CHƯA làm trong Phase 002 (sẽ làm ở turn 2..5)

| Hạng mục | Sẽ làm ở turn | Trạng thái |
|---|---|---|
| Snapshot tài liệu nguồn vào `architecture/source-notes/` | Turn 2 | **DONE** (xem section "Turn 2 — Source Notes Snapshot") |
| Build 10 file canonical (00..90) trong `architecture/canonical/` | Turn 3 | **DONE** (xem section "Turn 3 — Build Canonical Architecture Doctrine") |
| Vẽ 3 Mermaid diagrams trong `architecture/canonical/diagrams/` | Turn 4 | **DONE** (xem section "Turn 4 — Mermaid Diagrams") |
| Promote ADR + ADR index + update architecture/README + CHANGELOG | Turn 5 | **DONE** (xem section "Turn 5 — Architecture Doctrine Finalization") |
| 3 diagrams Mermaid trong `architecture/canonical/diagrams/` | Turn 4 | PENDING |
| Nâng 5 ADR Draft → Accepted | Turn 5 | PENDING |
| `docs/ARCHITECTURE_DECISION_RECORDS.md` (index ADR) | Turn 5 | PENDING |
| Cập nhật `00_SYSTEM_BRAIN/architecture/README.md` link tới `canonical/` | Turn 5 | PENDING |
| Cập nhật `CHANGELOG.md` (Phase 002 — Unreleased) | Turn 5 | PENDING |
| Commit + push + PR vào `dev` | Turn 6 (CHỈ KHI USER YÊU CẦU) | PENDING |

---

## 7. Kiểm tra ràng buộc

| Ràng buộc | Tuân thủ |
|---|---|
| Không xoá file | ✅ |
| Không sửa business logic | ✅ |
| Không sửa runtime behavior | ✅ |
| Không deploy | ✅ |
| Không merge main | ✅ |
| Không push main | ✅ |
| Không tạo automation | ✅ (mọi thao tác làm thủ công + AI assist) |
| Không di chuyển code nếu chưa chắc nguồn/đích | ✅ (chưa di chuyển nội dung gì cả) |
| Production-safe, append-only, audit-friendly | ✅ |
| Không đổi cấu trúc Phase 001 | ✅ |
| `.myNotes/` còn nguyên | ✅ (chưa đụng) |
| `src/`, `.idp*.json`, `.project.json`, `package.json`, `.github/` còn nguyên | ✅ |

---

## 8. File / folder đã DI CHUYỂN

```txt
KHÔNG có file/folder nào bị di chuyển trong turn này.
Lý do: Phase 002 turn 1 chỉ scaffold khung + 5 ADR Draft.
Migration nội dung thật sẽ làm ở turn 2..5 và là COPY (snapshot),
KHÔNG phải MOVE — file gốc trong .myNotes/ giữ nguyên vĩnh viễn.
```

---

## 9. Điểm cần lưu ý cho phiên kế tiếp

```txt
1. Đây hiện là turn 2/6 của Phase 002.
2. KHÔNG commit Phase 002 ở turn này (theo yêu cầu user).
3. Khi commit ở turn cuối, chia thành nhiều commit nhỏ theo convention:
   - phase(002): scaffold phase 002 + adr foundation
   - phase(002): snapshot architecture source-notes
   - phase(002): build architecture canonical 00..90
   - phase(002): add diagrams (event-flow, task-state-machine, layered-architecture)
   - phase(002): finalize adr 0001..0005 + index
4. Khi push, chỉ push branch phase/002-architecture-docs-migration. KHÔNG push main.
5. Khi merge, qua PR vào dev. KHÔNG merge thẳng main.
6. Origin remote URL ĐÃ ĐƯỢC SANITIZE ở đầu turn 2 (xem section "Turn 2 — Source Notes Snapshot").
   User vẫn cần ROTATE PAT trên GitHub.
```

---

## 10. Turn 2 — Source Notes Snapshot (2026-05-10)

### 10.1. Security action — sanitize remote URL

| Item | Trạng thái |
|---|---|
| `git remote -v` checked | DONE |
| GitHub Personal Access Token (PAT) detected in origin URL | YES (token prefix `ghp_…`, full token NOT printed in any report file) |
| `git remote set-url origin https://github.com/vinanissi/laocong-vos-platform.git` | EXECUTED |
| Origin URL after sanitize | `https://github.com/vinanissi/laocong-vos-platform.git` (clean — no token) |
| User action still required | **YES — Rotate PAT on GitHub** (revoke the old token; the local `.git/config` was sanitized but the token may have been logged elsewhere). |
| Pushed in this turn | **NO** — per Phase 002 Turn 2 spec. |

### 10.2. Source files discovered

Tìm thấy **3 file** trong `.myNotes/`:

| # | File gốc | Size | Format |
|---|---|---|---|
| 1 | `.myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md` | 4170 bytes | Markdown |
| 2 | `.myNotes/00_prompt` | 6863 bytes | Plain text (no extension) |
| 3 | `.myNotes/LAOCONG_VOS_Operational_Runtime_Architecture_Summary.docx` | 38203 bytes | Microsoft Word `.docx` (binary) |

Không tìm thấy tài liệu kiến trúc cũ ở root (root chỉ có README.md / package.json / IDP config — đã được tạo / là template, không phải nguồn legacy).
Không tìm thấy "docs cũ có tính chiến lược" trong `docs/` (folder này chỉ chứa file tạo ở Phase 001: REPO_STRUCTURE / GIT_BRANCH_STRATEGY / INTEGRATION_BOUNDARY).

### 10.3. Snapshot result

| # | Source path | Snapshot file | Status |
|---|---|---|---|
| 1 | `.myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md` | `00_SYSTEM_BRAIN/architecture/source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md` | **SNAPSHOTTED** |
| 2 | `.myNotes/00_prompt` | `00_SYSTEM_BRAIN/architecture/source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md` | **SNAPSHOTTED** (treated as plain text, copied content verbatim, added `.md` extension + metadata header) |
| 3 | `.myNotes/LAOCONG_VOS_Operational_Runtime_Architecture_Summary.docx` | _(none)_ | **SKIPPED** — binary `.docx`, per Phase 002 SPEC: "Nếu file gốc không phải text hoặc không đọc được, không convert". Bản gốc giữ nguyên ở `.myNotes/`. |

### 10.4. Counts

| Metric | Count |
|---|---|
| Source files found | **3** |
| Snapshotted | **2** |
| Skipped | **1** (binary `.docx`) |
| Original files modified | **0** (`.myNotes/` không bị đụng) |
| Original files moved | **0** |
| Original files deleted | **0** |
| Code files touched | **0** (NO) |
| Runtime behavior changed | **0** (NO) |

### 10.5. New files created in Turn 2

```txt
00_SYSTEM_BRAIN/architecture/source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md   (NEW)
00_SYSTEM_BRAIN/architecture/source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md                 (NEW)
00_SYSTEM_BRAIN/architecture/source-notes/INDEX.md                                                     (NEW)
```

### 10.6. Files modified in Turn 2

```txt
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/IMPLEMENTATION_REPORT.md   (MODIFIED — section Turn 2 added)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/TEST_REPORT.md             (MODIFIED — Turn 2 checklist added)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/AI_HANDOFF.md              (MODIFIED — Turn 2 status + Turn 3 guidance added)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/NEXT_STEP.md               (MODIFIED — Turn 3 plan added)
```

### 10.7. Files / folders NOT touched

```txt
.myNotes/                              — KHÔNG đụng (3 file gốc nguyên trạng)
.project.json                          — KHÔNG đụng
src/index.js                           — KHÔNG đụng
package.json                           — KHÔNG đụng
.idp.config.json                       — KHÔNG đụng
.idp-environments.json                 — KHÔNG đụng
.github/                               — KHÔNG đụng
runtime/, services/, apps/,            — KHÔNG đụng (Phase 001 structure giữ nguyên)
   database/, packages/, integrations/,
   infra/, tests/, scripts/
00_SYSTEM_BRAIN/decisions/ADR-0001..0005  — KHÔNG đụng (giữ Status: Draft)
00_SYSTEM_BRAIN/architecture/canonical/   — KHÔNG đụng (sẽ build ở Turn 3)
00_SYSTEM_BRAIN/architecture/README.md    — KHÔNG đụng (sẽ update ở Turn 5)
docs/                                  — KHÔNG đụng
.cursor/                               — KHÔNG đụng
CHANGELOG.md                           — KHÔNG đụng (sẽ update ở Turn 5)
README.md (root)                       — KHÔNG đụng
```

### 10.8. Constraint compliance — Turn 2

| Constraint | Result |
|---|---|
| Branch đúng (`phase/002-architecture-docs-migration`) | ✅ PASS |
| Remote URL checked | ✅ PASS |
| PAT NOT printed in any report file | ✅ PASS |
| Source-notes folder exists | ✅ PASS |
| Source files copied only (no move) | ✅ PASS |
| Originals preserved in `.myNotes/` | ✅ PASS |
| `INDEX.md` created | ✅ PASS |
| No code touched | ✅ PASS |
| No runtime touched | ✅ PASS |
| No commit | ✅ PASS |
| No push | ✅ PASS |
| No merge | ✅ PASS |
| Append-only respected | ✅ PASS |
| Production-safe | ✅ PASS |
| Audit-friendly (every snapshot has metadata header) | ✅ PASS |

---

## 11. Turn 3 — Build Canonical Architecture Doctrine (2026-05-10)

### 11.1. Objective

Build 10 file **canonical architecture doctrine** trong
`00_SYSTEM_BRAIN/architecture/canonical/` từ:

- 2 SOURCE_NOTE_*.md trong `architecture/source-notes/` (KHÔNG đọc trực tiếp `.myNotes/`).
- 5 ADR draft trong `00_SYSTEM_BRAIN/decisions/`.
- Phase report Phase 001 + Phase 002 (turn 1, 2).

Tài liệu canonical = **official operational doctrine** — tiếng Việt, operational-first,
runtime-first, production-safe, ngắn gọn nhưng kiến trúc rõ.

### 11.2. Files created (10/10)

| # | File | Size | Topic |
|---|---|---|---|
| 1 | `canonical/00_PLATFORM_OVERVIEW.md` | ~7 KB | Định vị platform + 8 core principles + layered diagram + vision + append-only governance |
| 2 | `canonical/10_RUNTIME_FIRST_ARCHITECTURE.md` | ~7 KB | Runtime ownership table + 6 engines + isolation + command/event flow + override gắn vào runtime |
| 3 | `canonical/20_INTEGRATION_BOUNDARY.md` | ~7 KB | Layer ownership table (`Owns / Does NOT Own`) + adapter contract + anti-patterns + checklist |
| 4 | `canonical/30_GAS_GWS_SUPPORT_LAYER.md` | ~7 KB | Allowed/forbidden GAS use cases + repo isolation + 5-step migration direction (IMPORT→WRAP→SHADOW→CUTOVER→DEPRECATE) |
| 5 | `canonical/40_EVENT_DRIVEN_RUNTIME.md` | ~9 KB | Command/event contract schemas + queue/handler rules + audit fields + state machine sample + Mermaid flowchart |
| 6 | `canonical/50_HUMAN_OVERRIDE_POLICY.md` | ~7 KB | 5 quyền (STOP/ROLLBACK/REJECT/REASSIGN/OVERRIDE) + per-tier mapping + override role gợi ý + runbook responsibility |
| 7 | `canonical/60_AI_ASSISTED_OPERATION.md` | ~8 KB | AI = Operational Assistant + allowed/forbidden + autonomous zones (L5) + ai-runtime contract + AI audit fields |
| 8 | `canonical/70_GIT_AND_PHASE_GOVERNANCE.md` | ~7 KB | Branch types + flow + commit convention + 6-file phase template + PR checklist + 10 production-safe rules |
| 9 | `canonical/80_MATURITY_MODEL.md` | ~7 KB | L0–L5 levels + co-existence + Build/Architect/Guardrail strategy + 10 L4-ready requirements + L5 boundary |
| 10 | `canonical/90_IMPLEMENTATION_ROADMAP.md` | ~8 KB | Phase 001 DONE + 002 IN PROGRESS + 003-017 dự kiến + 10 open questions cho phase tương lai |

Tổng: ~74 KB, ~10 file, mỗi file có structure chuẩn:

```txt
# Title
## Status — Draft Canonical
## Purpose
## Core Principles
## (Architecture / Runtime / Boundary / ...)
## Guardrails
## Non-goals
## References (source-notes + ADR + phase report)
## Last reviewed
```

### 11.3. Source compliance

```txt
- Tất cả nội dung trích từ source-notes/* và ADR draft và phase report.
- KHÔNG đọc trực tiếp .myNotes/ ở turn này (kiểm tra integrity precheck: 3 file size unchanged).
- KHÔNG sửa source-notes/.
- KHÔNG sửa ADR draft.
- KHÔNG bịa implementation detail. Chỗ thiếu thông tin → ghi TODO / OPEN QUESTION.
```

### 11.4. Wording compliance

```txt
- Tiếng Việt.
- Operational-first.
- Runtime-first.
- Production-safe.
- Boundary rõ.
- Ngắn gọn nhưng kiến trúc rõ.
- KHÔNG marketing wording.
- KHÔNG "AI hype".
- KHÔNG vague wording.
- Mỗi file có Status / Purpose / Core Principles / Guardrails / Non-goals / References.
```

### 11.5. Mermaid diagram (yêu cầu trong file 40)

`40_EVENT_DRIVEN_RUNTIME.md` chứa Mermaid flowchart đầy đủ:

```txt
UI → command → command-engine → event_store → queue → worker
   → projection / audit / notification → integrations/* (external send)
```

3 file `.mmd` riêng biệt sẽ làm ở Turn 4 trong `canonical/diagrams/`.

### 11.6. Files modified in Turn 3

```txt
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/IMPLEMENTATION_REPORT.md   (MODIFIED — Section 11 thêm vào)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/TEST_REPORT.md             (MODIFIED — Section 10 Turn 3 checklist)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/AI_HANDOFF.md              (MODIFIED — Turn 3 status + Turn 4 guidance)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/NEXT_STEP.md               (MODIFIED — Turn 4 plan chi tiết)
```

### 11.7. Files / folders NOT touched (verify integrity)

```txt
.myNotes/                               — KHÔNG đụng (3 file: 4170 / 6863 / 38203 bytes — UNCHANGED)
00_SYSTEM_BRAIN/architecture/source-notes/   — KHÔNG sửa (INDEX + 2 SOURCE_NOTE giữ nguyên)
00_SYSTEM_BRAIN/decisions/ADR-0001..0005     — KHÔNG sửa (giữ Status: Draft)
00_SYSTEM_BRAIN/architecture/README.md       — KHÔNG đụng (sẽ update ở Turn 5)
docs/                                   — KHÔNG đụng
.cursor/                                — KHÔNG đụng
runtime/, services/, apps/,             — KHÔNG đụng (zero code change)
   database/, packages/, integrations/,
   infra/, tests/, scripts/
src/                                    — KHÔNG đụng
package.json, .idp*, .project.json, .github/  — KHÔNG đụng
README.md (root), CHANGELOG.md         — KHÔNG đụng (sẽ update ở Turn 5)
```

### 11.8. Constraint compliance — Turn 3

| Constraint | Result |
|---|---|
| Branch đúng (`phase/002-architecture-docs-migration`) | ✅ PASS |
| Source = chỉ source-notes + ADR + phase report (KHÔNG đọc `.myNotes/` trực tiếp) | ✅ PASS |
| `.myNotes/` integrity (sizes match) | ✅ PASS |
| `source-notes/` không bị sửa | ✅ PASS |
| ADR Draft không bị sửa | ✅ PASS |
| 10 file canonical đầy đủ structure (Status/Purpose/Core Principles/Guardrails/Non-goals/References) | ✅ PASS |
| Tiếng Việt, operational-first, runtime-first | ✅ PASS |
| Không marketing / AI hype / vague wording | ✅ PASS |
| Không tạo implementation detail giả (TODO/OPEN QUESTION ghi rõ chỗ thiếu) | ✅ PASS |
| Không sửa code | ✅ PASS |
| Không sửa runtime | ✅ PASS |
| Không deploy / push / merge / commit | ✅ PASS |
| Append-only respected | ✅ PASS |

---

## 12. Turn 4 — Mermaid Diagrams (2026-05-10)

### 12.1. Objective

Vẽ 3 Mermaid diagrams cho canonical architecture doctrine:

```txt
- event-flow.mmd            → minh hoạ event-driven runtime (40_EVENT_DRIVEN_RUNTIME.md)
- task-state-machine.mmd    → minh hoạ TASK lifecycle + override (40 + 50)
- layered-architecture.mmd  → minh hoạ 6 layer + governance (00 + 10 + 20)
```

Mỗi diagram là **canonical visualization** — KHÔNG là runtime implementation,
KHÔNG quyết định logic, KHÔNG thay thế canonical/ADR.

### 12.2. Folder created

```txt
00_SYSTEM_BRAIN/architecture/canonical/diagrams/   ← NEW
```

### 12.3. Files created (4/4)

| # | File | Type | Size | Doctrine reference |
|---|---|---|---|---|
| 1 | `canonical/diagrams/README.md` | Markdown | ~3 KB | Mục đích, quy tắc, danh sách, render hint, guardrails |
| 2 | `canonical/diagrams/event-flow.mmd` | Mermaid `flowchart` | ~3 KB | `40_EVENT_DRIVEN_RUNTIME.md`, ADR-0003/0004/0005 |
| 3 | `canonical/diagrams/task-state-machine.mmd` | Mermaid `stateDiagram-v2` | ~3 KB | `40` + `50_HUMAN_OVERRIDE_POLICY.md`, ADR-0004/0005 |
| 4 | `canonical/diagrams/layered-architecture.mmd` | Mermaid `flowchart` | ~5 KB | `00`, `10`, `20`, ADR-0001/0002/0003 |

### 12.4. Diagram content highlights

**`event-flow.mmd`** chứa:

```txt
- Actors: User/Operator + Human Override (với 5 quyền: STOP/REJECT/ROLLBACK/REASSIGN/OVERRIDE).
- 3 subgraph: command pipeline (API + Validator + Command Log) /
              event pipeline (Queue + Worker + Event Log + DLQ) /
              read side (Read Model).
- Audit Log append-only nhận audit từ mọi nhánh.
- Notification Adapter → Integrations (email/telegram/zalo/lark).
- Replay / Recovery node — manual + audit-heavy.
- 5 nhánh đầy đủ:
    happy path / reject path / compensation event / dead-letter / replay flow.
- Style: append-only nodes (vàng), override (đỏ nhạt), integrations (xanh dương),
         runtime (xanh lá).
- Inline comments: command không mutate state khi chưa qua validator;
                   event log append-only; worker idempotent.
```

**`task-state-machine.mmd`** chứa:

```txt
- States chính (7): NEW, ACKNOWLEDGED, IN_PROGRESS, WAITING, REVIEW, DONE, CLOSED.
- States phụ/ngoại lệ (4): REJECTED, CANCELLED, TIMED_OUT, ROLLED_BACK.
- Transitions với event names (13 event):
    TASK_CREATED, TASK_ACKNOWLEDGED, TASK_STARTED, TASK_WAITING,
    TASK_RESUMED, TASK_SUBMITTED_FOR_REVIEW, TASK_REVIEW_APPROVED,
    TASK_REVIEW_REJECTED, TASK_DONE, TASK_CLOSED, TASK_CANCELLED,
    TASK_TIMED_OUT, TASK_ROLLED_BACK.
- Recovery transitions: TIMED_OUT → ACKNOWLEDGED, ROLLED_BACK → NEW (với traceId link).
- Notes inline cho mỗi nhóm trạng thái nhạy cảm:
    NEW (audit), REVIEW (3 nhánh), CANCELLED (destructive),
    ROLLED_BACK (compensation), TIMED_OUT (recoverable).
- Header comment ghi rõ: doctrine ≠ implementation; destructive transition
  yêu cầu human-override + permission.
```

**`layered-architecture.mmd`** chứa:

```txt
- 6 layer + 1 governance layer cross-cutting:
    APPS (admin-web, staff-web, member-web, public-web)
    SERVICES (api, worker, ai-runtime, notification, auth)
    RUNTIME — CORE (command-engine, event-engine, workflow-engine,
                    task-engine, permission-engine, audit-engine)
    DATABASE (Supabase, event_store, audit_log)
    PACKAGES (core-contracts, runtime-sdk, event-bus, ui-kit, validators, test-console-kit)
    INTEGRATIONS (gas-support, google-workspace, lark, zalo, telegram, email,
                  openai, gemini, anthropic, ocr, maps, payment, misa, storage)
    GOVERNANCE (test-console-kit usage, ADR + canonical docs)
- Allowed flows được vẽ rõ:
    apps → services / runtime-sdk
    services → runtime
    runtime → database (event_store + audit_log append-only)
    integrations → services (KHÔNG bypass)
    notification OUT → email/telegram/zalo/lark
    AI suggested command → API (require human accept)
- Forbidden flows được liệt kê trong "negative space" (block comment header):
    apps -×-> database
    integrations -×-> database
    integrations -×-> runtime (trực tiếp)
    services -×-> database (nghiệp vụ)
    ai-runtime -×-> runtime (tự dispatch)
- Style hint: append (vàng), governance (xám), integration (xanh dương), runtime (xanh lá).
```

### 12.5. Canonical references appended (Part D — minimal change)

KHÔNG rewrite canonical docs. Chỉ APPEND 2 dòng reference vào cuối mục
`## References` của 3 file:

| File | Trước | Sau |
|---|---|---|
| `canonical/00_PLATFORM_OVERVIEW.md` | 6 reference | +2 (layered-architecture.mmd + diagrams/README.md) |
| `canonical/40_EVENT_DRIVEN_RUNTIME.md` | 7 reference | +2 (event-flow.mmd + diagrams/README.md) |
| `canonical/50_HUMAN_OVERRIDE_POLICY.md` | 9 reference | +2 (task-state-machine.mmd + diagrams/README.md) |

KHÔNG sửa `Status`, `Purpose`, `Core Principles`, `Guardrails`, `Non-goals`,
`Last reviewed` của 3 file. KHÔNG sửa 7 canonical file còn lại.

### 12.6. Files modified in Turn 4

```txt
00_SYSTEM_BRAIN/architecture/canonical/diagrams/                       (NEW folder)
00_SYSTEM_BRAIN/architecture/canonical/diagrams/README.md              (CREATED)
00_SYSTEM_BRAIN/architecture/canonical/diagrams/event-flow.mmd          (CREATED)
00_SYSTEM_BRAIN/architecture/canonical/diagrams/task-state-machine.mmd  (CREATED)
00_SYSTEM_BRAIN/architecture/canonical/diagrams/layered-architecture.mmd (CREATED)
00_SYSTEM_BRAIN/architecture/canonical/00_PLATFORM_OVERVIEW.md          (MODIFIED — append 2 refs)
00_SYSTEM_BRAIN/architecture/canonical/40_EVENT_DRIVEN_RUNTIME.md       (MODIFIED — append 2 refs)
00_SYSTEM_BRAIN/architecture/canonical/50_HUMAN_OVERRIDE_POLICY.md      (MODIFIED — append 2 refs)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/IMPLEMENTATION_REPORT.md (MODIFIED — Section 12 thêm)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/TEST_REPORT.md           (MODIFIED — Section 11 Turn 4 checklist)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/AI_HANDOFF.md            (MODIFIED — Turn 4 status + Turn 5 guidance)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/NEXT_STEP.md             (MODIFIED — Turn 5 plan)
```

### 12.7. Files / folders NOT touched (verify integrity)

```txt
.myNotes/                               — UNCHANGED
00_SYSTEM_BRAIN/architecture/source-notes/   — UNCHANGED
00_SYSTEM_BRAIN/decisions/ADR-0001..0005     — UNCHANGED (vẫn Draft)
00_SYSTEM_BRAIN/architecture/README.md       — UNCHANGED (sẽ update ở Turn 5)
canonical/10_*, 20_*, 30_*, 60_*, 70_*, 80_*, 90_*  — UNCHANGED (7 file)
docs/                                   — UNCHANGED
.cursor/                                — UNCHANGED
runtime/, services/, apps/,             — UNCHANGED (zero code change)
   database/, packages/, integrations/,
   infra/, tests/, scripts/
src/                                    — UNCHANGED
package.json, .idp*, .project.json, .github/  — UNCHANGED
README.md (root), CHANGELOG.md         — UNCHANGED (sẽ update ở Turn 5)
```

### 12.8. Constraint compliance — Turn 4

| Constraint | Result |
|---|---|
| Branch đúng (`phase/002-architecture-docs-migration`) | ✅ PASS |
| Remote URL clean (no token) | ✅ PASS |
| `.myNotes/` integrity (sizes match) | ✅ PASS |
| `source-notes/` không sửa | ✅ PASS |
| ADR Draft không sửa (Status vẫn Draft) | ✅ PASS |
| 7/10 canonical docs không sửa | ✅ PASS |
| 3 canonical docs (00, 40, 50) chỉ APPEND reference (KHÔNG rewrite) | ✅ PASS |
| Mermaid diagrams chỉ là visualization (KHÔNG code, KHÔNG runtime) | ✅ PASS |
| Mỗi diagram có header comment trỏ về canonical doc + ADR | ✅ PASS |
| `event-flow.mmd` có đủ: happy / reject / compensation / dead-letter / replay | ✅ PASS |
| `task-state-machine.mmd` có 7 state chính + 4 state phụ + 13 event names | ✅ PASS |
| `layered-architecture.mmd` có 6 layer + governance + flow đúng + forbidden flows ghi chú | ✅ PASS |
| KHÔNG sửa code | ✅ PASS |
| KHÔNG sửa runtime | ✅ PASS |
| KHÔNG đổi ADR Status | ✅ PASS |
| KHÔNG commit / push / merge / deploy | ✅ PASS |
| Append-only respected | ✅ PASS |

---

## 13. Turn 5 — Architecture Doctrine Finalization (2026-05-10)

### 13.1. Objective

Finalize architecture doctrine ở mức governance:

```txt
- Promote ADR-0001..0005 từ Draft → Accepted (theo user approval).
- Tạo ADR index docs/ARCHITECTURE_DECISION_RECORDS.md.
- Update 00_SYSTEM_BRAIN/architecture/README.md (đưa source-notes / canonical /
  diagrams / ADR vào đúng chỗ + layer hierarchy & trust + guardrails).
- Update CHANGELOG.md (entry Phase 002 Unreleased).
- Mark Phase 002 = "Ready for Turn 6 commit" trong 90_IMPLEMENTATION_ROADMAP.md.
- KHÔNG promote canonical docs / diagrams (giữ Status: Draft Canonical theo user).
- KHÔNG commit, KHÔNG push.
```

### 13.2. Branch correction (precheck observation)

Tại bước precheck Turn 5, branch hiện tại là `dev` thay vì
`phase/002-architecture-docs-migration`. Theo spec ("Nếu sai branch → dừng
lại"), tôi đã DỪNG, báo user, và yêu cầu confirm.

**User chọn:** `Switch sang phase/002-architecture-docs-migration` → đã thực
hiện `git checkout phase/002-architecture-docs-migration`. Switch an toàn vì
mọi file Phase 002 đều untracked (đi theo working tree khi switch). HEAD vẫn
ở `d27b7b9` (commit chung của `dev` và `phase/002-...`).

Không có data loss. Sau switch:

```txt
branch = phase/002-architecture-docs-migration
HEAD   = d27b7b9
status = mọi file Phase 002 vẫn untracked (như trước Turn 5)
```

Khuyến nghị Turn 6 precheck: thêm bước `git branch --show-current` ngay đầu
mỗi turn để phát hiện sớm.

### 13.3. ADR promoted (Part B) — Draft → Accepted

| ADR | File | Trước | Sau | Metadata thêm |
|---|---|---|---|---|
| ADR-0001 | `decisions/ADR-0001-adopt-operational-runtime-platform.md` | Status: Draft | Status: **Accepted** | Accepted by + Accepted at: 2026-05-10 |
| ADR-0002 | `decisions/ADR-0002-demote-gas-gws-to-integration-layer.md` | Status: Draft | Status: **Accepted** | Accepted by + Accepted at: 2026-05-10 |
| ADR-0003 | `decisions/ADR-0003-runtime-first-architecture.md` | Status: Draft | Status: **Accepted** | Accepted by + Accepted at: 2026-05-10 |
| ADR-0004 | `decisions/ADR-0004-event-driven-operational-runtime.md` | Status: Draft | Status: **Accepted** | Accepted by + Accepted at: 2026-05-10 |
| ADR-0005 | `decisions/ADR-0005-human-override-policy.md` | Status: Draft | Status: **Accepted** | Accepted by + Accepted at: 2026-05-10 |

Quy tắc tuân thủ:

```txt
- KHÔNG sửa nội dung Decision của bất kỳ ADR nào.
- CHỈ thay đổi: Status (Draft → Accepted) + thêm 2 field metadata.
- Supersedes / Superseded by giữ "—".
- KHÔNG đổi numbering, KHÔNG đổi tên file.
- 5 ADR đầu tiên vẫn là foundation — KHÔNG có ADR nào supersede ADR khác ở thời điểm này.
```

### 13.4. ADR index created (Part C)

`docs/ARCHITECTURE_DECISION_RECORDS.md` (mới, ~7 KB) chứa:

```txt
- Purpose: ADR là strategic law của repo.
- ADR Lifecycle: Draft → Accepted → Superseded → Rejected (4 status).
- Quy tắc lifecycle (6 quy tắc — append-only).
- Current ADRs table: ID | Title | Status | Date | Supersedes | Superseded by | Link.
- ADR Relationship Map (text diagram + bảng quan hệ).
- Naming convention (file format + folder + numbering + title).
- ADR Document Structure chuẩn (header table + 7 section tối thiểu).
- Rules (12 quy tắc R-1..R-12 — append-only, không xoá, supersede thay vì sửa).
- Cross-reference table (where ADR is enforced trong từng layer).
- How-to-add ADR checklist (12 checkpoint).
- Open ADR slots dự kiến cho phase tương lai (ADR-0006..0016 — KHÔNG tạo, chỉ liệt kê).
- References + Last reviewed.
```

### 13.5. architecture/README.md updated (Part D)

Viết lại hoàn toàn `00_SYSTEM_BRAIN/architecture/README.md` để phản ánh
Phase 002 outputs. Cấu trúc mới (11 section):

```txt
1. Phạm vi (cập nhật để bao gồm source-notes / canonical / diagrams / ADR ref).
2. Architecture Layers (sub-folders) — tree đầy đủ.
3. Source Notes — link 3 file (INDEX + 2 SOURCE_NOTE).
4. Canonical Docs (Draft Canonical) — bảng 10 file với topic mỗi file.
   ⚠️ Ghi rõ Status: Draft Canonical — chưa promote (theo user Turn 5).
5. Diagrams (Draft Canonical visualization) — link 4 file (README + 3 .mmd).
6. ADR — bảng 5 ADR Accepted + link tới index docs/.
7. Layer Hierarchy & Trust — text diagram cho thứ bậc trust.
8. Guardrails (G-1..G-10).
9. Cập nhật folder này — quy trình thêm tài liệu mới.
10. Trạng thái hiện tại — bảng status từng item theo phase.
11. References + Last reviewed.
```

KHÔNG mất tinh thần README cũ — phần "Phạm vi" + "Append-only" + ADR linkage
đều giữ nhưng được tổ chức lại với context mới.

### 13.6. CHANGELOG.md updated (Part E)

Append entry mới vào đầu mục `## [Unreleased]`:

```txt
### Phase 002 — Architecture Docs Migration (branch `phase/002-architecture-docs-migration`)

#### Added       (source-notes, canonical, diagrams, 5 ADR Draft, ADR index, phase report)
#### Changed     (architecture/README.md, ADR Status, canonical 00/40/50 references, roadmap status)
#### Deprecated  (—)
#### Removed     (—)
#### Fixed       (—)
#### Security    (PAT sanitize, user phải rotate)
#### Architecture (5 doctrine khoá rõ — runtime-first, event-driven, human-override, AI-assisted, GAS demote)
#### Constraints honoured (8 KHÔNG — code, runtime, business logic, deploy, merge, push, commit, .myNotes)
```

KHÔNG xoá entry Phase 001 — append-only respected.

### 13.7. 90_IMPLEMENTATION_ROADMAP.md updated (Part F — minimal change)

| Thay đổi | Trước | Sau |
|---|---|---|
| Phase 002 Status (bảng overview) | "IN PROGRESS (Turn 3 — canonical docs)" | "Ready for Turn 6 commit (Turn 1..5 DONE — ADR Accepted, ADR index, README, CHANGELOG; canonical giữ Draft Canonical theo user)" |
| Phase 002 Pipeline (6 turn) | Turn 3..6 = PENDING/IN PROGRESS | Turn 1..5 = ✅ DONE; Turn 6 = "Ready for Turn 6 commit" |

KHÔNG rewrite các phase khác. KHÔNG promote canonical Status. Đúng spec
("Mark Phase 002 = DONE = YES, nhưng chỉ ghi 'Ready for Turn 6 commit'").

### 13.8. Files created in Turn 5

```txt
docs/ARCHITECTURE_DECISION_RECORDS.md  (NEW — ADR index, ~7 KB)
```

### 13.9. Files modified in Turn 5

```txt
00_SYSTEM_BRAIN/decisions/ADR-0001-adopt-operational-runtime-platform.md   (Status + metadata)
00_SYSTEM_BRAIN/decisions/ADR-0002-demote-gas-gws-to-integration-layer.md  (Status + metadata)
00_SYSTEM_BRAIN/decisions/ADR-0003-runtime-first-architecture.md           (Status + metadata)
00_SYSTEM_BRAIN/decisions/ADR-0004-event-driven-operational-runtime.md     (Status + metadata)
00_SYSTEM_BRAIN/decisions/ADR-0005-human-override-policy.md                (Status + metadata)
00_SYSTEM_BRAIN/architecture/README.md                                     (rewrite — phản ánh Phase 002 outputs)
00_SYSTEM_BRAIN/architecture/canonical/90_IMPLEMENTATION_ROADMAP.md        (Phase 002 Status only — minimal)
CHANGELOG.md                                                               (append Phase 002 entry)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/IMPLEMENTATION_REPORT.md  (Section 13 thêm)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/TEST_REPORT.md             (Section 12 Turn 5 checklist)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/AI_HANDOFF.md              (Turn 5 status + Turn 6 plan)
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/NEXT_STEP.md               (Turn 6 detailed plan)
```

### 13.10. Files / folders NOT touched (verify integrity)

```txt
.myNotes/                                            — UNCHANGED (4170 / 6863 / 38203)
00_SYSTEM_BRAIN/architecture/source-notes/           — UNCHANGED (5032 / 7082 / 4874)
00_SYSTEM_BRAIN/architecture/canonical/00..80_*.md (trừ 00, 40, 50, 90)  — UNCHANGED (Status: Draft Canonical)
00_SYSTEM_BRAIN/architecture/canonical/00, 40, 50  — UNCHANGED (đã modify ở Turn 4, không sửa thêm Turn 5)
00_SYSTEM_BRAIN/architecture/canonical/diagrams/    — UNCHANGED (Status: Draft Canonical)
docs/REPO_STRUCTURE.md                              — UNCHANGED
docs/GIT_BRANCH_STRATEGY.md                         — UNCHANGED
docs/INTEGRATION_BOUNDARY.md                        — UNCHANGED
.cursor/                                            — UNCHANGED
runtime/, services/, apps/, database/,              — UNCHANGED (zero code change)
   packages/, integrations/, infra/, tests/, scripts/, src/
package.json, .idp*, .project.json, .github/        — UNCHANGED
README.md (root)                                    — UNCHANGED
00_SYSTEM_BRAIN/phase-reports/PHASE_001_*           — UNCHANGED
```

### 13.11. Constraint compliance — Turn 5

| Constraint | Result |
|---|---|
| Branch corrected (`phase/002-architecture-docs-migration`) sau STOP+user confirm | ✅ PASS |
| Remote URL clean (no token) | ✅ PASS |
| `.myNotes/` integrity (sizes match) | ✅ PASS |
| `source-notes/` không sửa | ✅ PASS |
| Canonical docs giữ Status: Draft Canonical (KHÔNG promote) | ✅ PASS |
| Diagrams giữ Status: Draft Canonical (KHÔNG promote) | ✅ PASS |
| ADR-0001..0005 promote Draft → Accepted (chỉ Status + metadata, KHÔNG sửa Decision) | ✅ PASS |
| ADR Accepted by + Accepted at có đủ | ✅ PASS |
| Supersedes / Superseded by giữ "—" | ✅ PASS |
| `docs/ARCHITECTURE_DECISION_RECORDS.md` tạo mới | ✅ PASS |
| `00_SYSTEM_BRAIN/architecture/README.md` updated | ✅ PASS |
| `CHANGELOG.md` updated (append-only — KHÔNG xoá Phase 001 entry) | ✅ PASS |
| `90_IMPLEMENTATION_ROADMAP.md` minimal change (Phase 002 Status only) | ✅ PASS |
| KHÔNG sửa code | ✅ PASS |
| KHÔNG sửa runtime / business logic | ✅ PASS |
| KHÔNG deploy / merge | ✅ PASS |
| KHÔNG commit / push | ✅ PASS |
| Append-only respected | ✅ PASS |
| Production-safe | ✅ PASS |
| Audit-friendly (mọi thay đổi ghi rõ trong report + CHANGELOG) | ✅ PASS |
