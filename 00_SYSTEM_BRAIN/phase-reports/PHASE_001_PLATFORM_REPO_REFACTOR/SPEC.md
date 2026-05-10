# PHASE 001 — SPEC

> Spec chi tiết cho Phase 001 — Platform Repo Refactor.

---

## 1. Mục tiêu

Refactor cấu trúc repo và Git workflow theo kiến trúc
LAOCONG_VOS_PLATFORM mới (Operational Runtime Platform), trong đó:

- Core Runtime sở hữu workflow / runtime / state / audit / event / permission / contract.
- Integration sở hữu bridge / sync / import-export / notification / external API.
- GWS / GAS được demote xuống integration support layer.

---

## 2. Ràng buộc bắt buộc

```txt
1. Không xoá code cũ.
2. Không destructive migration.
3. Không đổi business logic.
4. Không sửa runtime behavior hiện tại.
5. Chỉ refactor cấu trúc thư mục, tài liệu, Git hygiene.
6. GAS/GWS phải được chuyển về vai trò support integration.
7. Không để apps-script nằm như core runtime.
8. Mọi thay đổi phải có report trong 00_SYSTEM_BRAIN.
9. Không merge main.
10. Không push nếu chưa được yêu cầu.
```

---

## 3. Deliverable

### 3.1. Branch

- `phase/001-platform-repo-refactor` (đã tạo từ `main`).

### 3.2. Cấu trúc thư mục

Đầy đủ theo spec:

```txt
LAOCONG_VOS_PLATFORM/
├─ 00_SYSTEM_BRAIN/{architecture,decisions,phase-reports,ai-handoff,runbooks}/
├─ docs/
├─ apps/{admin-web,staff-web,member-web,public-web}/
├─ services/{api,worker,ai-runtime,notification,auth}/
├─ database/{supabase,migrations,seed,schema}/
├─ packages/{core-contracts,runtime-sdk,ui-kit,validators,event-bus,test-console-kit}/
├─ runtime/{command-engine,event-engine,workflow-engine,task-engine,permission-engine,audit-engine}/
├─ integrations/{gas-support/legacy-modules,google-workspace,lark,telegram,zalo,misa,openai,gemini,anthropic,email,payment,maps,storage,ocr}/
├─ infra/{vercel,supabase,github-actions,deployment}/
├─ tests/{unit,integration,e2e,reports}/
├─ scripts/
└─ .cursor/{rules,prompts}/
```

### 3.3. README bắt buộc

| File | Mục đích |
|---|---|
| `README.md` (root) | Định vị LAOCONG_VOS_PLATFORM, GWS/GAS = support integration. |
| `runtime/README.md` | Lõi vận hành. |
| `integrations/README.md` | Integration không giữ business truth. |
| `integrations/gas-support/README.md` | GAS là adapter hỗ trợ. |
| `apps/README.md` | UI layer. |
| `services/README.md` | Backend service layer. |
| `database/README.md` | Supabase / schema / migration layer. |
| `packages/README.md` | Shared contracts / SDK. |
| `00_SYSTEM_BRAIN/architecture/README.md` | Kiến trúc hệ thống. |

### 3.4. Tài liệu quy ước

| File | Mục đích |
|---|---|
| `docs/REPO_STRUCTURE.md` | Cây thư mục + vai trò từng layer. |
| `docs/GIT_BRANCH_STRATEGY.md` | Branch naming + luồng git chuẩn. |
| `docs/INTEGRATION_BOUNDARY.md` | Boundary cứng core ↔ integration. |

### 3.5. Cursor rule

- `.cursor/rules/laocong-vos-platform.md` — quy tắc cứng cho mọi tác vụ.

### 3.6. Phase report

Folder `00_SYSTEM_BRAIN/phase-reports/PHASE_001_PLATFORM_REPO_REFACTOR/` với:

- `README.md`
- `SPEC.md` (file này)
- `IMPLEMENTATION_REPORT.md`
- `TEST_REPORT.md`
- `AI_HANDOFF.md`
- `NEXT_STEP.md`

---

## 4. Acceptance Criteria

```txt
[AC-1] Branch phase/001-platform-repo-refactor đang là branch hiện tại.
[AC-2] Tất cả thư mục mục tiêu đã tồn tại.
[AC-3] Tất cả README bắt buộc tồn tại với nội dung đúng spec.
[AC-4] Tất cả tài liệu docs/ tồn tại.
[AC-5] .cursor/rules/laocong-vos-platform.md tồn tại.
[AC-6] 6 file phase report tồn tại đầy đủ.
[AC-7] Không có file cũ nào bị xoá.
[AC-8] Không có file cũ nào bị rename.
[AC-9] Không có thay đổi nào trong src/, .myNotes/, .idp*.json, .project.json, package.json (ngoài việc giữ nguyên).
[AC-10] git status sạch — chỉ có file mới được add (chưa commit, chưa push).
[AC-11] GAS / Apps Script KHÔNG nằm ở root, KHÔNG nằm trong runtime/.
[AC-12] integrations/gas-support/legacy-modules/ tồn tại làm slot legacy.
[AC-13] CHANGELOG.md tồn tại với entry Phase 001.
```

---

## 5. Risks

| ID | Risk | Mitigation |
|---|---|---|
| R-001 | Việc tạo cấu trúc lớn có thể làm dev hiểu nhầm là hệ đã build xong. | README mỗi layer ghi rõ "placeholder" + status hiện tại. |
| R-002 | `.gitkeep` rải rác có thể bị xoá vô tình ở phase sau. | Phase tiếp theo cần kiểm tra trước khi xoá leaf folder. |
| R-003 | Tài liệu nguồn nằm ở `.myNotes/` chưa được clean-up. | Phase 002+ sẽ convert sang `00_SYSTEM_BRAIN/architecture/`, không xoá `.myNotes/`. |
| R-004 | Dev tương lai có thể tạo `apps-script/` ở root vì quen tay. | Cursor rule + INTEGRATION_BOUNDARY.md cấm rõ. |
| R-005 | `src/index.js` template IDP còn nằm root, dễ gây nhiễu. | Giữ nguyên ở phase này, sẽ xử lý ở phase scaffold app/service. |

---

## 6. Out-of-scope (được xác nhận lại)

```txt
- Không scaffold Next.js / API / worker / AI runtime.
- Không tạo schema DB / migration thật.
- Không setup CI/CD GitHub Actions thật.
- Không deploy Vercel / Supabase.
- Không import code GAS legacy (vì repo chưa có).
- Không xoá .myNotes/ hay src/.
- Không sửa package.json (giữ template IDP).
```
