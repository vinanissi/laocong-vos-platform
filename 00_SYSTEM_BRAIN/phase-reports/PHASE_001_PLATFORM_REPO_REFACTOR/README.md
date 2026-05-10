# PHASE 001 — PLATFORM REPO REFACTOR

> **Goal:** Refactor cấu trúc repo `LAOCONG_VOS_PLATFORM` theo kiến trúc
> Operational Runtime Platform mới, demote GAS/GWS xuống integration layer,
> thiết lập Git workflow chuẩn và tài liệu nền — **không** chạm business logic.

---

## 1. Phase metadata

| Field | Value |
|---|---|
| Phase ID | `PHASE_001_PLATFORM_REPO_REFACTOR` |
| Branch | `phase/001-platform-repo-refactor` |
| Loại | Repo structure + documentation refactor |
| Risk | LOW (non-destructive, không sửa code, không sửa logic) |
| Owner | LAOCONG_VOS Architect (human) + AI assistant |
| Started | 2026-05-10 |
| Status | IN PROGRESS — refactor xong, chờ review |

---

## 2. Phạm vi (in-scope)

```txt
1. Tạo cấu trúc thư mục mục tiêu (Operational Runtime Platform).
2. Tạo README cho từng layer chính.
3. Tạo tài liệu quy ước:
   - docs/REPO_STRUCTURE.md
   - docs/GIT_BRANCH_STRATEGY.md
   - docs/INTEGRATION_BOUNDARY.md
4. Tạo Cursor rule: .cursor/rules/laocong-vos-platform.md
5. Demote GAS / GWS về integration layer (slot legacy-modules sẵn sàng).
6. Tạo phase report đầy đủ 6 file trong 00_SYSTEM_BRAIN/phase-reports/.
7. Cập nhật README.md root để định vị lại hệ.
8. Tạo CHANGELOG.md.
```

---

## 3. Ngoài phạm vi (out-of-scope)

```txt
- KHÔNG sửa runtime behavior.
- KHÔNG sửa business logic.
- KHÔNG migration database.
- KHÔNG scaffold code app/service/runtime/integration.
- KHÔNG xoá / rename file cũ.
- KHÔNG deploy.
- KHÔNG push.
- KHÔNG merge.
```

---

## 4. Kết quả mong đợi

```txt
- Cây thư mục đúng spec, có .gitkeep ở leaf folder.
- Tài liệu boundary rõ ràng giữa core runtime và integration.
- GAS/GWS đã được "đóng khung" trong integrations/ — không còn nằm như core.
- Cursor rule áp dụng được ngay cho phiên kế tiếp.
- AI handoff đầy đủ để phase 002 không cần lặp lại discovery.
```

---

## 5. Tài liệu phase

| File | Vai trò |
|---|---|
| `README.md` | (file này) — overview & metadata |
| `SPEC.md` | Spec chi tiết — yêu cầu, ràng buộc, deliverable |
| `IMPLEMENTATION_REPORT.md` | Đã làm gì, file/folder nào đã tạo/sửa/di chuyển |
| `TEST_REPORT.md` | Checklist verify cấu trúc + acceptance |
| `AI_HANDOFF.md` | Bàn giao cho phiên AI tiếp theo / phase tiếp theo |
| `NEXT_STEP.md` | Phase tiếp theo nên là gì, ưu tiên gì |

---

## 6. Tham chiếu

- [`../../../README.md`](../../../README.md)
- [`../../../docs/REPO_STRUCTURE.md`](../../../docs/REPO_STRUCTURE.md)
- [`../../../docs/INTEGRATION_BOUNDARY.md`](../../../docs/INTEGRATION_BOUNDARY.md)
- [`../../../docs/GIT_BRANCH_STRATEGY.md`](../../../docs/GIT_BRANCH_STRATEGY.md)
- [`../../../.cursor/rules/laocong-vos-platform.md`](../../../.cursor/rules/laocong-vos-platform.md)
- [`../../../.myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md`](../../../.myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md)
