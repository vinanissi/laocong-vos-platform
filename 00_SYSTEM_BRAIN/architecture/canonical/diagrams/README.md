# Canonical Diagrams

## Status
Draft Canonical (visualization only)

## Mục đích

Folder này chứa **diagrams** (Mermaid `.mmd`) phục vụ canonical architecture
doctrine của LAOCONG_VOS_PLATFORM.

Diagrams ở đây là **canonical visualization** — minh hoạ trực quan các khái
niệm đã được khoá trong `architecture/canonical/00..90_*.md` và trong
`00_SYSTEM_BRAIN/decisions/ADR-*.md`.

Diagrams **KHÔNG**:

```txt
- Là runtime implementation.
- Quyết định nghiệp vụ.
- Thay thế canonical docs.
- Thay thế ADR.
- Là source of truth.
- Đại diện cho code thực tế trong runtime/, services/, apps/, integrations/.
- Phản ánh schema database hiện hành.
```

Nếu có **mâu thuẫn** giữa diagram và canonical docs/ADR:

```txt
canonical docs / ADR  >  diagram
```

Tức là: docs + ADR thắng. Diagram phải được cập nhật để khớp.

---

## Quy tắc với diagrams

```txt
1. Diagram CHỈ là minh hoạ. KHÔNG sinh code từ diagram.
2. Diagram KHÔNG được tự ý thêm khái niệm chưa có trong canonical/ADR.
3. Diagram KHÔNG được mâu thuẫn với canonical/ADR.
4. Sửa diagram = sửa visualization, KHÔNG đổi doctrine.
5. Đổi doctrine = sửa canonical/ADR trước, diagram update sau.
6. Mọi diagram có inline comment trỏ về canonical doc liên quan.
7. Append-only: KHÔNG xoá diagram cũ — version diagram mới nếu cần.
8. Mermaid format (`.mmd`) để git diff được, không lock binary.
```

---

## Danh sách diagrams

| File | Mermaid type | Trỏ về canonical doc | Trỏ về ADR |
|---|---|---|---|
| `event-flow.mmd` | `flowchart` | `40_EVENT_DRIVEN_RUNTIME.md` | ADR-0004, ADR-0003 |
| `task-state-machine.mmd` | `stateDiagram-v2` | `50_HUMAN_OVERRIDE_POLICY.md`, `40_EVENT_DRIVEN_RUNTIME.md` | ADR-0004, ADR-0005 |
| `layered-architecture.mmd` | `flowchart` | `00_PLATFORM_OVERVIEW.md`, `10_RUNTIME_FIRST_ARCHITECTURE.md`, `20_INTEGRATION_BOUNDARY.md` | ADR-0001, ADR-0002, ADR-0003 |

---

## Cách render local

```txt
- VS Code: cài extension "Markdown Preview Mermaid Support" hoặc "Mermaid Preview".
- Mermaid live editor: https://mermaid.live/  (paste nội dung .mmd).
- CLI:  npx -p @mermaid-js/mermaid-cli mmdc -i event-flow.mmd -o event-flow.svg
        (Phase 003+ có thể bake render vào CI; turn này chưa cần.)
```

---

## Guardrails

```txt
G-1  Diagram KHÔNG là source of truth — canonical/ADR mới là.
G-2  KHÔNG sinh code từ diagram.
G-3  KHÔNG thêm khái niệm chưa có trong canonical/ADR vào diagram.
G-4  KHÔNG xoá diagram cũ — version diagram mới nếu thay đổi lớn.
G-5  Diagram PHẢI có comment trỏ về canonical doc.
G-6  Mọi cập nhật diagram PHẢI ghi vào IMPLEMENTATION_REPORT của phase đang chạy.
```

---

## Non-goals

```txt
- Không vẽ diagram ER cho database schema (sẽ làm ở phase database bootstrap).
- Không vẽ deployment diagram (sẽ làm ở phase infra/CI-CD bootstrap).
- Không vẽ sequence diagram chi tiết per command (turn này chỉ flow tổng quan).
- Không vẽ class diagram code-level.
```

---

## References

- Canonical: [`../00_PLATFORM_OVERVIEW.md`](../00_PLATFORM_OVERVIEW.md)
- Canonical: [`../10_RUNTIME_FIRST_ARCHITECTURE.md`](../10_RUNTIME_FIRST_ARCHITECTURE.md)
- Canonical: [`../20_INTEGRATION_BOUNDARY.md`](../20_INTEGRATION_BOUNDARY.md)
- Canonical: [`../40_EVENT_DRIVEN_RUNTIME.md`](../40_EVENT_DRIVEN_RUNTIME.md)
- Canonical: [`../50_HUMAN_OVERRIDE_POLICY.md`](../50_HUMAN_OVERRIDE_POLICY.md)
- ADR-0001..0005: [`../../../decisions/`](../../../decisions/)
- Phase 002 report: [`../../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/`](../../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 4 — Initial diagrams folder + 3 baseline diagrams.
```
