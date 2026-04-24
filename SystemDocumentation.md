# Tài liệu Hệ thống - Werewolf (Ma Sói) Flip Card

Dự án này là một ứng dụng web giúp người chơi trò chơi "Ma Sói" có thể chia vai trò (role) và xem vai trò một cách bảo mật thông qua hiệu ứng lật thẻ (flip card).

## Tech Stack (Công nghệ sử dụng)
*   **Frontend Framework:** Vue.js 3 (Composition API)
*   **Build Tool:** Vite
*   **Styling:** CSS (Vanilla) với thiết kế Dark Mode/Horror Theme cao cấp.
*   **Thiết bị mục tiêu:** Tối ưu hóa đặc biệt cho **Redmi Note 13 Pro 5G**.

## 📱 Mobile Optimization (Ưu tiên tối ưu Redmi 13 Pro 5G)

Để ứng dụng đạt trải nghiệm mượt mà nhất trên thiết bị này, các quy tắc sau đã được áp dụng:

### 1. Hiển thị & Độ sắc nét (Màn hình 1.5K & Tỷ lệ 20:9)
*   **Viewport:** Sử dụng `viewport-fit=cover` để tràn viền và xử lý vùng an toàn (Safe Area) cho camera nốt ruồi.
*   **Fluid UI:** Sử dụng đơn vị `clamp()` và `svh/svw` thay vì `px` cố định để giao diện "vừa in" với màn hình dài (20:9).
*   **Image Rendering:** Ưu tiên SVG cho các icon. Đối với hình ảnh, sử dụng `image-rendering: -webkit-optimize-contrast` để tận dụng độ phân giải 1.5K.

### 2. Hiệu năng & Chuyển động (Tận dụng 120Hz & GPU)
*   **Hardware Acceleration:** Sử dụng thuộc tính `will-change: transform, opacity` cho các hiệu ứng mặt trăng và lật thẻ để ép GPU xử lý, đảm bảo tốc độ 120fps.
*   **CSS Animation:** Ưu tiên 100% CSS Animation thay cho JavaScript để giảm tải cho Main Thread của chip Snapdragon 7s Gen 2.
*   **Backface Visibility:** Luôn đặt `backface-visibility: hidden` để tránh hiện tượng nhấp nháy (flicker) khi lật bài trên màn hình AMOLED tần số quét cao.

### 3. Giao diện & Trải nghiệm (UI/UX Mobile-First)
*   **Safe Area Handling:** Các nút bấm chính và nội dung quan trọng phải cách lề trên/dưới một khoảng `env(safe-area-inset-*)` để tránh thanh điều hướng và camera của máy.
*   **Touch Targets:** Các nút bấm (Option) có chiều cao tối thiểu **48px** và có khoảng cách thở để dễ dàng thao tác bằng ngón cái trên màn 6.67 inch.
*   **True Black Mode:** Sử dụng màu nền `#050505` (gần như đen tuyệt đối) để tắt pixel AMOLED, giúp tiết kiệm pin và tạo chiều sâu cho chủ đề Horror.

## Folder Structure (Cấu trúc thư mục)

| Thư mục/Tệp | Ý nghĩa |
| :--- | :--- |
| `vue-flip-card/` | Thư mục chính chứa mã nguồn dự án. |
| `src/App.vue` | Chứa hiệu ứng nền toàn cục (Fog, Vignette) và điều phối luồng chạy. |
| `src/style.css` | Cấu hình CSS Reset và các biến màu sắc/font chữ toàn cục. |
| `src/components/` | Chứa các UI components riêng lẻ. |

## Installation (Hướng dẫn cài đặt)

Yêu cầu: Máy tính đã cài đặt **Node.js** (phiên bản 18 trở lên).

1.  Mở terminal và di chuyển vào thư mục dự án: `cd vue-flip-card`
2.  Cài đặt: `npm install`
3.  Chạy ứng dụng: `npm run dev`
4.  Truy cập qua điện thoại: Sử dụng địa chỉ IP Local (thường là `192.168.x.x:5173`) để kiểm tra trực tiếp trên Redmi 13 Pro.

## Usage (Hướng dẫn sử dụng)
1.  **Màn khởi động:** Chọn chế độ chơi (Single Device).
2.  **Chọn vai trò:** Thiết kế kiểu Glassmorphism, tối ưu cho thao tác một tay.
3.  **Nhập tên:** Ô nhập liệu lớn, phím bấm rõ ràng.
4.  **Lật thẻ:** Hiệu ứng 3D mượt mà cho trải nghiệm bảo mật tuyệt đối.
