const express = require('express');
const db = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use apiRoutes
app.use('/api', apiRoutes);

// Default response
app.use((req, res) => {
    res.status(404).end();
})

// Start server
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`API server now on port ${PORT}!`);
    });
})


