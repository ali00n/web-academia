-- ====================================
-- Academia Black Fitness - Database Schema
-- Database: Academy
-- ====================================

-- Create database
CREATE DATABASE IF NOT EXISTS Academy;
USE Academy;

-- ====================================
-- Table: users
-- Stores basic user credentials
-- ====================================
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- Table: member_profiles
-- Stores member onboarding data
-- ====================================
CREATE TABLE IF NOT EXISTS member_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  height DECIMAL(5,2) NULL COMMENT 'Height in cm for IMC calculation',
  training_goal VARCHAR(50) NOT NULL,
  selected_plan VARCHAR(20) NOT NULL,
  payment_method VARCHAR(20) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- Table: attendance
-- Tracks member attendance
-- ====================================
CREATE TABLE IF NOT EXISTS attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent') DEFAULT 'present',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_attendance (user_id, date),
  INDEX idx_user_date (user_id, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- Sample Data (Optional - for testing)
-- ====================================

-- Insert a test user (password: 'test123' - will be hashed in real app)
-- INSERT INTO users (username, email, password) 
-- VALUES ('testuser', 'test@example.com', '$2b$10$YourHashedPasswordHere');

-- ====================================
-- Useful Queries
-- ====================================

-- Get member complete info
-- SELECT u.username, u.email, mp.* 
-- FROM users u 
-- JOIN member_profiles mp ON u.id = mp.user_id 
-- WHERE u.id = ?;

-- Get attendance stats for a user
-- SELECT 
--   user_id,
--   COUNT(*) as total_records,
--   SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as days_present,
--   SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as days_absent
-- FROM attendance
-- WHERE user_id = ?
-- GROUP BY user_id;

-- ====================================
-- Database created successfully!
-- ====================================
