# 70 — Git & Phase Governance

## Status
Draft Canonical

## Purpose

Định nghĩa **Git workflow** và **Phase governance** chính thức cho
LAOCONG_VOS_PLATFORM. Nói rõ:

- Branch nào dùng cho mục đích gì.
- Luồng git chuẩn từ feature → main.
- Quy ước commit / PR / merge.
- Cấu trúc phase + 6 file report bắt buộc.
- 10 quy tắc production-safe.

> Tài liệu này là canonical. Convention chi tiết quy ước commit + PR
> checklist xem [`docs/GIT_BRANCH_STRATEGY.md`](../../../docs/GIT_BRANCH_STRATEGY.md).

---

## Core Principles

```txt
1. Không code trực tiếp trên main.
2. Không merge nếu chưa có TEST_REPORT.md.
3. Không destructive migration.
4. Append-only — không rewrite lịch sử trên branch shared.
5. Mỗi phase có folder report tương ứng.
6. Mỗi engine/module có Test Console trước khi merge.
7. Production-safe trước, tốc độ sau.
```

---

## Branch chính

| Branch | Vai trò | Bảo vệ |
|---|---|---|
| `main` | Production | PROTECTED — chỉ nhận merge từ `release/*`. Không commit trực tiếp. Không force-push. |
| `dev` | Integration branch | PROTECTED — chỉ nhận merge qua PR có TEST_REPORT.md. |

---

## Branch triển khai

| Prefix | Mục đích | Sống bao lâu |
|---|---|---|
| `phase/<NNN>-<short-name>` | Phase công việc lớn (vd. `phase/001-platform-repo-refactor`). Khớp folder `00_SYSTEM_BRAIN/phase-reports/PHASE_NNN_<NAME>/`. | Đến khi merge `dev`. |
| `feature/<short-name>` | Feature nhỏ. Thường con của `phase/*` hoặc `dev`. | Ngắn (vài ngày). |
| `runtime/<engine-name>` | Sửa/thêm engine trong `runtime/` (vd. `runtime/task-engine`). | Ngắn–trung. |
| `service/<service-name>` | Sửa/thêm service trong `services/`. | Ngắn–trung. |
| `integration/<adapter-name>` | Sửa/thêm adapter trong `integrations/`. | Ngắn–trung. |
| `experiment/<short-name>` | Thử nghiệm — KHÔNG merge thẳng dev. | Ngắn (≤ 2 tuần). |
| `release/<x.y.z>` | Branch chuẩn bị release. Cherry-pick từ `dev`, freeze, regression test. | Ngắn (giờ–ngày). |
| `hotfix/<issue>` | Sửa khẩn từ `main`. PR vào `main` + back-merge `dev`. | Rất ngắn. |
| `archive/<reason>` | Snapshot trạng thái cũ trước cleanup lớn. KHÔNG merge. | Vĩnh viễn. |

---

## Luồng git chuẩn

```txt
feature/*    ─┐
runtime/*    ─┤
service/*    ─┼─►  phase/*  ─►  dev  ─►  release/*  ─►  main
integration/*─┘                       └─ hotfix/* ─┘
```

Quy tắc luồng:

```txt
1. KHÔNG commit trực tiếp main.
2. KHÔNG commit trực tiếp dev.
3. feature/runtime/service/integration → merge vào phase/* tương ứng.
4. phase/* → merge dev khi đủ:
   - IMPLEMENTATION_REPORT.md
   - TEST_REPORT.md
   - AI_HANDOFF.md
   - NEXT_STEP.md
5. dev → release/* khi cần đóng version.
6. release/* → main khi regression pass.
7. hotfix/* → main + back-merge dev (KHÔNG quên back-merge).
8. archive/* KHÔNG merge.
```

---

## Quy ước commit

```txt
<type>(<scope>): <short summary>

<body>

<footer: refs / phase / report-path>
```

| Type | Khi dùng |
|---|---|
| `feat` | Thêm feature mới |
| `fix` | Sửa bug |
| `refactor` | Refactor không đổi behavior |
| `chore` | Việc lặt vặt (config, deps, ignore) |
| `docs` | Tài liệu |
| `test` | Test / test console |
| `phase` | Commit liên quan thay đổi cấu trúc 1 phase |
| `runtime` | Thay đổi trong `runtime/` |
| `service` | Thay đổi trong `services/` |
| `integration` | Thay đổi trong `integrations/` |
| `infra` | Thay đổi trong `infra/` |

Ví dụ commit (Phase 001):

```txt
phase(001): scaffold operational runtime platform structure
```

---

## Cấu trúc phase chuẩn

Mỗi phase PHẢI có folder:

```txt
00_SYSTEM_BRAIN/phase-reports/PHASE_NNN_<NAME>/
├─ README.md                # overview & metadata
├─ SPEC.md                  # spec chi tiết, AC
├─ IMPLEMENTATION_REPORT.md # đã làm gì, file/folder thay đổi
├─ TEST_REPORT.md           # checklist verify
├─ AI_HANDOFF.md            # bàn giao cho phiên AI / phase tiếp theo
└─ NEXT_STEP.md             # roadmap kế tiếp
```

Quy tắc:

```txt
- Tên folder: PHASE_<NNN>_<SHORT_NAME_UPPER_SNAKE>.
- NNN tăng dần (001, 002, 003, ...).
- Phase report là append-only: KHÔNG xoá phase cũ.
- Mỗi turn quan trọng trong phase ghi vào IMPLEMENTATION_REPORT.md (section "Turn N — ...").
- Khi phase merge vào dev → mark phase folder là DONE trong README + cập nhật NEXT_STEP.
```

---

## PR (Pull Request) checklist

PR vào `dev` PHẢI có:

```txt
[ ] Branch theo naming chuẩn.
[ ] Mô tả rõ scope (layer, module).
[ ] IMPLEMENTATION_REPORT.md (nếu là phase).
[ ] TEST_REPORT.md.
[ ] Test Console pass (nếu là engine/adapter).
[ ] Không destructive migration.
[ ] Không sửa business logic ngoài scope mô tả.
[ ] Không xoá file cũ.
[ ] Không bypass runtime command-engine.
[ ] Không để integration giữ business truth.
[ ] Cập nhật CHANGELOG.md (khi cần).
```

PR vào `main` (chỉ từ `release/*` hoặc `hotfix/*`):

```txt
[ ] Đến từ release/* hoặc hotfix/*.
[ ] Có regression test pass.
[ ] Có rollback plan.
[ ] Có notification trước cho team vận hành.
[ ] Có audit window.
```

---

## Quy tắc đặc thù repo

```txt
1. KHÔNG push khi user chưa yêu cầu rõ ràng.
2. KHÔNG merge main khi chưa qua release/*.
3. KHÔNG force-push main hoặc dev.
4. Nhánh phase PHẢI khớp folder phase-reports/PHASE_NNN_<NAME>/.
5. Mọi thay đổi cấu trúc thư mục PHẢI có report tương ứng.
6. Mọi PAT / secret KHÔNG được embed trong git remote URL.
7. Mọi binary lớn (.docx, .xlsx, .png) cân nhắc git LFS hoặc skip.
```

---

## 10 quy tắc Production-safe

```txt
 1. Không code trực tiếp trên main.
 2. Không merge nếu chưa có test report.
 3. Không redesign core tuỳ tiện.
 4. Không destructive migration.
 5. Không automation-first.
 6. Không để integration giữ business truth.
 7. Mỗi phase phải có report.
 8. Mỗi module phải có test console.
 9. Append-only.
10. Audit-friendly.
```

---

## Guardrails

```txt
G-1  KHÔNG commit trực tiếp main / dev.
G-2  KHÔNG merge phase chưa có TEST_REPORT.
G-3  KHÔNG xoá phase folder cũ.
G-4  KHÔNG rewrite lịch sử trên branch shared.
G-5  KHÔNG embed secret vào git remote URL.
G-6  Mỗi phase = 1 folder report + 1 branch tương ứng.
G-7  Mỗi engine/module = 1 Test Console trước merge.
G-8  PR vào main chỉ từ release/* hoặc hotfix/*.
G-9  hotfix/* PHẢI back-merge dev.
G-10 Mọi quyết định kiến trúc lớn PHẢI có ADR (kèm phase report).
```

---

## Non-goals

```txt
- Không trunk-based development không gate (có gate qua dev + release).
- Không skip phase report "vì gấp".
- Không gộp nhiều phase vào 1 commit / 1 PR.
- Không squash mất AI_HANDOFF / NEXT_STEP.
- Không "test report" rỗng để pass merge.
```

---

## References

- Source: [`../source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md`](../source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md) (sec 6 — Git Branch Strategy; sec 7 — Luồng Git chuẩn; sec 8 — Production-safe; sec 9 — Chuẩn thư mục phase)
- Convention chi tiết: [`../../../docs/GIT_BRANCH_STRATEGY.md`](../../../docs/GIT_BRANCH_STRATEGY.md)
- Repo structure: [`../../../docs/REPO_STRUCTURE.md`](../../../docs/REPO_STRUCTURE.md)
- Cursor rule: [`../../../.cursor/rules/laocong-vos-platform.md`](../../../.cursor/rules/laocong-vos-platform.md)
- Phase 001 ví dụ: [`../../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/`](../../phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/)
- Phase 002 (đang làm): [`../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/`](../../phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 3 — Initial canonical version.
```
