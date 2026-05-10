# 20 — Integration Boundary

## Status
Draft Canonical

## Purpose

Định nghĩa **ranh giới cứng** giữa **Core Runtime** và **Integration**.
Vi phạm boundary = vi phạm Red Rule, không được merge.

Nguyên tắc gốc:

```txt
Truth lives in runtime.
Adapter lives in integration.
GWS / GAS lives as ONE integration among many.
```

---

## Core Principles

```txt
1. Integration KHÔNG giữ business truth.
2. Integration là adapter — KHÔNG chứa nghiệp vụ.
3. Integration stateless với business state.
4. Mọi external call có audit log.
5. Mọi adapter có timeout / retry / backoff / human-killable.
```

---

## Layer ownership table

| Layer | Owns | Does NOT Own |
|---|---|---|
| **runtime/** (Core) | workflow · runtime lifecycle · state · audit nghiệp vụ · event nghiệp vụ · permission · contract | bridge ngoài · sync sheet · external API call · notification gửi đi · file storage external |
| **services/api** | HTTP/RPC routing · request validation · dispatch command vào runtime | business logic · state nghiệp vụ · audit nghiệp vụ |
| **services/worker** | queue consume · retry/backoff · DLQ | tạo command "tự ý" — chỉ chạy command đã được runtime-approved |
| **services/ai-runtime** | AI orchestration · prompt template · provider routing | quyết định runtime · ghi state · phát business event |
| **services/notification** | dispatch event → message qua integrations | giữ trạng thái "đã đọc/chưa đọc" của nghiệp vụ (đó là projection runtime) |
| **services/auth** | session · token · login flow | định nghĩa permission nghiệp vụ (đó là `permission-engine`) |
| **apps/** (UI) | render projection · gọi command qua SDK · UX guidance | business logic · ghi DB trực tiếp · giữ state nghiệp vụ |
| **database/** | storage · RLS · migration · event_store · audit_log table | quyết định nghiệp vụ |
| **packages/** | shared contract · SDK · UI kit · validators · event-bus client · test-console-kit | nghiệp vụ |
| **integrations/*** | bridge in/out · sync · import/export · external notification · external API call | workflow · state nghiệp vụ · audit nghiệp vụ · permission nghiệp vụ · business event |

---

## Integration — Allowed responsibilities

```txt
1. Bridge dữ liệu in/out giữa external system và runtime.
2. Sync 1 chiều / 2 chiều với external store (sheet, ERP, ...).
3. Import / Export dữ liệu (file → command, event → file).
4. Notification ra ngoài (email, telegram, zalo, lark, push).
5. Gọi external API (AI provider, OCR, payment, maps, ...).
6. Adapter cho legacy system (vd. gas-support/legacy-modules).
```

## Integration — Forbidden responsibilities

```txt
1. Giữ business truth (state nghiệp vụ).
2. Định nghĩa workflow nghiệp vụ.
3. Phát business event (chỉ command-engine phát business event).
4. Phân quyền nghiệp vụ.
5. Quyết định trạng thái đơn / hồ sơ / nhiệm vụ.
6. Update / delete audit nghiệp vụ.
7. Bypass command-engine để ghi state.
8. Tự sửa schema database nghiệp vụ.
9. Cấp quyền cho hệ ngoài đụng vào runtime mà không qua command.
10. Quyết định AI runtime ("AI gọi cái này thì làm cái kia tự động").
```

---

## Adapter contract (chuẩn folder mỗi integration)

```txt
integrations/<name>/
├─ README.md             # mục đích, scope, contract
├─ adapter/              # adapter implementation (KHÔNG nghiệp vụ)
├─ contracts/            # input/output contract (typed)
├─ bridge/               # bridge code (in/out)
├─ tests/                # adapter test, KHÔNG phải test nghiệp vụ
└─ test-console/         # test console riêng cho adapter (offline mock external)
```

Yêu cầu mỗi adapter:

```txt
- Stateless với business state.
- Có audit log mọi external call.
- Có timeout / retry / backoff rõ ràng.
- Có human override (kill switch tắt được từ runtime).
- Có test console chạy offline (mock external).
- Có version contract (v1, v2 — không phá v cũ).
```

---

## Anti-patterns (CẤM)

```txt
❌ UI gọi thẳng integration (bypass services/api & runtime).
❌ GAS đọc/ghi thẳng DB Supabase nghiệp vụ.
❌ Sheet là "state thật", DB chỉ là "bản sao".
❌ Adapter chứa business rule (tính giá, duyệt đơn, validation nghiệp vụ).
❌ AI provider trực tiếp update state nghiệp vụ.
❌ Notification giữ trạng thái "đã đọc" của nghiệp vụ.
❌ Worker bypass command-engine để ghi state.
❌ Tạo folder apps-script/ ở root repo.
❌ Adapter "thông minh" tự ý retry mãi mãi không có DLQ.
```

---

## Pattern đúng — luồng dữ liệu

### External → Runtime

```txt
External (GAS / Form / Webhook / Telegram / Sheet update / ...)
   ▼
integrations/<name>/adapter   (chuẩn hoá payload + audit log)
   ▼
services/api → runtime/command-engine
   ▼
runtime/event-engine → projection / state / audit
   ▼
services/notification → integrations/email|telegram|... (gửi ra ngoài nếu cần)
```

### Runtime → External

```txt
runtime/event-engine → emit event
   ▼
services/worker → consume event
   ▼
integrations/<name>/adapter → external API call (audit + retry + timeout)
```

---

## Checklist khi thêm 1 integration mới

```txt
[ ] Tạo folder integrations/<name>/ với README mô tả scope.
[ ] Tạo contracts/ định nghĩa input/output rõ.
[ ] Tạo adapter/ chỉ chứa adapter code (KHÔNG nghiệp vụ).
[ ] Tạo bridge/ in/out (nếu có).
[ ] Tạo test-console/ chạy offline với mock external.
[ ] Có audit log cho mọi external call.
[ ] Có timeout, retry, backoff rõ ràng.
[ ] Có human override (kill switch).
[ ] KHÔNG đụng tới DB nghiệp vụ — đi qua command-engine.
[ ] Cập nhật integrations/README.md (bảng danh sách).
[ ] Nếu là adapter cho hệ "có vẻ-core" (vd. ERP) → kiểm tra red rule trước khi merge.
```

---

## Guardrails

```txt
G-1  Integration KHÔNG được giữ business truth.
G-2  Integration KHÔNG được bypass command-engine.
G-3  Integration KHÔNG được tự ghi vào DB nghiệp vụ.
G-4  GAS / GWS KHÔNG là source of truth.
G-5  Sheet KHÔNG là state store nghiệp vụ.
G-6  Apps Script KHÔNG được trở lại làm core runtime.
G-7  AI provider KHÔNG được tự quyết runtime.
G-8  Mọi adapter PHẢI có audit log mọi external call.
G-9  Mọi adapter PHẢI có human override.
G-10 Mọi adapter PHẢI có Test Console offline.
```

---

## Non-goals

```txt
- Không "smart adapter" tự suy diễn nghiệp vụ.
- Không "shared business module" trong integration.
- Không hợp nhất nhiều integration vào 1 module to.
- Không adapter biết schema runtime (chỉ biết contract).
- Không tích hợp ngược (integration KHÔNG được xem là caller-of-truth).
```

---

## References

- Source: [`../source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md`](../source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md) (sec 2 — Triết lý kiến trúc; sec 5 — Kiến trúc Integration)
- ADR-0001 — Adopt Operational Runtime Platform.
- ADR-0002 — Demote GAS / GWS to integration layer.
- Layer README: [`../../../integrations/README.md`](../../../integrations/README.md)
- Existing convention doc: [`../../../docs/INTEGRATION_BOUNDARY.md`](../../../docs/INTEGRATION_BOUNDARY.md)
- GAS detail: [`./30_GAS_GWS_SUPPORT_LAYER.md`](./30_GAS_GWS_SUPPORT_LAYER.md)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 3 — Initial canonical version.
```
