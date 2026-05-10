# 50 — Human Override Policy

## Status
Draft Canonical

## Purpose

Định nghĩa chính sách **Human Override** cứng cho LAOCONG_VOS_PLATFORM.

LAOCONG_VOS được thiết kế để **human-guided + AI-assisted**, nghĩa là **con
người luôn có lối thoát** trong mọi engine, service, integration và app.
Hệ vận hành mà thiếu human override = không production-safe; mở cửa L4–L5 mà
thiếu human override = nguy hiểm cho nghiệp vụ thật.

---

## Core Principles

```txt
1. Human override LUÔN tồn tại — không bao giờ bị remove.
2. Override đi qua command-engine (không sửa state thẳng).
3. Override tạo event riêng (vd. *_OVERRIDDEN_BY_HUMAN).
4. Override có audit nặng (who / when / what / why).
5. Override KHÔNG xoá lịch sử — chỉ "reverse" qua compensation event.
6. AI / agent KHÔNG được tự override.
7. AI / agent KHÔNG được tắt human-override pathway.
```

---

## 5 quyền override bắt buộc

| # | Quyền | Ý nghĩa | Ví dụ |
|---|---|---|---|
| 1 | **STOP** | Dừng workflow / handler / job đang chạy | Pause queue handler đang loop sai |
| 2 | **ROLLBACK** | Quay lại state trước qua compensation event (KHÔNG xoá audit) | Đảo ngược TASK_ASSIGN sai người |
| 3 | **REJECT** | Từ chối command / event đang chờ (kèm lý do, audit) | Reject duyệt hồ sơ ở bước review |
| 4 | **REASSIGN** | Chuyển ownership task / approval cho người khác | Reassign khi owner nghỉ phép |
| 5 | **OVERRIDE** | Vượt rule bình thường (require role + audit nặng + reason) | Bypass SLA escalation cho case khẩn cấp |

---

## Áp dụng theo tầng

| Tầng | Override pathway | Audit requirement |
|---|---|---|
| `runtime/command-engine` | reject command (per-command + per-tenant) | event `<COMMAND>_REJECTED_BY_HUMAN` |
| `runtime/event-engine` | pause / replay / skip event (manual) | event `EVENT_<id>_SKIPPED_BY_HUMAN` |
| `runtime/workflow-engine` | stop workflow instance, force transition (require override role) | event `WORKFLOW_<id>_FORCED_TRANSITION` |
| `runtime/task-engine` | reassign owner, force close, manual state set | event `TASK_<id>_OVERRIDDEN` |
| `runtime/permission-engine` | revoke capability, suspend user | event `CAPABILITY_REVOKED_BY_HUMAN` |
| `runtime/audit-engine` | **KHÔNG override** — audit là append-only tuyệt đối | — |
| `services/worker` | pause/resume queue, drain queue, requeue | event `QUEUE_<name>_PAUSED_BY_HUMAN` |
| `services/notification` | mute channel / mute recipient / dry-run mode | event `NOTIFICATION_<id>_MUTED_BY_HUMAN` |
| `services/ai-runtime` | disable AI, downgrade to suggestion-only | event `AI_RUNTIME_DOWNGRADED_BY_HUMAN` |
| `integrations/*` | enable/disable adapter, dry-run, force timeout | event `INTEGRATION_<name>_DISABLED_BY_HUMAN` |
| `apps/*` | UI button: cancel / undo / report-incident | dispatch command tương ứng |

---

## Yêu cầu chung cho mọi override

```txt
1. Người override PHẢI được xác thực (auth) và có capability tương ứng.
2. Mỗi override PHẢI tạo 1 event đặc biệt trong event store.
3. Mỗi override PHẢI ghi audit: who / when / what / why.
4. Mỗi override PHẢI có "reason" string (ngắn — bắt buộc; dài — nếu OVERRIDE).
5. Override KHÔNG được xoá lịch sử (xoá là CẤM).
6. Mỗi override có thể được "reverse" lại bằng compensation event mới.
7. Override role là role riêng — KHÔNG phải role thường.
8. UI override PHẢI có confirm dialog (chống misclick).
9. UI override OVERRIDE (vượt rule) PHẢI có 2-step confirm + ghi reason.
```

---

## Override role (gợi ý)

| Role | Quyền override |
|---|---|
| `OPERATOR` | STOP cho task của chính mình; REJECT input của chính mình |
| `SUPERVISOR` | STOP / REJECT / REASSIGN trong tenant; ROLLBACK với reason |
| `TENANT_ADMIN` | tất cả override trong tenant; OVERRIDE với 2-step confirm |
| `SYSTEM_ADMIN` | override cross-tenant trong khẩn cấp; audit cao nhất |
| `AI_RUNTIME` | **KHÔNG** có quyền override |

> Role thực tế sẽ được định nghĩa chính thức ở phase scaffold `permission-engine`.
> Bảng trên là gợi ý không phải nghiệp vụ chốt.

---

## Anti-patterns (CẤM)

```txt
❌ Override bằng cách sửa DB trực tiếp (bypass command-engine).
❌ Override KHÔNG có audit / KHÔNG có event.
❌ Override mà không có reason.
❌ Override audit log (audit log là append-only tuyệt đối).
❌ AI / agent tự override không qua human.
❌ AI / agent tắt human-override pathway "vì nó cản efficiency".
❌ UI ẩn nút override để "user khỏi nhầm".
❌ Override role gộp chung với role thường.
```

---

## Runbook responsibility

Mọi tình huống production phổ biến PHẢI có runbook trong
`00_SYSTEM_BRAIN/runbooks/` mô tả:

```txt
- Triệu chứng nhận biết.
- Override pathway nào áp dụng.
- Lệnh / nút bấm nào để thực thi.
- Reason mẫu để ghi audit.
- Side effect cần kiểm tra sau khi override.
- Cách reverse nếu override sai.
```

(Runbook chi tiết sẽ được viết ở phase tương lai. Phase 002 chỉ định nghĩa policy.)

---

## Guardrails

```txt
G-1  KHÔNG bỏ human override ở bất kỳ engine/service/integration nào.
G-2  Override PHẢI đi qua command-engine + tạo event riêng.
G-3  Override PHẢI có audit (who/when/what/why).
G-4  Audit log KHÔNG bao giờ bị override (append-only tuyệt đối).
G-5  AI / agent KHÔNG được tự override.
G-6  AI / agent KHÔNG được tắt human-override pathway.
G-7  Mọi UI vận hành PHẢI có nút stop/cancel/undo trong tầm tay.
G-8  Mọi adapter integration PHẢI có "kill switch" tắt được từ runtime.
G-9  Override role là role riêng, audit nặng.
G-10 Mọi tình huống production phổ biến PHẢI có runbook override.
```

---

## Non-goals

```txt
- Không "auto-override AI" (AI tự xin quyền override).
- Không gộp override role vào role thường để tiện UX.
- Không cho phép override audit log "vì gõ nhầm".
- Không "soft-delete" event đã phát (chỉ compensation event).
- Không yêu cầu tất cả override phải qua approval chain — phải có path khẩn cấp.
```

---

## References

- Source: [`../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md`](../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md) (sec XII — Human override; sec XIV — Autonomous zones)
- ADR-0005 — Human-override Policy.
- ADR-0003 — Runtime-first architecture.
- ADR-0004 — Event-driven Operational Runtime.
- Runtime detail: [`./10_RUNTIME_FIRST_ARCHITECTURE.md`](./10_RUNTIME_FIRST_ARCHITECTURE.md)
- Event detail: [`./40_EVENT_DRIVEN_RUNTIME.md`](./40_EVENT_DRIVEN_RUNTIME.md)
- AI detail: [`./60_AI_ASSISTED_OPERATION.md`](./60_AI_ASSISTED_OPERATION.md)
- Layer README: [`../../../runtime/README.md`](../../../runtime/README.md)
- Cursor rule: [`../../../.cursor/rules/laocong-vos-platform.md`](../../../.cursor/rules/laocong-vos-platform.md)
- Runbook folder (sẽ populate sau): [`../../runbooks/`](../../runbooks/)
- Diagram (TASK state machine + override transitions): [`./diagrams/task-state-machine.mmd`](./diagrams/task-state-machine.mmd)
- Diagrams folder README: [`./diagrams/README.md`](./diagrams/README.md)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 3 — Initial canonical version.
```
