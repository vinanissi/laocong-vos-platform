# Monorepo bootstrap (Phase 003)

## Why a monorepo

LAOCONG_VOS_PLATFORM spans **apps**, **services**, **runtime engines**, **integrations**, and **shared packages**. A workspace-style layout:

- Keeps **contracts and SDKs** versioned alongside consumers.
- Reduces duplicate tooling and documents a single **TypeScript strict baseline**.
- Supports **audit-friendly** boundaries (structure check, ADRs, append-only changelog).

Phase 003 **does not** build the real operational runtime engine; it only prepares tooling and skeleton packages.

## Workspace layout (high level)

| Area | Role |
|---|---|
| `apps/*` | UI and edge apps (no business truth in UI). |
| `services/*` | Gateways and side services around runtime. |
| `runtime/*` | Core engines (future implementation phases). |
| `packages/*` | Shared contracts, SDK, test kit — **skeleton in Phase 003**. |
| `integrations/*` | External bridges; `gas-support` slot for legacy GAS. |
| `00_SYSTEM_BRAIN/` | Architecture, ADRs, phase reports. |
| `docs/` | Product/repo conventions. |

Root `pnpm-workspace.yaml` declares `packages/*` and `apps/*` for pnpm. Some apps may still use their own lockfiles until a consolidation phase.

## Package manager policy

Chính sách **pnpm** cho monorepo root, lockfile, và lockfile app-local (legacy) được ghi trong:

- **[`PACKAGE_MANAGER_POLICY.md`](./PACKAGE_MANAGER_POLICY.md)**

Phase 003 Turn 2 đã chốt policy và giữ nguyên `package-lock.json` cấp app cho đến khi có kế hoạch migration.

## Tooling baseline

- **TypeScript:** `tsconfig.base.json` — strict defaults for new TS; existing JS not forced to migrate in Phase 003.
- **Line endings:** `.gitattributes` — LF for text; Windows scripts excepted.
- **Editor:** `.editorconfig` — shared spacing and charset defaults.
- **Format:** `.prettierrc.json` — baseline when Prettier is installed.
- **Lint:** `eslint.config.mjs` — flat-config skeleton; install ESLint when enabling rules in CI.

## Structure check

```bash
npm run check:structure
# or
node scripts/check-structure.mjs
```

Read-only: verifies required top-level folders and prints warnings (e.g. root `apps-script/`, root `*.gs`, missing `integrations/gas-support/`).

## Impact on runtime

**None** in Phase 003. No engine code, no migrations, no business-rule edits. Skeleton `package.json` files under `packages/` are metadata only.

## Related ADRs (Draft)

- `ADR-0006` — Monorepo tooling / workspace
- `ADR-0007` — TypeScript strict baseline
- `ADR-0008` — Lint, format, line endings

See `00_SYSTEM_BRAIN/phase-reports/PHASE_003_MONOREPO_BOOTSTRAP/` for phase status and next steps.
