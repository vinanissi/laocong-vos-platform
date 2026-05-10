# ADR-0008 — Lint, format, and line-ending policy

## Status

Draft

## Date

2026-05-10

## Context

Consistent formatting and line endings reduce noise in diffs and audits. Windows and macOS/Linux contributors can otherwise introduce CRLF/LF churn. Phase 003 introduces **policy and skeleton configs** only; full enforcement in CI may follow later.

## Decision

1. **Line endings:** Repository text files normalize to **LF** via `.gitattributes` (`* text=auto eol=lf`), with explicit exceptions for Windows script types (`.cmd`, `.bat`, `.ps1`).
2. **Editor defaults:** `.editorconfig` documents charset, indent, and trim rules for common file types.
3. **Formatting:** Add a root `.prettierrc.json` as the baseline Prettier config (skeleton). Teams may extend or override per package later with clear documentation.
4. **Lint:** Add a root `eslint.config.mjs` flat-config skeleton with broad ignores for build outputs (`node_modules`, `.next`, `dist`, `build`). Real rule presets and plugin installs are deferred until dependencies are added without breaking the IDP root template.

## Consequences

- New contributors get predictable formatting and line-ending behavior when tools are installed.
- Until ESLint/Prettier are installed at root and wired in CI, configs serve as **documentation + ready-to-activate** artifacts.

## Guardrails

- Phase 003 does not mandate running format/lint on every package; no mass reformat of the entire repo in this phase.
- Do not introduce auto-fix hooks that rewrite production code without review in this phase.
- Binary and office files remain excluded from text normalization per `.gitattributes`.
