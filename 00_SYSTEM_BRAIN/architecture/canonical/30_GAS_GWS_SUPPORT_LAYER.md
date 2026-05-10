# 30 — GAS / GWS Support Layer

## Status
Draft Canonical

## Purpose

Định nghĩa **vai trò chính thức** của Google Apps Script (GAS) và Google
Workspace (GWS) sau khi đã **demote** xuống integration support layer.

Tài liệu này khoá rõ:

- GAS / GWS được phép làm gì.
- GAS / GWS bị cấm làm gì.
- Migration direction từ GAS legacy sang Core Runtime.
- Cách isolation GAS legacy code trong repo.

---

## Core Principles

```txt
1. GAS = adapter hỗ trợ. KHÔNG phải core.
2. GWS = 1 integration trong nhiều integration. KHÔNG phải runtime.
3. Sheet KHÔNG là state store nghiệp vụ.
4. Mọi GAS endpoint PHẢI coi là external + có audit.
5. Legacy code KHÔNG bị xoá khi được thay thế — chỉ đánh DEPRECATED.
```

---

## Allowed use cases

GAS / GWS được phép dùng cho:

```txt
1. Sync sheet  (đọc/ghi sheet như external store hai chiều).
2. Form bridge (Google Form submission → adapter → command).
3. Lightweight automation hỗ trợ phòng ban (KHÔNG phải workflow nghiệp vụ chính).
4. Import / Export báo cáo (Drive / Docs / Sheet → file → command/event).
5. Hỗ trợ legacy module GAS đang chạy (giai đoạn chuyển đổi).
6. Drive / Gmail làm channel transactional (hoặc chuyển sang integrations/email).
```

---

## Forbidden use cases

GAS / GWS **không** được dùng cho:

```txt
1. Quyết định trạng thái đơn / hồ sơ / nhiệm vụ.
2. Phân quyền nghiệp vụ (đó là permission-engine).
3. Audit nghiệp vụ (đó là audit-engine, append-only).
4. Workflow lõi (đó là workflow-engine).
5. Lưu trữ truth nghiệp vụ (đó là database/ + runtime/).
6. Tự ý cập nhật state runtime mà không qua command.
7. Bypass permission-engine.
8. Quyết định runtime ("script GAS chạy cron tự xoá hồ sơ").
```

---

## Repo isolation

Vị trí cứng của GAS / GWS trong repo:

```txt
integrations/gas-support/
├─ README.md
├─ legacy-modules/      # nơi đặt code GAS cũ khi import từ workspace khác
├─ adapter/             # adapter mới (HTTPS bridge gọi command runtime)
├─ contracts/           # contract dùng cho GAS gọi vào runtime
└─ test-console/        # web simulator của GAS payload (offline)

integrations/google-workspace/
├─ README.md
├─ adapter/             # adapter Drive / Gmail / Docs / Sheet
├─ contracts/
└─ test-console/
```

Quy tắc cứng:

```txt
1. KHÔNG đặt GAS ở root repo.
2. KHÔNG tạo folder apps-script/ ở top-level.
3. KHÔNG copy GAS vào runtime/, services/, apps/, database/, packages/.
4. PHẢI đặt vào integrations/gas-support/legacy-modules/<module-name>/ khi import.
5. PHẢI kèm README mô tả: nguồn gốc, ngày import, trạng thái (active / frozen / deprecated).
6. KHÔNG sửa logic nghiệp vụ trong lúc import (chỉ di chuyển, append-only).
```

---

## Migration direction (GAS legacy → Core Runtime)

Lộ trình thay thế:

```txt
Bước 1 — IMPORT
  Đặt GAS legacy vào integrations/gas-support/legacy-modules/<module>/
  + README ghi rõ trạng thái ACTIVE.
  KHÔNG sửa logic trong lúc import.

Bước 2 — WRAP
  Viết adapter HTTPS trong integrations/gas-support/adapter/.
  GAS legacy gọi command vào runtime qua adapter (KHÔNG ghi DB trực tiếp).

Bước 3 — SHADOW
  Viết native handler trong runtime/ chạy SONG SONG với GAS legacy.
  So sánh kết quả qua audit log.

Bước 4 — CUTOVER
  Khi native handler ổn định → chuyển trigger từ GAS sang native.
  GAS legacy chuyển trạng thái FROZEN (không còn được trigger production).

Bước 5 — DEPRECATE
  Đánh DEPRECATED trong README của legacy module.
  KHÔNG xoá. Giữ để rollback / audit.
```

Quy tắc xuyên suốt:

```txt
- KHÔNG xoá legacy code khi cutover.
- KHÔNG di chuyển legacy ra ngoài integrations/gas-support/legacy-modules/.
- KHÔNG sửa nghiệp vụ legacy "tiện tay" — sửa thì tạo native + ADR riêng.
- Mỗi bước có 1 phase report tương ứng (vd. PHASE_0XX_GAS_<MODULE>_MIGRATION).
```

---

## Roadmap mức cao

| Giai đoạn | Vai trò GAS / GWS |
|---|---|
| Đầu (legacy) | Core = GAS + Sheet (đã rời) |
| Hiện tại | Core Runtime native; GAS = integration adapter; legacy isolated |
| Trung hạn | Native handler thay dần GAS legacy; GAS chỉ còn light automation hỗ trợ |
| Dài hạn | GWS chỉ còn channel report/export/file, KHÔNG còn tham gia workflow |

---

## Guardrails

```txt
G-1  GAS KHÔNG được trở lại làm core runtime.
G-2  GAS KHÔNG được giữ business truth.
G-3  GAS KHÔNG được tự cập nhật state runtime ngoài command.
G-4  Mọi GAS endpoint coi là external + audit nặng.
G-5  Khi GAS bị thay thế bằng Core Runtime native, KHÔNG xoá legacy — chỉ DEPRECATED.
G-6  Sheet KHÔNG là state store nghiệp vụ.
G-7  KHÔNG tạo apps-script/ ở root.
G-8  GWS adapter (Drive/Gmail/Docs/Sheet) PHẢI có timeout + retry + backoff.
G-9  Mỗi legacy module có README ghi: nguồn gốc, ngày import, trạng thái.
G-10 Mỗi bước migration có phase report riêng.
```

---

## Non-goals

```txt
- Không "GAS framework" mới (KHÔNG mở rộng GAS như runtime).
- Không "Sheet ORM" (sheet KHÔNG là DB nghiệp vụ).
- Không cho phép GAS định nghĩa permission.
- Không xoá GAS legacy "để cleanup".
- Không tự động convert GAS sang TypeScript bằng tool — phải human review từng module.
```

---

## OPEN QUESTION (TODO cho phase tương lai)

```txt
Q1: Ai chịu trách nhiệm "freeze" GAS legacy ở Bước 4? (Owner role chưa định nghĩa.)
Q2: Khi cutover, GAS có nên giữ trigger "dry-run mode" để observe không?
Q3: Adapter HTTPS cho GAS dùng auth gì? (Service account vs PAT vs JWT — chưa quyết.)
Q4: legacy-modules/ có cần convention naming gì khác không?
Q5: GWS Drive làm storage external có cần versioning policy?
```

(Trả lời ở phase migration GAS sau, không bịa ở turn này.)

---

## References

- Source: [`../source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md`](../source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md) (sec 4 — Vai trò GAS/GWS)
- Source: [`../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md`](../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md) (sec II — Stack giai đoạn 1; sec III — GWS support layer)
- ADR-0002 — Demote GAS / GWS to integration layer.
- ADR-0001 — Adopt Operational Runtime Platform.
- Layer README: [`../../../integrations/README.md`](../../../integrations/README.md)
- GAS slot README: [`../../../integrations/gas-support/README.md`](../../../integrations/gas-support/README.md)
- Boundary tham chiếu: [`./20_INTEGRATION_BOUNDARY.md`](./20_INTEGRATION_BOUNDARY.md)
- Convention doc: [`../../../docs/INTEGRATION_BOUNDARY.md`](../../../docs/INTEGRATION_BOUNDARY.md)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 3 — Initial canonical version.
```
