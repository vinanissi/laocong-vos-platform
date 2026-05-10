# PHASE 001 — AI HANDOFF

> Bàn giao cho phiên AI tiếp theo (hoặc developer kế tiếp).
> Đọc file này TRƯỚC khi bắt đầu phase 002.

---

## 1. Bối cảnh hệ thống

LAOCONG_VOS_PLATFORM là **Operational Runtime Platform** /
**Operational Workspace OS** cho SMEs, HTX, fleet/logistics, field workforce,
invoice operation, hồ sơ, task, service operation.

Triết lý:

```txt
Operational-runtime-first
+ Human-guided
+ AI-assisted
+ Append-only
+ Audit-first
+ Event-driven
+ Production-safe
```

GWS / GAS chỉ là **integration support layer**, KHÔNG phải core.

---

## 2. Trạng thái hiện tại sau Phase 001

```txt
BRANCH:  phase/001-platform-repo-refactor (chưa commit, chưa push, chưa merge)
SCOPE:   structure + docs only — chưa có code runtime/service/app/integration.
STATUS:  ready for review → ready to commit (khi user yêu cầu).
```

Đã hoàn thành:

- 57 thư mục theo cấu trúc mục tiêu.
- 9 README layer (root + runtime + integrations + gas-support + apps + services + database + packages + 00_SYSTEM_BRAIN/architecture).
- 3 tài liệu quy ước (`docs/REPO_STRUCTURE.md`, `docs/GIT_BRANCH_STRATEGY.md`, `docs/INTEGRATION_BOUNDARY.md`).
- 1 Cursor rule (`.cursor/rules/laocong-vos-platform.md`).
- 6 file phase report.
- 1 `CHANGELOG.md` mới.

---

## 3. Điều phiên kế tiếp PHẢI biết

### 3.1. Repo state quirks

```txt
- src/index.js  → vẫn là console.log mặc định IDP. Không xoá ở phase này.
- .myNotes/     → giữ tài liệu nguồn (.docx + .md + 00_prompt). KHÔNG xoá.
                 Sẽ dần convert sang 00_SYSTEM_BRAIN/architecture/ ở phase sau.
- package.json  → vẫn là IDP web-app-template. Chưa monorepo-fy.
- .github/workflows/ → rỗng. Chưa setup CI.
- KHÔNG có code GAS / Apps Script. Slot legacy-modules/ trống có sẵn.
```

### 3.2. Boundary rules đã định nghĩa

```txt
Core Runtime  (runtime/)        sở hữu: workflow / state / event / audit / permission / contract
Integration   (integrations/)   sở hữu: bridge / sync / import-export / notification / external API
GWS / GAS                       = 1 integration trong nhiều integration. KHÔNG core.
```

Vi phạm boundary = vi phạm Red Rule (xem `docs/INTEGRATION_BOUNDARY.md`).

### 3.3. Cursor rule alwaysApply

`.cursor/rules/laocong-vos-platform.md` được set `alwaysApply: true`.
Mọi prompt / tác vụ AI tiếp theo PHẢI đọc rule này trước.

### 3.4. Git workflow

```txt
feature/* → phase/* → dev → release/* → main
```

Phase tiếp theo phải tạo branch mới `phase/00X-<name>`, KHÔNG tiếp tục
trên `phase/001-platform-repo-refactor`.

---

## 4. Việc PHẢI làm trước khi bắt đầu phase mới

```txt
[ ] Đọc README.md root.
[ ] Đọc docs/REPO_STRUCTURE.md.
[ ] Đọc docs/INTEGRATION_BOUNDARY.md.
[ ] Đọc docs/GIT_BRANCH_STRATEGY.md.
[ ] Đọc .cursor/rules/laocong-vos-platform.md.
[ ] Đọc 00_SYSTEM_BRAIN/phase-reports/PHASE_001_*/IMPLEMENTATION_REPORT.md.
[ ] Đọc 00_SYSTEM_BRAIN/phase-reports/PHASE_001_*/NEXT_STEP.md.
[ ] Xác nhận branch hiện tại (KHÔNG ở main).
[ ] Tạo phase folder mới trước khi sửa code.
```

---

## 5. Việc PHẢI tránh ở phase tiếp theo

```txt
1. KHÔNG xoá .myNotes/ hay src/index.js.
2. KHÔNG đổi package.json sang monorepo nếu chưa có ADR riêng.
3. KHÔNG tạo apps-script/ ở root (đã cấm rõ).
4. KHÔNG cho integration giữ business truth.
5. KHÔNG bypass command-engine.
6. KHÔNG push / merge khi chưa được yêu cầu.
7. KHÔNG xoá .gitkeep ở leaf folder mà không kiểm tra trước.
8. KHÔNG redesign cấu trúc thư mục đã chốt ở phase này — chỉ extend.
```

---

## 6. Open question gửi cho phase sau

```txt
Q1: Có nên monorepo-fy package.json (npm workspaces / pnpm) ngay phase 002 không,
    hay đợi đến khi có service/app thật?
Q2: Có nên đặt .myNotes/ vào .gitignore sau khi convert xong sang
    00_SYSTEM_BRAIN/architecture/, hay giữ làm "raw note vault"?
Q3: src/index.js có nên di chuyển vào apps/admin-web/ làm placeholder, hay
    giữ root để IDP template tooling vẫn chạy được?
Q4: ADR đầu tiên (ADR-0001) nên là gì? Đề xuất: "Adopt Operational Runtime
    Platform architecture, demote GAS to integration support layer".
Q5: Có nên thêm docs/ARCHITECTURE_DECISION_RECORDS.md tổng hợp ADR ngay từ
    phase 002?
```

---

## 7. Hạng mục handoff sang `00_SYSTEM_BRAIN/ai-handoff/`

(File AI_HANDOFF cấp phase này nằm trong phase folder. Khi cần handoff
xuyên-phase / xuyên-session, copy/symlink-style snapshot sang
`00_SYSTEM_BRAIN/ai-handoff/PHASE_001_HANDOFF.md` ở phase 002.)

---

## 8. Tham chiếu nhanh

- [`./README.md`](./README.md)
- [`./SPEC.md`](./SPEC.md)
- [`./IMPLEMENTATION_REPORT.md`](./IMPLEMENTATION_REPORT.md)
- [`./TEST_REPORT.md`](./TEST_REPORT.md)
- [`./NEXT_STEP.md`](./NEXT_STEP.md)
- [`../../../docs/REPO_STRUCTURE.md`](../../../docs/REPO_STRUCTURE.md)
- [`../../../docs/INTEGRATION_BOUNDARY.md`](../../../docs/INTEGRATION_BOUNDARY.md)
- [`../../../docs/GIT_BRANCH_STRATEGY.md`](../../../docs/GIT_BRANCH_STRATEGY.md)
- [`../../../.cursor/rules/laocong-vos-platform.md`](../../../.cursor/rules/laocong-vos-platform.md)
