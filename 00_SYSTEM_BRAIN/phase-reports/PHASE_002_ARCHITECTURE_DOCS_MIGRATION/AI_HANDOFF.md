# PHASE 002 — AI HANDOFF

> Bàn giao cho phiên AI / dev tiếp theo (turn 2 trở đi của Phase 002).
> Đọc kỹ trước khi tiếp tục migrate nội dung.

---

## 1. Bối cảnh

LAOCONG_VOS_PLATFORM = Operational Runtime Platform.
Phase 001 đã scaffold xong cấu trúc repo, đã commit (`d27b7b9`) và push lên
`origin/phase/001-platform-repo-refactor` + `origin/dev`.

Phase 002 = migrate tài liệu kiến trúc vào `00_SYSTEM_BRAIN/architecture/`
theo nguyên tắc append-only.

---

## 2. Trạng thái hiện tại sau turn 5 (Architecture Doctrine Finalization)

```txt
BRANCH:    phase/002-architecture-docs-migration
           (LƯU Ý: precheck Turn 5 phát hiện branch hiện tại = dev. Đã STOP,
            báo user, user xác nhận switch về phase/002-..., đã switch an toàn.)
BASE:      dev (commit d27b7b9 — Phase 001 baseline)
COMMITS:   0 (chưa commit Phase 002)
PUSHED:    chưa push Phase 002
SCOPE T1:  scaffold khung Phase 002 + 5 ADR Draft.
SCOPE T2:  sanitize PAT + snapshot 2/3 source files vào architecture/source-notes/.
SCOPE T3:  build 10 canonical doctrine files trong architecture/canonical/.
SCOPE T4:  vẽ 3 Mermaid diagrams trong architecture/canonical/diagrams/
           + append references vào canonical 00/40/50.
SCOPE T5:  promote ADR-0001..0005 Draft → Accepted (Status + Accepted by + Accepted at)
           + tạo docs/ARCHITECTURE_DECISION_RECORDS.md (~7 KB)
           + update 00_SYSTEM_BRAIN/architecture/README.md (phản ánh Phase 002 outputs)
           + update CHANGELOG.md (entry Phase 002 Unreleased)
           + update 90_IMPLEMENTATION_ROADMAP.md Phase 002 status = "Ready for Turn 6 commit"
           + canonical docs + diagrams GIỮ Status: Draft Canonical (theo user Q2=NO).
NEXT:      Turn 6 = commit (chia nhỏ theo convention) + push + PR vào dev.
           ĐIỀU KIỆN: user explicit yêu cầu + user ĐÃ rotate PAT.
SECURITY:  origin URL đã sạch token. User VẪN cần ROTATE PAT trên GitHub
           TRƯỚC KHI push branch phase/002-... ở Turn 6.
```

Đã hoàn thành ở turn 1:

- 6 file phase report trong `00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/`.
- 3 folder mới: `architecture/source-notes/`, `architecture/canonical/`, `decisions/`.
- 5 ADR Draft trong `decisions/`:
  - ADR-0001-adopt-operational-runtime-platform.md
  - ADR-0002-demote-gas-gws-to-integration-layer.md
  - ADR-0003-runtime-first-architecture.md
  - ADR-0004-event-driven-operational-runtime.md
  - ADR-0005-human-override-policy.md

Đã hoàn thành ở turn 2:

- Sanitize `origin` URL (loại bỏ PAT khỏi `.git/config`). Token KHÔNG được in trong bất kỳ report nào.
- Snapshot 2 file vào `00_SYSTEM_BRAIN/architecture/source-notes/`:
  - `SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md` (từ `.myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md`)
  - `SOURCE_NOTE_20260510_00-prompt-philosophy.md` (từ `.myNotes/00_prompt`)
- SKIP 1 file `.docx` (binary, không text). Ghi rõ trong `INDEX.md` và `IMPLEMENTATION_REPORT.md`.
- Tạo `00_SYSTEM_BRAIN/architecture/source-notes/INDEX.md`.
- Cập nhật `IMPLEMENTATION_REPORT.md`, `TEST_REPORT.md`, `AI_HANDOFF.md` (file này), `NEXT_STEP.md`.
- KHÔNG đụng `.myNotes/`, `src/`, `package.json`, `.idp*`, `.github/`, `runtime/`, `services/`, `apps/`, `database/`, `packages/`, `integrations/`, `infra/`, `tests/`, `scripts/`, `docs/`, `.cursor/`, `CHANGELOG.md`, `README.md` root.
- KHÔNG commit, KHÔNG push.

---

## 3. Việc đã làm ở turn 2 (snapshot source-notes) — DONE

```txt
[x] Sanitize PAT khỏi origin URL.
[x] Snapshot .myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md
    → 00_SYSTEM_BRAIN/architecture/source-notes/SOURCE_NOTE_20260510_laocong-vos-platform-architecture.md
[x] Snapshot .myNotes/00_prompt
    → 00_SYSTEM_BRAIN/architecture/source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md
[x] SKIP .myNotes/LAOCONG_VOS_Operational_Runtime_Architecture_Summary.docx
    (binary .docx — record SKIPPED trong INDEX.md & IMPLEMENTATION_REPORT.md)
[x] Tạo INDEX.md với metadata + skipped reasons.
[x] KHÔNG xoá / di chuyển / sửa file gốc trong .myNotes/.
[x] KHÔNG sửa code.
[x] KHÔNG commit / push / merge.
```

> **Naming convention thực tế đã dùng:** `SOURCE_NOTE_YYYYMMDD_<slug>.md` (theo Phase 002 Turn 2 spec — khác với draft naming `YYYY-MM-DD__<name>.md` được nêu trong file này ở turn 1; **dùng convention `SOURCE_NOTE_…` cho turn này về sau**).

---

## 4a-T5. Việc đã làm ở turn 5 (Architecture Doctrine Finalization) — DONE

```txt
[x] Precheck phát hiện branch sai (`dev` thay vì `phase/002-...`).
    → STOP theo spec → báo user → user chọn "switch" → switch an toàn (untracked đi theo working tree).
[x] Promote ADR-0001..0005 Draft → Accepted:
       - Status: Draft → Accepted
       - Thêm "Accepted by: User approval in Phase 002 Turn 5"
       - Thêm "Accepted at: 2026-05-10"
       - Supersedes / Superseded by giữ "—"
       - KHÔNG sửa nội dung Decision
[x] Tạo docs/ARCHITECTURE_DECISION_RECORDS.md (~7 KB):
       - Purpose, Lifecycle (4 status), Current ADRs table, Relationship Map,
         Naming convention, Document Structure, Rules R-1..R-12,
         Cross-reference, How-to-add checklist, Open ADR slots, References.
[x] Update 00_SYSTEM_BRAIN/architecture/README.md (rewrite — 11 section):
       - Architecture Layers tree
       - Source Notes (link 3 file)
       - Canonical Docs (link 10 file + ghi rõ Status: Draft Canonical)
       - Diagrams (link 4 file)
       - ADR (bảng 5 ADR Accepted + link tới index)
       - Layer Hierarchy & Trust diagram
       - Guardrails G-1..G-10
       - Cập nhật folder workflow
       - Trạng thái hiện tại bảng theo phase
[x] Update CHANGELOG.md (append entry Phase 002 — Architecture Docs Migration).
       - Added / Changed / Deprecated / Removed / Fixed / Security / Architecture / Constraints honoured.
       - KHÔNG xoá entry Phase 001.
[x] Update 90_IMPLEMENTATION_ROADMAP.md Phase 002:
       - Bảng overview: Status = "Ready for Turn 6 commit"
       - Pipeline: Turn 1..5 = ✅ DONE; Turn 6 = "Ready for Turn 6 commit"
       - KHÔNG promote canonical Status (giữ Draft Canonical theo user Q2=NO)
       - KHÔNG rewrite các phase khác
[x] Canonical docs + diagrams GIỮ Status: Draft Canonical (theo user quyết định Q2).
[x] .docx skipped: bỏ qua tạm (theo user quyết định Q3) — KHÔNG tạo SOURCE_NOTE mới.
[x] KHÔNG đụng .myNotes/, source-notes/, code, runtime, business logic.
[x] KHÔNG commit, KHÔNG push, KHÔNG merge, KHÔNG deploy.
```

---

## 4a. Việc đã làm ở turn 4 (Mermaid diagrams) — DONE

```txt
[x] Tạo folder 00_SYSTEM_BRAIN/architecture/canonical/diagrams/.
[x] Tạo canonical/diagrams/README.md (mục đích + danh sách + guardrails).
[x] Tạo canonical/diagrams/event-flow.mmd
       (happy + reject + compensation + dead-letter + replay + override).
[x] Tạo canonical/diagrams/task-state-machine.mmd
       (7 state chính + 4 state phụ + 13 event names + override notes).
[x] Tạo canonical/diagrams/layered-architecture.mmd
       (6 layer + governance + flow đúng + forbidden flows ghi chú).
[x] Append 2 dòng reference vào canonical/00_PLATFORM_OVERVIEW.md (mục References).
[x] Append 2 dòng reference vào canonical/40_EVENT_DRIVEN_RUNTIME.md (mục References).
[x] Append 2 dòng reference vào canonical/50_HUMAN_OVERRIDE_POLICY.md (mục References).
[x] Mỗi diagram có header comment trỏ về canonical doc + ADR.
[x] KHÔNG đụng .myNotes/, source-notes/, ADR Draft, code, runtime.
[x] KHÔNG sửa Status / Purpose / Core Principles / Guardrails / Non-goals của canonical.
[x] KHÔNG sửa 7 canonical còn lại (10, 20, 30, 60, 70, 80, 90).
[x] KHÔNG commit, KHÔNG push.
```

---

## 4. Việc đã làm ở turn 3 (build canonical) — DONE

```txt
[x] Đọc source-notes/INDEX.md.
[x] Đọc 2 SOURCE_NOTE_*.md.
[x] Đọc 5 ADR draft + Phase 001/002 reports.
[x] Tạo 10 canonical files trong architecture/canonical/:
      00_PLATFORM_OVERVIEW.md           (~7 KB)
      10_RUNTIME_FIRST_ARCHITECTURE.md  (~7 KB)
      20_INTEGRATION_BOUNDARY.md        (~7 KB — có bảng "Owns / Does NOT Own")
      30_GAS_GWS_SUPPORT_LAYER.md       (~7 KB — có 5-step migration)
      40_EVENT_DRIVEN_RUNTIME.md        (~9 KB — có Mermaid flowchart)
      50_HUMAN_OVERRIDE_POLICY.md       (~7 KB — có 5 quyền)
      60_AI_ASSISTED_OPERATION.md       (~8 KB)
      70_GIT_AND_PHASE_GOVERNANCE.md    (~7 KB)
      80_MATURITY_MODEL.md              (~7 KB — L0–L5)
      90_IMPLEMENTATION_ROADMAP.md      (~8 KB — phase 001..017)
[x] Mỗi file có structure chuẩn:
      Status / Purpose / Core Principles / (domain section) / Guardrails / Non-goals / References / Last reviewed.
[x] Status mặc định = Draft Canonical (sẽ chuyển Accepted ở turn 5 sau khi user duyệt).
[x] Tất cả nội dung trích từ source-notes + ADR + phase report — KHÔNG đọc .myNotes/ trực tiếp.
[x] Tiếng Việt, operational-first, runtime-first, không marketing / AI hype / vague.
[x] Mọi chỗ thiếu thông tin được ghi TODO / OPEN QUESTION (không bịa).
[x] KHÔNG đụng .myNotes/, source-notes/, ADR Draft, code, runtime.
[x] KHÔNG commit, KHÔNG push.
```

---

## 4b. Việc PHẢI làm ở turn 6 (commit + push, CHỈ KHI USER YÊU CẦU)

> **Điều kiện cứng trước Turn 6:**
> 1. User explicit yêu cầu commit + push (không tự động).
> 2. User XÁC NHẬN đã rotate GitHub PAT trên `https://github.com/settings/tokens`.
> 3. Branch hiện tại = `phase/002-architecture-docs-migration` (precheck đầu turn).
> 4. Remote URL clean (precheck — phòng trường hợp lỡ tay set lại token).

```txt
A. PRECHECK
   - git branch --show-current     → phải là phase/002-architecture-docs-migration
   - git status --short            → xác nhận file Phase 002 untracked
   - git remote -v                 → KHÔNG có ghp_*
   - User xác nhận đã rotate PAT (nếu KHÔNG → DỪNG, KHÔNG push)

B. STAGE chia nhỏ theo convention (xem 70_GIT_AND_PHASE_GOVERNANCE.md):

   c1: phase(002): scaffold phase 002 + adr draft foundation
       - 00_SYSTEM_BRAIN/phase-reports/PHASE_002_*/{README,SPEC}.md (Turn 1 baseline)
       - Stage tối thiểu cho commit này

   c2: phase(002): sanitize remote + snapshot architecture source-notes
       - 00_SYSTEM_BRAIN/architecture/source-notes/INDEX.md
       - 00_SYSTEM_BRAIN/architecture/source-notes/SOURCE_NOTE_*.md

   c3: phase(002): build canonical architecture doctrine (00..90)
       - 00_SYSTEM_BRAIN/architecture/canonical/00..90_*.md (10 file)

   c4: phase(002): add canonical mermaid diagrams
       - 00_SYSTEM_BRAIN/architecture/canonical/diagrams/*

   c5: phase(002): finalize adr 0001..0005 + adr index + governance docs
       - 00_SYSTEM_BRAIN/decisions/ADR-0001..0005 (Status: Accepted)
       - docs/ARCHITECTURE_DECISION_RECORDS.md
       - 00_SYSTEM_BRAIN/architecture/README.md
       - CHANGELOG.md
       - 00_SYSTEM_BRAIN/architecture/canonical/90_IMPLEMENTATION_ROADMAP.md
       - 00_SYSTEM_BRAIN/phase-reports/PHASE_002_*/{IMPLEMENTATION_REPORT,TEST_REPORT,AI_HANDOFF,NEXT_STEP}.md

   ⚠️ Lưu ý: nếu chia commit theo Turn nhưng có file đụng nhiều turn (vd. 4 phase report
              được sửa ở mọi turn), thì stage tất cả thay đổi của file đó vào commit
              cuối cùng (c5) cho đơn giản. Hoặc dùng `git add -p` để chia interactive.
              Khuyến nghị: KHÔNG dùng `git add -i` (không support interactive).

C. COMMIT

   - 5 commit theo thứ tự c1..c5.
   - Sử dụng HEREDOC cho commit message (commit body dài).
   - KHÔNG dùng --no-verify, --no-gpg-sign.
   - KHÔNG amend commit cũ.

D. PUSH (sau khi user xác nhận PAT rotated):

   git push -u origin phase/002-architecture-docs-migration

   - Nếu push fail vì auth → DỪNG, báo user kiểm tra credential helper.
   - KHÔNG force-push.

E. PR vào dev (KHÔNG main):

   gh pr create --base dev --head phase/002-architecture-docs-migration \
     --title "phase(002): architecture docs migration" \
     --body "$(cat <<'EOF'
   ## Summary
   Phase 002 hoàn tất: source-notes (Turn 2) + 10 canonical docs (Turn 3) +
   3 Mermaid diagrams (Turn 4) + 5 ADR Accepted + ADR index + architecture
   README + CHANGELOG (Turn 5).

   ## Scope
   - Append-only, no code/runtime/business logic touched.
   - 5 ADR foundation (Accepted): runtime-first, event-driven, human-override,
     AI-assisted, GAS demote.
   - 10 canonical docs giữ Status: Draft Canonical (chưa promote).

   ## Test plan
   - Review canonical/00..90 và canonical/diagrams/*.
   - Review 5 ADR + ADR index docs/ARCHITECTURE_DECISION_RECORDS.md.
   - Verify boundary: integration KHÔNG giữ business truth (canonical 20).
   - Verify human override (canonical 50, ADR-0005).
   - Đọc CHANGELOG entry Phase 002 ở [Unreleased].

   ## Phase report
   00_SYSTEM_BRAIN/phase-reports/PHASE_002_ARCHITECTURE_DOCS_MIGRATION/
   EOF
   )"

   - KHÔNG merge PR tự động — chờ user review.
   - KHÔNG approve PR thay user.

F. POST-PUSH HYGIENE

   - Verify origin URL vẫn KHÔNG có token sau push.
   - Báo PR URL cho user.

G. KHÔNG LÀM:
   - KHÔNG merge dev/main.
   - KHÔNG đụng code / runtime / business logic.
   - KHÔNG đụng .myNotes/, source-notes/.
   - KHÔNG sửa canonical / ADR / diagrams sau commit (sẽ là phase mới nếu cần).
```

---

## 4c. (Đã merge nội dung vào 4b — Turn 6 plan đầy đủ ở trên)

---

## 5. Việc PHẢI làm ở turn 4 (diagrams)

```txt
[ ] canonical/diagrams/event-flow.mmd
[ ] canonical/diagrams/task-state-machine.mmd
[ ] canonical/diagrams/layered-architecture.mmd
[ ] Định dạng Mermaid (markdown render được trên GitHub).
```

---

## 6. Việc PHẢI làm ở turn 5 (finalize)

```txt
[ ] Cập nhật 5 ADR từ Draft → Accepted (KHI user duyệt).
[ ] Tạo docs/ARCHITECTURE_DECISION_RECORDS.md (index ADR).
[ ] Cập nhật 00_SYSTEM_BRAIN/architecture/README.md để link tới canonical/.
[ ] Cập nhật CHANGELOG.md (entry Phase 002 — Unreleased).
[ ] Cập nhật IMPLEMENTATION_REPORT.md & TEST_REPORT.md (mark từng AC PASS).
```

---

## 7. Việc PHẢI tránh trong toàn Phase 002

```txt
1. KHÔNG xoá .myNotes/.
2. KHÔNG xoá file nguồn nào.
3. KHÔNG sửa code (src/, package.json, .idp*.json, .project.json).
4. KHÔNG đổi cấu trúc thư mục Phase 001 đã chốt.
5. KHÔNG scaffold engine/service/app/integration.
6. KHÔNG tạo CI/CD.
7. KHÔNG tự động hoá pipeline migration.
8. KHÔNG deploy.
9. KHÔNG merge.
10. KHÔNG push khi user chưa yêu cầu.
```

---

## 8. Open questions cho turn sau

```txt
Q1: Convert .docx → .md nên dùng tool nào? (pandoc / manual / AI extract)
    Hiện đề xuất: AI extract text + giữ nguyên file .docx ở .myNotes/.
Q2: source-notes/ có nên đặt vào .gitattributes là binary/text không?
    Đề xuất: text, để diff được.
Q3: Có nên gán prefix YYYY-MM-DD cho mọi snapshot trong source-notes/ không?
    Đề xuất: CÓ (giúp audit timeline).
Q4: ADR-0001..0005 status hiện là Draft. Khi nào chuyển Accepted?
    Đề xuất: sau khi canonical/ đã viết xong và user duyệt.
Q5: docs/ARCHITECTURE_DECISION_RECORDS.md tạo turn nào? Đề xuất turn 5.
```

---

## 9. Tham chiếu

- [`./README.md`](./README.md)
- [`./SPEC.md`](./SPEC.md)
- [`./IMPLEMENTATION_REPORT.md`](./IMPLEMENTATION_REPORT.md)
- [`./TEST_REPORT.md`](./TEST_REPORT.md)
- [`./NEXT_STEP.md`](./NEXT_STEP.md)
- [`../PHASE_001_PLATFORM_REPO_REFACTOR/AI_HANDOFF.md`](../PHASE_001_PLATFORM_REPO_REFACTOR/AI_HANDOFF.md)
- [`../../decisions/`](../../decisions/)
- [`../../architecture/`](../../architecture/)
- [`../../../docs/REPO_STRUCTURE.md`](../../../docs/REPO_STRUCTURE.md)
- [`../../../docs/INTEGRATION_BOUNDARY.md`](../../../docs/INTEGRATION_BOUNDARY.md)
- [`../../../.cursor/rules/laocong-vos-platform.md`](../../../.cursor/rules/laocong-vos-platform.md)
