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

## LM6 — Cấp độ & cột mốc (shape 1)

- Xem riêng: http://localhost:3210/shapes/lm6-levels-marks; mẫu thứ 17, sau PB4 trên trang chủ.
- Giữ bố cục ảnh 960 × 720 nhưng **bỏ dòng tiêu đề “Levels And Marks – 6 Stages”** vì trùng với nội dung infographic; canvas cắt còn **960 × 610** (bỏ 110px trên, không giữ dải trắng của tiêu đề). Còn lại: sáu khối mũi tên nối ngang, cạnh vát đen, số 1–6, phản chiếu ngắn phía dưới và chú thích xen kẽ (1/3/5 trên, 2/4/6 dưới). Nền toàn bộ trắng, không chuyển thành danh sách/cột trên điện thoại; tên vùng vẫn đọc được nhờ `aria-label` trên `<section>`.
- Component, CSS và cấu hình nội dung/màu: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/lm6-levels-marks/`. Canvas tối đa 1320px. Nội dung tiếng Việt; `FaCircle` từ `react-icons/fa6` giữ dấu đầu dòng nhỏ như ảnh, không thêm icon lớn làm đổi bố cục.
- Tài nguyên: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/lm6-levels-marks/`. Hai SVG Illustrator được lưu nguyên byte trong `originals`, ảnh JPG và SHA-256 trong `manifest.json`. Bốn mặt của SVG 1 được tách thành mask, SVG 2 làm mặt phản chiếu; path/polygon giữ nguyên. CSS tạo khe trắng chéo giữa các khối và tô gradient.
- Tái tạo mask: `node /Users/dangquangminh/Desktop/code_all_shape/scripts/generate_lm6_assets.mjs`. Không phụ thuộc thư mục nhập `shape 1` sau khi di chuyển tài nguyên.
- Responsive dùng phần trăm, em, `min`/`clamp`, media queries và cả `-webkit-mask`; không phụ thuộc container queries, `cqw`, `:has`, `dvh` hoặc JS đo kích thước. Dưới 601px dùng nội dung rút gọn, tên truy cập của nút vẫn giữ đầy đủ nội dung. Cho phép pinch-zoom; trên điện thoại chữ nhỏ để bảo toàn bố cục sáu giai đoạn.
- Click/chạm chọn một giai đoạn, click lại để bỏ chọn. Tab/←/→/Home/End điều hướng, Enter/Space chọn, Escape bỏ chọn và giữ focus. Có focus ring và reduced-motion. Hình/chữ vẫn hiển thị khi tắt JavaScript.
- Kiểm thử riêng: `node /Users/dangquangminh/Desktop/code_all_shape/scripts/check-lm6.mjs` (Node 22+, Chrome và server đang chạy). Có `TEST_BASE`, `TEST_OUTPUT`, `CHROME_BIN`; ảnh/kết quả mặc định `/tmp/lm6-check/`. Phủ 320–1920px, breakpoint 600/601, iPhone 7 Plus 414 × 736 / 736 × 414, tràn chữ/hình, tọa độ bố cục, chạm/phím, zoom, SSR và mask tiền tố.
- `scripts/check-responsive.mjs` kiểm tra cả 17 mẫu. Kiểm tra fallback bằng Chrome **không thay thế Safari/iPhone thật**; trước phát hành cần kiểm tra thiết bị thật (dọc/ngang, cuộn tới chú thích cuối, zoom, chạm, trình duyệt trong ứng dụng).

## PN10 — Chai bút & năm mũi tên (shape 15)

- Xem riêng: http://localhost:3210/shapes/pn10-pencil-ribbon; theme đỏ/bạc: http://localhost:3210/shapes/pn10-pencil-ribbon?theme=silver-red.
- PN10 được thêm cuối trang chủ, không thay thế các mẫu trước. Giữ nền trắng, không dựng tiêu đề hoặc năm cột chú thích của ảnh tham chiếu.
- Component, CSS và config nội dung/màu: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/pn10-pencil-ribbon/`.
- 11 SVG mask chuẩn hóa + 11 bản gốc + manifest: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/pn10-pencil-ribbon/`.
- Icon dùng `react-icons/fa6`. Có hover/focus, chọn bằng chuột/chạm/bàn phím, phím ↑/↓/Home/End/Escape và giảm chuyển động.

## CB5 — Bảng kẹp & năm bước phát triển (shape 25)

- Xem riêng: http://localhost:3210/shapes/cb5-clipboard; mẫu thứ 14 trên trang chủ.
- Chỉ giữ infographic chính: 5 mũi tên hướng trái, bảng checklist chồng phía phải và kẹp kim loại có lỗ treo phía trên. Đã bỏ tiêu đề “business infographic” và hai hàng icon trang trí, không giữ khoảng trống của hai phần này. Nền ngoài luôn trắng; nội dung tiếng Việt.
- Component/CSS: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/cb5-clipboard/`.
- 5 SVG mask và 5 bản SVG gốc: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/cb5-clipboard/`. Path mũi tên được hợp nhất để bỏ đường nối khử răng cưa; các shape khác chỉ crop viewBox, không vẽ lại path.
- Hình giữ tỉ lệ trên mobile, không đổi thành bố cục cột. Dùng phần trăm, em, media queries và `-webkit-mask`; không cần container queries, `cqw` hay JS để tính kích thước. Mobile dùng mô tả ngắn; tên truy cập của nút giữ nội dung đầy đủ. Có thể pinch-zoom để đọc chữ nhỏ trong infographic.
- Icon dùng `react-icons/fa6`; chạm/click để chọn, Tab/↑/↓/Home/End để điều hướng, Enter/Space để chọn, Escape bỏ chọn mà giữ focus. Tôn trọng reduced motion.
- Kiểm thử riêng (Node 22+, Chrome, server đang chạy): `node /Users/dangquangminh/Desktop/code_all_shape/scripts/check-cb5.mjs`. Có `TEST_BASE`, `TEST_OUTPUT`, `CHROME_BIN`; ảnh/kết quả mặc định tại `/tmp/cb5-check/`.
- Thư mục tài liệu nguồn shape 25 được xoá sau khi tích hợp; ứng dụng chỉ dùng tài nguyên trong public, không phụ thuộc thư mục nguồn.

## TC5 — Năm cúp thành tựu (shape 12)

- Xem riêng: http://localhost:3210/shapes/tc5-trophy-cups; mẫu thứ 15 ở cuối trang chủ.
- Giữ bố cục tham chiếu 715 × 500: năm cúp nối ngang, quai có khoảng trắng phân lớp, thân có mảng chéo, bệ STEP 01–05 và năm cụm chữ phía dưới. Đã bỏ cụm tiêu đề “Thành tựu”, mô tả ngắn và bục vinh danh phía trên bên phải; giữ nguyên vị trí, kích thước năm cúp và nền trắng.
- Component/CSS/config: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/tc5-trophy-cups/`.
- Hai SVG mask + hai SVG gốc byte-for-byte: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/tc5-trophy-cups/`. Chỉ crop viewBox; giữ nguyên cả hai path trong mỗi SVG. Tái tạo mask: `node /Users/dangquangminh/Desktop/code_all_shape/scripts/generate_tc5_assets.mjs`.
- `react-icons/fa6` và `react-icons/lu`, không thêm thư viện. Chạm/Enter/Space để chọn; Tab/←/→/Home/End điều hướng, Escape bỏ chọn mà giữ focus. Hover và chọn không dịch chuyển hình học.
- Giữ năm cúp trên một hàng ở mobile; chữ mô tả ngắn thay cho mô tả dài, nội dung đầy đủ vẫn nằm trong tên truy cập của nút. Chữ nhỏ là đánh đổi của bố cục infographic cố định; pinch-zoom luôn được phép. Không dùng `cqw`, `@container`, `dvh` hoặc JS để tính kích thước; có `-webkit-mask` cho iOS 15.
- Kiểm thử: `node /Users/dangquangminh/Desktop/code_all_shape/scripts/check-tc5.mjs` (Node 22+, Chrome, server đang chạy). Có `TEST_BASE`, `TEST_OUTPUT`, `CHROME_BIN`; mặc định ghi kết quả vào `/tmp/tc5-check/`.
- Kiểm thử gồm 320–1440 px, iPhone 7 Plus dọc/ngang (414 × 736, 736 × 414), font hệ thống, chỉ dùng mask có tiền tố WebKit, bàn phím, chạm, zoom 200%, reduced motion, SSR không JavaScript và kiểm tra path SVG không bị thay đổi. Đây là kiểm thử Chrome, không phải xác nhận chạy trên iPhone thật.
- Thư mục tài liệu nguồn shape 12 trong dự án được xoá sau khi tích hợp và đối chiếu SVG. Ứng dụng không tham chiếu thư mục này.

## PB4 — Bình bơm bốn bước chăm sóc da (shape 29)

- Xem riêng: http://localhost:3210/shapes/pb4-pump-bottle; mẫu thứ 16 cuối trang chủ.
- Giữ artboard 525 × 350, nắp bơm xanh ngọc, thân bình tròn bốn dải màu 01–04, cung nối và bốn chấm/chú thích bên phải, bóng đổ mỏng và nền trắng. Nội dung tiếng Việt và icon `react-icons/lu`, không thêm thư viện.
- Kích thước hiển thị tối đa 1.320 × 880px (tăng 20% so với bản 1.100px), giữ nguyên tỉ lệ bình/cung nối. Số, tiêu đề, mô tả, icon và chấm nối tăng riêng để dễ đọc hơn; mô tả mobile 9–12px và vẫn cho phép pinch-zoom.
- Component/CSS/config: `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/pb4-pump-bottle/`.
- Sáu SVG mask và bản gốc byte-for-byte cùng ảnh tham chiếu nằm tại `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/pb4-pump-bottle/`. Crop viewBox, không vẽ lại path. Bốn dải được đặt riêng và cắt bởi mask thân bình; hình học SVG nguồn có sai khác nhỏ so với ảnh raster tham chiếu.
- Tái tạo mask: `node /Users/dangquangminh/Desktop/code_all_shape/scripts/generate_pb4_assets.mjs` (không cần thư mục nguồn `shape 29`).
- Bố cục vẫn ngang ở mobile, dùng mô tả ngắn dễ đọc hơn; tên truy cập giữ nội dung đầy đủ. Click/chạm/Enter/Space để chọn, Tab/↑/↓/Home/End để điều hướng, Escape bỏ chọn. Hỗ trợ reduced motion, SSR và pinch-zoom.
- CSS dùng phần trăm/em và `-webkit-mask`, không phụ thuộc `cqw` hoặc container queries. Giống các mẫu toàn chiều rộng khác, font dự phòng tính theo viewport; nếu nhúng vào sidebar hẹp cần điều chỉnh theo host.
- Kiểm thử: `node /Users/dangquangminh/Desktop/code_all_shape/scripts/check-pb4.mjs` (Node 22+, Chrome, server đang chạy), có `TEST_BASE`, `TEST_OUTPUT`, `CHROME_BIN`; kết quả/ảnh ở `/tmp/pb4-check/`.
- Kiểm thử Chrome ở 320–1920px, gồm iPhone 7 Plus 414 × 736 và 736 × 414, ngưỡng chuyển nội dung 600/601px và giới hạn canvas 1.320px. Kiểm tra kích thước chữ/icon/chấm nối, không chồng chữ, mask có tiền tố WebKit, bàn phím/chạm/zoom, reduced motion, SSR và đối chiếu path. Đây không phải Safari/iPhone thật; cần kiểm tra trên thiết bị thật trước phát hành.
- Thư mục nguồn `shape 29` được xóa sau khi lưu tài nguyên và kiểm tra; ứng dụng không phụ thuộc vào thư mục này.

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
