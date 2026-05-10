# ADR-0003 — Runtime-first Architecture

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
| **Related** | ADR-0001, ADR-0002, ADR-0004 |

---

## Context

Một hệ vận hành (operational system) có thể được tổ chức theo nhiều "first":

- **UI-first** — bắt đầu từ giao diện, logic nhúng trong handler UI.
- **DB-first** — bắt đầu từ schema, mọi thứ là CRUD.
- **Automation-first** — bắt đầu từ script, hệ gồm nhiều script chạy.
- **AI-first** — bắt đầu từ agent, AI quyết định flow.
- **Runtime-first** — bắt đầu từ runtime engine (command/event/state/audit/permission), mọi thứ khác bao quanh.

Với LAOCONG_VOS, chúng ta cần:

- Hệ chạy production-safe cho SMEs / HTX / fleet / logistics.
- Có audit nghiệp vụ chuẩn.
- Có human override luôn tồn tại.
- Có khả năng mở rộng L4-ready (multi-agent operational runtime).
- Có khả năng thay UI / thay DB / thay AI provider mà không phá business truth.

UI-first và DB-first dẫn tới logic rải rác. Automation-first dẫn tới
"script collection". AI-first dẫn tới "AI demo" và mất control.

---

## Decision

LAOCONG_VOS_PLATFORM áp dụng **Runtime-first Architecture**: Core Runtime là
trung tâm, mọi tầng khác (UI, services, integration, AI) đều **bao quanh** và
**phục vụ** runtime.

### Cụ thể

- `runtime/` chứa 6 engine: command / event / workflow / task / permission / audit.
- `services/api` chỉ là gateway nhận request → dispatch command vào runtime.
- `services/worker` chỉ là consumer queue → gọi handler runtime.
- `apps/*` chỉ render projection do runtime expose, gọi command qua SDK.
- `integrations/*` chỉ là adapter — gọi vào runtime hoặc nhận sự kiện ra ngoài.
- `services/ai-runtime` là **AI assist orchestrator** — KHÔNG quyết định runtime.

### Luồng chuẩn

```txt
action  →  command  →  validate  →  event  →  queue  →  handler
        →  state transition  →  projection  →  notification  →  audit
```

### Luồng cấm

```txt
- UI ghi thẳng DB (bypass runtime).
- Service tự sửa state ngoài command-engine.
- Adapter integration tự ghi state nghiệp vụ.
- AI provider tự cập nhật state.
- Cron job ghi DB không qua event-engine.
```

---

## Consequences

### Tích cực

- Source of truth duy nhất → audit dễ, debug dễ, observability đồng bộ.
- Có thể thay UI / DB / AI provider / messaging mà không sửa business truth.
- Dễ unit-test từng engine với Test Console offline.
- Mở cửa L4-ready: command tool-callable, capability-based, policy-aware.
- Human override gắn sẵn ở permission-engine.

### Tiêu cực / chi phí

- Chi phí ban đầu lớn — phải xây 6 engine trước khi có app dùng được.
- Đội dev phải nắm pattern CQRS / event sourcing nhẹ / state machine.
- Mỗi tính năng cần đi qua nhiều tầng → nhiều boilerplate (giải bằng `runtime-sdk` + `core-contracts`).

---

## Guardrails

```txt
G-1  Mọi business state PHẢI thuộc sở hữu runtime/.
G-2  Mọi mutation PHẢI đi qua command-engine.
G-3  Mọi event PHẢI append-only.
G-4  Mọi engine PHẢI có Test Console.
G-5  Service KHÔNG được tự sửa state nghiệp vụ.
G-6  UI KHÔNG được ghi thẳng DB.
G-7  Integration KHÔNG được giữ business truth (xem ADR-0002).
G-8  AI KHÔNG được quyết định runtime — chỉ assist (xem ADR-0005 cho human override).
G-9  Permission là capability-based, gắn vào permission-engine.
G-10 Audit nghiệp vụ là append-only, gắn vào audit-engine.
```

---

## References

- ADR-0001 — Adopt Operational Runtime Platform.
- ADR-0002 — Demote GAS/GWS to integration layer.
- ADR-0004 — Event-driven operational runtime.
- ADR-0005 — Human-override policy.
- [`../../../runtime/README.md`](../../../runtime/README.md)
- [`../../../docs/REPO_STRUCTURE.md`](../../../docs/REPO_STRUCTURE.md)
- [`../../../packages/README.md`](../../../packages/README.md) (test-console-kit, core-contracts, runtime-sdk)
