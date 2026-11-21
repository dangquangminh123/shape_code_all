# SS5 — Study Skills Infographic

## 1. Tổng quan
- **Mã định danh:** `ss5-study-skills`
- **Tiền tố file:** `ss5-*`
- **Tên tiếng Việt:** 5 Cuốn sách kỹ năng học tập xếp chồng (Study Skills)
- **Tài nguyên gốc:** Thư mục `6_tick` chứa:
  - `1.svg`: Dải ruy-băng bookmark bên trái (`viewBox="0 0 131.33 81"`).
  - `2.svg`: Thân sách uốn cong và gáy sách (`viewBox="0 0 377.99 81"`).
  - `study-skills-mc-slide1.png`: Ảnh tham chiếu slide gốc (720 × 540).

## 2. Cấu trúc hình học & Tọa độ chuẩn hóa
- **ViewBox tinh gọn:** `86 62 556 462` (ôm sát cụm 5 cuốn sách so le cùng vùng đổ bóng, không thừa khoảng trống đỉnh/đáy).
- **Thân sách (`2.svg`):** Scale đồng nhất `86.5 / 81` (`1.0679`), chiều cao `86.5px`, chiều rộng `403.65px`, xếp sát khít theo bước dọc `stepY = 86.5px` bắt đầu tại `y = 76px`.
- **Dải bookmark (`1.svg`):** Scale đồng nhất `57.5 / 81` (`0.7099`), chiều cao `57.5px`, căn giữa theo trục dọc thân sách (`tailOffsetY = +14.5px`) và luồn gọn dưới mép viền gáy sách.
- **So le ngang (Staggered Offset):**
  - Sách lẻ (1, 3, 5): `tailX = 138`, `spineX = 222`.
  - Sách chẵn (2, 4): `tailX = 104`, `spineX = 188` (dịch sang trái `34px`).

## 3. Ngắt dòng chữ SVG & Bảng màu
- **Ngắt dòng tự động an toàn:** Hàm `wrapWords(book.text, 38)` chia văn bản thành các `<tspan>` nằm gọn bên trong vùng an toàn `[64..332]` của `2.svg`, tuyệt đối không tràn qua mép trang lõm bên phải (`x ≈ 354`) và tương thích Safari/Chrome (không dùng `<foreignObject>` cho văn bản).
- **Bảng màu 5 cuốn (khớp ảnh mẫu):**
  1. **Book 01 (Teal):** Body `#1ea185`, Tail/Rim `#167964`, Spine `#5ee1c5`.
  2. **Book 02 (Olive Green):** Body `#9bbb5c`, Tail/Rim `#77943e`, Spine `#c4d79e`.
  3. **Book 03 (Amber Orange):** Body `#f29b26`, Tail/Rim `#c6770c`, Spine `#f7c37d`.
  4. **Book 04 (Crimson Red):** Body `#bd392f`, Tail/Rim `#8e2b23`, Spine `#de827b`.
  5. **Book 05 (Slate Blue):** Body `#445469`, Tail/Rim `#333f4f`, Spine `#8497b0`.

## 4. Responsive & Animation
- **Desktop (>600px):** SVG giữ nguyên path gốc, tương tác bàn phím đầy đủ (`ArrowUp/Down/Left/Right`, `Home/End`, `Enter/Space`, `Escape`).
- **Mobile (<=600px):** Chuyển sang 5 nút thẻ `.ss5-mobile-card` mang cùng dải màu tail/spine/body, hỗ trợ từ màn hình nhỏ `320px` đến `600px` không tràn ngang.
- **Animation:** Kết nối WAAPI qua `.ss5-module`, `.ss5-book-row`, `.ss5-icon-host svg`, `.ss5-copy-text`, `.ss5-mobile-card` trong `public/shape-auto-animations.js`.
