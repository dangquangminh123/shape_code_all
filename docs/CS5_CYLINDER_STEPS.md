# CS5 — Năm thanh trụ ngang

CS5 dựng bố cục từ ảnh `28.png`: năm khung chú thích ở trái, đường nối có vòng tròn nhỏ, năm thanh trụ bằng nhau ở phải và đai số trong mờ dịch dần sang phải. Nội dung tiếng Việt đi theo Định hướng → Hành động → Đo lường → Phân tích → Hoàn thành. Module giữ nền trong suốt như các shape khác; nền xám, watermark và thương hiệu trong ảnh tham chiếu không được render vào giao diện.

Route riêng là `/shapes/cs5-cylinder-steps`. Trang chủ render `<Cs5CylinderSteps />` trực tiếp sau HB4, ở vị trí **34**. Không thêm thư viện mới.

## Tổ chức file và tùy chỉnh

| File hoặc thư mục | Vai trò |
| --- | --- |
| `src/components/shapes/cs5-cylinder-steps/Cs5CylinderSteps.tsx` | Ghép các lớp, danh sách năm nút, chọn và điều hướng bằng phím |
| `src/components/shapes/cs5-cylinder-steps/Cs5StepIcon.tsx` | Năm pictogram từ `react-icons` đang có trong repo |
| `src/components/shapes/cs5-cylinder-steps/cs5-cylinder-steps.config.ts` | Tiêu đề, nội dung dài/ngắn, màu, vị trí hàng và đai số |
| `src/components/shapes/cs5-cylinder-steps/cs5-cylinder-steps.css` | Tọa độ, gradient, mask, typography, focus và responsive |
| `public/assets/shapes/cs5-cylinder-steps/` | SVG gốc, tám mask sinh ra, ảnh tham chiếu và manifest |
| `scripts/generate_cs5_assets.mjs` | Tái tạo mask/manifest bằng Node built-ins |
| `public/shape-auto-animations.js` | Recipe và các hiệu ứng riêng của CS5 |
| `src/app/shapes/cs5-cylinder-steps/page.tsx` | Route riêng và metadata |
| `src/app/page.tsx`, `src/components/shapes/index.ts`, `src/data/shape-registry.ts` | Trang chủ, export và registry tài nguyên |

Sửa chữ trong `CS5_HEADING` và `CS5_STEPS`. Mỗi bước có `number`, `title`, `description`, `summary`, `icon`, `y`, `sleeveX` và `colors`. `y` là tọa độ trên của hàng; `sleeveX` là độ lệch bên trong thanh trụ, không phải tọa độ toàn canvas.

Trong `colors`, `accent` điều khiển outline, connector, icon và focus ring; `top`, `middle`, `bottom` tạo độ nổi thân trụ; `cap` tô mặt elip phải; `number` tô số. Màu vàng của outline/icon được làm đậm hơn ảnh để hiện rõ trên nền trắng. Tiêu đề module và copy kế thừa màu chữ của trang chứa; không kế thừa màu thân trụ.

Component nhận `className` và `masks?: Cs5Masks`. Tám khóa override là `cylinderBody`, `cylinderCap`, `cylinderFull`, `calloutOutline`, `connectorLine`, `connectorDot`, `sleeve`, `sleeveRim`; mặc định lấy từ `CS5_ASSET_BASE`/`CS5_MASK_FILES`. Mask thay thế cần giữ cùng viewBox và vị trí lớp. Module hiện thiết kế cho đúng năm hàng; đổi số hàng cần sửa geometry, nhãn truy cập của danh sách và số lượng selector trong recipe.

## Dùng lại hai SVG được cung cấp

`originals/cs5-source-cylinder.svg` lưu nguyên byte của **`shape 1(1).svg`**; `originals/cs5-source-callout.svg` lưu nguyên byte của **`shape 2(1).svg`**. Đây là hai nguồn CS5 mới, khác hai SVG của HB4. Cả hai có artboard `0 0 4000 2500`, gồm cả phần tử ngoài artboard. Generator chỉ lấy các phần tử cần dùng; bản gốc giữ đầy đủ.

Các chỉ số phần tử trong bảng bắt đầu từ **0**, tính theo thứ tự cùng loại trong SVG:

| Mask | Phần tử nguồn | ViewBox và cách dùng |
| --- | --- | --- |
| `cs5-cylinder-body-mask.svg` | Cylinder `path[2]` | `0 0 280 54`; ba lát ngang cho đầu trái, đoạn giữa, đầu phải |
| `cs5-cylinder-cap-mask.svg` | Cylinder `ellipse[1]` | `0 0 280 54`; mặt elip tại `x=268`, rộng 12, cao 54 |
| `cs5-cylinder-full-mask.svg` | Cylinder `path[2]` + `ellipse[1]` | `0 0 280 54`; mask wrapper thanh trụ, giữ đai chuyển động trong silhouette |
| `cs5-callout-outline-mask.svg` | Callout `path[3]` | `0 0 207 66`; stroke trong suốt ruột, không có fill trắng |
| `cs5-connector-line-mask.svg` | Callout `rect[0]` | `0 0 36 1.4`; hình chữ nhật gốc đổi tỉ lệ; CSS render rộng 32,5 để dừng trước lòng vòng nối |
| `cs5-connector-dot-mask.svg` | Callout `ellipse[2]` | `0 0 7 7`; hai bản ellipse đổi tỉ lệ tạo vòng rỗng |
| `cs5-sleeve-mask.svg` | Cylinder `path[2]` | `0 0 101 54`; tái dùng hai đầu cong với phần giữa ngắn hơn |
| `cs5-sleeve-rim-mask.svg` | Cylinder `path[2]` | `0 0 101 54`; silhouette đai trừ bản thu vào 1,3 đơn vị |

Generator giữ dữ liệu đường cong gốc và ghép các lát bằng `clipPath`, `<use>` và ma trận affine. Thân trụ chia các mốc nguồn `220.2 / 878.6 / 3082.9 / 3708.7` thành `0 / 18 / 268 / 280`; nhờ vậy kéo dài phần giữa mà không làm đầu tròn và mặt elip rộng quá mức. Đai dùng các mốc đích `0 / 6 / 95 / 101`. Callout có đầu trái tròn bán kính 32,25; tâm cạnh lõm ở `(192, 33)`, khớp điểm bắt đầu đường nối.

Các lát chồng 2px hướng vào phần giữa thẳng để tránh đường ghép mờ khi browser làm mịn cạnh. Body/full mask có thêm hình chữ nhật lót nội bộ `(267, 0.5, 7, 53)` dưới cap; lớp này lấp khe giữa hai lớp và nằm hoàn toàn trong silhouette gốc. Kiểm tra raster ở chiều rộng 175/197/280px cho alpha 255 tại hai đường ghép, không tạo pixel mới ngoài đường viền trước đó.

`manifest.json` ghi tên upload, SHA-256, số byte, phần tử nguồn, các phép biến đổi và tọa độ lắp ghép. Generator kiểm tra hash hai SVG trước khi xử lý. Từ thư mục gốc repo:

```sh
node scripts/generate_cs5_assets.mjs
```

Lệnh đọc các bản đã lưu trong `originals/` và `cs5-reference.png`, ghi lại tám mask cùng manifest; không cần thư mục upload ban đầu. Đổi chữ/màu không cần tạo lại tài nguyên. Nếu thay SVG nguồn, phải đo lại hình học và cập nhật generator có chủ đích.

## Hình học và các lớp

Canvas dùng đúng tỉ lệ **602 × 612**, rộng tối đa **1.100px**, cao tương ứng khoảng **1.118,27px**. CSS đổi tọa độ thành phần trăm; `1em` trong artwork tương đương 10 pixel tham chiếu trước khi co giãn.

| Hàng | Trên hàng | Tâm hàng | Trên thanh trụ | Mép trái đai trên canvas | Offset đai trong trụ |
| --- | --- | --- | --- | --- | --- |
| 01 | 127 | 160 | 134 | 307 | 27 |
| 02 | 218 | 251 | 225 | 330 | 50 |
| 03 | 309 | 342 | 316 | 362 | 82 |
| 04 | 400 | 433 | 407 | 389 | 109 |
| 05 | 491 | 524 | 498 | 417 | 137 |

Mỗi hàng `.cs5-item` bắt đầu tại `x=41`, rộng **519**, cao **66**, bước dọc **91**. Các số đo sau cùng theo canvas tham chiếu:

| Thành phần | Tọa độ/kích thước |
| --- | --- |
| Khung chú thích | `x=41`, rộng 207, cao 66 |
| Icon | `x=54`, cách đỉnh hàng 16, hộp 34 × 34 |
| Copy | `x=107`, cách đỉnh hàng 9, rộng 112 |
| Đường nối | Wrapper từ `x=233` tới tâm vòng tại `x=269`; nét dài 32,5, dày 1,4 |
| Vòng nhỏ cuối nối | Tâm `x=269`, đường kính 7 |
| Thanh trụ | `x=280`, cách đỉnh hàng 7, rộng 280, cao 54 |
| Mặt elip phải | Trong thanh trụ: `x=268`, rộng 12, cao 54 |
| Đai số | Rộng 101, cao 54; vị trí ngang thay đổi theo bảng hàng |

Các đầu trụ giữ thẳng cột; chỉ đai số dịch dần. Giữa vòng nối và đầu trụ có khoảng hở; nét nối kết thúc trước lòng vòng rỗng. Thân và cap dùng cùng canvas để tránh lệch mặt elip. Đai chứa mặt trong mờ, viền, wrapper clip vệt sáng và số; các lớp này luôn dùng chung vị trí. Mask tổng trên `.cs5-cylinder` giữ đai bên trong hình trụ khi trượt. Chữ/icon nằm ngoài các lớp mask tô màu. Khai báo cả `mask` và `-webkit-mask`; ruột callout, ruột vòng nối và nền toàn module đều trong suốt.

Icon lần lượt là `PiCrosshairLight`, `PiHandTapLight`, `FaSignal`, `PiMagnifyingGlassLight`, `PiTimerLight`. CSS thêm baseline cho năm cột của `FaSignal`, chỉnh tỉ lệ quang học cho icon bàn tay và biểu đồ.

## Responsive, tương tác và khả năng truy cập

Năm hàng luôn giữ cấu trúc **callout → connector → cylinder**, kể cả mobile. Với chiều rộng container **≤600px**, `summary` thay `description`; tiêu đề bước có mức sàn 8px, mô tả ngắn 7px. Đây là đánh đổi để giữ đúng vị trí hình trong một canvas thu nhỏ; chữ mobile không có cỡ như nội dung bài đọc dài. Giữ nội dung ngắn và kiểm tra lại xuống dòng sau mỗi lần sửa. Trang không khóa pinch-zoom.

`.cs5-module` là container tên `cs5`; typography dùng `min(1.66113cqw, 18.272425px)` cùng `@container cs5`. Vì vậy một module hẹp trong viewport desktop vẫn co chữ và dùng mô tả ngắn theo host. `vw`/`@media` là fallback cho browser chưa hỗ trợ container query, phù hợp với bố cục toàn chiều rộng hiện tại; khi nhúng vào host hẹp trên browser cũ cần chỉnh fallback theo host. Khai báo fallback không đồng nghĩa đã kiểm chứng trên Safari/iPhone thật.

Mỗi hàng là một `<button type="button">` trong danh sách có thứ tự. Section dùng `useId` để liên kết tiêu đề, tránh trùng ID khi nhúng nhiều instance. Nội dung trang trí `aria-hidden`; tên truy cập của nút chứa số, tiêu đề và mô tả đầy đủ, kể cả khi mobile chỉ hiện bản ngắn. `aria-pressed` phản ánh trạng thái chọn.

| Thao tác | Kết quả |
| --- | --- |
| Click, chạm, Enter, Space | Chọn hàng; kích hoạt lại để bỏ chọn |
| Tab / Shift+Tab | Focus các hàng theo thứ tự DOM |
| ↓ / → | Focus hàng tiếp theo, quay về 01 sau 05 |
| ↑ / ← | Focus hàng trước, quay về 05 trước 01 |
| Home / End | Focus hàng đầu / cuối |
| Escape | Bỏ chọn và giữ focus hiện tại |

Focus có outline; chọn làm rõ thân trụ/khung và gạch chân tiêu đề. Hover chỉ áp dụng với chuột phù hợp; không cần hover để chạm chọn. React không đo layout hay tạo animation loop. HTML gốc có đầy đủ hình/chữ khi JavaScript không hoạt động; chọn và điều hướng phím bổ sung cần hydrate.

## Hoạt cảnh riêng

Recipe `cs5-cylinder-steps` dùng root `.cs5-module`. Nét nối mở sang phải, thanh trụ được reveal tại chỗ, đai trượt tới vị trí từng hàng, số rõ dần rồi icon nhấn nhẹ. Toàn bộ hàng và khung chú thích không dịch chuyển.

| Selector, mỗi loại 5 phần tử | Delay đầu | Stagger | Thời lượng | Hiệu ứng |
| --- | --- | --- | --- | --- |
| `.cs5-connector-line` | 0ms | 130ms | 240ms | Vẽ nét nối từ trái sang phải |
| `.cs5-cylinder` | 240ms | 130ms | 520ms | Reveal bằng clip, giữ nguyên tỉ lệ cap |
| `.cs5-sleeve` | 780ms | 130ms | 540ms | Trượt từ đầu trụ tới offset cuối |
| `.cs5-number` | 1.320ms | 130ms | 280ms | Tăng opacity, blur 1px về 0 |
| `.cs5-icon` | 1.420ms | 130ms | 280ms | Scale 1 → 1,06 → 1 |

Tổng vào cảnh khoảng **2.220ms** nếu không pause. Mỗi hàng mở trụ xong trước khi đai bắt đầu di chuyển. `--cs5-sleeve-travel` dùng `em` theo tỉ lệ canvas, tương ứng với offset `sleeveX`; số nằm trong đai nên cùng di chuyển. Sau vào cảnh, chỉ **một** `.cs5-sleeve-glint` có layout chạy vệt sáng ngắn theo chu kỳ **6.200ms**. Vệt sáng nằm trong wrapper mask/overflow riêng, không phủ ngoài đai hoặc làm mờ chữ.

CS5 dùng lifecycle chung: WAAPI, transform `composite: add`, hủy effect sau khi xong, pause khi tab ẩn, hủy khi ra viewport, chạy lại khi vào, dọn instance khi unmount. `prefers-reduced-motion: reduce` trả về hình tĩnh đầy đủ và bỏ transition của outline/thân. Xem [tài liệu engine](SHAPE_AUTO_ANIMATIONS.md) để biết chi tiết và hợp đồng selector.

## Kết quả kiểm chứng

Đã đối chiếu source và kiểm tra HTML/JS/CSS production trên **Chromium**. Dữ liệu đo nằm trong [cs5-validation.json](cs5-validation.json).

Ảnh kiểm tra cuối: [desktop](previews/cs5-desktop.jpg) và [mobile 375px](previews/cs5-mobile.jpg).

| Phạm vi | Kết quả thực tế |
| --- | --- |
| Tài nguyên SVG | Hai SVG và ảnh tham chiếu nguyên byte; 11 hash khớp; XML, tham chiếu nội bộ, dữ liệu path và tái tạo ổn định đã kiểm tra |
| Raster mask | Tám mask đã render bằng Inkscape; ruột callout/vòng nối/viền đai có alpha 0; cap nằm đúng `x=268..280` |
| TypeScript và production build | `npm run typecheck` và `npm run build` thành công; app manifest có **34 route shape**, trang chủ và trang không tìm thấy |
| Viewport | 320, 375, 390, 600, 601, 602, 768, 1100, 1440px: không tràn ngang hoặc copy; năm hàng giữ tọa độ tham chiếu |
| Sai số hình học | Tọa độ y hàng sau chuẩn hóa lệch tối đa 0,03px; kích thước trụ lệch tối đa 0,03px so với 280 × 54 |
| Mobile 320px | Copy còn cách đáy khung ít nhất 3,35 pixel tham chiếu; hit area cao khoảng 46,77 CSS pixel, không chồng hàng |
| Host hẹp | Module 390px trong viewport 1440px dùng `summary`, không tràn; font theo container |
| Nền trong suốt | Nền module là `rgba(0, 0, 0, 0)`, không có background image; kiểm tra trên host ô bàn cờ xác nhận ruột callout hiện nền host |
| Tương tác | Click/Enter/Space bật tắt; ArrowDown, End, quay vòng và Escape đúng; chọn độc quyền một `aria-pressed`, Escape bỏ chọn và giữ focus |
| Chuyển động thực tế | Năm đai bắt đầu tại đầu trụ `x≈280`, trượt lần lượt 27/50/82/109/137 pixel tham chiếu và kết thúc tại tọa độ gốc với `transform: none` |
| Engine | `mismatches` và `errors` rỗng; idle có hai animation thuộc tính trên **một** phần tử glint; pause/resume hoạt động; offscreen về 0 animation, reentry tăng lượt chạy 1 → 2 |
| Giảm chuyển động | Fixture mô phỏng `prefers-reduced-motion` trước khi engine khởi tạo: 0 animation, đủ năm hàng |
| Không có JavaScript ứng dụng | Fixture bỏ script ứng dụng vẫn hiện đủ năm hàng, không tràn; số script ứng dụng bằng 0 |

Kiểm tra giảm chuyển động ở trên là mô phỏng đầu vào engine; fixture không có JavaScript ứng dụng vẫn có script của môi trường preview. Hai phép thử này không phải phép thử thiết lập hệ điều hành hoặc tắt toàn bộ JavaScript trong browser. Chưa kiểm chứng trên Safari/iPhone thật; kết quả Chromium không xác nhận các nền tảng đó.

## Các bước kiểm tra khi chỉnh sửa

Từ thư mục gốc repo, khi kiểm tra thay đổi:

```sh
node scripts/generate_cs5_assets.mjs
npm run typecheck
npm run build
git diff --check
```

Đối chiếu route riêng và module cuối trang chủ tại 320, 375, 390, 600, 601, 602, 768, 1100, 1440px; thêm host rộng 390px trong viewport 1440px. Xác nhận năm hàng, mặt elip, các vị trí đai, copy không đè outline/connector, nền host hiện qua phần rỗng và không có thanh cuộn ngang. Thử các phím ở bảng trên, tên truy cập đầy đủ, zoom và JavaScript tắt.

Trong console trang đang chạy:

```js
window.__shapeAutoMotion?.status().find(item => item.id === 'cs5-cylinder-steps')
window.__shapeAutoMotion?.replay('cs5-cylinder-steps')
window.__shapeAutoMotion?.pause()
window.__shapeAutoMotion?.resume()
```

Kiểm tra `mismatches`/`errors` rỗng, năm đai kết thúc đúng chỗ, pause đứng yên, offscreen/unmount không để lại animation, reduced motion không khởi tạo hoạt cảnh. Đây là quy trình lặp lại khi sửa; phạm vi đã kiểm chứng được ghi riêng trong bảng kết quả phía trên. Script/tài liệu lịch sử cố định 17 mẫu không xác nhận QA cho CS5.
