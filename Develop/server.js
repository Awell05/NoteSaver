const express = require('express');
const path = require('path');
const fs = require('fs');
const savedNotes = require('./db/db.json');
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
});

app.get('/api/notes', (req, res) => {
    res.status(200).json(savedNotes);
});

app.post('/api/notes', (req,res)=> {
    console.info(`${req.method} request received to save notes`);
    console.log(req.body);

const newNote = req.body;

 fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        let parseDb = JSON.parse(data);
        parseDb.push(newNote) 
        fs.appendFile('./db/db.json', JSON.stringify(parseDb), (err, data) => {
        if (err) {
        console.error(err);
        }
    })
    }
})
});


app.listen(PORT, () => {
    console.log(`check if the link works at http://localhost:${PORT}`);
});

