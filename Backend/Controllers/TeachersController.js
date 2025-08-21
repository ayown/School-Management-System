const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Fix this line
const Teacher = require('../Models/Teacher');

// Get all teachers
router.get('/', (req, res) => {
    const query = 'SELECT * FROM teachers';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get teacher by ID
router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM teachers WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(results[0]);
    });
});

// Create new teacher
router.post('/', (req, res) => {
    const { firstName, lastName, email, phone, department, hireDate, salary } = req.body;
    const query = 'INSERT INTO teachers (firstName, lastName, email, phone, department, hireDate, salary) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [firstName, lastName, email, phone, department, hireDate, salary], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Teacher created successfully' });
    });
});

// Update teacher
router.put('/:id', (req, res) => {
    const { firstName, lastName, email, phone, department, hireDate, salary } = req.body;
    const query = 'UPDATE teachers SET firstName = ?, lastName = ?, email = ?, phone = ?, department = ?, hireDate = ?, salary = ? WHERE id = ?';
    
    db.query(query, [firstName, lastName, email, phone, department, hireDate, salary, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json({ message: 'Teacher updated successfully' });
    });
});

// Delete teacher
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM teachers WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json({ message: 'Teacher deleted successfully' });
    });
});

module.exports = router;