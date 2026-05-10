# database/ — Storage Layer

> Supabase / Postgres schema, migration, seed cho LAOCONG_VOS_PLATFORM.

---

## 1. Cấu trúc

| Folder | Vai trò |
|---|---|
| `supabase/` | Cấu hình Supabase project (config.toml, functions, policies). |
| `migrations/` | SQL migration — **append-only**, có timestamp, có rollback note. |
| `seed/` | Seed data cho dev/staging. KHÔNG seed prod. |
| `schema/` | Schema reference (ERD, generated types). |

---

## 2. Quy tắc database

```txt
1. Migration LÀ append-only. Không sửa migration đã merge.
2. Migration LUÔN có description + ngày + tên tác giả.
3. Destructive migration (DROP/TRUNCATE) PHẢI có review riêng + rollback plan.
4. KHÔNG migration phá dữ liệu.
5. Seed prod là CẤM trừ khi có quyết định ghi trong 00_SYSTEM_BRAIN/decisions.
6. RLS (Row Level Security) là MẶC ĐỊNH — không tắt RLS.
7. Mọi bảng nghiệp vụ PHẢI có:
   - id (uuid)
   - created_at
   - updated_at
   - created_by
   - updated_by
   - tenant_id (multi-tenant ready)
8. Append-only event store là bảng riêng — không update/delete.
9. Audit log là bảng riêng — không update/delete.
```

---

## 3. Quy ước migration filename

```txt
YYYYMMDDHHmm__<short-description>.sql

ví dụ:
202605101800__init_tenant_schema.sql
202605110900__add_task_lifecycle_table.sql
```

---

## 4. Trạng thái hiện tại

Tất cả thư mục đang là **placeholder**. Schema sẽ được khởi tạo ở phase
`phase/00X-database-bootstrap` cùng với Supabase project link.
