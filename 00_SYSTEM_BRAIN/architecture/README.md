# 00_SYSTEM_BRAIN/architecture/ — Architecture Knowledge Base

> Nơi lưu kiến trúc hệ thống LAOCONG_VOS_PLATFORM ở dạng tài liệu sống.
> **Append-only.** Mỗi thay đổi kiến trúc lớn phải có ADR trong `../decisions/`.

---

## 1. Phạm vi

Folder này chứa:

- Kiến trúc tổng thể (high-level architecture)
- Kiến trúc từng layer (runtime, services, apps, integrations, …)
- Sơ đồ luồng (event flow, command flow, state machine)
- Mô hình dữ liệu cấp cao (domain model)
- Capability map & maturity model (L0–L5)
- Định nghĩa boundary giữa core và integration

Folder này **không** chứa:

- Code
- Migration
- Phase report (đã có `../phase-reports/`)
- ADR (đã có `../decisions/`)
- Runbook vận hành (đã có `../runbooks/`)

---

## 2. Tài liệu kiến trúc gốc

Hiện tại tài liệu nguồn nằm ở `.myNotes/` (chưa được clean-up):

- [`LAOCONG_VOS_PLATFORM_ARCHITECTURE.md`](../../.myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md) — Kiến trúc Repo & Git Workflow
- [`00_prompt`](../../.myNotes/00_prompt) — Triết lý vận hành & maturity model
- `LAOCONG_VOS_Operational_Runtime_Architecture_Summary.docx` — Operational Runtime Architecture Summary

Các tài liệu này sẽ được dần convert sang Markdown trong folder này ở các
phase tiếp theo (KHÔNG xoá file gốc trong `.myNotes/`).

---

## 3. Quy ước file

```txt
00_SYSTEM_BRAIN/architecture/
├─ README.md                  (file này)
├─ 00_overview.md             (overview tổng)
├─ 10_core-runtime.md         (chi tiết core runtime)
├─ 20_services.md
├─ 30_apps.md
├─ 40_integrations.md
├─ 50_database.md
├─ 60_event-flow.md
├─ 70_state-machines.md
├─ 80_security-permission.md
├─ 90_maturity-model.md
└─ diagrams/                  (mermaid / png / drawio)
```

Mỗi file:

- Append-only (không xoá nội dung cũ — markdown thì chỉ thêm/sửa, lịch sử nằm ở git).
- Có dòng `Last reviewed: YYYY-MM-DD by <ai/human>` ở cuối.
- Khi có quyết định lớn → tạo ADR ở `../decisions/`.

---

## 4. Trạng thái hiện tại

Folder vừa được tạo ở Phase 001. Chưa có file kiến trúc nào trong folder
này — sẽ được populate dần ở các phase sau.
