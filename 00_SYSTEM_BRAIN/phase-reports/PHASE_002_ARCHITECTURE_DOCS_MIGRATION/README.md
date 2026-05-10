# PHASE 002 — ARCHITECTURE DOCS MIGRATION

> **Goal:** Migrate tài liệu kiến trúc đang rải rác (`.myNotes/`, doc cũ) vào
> `00_SYSTEM_BRAIN/architecture/` theo cấu trúc canonical, **append-only**,
> không xoá nguồn, không sửa code, không sửa runtime.

---

## 1. Phase metadata

| Field | Value |
|---|---|
| Phase ID | `PHASE_002_ARCHITECTURE_DOCS_MIGRATION` |
| Branch | `phase/002-architecture-docs-migration` |
| Tách từ | `dev` (commit `d27b7b9` — Phase 001 baseline) |
| Loại | Documentation migration (knowledge consolidation) |
| Risk | LOW (append-only, không sửa code) |
| Owner | LAOCONG_VOS Architect (human) + AI assistant |
| Started | 2026-05-10 |
| Status | SCAFFOLDED — chỉ mới có khung phase + ADR foundation. Chưa migrate nội dung. |

---

## 2. Phạm vi (in-scope)

```txt
1. Tạo 5 ADR foundation:
   - ADR-0001 — Adopt Operational Runtime Platform.
   - ADR-0002 — Demote GAS/GWS to integration layer.
   - ADR-0003 — Runtime-first architecture.
   - ADR-0004 — Event-driven operational runtime.
   - ADR-0005 — Human-override policy.
2. Tạo cấu trúc canonical cho architecture docs:
   - 00_SYSTEM_BRAIN/architecture/source-notes/    (raw / nguồn)
   - 00_SYSTEM_BRAIN/architecture/canonical/        (tài liệu chuẩn hoá)
3. Migrate tài liệu nguồn từ .myNotes/ và các nơi khác về source-notes/
   (chỉ COPY hoặc reference — KHÔNG xoá nguồn).
4. Xây canonical/ từ source-notes/ ở dạng append-only:
   - 00_overview.md
   - 10_core-runtime.md
   - 20_services.md
   - 30_apps.md
   - 40_integrations.md
   - 50_database.md
   - 60_event-flow.md
   - 70_state-machines.md
   - 80_security-permission.md
   - 90_maturity-model.md
   - diagrams/ (mermaid)
5. Tạo docs/ARCHITECTURE_DECISION_RECORDS.md (index ADR).
6. Cập nhật 00_SYSTEM_BRAIN/architecture/README.md để chỉ tới canonical/.
```

---

## 3. Ngoài phạm vi (out-of-scope)

```txt
- KHÔNG sửa code.
- KHÔNG sửa runtime behavior (chưa có runtime).
- KHÔNG migration database.
- KHÔNG scaffold engine/service/app/integration.
- KHÔNG xoá .myNotes/.
- KHÔNG xoá file nguồn nào.
- KHÔNG đổi cấu trúc thư mục đã chốt ở Phase 001.
- KHÔNG tự động hoá pipeline migration (làm thủ công + AI assist, không build script).
- KHÔNG deploy.
- KHÔNG merge.
```

---

## 4. Trạng thái hiện tại

```txt
- Branch phase/002-architecture-docs-migration đã tạo từ dev.
- Folder phase-reports/PHASE_002_*/ đã có 6 file (file này + 5 file khác).
- Folder 00_SYSTEM_BRAIN/architecture/source-notes/ và canonical/ đã tạo (đang trống).
- 5 ADR foundation đã tạo (Status: Draft).
- CHƯA migrate nội dung thật.
- CHƯA commit, CHƯA push.
```

---

## 5. Tài liệu phase

| File | Vai trò |
|---|---|
| `README.md` | (file này) — overview & metadata |
| `SPEC.md` | Spec chi tiết Phase 002 |
| `IMPLEMENTATION_REPORT.md` | Đã tạo file/folder/ADR nào (cập nhật khi làm) |
| `TEST_REPORT.md` | Checklist verify cấu trúc & ràng buộc |
| `AI_HANDOFF.md` | Bàn giao cho phiên AI / phase tiếp theo |
| `NEXT_STEP.md` | Roadmap kế tiếp |
| `BRANCH_HYGIENE_REPORT.md` | Branch hygiene recovery report (Phase 002 branch vs `dev`, không push nhánh nhiễu) |

---

## 6. Tham chiếu

- [`./SPEC.md`](./SPEC.md)
- [`./IMPLEMENTATION_REPORT.md`](./IMPLEMENTATION_REPORT.md)
- [`./TEST_REPORT.md`](./TEST_REPORT.md)
- [`./AI_HANDOFF.md`](./AI_HANDOFF.md)
- [`./NEXT_STEP.md`](./NEXT_STEP.md)
- [`../PHASE_001_PLATFORM_REPO_REFACTOR/README.md`](../PHASE_001_PLATFORM_REPO_REFACTOR/README.md)
- [`../../../docs/REPO_STRUCTURE.md`](../../../docs/REPO_STRUCTURE.md)
- [`../../../docs/INTEGRATION_BOUNDARY.md`](../../../docs/INTEGRATION_BOUNDARY.md)
- [`../../decisions/`](../../decisions/)
