const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Fix this line
const Course = require('../Models/Course');

// Get all courses
router.get('/', (req, res) => {
    const query = `
        SELECT c.*, t.firstName as teacherFirstName, t.lastName as teacherLastName 
        FROM courses c 
        LEFT JOIN teachers t ON c.teacherId = t.id
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get course by ID
router.get('/:id', (req, res) => {
    const query = `
        SELECT c.*, t.firstName as teacherFirstName, t.lastName as teacherLastName 
        FROM courses c 
        LEFT JOIN teachers t ON c.teacherId = t.id 
        WHERE c.id = ?
    `;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(results[0]);
    });
});

// Create new course
router.post('/', (req, res) => {
    const { courseName, courseCode, description, credits, teacherId } = req.body;
    const query = 'INSERT INTO courses (courseName, courseCode, description, credits, teacherId) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [courseName, courseCode, description, credits, teacherId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Course created successfully' });
    });
});

// Update course
router.put('/:id', (req, res) => {
    const { courseName, courseCode, description, credits, teacherId } = req.body;
    const query = 'UPDATE courses SET courseName = ?, courseCode = ?, description = ?, credits = ?, teacherId = ? WHERE id = ?';
    
    db.query(query, [courseName, courseCode, description, credits, teacherId, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course updated successfully' });
    });
});

// Delete course
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM courses WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    });
});

module.exports = router;