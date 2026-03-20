CREATE DATABASE IF NOT EXISTS jobseeker;

USE jobseeker;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  full_name VARCHAR(100),
  education VARCHAR(255),
  experience_years INT,
  bio TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  skill_name VARCHAR(100)
);

CREATE TABLE user_skills (
  user_id INT,
  skill_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (skill_id) REFERENCES skills(id)
);

CREATE TABLE jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100),
  company VARCHAR(100),
  description TEXT,
  required_education VARCHAR(255)
);

CREATE TABLE job_skills (
  job_id INT,
  skill_id INT,
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  FOREIGN KEY (skill_id) REFERENCES skills(id)
);