const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Get all parties
router.get('/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
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

// Get a single party
router.get('/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE parties.id = ?`;

    db.get(sql, req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: row
        })
    })
});

// Delete a party
router.delete('/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    
    db.run(sql, req.params.id, function(err, result) {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }

        res.json({
            message: 'sucessfully deleted',
            changes: this.changes
        })
    })
});

module.exports = router;