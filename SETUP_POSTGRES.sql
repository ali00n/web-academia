-- ==========================================
-- CRIAR BANCO DE DADOS
-- ==========================================
-- Execute este comando APENAS se estiver criando um novo banco local
-- Para Neon, o banco 'neondb' já existe
-- CREATE DATABASE Academy;

-- ==========================================
-- CONECTAR AO BANCO (no DBeaver, selecione o banco)
-- ==========================================
-- \c Academy;

-- ==========================================
-- 1. CRIAR TABELA users
-- ==========================================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. CRIAR TABELA member_profiles
-- ==========================================
CREATE TABLE member_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  height DECIMAL(5,2),
  training_goal VARCHAR(50) NOT NULL,
  selected_plan VARCHAR(20) NOT NULL,
  payment_method VARCHAR(20) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_member_user FOREIGN KEY (user_id) 
    REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================================
-- 3. CRIAR ENUM AttendanceStatus
-- ==========================================
CREATE TYPE "AttendanceStatus" AS ENUM ('present', 'absent');

-- ==========================================
-- 4. CRIAR TABELA attendance
-- ==========================================
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  date DATE NOT NULL,
  status "AttendanceStatus" DEFAULT 'present',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_attendance_user FOREIGN KEY (user_id) 
    REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT unique_attendance UNIQUE (user_id, date)
);

-- ==========================================
-- VERIFICAR TABELAS CRIADAS
-- ==========================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- ==========================================
-- INSERIR DADOS DE TESTE (OPCIONAL)
-- ==========================================

-- Inserir usuário de teste
INSERT INTO users (username, email, password) 
VALUES ('admin', 'admin@academia.com', '$2b$10$hashedpassword123');

-- Inserir perfil de teste
INSERT INTO member_profiles (user_id, full_name, age, weight, height, training_goal, selected_plan, payment_method)
VALUES (1, 'João Silva', 25, 75.5, 1.75, 'Hipertrofia', 'mensal', 'credito');

-- Inserir frequência de teste
INSERT INTO attendance (user_id, date, status)
VALUES (1, CURRENT_DATE, 'present');

-- ==========================================
-- CONSULTAS DE VERIFICAÇÃO
-- ==========================================

-- Ver todos os dados
SELECT * FROM users;
SELECT * FROM member_profiles;
SELECT * FROM attendance;

-- Ver estrutura das tabelas
\d users;
\d member_profiles;
\d attendance;
