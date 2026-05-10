# 00 — Platform Overview

## Status
Draft Canonical

## Purpose

Định vị chính thức **LAOCONG_VOS_PLATFORM** (Vietnamese Operational System):

- Một **Operational Runtime Platform** / **Operational Workspace OS**.
- Phục vụ vận hành nghiệp vụ thực cho SMEs, HTX, fleet/logistics, field workforce, invoice operation, hồ sơ, task, service operation.
- Lõi vận hành (Core Runtime) là **độc lập** — không phụ thuộc Google Sheet hay Apps Script.
- Google Workspace / Apps Script là **integration support layer**, không phải core.

LAOCONG_VOS_PLATFORM **không phải**:

- Hệ Google Sheet + Apps Script làm trung tâm.
- AI demo / chatbot wrapper.
- Automation script collection.
- Hệ "AI tự quyết định runtime".

LAOCONG_VOS_PLATFORM **là**:

```txt
Operational Runtime Platform
+ Human-guided
+ AI-assisted
+ Append-only
+ Audit-first
+ Event-driven
+ Production-safe
+ Operational-first
```

Triết lý cuối cùng:

> "LAOCONG_VOS không thay thế con người.
> Nó giúp con người vận hành mạnh hơn
> bằng runtime + automation + AI assistance."

---

## Core Principles

| # | Principle | Ý nghĩa |
|---|---|---|
| 1 | **Operational-runtime-first** | Lõi vận hành là tâm; UI, services, integration, AI bao quanh. |
| 2 | **Human-guided** | Con người luôn chỉ huy. Hệ chỉ "guided / assisted", không "autonomous controller". |
| 3 | **AI-assisted** | AI là Operational Assistant (summarize / suggest / detect / draft / recommend). KHÔNG quyết định runtime. |
| 4 | **Append-only** | Audit, event, decision log đều append-only. Lịch sử không bị viết lại. |
| 5 | **Audit-first** | Mọi mutation có traceId + correlationId, có audit trail truy nguyên được. |
| 6 | **Event-driven** | Hành động → command → event → queue → handler → projection → notification → audit. |
| 7 | **Production-safe** | Không destructive migration; không bypass runtime; có human override; có rollback. |
| 8 | **Operational-first** | Ưu tiên người vận hành thật, không ưu tiên kỹ thuật phô diễn hay UI bóng bẩy. |

---

## Architecture (high-level layered view)

```txt
┌─────────────────────────────────────────────────────────────┐
│                       apps/  (UI layer)                     │
│         admin-web · staff-web · member-web · public-web     │
└──────────────────────────┬──────────────────────────────────┘
                           │ command / projection
                           ▼
┌─────────────────────────────────────────────────────────────┐
│   services/  (api · worker · ai-runtime · notification ·    │
│              auth)  — vận chuyển, KHÔNG sở hữu nghiệp vụ    │
└──────────────────────────┬──────────────────────────────────┘
                           │ command-engine dispatch
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      runtime/  (CORE)                        │
│  command-engine · event-engine · workflow-engine ·          │
│  task-engine · permission-engine · audit-engine             │
│                                                              │
│  ⇒ Independent operational brain (sở hữu business truth)    │
└─────┬──────────────────────────────────────────────┬────────┘
      │ projection / event                          │ event
      ▼                                              ▼
┌─────────────────┐                   ┌──────────────────────┐
│  database/      │                   │  integrations/       │
│  Supabase       │                   │  gas-support ·       │
│  Postgres       │                   │  google-workspace ·  │
│  RLS · audit    │                   │  lark · telegram ·   │
│  event_store    │                   │  zalo · misa ·       │
│                 │                   │  openai · gemini ·   │
└─────────────────┘                   │  anthropic · email · │
                                      │  payment · maps ·    │
                                      │  storage · ocr       │
                                      │                      │
                                      │ ⇒ external capability│
                                      │   (KHÔNG giữ truth)  │
                                      └──────────────────────┘
```

---

## Vision — Operational Workspace OS

| Giai đoạn | Định vị |
|---|---|
| Đầu | Core = GAS + Sheet (đã rời) |
| Giữa | Core = Runtime riêng; GAS = integration adapter |
| Cao hơn | Operational Workspace OS |
| Rất cao | Platform-based Operational Runtime |

Hướng đến:

```txt
Operational Workspace OS
cho:
- SMEs
- cooperative (HTX)
- logistics
- service network
- field operation
- Vietnamese operational reality
```

---

## Independent Operational Brain

Core Runtime là "bộ não vận hành độc lập":

```txt
Core Runtime
= independent operational brain

Integrations
= external capability layer
```

Đặc tính bắt buộc:

- **Self-contained**: chạy được không cần GWS/GAS.
- **Authoritative**: là source of truth duy nhất cho workflow / state / audit.
- **Replaceable peripherals**: UI, AI, integration, messaging có thể thay mà không phá truth.
- **Observable**: traceId, correlationId, audit log, event log, runtime report, health check, self-test.

---

## Append-only Governance

| Đối tượng | Quy tắc append-only |
|---|---|
| Event store | Không update / không delete event. Replay được. |
| Audit log | Không update / không delete. Override cũng tạo event mới (audit nặng). |
| Migration DB | Một chiều, không sửa migration đã merge. |
| Tài liệu kiến trúc | Sửa qua revision (thêm), không xoá nội dung cũ. |
| ADR | Không sửa ADR đã Accepted; chỉ tạo ADR mới supersedes. |
| Phase report | Mỗi phase có folder riêng, không xoá phase cũ. |
| Source notes | Snapshot không sửa; nếu nguồn đổi thì tạo snapshot mới với date mới. |

---

## Guardrails

```txt
G-1   Không quay lại pattern "GAS-as-core".
G-2   Không cho integration giữ business truth.
G-3   Không bypass command-engine để ghi state.
G-4   Không bỏ human override.
G-5   Không bỏ append-only audit.
G-6   Không cho AI tự quyết định runtime.
G-7   Mọi quyết định kiến trúc lớn PHẢI có ADR.
G-8   Mọi engine/module PHẢI có Test Console trước khi merge.
G-9   Không destructive migration.
G-10  Không deploy / push khi chưa có TEST_REPORT đạt.
```

---

## Non-goals

```txt
- Không AI-first.
- Không automation-first.
- Không autonomous-first (ở giai đoạn 1).
- Không replace human.
- Không "AI tự duyệt nghiệp vụ tài chính / pháp lý".
- Không "1 script GAS làm tất cả".
- Không UI-first thay vì runtime-first.
- Không marketing wording, không AI hype.
```

---

## References

- Source: [`../source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md`](../source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md) (sec 1, 2, 10, 11)
- Source: [`../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md`](../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md) (sec I, XVI)
- ADR-0001 — Adopt Operational Runtime Platform.
- ADR-0002 — Demote GAS / GWS to integration layer.
- ADR-0003 — Runtime-first architecture.
- Repo overview: [`../../../README.md`](../../../README.md)
- Repo structure: [`../../../docs/REPO_STRUCTURE.md`](../../../docs/REPO_STRUCTURE.md)
- Phase 001 report: [`../../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/`](../../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/)
- Diagram (layered architecture · 6 layers + governance): [`./diagrams/layered-architecture.mmd`](./diagrams/layered-architecture.mmd)
- Diagrams folder README: [`./diagrams/README.md`](./diagrams/README.md)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 3 — Initial canonical version (AI-drafted under user supervision).
```
