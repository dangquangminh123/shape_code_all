# Quy hoạch Thư mục Tài nguyên SVG cho Đa Giao diện UI Shape

Dự án này được thiết kế để chứa nhiều giao diện UI Shape khác nhau. Để tránh trùng tên file hoặc ghi đè SVG giữa các giao diện, mỗi mẫu Shape có **1 thư mục riêng** và **1 tiền tố (prefix) tên file riêng**:

## 1. Mẫu 01: UI Shape 3 Tầng (`step-stack-demo`)
- **Thư mục chứa file SVG:**
  `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/step-stack-demo/`
- **Chỉ sử dụng 3 file SVG hiện có, đúng thứ tự:**
  - `ssd-stack-top.svg`: đỉnh đỏ vát chéo, viewBox `1442.85 312.3 1212.45 1789.5`.
  - `ssd-stack-mid.svg`: tầng giữa đỏ mận, viewBox `818.3 359.1 2495.87 1748.4`.
  - `ssd-stack-base.svg`: chân đế xanh gần vuông, viewBox `1274.1 530.5 1451.9 1439.02`.

Không còn tùy chọn alias `stack-*.svg`, UUID hay đảo thứ tự tầng vì các file đó không có trong bộ tài nguyên mới. Không nhân bản hoặc ghi đè tài nguyên của người dùng.

## Hình học và hiển thị

- Giữ nguyên path SVG. Các viewBox đã được đối chiếu bằng `SVGGraphicsElement.getBBox()` trong Chrome.
- Desktop: top rộng 110px, mid rộng 168px, base rộng 216px. Chiều cao tính từ tỉ lệ viewBox, không kéo méo SVG.
- Ba tầng căn chung trục giữa; thứ tự phía trước là base → mid → top. Có chồng lấn nhẹ để che mép nối.
- Tách stroke / fill / content. CSS mask nằm ở stroke và fill; `drop-shadow` nằm ở phần tử cha để không bị cắt.
- Giữ số 01–02–03 và hai khối nội dung tiếng Việt trong cấu hình, không thêm ảnh hay khối thứ ba góc phải dưới.
- Nội dung so le bên phải trên desktop/tablet; màn hình hẹp chuyển xuống dưới tháp để chữ không bị ép nhỏ.
- Hover và focus liên kết hai chiều, không làm tách tầng. Có focus ring, giảm chuyển động theo cài đặt hệ thống và tùy chọn đế bạc.

---

## 2. Các Mẫu Shape Tiếp Theo (Đã tạo sẵn thư mục chờ)
- **Mẫu 02 (`phase-shape-demo`):**
  - Thư mục: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/phase-shape-demo/`
  - Prefix tên file: `psd-*.svg` (Ví dụ: `psd-phase-1.svg`, `psd-phase-2.svg`...)
- **Mẫu 03 (`km-shape-demo`):**
  - Thư mục: `/Users/dangquangminh/Desktop/code_all_shape/public/assets/shapes/km-shape-demo/`
  - Prefix tên file: `kms-*.svg` (Ví dụ: `kms-main.svg`, `kms-sub.svg`...)
