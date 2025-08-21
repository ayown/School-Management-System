const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Changed this line
const Student = require('../Models/Student');

// Get all students
router.get('/', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get student by ID
router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM students WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(results[0]);
    });
});

// Create new student
router.post('/', (req, res) => {
    const { firstName, lastName, email, phone, dateOfBirth, address } = req.body;
    const query = 'INSERT INTO students (firstName, lastName, email, phone, dateOfBirth, address, enrollmentDate) VALUES (?, ?, ?, ?, ?, ?, NOW())';
    
    db.query(query, [firstName, lastName, email, phone, dateOfBirth, address], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Student created successfully' });
    });
});

// Update student
router.put('/:id', (req, res) => {
    const { firstName, lastName, email, phone, dateOfBirth, address } = req.body;
    const query = 'UPDATE students SET firstName = ?, lastName = ?, email = ?, phone = ?, dateOfBirth = ?, address = ? WHERE id = ?';
    
    db.query(query, [firstName, lastName, email, phone, dateOfBirth, address, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student updated successfully' });
    });
});

// Delete student
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM students WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    });
});

module.exports = router;