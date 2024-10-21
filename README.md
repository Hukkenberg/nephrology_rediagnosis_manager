# **Hệ Thống Quản Lý Bệnh Nhân – README**

## **Giới Thiệu**
Hệ thống quản lý bệnh nhân cung cấp các chức năng cho **bác sĩ, nhân viên xét nghiệm, quản lý và bệnh nhân**. Các tính năng bao gồm:
- Quản lý tài khoản và phân quyền.
- Tạo và quản lý lịch khám.
- Quản lý hồ sơ bệnh nhân và yêu cầu xét nghiệm.
- Xem lịch sử khám của bệnh nhân và trực quan hóa bằng biểu đồ.

---

## **Yêu Cầu Hệ Thống**

1. **Backend**:  
   - **Node.js** (>=14.x)  
   - **MySQL** (>=8.x)  
   - **Git**

2. **Frontend**:  
   - **Node.js**  
   - **npm** hoặc **yarn**

3. **Host**:  
   - **Render.com** hoặc **Railway.app** (cho backend)
   - **Vercel** (cho frontend)

---

## **1. Cài Đặt Backend**

### **1.1. Clone Dự Án**
Mở **Terminal/Command Prompt** và clone dự án từ GitHub:
```bash
git clone https://github.com/your-username/patient-management-db.git
cd patient-management-db

### **1.2. Cài Đặt Node.js Dependencies**
```bash
Copy code
cd backend
npm install
### **1.3. Thiết Lập Cơ Sở Dữ Liệu MySQL**
Khởi động MySQL và tạo cơ sở dữ liệu:

Linux:
```bash
Copy code
sudo systemctl start mysql
mysql -u root -p
Windows: Mở MySQL từ Command Prompt hoặc MySQL Workbench.
Chạy file SQL để tạo bảng:

```bash
Copy code
mysql -u root -p < database_setup.sql
Cập nhật thông tin kết nối trong file .env: Tạo file .env trong thư mục backend:

makefile
Copy code
DATABASE_URL=mysql://root:yourpassword@localhost:3306/patient_management
JWT_SECRET=your_jwt_secret
PORT=3001
1.4. Chạy Server Backend
```bash
Copy code
node server.js
Server sẽ chạy tại http://localhost:3001.

2. Cài Đặt Frontend
2.1. Cài Đặt Dependencies
bash
Copy code
cd frontend
npm install
2.2. Cấu Hình Frontend
Mở file frontend/src/config.js và thêm URL backend:

javascript
Copy code
export const API_BASE_URL = 'http://localhost:3001/api';
2.3. Chạy Frontend
```bash
Copy code
npm start
Frontend sẽ chạy tại http://localhost:3000.

3. Hướng Dẫn Host Backend
3.1. Host Backend trên Render.com
Tạo tài khoản tại Render.com.
Chọn New Service > Web Service.
Kết nối với repository của bạn trên GitHub.
Cấu hình:
Environment: Node
Start Command: node server.js
Environment Variables:
php
Copy code
DATABASE_URL=mysql://<user>:<password>@<host>:3306/patient_management
JWT_SECRET=your_jwt_secret
Deploy và chờ hoàn tất.
3.2. Host Backend trên Railway.app
Tạo tài khoản tại Railway.app.
Chọn New Project > Deploy from GitHub.
Cấu hình tương tự như trên Render.com.
4. Hướng Dẫn Host Frontend
4.1. Host Frontend trên Vercel
Tạo tài khoản tại Vercel.
Chọn New Project và kết nối với repository của frontend.
Cấu hình dự án:
Build Command: npm run build
Output Directory: build
Deploy và chờ hoàn tất.
5. Kiểm Tra và Sử Dụng Hệ Thống
Truy cập Backend API:

```bash
Copy code
GET http://localhost:3001/api/users
Truy cập Frontend:

arduino
Copy code
http://localhost:3000
Chức năng Phân Quyền:

Bác sĩ: Quản lý lịch khám, tạo lịch mới.
Nhân viên xét nghiệm: Cập nhật yêu cầu xét nghiệm.
Nhân viên quản lý: Quản lý tài khoản và hồ sơ bệnh nhân.
Bệnh nhân: Xem và xác nhận lịch khám.
6. Troubleshooting
Lỗi MySQL không kết nối được:

Kiểm tra MySQL đã khởi động chưa:
```bash
Copy code
sudo systemctl status mysql
Đảm bảo thông tin kết nối đúng trong file .env.
Cổng 3000 hoặc 3001 đã được sử dụng:

Đổi cổng bằng cách cập nhật .env hoặc package.json:
```bash
Copy code
PORT=4000
Lỗi Module Not Found:

Xóa thư mục node_modules và cài lại dependencies:
```bash
Copy code
rm -rf node_modules
npm install
