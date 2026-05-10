# PHASE 002 — SPEC

> Spec chi tiết Phase 002 — Architecture Docs Migration.

---

## 1. Mục tiêu

Migrate **tài liệu kiến trúc** đang rải rác (chủ yếu trong `.myNotes/` và
các tài liệu cũ) vào `00_SYSTEM_BRAIN/architecture/` theo cấu trúc
**canonical**, **append-only**.

Sau Phase 002:

- `.myNotes/` vẫn còn nguyên (không xoá).
- `00_SYSTEM_BRAIN/architecture/source-notes/` chứa bản sao raw của tài liệu nguồn (snapshot).
- `00_SYSTEM_BRAIN/architecture/canonical/` chứa bản chuẩn hoá theo numbering 00–90.
- 5 ADR foundation đã được duyệt (chuyển từ Draft → Accepted).
- `docs/ARCHITECTURE_DECISION_RECORDS.md` index đầy đủ ADR.

---

## 2. Ràng buộc bắt buộc

```txt
1. Append-only — chỉ thêm, không xoá tài liệu nguồn.
2. KHÔNG sửa code.
3. KHÔNG sửa runtime behavior.
4. KHÔNG đổi cấu trúc Phase 001.
5. KHÔNG tự động hoá pipeline migration (làm thủ công + AI assist).
6. KHÔNG deploy.
7. KHÔNG merge main.
8. KHÔNG push trừ khi user yêu cầu.
9. KHÔNG di chuyển code nếu chưa chắc nguồn/đích.
10. Mọi thao tác production-safe, audit-friendly.
```

---

## 3. Deliverable

### 3.1. Branch

- `phase/002-architecture-docs-migration` (từ `dev`).

### 3.2. ADR foundation (5 file)

```txt
00_SYSTEM_BRAIN/decisions/
├─ ADR-0001-adopt-operational-runtime-platform.md
├─ ADR-0002-demote-gas-gws-to-integration-layer.md
├─ ADR-0003-runtime-first-architecture.md
├─ ADR-0004-event-driven-operational-runtime.md
└─ ADR-0005-human-override-policy.md
```

Mỗi ADR phải có:

```txt
- Status: Draft (sẽ chuyển Accepted khi migrate xong)
- Date
- Context
- Decision
- Consequences
- Guardrails
```

### 3.3. Architecture canonical & source-notes

```txt
00_SYSTEM_BRAIN/architecture/
├─ README.md                 (đã có ở Phase 001 — sẽ cập nhật ở Phase 002)
├─ source-notes/             (raw snapshot của .myNotes + tài liệu cũ)
│   ├─ 2026-05-10__LAOCONG_VOS_PLATFORM_ARCHITECTURE.md   (copy từ .myNotes)
│   ├─ 2026-05-10__00_prompt.md                            (copy từ .myNotes)
│   └─ 2026-05-10__operational-runtime-architecture-summary.md
└─ canonical/                (tài liệu chuẩn hoá)
    ├─ 00_overview.md
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
```

### 3.4. ADR index

```txt
docs/ARCHITECTURE_DECISION_RECORDS.md   (bảng liệt kê ADR + status + link)
```

### 3.5. Phase report (folder phase này)

```txt
00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/
├─ README.md
├─ SPEC.md                   (file này)
├─ IMPLEMENTATION_REPORT.md
├─ TEST_REPORT.md
├─ AI_HANDOFF.md
└─ NEXT_STEP.md
```

---

## 4. Acceptance Criteria

```txt
[AC-1]  Branch phase/002-architecture-docs-migration đang là branch hiện tại.
[AC-2]  Folder source-notes/ và canonical/ tồn tại.
[AC-3]  Folder decisions/ tồn tại với 5 ADR foundation.
[AC-4]  6 file phase report tồn tại đầy đủ.
[AC-5]  source-notes/ chứa snapshot của 3 tài liệu nguồn (.myNotes).
[AC-6]  canonical/ chứa 10 file overview/runtime/services/... (00..90).
[AC-7]  diagrams/ chứa ít nhất 3 file mermaid: event-flow, task-state-machine, layered-architecture.
[AC-8]  docs/ARCHITECTURE_DECISION_RECORDS.md tồn tại với index 5 ADR.
[AC-9]  KHÔNG xoá file nào trong .myNotes/.
[AC-10] KHÔNG sửa code (chỉ tài liệu).
[AC-11] KHÔNG đụng tới: src/, .idp*.json, .project.json, package.json, .github/.
[AC-12] KHÔNG đụng cấu trúc Phase 001.
[AC-13] CHANGELOG.md cập nhật entry Phase 002 (Unreleased).
```

> **Lưu ý:** AC-1 → AC-4 đã pass ở giai đoạn scaffold (turn này).
> AC-5 → AC-13 sẽ pass ở turn tiếp theo khi migrate nội dung thật.

---

## 5. Plan triển khai (chi tiết turn-by-turn)

### Turn 1 — Scaffold (HIỆN TẠI)

```txt
[x] Tạo branch phase/002-architecture-docs-migration từ dev.
[x] Tạo 6 file phase report (skeleton).
[x] Tạo folder architecture/source-notes/, architecture/canonical/, decisions/.
[x] Tạo 5 ADR foundation (Status: Draft).
[x] Cập nhật IMPLEMENTATION_REPORT.md & TEST_REPORT.md cho phần đã làm.
[ ] KHÔNG commit (chờ user duyệt).
[ ] KHÔNG push.
```

### Turn 2 — Snapshot source-notes

```txt
[ ] Copy .myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md
    → architecture/source-notes/2026-05-10__LAOCONG_VOS_PLATFORM_ARCHITECTURE.md
[ ] Copy .myNotes/00_prompt
    → architecture/source-notes/2026-05-10__00_prompt.md
[ ] Convert .myNotes/LAOCONG_VOS_Operational_Runtime_Architecture_Summary.docx
    → architecture/source-notes/2026-05-10__operational-runtime-architecture-summary.md
    (chỉ extract text, KHÔNG sửa nội dung)
[ ] KHÔNG xoá .myNotes/.
```

### Turn 3 — Build canonical

```txt
[ ] Viết canonical/00_overview.md từ source-notes (tổng hợp).
[ ] Viết canonical/10_core-runtime.md.
[ ] Viết canonical/20_services.md.
[ ] Viết canonical/30_apps.md.
[ ] Viết canonical/40_integrations.md.
[ ] Viết canonical/50_database.md.
[ ] Viết canonical/60_event-flow.md.
[ ] Viết canonical/70_state-machines.md.
[ ] Viết canonical/80_security-permission.md.
[ ] Viết canonical/90_maturity-model.md.
[ ] Mỗi file có dòng "Source: source-notes/<file>" để truy nguồn.
```

### Turn 4 — Diagrams

```txt
[ ] canonical/diagrams/event-flow.mmd
[ ] canonical/diagrams/task-state-machine.mmd
[ ] canonical/diagrams/layered-architecture.mmd
```

### Turn 5 — ADR finalize + index

```txt
[ ] Cập nhật 5 ADR từ Draft → Accepted (sau khi user duyệt).
[ ] Tạo docs/ARCHITECTURE_DECISION_RECORDS.md (index).
[ ] Cập nhật 00_SYSTEM_BRAIN/architecture/README.md trỏ tới canonical/.
[ ] Cập nhật CHANGELOG.md.
[ ] Cập nhật phase report (IMPLEMENTATION_REPORT, TEST_REPORT, AI_HANDOFF, NEXT_STEP).
```

### Turn 6 — Commit & PR (CHỈ KHI USER YÊU CẦU)

```txt
[ ] git add -A → git commit.
[ ] git push -u origin phase/002-architecture-docs-migration.
[ ] Tạo PR vào dev (KHÔNG vào main).
```

---

## 6. Risks

| ID | Risk | Mitigation |
|---|---|---|
| R-201 | Convert .docx có thể mất format. | Lưu nguyên file .docx ở .myNotes/, source-notes/ chỉ là extract text + ghi chú. |
| R-202 | Canonical viết quá dài → khó maintain. | Mỗi file ≤ ~500 dòng, chia tiếp nếu cần. |
| R-203 | Tài liệu canonical & source-notes có thể out-of-sync. | Mỗi canonical file có dòng "Source: …" và "Last sync: …". |
| R-204 | ADR foundation viết vội có thể sai context. | Status mặc định = Draft. User duyệt mới thành Accepted. |
| R-205 | Có thể vô tình sửa file ngoài architecture/. | Pre-commit checklist trong TEST_REPORT.md. |

---

## 7. Out-of-scope (xác nhận lại)

```txt
- Không scaffold code.
- Không tạo automation script migrate (tất cả thủ công + AI assist).
- Không xoá .myNotes/.
- Không đụng src/, .idp*.json, .project.json, package.json, .github/.
- Không đụng các engine folder ở runtime/.
- Không đụng integration folder.
```
