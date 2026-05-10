# ADR-0005 — Human-override Policy

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
| **Related** | ADR-0001, ADR-0003, ADR-0004 |

---

## Context

LAOCONG_VOS được định vị là **human-guided + AI-assisted** Operational Runtime
Platform. Triết lý cuối cùng:

> "LAOCONG_VOS không thay thế con người.
> Nó giúp con người vận hành mạnh hơn bằng runtime + automation + AI assistance."

Một số rủi ro nếu thiếu human-override:

- Workflow tự động chạy sai → không có cách dừng.
- AI assist suggest sai nhưng được apply tự động → thiệt hại nghiệp vụ.
- Queue handler bị bug → tích luỹ side effect không hồi phục được.
- Integration external lỗi → message gửi liên tục, không tắt được.
- Permission engine cấp quyền sai → không có cách tạm thời thu hồi.

Hệ vận hành ở mức L1–L3 mà không có human-override = không production-safe.
Mở cửa L4–L5 mà không có human-override = nguy hiểm cho nghiệp vụ thật.

---

## Decision

LAOCONG_VOS_PLATFORM áp dụng **Human-override Policy** cứng — human
override **luôn tồn tại** trong mọi engine, service, integration và app:

### 5 quyền override bắt buộc tồn tại

```txt
1. STOP        — dừng workflow / handler / job đang chạy.
2. ROLLBACK    — quay lại state trước (qua compensation event, không xoá audit).
3. REJECT      — từ chối command/event đang chờ (kèm lý do, audit lại).
4. REASSIGN    — chuyển ownership task / approval cho người khác.
5. OVERRIDE    — vượt quy tắc bình thường (require role + audit nặng + reason).
```

### Áp dụng theo tầng

| Tầng | Quyền override |
|---|---|
| `runtime/command-engine` | reject command (per-command + per-tenant). |
| `runtime/event-engine` | pause/replay/skip event (manual operation, audit nặng). |
| `runtime/workflow-engine` | stop workflow instance, force transition (require override role). |
| `runtime/task-engine` | reassign owner, force close, manual state set (audit). |
| `runtime/permission-engine` | revoke capability, suspend user (auditable). |
| `runtime/audit-engine` | KHÔNG override — audit là append-only, KHÔNG xoá. |
| `services/worker` | pause/resume queue, drain queue, requeue. |
| `services/notification` | mute channel, mute recipient, dry-run mode. |
| `services/ai-runtime` | disable AI, downgrade to suggestion-only mode. |
| `integrations/*` | enable/disable adapter, dry-run mode, force timeout. |
| `apps/*` | UI button: cancel / undo / report-incident. |

### Yêu cầu chung cho mọi override

```txt
- Người override PHẢI được xác thực và có capability tương ứng.
- Mỗi override PHẢI tạo 1 event đặc biệt (vd. *_OVERRIDDEN_BY_HUMAN) trong event store.
- Mỗi override PHẢI ghi audit: who / when / what / why.
- Override KHÔNG được xoá lịch sử (xoá là cấm — chỉ "reverse" bằng compensation event).
```

---

## Consequences

### Tích cực

- Hệ luôn có lối thoát khi automation/AI/integration sai.
- Xây được niềm tin với người vận hành thật (không sợ "AI tự quyết").
- Mở cửa L4 (multi-agent) một cách an toàn — agent có thể bị stop/override bất cứ lúc nào.
- Audit override → biết được pattern lỗi tái diễn để cải tiến runtime.

### Tiêu cực / chi phí

- Mỗi engine phải design override pathway từ đầu (không thể "thêm sau").
- UI phải có nút override rõ ràng cho mỗi tầng — tăng UI complexity.
- Phải định nghĩa role / capability cho người được phép override (ai được STOP, ai được OVERRIDE).
- Phải training team vận hành về cách dùng override (dùng sai = audit ghi nhớ).

---

## Guardrails

```txt
G-1  KHÔNG bỏ human override ở bất kỳ engine/service/integration nào.
G-2  Override PHẢI đi qua command + tạo event đặc biệt — KHÔNG sửa state thẳng.
G-3  Override PHẢI có audit (who/when/what/why).
G-4  Audit log KHÔNG bao giờ bị override (append-only tuyệt đối).
G-5  AI / agent KHÔNG được tự override.
G-6  AI / agent KHÔNG được tắt human-override pathway.
G-7  Mọi UI vận hành PHẢI có nút stop/cancel/undo trong tầm với của user.
G-8  Mọi adapter integration PHẢI có "kill switch" tắt được từ runtime.
G-9  Override role là role riêng, audit nặng, KHÔNG phải role thường.
G-10 Tài liệu runbook (00_SYSTEM_BRAIN/runbooks/) PHẢI có hướng dẫn override
     cho mọi tình huống production phổ biến.
```

---

## References

- ADR-0001 — Adopt Operational Runtime Platform.
- ADR-0003 — Runtime-first architecture.
- ADR-0004 — Event-driven operational runtime.
- [`../../../runtime/README.md`](../../../runtime/README.md)
- [`../../../.cursor/rules/laocong-vos-platform.md`](../../../.cursor/rules/laocong-vos-platform.md)
- [`../../../docs/INTEGRATION_BOUNDARY.md`](../../../docs/INTEGRATION_BOUNDARY.md)
- [`../../runbooks/`](../../runbooks/) (runbook override sẽ được viết ở phase tương lai)
