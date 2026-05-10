# ADR-0004 — Event-driven Operational Runtime

| Field | Value |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-05-10 |
| **Phase** | PHASE_002_ARCHITECTURE_DOCS_MIGRATION |
| **Authors** | LAOCONG_VOS Architect (human) + AI assistant |
| **Accepted by** | User approval in Phase 002 Turn 5 |
| **Accepted at** | 2026-05-10 |
| **Supersedes** | — |
| **Superseded by** | — |
| **Related** | ADR-0001, ADR-0003 |

---

## Context

Một hệ vận hành nghiệp vụ thật (giao việc, hồ sơ, hoá đơn, SLA, escalation,
notification, sync, audit) cần khả năng:

- Phản ứng theo sự kiện (event-driven), không phải theo chu trình UI click cứng.
- Tách biệt người **gây ra hành động** với người **xử lý hậu quả**.
- Cho phép nhiều handler cho một event (notification, projection, audit, downstream).
- Cho phép retry / backoff / DLQ khi handler lỗi.
- Audit append-only — biết chuyện gì đã xảy ra, theo thứ tự nào, vì sao.
- Cho phép replay event (nếu cần) để rebuild projection.
- Cho phép AI / agent quan sát event mà không cần can thiệp runtime.

Pattern "button → query → update DB → render" thông thường KHÔNG đáp ứng
được các yêu cầu trên ở mức production-safe.

---

## Decision

Core Runtime áp dụng **Event-driven Operational Runtime**:

- Mọi mutation đi qua **CommandBus** (`runtime/command-engine`).
- Mỗi command thành công sinh ra ≥ 1 **Event** ghi vào append-only event store.
- Event được xử lý qua **EventBus** (`runtime/event-engine`) bởi 1..N handler.
- Handler có thể: cập nhật projection, gửi notification, ghi audit, dispatch command tiếp theo.
- Workflow & Task được mô tả bằng **State Machine** rõ ràng (`workflow-engine`, `task-engine`).
- Audit được giữ ở **Audit Engine** dạng append-only, có `traceId` + `correlationId`.

### Luồng chuẩn

```txt
action
  ↓
command  (validate + permission)
  ↓
event    (append-only event store)
  ↓
queue    (async handler dispatcher)
  ↓
handler  (projection / state transition / downstream command)
  ↓
notification  (qua services/notification → integrations/*)
  ↓
audit    (append-only audit trail)
```

### Đặc điểm bắt buộc

- Append-only event store + audit trail.
- Có `traceId` + `correlationId` end-to-end.
- Handler **idempotent** (nhận event 2 lần ≠ ghi sai state).
- Có **retry** + **backoff** cho handler lỗi.
- Có **DLQ** (dead-letter queue) cho event không xử lý được sau N lần retry.
- Có **replay** mode cho dev/staging (KHÔNG replay tự động trên prod).

### Stack giai đoạn 1

- Event store: bảng Postgres `event_store` (append-only, không update/delete).
- Queue: Postgres `LISTEN/NOTIFY` hoặc bảng `task_queue` poll-based.
- Có thể nâng cấp Redis/NATS sau khi cần (thay được nhờ `packages/event-bus`).

---

## Consequences

### Tích cực

- Audit nghiệp vụ chuẩn → easy debug, easy compliance.
- Replay được event → dễ build projection mới mà không phá DB.
- Loose coupling giữa command emitter và event handler.
- Mở cửa cho AI/agent observe event (đọc event store) mà không cần can thiệp runtime.
- Dễ scale: handler có thể chạy worker pool.

### Tiêu cực / chi phí

- Phải nắm pattern event sourcing nhẹ + idempotency.
- Phải nghiêm túc với schema event (versioning).
- Eventual consistency — UI không nên dựa vào "ghi xong là thấy ngay".
- Bảng `event_store` lớn dần → cần partition/archive sau thời gian.
- Debugging async khó hơn debugging sync.

---

## Guardrails

```txt
G-1  Event store là APPEND-ONLY. KHÔNG update / delete event.
G-2  Mỗi event PHẢI có:
     - id (uuid), type, version, occurred_at, occurred_by,
     - tenant_id, traceId, correlationId, payload (json), checksum.
G-3  Mỗi handler PHẢI idempotent (dùng event id làm dedup key).
G-4  Mỗi command PHẢI sinh ra ít nhất 1 event (kể cả command bị reject → emit *_REJECTED event).
G-5  KHÔNG cho UI / service ghi thẳng vào projection (ngoại trừ projection rebuilder do runtime gọi).
G-6  KHÔNG cho integration emit event nghiệp vụ (chỉ command-engine emit).
G-7  Projection có thể bị rebuild từ event store — KHÔNG coi projection là source of truth.
G-8  Schema event PHẢI có versioning (vd. v1, v2). Migration event KHÔNG phá schema cũ.
G-9  Replay event là tác vụ thủ công có audit, KHÔNG bao giờ tự động trên prod.
G-10 Event nhạy cảm (PII / financial) PHẢI mã hoá ở rest, có policy access riêng.
```

---

## References

- ADR-0001 — Adopt Operational Runtime Platform.
- ADR-0003 — Runtime-first architecture.
- ADR-0005 — Human-override policy.
- [`../../../runtime/README.md`](../../../runtime/README.md)
- [`../../../packages/README.md`](../../../packages/README.md) (event-bus, core-contracts)
- [`../../../database/README.md`](../../../database/README.md) (event_store, audit_log tables)
