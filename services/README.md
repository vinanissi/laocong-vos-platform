# services/ — Backend Service Layer

> Tầng dịch vụ backend bao quanh Core Runtime.
> Services **gọi** vào runtime, **không** thay thế runtime.

---

## 1. Services

| Folder | Vai trò |
|---|---|
| `api/` | HTTP / RPC API gateway. Nhận request từ apps/integrations, dispatch command vào runtime. |
| `worker/` | Background worker — consume queue, chạy job, xử lý retry/backoff. |
| `ai-runtime/` | AI orchestration service — gọi `integrations/openai|gemini|anthropic` theo policy. AI-assisted, không AI-controlled. |
| `notification/` | Notification dispatcher — chuyển event → message qua `integrations/email|telegram|zalo|lark`. |
| `auth/` | Auth service — Supabase Auth, session, token, RBAC integration với `runtime/permission-engine`. |

---

## 2. Quy tắc

```txt
1. Service là tầng vận chuyển, KHÔNG phải tầng nghiệp vụ.
2. Mọi nghiệp vụ phải dispatch về runtime command-engine.
3. Service PHẢI có health check & self-test.
4. Service PHẢI có traceId / correlationId end-to-end.
5. Service KHÔNG được tự sửa state DB.
6. AI-runtime KHÔNG được tự quyết định runtime — chỉ assist.
7. Notification KHÔNG được giữ trạng thái đã đọc/chưa đọc của nghiệp vụ
   (việc đó là projection của runtime).
```

---

## 3. Stack đề xuất

- Node.js / TypeScript
- Supabase Postgres + Realtime
- Queue: tận dụng Postgres LISTEN/NOTIFY hoặc queue table (giai đoạn 1)
- Sau này có thể thay bằng Redis / NATS khi scale

---

## 4. Trạng thái hiện tại

Tất cả 5 service đang ở dạng **placeholder folder**. Chưa có code.
