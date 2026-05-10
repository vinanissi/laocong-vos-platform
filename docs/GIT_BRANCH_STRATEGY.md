# Git Branch Strategy — LAOCONG_VOS_PLATFORM

> Quy ước branch & luồng git chuẩn cho repo `LAOCONG_VOS_PLATFORM`.
> Production-safe, append-only, audit-friendly.

---

## 1. Branch chính

| Branch | Vai trò | Bảo vệ |
|---|---|---|
| `main` | Production. Chỉ nhận merge từ `release/*`. | PROTECTED — không commit trực tiếp, không force-push. |
| `dev` | Integration branch. Nhận merge từ `phase/*` và `feature/*` đã pass test. | PROTECTED — chỉ merge qua PR có TEST_REPORT.md. |

---

## 2. Branch triển khai

| Prefix | Mục đích | Sống bao lâu |
|---|---|---|
| `phase/<NNN>-<short-name>` | Một phase công việc lớn (vd. `phase/001-platform-repo-refactor`). Có folder report tương ứng trong `00_SYSTEM_BRAIN/phase-reports/`. | Đến khi merge vào `dev`. |
| `feature/<short-name>` | Một feature nhỏ. Thường nhánh con của `phase/*` hoặc `dev`. | Ngắn (vài ngày). |
| `runtime/<engine-name>` | Sửa/thêm engine trong `runtime/` (vd. `runtime/task-engine`). | Ngắn–trung. |
| `service/<service-name>` | Sửa/thêm service trong `services/` (vd. `service/ai-runtime`). | Ngắn–trung. |
| `integration/<adapter-name>` | Sửa/thêm adapter trong `integrations/` (vd. `integration/gas-support`). | Ngắn–trung. |
| `experiment/<short-name>` | Thử nghiệm — KHÔNG bao giờ merge thẳng vào `dev` mà không qua review. | Ngắn (≤ 2 tuần). |
| `release/<x.y.z>` | Branch chuẩn bị release. Cherry-pick từ `dev`, freeze, regression test. | Ngắn (giờ–ngày). |
| `hotfix/<issue>` | Sửa khẩn cấp từ `main`. PR vào `main` + back-merge `dev`. | Rất ngắn. |
| `archive/<reason>` | Snapshot trạng thái cũ trước khi cleanup lớn. KHÔNG bao giờ merge. | Vĩnh viễn. |

---

## 3. Luồng git chuẩn

```txt
feature/*  ─┐
runtime/*  ─┤
service/*  ─┼─►  phase/*  ─►  dev  ─►  release/*  ─►  main
integration/*─┘                    └─ hotfix/* ─┘
```

### Quy tắc luồng

```txt
1. KHÔNG commit trực tiếp lên main.
2. KHÔNG commit trực tiếp lên dev.
3. feature/runtime/service/integration → merge vào phase/* tương ứng.
4. phase/* → merge vào dev khi đủ:
   - IMPLEMENTATION_REPORT.md
   - TEST_REPORT.md
   - AI_HANDOFF.md
   - NEXT_STEP.md
5. dev → release/* khi cần đóng version.
6. release/* → main khi đã regression pass.
7. hotfix/* → main + back-merge dev (KHÔNG quên back-merge).
8. archive/* KHÔNG bao giờ merge.
```

---

## 4. Quy ước commit

```txt
<type>(<scope>): <short summary>

<body>

<footer: refs / phase / report-path>
```

### Type

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

### Ví dụ

```txt
phase(001): scaffold platform repo structure

- create runtime/, services/, apps/, integrations/, packages/, database/, infra/
- add boundary docs (REPO_STRUCTURE, INTEGRATION_BOUNDARY)
- demote GAS to integrations/gas-support/

Refs: 00_SYSTEM_BRAIN/phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/
```

---

## 5. PR (Pull Request) checklist

Một PR vào `dev` PHẢI có:

```txt
[ ] Branch theo naming chuẩn
[ ] Mô tả rõ scope (layer nào, module nào)
[ ] Có IMPLEMENTATION_REPORT.md (nếu là phase)
[ ] Có TEST_REPORT.md
[ ] Test Console pass (nếu là engine/adapter)
[ ] Không destructive migration
[ ] Không sửa business logic ngoài scope mô tả
[ ] Không xoá file cũ
[ ] Không bypass runtime command-engine
[ ] Không để integration giữ business truth
[ ] Cập nhật CHANGELOG.md (khi cần)
```

---

## 6. Quy tắc cho repo này (đặc thù)

```txt
1. KHÔNG push khi user chưa yêu cầu.
2. KHÔNG merge main khi chưa qua release/*.
3. KHÔNG force-push lên main hoặc dev.
4. Nhánh phase phải khớp với folder phase-reports/PHASE_XXX_<NAME>/.
5. Mọi thay đổi cấu trúc thư mục phải có report tương ứng.
```

---

## 7. Tham chiếu

- [`./REPO_STRUCTURE.md`](./REPO_STRUCTURE.md)
- [`./INTEGRATION_BOUNDARY.md`](./INTEGRATION_BOUNDARY.md)
- [`../.cursor/rules/laocong-vos-platform.md`](../.cursor/rules/laocong-vos-platform.md)
