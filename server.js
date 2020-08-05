const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create DB
const db = new sqlite3.Database("./db/election.db", err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to the election database.');
})

// get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Get single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates
                 WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
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

// Default response for any other requests (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
})
