-- School Management System Database Schema

CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- Students Table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    dateOfBirth DATE,
    address TEXT,
    enrollmentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Teachers Table
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    department VARCHAR(100),
    hireDate DATE,
    salary DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    courseName VARCHAR(100) NOT NULL,
    courseCode VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    credits INT DEFAULT 3,
    teacherId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (teacherId) REFERENCES teachers(id) ON DELETE SET NULL
);

-- Enrollments Table
CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    courseId INT NOT NULL,
    enrollmentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (studentId, courseId)
);

-- Grades Table
CREATE TABLE grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    courseId INT NOT NULL,
    grade DECIMAL(5,2),
    letterGrade CHAR(2),
    examType VARCHAR(50),
    examDate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
);

-- Attendance Table
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    courseId INT NOT NULL,
    attendanceDate DATE NOT NULL,
    status ENUM('present', 'absent', 'late') DEFAULT 'present',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance (studentId, courseId, attendanceDate)
);

-- Insert Sample Data
INSERT INTO teachers (firstName, lastName, email, department, hireDate, salary) VALUES
('John', 'Smith', 'john.smith@school.edu', 'Mathematics', '2020-01-15', 55000.00),
('Sarah', 'Johnson', 'sarah.johnson@school.edu', 'English', '2019-08-20', 52000.00),
('Michael', 'Brown', 'michael.brown@school.edu', 'Science', '2021-03-10', 58000.00);

INSERT INTO students (firstName, lastName, email, phone, dateOfBirth, address) VALUES
('Alice', 'Wilson', 'alice.wilson@student.edu', '555-0101', '2005-03-15', '123 Main St, City, State'),
('Bob', 'Davis', 'bob.davis@student.edu', '555-0102', '2005-07-22', '456 Oak Ave, City, State'),
('Carol', 'Miller', 'carol.miller@student.edu', '555-0103', '2005-11-08', '789 Pine Rd, City, State');

INSERT INTO courses (courseName, courseCode, description, credits, teacherId) VALUES
('Algebra I', 'MATH101', 'Introduction to algebraic concepts', 3, 1),
('English Literature', 'ENG201', 'Study of classic literature', 4, 2),
('Biology', 'SCI301', 'Introduction to biological sciences', 4, 3);