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
