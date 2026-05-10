# integrations/gas-support/ — Google Apps Script Support Adapter

> **GAS chỉ là adapter hỗ trợ.**
> Không phải core. Không giữ business truth. Không định nghĩa workflow runtime.

---

## 1. Vai trò

`gas-support/` cung cấp adapter cho Google Apps Script (GAS) — chủ yếu để:

```txt
- sync sheet
- form bridge (Google Form → command)
- lightweight automation
- import / export báo cáo
- support legacy module GAS đã có sẵn
```

GAS được phép **gọi vào** Core Runtime qua command API (HTTPS endpoint),
nhưng **không** được:

```txt
- giữ state nghiệp vụ
- giữ workflow nghiệp vụ
- giữ audit nghiệp vụ
- bypass permission
- thay thế Core Runtime
```

---

## 2. Cấu trúc

```txt
integrations/gas-support/
├─ README.md
├─ legacy-modules/      # nơi đặt code GAS cũ (khi được di chuyển vào)
├─ adapter/             # adapter mới (HTTPS bridge, command call)
├─ contracts/           # contract dùng cho GAS gọi vào runtime
└─ test-console/        # test console (web simulator của GAS payload)
```

(Hiện chỉ có `legacy-modules/` được tạo sẵn.)

---

## 3. Tình trạng `legacy-modules/`

> **Hiện tại repo KHÔNG có code GAS / Apps Script nào.**

`legacy-modules/` được giữ trống (có `.gitkeep`) làm slot để các module GAS cũ
(khi được nhập vào repo này từ workspace khác) có chỗ "hạ cánh an toàn" mà
**không** bị nhầm là core runtime.

Khi import GAS code vào, tuân thủ:

1. **Không** đặt GAS ở root repo.
2. **Không** tạo folder `apps-script/` ở top-level.
3. **Không** copy GAS vào `runtime/`, `services/`, `apps/`, `database/`.
4. **Phải** đặt vào `integrations/gas-support/legacy-modules/<module-name>/`.
5. **Phải** kèm `README.md` mô tả: nguồn gốc, ngày import, trạng thái (active / frozen / deprecated).
6. **Không** sửa logic nghiệp vụ trong lúc import (chỉ di chuyển, append-only).

---

## 4. Quy tắc đỏ

```txt
1. GAS KHÔNG được trở lại làm core runtime.
2. GAS KHÔNG được giữ business truth.
3. GAS KHÔNG được tự cập nhật state runtime mà không qua command.
4. Mọi GAS endpoint phải coi là external và phải audit.
5. Khi GAS bị thay thế bằng Core Runtime, KHÔNG xoá legacy-modules,
   chỉ đánh dấu DEPRECATED và giữ để rollback.
```

---

## 5. Tham chiếu

- Boundary chi tiết: [`../../docs/INTEGRATION_BOUNDARY.md`](../../docs/INTEGRATION_BOUNDARY.md)
- Tổng quan integration: [`../README.md`](../README.md)
- Định vị hệ thống: [`../../README.md`](../../README.md)
