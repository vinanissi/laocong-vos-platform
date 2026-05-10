# Package Manager Policy

## Decision

Primary package manager for root monorepo: **pnpm**.

## Rationale

- Workspace support tốt cho nhiều package/app.
- Lockfile rõ ràng, phù hợp monorepo.
- Không ép migrate app cũ ngay — cho phép giai đoạn chuyển tiếp có kiểm soát.

## Current Constraint

- **pnpm** có thể chưa có trên PATH ở máy dev cụ thể (verify bằng `pnpm -v`).
- Phase 003 **Turn 2** không bắt buộc chạy `pnpm install` nếu môi trường chưa sẵn sàng hoặc chưa được user xác nhận.
- **Không** tạo `pnpm-lock.yaml` ở root trong Turn 2 nếu pnpm chưa available hoặc chưa chạy install có kiểm soát.

## Existing App Lockfiles

Nếu `apps/member-web` hoặc app khác có `package-lock.json`:

- **Không xoá** trong Turn 2.
- Coi là **legacy / app-local lockfile** cho đến khi có kế hoạch migration rõ ràng.
- Consolidation (một lockfile root vs per-app) xử lý ở **phase riêng** hoặc sau khi có ADR/plan.

## Rules

- **Không** trộn package manager (npm/yarn/pnpm) một cách tùy tiện khi chưa có ADR hoặc plan ghi nhận.
- **Root** dùng `pnpm-workspace.yaml` làm cơ chế workspace khi làm việc bằng pnpm.
- App cũ **có thể** giữ `package-lock.json` tạm thời — không coi là vi phạm policy cho đến khi migration.
- **Không** xoá lockfile cũ nếu chưa có quyết định migration.
- **Không** chạy `install` tự động trong phase tooling nếu không chắc môi trường hoặc chưa được user/chủ sở hữu repo xác nhận.

## Next

- Khi cài **pnpm** xong (Corepack hoặc cài đặt global), chạy `pnpm install --lockfile-only` (hoặc `pnpm install`) **có kiểm soát** và ghi kết quả vào phase report.
- Sau đó đánh giá có cần **giữ** hay **gỡ** app-local `package-lock.json` theo từng app — chỉ sau khi workspace root ổn định.

Xem thêm: [`MONOREPO_BOOTSTRAP.md`](./MONOREPO_BOOTSTRAP.md), [`REPO_STRUCTURE.md`](./REPO_STRUCTURE.md).
