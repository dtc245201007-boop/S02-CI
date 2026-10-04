# S-16 - Bên nhận xác nhận hoặc từ chối bàn giao kèm lý do

## User story
Là hợp tác xã sở chế, tôi muốn việc nhận lô phải có xác nhận của tôi để không bị đẩy trách nhiệm một lô hàng mà tôi chưa thực sự nhận.

## Acceptance Criteria

1. **Xác nhận:** Khi bên nhận xác nhận, quyền xử lý chuyển sang bên nhận và ghi một sự kiện xác nhận.
2. **Từ chối có lý do:** Khi từ chối, lý do được ghi vào chuỗi sự kiện.
3. **Từ chối không có lý do:** Hệ thống chặn thao tác.
4. **Sai người gọi API:** Nếu người gọi không phải bên nhận được chỉ định, API trả về HTTP `403`.

## Chạy test

```bash
npm test
```

Nếu máy chưa có Node.js, có thể chạy:

```bash
node test/calculator.test.js
```

## Cấu trúc

```text
S02-CI/
├── src/
│   └── calculator.js
├── test/
│   └── calculator.test.js
├── package.json
└── README.md
```
