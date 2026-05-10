# PHASE 002 — NEXT STEP

> Đề xuất các bước kế tiếp trong & sau Phase 002.

---

## 1. Việc cần làm NGAY (turn 6 của Phase 002 — commit + push)

```txt
[ ] User review tổng thể Phase 002:
       - 5 ADR Accepted (decisions/ADR-0001..0005)
       - ADR index (docs/ARCHITECTURE_DECISION_RECORDS.md)
       - architecture/README.md updated
       - CHANGELOG.md entry Phase 002
       - 90_IMPLEMENTATION_ROADMAP.md status "Ready for Turn 6 commit"
[ ] User XÁC NHẬN có muốn vào Turn 6 commit + push không. (Y / N / chờ thêm)
[ ] User XÁC NHẬN ĐÃ rotate GitHub PAT trên https://github.com/settings/tokens. (Y / N)
       ⚠️ NẾU N → KHÔNG được phép push ở Turn 6.
[ ] User XÁC NHẬN có muốn mở PR vào dev sau push không. (Y / N — nếu N thì chỉ commit + push, không mở PR)
[ ] User XÁC NHẬN format chia commit:
       (a) 5 commit theo turn (c1..c5) — đúng audit-friendly nhất
       (b) 1 commit gộp toàn bộ Phase 002 — nhanh, ít audit
       (c) khác (mô tả)
```

---

## 2. PHASE 002 — TURN 3: Build canonical architecture docs

> **Vị trí:** `00_SYSTEM_BRAIN/architecture/canonical/`
> **Nguồn duy nhất được phép đọc:** `00_SYSTEM_BRAIN/architecture/source-notes/`
> (KHÔNG đọc `.myNotes/` trực tiếp — phải đi qua snapshot để audit-friendly).

### File dự kiến

```txt
00_SYSTEM_BRAIN/architecture/canonical/
├─ 00_PLATFORM_OVERVIEW.md
├─ 10_RUNTIME_FIRST_ARCHITECTURE.md
├─ 20_INTEGRATION_BOUNDARY.md
├─ 30_GAS_GWS_SUPPORT_LAYER.md
├─ 40_EVENT_DRIVEN_RUNTIME.md
├─ 50_HUMAN_OVERRIDE_POLICY.md
├─ 60_AI_ASSISTED_OPERATION.md
├─ 70_GIT_AND_PHASE_GOVERNANCE.md
├─ 80_MATURITY_MODEL.md
└─ 90_IMPLEMENTATION_ROADMAP.md
```

### Quy ước file canonical

```txt
- Header bắt buộc mỗi file:
    # <Title>
    - Source(s): liên kết tới SOURCE_NOTE_*.md liên quan
    - Related ADR(s): ADR-00XX
    - Status: Draft | Reviewed | Accepted
    - Last reviewed: YYYY-MM-DD by <ai/human>
- Append-only — sửa qua revision (thêm section), không xoá nội dung cũ.
- Link chéo qua docs/REPO_STRUCTURE.md và docs/INTEGRATION_BOUNDARY.md.
- KHÔNG thêm quyết định mới — phát sinh thì viết ADR.
```

### Mapping nguồn → canonical

| Canonical file | Nguồn chính | ADR liên quan |
|---|---|---|
| `00_PLATFORM_OVERVIEW.md` | `SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md` (sec 1, 2, 11) + `SOURCE_NOTE_20260510_00-prompt-philosophy.md` (sec I, XVI) | ADR-0001 |
| `10_RUNTIME_FIRST_ARCHITECTURE.md` | `00-prompt-philosophy.md` (sec III, VII, VIII) | ADR-0003 |
| `20_INTEGRATION_BOUNDARY.md` | `laocong-vos-platform-architecture.md` (sec 2, 5) | ADR-0001, ADR-0002 |
| `30_GAS_GWS_SUPPORT_LAYER.md` | `laocong-vos-platform-architecture.md` (sec 4) + `00-prompt-philosophy.md` (sec II, III) | ADR-0002 |
| `40_EVENT_DRIVEN_RUNTIME.md` | `00-prompt-philosophy.md` (sec VIII, IX, X, XI) | ADR-0004 |
| `50_HUMAN_OVERRIDE_POLICY.md` | `00-prompt-philosophy.md` (sec XII, XIV) | ADR-0005 |
| `60_AI_ASSISTED_OPERATION.md` | `00-prompt-philosophy.md` (sec XIII, XIV) | ADR-0001, ADR-0005 |
| `70_GIT_AND_PHASE_GOVERNANCE.md` | `laocong-vos-platform-architecture.md` (sec 6, 7, 8, 9) | — (xem `docs/GIT_BRANCH_STRATEGY.md`) |
| `80_MATURITY_MODEL.md` | `00-prompt-philosophy.md` (sec IV, V, VI) | ADR-0003 |
| `90_IMPLEMENTATION_ROADMAP.md` | tổng hợp + roadmap đã có trong `PHASE_001/NEXT_STEP.md` & `PHASE_002/NEXT_STEP.md` | — |

---

## 3. Pipeline còn lại của Phase 002

| Turn | Việc | Output | Status |
|---|---|---|---|
| 2 | Snapshot source-notes | 2 SOURCE_NOTE_*.md + 1 INDEX.md (1 SKIPPED) | ✅ DONE |
| 3 | Build canonical doctrine | 10 file `00..90` trong `architecture/canonical/` (mỗi ~7-9 KB) | ✅ DONE |
| 4 | Mermaid diagrams | 4 file (1 README + 3 `.mmd`) trong `architecture/canonical/diagrams/` + APPEND refs vào canonical 00/40/50 | ✅ DONE |
| 5 | Finalize ADR + index + architecture/README + CHANGELOG + roadmap status | 5 ADR Accepted, `docs/ARCHITECTURE_DECISION_RECORDS.md`, `architecture/README.md` rewrite, `CHANGELOG.md` Phase 002 entry, `90_IMPLEMENTATION_ROADMAP.md` Status = "Ready for Turn 6 commit". Canonical + diagrams giữ Draft Canonical. | ✅ DONE |
| 6 | Commit (chia nhỏ theo convention) + push + PR vào `dev` (**CHỈ KHI USER YÊU CẦU + ĐÃ rotate PAT**) | branch ready để review | NEXT |

---

## 4. Detail plan cho Turn 5 (finalize)

```txt
TURN 5 — Finalize Architecture Doctrine
───────────────────────────────────────

A. PRECHECK
   - branch hiện tại = phase/002-architecture-docs-migration
   - remote URL clean
   - canonical/ + diagrams/ + source-notes/ + decisions/ tồn tại đầy đủ

B. PROMOTE ADR (CHỜ USER DUYỆT)
   Nếu user duyệt YES cho 5 ADR:
   - ADR-0001..0005: Status: Draft → Accepted
   - Thêm field "Accepted by: <user>" + "Accepted at: 2026-MM-DD"
   - Thêm field "Supersedes: -" + "Superseded by: -"
   Nếu user chưa duyệt:
   - Giữ nguyên Status: Draft, đánh dấu "User Review Pending" trong note

C. ADR INDEX
   Tạo docs/ARCHITECTURE_DECISION_RECORDS.md gồm:
   - Bảng ID | Title | Status | Date | Supersedes | Link
   - Convention thêm ADR mới (numbering, lifecycle, format)
   - Quy tắc supersedes (KHÔNG xoá ADR cũ)

D. UPDATE 00_SYSTEM_BRAIN/architecture/README.md
   - Section "Canonical docs" → link tới canonical/00..90
   - Section "Diagrams" → link tới canonical/diagrams/
   - Section "Source notes" → link tới source-notes/
   - Section "ADR" → link tới decisions/ + docs/ARCHITECTURE_DECISION_RECORDS.md
   - Section "Phase reports" → link tới phase-reports/

E. UPDATE CHANGELOG.md
   - Thêm entry "## [Unreleased] — Phase 002 — Architecture Docs Migration"
   - Sub-bullets:
       * source-notes/ (snapshot)
       * canonical/ (10 docs)
       * diagrams/ (3 .mmd + README)
       * ADR-0001..0005 (status)
       * docs/ARCHITECTURE_DECISION_RECORDS.md (new)
       * architecture/README.md (updated)

F. (TÙY CHỌN) PROMOTE CANONICAL STATUS
   Nếu user duyệt:
   - 10 canonical: Status "Draft Canonical" → "Reviewed" hoặc "Accepted"
   - 3 diagrams: Status "Draft Canonical" → "Reviewed" hoặc "Accepted"

G. (TÙY CHỌN) UPDATE 90_IMPLEMENTATION_ROADMAP.md
   - Mark Phase 002 = DONE sau khi finalize

H. UPDATE PHASE 002 REPORTS (turn 5)
   - IMPLEMENTATION_REPORT.md → Section 13 "Turn 5 — Finalize"
   - TEST_REPORT.md → Section 12 Turn 5 checklist
   - AI_HANDOFF.md → Turn 5 done + Turn 6 plan
   - NEXT_STEP.md → Turn 6 plan

I. KHÔNG đụng:
   - .myNotes/, source-notes/
   - code (runtime/, services/, apps/, database/, packages/, integrations/, infra/, src/, tests/, scripts/)
   - business logic
   - .cursor/, .github/, package.json, .idp*, .project.json

J. KHÔNG commit / push / merge — chờ Turn 6 và user explicit yêu cầu.
```

---

## 5. Plan cho Turn 6 (commit + push, CHỈ KHI USER YÊU CẦU)

```txt
PRECONDITION:
  [REQUIRED] User ĐÃ rotate GitHub PAT trên https://github.com/settings/tokens
  [REQUIRED] User explicit yêu cầu commit + push
  [REQUIRED] Turn 5 đã hoàn tất

PLAN:
1. Commit chia nhỏ theo convention (xem 70_GIT_AND_PHASE_GOVERNANCE.md):

   c1: phase(002): scaffold phase 002 + adr draft foundation
       - 00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/{README,SPEC,IMPLEMENTATION_REPORT,TEST_REPORT,AI_HANDOFF,NEXT_STEP}.md (Turn 1 baseline)
       - 00_SYSTEM_BRAIN/decisions/ADR-0001..0005 (Draft)

   c2: phase(002): sanitize remote + snapshot architecture source-notes
       - 00_SYSTEM_BRAIN/architecture/source-notes/INDEX.md
       - 00_SYSTEM_BRAIN/architecture/source-notes/SOURCE_NOTE_*.md
       - phase reports updated for Turn 2

   c3: phase(002): build canonical architecture doctrine (00..90)
       - 00_SYSTEM_BRAIN/architecture/canonical/00..90_*.md (10 file)
       - phase reports updated for Turn 3

   c4: phase(002): add canonical mermaid diagrams
       - 00_SYSTEM_BRAIN/architecture/canonical/diagrams/{README,event-flow,task-state-machine,layered-architecture}
       - 00_SYSTEM_BRAIN/architecture/canonical/{00,40,50}_*.md (References appended)
       - phase reports updated for Turn 4

   c5: phase(002): finalize adr 0001..0005 + adr index + changelog
       - 00_SYSTEM_BRAIN/decisions/ADR-0001..0005 (Status: Accepted nếu user duyệt)
       - docs/ARCHITECTURE_DECISION_RECORDS.md
       - 00_SYSTEM_BRAIN/architecture/README.md
       - CHANGELOG.md
       - 90_IMPLEMENTATION_ROADMAP.md (Phase 002 = DONE)
       - phase reports updated for Turn 5

2. git push -u origin phase/002-architecture-docs-migration

3. Mở PR vào dev (KHÔNG vào main).
   PR body: link tới canonical/, diagrams/, ADR, phase report.
   PR checklist: theo 70_GIT_AND_PHASE_GOVERNANCE.md.

4. KHÔNG merge tự động — chờ review của user.
```

---

## 3. Phase tiếp theo dự kiến — `PHASE_003_MONOREPO_BOOTSTRAP`

### Mục tiêu

- Monorepo-fy `package.json` (pnpm/npm workspaces).
- Tạo TypeScript baseline + lint/format.
- Tạo `.gitattributes` (xử lý LF/CRLF + binary).
- Tạo `scripts/check-structure.mjs` (CI verify boundary).

### Deliverable

```txt
- package.json (root) → workspaces.
- pnpm-workspace.yaml hoặc workspaces field.
- packages/core-contracts/package.json (skeleton).
- packages/runtime-sdk/package.json (skeleton).
- packages/test-console-kit/package.json (skeleton).
- tsconfig.base.json.
- .editorconfig, .prettierrc, .eslintrc.
- .gitattributes (LF normalization).
- scripts/check-structure.mjs.
- ADR-0006 — choose pnpm vs npm workspaces.
- ADR-0007 — TypeScript strict baseline.
- ADR-0008 — lint/format toolchain.
```

---

## 4. Roadmap tổng (tham khảo)

```txt
PHASE_001  Platform repo refactor              [DONE — committed d27b7b9, pushed]
PHASE_002  Architecture docs migration         [Ready for Turn 6 commit — Turn 1..5 DONE]
PHASE_003  Monorepo bootstrap                  [đề xuất]
PHASE_004  Database bootstrap                  [đề xuất]
PHASE_005  Runtime — command-engine skeleton   [đề xuất]
PHASE_006  Runtime — event + audit             [tương lai]
PHASE_007  Runtime — workflow + task           [tương lai]
PHASE_008  Runtime — permission                [tương lai]
PHASE_009  Services — api gateway              [tương lai]
PHASE_010  Services — worker                   [tương lai]
PHASE_011  Apps — admin-web scaffold           [tương lai]
PHASE_012  Apps — staff-web scaffold           [tương lai]
PHASE_013  Integrations — google-workspace + gas-support adapter [tương lai]
PHASE_014  Integrations — notification         [tương lai]
PHASE_015  Services — ai-runtime (assist)      [tương lai]
PHASE_016  CI/CD bootstrap                     [tương lai]
PHASE_017  Test infra — e2e + reports          [tương lai]
```

---

## 5. Cảnh báo cho người tiếp quản

```txt
- Đừng commit Phase 002 vội — phải làm xong turn 2..5 trước.
- Nếu commit từng turn, phải tạo nhiều commit nhỏ với commit message theo
  convention: phase(002): <verb> <noun>.
- KHÔNG mix commit Phase 002 với commit khác phase.
- KHÔNG đẩy Phase 002 lên main.
- KHÔNG đẩy Phase 002 lên dev mà không qua PR review.
```

---

## 6. Khuyến nghị cho user

```txt
1. Trước turn 2, đọc lại docs/INTEGRATION_BOUNDARY.md để chắc rằng
   canonical/40_integrations.md sẽ phản ánh đúng boundary.
2. Cân nhắc bật Branch Protection cho main và dev trên GitHub
   (require PR + status check).
3. Cân nhắc rotate GitHub PAT (đang lộ trong git remote URL).
4. Sau Phase 002, nếu mọi thứ ổn, mở PR phase/002 → dev để review tài liệu.
```
