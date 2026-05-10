# integrations/ — External Capability Layer

> **Integration KHÔNG giữ business truth.**
> Chỉ làm bridge / sync / import-export / notification / external API.

---

## 1. Định nghĩa

Integration là cầu nối giữa **Core Runtime** và **hệ ngoài** (Google Workspace, Apps Script, Lark, Telegram, Zalo, MISA, AI providers, OCR, payment, maps, email, storage, …).

Một integration đúng chuẩn LAOCONG_VOS phải:

- **Stateless** đối với business state (state nằm ở runtime, không nằm ở integration).
- Chỉ **expose adapter** dạng command/event-driven.
- **Không** chứa nghiệp vụ.
- **Không** ghi thẳng vào storage runtime mà không qua command.
- **Có audit log** mọi lần gọi ra ngoài.
- **Có timeout / retry / backoff** rõ ràng.

---

## 2. Integration sở hữu

```txt
- bridge        (cầu nối in/out)
- sync          (đồng bộ 1 chiều / 2 chiều)
- import/export (data movement)
- notification  (gửi message ra ngoài)
- external API  (gọi/được gọi bởi hệ ngoài)
```

## 3. Integration KHÔNG sở hữu

```txt
- workflow
- runtime
- state
- audit (chỉ ghi log gọi ngoài, không ghi audit nghiệp vụ)
- event (chỉ phát adapter event, không phát business event)
- permission
- contract
```

---

## 4. Danh sách integration

| Folder | Loại | Vai trò chính |
|---|---|---|
| `gas-support/` | Legacy / support | Adapter cho Apps Script cũ. Không phải core. |
| `google-workspace/` | Support | Drive / Gmail / Docs / Sheet bridge & report/export. |
| `lark/` | Messaging | Notification & bot. |
| `telegram/` | Messaging | Notification & bot. |
| `zalo/` | Messaging | Notification & ZNS. |
| `misa/` | ERP | Hoá đơn / kế toán bridge. |
| `openai/` | AI provider | LLM call (assist only). |
| `gemini/` | AI provider | LLM call (assist only). |
| `anthropic/` | AI provider | LLM call (assist only). |
| `email/` | Notification | SMTP / transactional email. |
| `payment/` | Payment | Cổng thanh toán. |
| `maps/` | Geo | Maps / geocoding / routing. |
| `storage/` | Storage | Object storage external (S3/R2/Drive). |
| `ocr/` | AI/OCR | OCR provider. |

---

## 5. Quy ước thư mục mỗi integration

```txt
integrations/<name>/
├─ README.md             # mô tả mục đích, scope, contract
├─ adapter/              # adapter implementation
├─ contracts/            # input/output contract (typed)
├─ bridge/               # bridge code (in/out)
├─ tests/                # adapter test, không phải nghiệp vụ
└─ test-console/         # test console riêng cho adapter
```

(Tạo theo từng phase — hiện tại còn placeholder.)

---

## 6. Quy tắc đỏ (red rules)

```txt
1. Integration KHÔNG được giữ business truth.
2. Integration KHÔNG được bypass command/event của runtime.
3. Integration KHÔNG được tự ý ghi vào DB nghiệp vụ.
4. Integration PHẢI được gọi qua adapter contract.
5. Integration PHẢI có log mọi lần gọi ra ngoài.
6. Integration PHẢI có human override (có thể tắt/ngừng).
7. Apps Script KHÔNG được trở lại làm core.
```
