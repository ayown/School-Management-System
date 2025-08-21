const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Fix this line

// Get all grades
router.get('/', (req, res) => {
    const query = `
        SELECT g.*, s.firstName as studentFirstName, s.lastName as studentLastName,
               c.courseName, c.courseCode
        FROM grades g
        JOIN students s ON g.studentId = s.id
        JOIN courses c ON g.courseId = c.id
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get grade by ID
router.get('/:id', (req, res) => {
    const query = `
        SELECT g.*, s.firstName as studentFirstName, s.lastName as studentLastName,
               c.courseName, c.courseCode
        FROM grades g
        JOIN students s ON g.studentId = s.id
        JOIN courses c ON g.courseId = c.id
        WHERE g.id = ?
    `;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Grade not found' });
        }
        res.json(results[0]);
    });
});

// Create new grade
router.post('/', (req, res) => {
    const { studentId, courseId, grade, letterGrade, examType, examDate } = req.body;
    const query = 'INSERT INTO grades (studentId, courseId, grade, letterGrade, examType, examDate) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [studentId, courseId, grade, letterGrade, examType, examDate], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Grade created successfully' });
    });
});

// Update grade
router.put('/:id', (req, res) => {
    const { grade, letterGrade, examType, examDate } = req.body;
    const query = 'UPDATE grades SET grade = ?, letterGrade = ?, examType = ?, examDate = ? WHERE id = ?';
    
    db.query(query, [grade, letterGrade, examType, examDate, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Grade not found' });
        }
        res.json({ message: 'Grade updated successfully' });
    });
});

// Delete grade
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM grades WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Grade not found' });
        }
        res.json({ message: 'Grade deleted successfully' });
    });
});

module.exports = router;