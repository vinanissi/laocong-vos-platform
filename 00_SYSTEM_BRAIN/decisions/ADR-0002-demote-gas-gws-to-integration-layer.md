# ADR-0002 — Demote Google Apps Script & Google Workspace to Integration Layer

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
| **Related** | ADR-0001 |

---

## Context

Trước đây, Google Apps Script (GAS) và Google Workspace (GWS) được dùng như
**runtime trung tâm**:

- Sheet = state store nghiệp vụ.
- Form = entry point chính.
- Apps Script = nơi viết business logic (assignment, validation, notification, sync).
- Drive = file storage chính.

Cách dùng này có 6 vấn đề chính:

1. Sheet không phải database — không transaction, không RLS chuẩn, không index hiệu quả.
2. GAS có quota / time-limit khắt khe, không phù hợp workload nghiệp vụ thực.
3. GAS không có queue / event-bus / state machine native.
4. Audit log nghiệp vụ tản mát trong nhiều sheet, khó append-only.
5. Khó test (test console gần như không tồn tại).
6. Phụ thuộc account Google → khó multi-tenant, khó on-prem hybrid sau này.

Sau ADR-0001, hệ chuyển sang Operational Runtime Platform. Vai trò của GAS/GWS
phải được định nghĩa lại rõ ràng để:

- Không quay lại pattern "GAS-as-core".
- Không xoá ngay code GAS legacy đang chạy.
- Có chỗ "hạ cánh an toàn" cho GAS code khi import vào repo này.

---

## Decision

Google Apps Script và Google Workspace được **chính thức demote** xuống tầng
**Integration Support Layer**.

Cụ thể:

- GAS code mới chỉ được phép tồn tại trong `integrations/gas-support/`.
- GAS code legacy khi import vào repo này phải đặt tại `integrations/gas-support/legacy-modules/<module-name>/`.
- GWS (Drive / Gmail / Docs / Sheet) chỉ là adapter trong `integrations/google-workspace/`.
- GAS/GWS chỉ được phép làm: sync sheet, form bridge, lightweight automation, import/export, support legacy.
- GAS/GWS **không** được phép: giữ business truth, định nghĩa workflow, audit nghiệp vụ, phân quyền nghiệp vụ.

Cấm tuyệt đối:

```txt
- Tạo folder apps-script/ ở root repo.
- Đặt code GAS trong runtime/, services/, apps/, database/.
- Cho GAS đọc/ghi thẳng DB nghiệp vụ mà không qua command-engine.
- Coi sheet là source of truth.
```

---

## Consequences

### Tích cực

- Boundary cứng → dev mới không "lỡ tay" tạo lại pattern cũ.
- Code GAS legacy có chỗ tồn tại được audit (`legacy-modules/`).
- Cho phép chuyển dần GAS → Core Runtime mà không phá production hiện tại.
- Cursor rule + Red Rule trong tài liệu giúp AI agent tự tuân thủ.

### Tiêu cực / chi phí

- Phải duy trì 2 đường code song song (legacy GAS + Core Runtime native) trong giai đoạn chuyển.
- Phải xây adapter contract rõ ràng cho GAS gọi vào Core Runtime (turn 5+ phase sau).
- Đội dev đang quen viết GAS sẽ phải học pattern command/event/state machine.

---

## Guardrails

```txt
G-1  Tất cả GAS code mới PHẢI nằm trong integrations/gas-support/.
G-2  Tất cả GAS legacy PHẢI nằm trong integrations/gas-support/legacy-modules/<module>/.
G-3  Mỗi module GAS legacy PHẢI có README ghi: nguồn gốc, ngày import, trạng thái (active/frozen/deprecated).
G-4  Mỗi GAS endpoint gọi vào hệ PHẢI coi là external và PHẢI audit.
G-5  Khi 1 GAS module được thay bằng Core Runtime native → KHÔNG xoá legacy, chỉ đánh DEPRECATED.
G-6  KHÔNG sửa logic nghiệp vụ trong lúc import GAS (chỉ di chuyển, append-only).
G-7  KHÔNG tạo apps-script/ ở root.
G-8  GWS adapter (Drive/Gmail/Docs/Sheet) PHẢI có timeout + retry + backoff.
```

---

## References

- ADR-0001 — Adopt Operational Runtime Platform.
- ADR-0003 — Runtime-first architecture.
- [`../../../docs/INTEGRATION_BOUNDARY.md`](../../../docs/INTEGRATION_BOUNDARY.md)
- [`../../../integrations/README.md`](../../../integrations/README.md)
- [`../../../integrations/gas-support/README.md`](../../../integrations/gas-support/README.md)
- [`../../../.cursor/rules/laocong-vos-platform.md`](../../../.cursor/rules/laocong-vos-platform.md)
