# 10 — Runtime-first Architecture

## Status
Draft Canonical

## Purpose

Mô tả **Runtime-first Architecture** — cách tổ chức hệ trong đó **Core Runtime
là tâm**, mọi tầng khác (UI, services, integration, AI) **phục vụ** runtime.

Tài liệu này định nghĩa:

- Cái gì thuộc runtime, cái gì không.
- Runtime isolation và contract giữa runtime với các tầng bao quanh.
- Command flow & event flow chuẩn.
- Vai trò human override trong runtime.

---

## Core Principles

```txt
1. Runtime là tâm — không phải UI, không phải DB, không phải AI.
2. Mọi business state thuộc sở hữu runtime/.
3. Mọi mutation đi qua command-engine.
4. Mọi event append-only, idempotent, replayable.
5. Mọi engine có Test Console trước khi merge.
6. Mọi tầng bao quanh có thể thay được — runtime thì không.
7. Human override luôn tồn tại trên mọi engine.
```

---

## Runtime ownership

`runtime/` SỞ HỮU 7 thứ cốt lõi:

| Owns | Engine giữ | Lý do |
|---|---|---|
| **workflow** | `workflow-engine` | Workflow là nghiệp vụ — không thể nằm ở UI / integration. |
| **runtime lifecycle** | `command-engine`, `event-engine` | Mọi action phải đi qua dispatch chuẩn. |
| **state** | `workflow-engine`, `task-engine` | State là truth nghiệp vụ; chỉ được transition qua command. |
| **audit** | `audit-engine` | Append-only; là nguồn duy nhất truy nguyên hành vi nghiệp vụ. |
| **event** | `event-engine` | Append-only event store; replay được; cho phép multi-handler. |
| **permission** | `permission-engine` | Capability-based, policy-aware; gắn human override role. |
| **contract** | `packages/core-contracts` (gắn vào runtime) | Type-safe shape của command, event, state, error. |

`runtime/` **KHÔNG sở hữu**:

```txt
- Bridge tới hệ ngoài            → integrations/
- Sync sheet / form              → integrations/google-workspace, gas-support
- Notification ra ngoài          → integrations/email, telegram, zalo, lark
- Gọi AI provider                → integrations/openai, gemini, anthropic
- File storage external          → integrations/storage
- HTTP gateway                   → services/api
- Background queue runner        → services/worker
- AI orchestration               → services/ai-runtime
- UI render                      → apps/*
- DB engine                      → database/ (Supabase)
```

---

## Runtime isolation

Core Runtime gồm **6 engine độc lập** trong `runtime/`:

| Engine | Folder | Trách nhiệm |
|---|---|---|
| Command Engine | `runtime/command-engine/` | Nhận command, validate, dispatch, audit. |
| Event Engine | `runtime/event-engine/` | Append event, dispatch handler, dedup theo event id. |
| Workflow Engine | `runtime/workflow-engine/` | Workflow definition + state machine. |
| Task Engine | `runtime/task-engine/` | Lifecycle task: NEW → ACK → IN_PROGRESS → WAITING → REVIEW → DONE → CLOSED. |
| Permission Engine | `runtime/permission-engine/` | Capability check, policy enforcement, override role. |
| Audit Engine | `runtime/audit-engine/` | Append-only audit; tham gia mọi command/event. |

Quy tắc isolation:

```txt
- Engine PHẢI test được offline với Test Console riêng.
- Engine KHÔNG được phụ thuộc vào HTTP framework, queue impl cụ thể.
- Engine KHÔNG được biết về UI, integration, AI.
- Engine giao tiếp qua contract trong packages/core-contracts/.
- Engine KHÔNG share state global; chỉ qua event/command.
```

---

## Command flow (chuẩn)

```txt
action (UI / integration / scheduled job)
   │
   ▼
runtime/command-engine
   │  validate (schema)
   │  permission check (permission-engine)
   │  audit (audit-engine)
   ▼
runtime/event-engine
   │  append event (event_store)
   │  dispatch handler(s) async
   ▼
handler(s)
   │  state transition (workflow/task-engine)
   │  projection update
   │  emit downstream command (optional)
   ▼
services/notification
   │
   ▼
integrations/* (external send: email, telegram, zalo, lark, sheet sync, ...)
```

Quy tắc:

```txt
- KHÔNG có "shortcut" từ UI ghi thẳng DB.
- KHÔNG có "shortcut" từ integration ghi thẳng state.
- KHÔNG có "shortcut" từ AI ghi thẳng command (AI chỉ suggest, user accept mới dispatch command).
- Mỗi command thành công sinh ≥ 1 event. Command bị reject cũng emit *_REJECTED event.
- Mỗi handler PHẢI idempotent (event id làm dedup key).
```

---

## Event flow (chuẩn)

```txt
event (append-only)
   ├─ projection updater   (rebuild read model)
   ├─ notification dispatcher  (services/notification → integrations/*)
   ├─ audit logger        (audit-engine: bổ sung audit trail)
   ├─ downstream command  (chain workflow / task transition)
   └─ AI observer         (ai-runtime read-only; KHÔNG ghi state)
```

Quy tắc:

```txt
- Event KHÔNG bao giờ bị update / delete.
- Event có version (v1, v2). Migration event KHÔNG phá schema cũ.
- Replay event là thao tác thủ công, audit nặng. KHÔNG replay tự động trên prod.
- Projection có thể bị rebuild — projection KHÔNG phải source of truth.
```

Diagram chi tiết: xem [`40_EVENT_DRIVEN_RUNTIME.md`](./40_EVENT_DRIVEN_RUNTIME.md).

---

## Human override (gắn vào runtime)

Runtime là nơi **enforce** human override. 5 quyền bắt buộc tồn tại:

```txt
STOP        — dừng workflow / handler / job đang chạy.
ROLLBACK    — quay lại state trước (qua compensation event, không xoá audit).
REJECT      — từ chối command/event đang chờ (kèm lý do, audit).
REASSIGN    — chuyển ownership task / approval cho người khác.
OVERRIDE    — vượt rule bình thường (require role + audit nặng + reason).
```

Mỗi override:

```txt
- PHẢI đi qua command-engine.
- PHẢI tạo 1 event riêng (vd. *_OVERRIDDEN_BY_HUMAN).
- PHẢI ghi audit (who / when / what / why).
- KHÔNG xoá lịch sử — chỉ "reverse" bằng compensation event.
```

Chi tiết: [`50_HUMAN_OVERRIDE_POLICY.md`](./50_HUMAN_OVERRIDE_POLICY.md).

---

## Guardrails

```txt
G-1  Mọi business state PHẢI thuộc runtime/.
G-2  Mọi mutation PHẢI đi qua command-engine.
G-3  Mọi event PHẢI append-only.
G-4  Mọi engine PHẢI có Test Console.
G-5  Service KHÔNG được tự sửa state nghiệp vụ.
G-6  UI KHÔNG được ghi thẳng DB.
G-7  Integration KHÔNG được giữ business truth.
G-8  AI KHÔNG được quyết định runtime — chỉ assist.
G-9  Permission là capability-based, gắn vào permission-engine.
G-10 Audit nghiệp vụ là append-only, gắn vào audit-engine.
```

---

## Non-goals

```txt
- Không UI-first / DB-first / Automation-first / AI-first.
- Không "engine god-class" — mỗi engine là một module nhỏ, có scope rõ.
- Không "shared state global" giữa engine.
- Không runtime phụ thuộc vào framework HTTP / queue cụ thể.
- Không runtime gọi external API trực tiếp (đi qua services/worker → integrations).
```

---

## References

- Source: [`../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md`](../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md) (sec III — Kiến trúc đúng cho hệ; sec VII — L4-ready; sec VIII — Command architecture; sec IX — Event flow; sec X — State machine; sec XI — Audit & observability)
- ADR-0003 — Runtime-first architecture.
- ADR-0001 — Adopt Operational Runtime Platform.
- Layer README: [`../../../runtime/README.md`](../../../runtime/README.md)
- Boundary tham chiếu: [`./20_INTEGRATION_BOUNDARY.md`](./20_INTEGRATION_BOUNDARY.md)
- Event detail: [`./40_EVENT_DRIVEN_RUNTIME.md`](./40_EVENT_DRIVEN_RUNTIME.md)
- Override detail: [`./50_HUMAN_OVERRIDE_POLICY.md`](./50_HUMAN_OVERRIDE_POLICY.md)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 3 — Initial canonical version.
```
