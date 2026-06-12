# IT Events - Trang đăng ký sự kiện Khoa CNTT

Đây là website demo đăng ký sự kiện của Khoa Công nghệ thông tin, sử dụng Bootstrap 5, JavaScript và LocalStorage.

## Các trang có sẵn

- `midterm-project/index.html`: Trang chủ với hero, giới thiệu và sự kiện nổi bật.
- `midterm-project/courses.html`: Trang danh sách sự kiện với tìm kiếm, lọc, và modal xem chi tiết.
- `midterm-project/register.html`: Trang form đăng ký tham gia sự kiện.
- `midterm-project/registrations.html`: Trang quản lý danh sách đăng ký và xóa đăng ký.

## Tính năng đã triển khai

1. Website có đủ các trang/section yêu cầu.
2. Có ít nhất 8 sự kiện/khóa học trong mảng `assets/js/data.js`.
3. Danh sách card sự kiện hiển thị từ dữ liệu JavaScript.
4. Tìm kiếm theo tên sự kiện.
5. Lọc theo danh mục và cấp độ.
6. Modal xem chi tiết sự kiện.
7. Form đăng ký với lựa chọn sự kiện.
8. Validation bằng JavaScript với thông báo lỗi rõ ràng.
9. Lưu dữ liệu đăng ký vào `localStorage`.
10. Danh sách đăng ký và chức năng xóa từng bản ghi / xóa toàn bộ.
11. Sử dụng Bootstrap Grid và nhiều component Bootstrap (navbar, card, modal, button, form, table, badge, alert).
12. Có file CSS riêng tại `assets/css/style.css`.
13. Website responsive trên thiết bị mobile và tablet.14. Sử dụng HTML5 và semantic tags như `header`, `nav`, `main`, `section`, `footer`.
15. Không sử dụng PHP, MySQL, backend, React, Vue, Angular, Next.js hoặc template toàn bộ.
## Chạy thử

Mở các tệp HTML trong trình duyệt: `midterm-project/index.html`, `midterm-project/courses.html`, `midterm-project/register.html`, `midterm-project/registrations.html`.

## GitHub Pages

Website có thể được xuất bản lên GitHub Pages. Nếu kho lưu trữ của bạn nằm tại `https://github.com/<username>/<repo>`, thì trang chạy được sẽ là:

`https://<username>.github.io/<repo>/midterm-project/index.html`

> Lưu ý: Bạn cần bật GitHub Pages trên repository và đảm bảo thư mục `midterm-project` được phục vụ đúng đường dẫn.

## Chú ý khi chạy trên GitHub Pages

- Tất cả asset CSS/JS dùng đường dẫn tương đối từ `midterm-project` nên hoạt động nếu trang được phục vụ đúng từ thư mục này.
- Ảnh sự kiện sử dụng URL bên ngoài nên không gặp lỗi đường dẫn khi chạy trên GitHub Pages.
