# Code All Shape

Next.js 15, React 19 và TypeScript. Mẫu Step Stack dùng trực tiếp ba SVG do người dùng cung cấp, giữ nguyên path và hai khối nội dung tiếng Việt.

## Chạy local

```sh
npm install
npm run dev
```

- Trang tổng hợp: http://localhost:3000
- Mẫu riêng: http://localhost:3000/shapes/step-stack-demo

## Kiểm tra

```sh
npm run typecheck
npm run build
```

Để kiểm tra giao diện, giữ một server đang chạy và mở terminal khác:

```sh
npm run test:ui
```

Bài test dùng Node.js 22+ và Chrome headless có sẵn trên máy, không thêm framework/dependency. Trên macOS, tự tìm Google Chrome; trên hệ điều hành khác, đặt biến `CHROME_BIN` trỏ đến executable Chromium/Chrome. Có thể đặt `BASE_URL` để kiểm tra server khác (mặc định http://127.0.0.1:3000).

Bài test kiểm tra cả hai route ở desktop/tablet/mobile, SVG tải thành công và viewBox khớp path, căn trục và tỉ lệ ba tầng, hai khối nội dung, hover hai chiều, keyboard focus, màu đế và reduced motion. Ảnh chụp được lưu vào thư mục tạm và đường dẫn được in khi test chạy.

## Các file chính

Với workspace hiện tại `/Users/dangquangminh/Desktop/code_all_shape`:

- `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/step-stack-demo/`: ba SVG `ssd-stack-top.svg`, `ssd-stack-mid.svg`, `ssd-stack-base.svg`.
- `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/step-stack-demo/StepStackDemo.tsx`: component và liên kết hover/focus.
- `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/step-stack-demo/step-stack-demo.css`: hình học, mask, màu và responsive.
- `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/step-stack-demo/step-stack-demo.config.ts`: số và nội dung.

Không có alias SVG hoặc tùy chọn đảo thứ tự. Bản desktop giữ tháp bên trái và hai khối chữ so le bên phải; trên mobile chữ chuyển xuống dưới để dễ đọc. Không sử dụng ảnh hay khối nội dung ở góc phải dưới của ảnh tham chiếu.
