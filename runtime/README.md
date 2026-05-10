# runtime/ — Core Runtime

> **Lõi vận hành (operational brain) của LAOCONG_VOS_PLATFORM.**
> Đây là nơi duy nhất giữ business truth, trạng thái, audit và quyền của hệ.

---

## 1. Vai trò

`runtime/` là **Core Runtime** — independent operational brain.

Mọi hành động trong hệ đều phải:

```txt
action  →  command  →  event  →  queue  →  handler  →  projection  →  notification  →  audit
```

Không cho phép UI hay integration "cắm thẳng" vào DB hoặc bypass workflow.

---

## 2. Module thuộc Core Runtime

| Folder | Vai trò |
|---|---|
| `command-engine/` | Nhận lệnh (CommandBus). Validate, audit, dispatch. |
| `event-engine/` | Phát/handle event nội bộ. Append-only event store. |
| `workflow-engine/` | State machine & workflow definition runtime. |
| `task-engine/` | Lifecycle task: NEW → ACK → IN_PROGRESS → WAITING → REVIEW → DONE → CLOSED. |
| `permission-engine/` | Capability-based permission, policy-aware runtime. |
| `audit-engine/` | Append-only audit trail, traceId, correlationId, runtime report. |

---

## 3. Core Runtime sở hữu

```txt
- workflow
- runtime
- state
- audit
- event
- permission
- contract
```

## 4. Core Runtime KHÔNG sở hữu

```txt
- bridge tới hệ ngoài         → integrations/
- sync sheet / form           → integrations/google-workspace/, integrations/gas-support/
- gửi notification ra ngoài   → integrations/email|telegram|zalo|lark/
- gọi AI provider             → integrations/openai|gemini|anthropic/
- file storage external       → integrations/storage/
```

---

## 5. Nguyên tắc bắt buộc

```txt
1. Append-only
2. Event-driven
3. Queue-driven
4. Command-driven
5. State machine rõ ràng
6. Capability-based
7. Audit-first
8. Human override luôn tồn tại
9. Production-safe
10. AI-assisted, KHÔNG AI-controlled
```

---

## 6. Test Console Standard

Mỗi engine bắt buộc có **Test Console** trước khi ghép vào hệ:

- Mock command in
- Quan sát event out
- Quan sát state transition
- Quan sát audit log
- Validate policy/permission

Test console kit dùng chung: `packages/test-console-kit/`.

---

## 7. Trạng thái hiện tại

Tất cả 6 engine đang ở dạng **placeholder folder**. Chưa có code.
Implementation sẽ bắt đầu từ Phase 002+.
