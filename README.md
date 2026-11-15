# Code All Shape

Next.js 15, React 19 và TypeScript. Mẫu son dưỡng môi (Step Stack) dùng trực tiếp ba SVG do người dùng cung cấp, giữ nguyên path và hai khối nội dung tiếng Việt về dưỡng môi/làm đẹp đôi môi, với tông hồng berry–san hô–hồng trầm.

## Chạy local

```sh
npm install
npm run dev
```

- Trang chính: http://localhost:3210
- Đường dẫn tương thích: http://localhost:3210/shapes/step-stack-demo

Trang chính hiển thị lần lượt **Step Stack → AR5 — Arrow Ribbon → HFR6 — Heartwheel → VT4 — Tube Ribbon → IH8 — Heart Elements**, mỗi mẫu trong section độc lập. Không có header, menu, bảng hướng dẫn hay nút cấu hình. Cuộn xuống để xem các mẫu; nội dung dài cuộn tự nhiên thay vì bị cắt. HFR6 có sáu thẻ nội dung tương tác bên dưới vòng tròn trên mobile.

- Son dưỡng môi (Step Stack) độc lập vẫn ở http://localhost:3210/shapes/step-stack-demo, giữ nguyên hình học SVG và bố cục hai khối chữ.
- AR5 độc lập: http://localhost:3210/shapes/ar5-arrow-ribbon.
- HFR6 độc lập: http://localhost:3210/shapes/hfr6-heartwheel.
- VT4 độc lập: http://localhost:3210/shapes/vt4-tube-ribbon.
- IH8 độc lập: http://localhost:3210/shapes/ih8-heart-elements.

## Kiểm tra

```sh
npm run typecheck
npm run build
```

Để kiểm tra giao diện thủ công, chạy `npm run dev` rồi mở trang chính và các trang shape trên trình duyệt ở kích thước desktop/mobile.

## PN10 — Chai bút & năm mũi tên (shape 15)

- Xem riêng: http://localhost:3210/shapes/pn10-pencil-ribbon; theme đỏ/bạc: http://localhost:3210/shapes/pn10-pencil-ribbon?theme=silver-red.
- PN10 được thêm cuối trang chủ, không thay thế các mẫu trước. Giữ nền trắng, không dựng tiêu đề hoặc năm cột chú thích của ảnh tham chiếu.
- Component, CSS và config nội dung/màu: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/pn10-pencil-ribbon/`.
- 11 SVG mask chuẩn hóa + 11 bản gốc + manifest: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/pn10-pencil-ribbon/`.
- Icon dùng `react-icons/fa6`. Có hover/focus, chọn bằng chuột/chạm/bàn phím, phím ↑/↓/Home/End/Escape và giảm chuyển động.

## CB5 — Bảng kẹp & năm bước phát triển (shape 25)

- Xem riêng: http://localhost:3210/shapes/cb5-clipboard; mẫu thứ 14 ở cuối trang chủ.
- Giữ bố cục ảnh gốc: 5 mũi tên hướng trái, bảng checklist chồng phía phải, kẹp kim loại có lỗ treo phía trên, tiêu đề và 2 hàng × 9 icon phía dưới. Nền ngoài luôn trắng; nội dung tiếng Việt.
- Component/CSS: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/cb5-clipboard/`.
- 5 SVG mask và 5 bản SVG gốc: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/cb5-clipboard/`. Path mũi tên được hợp nhất để bỏ đường nối khử răng cưa; các shape khác chỉ crop viewBox, không vẽ lại path.
- Hình giữ tỉ lệ trên mobile, không đổi thành bố cục cột. Dùng phần trăm, em, media queries và `-webkit-mask`; không cần container queries, `cqw` hay JS để tính kích thước. Mobile dùng mô tả ngắn; tên truy cập của nút giữ nội dung đầy đủ. Có thể pinch-zoom để đọc chữ nhỏ trong infographic.
- Icon dùng `react-icons/fa6`; chạm/click để chọn, Tab/↑/↓/Home/End để điều hướng, Enter/Space để chọn, Escape bỏ chọn mà giữ focus. Tôn trọng reduced motion.
- Kiểm thử riêng (Node 22+, Chrome, server đang chạy): `node /Users/dangquangminh/Desktop/code_all_shape/scripts/check-cb5.mjs`. Có `TEST_BASE`, `TEST_OUTPUT`, `CHROME_BIN`; ảnh/kết quả mặc định tại `/tmp/cb5-check/`.
- Thư mục tài liệu nguồn shape 25 được xoá sau khi tích hợp; ứng dụng chỉ dùng tài nguyên trong public, không phụ thuộc thư mục nguồn.

## Responsive trên iPhone / iOS 15

- iPhone 7 Plus chạy tối đa iOS 15; Safari/WebView trên iOS này không hỗ trợ `@container`, `container-type` và `cqw` (Safari 16 mới hỗ trợ). Chỉ đổi chiều rộng trong Chrome DevTools không phát hiện được lỗi này.
- Các stylesheet dùng `cqw` phải có giá trị `calc(... * var(--<module>-cqw))` trước khai báo hiện đại. Biến dự phòng tính theo chiều rộng viewport, padding và giới hạn artboard của từng module. Riêng GB5 có hai hệ đơn vị riêng: toàn sân khấu và từng hộp quà.
- Các breakpoint `@container` có bản `@media` trong `@supports not (container-type: inline-size)`. Khi sửa layout phải cập nhật cả hai. Fallback CSS này dành cho các section toàn chiều rộng hiện tại; nếu nhúng vào sidebar hẹp trên trình duyệt cũ cần điều chỉnh kích thước dự phòng theo host.
- `text-size-adjust: 100%` ngăn Safari tự phóng chữ trong hình; không dùng `user-scalable=no` hoặc khóa mức zoom.
- Chạy server rồi kiểm tra bằng Node 22+ và Chrome có sẵn:
  ```bash
  cd /Users/dangquangminh/Desktop/code_all_shape
  npm run dev
  # Terminal khác:
  node /Users/dangquangminh/Desktop/code_all_shape/scripts/check-responsive.mjs
  # Kiểm tra production đã bật ở cổng khác:
  TEST_BASE=http://localhost:3212 node /Users/dangquangminh/Desktop/code_all_shape/scripts/check-responsive.mjs
  ```
- Có thể đặt `CHROME_BIN`, `TEST_WIDTHS`, `TEST_MODES` và `TEST_OUTPUT`. Mặc định kiểm tra 320–1440px, cả CSS hiện đại và CSS bỏ các tính năng chưa có trên iOS 15; ảnh/kết quả ở `/tmp/shape-responsive-check/`.
- Đây là kiểm tra hồi quy bằng Chrome CDP, **không phải máy ảo iOS**. Trước phát hành cần kiểm tra Safari và trình duyệt trong Messenger trên iPhone thật, cả dọc/ngang, zoom, cuộn, chạm chọn và sau khi tải lại bản deploy mới.

## Các file chính

Với workspace hiện tại `/Users/dangquangminh/Desktop/code_all_shape`:

- `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/step-stack-demo/`: ba SVG `ssd-stack-top.svg`, `ssd-stack-mid.svg`, `ssd-stack-base.svg`.
- `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/step-stack-demo/StepStackDemo.tsx`: component và liên kết hover/focus.
- `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/step-stack-demo/step-stack-demo.css`: hình học, mask, màu và responsive.
- `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/step-stack-demo/step-stack-demo.config.ts`: số và nội dung.

Không có alias SVG hoặc tùy chọn đảo thứ tự. Bản desktop giữ tháp bên trái và hai khối chữ so le bên phải; trên mobile chữ chuyển xuống dưới để dễ đọc. Không sử dụng ảnh hay khối nội dung ở góc phải dưới của ảnh tham chiếu.

## AR5 — Arrow Ribbon

- SVG đặt trực tiếp trong folder riêng: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/ar5-arrow-ribbon/`, không thêm thư mục con.
- Component, CSS, icon và cấu hình nội dung: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/ar5-arrow-ribbon/`.
- Năm hàng độc lập: đỏ, vàng, lục, lam ngọc, tím; huy hiệu bạc, tab số 01–05, năm SVG icon inline. Nội dung tiếng Việt mẫu sửa trong `ar5-arrow-ribbon.config.ts` tại folder component trên.
- Đã có đủ ba SVG shape gốc trong folder AR5; giữ nguyên path và crop viewBox theo bounds thực tế. Server bật mask từ file có sẵn; CSS chỉ làm dự phòng khi file thiếu hoặc không đọc được. Production có thể cần restart/redeploy để phục vụ public file mới.
- Hover, focus, chạm chỉ highlight trong AR5; phím ↑/↓, Home/End đổi hàng; Escape bỏ highlight nhưng giữ focus. Giảm chuyển động theo hệ thống.
- Mobile dưới 640px ẩn số lớn bên phải, giữ tab số và icon; chữ không bị mask hay cắt. Section có thể cao hơn viewport để giữ đủ 5 hàng dễ đọc.
- Component nhận `theme="silver-red"` và `clean` nếu cần đổi sang bạc/đỏ hoặc nền trắng; mặc định giữ 5 màu theo ảnh. Không có nút điều khiển theme trên giao diện.
- Không thêm Blade, jQuery, thư viện icon hay font bên ngoài: tích hợp bằng Next.js/React sẵn có.

## HFR6 — Heartwheel

- Bảy file SVG chuẩn hóa (`viewBox="0 0 640 640"`) đặt trực tiếp trong `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/hfr6-heartwheel/`: `hfr6-sector-01-north.svg` … `hfr6-sector-06-north-west.svg` và `hfr6-core-heart.svg`.
- Component, CSS và cấu hình nội dung + 6 icon inline: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/hfr6-heartwheel/`.

## VT4 — Tube Ribbon

- Bảy file SVG mask đặt trực tiếp trong `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/vt4-tube-ribbon/`.
- Component, CSS và cấu hình: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/vt4-tube-ribbon/`.

## IH8 — Heart Elements

- Chín file SVG mask (8 mảnh ghép trái tim + 1 lõi tim trắng) đặt trực tiếp trong `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/ih8-heart-elements/`: `ih8-heart-crown-left.svg`, `ih8-heart-crown-right.svg`, `ih8-heart-shoulder-left.svg`, `ih8-heart-shoulder-right.svg`, `ih8-heart-curve-left.svg`, `ih8-heart-curve-right.svg`, `ih8-heart-point-left.svg`, `ih8-heart-point-right.svg` và `ih8-core-heart-surface.svg`.
- Component, CSS và cấu hình (kèm vector Font Awesome Free 6.7.2): `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/ih8-heart-elements/`.
