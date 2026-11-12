# Tài nguyên AR5 — Arrow Ribbon

Ba SVG đặt **trực tiếp trong folder riêng của mẫu**, không có thư mục con `svg`:
`/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/ar5-arrow-ribbon/`

| File | Vai trò | viewBox đã đối chiếu với path |
| --- | --- | --- |
| `ar5-rail-arrow-mask.svg` | Mũi tên dài | `209.7 918.8 3580.39 817.8` |
| `ar5-ribbon-tab-mask.svg` | Tab số phía trên | `497.6 233.39 3005 2126.57` |
| `ar5-medallion-notch-mask.svg` | Huy hiệu có khe | `1014.6 276.2 1970.6 1947.5` |

Đã nhận đủ ba SVG. Giữ nguyên toàn bộ `path` của người dùng; chỉ crop khung xuất Illustrator theo bounds đo bằng `SVGGraphicsElement.getBBox()` trong Chrome và đặt `preserveAspectRatio="none"` để mask phủ khung CSS. Gradient do CSS điều khiển. Năm icon trong huy hiệu là SVG inline riêng.

## Khi thay tài nguyên

1. Giữ đúng tên file và đặt ngay trong folder này, không tạo thêm thư mục con và không chép vào folder Step Stack.
2. Nếu thay nguồn SVG, đo lại bounds trước khi chỉnh `viewBox`; không áp dụng thông số của bộ cũ cho path khác.
3. Server kiểm tra từng file ở mỗi request. File có sẵn dùng mask; file thiếu hoặc không đọc được dùng CSS dự phòng. Production có thể cần restart/redeploy khi thêm public asset mới.
4. Chạy `npm run test:ar5` để kiểm tra đủ ba mask, URL HTTP 200, viewBox khớp bounds và CSS dự phòng.

URL phục vụ: `/assets/shapes/ar5-arrow-ribbon/<tên-file>.svg`.

Không thay đổi tài nguyên trong `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/step-stack-demo/`.
