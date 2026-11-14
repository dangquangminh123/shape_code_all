# PN10 — Chai bút & năm mũi tên (shape 15)

Component độc lập, namespace `pn10-`, không dùng lại CSS của các mẫu trước.
Giữ chai/bút năm tầng, thanh chữ U và năm mũi tên; không dựng tiêu đề hay năm cột chú thích dưới ảnh.
Nền luôn trắng `#fff` theo quy ước của showcase, kể cả theme đỏ/bạc.

## Sử dụng

```tsx
import Pn10PencilRibbon from '@/components/shapes/pn10-pencil-ribbon/Pn10PencilRibbon';

<Pn10PencilRibbon />
<Pn10PencilRibbon theme="silver-red" />
```

Trang riêng: `/shapes/pn10-pencil-ribbon`; thêm `?theme=silver-red` để xem đỏ/bạc.
Trang chủ giữ nguyên các mẫu trước và thêm PN10 ở cuối.

## Chỉnh nội dung và màu

Sửa `/Users/dangquangminh/Desktop/code_all_shape/src/components/shapes/pn10-pencil-ribbon/pn10-pencil-ribbon.config.ts`:

- `PN10_LABEL`: nhãn truy cập của section.
- `PN10_STEPS`: đúng năm bước; sửa `title`, `description`, `icon` và `palette`.
- `palette.light/main/dark/text`: màu sáng, chính, tối và chữ; cùng palette dùng cho chai và mũi tên để luôn đồng bộ.
- `PN10_SILVER_RED`: năm palette của theme đỏ/bạc.
- `icon`: `search`, `mobile`, `people`, `laptop`, `briefcase`, lấy từ `react-icons/fa6`.

Giữ tiêu đề ngắn (khoảng 12 ký tự), mô tả khoảng 40 ký tự để vừa hình ở desktop.
Mobile giữ cả ba cụm hình, tăng chiều cao artboard để vùng chạm ít nhất 44px;
mô tả vẫn có qua `aria-describedby` nhưng ẩn thị giác để tránh chữ quá nhỏ.
Không thêm phần chú thích dưới ảnh.

## Asset và layer

`/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/pn10-pencil-ribbon/`
chứa 11 mask chuẩn hóa, manifest ánh xạ và `originals/` với đủ 11 SVG nguyên bản.
Chuẩn hóa chỉ crop viewBox theo bounds đo trong trình duyệt, thêm đệm 1.5 đơn vị;
không biến đổi path/polygon. Ellipse lạc ngoài artboard trong `shape 5.svg` không
đưa vào mask; bản gốc vẫn đầy đủ. Relief 06 chỉ lưu dự phòng, không render.

Chai dùng một silhouette cho năm dải màu liên tục. Cả năm mũi tên dùng cùng
mask chính. Wrapper bóng trong suốt; relief/fold là con của phần tử được mask,
không có tấm nền đen hoặc lớp màu thò ra ngoài biên.
Thứ tự lớp cố định: thanh U (1) → nhóm mũi tên và nếp gấp (3) → chai/bút (6).
Dải ruy-băng luôn phủ lên thanh móc ở vùng giao nhau, kể cả hover/focus.

Hover/focus đồng bộ số trên chai; click/Enter/Space chọn hoặc bỏ chọn.
↑/↓, Home/End di chuyển focus; Escape bỏ chọn và giữ focus. Có live status,
ID riêng cho mỗi instance và hỗ trợ `prefers-reduced-motion`.

## Kiểm tra dự án

Chạy `npm run typecheck` và `npm run build` từ thư mục gốc. Chạy `npm run dev`
để xem trang riêng và trang chủ. Script kiểm thử, contact sheet và screenshot
tạm được đặt ngoài repository, không thêm file kiểm thử JS vào source.
