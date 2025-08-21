const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Fix this line

// Get all attendance records
router.get('/', (req, res) => {
    const query = `
        SELECT a.*, s.firstName as studentFirstName, s.lastName as studentLastName,
               c.courseName, c.courseCode
        FROM attendance a
        JOIN students s ON a.studentId = s.id
        JOIN courses c ON a.courseId = c.id
        ORDER BY a.attendanceDate DESC
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get attendance by ID
router.get('/:id', (req, res) => {
    const query = `
        SELECT a.*, s.firstName as studentFirstName, s.lastName as studentLastName,
               c.courseName, c.courseCode
        FROM attendance a
        JOIN students s ON a.studentId = s.id
        JOIN courses c ON a.courseId = c.id
        WHERE a.id = ?
    `;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json(results[0]);
    });
});

// Create new attendance record
router.post('/', (req, res) => {
    const { studentId, courseId, attendanceDate, status, notes } = req.body;
    const query = 'INSERT INTO attendance (studentId, courseId, attendanceDate, status, notes) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [studentId, courseId, attendanceDate, status || 'present', notes], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Attendance record created successfully' });
    });
});

// Update attendance record
router.put('/:id', (req, res) => {
    const { status, notes } = req.body;
    const query = 'UPDATE attendance SET status = ?, notes = ? WHERE id = ?';
    
    db.query(query, [status, notes, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json({ message: 'Attendance record updated successfully' });
    });
});

// Delete attendance record
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM attendance WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json({ message: 'Attendance record deleted successfully' });
    });
});

module.exports = router;