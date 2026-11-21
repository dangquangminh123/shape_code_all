# SS5 — Study Skills Infographic

## 1. Tổng quan
- **Mã định danh:** `ss5-study-skills`
- **Tiền tố file:** `ss5-*`
- **Tên tiếng Việt:** 5 Cuốn sách kỹ năng học tập xếp chồng (Study Skills)
- **Tài nguyên gốc:** Thư mục `6_tick` chứa:
  - `1.svg`: Dải ruy-băng bookmark bên trái (`viewBox="0 0 131.33 81"`).
  - `2.svg`: Thân sách uốn cong và gáy sách (`viewBox="0 0 377.99 81"`).
  - `study-skills-mc-slide1.png`: Ảnh tham chiếu slide gốc (720 × 540).

## 2. Cấu trúc hình học & Tọa độ
- **Canvas ViewBox:** `0 0 720 540`
- **Chiều cao mỗi cuốn sách:** `81px` (chuẩn 1:1 theo vector gốc).
- **Khoảng cách trục dọc (stepY):** `85px` (bắt đầu từ `y = 76px`, độ phủ gối nhẹ 4px giữa các cuốn).
- **So le ngang (Staggered Offset):**
  - Sách lẻ (1, 3, 5): `tailX = 147`, `spineX = 220` (độ rộng ~452px, kết thúc tại `x = 598`).
  - Sách chẵn (2, 4): `tailX = 112`, `spineX = 185` (dịch sang trái 35px, kết thúc tại `x = 563`).
- **Độ ăn khớp hai lớp:**
  - Lớp 1 (Dưới): Ruy-băng bookmark chứa icon nét trắng.
  - Lớp 2 (Trên): Thân sách gồm viền gáy ngoài, mặt phẳng màu chính, đường cong gáy highlight (`SS5_SPINE_ARC_PATH`) và dòng văn bản mô tả.

## 3. Bảng màu & Nội dung
1. **Book 01 (Teal):**
   - Màu: Body `#1ea185`, Tail `#167964`, Spine `#5ee1c5`, Shadow `#105c4c`
   - Nội dung: *"You get anxious or nervous a lot right before a test or quiz."*
2. **Book 02 (Olive Green):**
   - Màu: Body `#9bbb5c`, Tail `#77943e`, Spine `#b2d373`, Shadow `#5d7430`
   - Nội dung: *"You don't feel very confident when it's time to take the test."*
3. **Book 03 (Amber/Orange):**
   - Màu: Body `#f29b26`, Tail `#c6770c`, Spine `#f7c37d`, Shadow `#9c5d09`
   - Nội dung: *"You don't remember much information after you spend time studying."*
4. **Book 04 (Crimson Red):**
   - Màu: Body `#bd392f`, Tail `#8e2b23`, Spine `#d65349`, Shadow `#6d211b`
   - Nội dung: *"It's hard for you to stay focused when you try to study."*
5. **Book 05 (Slate Blue):**
   - Màu: Body `#445469`, Tail `#333f4f`, Spine `#8497b0`, Shadow `#28313e`
   - Nội dung: *"You don't do as well as you think you should on tests or quizzes."*

## 4. Tương thích & Responsive
- **Desktop (>640px):** SVG co dãn linh hoạt với `aspect-ratio: 4/3`, `max-width: 960px`.
- **Mobile (<=640px):** Chuyển sang danh sách thẻ bài viết `.ss5-mobile-list` chống tràn ngang, đảm bảo chữ đọc rõ ràng trên điện thoại 320px–390px.
- **Animation:** WAAPI cascade entrance từ trên xuống dưới, không bóp méo hình học SVG.
