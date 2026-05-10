---
description: LAOCONG_VOS_PLATFORM — operational runtime platform rules. Always apply.
alwaysApply: true
---

# LAOCONG_VOS_PLATFORM — Cursor Rules

> Quy tắc bắt buộc cho mọi tác vụ AI / human trong repo này.
> Đọc kỹ trước khi đề xuất hoặc thực hiện thay đổi.

---

## 1. Định vị

LAOCONG_VOS_PLATFORM là **Operational Runtime Platform** /
**Operational Workspace OS**, KHÔNG phải:

- hệ Google Sheet + Apps Script làm trung tâm
- automation script collection
- AI demo / chatbot wrapper

Triết lý cốt lõi:

```txt
Operational-runtime-first
+ Human-guided
+ AI-assisted
+ Append-only
+ Audit-first
+ Event-driven
+ Production-safe
```

---

## 2. Boundary bắt buộc

### Core Runtime (`runtime/`) sở hữu

```txt
workflow • runtime • state • audit • event • permission • contract
```

### Integration (`integrations/`) sở hữu

```txt
bridge • sync • import/export • notification • external API
```

### Tuyệt đối KHÔNG

```txt
- Không để integration giữ business truth.
- Không để Apps Script / Google Workspace trở lại làm core runtime.
- Không tạo folder apps-script/ ở root.
- Không cho UI ghi thẳng vào DB.
- Không cho service tự sửa state nghiệp vụ ngoài command-engine.
- Không cho AI tự quyết định runtime — AI chỉ assist.
```

---

## 3. Refactor & migration rules

```txt
1. KHÔNG redesign core runtime một cách tuỳ tiện.
2. KHÔNG destructive migration (không xoá dữ liệu, không phá schema).
3. KHÔNG automation-first (mặc định human-in-the-loop).
4. KHÔNG xoá file cũ trong lúc refactor cấu trúc.
5. KHÔNG rename gây mất liên kết import nếu chưa kiểm tra hết tham chiếu.
6. KHÔNG sửa business logic khi chỉ refactor cấu trúc thư mục.
7. CHỈ append — file legacy được đánh dấu DEPRECATED, không xoá.
```

---

## 4. Báo cáo & phase

```txt
1. Mỗi phase PHẢI có folder 00_SYSTEM_BRAIN/phase-reports/PHASE_XXX_<NAME>/
2. Mỗi phase PHẢI có 6 file:
   README.md, SPEC.md, IMPLEMENTATION_REPORT.md,
   TEST_REPORT.md, AI_HANDOFF.md, NEXT_STEP.md
3. Mỗi thay đổi cấu trúc PHẢI được liệt kê trong IMPLEMENTATION_REPORT.md.
4. Quyết định kiến trúc lớn PHẢI có ADR ở 00_SYSTEM_BRAIN/decisions/.
5. Append-only: KHÔNG xoá nội dung tài liệu cũ, chỉ thêm/sửa.
```

---

## 5. Test Console Standard

```txt
1. Mọi engine trong runtime/ PHẢI có Test Console riêng trước khi merge.
2. Mọi adapter trong integrations/ PHẢI có Test Console mock external.
3. Test Console dùng chung packages/test-console-kit/.
4. Test Console PHẢI chạy được offline (không cần prod data).
5. PR vào dev PHẢI kèm bằng chứng Test Console pass.
```

---

## 6. Git hygiene

```txt
1. KHÔNG code trực tiếp trên main.
2. KHÔNG merge nếu chưa có TEST_REPORT.md.
3. KHÔNG push nếu user chưa yêu cầu rõ ràng.
4. Branch phải theo naming chuẩn: phase/* feature/* runtime/* service/*
   integration/* experiment/* release/* hotfix/* archive/*
5. Luồng: feature/* → phase/* → dev → release/* → main.
6. Xem chi tiết: docs/GIT_BRANCH_STRATEGY.md.
```

---

## 7. AI behavior (cho Cursor / agent)

```txt
1. Trước khi sửa code, đọc tài liệu trong 00_SYSTEM_BRAIN/architecture/.
2. Trước khi tạo file mới, kiểm tra cấu trúc tại docs/REPO_STRUCTURE.md.
3. Khi đụng tới integration, đọc docs/INTEGRATION_BOUNDARY.md.
4. Khi đụng tới runtime, đọc runtime/README.md.
5. KHÔNG tự ý refactor cross-layer. Đề xuất ADR trước.
6. KHÔNG tự ý tạo code khi user chỉ yêu cầu refactor cấu trúc.
7. KHÔNG tự ý xoá hoặc đổi tên file. Hỏi trước.
8. Mọi tác vụ scaffold phải có report tương ứng trong 00_SYSTEM_BRAIN.
9. AI là Operational Assistant — KHÔNG phải boss / autonomous controller.
```

---

## 8. Quy tắc đỏ (red rules — không bao giờ vi phạm)

```txt
RED-1  Không xoá dữ liệu / không destructive migration.
RED-2  Không để integration giữ business truth.
RED-3  Không cho GAS quay lại làm core.
RED-4  Không bypass command-engine để ghi state.
RED-5  Không bỏ human override.
RED-6  Không bỏ audit log.
RED-7  Không merge main mà không qua release/*.
RED-8  Không push khi chưa được yêu cầu.
RED-9  Không tự quyết định kiến trúc lớn — phải ADR.
RED-10 Không chạy code production khi đang refactor.
```

---

## 9. Tham chiếu

- [`README.md`](../../README.md)
- [`docs/REPO_STRUCTURE.md`](../../docs/REPO_STRUCTURE.md)
- [`docs/GIT_BRANCH_STRATEGY.md`](../../docs/GIT_BRANCH_STRATEGY.md)
- [`docs/INTEGRATION_BOUNDARY.md`](../../docs/INTEGRATION_BOUNDARY.md)
- [`runtime/README.md`](../../runtime/README.md)
- [`integrations/README.md`](../../integrations/README.md)
- [`integrations/gas-support/README.md`](../../integrations/gas-support/README.md)
- [`00_SYSTEM_BRAIN/architecture/README.md`](../../00_SYSTEM_BRAIN/architecture/README.md)
