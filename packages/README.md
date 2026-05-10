# packages/ — Shared Contracts & SDK

> Các package nội bộ dùng chung giữa `apps/`, `services/`, `runtime/`, `integrations/`.

---

## 1. Packages

| Folder | Vai trò |
|---|---|
| `core-contracts/` | Type-safe contract chung: command, event, state, error code. **Source of truth** về shape dữ liệu giữa các tầng. |
| `runtime-sdk/` | SDK gọi runtime từ apps/services/integrations (CommandClient, EventSubscriber, ProjectionReader). |
| `ui-kit/` | Component UI chung: form, table, action dock, focus mode, status badge. |
| `validators/` | Schema validator dùng chung (zod / yup). |
| `event-bus/` | Trừu tượng hoá event bus client (in-process / postgres listen / NATS sau này). |
| `test-console-kit/` | Bộ component & util chuẩn để build Test Console cho mọi engine/module. |

---

## 2. Quy tắc

```txt
1. Package PHẢI có version riêng (semver) khi đưa vào CI.
2. Package KHÔNG được phụ thuộc ngược (apps không được import vào package).
3. core-contracts là tầng thấp nhất, KHÔNG import bất kỳ package nào khác.
4. ui-kit KHÔNG được chứa business logic.
5. runtime-sdk KHÔNG được giữ state — chỉ là client.
6. test-console-kit là CHUẨN bắt buộc cho mọi engine/module trước khi merge.
```

---

## 3. Test Console Standard

Mỗi engine/module phải dùng `packages/test-console-kit/` để build console
riêng có:

- Mock input (command/event/payload)
- Quan sát output (event/state/projection/audit)
- Quan sát side effect (notification, integration call)
- Chạy được offline (không cần prod data)

Console này là điều kiện cần để PR được merge vào `dev`.

---

## 4. Trạng thái hiện tại

Tất cả 6 package đang ở dạng **placeholder folder**. Chưa scaffold.
