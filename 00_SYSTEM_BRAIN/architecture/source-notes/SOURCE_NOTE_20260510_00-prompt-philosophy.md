# Source Note: LAOCONG_VOS — Triết lý kiến trúc & Maturity Model (00_prompt)

- Source path: `.myNotes/00_prompt`
- Snapshot date: 2026-05-10
- Snapshot mode: COPY_ONLY
- Original preserved: YES
- Original format: Plain text (no extension) — 6863 bytes (398 lines)
- Phase: 002
- Turn: 2
- Importer: AI assistant (under user supervision)
- Notes: Non-destructive snapshot. Nội dung dưới đây sao y bản gốc — chỉ thêm metadata header và separator. Bản gốc `.myNotes/00_prompt` KHÔNG bị xoá / di chuyển / sửa. Append-only — KHÔNG sửa nội dung gốc trong file này.

---

Bạn đang tham gia thiết kế kiến trúc cho hệ:

# LAOCONG_VOS
(Vietnamese Operational System)

Một:
- Operational Workspace OS
- runtime-first operational platform
- human-guided AI-assisted operational system

Mục tiêu:
Xây hệ vận hành cho:
- SMEs
- HTX
- fleet/logistics
- field workforce
- invoice operation
- hồ sơ
- task
- service operation

==================================================
I. TRIẾT LÝ KIẾN TRÚC CỐT LÕI
==================================================

KHÔNG đi theo:
- AI-first
- automation-first
- autonomous-first

Mà đi theo:

Operational-runtime-first
+
Human-guided
+
AI-assisted
+
Append-only
+
Audit-first
+
Event-driven
+
Production-safe
+
Operational-first

Triết lý cuối cùng:

"LAOCONG_VOS không thay thế con người.
Nó giúp con người vận hành mạnh hơn
bằng runtime + automation + AI assistance."

==================================================
II. STACK GIAI ĐOẠN 1
==================================================

Sử dụng:

- Cursor Pro
- GitHub Free
- Vercel Free
- Supabase Free

Vai trò:

Cursor:
- AI operator-builder IDE
- codegen
- audit
- refactor
- repo understanding

GitHub:
- source of truth
- branching
- CI/CD
- rollback

Vercel:
- FE deployment
- preview env
- mobile webapp
- operational UI

Supabase:
- Postgres
- Auth
- Realtime
- Storage
- operational runtime backend

Google Workspace:
- support layer only
- Drive
- Gmail
- Docs
- report/export

==================================================
III. KIẾN TRÚC ĐÚNG CHO HỆ
==================================================

Frontend:
- React / Next.js
- Vercel deployment

Backend Runtime:
- Supabase

Core Runtime:
- Queue
- Event
- Command
- Projection
- Guidance Runtime
- Notification
- Audit
- Trace
- Policy
- Capability Runtime

Google Workspace:
- support layer
- not core runtime

==================================================
IV. MATURITY MODEL
==================================================

L0 — Manual Override
L1 — Guided Operation
L2 — Semi-auto Runtime
L3 — Agent-assisted Operation
L4 — Multi-agent Operational Runtime
L5 — Autonomous Operational Zones

==================================================
V. CÁCH KẾT HỢP LEVEL ĐÚNG
==================================================

KHÔNG thay thế level cũ.

Mà:

L0 + L1 + L2 + L3
cùng tồn tại.

Vai trò:

L0:
- human override
- fallback
- emergency
- exception handling

L1:
- guided UX
- next step
- focus mode
- operational guidance
- action dock
- trạng thái rõ ràng

L2:
- queue
- routing
- validation
- reminder
- SLA
- duplicate detection
- notification
- sync runtime

L3:
- AI summarize
- bottleneck detection
- AI operational insight
- suggest action
- suggest routing
- draft response
- stalled task detection

==================================================
VI. CHIẾN LƯỢC ĐÚNG
==================================================

RUN:
- L1
- L2
- một phần L3

NHƯNG:

ARCHITECT:
- L4-ready

GUARDRAIL:
- L5

Chiến lược đúng:

"Build for L2/L3
Architect for L4
Guardrail for L5"

==================================================
VII. L4-READY ARCHITECTURE
==================================================

Muốn mở cửa cho L4 thì hệ phải:

1. Event-driven
2. Queue-driven
3. Command-driven
4. State machine rõ ràng
5. Capability-based architecture
6. Append-only audit
7. Human override
8. Policy-aware runtime
9. Tool-callable runtime
10. Modular domain runtime

==================================================
VIII. COMMAND ARCHITECTURE
==================================================

Mọi hành động phải là command:

Ví dụ:

{
  "action": "TASK_ASSIGN",
  "payload": {
    "taskId": "TASK_001",
    "assignee": "USER_A"
  }
}

KHÔNG phụ thuộc UI click.

==================================================
IX. EVENT FLOW
==================================================

Đúng:

action
→ event
→ queue
→ handler
→ projection
→ notification

KHÔNG:
button → logic cứng → update DB trực tiếp

==================================================
X. STATE MACHINE
==================================================

TASK lifecycle ví dụ:

NEW
→ ACKNOWLEDGED
→ IN_PROGRESS
→ WAITING
→ REVIEW
→ DONE
→ CLOSED

State phải:
- rõ
- audit được
- transition-safe
- policy-safe

==================================================
XI. AUDIT & OBSERVABILITY
==================================================

Bắt buộc:

- traceId
- correlationId
- append-only
- event log
- status history
- audit trail
- runtime report
- health check
- self-test

==================================================
XII. HUMAN OVERRIDE
==================================================

Luôn tồn tại:

- stop
- rollback
- reject
- reassign
- override

Không được bỏ.

==================================================
XIII. AI TRIẾT LÝ ĐÚNG
==================================================

AI là:

Operational Assistant

KHÔNG phải:
- boss
- autonomous controller
- unrestricted agent

AI được:
- summarize
- suggest
- analyze
- detect
- draft
- recommend

==================================================
XIV. AUTONOMOUS ZONES (L5)
==================================================

Có thể tự trị:
- reminder
- summarize
- missing data detection
- lightweight routing
- SLA escalation
- queue balancing
- suggest assignment

Chưa nên tự trị:
- tài chính lớn
- pháp lý
- destructive actions
- quyền hệ thống
- invoice final approval

==================================================
XV. UI/UX ĐỊNH HƯỚNG
==================================================

Hướng:
guided-operation-first

UI phải:
- operational-first
- mobile-first
- focus mode
- next-step runtime
- minimal confusion
- trạng thái rõ ràng
- không bí ẩn
- không bắt user tự hiểu workflow

Tham khảo:
- Linear
- Lark
- Notion
- nhưng operational-first hơn

==================================================
XVI. ĐỊNH HƯỚNG DÀI HẠN
==================================================

LAOCONG_VOS hướng tới:

Operational Workspace OS

cho:
- SMEs
- cooperative
- logistics
- service network
- field operation
- Vietnamese operational reality

KHÔNG trở thành:
- AI demo
- chatbot wrapper
- automation script collection

Mà trở thành:

Human-guided
AI-assisted
Operational Runtime Platform
