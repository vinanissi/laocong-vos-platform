# ADR-0001 — Adopt Operational Runtime Platform

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

---

## Context

Trong bản gốc, `LAOCONG_VOS` được hình dung như một hệ
**Google Sheet + Google Apps Script (GAS)** làm trung tâm vận hành: business
logic chạy trên GAS, sheet là state store, GWS là môi trường chính.

Mô hình này có những giới hạn nghiêm trọng cho một hệ vận hành nghiệp vụ ở
quy mô SME / HTX / fleet / logistics:

- GAS không phải runtime production-grade (giới hạn quota, thời gian thực thi, queue).
- Sheet không phải state store đáng tin (không transaction nghiêm túc, không RLS đầy đủ).
- Không event-driven, không command-driven, không capability-based.
- Không append-only audit nghiệp vụ chuẩn.
- Khó scale, khó test, khó observe, khó human-override an toàn.

Cùng lúc, định hướng dài hạn của hệ là:

```txt
Operational Workspace OS
+ Human-guided
+ AI-assisted
+ Event-driven
+ Audit-first
+ Production-safe
```

→ Cần một kiến trúc khác để vừa **chạy được hôm nay (L1–L3)** vừa
**mở cửa cho L4 (multi-agent)** và **guardrail cho L5 (autonomous zones)**.

---

## Decision

LAOCONG_VOS được **định vị lại** là **Operational Runtime Platform** —
một runtime-first platform có lõi vận hành riêng (Core Runtime), trong đó:

- Core Runtime sở hữu: workflow / runtime / state / audit / event / permission / contract.
- Integration sở hữu: bridge / sync / import-export / notification / external API.
- Google Workspace / Apps Script chuyển vai trò thành **integration support layer**, **không** còn là core.

Cấu trúc repo (chuẩn hoá ở Phase 001) phản ánh quyết định này:

```txt
runtime/        ← Core Runtime (6 engine)
services/       ← Backend services bao quanh runtime
apps/           ← UI layer
database/       ← Supabase / Postgres
packages/       ← Shared contracts + SDK
integrations/   ← External capability layer (bao gồm gas-support, google-workspace)
```

---

## Consequences

### Tích cực

- Có ranh giới cứng giữa core và integration → dễ refactor, dễ test, dễ scale.
- Có thể thay AI provider, sheet, gas, lark, telegram… mà không đụng business truth.
- Mở cửa cho L4-ready architecture (event-driven, queue-driven, capability-based).
- Audit/permission được tập trung ở runtime → giảm rủi ro production.

### Tiêu cực / chi phí

- Phải xây Core Runtime riêng (6 engine) — chi phí lớn ban đầu so với "viết script GAS".
- Phải có hạ tầng (Supabase, Vercel, queue) thay vì chỉ dựa GWS free.
- Phải có quy trình PR + test console + report cho mỗi engine/module.
- Đội dev phải hiểu event/command/state machine — đường cong học tập cao hơn.

---

## Guardrails

```txt
G-1  KHÔNG cho integration giữ business truth.
G-2  KHÔNG cho Apps Script trở lại làm core runtime.
G-3  KHÔNG bypass command-engine để ghi state.
G-4  KHÔNG bỏ human override.
G-5  KHÔNG bỏ append-only audit.
G-6  KHÔNG để AI tự quyết định runtime — AI chỉ assist.
G-7  Mỗi quyết định kiến trúc lớn PHẢI có ADR.
G-8  Mỗi engine/module PHẢI có Test Console trước khi merge.
```

---

## References

- [`../../README.md`](../../README.md)  *(file này)*… → root README:
  [`../../../README.md`](../../../README.md)
- [`../../../docs/REPO_STRUCTURE.md`](../../../docs/REPO_STRUCTURE.md)
- [`../../../docs/INTEGRATION_BOUNDARY.md`](../../../docs/INTEGRATION_BOUNDARY.md)
- [`../../../.cursor/rules/laocong-vos-platform.md`](../../../.cursor/rules/laocong-vos-platform.md)
- ADR-0002 — Demote GAS / GWS to integration layer.
- ADR-0003 — Runtime-first architecture.
- ADR-0004 — Event-driven operational runtime.
- ADR-0005 — Human-override policy.
- Phase 001 IMPLEMENTATION_REPORT:
  [`../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/IMPLEMENTATION_REPORT.md`](../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/IMPLEMENTATION_REPORT.md)
