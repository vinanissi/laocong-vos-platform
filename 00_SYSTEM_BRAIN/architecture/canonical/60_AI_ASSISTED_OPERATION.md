# 60 — AI-assisted Operation

## Status
Draft Canonical

## Purpose

Định nghĩa **vai trò chính thức của AI** trong LAOCONG_VOS_PLATFORM.

LAOCONG_VOS đi theo **AI-assisted**, KHÔNG phải AI-first / AI-controlled.
AI là **Operational Assistant** — hỗ trợ con người vận hành, KHÔNG thay thế
người vận hành và KHÔNG quyết định runtime.

---

## Core Principles

```txt
1. AI = Operational Assistant.
2. Human luôn là người quyết định cuối.
3. AI chỉ được suggest / draft / detect / summarize / analyze / recommend.
4. AI KHÔNG được tự dispatch command nghiệp vụ.
5. AI KHÔNG được tự ghi state nghiệp vụ.
6. AI KHÔNG được tự override.
7. AI có audit log riêng (mọi prompt + response + provider + tokens).
8. AI có kill switch — disable bất cứ lúc nào.
```

---

## AI là gì

```txt
AI = Operational Assistant
```

AI **được phép**:

```txt
- summarize    : tóm tắt nội dung (hồ sơ, ticket, cuộc hội thoại, log).
- suggest      : gợi ý hành động ("nên reassign cho ai", "nên ưu tiên case nào").
- analyze      : phân tích pattern (bottleneck, trễ SLA, anomaly).
- detect       : phát hiện missing data, duplicate, suspicious entry.
- draft        : soạn nháp (email reply, response, report).
- recommend    : đề xuất routing / phân công / template phù hợp.
- observe      : đọc event store / projection (read-only).
```

AI **KHÔNG được phép**:

```txt
- boss                     : ra lệnh cho người vận hành.
- autonomous controller    : tự quyết workflow.
- unrestricted agent       : truy cập tự do mọi thứ.
- self-dispatch command    : tự gửi command nghiệp vụ (vd. tự duyệt hồ sơ, tự xoá task).
- bypass permission        : tự cấp quyền cho mình.
- modify audit             : sửa audit log.
- override                 : kích hoạt human-override pathway.
```

---

## Autonomous zones (L5) — chỉ định nghĩa, chưa enable production

Có **một số** tác vụ AI có thể tự trị (KHI hệ trưởng thành tới L5):

```txt
✅ Reminder            : nhắc lịch / SLA / handoff.
✅ Summarize           : tự sinh tóm tắt cuối ngày / cuối case.
✅ Missing data detection : phát hiện hồ sơ thiếu thông tin.
✅ Lightweight routing : route case nhỏ theo policy đã định.
✅ SLA escalation      : escalate khi quá hạn theo rule.
✅ Queue balancing     : đề xuất chia lại queue cho fair load.
✅ Suggest assignment  : gợi ý người phù hợp (KHÔNG tự assign).
```

KHÔNG được tự trị (kể cả ở L5):

```txt
❌ Tài chính lớn         : duyệt thanh toán, chuyển tiền, refund > ngưỡng.
❌ Pháp lý               : ký, gửi văn bản pháp lý, từ chối quyền.
❌ Destructive actions   : xoá hồ sơ / đóng vĩnh viễn / huỷ contract.
❌ Quyền hệ thống        : cấp/thu role, phân quyền tenant.
❌ Invoice final approval: duyệt cuối hoá đơn / xuất chứng từ.
```

> Giai đoạn 1 (L1–L3) **chưa enable** autonomous zones. Tất cả các action AI
> "có vẻ tự trị" vẫn yêu cầu human confirm. L5 là kiến trúc cho phép, không
> phải mặc định bật.

---

## AI runtime contract (services/ai-runtime)

`services/ai-runtime` là orchestration layer cho mọi AI provider.

Trách nhiệm:

```txt
- Quản lý prompt template (versioned).
- Provider routing (chọn openai / gemini / anthropic theo policy).
- Rate limit + quota tracking.
- Streaming response handling.
- Audit (prompt + response + provider + tokens + latency + cost).
- Suggestion → command preview (user accept mới dispatch command thật).
```

KHÔNG trách nhiệm:

```txt
- Quyết định nghiệp vụ.
- Ghi state.
- Phát business event.
- Override permission.
- Truy cập tài nguyên ngoài scope đã được runtime cho phép.
```

Mọi AI suggestion đi vào nghiệp vụ:

```txt
1. ai-runtime tạo "suggested command" (suggestion mode).
2. UI hiển thị suggestion + cho human review.
3. Human accept → UI dispatch command thật vào runtime.
4. Human reject → audit "AI_SUGGESTION_REJECTED" với optional reason.
```

---

## AI audit (bắt buộc)

Mọi AI call PHẢI ghi audit:

```txt
- ai_session_id        (uuid)
- ai_provider          (openai | gemini | anthropic | ...)
- ai_model             (model name + version)
- prompt_template_id   + version
- prompt_input_hash    (không lưu PII raw nếu sensitive)
- response_summary     (hoặc hash)
- input_tokens / output_tokens
- latency_ms
- cost_estimated
- triggered_by_user_id
- trace_id / correlation_id
- mode                 (assist | suggest | observe)
```

AI audit **không phải** business audit:

- AI audit = ghi việc AI đã làm gì.
- Business audit = ghi việc nghiệp vụ đã xảy ra gì.
- Hai cái KHÔNG gộp; AI suggestion bị reject KHÔNG tạo business event,
  chỉ tạo AI audit entry.

---

## Strategy "Build for L2/L3, Architect for L4, Guardrail for L5"

```txt
RUN  : L1 + L2 + một phần L3   (UX guidance + queue/routing/validation/SLA + AI summarize/detect)
ARCH : L4-ready                 (capability-based, tool-callable, policy-aware, multi-agent ready)
GUARD: L5                       (autonomous zones có rule + audit + kill switch)
```

Chi tiết maturity model: xem [`./80_MATURITY_MODEL.md`](./80_MATURITY_MODEL.md).

---

## Anti-patterns (CẤM)

```txt
❌ AI tự dispatch command nghiệp vụ ("AI auto-approve invoice").
❌ AI tự override SLA / permission.
❌ AI ghi thẳng DB nghiệp vụ.
❌ AI tự cấp quyền cho mình ("expand scope").
❌ AI gọi AI khác liên hoàn không có người ở giữa (agent loop tự trị tài chính/pháp lý).
❌ AI prompt không versioned (không reproducible).
❌ AI response không audit (không truy nguyên được).
❌ "Magic AI button" trên UI không hiển thị suggestion để user review.
```

---

## Guardrails

```txt
G-1  AI là assistant, KHÔNG là controller.
G-2  AI KHÔNG tự dispatch command nghiệp vụ.
G-3  AI KHÔNG tự ghi state.
G-4  AI KHÔNG tự override.
G-5  AI có kill switch (disable từ runtime).
G-6  AI suggestion PHẢI human-confirmed trước khi vào runtime.
G-7  AI prompt PHẢI versioned.
G-8  AI call PHẢI có audit (provider, model, tokens, cost, latency, hash).
G-9  AI KHÔNG được loop tự trị cho tài chính lớn / pháp lý / destructive / quyền hệ thống / invoice final approval.
G-10 AI có rate limit + quota; vượt quota → fail-safe (downgrade to suggestion-only).
```

---

## Non-goals

```txt
- Không "AI agent autonomous" cho nghiệp vụ chốt.
- Không "AI as approver".
- Không AI tự build workflow mới production.
- Không AI gọi external API tài chính trực tiếp.
- Không gộp AI audit với business audit.
- Không hide-by-default AI suggestion (phải hiện rõ cho user review).
```

---

## References

- Source: [`../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md`](../source-notes/SOURCE_NOTE_20260510_00-prompt-philosophy.md) (sec I — Triết lý cốt lõi; sec V — Vai trò L3 AI; sec XIII — AI triết lý đúng; sec XIV — Autonomous zones)
- ADR-0001 — Adopt Operational Runtime Platform.
- ADR-0005 — Human-override Policy.
- Maturity model: [`./80_MATURITY_MODEL.md`](./80_MATURITY_MODEL.md)
- Override policy: [`./50_HUMAN_OVERRIDE_POLICY.md`](./50_HUMAN_OVERRIDE_POLICY.md)
- Layer README: [`../../../services/README.md`](../../../services/README.md) (services/ai-runtime)
- Integrations: [`../../../integrations/README.md`](../../../integrations/README.md) (openai / gemini / anthropic)

---

## Last reviewed

```txt
2026-05-10  — Phase 002 Turn 3 — Initial canonical version.
```
