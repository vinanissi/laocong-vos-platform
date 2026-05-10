# Architecture Decision Records

> Index chính thức của các Architecture Decision Records (ADR) trong
> LAOCONG_VOS_PLATFORM.

---

## Purpose

ADR là **nơi lưu quyết định kiến trúc chính thức** của LAOCONG_VOS_PLATFORM.

Mỗi ADR ghi lại:

- **Context** — bối cảnh / vấn đề / áp lực dẫn tới quyết định.
- **Decision** — quyết định đã chọn.
- **Consequences** — hệ quả tích cực / tiêu cực / trade-offs.
- **Guardrails** — ràng buộc cứng phải tuân.
- **Status lifecycle** — Draft → Accepted → (Superseded | Rejected).

ADR là **strategic law** của repository:

```txt
ADR Accepted   = luật kiến trúc — runtime implementation PHẢI tuân.
Canonical docs = living doctrine — diễn giải + chi tiết hoá ADR.
Source notes   = snapshot nguồn — KHÔNG sửa, để truy nguyên.
Phase reports  = nhật ký triển khai — append-only theo phase.
```

---

## ADR Lifecycle

| Status | Ý nghĩa |
|---|---|
| **Draft** | Đang soạn, chưa được user duyệt. KHÔNG ràng buộc implementation. |
| **Accepted** | Đã được user duyệt. **Ràng buộc** implementation. KHÔNG sửa nội dung Decision sau khi Accepted (sửa = tạo ADR mới supersedes). |
| **Superseded** | Đã bị thay thế bởi ADR mới hơn. Vẫn giữ trong repo (append-only). Có field "Superseded by". |
| **Rejected** | Đã được đánh giá nhưng không được chọn. Vẫn giữ để audit lịch sử quyết định. |

Quy tắc lifecycle:

```txt
1. ADR mới tạo  → Status: Draft.
2. User duyệt   → Status: Accepted (thêm Accepted by + Accepted at).
3. Quyết định đổi → KHÔNG sửa ADR cũ. Tạo ADR mới supersedes ADR cũ.
4. ADR cũ       → Status: Superseded + Superseded by: ADR-XXXX.
5. ADR đề xuất nhưng user không chọn → Status: Rejected (giữ để audit).
6. KHÔNG xoá ADR. KHÔNG đổi numbering. ADR là append-only.
```

---

## Current ADRs

| ADR | Title | Status | Date | Supersedes | Superseded by | Link |
|---|---|---|---|---|---|---|
| ADR-0001 | Adopt Operational Runtime Platform | Accepted | 2026-05-10 | — | — | [ADR-0001](../00_SYSTEM_BRAIN/decisions/ADR-0001-adopt-operational-runtime-platform.md) |
| ADR-0002 | Demote GAS / GWS to Integration Layer | Accepted | 2026-05-10 | — | — | [ADR-0002](../00_SYSTEM_BRAIN/decisions/ADR-0002-demote-gas-gws-to-integration-layer.md) |
| ADR-0003 | Runtime-first Architecture | Accepted | 2026-05-10 | — | — | [ADR-0003](../00_SYSTEM_BRAIN/decisions/ADR-0003-runtime-first-architecture.md) |
| ADR-0004 | Event-driven Operational Runtime | Accepted | 2026-05-10 | — | — | [ADR-0004](../00_SYSTEM_BRAIN/decisions/ADR-0004-event-driven-operational-runtime.md) |
| ADR-0005 | Human-override Policy | Accepted | 2026-05-10 | — | — | [ADR-0005](../00_SYSTEM_BRAIN/decisions/ADR-0005-human-override-policy.md) |

Tất cả ADR đầu tiên (0001..0005) **Accepted** ở Phase 002 Turn 5
(2026-05-10) bằng user approval. KHÔNG có ADR nào Superseded hay Rejected
ở thời điểm này.

---

## ADR Relationship Map

```txt
ADR-0001  Adopt Operational Runtime Platform     ◄─── nền tảng (foundation)
   ├─ ADR-0002  Demote GAS / GWS                   (corollary của 0001)
   ├─ ADR-0003  Runtime-first Architecture          (cụ thể hoá 0001)
   │   ├─ ADR-0004  Event-driven Operational Runtime  (mô hình runtime)
   │   └─ ADR-0005  Human-override Policy             (ràng buộc safety)
   └─ ADR-0005  Human-override Policy               (cross-cuts mọi runtime)
```

| ADR | Quan hệ chính |
|---|---|
| ADR-0001 | Foundation — định vị platform là Operational Runtime Platform. |
| ADR-0002 | Hệ quả của ADR-0001 — GAS / GWS xuống integration layer. |
| ADR-0003 | Cụ thể hoá ADR-0001 — chọn runtime-first thay vì UI-first / DB-first / Automation-first / AI-first. |
| ADR-0004 | Mô hình runtime cho ADR-0003 — event-driven + command-driven + queue + audit append-only. |
| ADR-0005 | Cross-cutting safety — mọi runtime (ADR-0003, ADR-0004) PHẢI có human-override pathway. |

---

## Naming convention

```txt
File:     ADR-NNNN-<short-kebab-title>.md
Folder:   00_SYSTEM_BRAIN/decisions/
Numbering: 0001, 0002, ... (4-digit, zero-padded, monotonic increasing)
Title:    "ADR-NNNN — <Title Case Title>"
```

Ví dụ:

```txt
ADR-0001-adopt-operational-runtime-platform.md
ADR-0006-monorepo-tooling-choice.md
ADR-0011-command-engine-design.md
```

---

## ADR Document Structure (chuẩn)

Mỗi ADR PHẢI có các section:

```txt
# ADR-NNNN — <Title>

| Field | Value |
|---|---|
| **Status** | Draft | Accepted | Superseded | Rejected
| **Date** | YYYY-MM-DD
| **Phase** | PHASE_NNN_<NAME>
| **Authors** | <human> + <ai if any>
| **Accepted by** | <who> (chỉ khi Accepted)
| **Accepted at** | YYYY-MM-DD (chỉ khi Accepted)
| **Supersedes** | ADR-XXXX | —
| **Superseded by** | ADR-XXXX | —
| **Related** | ADR-XXXX, ADR-YYYY (optional)

## Context
## Decision
## Consequences
## Guardrails
## Non-goals (optional)
## References
```

---

## Rules

```txt
R-1   KHÔNG xoá ADR cũ.
R-2   KHÔNG đổi numbering.
R-3   Nếu thay đổi quyết định → tạo ADR mới supersedes ADR cũ.
R-4   ADR cũ chuyển Status: Superseded + thêm field "Superseded by".
R-5   ADR là strategic law — implementation PHẢI tuân ADR Accepted.
R-6   Canonical docs là living doctrine — diễn giải ADR, có thể cập nhật.
R-7   Runtime implementation KHÔNG được vượt ADR Accepted.
R-8   Nếu phát hiện implementation đi ngược ADR → mở issue + propose ADR mới.
R-9   ADR Accepted KHÔNG sửa nội dung Decision (sửa = ADR mới).
R-10  Mỗi ADR PHẢI có Phase liên quan rõ ràng.
R-11  Mỗi ADR Accepted PHẢI ghi "Accepted by" + "Accepted at".
R-12  KHÔNG promote Draft → Accepted nếu chưa có user approval.
```

---

## Cross-reference

| Layer | Where ADR is enforced |
|---|---|
| Cursor rule | [`.cursor/rules/laocong-vos-platform.md`](../.cursor/rules/laocong-vos-platform.md) — AI behaviour bound by ADR Accepted |
| Canonical docs | [`00_SYSTEM_BRAIN/architecture/canonical/`](../00_SYSTEM_BRAIN/architecture/canonical/) — diễn giải ADR |
| Diagrams | [`00_SYSTEM_BRAIN/architecture/canonical/diagrams/`](../00_SYSTEM_BRAIN/architecture/canonical/diagrams/) — visualization khớp ADR |
| Source notes | [`00_SYSTEM_BRAIN/architecture/source-notes/`](../00_SYSTEM_BRAIN/architecture/source-notes/) — bối cảnh trước khi ADR ra đời |
| Phase reports | [`00_SYSTEM_BRAIN/phase-reports/`](../00_SYSTEM_BRAIN/phase-reports/) — nhật ký áp dụng ADR theo phase |
| Repo structure | [`docs/REPO_STRUCTURE.md`](./REPO_STRUCTURE.md) — phản ánh ADR trong layout |
| Git workflow | [`docs/GIT_BRANCH_STRATEGY.md`](./GIT_BRANCH_STRATEGY.md) — phản ánh ADR governance |
| Integration boundary | [`docs/INTEGRATION_BOUNDARY.md`](./INTEGRATION_BOUNDARY.md) — phản ánh ADR-0002 |

---

## How to add a new ADR (checklist)

```txt
[ ] Tên file: ADR-NNNN-<short-kebab-title>.md (NNNN = số tiếp theo).
[ ] Đặt vào: 00_SYSTEM_BRAIN/decisions/.
[ ] Header table đầy đủ: Status, Date, Phase, Authors, Supersedes, Superseded by, Related.
[ ] Status mặc định: Draft.
[ ] Sections: Context, Decision, Consequences, Guardrails, Non-goals (nếu cần), References.
[ ] Nếu ADR mới supersede ADR cũ:
      - Field "Supersedes: ADR-XXXX".
      - Sửa ADR cũ: Status: Superseded + Superseded by: ADR-NNNN (đây là ngoại lệ append-only được phép).
[ ] Cập nhật bảng "Current ADRs" trong file này.
[ ] Cập nhật relationship map nếu cần.
[ ] Tham chiếu trong canonical docs / phase report liên quan.
[ ] User duyệt → promote Draft → Accepted (thêm Accepted by + Accepted at).
[ ] Cập nhật CHANGELOG.md.
```

---

## Open ADR slots (đề xuất cho phase tương lai)

> Đây là **dự kiến**, KHÔNG phải ADR đã tạo. Sẽ tạo ở phase tương ứng.

| Slot | Phase | Topic dự kiến |
|---|---|---|
| ADR-0006 | Phase 003 | Monorepo tooling (pnpm vs npm workspaces) |
| ADR-0007 | Phase 003 | TypeScript strict baseline |
| ADR-0008 | Phase 003 | Lint / format toolchain |
| ADR-0009 | Phase 004 | Postgres event_store schema policy |
| ADR-0010 | Phase 004 | RLS policy default + tenant isolation |
| ADR-0011 | Phase 005 | Command-engine design + DI strategy |
| ADR-0012 | Phase 006 | Event-bus implementation (LISTEN/NOTIFY vs polling vs Redis) |
| ADR-0013 | Phase 008 | Permission-engine capability model |
| ADR-0014 | Phase 011 | Admin-web UI kit (Mantine vs Radix vs shadcn) |
| ADR-0015 | Phase 013 | GAS adapter authentication |
| ADR-0016 | Phase 016 | CI/CD platform choice |

---

## References

- ADR folder: [`../00_SYSTEM_BRAIN/decisions/`](../00_SYSTEM_BRAIN/decisions/)
- Canonical docs: [`../00_SYSTEM_BRAIN/architecture/canonical/`](../00_SYSTEM_BRAIN/architecture/canonical/)
- Phase 002 report: [`../00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/`](../00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/)
- Cursor rule: [`../.cursor/rules/laocong-vos-platform.md`](../.cursor/rules/laocong-vos-platform.md)
- Repo overview: [`../README.md`](../README.md)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 5 — Initial ADR index. ADR-0001..0005 Accepted.
```
