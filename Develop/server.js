const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.listen(PORT, () => {
    console.log(`check if the link works at http://localhost:${PORT}`);
});

