const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import database connection (this will establish the connection)
require('./config/database');

// Routes
const studentsRoutes = require('./Controllers/StudentsController');
const teachersRoutes = require('./Controllers/TeachersController');
const coursesRoutes = require('./Controllers/CoursesController');
const enrollmentsRoutes = require('./Controllers/EnrollmentsController');
const gradesRoutes = require('./Controllers/GradesController');
const attendanceRoutes = require('./Controllers/AttendanceController');

app.use('/api/students', studentsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/attendance', attendanceRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'School Management System API' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});