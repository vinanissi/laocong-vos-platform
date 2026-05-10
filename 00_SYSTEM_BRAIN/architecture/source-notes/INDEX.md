# Architecture Source Notes — INDEX

> Index of all snapshotted architecture source documents for LAOCONG_VOS_PLATFORM.
> **Append-only.** Bản gốc luôn được giữ nguyên — KHÔNG xoá / di chuyển / sửa.

---

## 1. Mục đích

`source-notes/` chứa **bản chụp (snapshot)** của tài liệu kiến trúc nguồn đang
nằm rải rác (`.myNotes/`, doc cũ, …) phục vụ:

- Có **một chỗ duy nhất** để Turn 3 (build canonical) tham chiếu nguồn.
- Đảm bảo **append-only & audit-friendly**: ai đã import file gì, khi nào, từ đâu.
- Cho phép **so sánh diff** giữa nguồn và canonical sau này.
- KHÔNG thay thế bản gốc — bản gốc trong `.myNotes/` vẫn là nguồn vĩnh viễn.

---

## 2. Quy ước

- **Tên file:** `SOURCE_NOTE_YYYYMMDD_<slug>.md`
- **Header bắt buộc** mỗi snapshot:
  - `Source path` — đường dẫn gốc trong repo
  - `Snapshot date` — ngày chụp
  - `Snapshot mode` — `COPY_ONLY` (giữ nguyên nội dung)
  - `Original preserved` — `YES`
  - `Original format` — `Markdown / Plain text / Other`
  - `Phase` — phase đang thực hiện
  - `Turn` — turn của phase
  - `Importer` — ai/dev nào import
  - `Notes` — ghi chú
- **Append-only:** sau khi snapshot xong, KHÔNG sửa nội dung gốc trong file
  snapshot. Nếu nguồn cập nhật, tạo snapshot **mới** với date mới (giữ snapshot cũ).
- **KHÔNG copy file binary** (`.docx`, `.xlsx`, `.pdf`, `.png`, …) trừ khi có
  pipeline convert chuẩn riêng — record SKIPPED ở bảng dưới.

---

## 3. Bảng snapshot — Turn 2 (2026-05-10)

| # | Source path (gốc) | Snapshot file | Vai trò kiến trúc | Status | Original preserved |
|---|---|---|---|---|---|
| 1 | `.myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md` | [`SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md`](./SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md) | Repo & Git workflow architecture (cấu trúc thư mục mục tiêu, branch strategy, production-safe rules, vision dài hạn) | **SNAPSHOTTED** | YES (`.myNotes/` không bị đụng) |
| 2 | `.myNotes/00_prompt` | [`SOURCE_NOTE_20260510_00-prompt-philosophy.md`](./SOURCE_NOTE_20260510_00-prompt-philosophy.md) | Triết lý kiến trúc cốt lõi (operational-runtime-first, human-guided, AI-assisted), maturity model L0–L5, command/event/state machine, human-override, AI philosophy, UI/UX định hướng | **SNAPSHOTTED** | YES (`.myNotes/` không bị đụng) |
| 3 | `.myNotes/LAOCONG_VOS_Operational_Runtime_Architecture_Summary.docx` | _(none)_ | Operational Runtime Architecture Summary — bản tóm tắt kiến trúc dạng .docx | **SKIPPED** | YES (`.myNotes/` không bị đụng) |

### Skipped reasons

| Source | Reason | Recommended next action |
|---|---|---|
| `LAOCONG_VOS_Operational_Runtime_Architecture_Summary.docx` | Binary Microsoft Word `.docx` — không phải plain text, không thuộc danh mục được tự động convert ở turn này (per Phase 002 SPEC: "Nếu file gốc không phải text hoặc không đọc được, không convert"). | (1) User confirm có muốn convert không. (2) Nếu có, dùng `pandoc` thủ công ở turn riêng (vd. Turn 2.5) → output `.md` + audit ghi rõ tool & version + giữ `.docx` gốc. (3) Hoặc human-extract nội dung trực tiếp khi viết canonical ở Turn 3. |

---

## 4. Cam kết append-only

```txt
- KHÔNG xoá file trong .myNotes/.
- KHÔNG di chuyển file trong .myNotes/.
- KHÔNG sửa nội dung file trong .myNotes/.
- KHÔNG sửa nội dung snapshot này sau khi đã ghi (chỉ thêm snapshot mới với date mới).
- KHÔNG xoá snapshot cũ — kể cả khi nguồn đã thay đổi.
- KHÔNG đổi tên snapshot đã có.
```

---

## 5. Liên quan / Tham chiếu

- Phase report: [`../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/`](../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/)
  - SPEC: [`../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/SPEC.md`](../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/SPEC.md)
  - IMPLEMENTATION_REPORT: [`../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/IMPLEMENTATION_REPORT.md`](../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/IMPLEMENTATION_REPORT.md)
  - TEST_REPORT: [`../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/TEST_REPORT.md`](../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/TEST_REPORT.md)
  - AI_HANDOFF: [`../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/AI_HANDOFF.md`](../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/AI_HANDOFF.md)
- ADR foundation: [`../../decisions/`](../../decisions/)
- Canonical (sẽ build ở Turn 3): [`../canonical/`](../canonical/)
- Cursor rule: [`../../../.cursor/rules/laocong-vos-platform.md`](../../../.cursor/rules/laocong-vos-platform.md)

---

## 6. Last updated

```txt
2026-05-10  — Turn 2  — Initial INDEX created with 2 SNAPSHOTTED + 1 SKIPPED entries.
```
