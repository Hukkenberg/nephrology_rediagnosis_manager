-- Tạo cơ sở dữ liệu
CREATE DATABASE IF NOT EXISTS patient_management;
USE patient_management;

-- Tạo bảng người dùng (User)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('doctor', 'lab_staff', 'manager', 'patient') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng bệnh nhân (Patient)
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng lịch khám (Appointment)
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    date DATE NOT NULL,
    notes TEXT,
    status ENUM('pending', 'confirmed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tạo bảng yêu cầu xét nghiệm (LabRequest)
CREATE TABLE lab_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    lab_info TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Chèn một số dữ liệu mẫu vào bảng người dùng (User)
INSERT INTO users (username, password_hash, role) VALUES
('doctor1', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'doctor'),
('lab1', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'lab_staff'),
('manager1', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'manager'),
('patient1', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'patient');

-- Chèn dữ liệu mẫu vào bảng bệnh nhân (Patient)
INSERT INTO patients (name, dob, gender, phone, address) VALUES
('Nguyen Van A', '1990-01-01', 'male', '0123456789', 'Hanoi, Vietnam'),
('Tran Thi B', '1985-05-20', 'female', '0987654321', 'Saigon, Vietnam');
