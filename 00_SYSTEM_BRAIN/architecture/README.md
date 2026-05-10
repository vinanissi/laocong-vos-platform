# 00_SYSTEM_BRAIN/architecture/ — Architecture Knowledge Base

> Nơi lưu kiến trúc hệ thống LAOCONG_VOS_PLATFORM ở dạng tài liệu sống.
> **Append-only.** Mỗi thay đổi kiến trúc lớn phải có ADR trong `../decisions/`.

---

## 1. Phạm vi

Folder này chứa:

- Snapshot tài liệu nguồn (source-notes — KHÔNG sửa).
- Canonical doctrine (operational-first, runtime-first).
- Diagrams visualization (Mermaid).
- Tham chiếu ADR (ADR thực tế ở `../decisions/`).

Folder này **không** chứa:

- Code.
- Migration.
- Phase report (đã có `../phase-reports/`).
- ADR file gốc (đã có `../decisions/`).
- Runbook vận hành (đã có `../runbooks/`).

---

## 2. Architecture Layers (sub-folders)

```txt
00_SYSTEM_BRAIN/architecture/
├─ README.md                       (file này — index)
├─ source-notes/                   (snapshot tài liệu nguồn — KHÔNG sửa)
│  ├─ INDEX.md
│  ├─ SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md
│  └─ SOURCE_NOTE_20260510_00-prompt-philosophy.md
├─ canonical/                      (canonical doctrine — Draft Canonical)
│  ├─ 00_PLATFORM_OVERVIEW.md
│  ├─ 10_RUNTIME_FIRST_ARCHITECTURE.md
│  ├─ 20_INTEGRATION_BOUNDARY.md
│  ├─ 30_GAS_GWS_SUPPORT_LAYER.md
│  ├─ 40_EVENT_DRIVEN_RUNTIME.md
│  ├─ 50_HUMAN_OVERRIDE_POLICY.md
│  ├─ 60_AI_ASSISTED_OPERATION.md
│  ├─ 70_GIT_AND_PHASE_GOVERNANCE.md
│  ├─ 80_MATURITY_MODEL.md
│  ├─ 90_IMPLEMENTATION_ROADMAP.md
│  └─ diagrams/                    (Mermaid visualization)
│     ├─ README.md
│     ├─ event-flow.mmd
│     ├─ task-state-machine.mmd
│     └─ layered-architecture.mmd
└─ (related — không nằm trong folder này nhưng liên quan)
   ../decisions/                   (5 ADR Accepted)
   ../phase-reports/               (lịch sử phase)
   ../../docs/ARCHITECTURE_DECISION_RECORDS.md  (ADR index)
```

---

## 3. Source Notes

Snapshot **immutable** của tài liệu kiến trúc nguồn (từ `.myNotes/`).
KHÔNG sửa. Nếu nguồn thay đổi → tạo snapshot mới với date mới.

- [`source-notes/INDEX.md`](./source-notes/INDEX.md) — index + skipped items
- [`source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md`](./source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md)
- [`source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md`](./source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md)

> 1 file (.docx) đã skip ở Turn 2 — xem `INDEX.md` để biết lý do.

---

## 4. Canonical Docs (Draft Canonical)

10 file canonical = **official operational doctrine** — ngắn gọn, rõ boundary,
mỗi file có Status / Purpose / Core Principles / Guardrails / Non-goals / References.

> **Status hiện tại:** `Draft Canonical` — **chưa promote** Reviewed/Accepted ở
> Turn 5 (theo quyết định user). Sẽ promote ở phase tương lai khi cần.

| # | File | Topic |
|---|---|---|
| 00 | [`canonical/00_PLATFORM_OVERVIEW.md`](./canonical/00_PLATFORM_OVERVIEW.md) | Định vị Operational Runtime Platform + 8 core principles |
| 10 | [`canonical/10_RUNTIME_FIRST_ARCHITECTURE.md`](./canonical/10_RUNTIME_FIRST_ARCHITECTURE.md) | Runtime ownership, isolation, command/event flow |
| 20 | [`canonical/20_INTEGRATION_BOUNDARY.md`](./canonical/20_INTEGRATION_BOUNDARY.md) | Layer ownership table (`Owns / Does NOT Own`) |
| 30 | [`canonical/30_GAS_GWS_SUPPORT_LAYER.md`](./canonical/30_GAS_GWS_SUPPORT_LAYER.md) | GAS/GWS demoted + 5-step migration direction |
| 40 | [`canonical/40_EVENT_DRIVEN_RUNTIME.md`](./canonical/40_EVENT_DRIVEN_RUNTIME.md) | Command/event/queue/handler/audit + state machine |
| 50 | [`canonical/50_HUMAN_OVERRIDE_POLICY.md`](./canonical/50_HUMAN_OVERRIDE_POLICY.md) | 5 quyền (STOP/ROLLBACK/REJECT/REASSIGN/OVERRIDE) |
| 60 | [`canonical/60_AI_ASSISTED_OPERATION.md`](./canonical/60_AI_ASSISTED_OPERATION.md) | AI = Operational Assistant + autonomous zones |
| 70 | [`canonical/70_GIT_AND_PHASE_GOVERNANCE.md`](./canonical/70_GIT_AND_PHASE_GOVERNANCE.md) | Branch strategy + flow + 6-file phase template |
| 80 | [`canonical/80_MATURITY_MODEL.md`](./canonical/80_MATURITY_MODEL.md) | L0–L5 + L4-ready 10 requirements |
| 90 | [`canonical/90_IMPLEMENTATION_ROADMAP.md`](./canonical/90_IMPLEMENTATION_ROADMAP.md) | Phase 001..017 roadmap + open questions |

---

## 5. Diagrams (Draft Canonical visualization)

Mermaid visualization khớp với canonical docs + ADR.

> **Status hiện tại:** `Draft Canonical` (visualization only — KHÔNG là runtime
> implementation). Quy tắc: nếu mâu thuẫn giữa diagram và canonical/ADR →
> **canonical/ADR thắng**.

- [`canonical/diagrams/README.md`](./canonical/diagrams/README.md) — mục đích + danh sách + render hint + guardrails
- [`canonical/diagrams/event-flow.mmd`](./canonical/diagrams/event-flow.mmd) — happy / reject / compensation / dead-letter / replay
- [`canonical/diagrams/task-state-machine.mmd`](./canonical/diagrams/task-state-machine.mmd) — TASK lifecycle + 13 event names + override notes
- [`canonical/diagrams/layered-architecture.mmd`](./canonical/diagrams/layered-architecture.mmd) — 6 layer + governance + flow đúng + forbidden flows ghi chú

---

## 6. ADR (Architecture Decision Records)

ADR là **strategic law** của repository. Implementation PHẢI tuân ADR Accepted.

> **Status hiện tại:** ADR-0001..0005 = **Accepted** (Phase 002 Turn 5,
> 2026-05-10, user approval).

- ADR folder: [`../decisions/`](../decisions/)
- ADR index: [`../../docs/ARCHITECTURE_DECISION_RECORDS.md`](../../docs/ARCHITECTURE_DECISION_RECORDS.md)

| ADR | Title | Status |
|---|---|---|
| [ADR-0001](../decisions/ADR-0001-adopt-operational-runtime-platform.md) | Adopt Operational Runtime Platform | Accepted |
| [ADR-0002](../decisions/ADR-0002-demote-gas-gws-to-integration-layer.md) | Demote GAS / GWS to Integration Layer | Accepted |
| [ADR-0003](../decisions/ADR-0003-runtime-first-architecture.md) | Runtime-first Architecture | Accepted |
| [ADR-0004](../decisions/ADR-0004-event-driven-operational-runtime.md) | Event-driven Operational Runtime | Accepted |
| [ADR-0005](../decisions/ADR-0005-human-override-policy.md) | Human-override Policy | Accepted |

---

## 7. Layer Hierarchy & Trust

```txt
┌──────────────────────────────────────────────────────────────┐
│  ADR Accepted (../decisions/)                                │
│  ── strategic law ── implementation PHẢI tuân                │
└──────────────────────────────────────────────────────────────┘
                       │ binds
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  Canonical docs (canonical/00..90)                           │
│  ── living doctrine ── diễn giải + chi tiết hoá ADR          │
└──────────────────────────────────────────────────────────────┘
                       │ visualizes
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  Diagrams (canonical/diagrams/*.mmd)                         │
│  ── visualization only ── KHÔNG là source of truth           │
└──────────────────────────────────────────────────────────────┘
                       ▲ trace back to
                       │
┌──────────────────────────────────────────────────────────────┐
│  Source notes (source-notes/)                                │
│  ── immutable snapshot ── KHÔNG sửa, để truy nguyên          │
└──────────────────────────────────────────────────────────────┘
```

Quy tắc trust:

```txt
ADR Accepted          >  Canonical docs   >  Diagrams
                       (luật cứng)         (diễn giải)        (minh hoạ)
Source notes          : nguồn lịch sử (audit), không phải luật
Phase reports         : nhật ký triển khai (audit), không phải luật
Implementation runtime: PHẢI tuân ADR Accepted; KHÔNG được vượt
```

---

## 8. Guardrails

```txt
G-1   source-notes là snapshot immutable — KHÔNG sửa.
G-2   canonical là living doctrine — sửa qua revision (append).
G-3   ADR Accepted là luật kiến trúc — KHÔNG sửa Decision sau Accepted.
G-4   Implementation KHÔNG được vượt ADR Accepted.
G-5   Diagrams KHÔNG là source of truth — phải khớp canonical/ADR.
G-6   Mỗi thay đổi kiến trúc lớn PHẢI có ADR.
G-7   Mỗi quyết định mới supersedes ADR cũ — KHÔNG xoá ADR cũ.
G-8   Mỗi canonical doc mới PHẢI có References trỏ về source-notes hoặc ADR.
G-9   Mỗi diagram PHẢI có header comment trỏ về canonical doc + ADR.
G-10  Mỗi phase liên quan kiến trúc PHẢI cập nhật canonical hoặc ADR (append-only).
```

---

## 9. Cập nhật folder này

Khi cần thêm tài liệu kiến trúc:

```txt
1. Tài liệu nguồn mới (từ ngoài) → source-notes/SOURCE_NOTE_<date>_<short>.md
   - Thêm vào source-notes/INDEX.md.
   - KHÔNG sửa snapshot cũ.

2. Doctrine mới (đã sàng lọc) → canonical/<NN>_<NAME>.md
   - Status mặc định: Draft Canonical.
   - Có References trỏ về source-notes + ADR.

3. Diagram mới → canonical/diagrams/<name>.mmd
   - Có header comment trỏ về canonical doc + ADR.
   - Cập nhật canonical/diagrams/README.md (bảng danh sách).

4. Quyết định mới → ../decisions/ADR-NNNN-<short>.md (Status: Draft).
   - User duyệt → promote Accepted (thêm Accepted by + Accepted at).
   - Cập nhật ../../docs/ARCHITECTURE_DECISION_RECORDS.md.

5. Mọi thay đổi PHẢI ghi vào phase report đang chạy.
```

---

## 10. Trạng thái hiện tại

| Item | Status | Phase |
|---|---|---|
| `source-notes/` | 2 SOURCE_NOTE + 1 INDEX (1 .docx skipped) | Phase 002 Turn 2 |
| `canonical/00..90` | Draft Canonical (10 file) | Phase 002 Turn 3 |
| `canonical/diagrams/` | Draft Canonical (3 .mmd + 1 README) | Phase 002 Turn 4 |
| `../decisions/ADR-0001..0005` | **Accepted** | Phase 002 Turn 5 |
| `../../docs/ARCHITECTURE_DECISION_RECORDS.md` | Created | Phase 002 Turn 5 |
| Phase 002 commit | **Chưa commit, chưa push** (chờ Turn 6 + user duyệt + PAT rotated) | Phase 002 Turn 6 |

---

## 11. References

- ADR folder: [`../decisions/`](../decisions/)
- ADR index: [`../../docs/ARCHITECTURE_DECISION_RECORDS.md`](../../docs/ARCHITECTURE_DECISION_RECORDS.md)
- Phase 001 report: [`../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/`](../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/)
- Phase 002 report: [`../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/`](../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/)
- Repo overview: [`../../README.md`](../../README.md)
- Repo structure: [`../../docs/REPO_STRUCTURE.md`](../../docs/REPO_STRUCTURE.md)
- Git workflow: [`../../docs/GIT_BRANCH_STRATEGY.md`](../../docs/GIT_BRANCH_STRATEGY.md)
- Integration boundary: [`../../docs/INTEGRATION_BOUNDARY.md`](../../docs/INTEGRATION_BOUNDARY.md)
- Cursor rule: [`../../.cursor/rules/laocong-vos-platform.md`](../../.cursor/rules/laocong-vos-platform.md)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 5 — Updated to reflect Phase 002 outputs:
              source-notes (Turn 2), canonical (Turn 3), diagrams (Turn 4),
              ADR Accepted + ADR index (Turn 5).
```
