# apps/ — UI Layer

> Frontend / Web App layer của LAOCONG_VOS_PLATFORM.
> UI **không** giữ business truth — UI gọi command vào Core Runtime.

---

## 1. Apps

| Folder | Đối tượng | Mục đích |
|---|---|---|
| `admin-web/` | Admin / system operator | Quản trị hệ, cấu hình, runtime control |
| `staff-web/` | Nhân viên vận hành | Operational UI, action dock, focus mode |
| `member-web/` | Thành viên / khách | Self-service, tra cứu hồ sơ |
| `public-web/` | Public | Landing, public docs, public form |

---

## 2. Định hướng UI/UX

```txt
- guided-operation-first
- operational-first
- mobile-first
- focus mode
- next-step runtime
- minimal confusion
- trạng thái rõ ràng
- không bí ẩn
- không bắt user tự hiểu workflow
```

Tham khảo phong cách: Linear, Lark, Notion — nhưng **operational-first hơn**.

---

## 3. Stack đề xuất

- React / Next.js (App Router)
- Vercel deployment
- Shared UI: `packages/ui-kit/`
- Shared SDK: `packages/runtime-sdk/`
- Shared contracts: `packages/core-contracts/`

---

## 4. Quy tắc

```txt
1. UI KHÔNG được ghi thẳng vào DB.
2. UI KHÔNG được chứa business logic.
3. UI gọi command qua services/api hoặc runtime-sdk.
4. UI hiển thị state từ projection, không tự suy diễn state.
5. UI luôn có human-override (stop/cancel/rollback button).
6. UI bắt buộc accessible & mobile-friendly.
```

---

## 5. Trạng thái hiện tại

Tất cả 4 app đang ở dạng **placeholder folder**. Chưa scaffold Next.js.
Việc scaffold sẽ thực hiện ở phase riêng (vd. `phase/00X-apps-bootstrap`).
