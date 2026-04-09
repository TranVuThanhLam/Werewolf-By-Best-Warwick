# Tài liệu Hệ thống - Werewolf (Ma Sói) Flip Card

Dự án này là một ứng dụng web giúp người chơi trò chơi "Ma Sói" có thể chia vai trò (role) và xem vai trò một cách bảo mật thông qua hiệu ứng lật thẻ (flip card).

## Tech Stack (Công nghệ sử dụng)
*   **Frontend Framework:** Vue.js 3 (Composition API)
*   **Build Tool:** Vite
*   **Styling:** CSS (Vanilla) với thiết kế Dark Mode/Horror Theme.
*   **Font:** Google Fonts (Charm, Roboto).

## Folder Structure (Cấu trúc thư mục)

| Thư mục/Tệp | Ý nghĩa |
| :--- | :--- |
| `vue-flip-card/` | Thư mục chính chứa mã nguồn dự án. |
| `src/App.vue` | Component chính điều phối luồng chạy (State machine của các màn giao diện). |
| `src/main.js` | Tệp khởi tạo ứng dụng Vue. |
| `src/components/` | Chứa các UI components riêng lẻ. |
| `├─ EntryPoint.vue` | Màn hình khởi đầu (Chọn chế độ chơi). |
| `├─ RoleSelector.vue` | Màn hình chọn số lượng các vai trò (Dân làng, Sói, Tiên tri...). |
| `├─ NameInput.vue` | Màn hình nhập tên người chơi. |
| `├─ RevealRoles.vue` | Màn hình thực hiện chia bài và cho phép người chơi lật thẻ. |
| `└─ FlipCard.vue` | Component hiệu ứng lật thẻ 3D. |
| `src/style.css` | Các style dùng chung cho toàn dự án. |

## Installation (Hướng dẫn cài đặt)

Yêu cầu: Máy tính đã cài đặt **Node.js** (phiên bản 18 trở lên).

1.  Mở terminal và di chuyển vào thư mục dự án:
    ```bash
    cd vue-flip-card
    ```
2.  Cài đặt các thư viện cần thiết:
    ```bash
    npm install
    ```
3.  Chạy ứng dụng ở môi trường phát triển (Local):
    ```bash
    npm run dev
    ```
4.  Truy cập vào địa chỉ hiển thị trên terminal (thường là `http://localhost:5173`).

## Usage (Hướng dẫn sử dụng)

Hệ thống hoạt động theo trình tự sau:

1.  **Màn khởi động:** Chọn chế độ chơi (Hiện tại hỗ trợ chế độ chơi Offline/Trực tiếp).
2.  **Chọn vai trò:**
    *   Sử dụng nút `+` và `-` để điều chỉnh số lượng Dân làng và Sói.
    *   Nhấn vào các thẻ vai trò đặc biệt (Tiên tri, Bảo vệ, Phù thủy...) để thêm vào ván đấu.
3.  **Nhập tên:** Nhập tên tương ứng cho từng người chơi.
4.  **Lật thẻ:** 
    *   Người chơi lần lượt cầm máy, nhấn vào thẻ để lật (Flip) xem vai trò của mình.
    *   Sau khi xem xong, nhấn "Xong" để chuyển cho người tiếp theo cho đến khi hết.

## Configuration (Cấu hình)

Hiện tại dự án không sử dụng biến môi trường phức tạp. Các cấu hình cơ bản nằm trong `package.json` và `vite.config.js`.

| Tham số | Ý nghĩa | Mặc định |
| :--- | :--- | :--- |
| `PORT` | Cổng chạy server local | `5173` |
| `framework` | Framework sử dụng | `Vue 3` |
