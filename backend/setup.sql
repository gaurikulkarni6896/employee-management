CREATE DATABASE employee_db;

-- Connect to employee_db before running the statements below.

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    department VARCHAR(100),
    city VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER'
);

INSERT INTO employees (name, email, department, city) VALUES
('Aarav Sharma', 'aarav.sharma@example.com', 'Engineering', 'Pune'),
('Priya Patil', 'priya.patil@example.com', 'HR', 'Mumbai'),
('Rohan Deshmukh', 'rohan.deshmukh@example.com', 'Engineering', 'Pune'),
('Sneha Kulkarni', 'sneha.kulkarni@example.com', 'Finance', 'Nashik'),
('Vikram Joshi', 'vikram.joshi@example.com', 'Sales', 'Mumbai'),
('Neha Shah', 'neha.shah@example.com', 'Marketing', 'Ahmedabad'),
('Aditya More', 'aditya.more@example.com', 'Engineering', 'Nagpur'),
('Kavya Rao', 'kavya.rao@example.com', 'HR', 'Bengaluru')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', 'admin123', 'ADMIN')
ON CONFLICT (email) DO NOTHING;
