const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');

// Get all voters
router.get('/voters', (req, res) => {
    const sql = `SELECT * FROM voters ORDER BY last_name`;
    const params = [];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get specific voter
router.get('/voter/:id', (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;

    db.all(sql, req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: row
        });
    });
});

// Add voter
router.post('/voter', ({ body }, res) => {
    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.email];
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    db.all(sql, params, function(err, row) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: body,
            id: this.lastID
        });
    });
});

// Update a voter
router.put('/voter/:id', ({ body }, res) => {
    // Data validation
    const errors = inputCheck(req.body, 'email');
    if (error) {
        res.status(400).json({ error: errors });
        return;
    }

    // Prepare statement
    const sql = `UPDATE voters SET email = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];

    // Execute
    db.run(sql, params, function(err, data) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: req.body,
            changes: this.changes
        });
    });
});

// Delete a voter
router.delete('/voter/:id', (req, res) => {
    const sql = `DELETE FROM voters WHERE id = ?`;
  
    db.run(sql, req.params.id, function(err, result) {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }
    
        res.json({ message: 'deleted', changes: this.changes });
    });
  });

module.exports = router;