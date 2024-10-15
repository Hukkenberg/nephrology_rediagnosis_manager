create database nephro_24;
use nephro_24;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT,
    role_id INT,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,  -- Foreign Key referencing users table
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    phone_number VARCHAR(15),
    address TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(15),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS medical_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,  -- Foreign Key referencing patients table
    record_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    clinical_information TEXT,  -- Updatable clinical information
    subclinical_information TEXT,  -- Updatable subclinical information
    treatment_information TEXT,  -- Read-only treatment information
    diagnosis_schedule TEXT,  -- Read-only diagnosis schedule

    doctor_id INT,  -- Foreign Key referencing users table for the doctor who created the record
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS examination_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,  -- Foreign Key referencing patients table
    examiner_id INT,  -- Foreign Key referencing users table for the examiner
    exam_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    findings TEXT,
    recommendations TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (examiner_id) REFERENCES users(id)
);
INSERT INTO roles (id, name, description) VALUES
    (1, 'doctor', 'User is a doctor with access to medical records and patient management'),
    (2, 'patient', 'User is a patient with access to their own records'),
    (3, 'examiner', 'User is an examiner with access to patient assessments and evaluations'),
    (4, 'admin', 'User is an admin with full system access and management permissions')
ON DUPLICATE KEY UPDATE name = VALUES(name);
