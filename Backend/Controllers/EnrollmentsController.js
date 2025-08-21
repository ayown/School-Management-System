const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Fix this line

// Get all enrollments
router.get('/', (req, res) => {
    const query = `
        SELECT e.*, s.firstName as studentFirstName, s.lastName as studentLastName,
               c.courseName, c.courseCode
        FROM enrollments e
        JOIN students s ON e.studentId = s.id
        JOIN courses c ON e.courseId = c.id
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get enrollment by ID
router.get('/:id', (req, res) => {
    const query = `
        SELECT e.*, s.firstName as studentFirstName, s.lastName as studentLastName,
               c.courseName, c.courseCode
        FROM enrollments e
        JOIN students s ON e.studentId = s.id
        JOIN courses c ON e.courseId = c.id
        WHERE e.id = ?
    `;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.json(results[0]);
    });
});

// Create new enrollment
router.post('/', (req, res) => {
    const { studentId, courseId, status } = req.body;
    const query = 'INSERT INTO enrollments (studentId, courseId, status) VALUES (?, ?, ?)';
    
    db.query(query, [studentId, courseId, status || 'active'], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Enrollment created successfully' });
    });
});

// Update enrollment
router.put('/:id', (req, res) => {
    const { status } = req.body;
    const query = 'UPDATE enrollments SET status = ? WHERE id = ?';
    
    db.query(query, [status, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.json({ message: 'Enrollment updated successfully' });
    });
});

// Delete enrollment
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM enrollments WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.json({ message: 'Enrollment deleted successfully' });
    });
});

module.exports = router;