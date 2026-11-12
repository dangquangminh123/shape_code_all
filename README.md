# Code All Shape

Next.js 15, React 19 và TypeScript. Mẫu Step Stack dùng trực tiếp ba SVG do người dùng cung cấp, giữ nguyên path và hai khối nội dung tiếng Việt.

## Chạy local

```sh
npm install
npm run dev
```

- Trang chính: http://localhost:3000
- Đường dẫn tương thích: http://localhost:3000/shapes/step-stack-demo

Trang chính hiển thị Step Stack trong section đầu tiên tràn màn hình, nền trắng; ngay bên dưới là AR5 — Arrow Ribbon với 5 hàng mũi tên trên nền bạc nhạt riêng. Mỗi cụm được căn giữa section của nó, không có header, menu, khung card, bảng hướng dẫn hay nút cấu hình. Cuộn xuống để xem AR5; nội dung dài được cuộn tự nhiên thay vì bị cắt.

- Step Stack độc lập vẫn ở http://localhost:3000/shapes/step-stack-demo, không thay đổi component/CSS/SVG cũ.
- AR5 độc lập: http://localhost:3000/shapes/ar5-arrow-ribbon.

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

Bộ test Step Stack kiểm tra trang chính và route độc lập tại 11 kích thước desktop/tablet/mobile và landscape (320–2560px): section phủ viewport, không còn header/card/điều khiển, tâm thực của cụm shape + nội dung trùng tâm section, không tràn ngang hay cắt nội dung. Trang chính cho phép cuộn xuống AR5; route Step Stack độc lập không cuộn thừa khi nội dung vừa màn hình. Đồng thời kiểm tra SVG tải thành công, viewBox khớp path, tỉ lệ và thứ tự ba tầng, hai khối nội dung, hover hai chiều, keyboard focus và reduced motion. Ảnh chụp được lưu vào thư mục tạm và đường dẫn được in khi test chạy.

## Các file chính

Với workspace hiện tại `/Users/dangquangminh/Desktop/code_all_shape`:

- `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/step-stack-demo/`: ba SVG `ssd-stack-top.svg`, `ssd-stack-mid.svg`, `ssd-stack-base.svg`.
- `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/step-stack-demo/StepStackDemo.tsx`: component và liên kết hover/focus.
- `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/step-stack-demo/step-stack-demo.css`: hình học, mask, màu và responsive.
- `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/step-stack-demo/step-stack-demo.config.ts`: số và nội dung.

Không có alias SVG hoặc tùy chọn đảo thứ tự. Bản desktop giữ tháp bên trái và hai khối chữ so le bên phải; trên mobile chữ chuyển xuống dưới để dễ đọc. Không sử dụng ảnh hay khối nội dung ở góc phải dưới của ảnh tham chiếu.

## AR5 — Arrow Ribbon

- SVG đặt trực tiếp trong folder riêng: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/ar5-arrow-ribbon/`, không thêm thư mục con.
- Hướng dẫn tên file và viewBox: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/ar5-arrow-ribbon/README.md`.
- Component, CSS, icon và cấu hình nội dung: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/ar5-arrow-ribbon/`.
- Năm hàng độc lập: đỏ, vàng, lục, lam ngọc, tím; huy hiệu bạc, tab số 01–05, năm SVG icon inline. Nội dung tiếng Việt mẫu sửa trong `ar5-arrow-ribbon.config.ts` tại folder component trên.
- Đã có đủ ba SVG shape gốc trong folder AR5; giữ nguyên path và crop viewBox theo bounds thực tế. Server bật mask từ file có sẵn; CSS chỉ làm dự phòng khi file thiếu hoặc không đọc được. Production có thể cần restart/redeploy để phục vụ public file mới.
- Hover, focus, chạm chỉ highlight trong AR5; phím ↑/↓, Home/End đổi hàng; Escape bỏ highlight nhưng giữ focus. Giảm chuyển động theo hệ thống.
- Mobile dưới 640px ẩn số lớn bên phải, giữ tab số và icon; chữ không bị mask hay cắt. Section có thể cao hơn viewport để giữ đủ 5 hàng dễ đọc.
- Component nhận `theme="silver-red"` và `clean` nếu cần đổi sang bạc/đỏ hoặc nền trắng; mặc định giữ 5 màu theo ảnh. Không có nút điều khiển theme trên giao diện.
- Không thêm Blade, jQuery, thư viện icon hay font bên ngoài: tích hợp bằng Next.js/React sẵn có.

`npm run test:ui` chạy cả bộ test Step Stack và AR5. Có thể chạy riêng `npm run test:step-stack` hoặc `npm run test:ar5`. Bộ AR5 kiểm tra 10 viewport (320–2560px), thứ tự section, 5 hàng/5 icon, nội dung nằm trong arrow, asset/fallback, hover/keyboard/touch, theme và reduced motion. Ba SVG gốc được kiểm tra HTTP 200, mask bật đúng URL trực tiếp và viewBox khớp bounds của path.
