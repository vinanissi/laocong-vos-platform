# Integration Boundary — LAOCONG_VOS_PLATFORM

> Ranh giới cứng giữa **Core Runtime** và **Integration**.
> Vi phạm boundary = vi phạm Red Rule.

---

## 1. Nguyên tắc gốc

```txt
Core Runtime  =  source of business truth
Integration   =  external capability adapter
```

Nói cách khác:

```txt
Truth lives in runtime.
Adapter lives in integration.
GWS / GAS lives as ONE integration among many.
```

---

## 2. Bảng phân quyền sở hữu

| Khái niệm | Core Runtime sở hữu | Integration sở hữu |
|---|---|---|
| **workflow** definition | ✅ | ❌ |
| **runtime** lifecycle | ✅ | ❌ |
| **state** machine & state store | ✅ | ❌ |
| **audit** trail nghiệp vụ | ✅ | ❌ (chỉ log adapter call) |
| **event** nghiệp vụ | ✅ | ❌ (chỉ adapter event) |
| **permission** & policy | ✅ | ❌ |
| **contract** dữ liệu nội bộ | ✅ (qua `packages/core-contracts`) | ❌ |
| **bridge** in/out | ❌ | ✅ |
| **sync** sheet / form / external store | ❌ | ✅ |
| **import / export** data | ❌ | ✅ |
| **notification** ra ngoài | ❌ | ✅ |
| **external API** call | ❌ | ✅ |

---

## 3. Quy tắc đỏ về boundary

```txt
RED-B1  Integration KHÔNG được giữ business truth.
RED-B2  Integration KHÔNG được bypass command-engine để ghi state.
RED-B3  Integration KHÔNG được tự ý ghi vào DB nghiệp vụ.
RED-B4  GAS / GWS KHÔNG phải source of truth.
RED-B5  Sheet KHÔNG phải state store nghiệp vụ.
RED-B6  Apps Script KHÔNG được trở lại làm core runtime.
RED-B7  AI provider KHÔNG được tự quyết định runtime — chỉ assist.
RED-B8  Không tạo folder apps-script/ ở root repo.
RED-B9  Mọi adapter PHẢI có audit log mọi lần gọi ra ngoài.
RED-B10 Mọi adapter PHẢI có human override (có thể tắt/ngừng).
```

---

## 4. Pattern đúng — luồng dữ liệu

### 4.1. Từ external vào runtime

```txt
External system (GAS / Form / Webhook / Telegram / ...)
        │
        ▼
integrations/<name>/adapter        (chỉ chuẩn hoá payload + audit log)
        │
        ▼
services/api  → runtime/command-engine
        │
        ▼
runtime/event-engine  → projection / state / audit
        │
        ▼
services/notification → integrations/email|telegram|... (gửi ra ngoài nếu cần)
```

### 4.2. Từ runtime ra external

```txt
runtime/event-engine  → emit event
        │
        ▼
services/worker  → consume event
        │
        ▼
integrations/<name>/adapter  → external API call (audit + retry + timeout)
```

---

## 5. Anti-pattern cần tránh

```txt
❌ UI gọi thẳng integration (bỏ qua services/api & runtime).
❌ GAS đọc/ghi thẳng DB Supabase nghiệp vụ.
❌ Sheet là "state thật" còn DB chỉ là "bản sao".
❌ Adapter chứa business rule (vd. tính giá, duyệt đơn).
❌ AI provider trực tiếp update state nghiệp vụ.
❌ Notification giữ trạng thái "đã đọc" của nghiệp vụ.
❌ Worker bypass command-engine để ghi state.
```

---

## 6. Trường hợp đặc biệt: Google Workspace / Apps Script

GWS / GAS được giữ ở `integrations/google-workspace/` và
`integrations/gas-support/`, với scope:

```txt
- Sync sheet (đọc / ghi sheet như external store)
- Form bridge (Form submission → adapter → command)
- Drive (file storage external)
- Gmail (transactional email — hoặc dùng integrations/email)
- Docs (export báo cáo)
- Lightweight automation hỗ trợ phòng ban (KHÔNG phải workflow nghiệp vụ chính)
- Hỗ trợ legacy module GAS đang chạy
```

KHÔNG được dùng GWS/GAS để:

```txt
- Quyết định trạng thái đơn / hồ sơ / nhiệm vụ
- Phân quyền nghiệp vụ
- Audit nghiệp vụ
- Workflow lõi
- Lưu trữ truth nghiệp vụ
```

Roadmap: GAS sẽ được dần thay bằng Core Runtime native, **nhưng**:

- KHÔNG xoá GAS legacy.
- Đánh dấu DEPRECATED khi đã có thay thế.
- Giữ trong `integrations/gas-support/legacy-modules/` để rollback.

---

## 7. Checklist khi thêm 1 integration mới

```txt
[ ] Tạo folder integrations/<name>/ với README mô tả scope.
[ ] Tạo contracts/ định nghĩa input/output rõ ràng.
[ ] Tạo adapter/ chỉ chứa adapter code (KHÔNG nghiệp vụ).
[ ] Tạo bridge/ in/out (nếu có).
[ ] Tạo test-console/ chạy được offline với mock external.
[ ] Có audit log cho mọi external call.
[ ] Có timeout, retry, backoff rõ ràng.
[ ] Có human override (có thể tắt adapter).
[ ] KHÔNG đụng tới DB nghiệp vụ — đi qua command-engine.
[ ] Cập nhật integrations/README.md (bảng danh sách).
```

---

## 8. Tham chiếu

- [`./REPO_STRUCTURE.md`](./REPO_STRUCTURE.md)
- [`./GIT_BRANCH_STRATEGY.md`](./GIT_BRANCH_STRATEGY.md)
- [`../runtime/README.md`](../runtime/README.md)
- [`../integrations/README.md`](../integrations/README.md)
- [`../integrations/gas-support/README.md`](../integrations/gas-support/README.md)
- [`../.cursor/rules/laocong-vos-platform.md`](../.cursor/rules/laocong-vos-platform.md)
