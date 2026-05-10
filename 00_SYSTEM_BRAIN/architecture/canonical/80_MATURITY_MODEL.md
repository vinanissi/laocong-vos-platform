# 80 — Maturity Model

## Status
Draft Canonical

## Purpose

Định nghĩa **Maturity Model L0–L5** của LAOCONG_VOS_PLATFORM, và chiến lược
"Build for L2/L3, Architect for L4, Guardrail for L5".

Tài liệu này khoá rõ:

- Mỗi level làm gì.
- Các level **cùng tồn tại** (không thay thế nhau).
- 10 yêu cầu kiến trúc để mở cửa cho L4.
- Ranh giới L5 (autonomous zones nào cho phép, không cho phép).

---

## Core Principles

```txt
1. Level cao KHÔNG thay thế level thấp — các level CÙNG TỒN TẠI.
2. Build for L2/L3 — chạy production hôm nay ở L1–L3.
3. Architect for L4 — kiến trúc đã sẵn sàng cho multi-agent runtime.
4. Guardrail for L5 — autonomous zones có rule + audit + kill switch.
5. Human override luôn tồn tại ở mọi level.
```

---

## Maturity levels

| Level | Tên | Mô tả ngắn |
|---|---|---|
| **L0** | Manual Override | Con người làm tất cả; hệ chỉ là sổ sách / lưu trữ. Có lối thoát thủ công cho mọi tình huống. |
| **L1** | Guided Operation | Hệ dẫn người vận hành: next-step, focus mode, action dock, trạng thái rõ ràng. |
| **L2** | Semi-auto Runtime | Hệ tự xử lý queue, routing, validation, reminder, SLA, duplicate detection, notification, sync. |
| **L3** | Agent-assisted Operation | AI assist: summarize, bottleneck detection, suggest action, suggest routing, draft response, stalled task detection. |
| **L4** | Multi-agent Operational Runtime | Nhiều agent cùng làm việc trong runtime (capability-based, tool-callable, policy-aware). |
| **L5** | Autonomous Operational Zones | Một số tác vụ tự trị hẳn (có rule + audit + kill switch). |

---

## Co-existence — các level cùng tồn tại

```txt
L0 + L1 + L2 + L3
cùng tồn tại trong cùng 1 hệ.

Mỗi level có vai trò:

L0  → human override / fallback / emergency / exception handling
L1  → guided UX / next step / focus mode / operational guidance / action dock
L2  → queue / routing / validation / reminder / SLA / duplicate detection / notification / sync
L3  → AI summarize / bottleneck detection / AI insight / suggest / draft / stalled detection
```

L4 và L5 là **kiến trúc cho phép**, không phải mặc định bật:

```txt
L4 = architecture-ready (có capability map, tool-callable runtime, policy-aware)
L5 = guardrailed autonomous zones (có rule cứng + audit + kill switch)
```

---

## Strategy: "Build for L2/L3, Architect for L4, Guardrail for L5"

```txt
RUN  : L1 + L2 + một phần L3
       — chạy production hôm nay với guidance + automation + AI assist nhẹ.

ARCH : L4-ready
       — runtime đã viết theo pattern command/event/state/capability để
         multi-agent có thể plug-in mà không phải refactor lớn.

GUARD: L5
       — autonomous zones có rule cứng + audit nặng + kill switch trước khi enable.
```

---

## L4-ready architecture — 10 yêu cầu

Để mở cửa cho L4 (multi-agent operational runtime), hệ PHẢI có:

```txt
 1. Event-driven                — mọi mutation đi qua event store.
 2. Queue-driven                — handler async qua queue, retry/backoff/DLQ.
 3. Command-driven              — mọi action là command có schema versioned.
 4. State machine rõ ràng       — mỗi domain object có lifecycle xác định.
 5. Capability-based            — quyền là capability, không phải role cứng.
 6. Append-only audit           — audit/event không update/delete.
 7. Human override              — mọi engine có pathway override.
 8. Policy-aware runtime        — runtime biết policy gì áp dụng cho command nào.
 9. Tool-callable runtime       — command + event expose qua tool contract chuẩn cho agent.
10. Modular domain runtime      — mỗi domain (task, invoice, hồ sơ, ...) là module độc lập.
```

10 điều này được phản ánh trong 6 engine của `runtime/` + `packages/core-contracts`.
Chi tiết: xem [`./10_RUNTIME_FIRST_ARCHITECTURE.md`](./10_RUNTIME_FIRST_ARCHITECTURE.md)
và [`./40_EVENT_DRIVEN_RUNTIME.md`](./40_EVENT_DRIVEN_RUNTIME.md).

---

## L5 — Autonomous Operational Zones

L5 = một số tác vụ được phép **tự trị** mà không cần human confirm từng bước.

Tác vụ **được phép** tự trị (kèm guardrail):

```txt
✅ Reminder            : nhắc lịch / SLA / handoff.
✅ Summarize           : tự sinh tóm tắt cuối ngày / cuối case.
✅ Missing data detection: phát hiện hồ sơ thiếu thông tin.
✅ Lightweight routing : route case nhỏ theo policy đã định.
✅ SLA escalation      : escalate khi quá hạn theo rule.
✅ Queue balancing     : đề xuất / cân bằng queue.
✅ Suggest assignment  : gợi ý người phù hợp.
```

Tác vụ **KHÔNG được** tự trị (kể cả ở L5):

```txt
❌ Tài chính lớn         : duyệt thanh toán, refund > ngưỡng.
❌ Pháp lý               : ký, từ chối quyền, gửi văn bản pháp lý.
❌ Destructive actions   : xoá hồ sơ, đóng vĩnh viễn, huỷ contract.
❌ Quyền hệ thống        : cấp/thu role, phân quyền tenant.
❌ Invoice final approval: duyệt cuối hoá đơn.
```

L5 yêu cầu cứng trước khi enable:

```txt
1. Có rule cứng cho từng autonomous zone (whitelist/blacklist).
2. Có audit nặng (mỗi action tự trị tạo event riêng có flag AUTONOMOUS).
3. Có kill switch (disable autonomous zone tức thì từ runtime).
4. Có policy-aware runtime kiểm scope mỗi action tự trị.
5. Có dashboard observe mọi action tự trị (cho supervisor).
```

---

## Maturity per layer (gợi ý)

| Layer | Trạng thái mặc định giai đoạn 1 |
|---|---|
| `apps/` | L1 (guided UX) |
| `services/api` | L2 (validation + routing) |
| `services/worker` | L2 (queue + retry + SLA) |
| `services/notification` | L2 |
| `services/ai-runtime` | L3 (assist only — KHÔNG L4 default) |
| `runtime/*` | L0-ready (override) + L2 (semi-auto) + architect L4 |
| `integrations/*` | L1 (manual trigger phổ biến) + L2 cho sync định kỳ |
| `permission-engine` | L0 (override role) + L2 (capability check) |
| `audit-engine` | L0 (append-only, không bao giờ tự trị) |

---

## Anti-patterns (CẤM)

```txt
❌ Triển khai L3+ mà chưa có L0 (override) đầy đủ.
❌ Triển khai L5 cho tài chính / pháp lý / destructive.
❌ AI agent loop tự trị không có người ở giữa.
❌ "L4 demo" production với capability mở rộng quá scope.
❌ Đẩy maturity lên cao "vì sponsor muốn AI".
❌ Tắt L0 để "tăng efficiency".
❌ Gộp autonomous zones vào role thường (phải role riêng).
```

---

## Guardrails

```txt
G-1  L0 (manual override) PHẢI tồn tại ở mọi engine/service/integration.
G-2  L1+ KHÔNG được loại bỏ L0.
G-3  L3 (AI assist) KHÔNG được tự dispatch command nghiệp vụ.
G-4  L4 (multi-agent) KHÔNG enable production khi chưa có capability map.
G-5  L5 (autonomous zones) KHÔNG enable cho tài chính lớn / pháp lý / destructive / quyền hệ thống / invoice final approval.
G-6  Mỗi autonomous action tạo event với flag AUTONOMOUS + audit nặng.
G-7  Mỗi autonomous zone có kill switch.
G-8  Mỗi autonomous zone có policy boundary rõ ràng.
G-9  Maturity levels CÙNG TỒN TẠI — KHÔNG thay thế level thấp.
G-10 KHÔNG ép maturity cao hơn năng lực vận hành thực.
```

---

## Non-goals

```txt
- Không "single-level system" (chỉ L3, không L0).
- Không skip L1/L2 để nhảy thẳng L4 / L5.
- Không "AI tự tăng level" của chính nó.
- Không tự động enable autonomous zones (phải human bật, có audit).
- Không triển khai L4/L5 trên dữ liệu thật trước khi có dashboard observe.
```

---

## References

- Source: [`../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md`](../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md) (sec IV — Maturity model; sec V — Cách kết hợp level đúng; sec VI — Chiến lược đúng; sec VII — L4-ready architecture; sec XIV — Autonomous zones)
- ADR-0003 — Runtime-first architecture.
- ADR-0004 — Event-driven Operational Runtime.
- ADR-0005 — Human-override Policy.
- Override detail: [`./50_HUMAN_OVERRIDE_POLICY.md`](./50_HUMAN_OVERRIDE_POLICY.md)
- AI policy: [`./60_AI_ASSISTED_OPERATION.md`](./60_AI_ASSISTED_OPERATION.md)
- Runtime: [`./10_RUNTIME_FIRST_ARCHITECTURE.md`](./10_RUNTIME_FIRST_ARCHITECTURE.md)
- Event runtime: [`./40_EVENT_DRIVEN_RUNTIME.md`](./40_EVENT_DRIVEN_RUNTIME.md)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 3 — Initial canonical version.
```
