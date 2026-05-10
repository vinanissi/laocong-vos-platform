# Source Note: LAOCONG_VOS_PLATFORM — Kiến trúc Repo & Git Workflow

- Source path: `.myNotes/LAOCONG_VOS_PLATFORM_ARCHITECTURE.md`
- Snapshot date: 2026-05-10
- Snapshot mode: COPY_ONLY
- Original preserved: YES
- Original format: Markdown (.md)
- Original size: 4170 bytes (310 lines)
- Phase: 002
- Turn: 2
- Importer: AI assistant (under user supervision)
- Notes: Non-destructive architecture source snapshot. Bản gốc trong `.myNotes/` KHÔNG bị xoá / di chuyển / sửa. File này là bản chụp lưu trữ trong `00_SYSTEM_BRAIN/architecture/source-notes/` để dùng làm nguồn xây canonical docs ở Turn 3. Append-only — KHÔNG sửa nội dung gốc trong file này.

---

# LAOCONG_VOS_PLATFORM
## Kiến trúc Repo & Git Workflow

---

# 1. Tư duy kiến trúc mới

LAOCONG_VOS_PLATFORM không còn được thiết kế theo hướng:

- Google Sheet + Apps Script là trung tâm
- Business logic nằm trong GAS
- Runtime phụ thuộc Google Workspace

Mà chuyển sang:

```txt
Platform-first
Runtime-first
Operational OS
```

Google Workspace / GAS chỉ còn là:

```txt
Integration Support Layer
```

---

# 2. Triết lý kiến trúc

## Core Runtime sở hữu

```txt
- workflow
- runtime
- state
- audit
- event
- permission
- contract
```

## Integration sở hữu

```txt
- bridge
- sync
- import/export
- notification
- external API
```

---

# 3. Cấu trúc Repo chuẩn

```txt
LAOCONG_VOS_PLATFORM/
│
├─ 00_SYSTEM_BRAIN/
├─ docs/
├─ apps/
│  ├─ admin-web/
│  ├─ staff-web/
│  ├─ member-web/
│  └─ public-web/
│
├─ services/
│  ├─ api/
│  ├─ worker/
│  ├─ ai-runtime/
│  ├─ notification/
│  └─ auth/
│
├─ database/
│  ├─ supabase/
│  ├─ migrations/
│  ├─ seed/
│  └─ schema/
│
├─ packages/
│  ├─ core-contracts/
│  ├─ runtime-sdk/
│  ├─ ui-kit/
│  ├─ validators/
│  ├─ event-bus/
│  └─ test-console-kit/
│
├─ runtime/
│  ├─ command-engine/
│  ├─ event-engine/
│  ├─ workflow-engine/
│  ├─ task-engine/
│  ├─ permission-engine/
│  └─ audit-engine/
│
├─ integrations/
│  ├─ gas-support/
│  ├─ google-workspace/
│  ├─ lark/
│  ├─ telegram/
│  ├─ zalo/
│  ├─ misa/
│  ├─ openai/
│  ├─ gemini/
│  ├─ anthropic/
│  ├─ email/
│  ├─ payment/
│  ├─ maps/
│  ├─ storage/
│  └─ ocr/
│
├─ infra/
├─ tests/
├─ scripts/
├─ .cursor/
├─ README.md
└─ package.json
```

---

# 4. Vai trò của GAS / GWS

## GAS không còn là core

Đúng:

```txt
GAS = adapter hỗ trợ
```

Sai:

```txt
Business logic nằm trong Apps Script
```

## GAS chỉ dùng cho

```txt
- sync sheet
- form bridge
- lightweight automation
- import/export
- support legacy
```

---

# 5. Kiến trúc Integration

Tất cả hệ ngoài core đều là integration.

Ví dụ:

```txt
- Google Workspace
- Google Apps Script
- Lark
- Telegram
- Zalo
- MISA
- Email
- AI Provider
- OCR Provider
- Payment Gateway
```

---

# 6. Git Branch Strategy

## Branch chính

```txt
main
dev
```

## Branch triển khai

```txt
phase/*
feature/*
runtime/*
service/*
integration/*
experiment/*
release/*
hotfix/*
archive/*
```

Ví dụ:

```txt
phase/001-platform-bootstrap
runtime/task-engine
service/ai-runtime
integration/gas-support
feature/admin-web-ui
hotfix/auth-permission
```

---

# 7. Luồng Git chuẩn

```txt
feature/*
    ↓
phase/*
    ↓
dev
    ↓
release/*
    ↓
main
```

---

# 8. Quy tắc Production-safe

```txt
1. Không code trực tiếp trên main
2. Không merge nếu chưa có test report
3. Không redesign core tùy tiện
4. Không migration phá dữ liệu
5. Không automation-first
6. Không để integration giữ business truth
7. Mỗi phase phải có report
8. Mỗi module phải có test console
9. Append-only
10. Audit-friendly
```

---

# 9. Chuẩn thư mục phase

```txt
00_SYSTEM_BRAIN/
└─ PHASE_XXX/
   ├─ README.md
   ├─ SPEC.md
   ├─ IMPLEMENTATION_REPORT.md
   ├─ TEST_REPORT.md
   ├─ AI_HANDOFF.md
   └─ NEXT_STEP.md
```

---

# 10. Tầm nhìn hệ thống

## Giai đoạn đầu

```txt
Core = GAS + Sheet
```

## Giai đoạn giữa

```txt
Core = Runtime riêng
GAS = integration adapter
```

## Giai đoạn cao hơn

```txt
Operational Workspace OS
```

## Giai đoạn rất cao

```txt
Platform-based Operational Runtime
```

---

# 11. Kết luận cuối

LAOCONG_VOS_PLATFORM được định vị là:

```txt
Operational Runtime Platform
```

Trong đó:

```txt
Core Runtime
= independent operational brain

Integrations
= external capability layer
```

Google Workspace / GAS lúc này chỉ còn là:

```txt
1 integration trong hệ sinh thái
```
