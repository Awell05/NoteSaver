const express = require('express');
const path = require('path');
const fs = require('fs');
const savedNotes = require('./db/db.json');
const PORT = process.env.PORT || 3002;
const { v4: uuidv4 } = require('uuid');

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
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            var notes = JSON.parse(data)
            res.json(notes)
        }
    })
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to save notes`);
    console.log(req.body);


    const newNote = req.body;
    newNote.id = uuidv4()
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let parseDb = JSON.parse(data);
            parseDb.push(newNote)
            fs.writeFileSync('./db/db.json', JSON.stringify(parseDb), (err, data) => {
                if (err) {
                    console.error(err);
                }
            })
        }
    })
});

app.delete('/api/notes/:id', (req,res) => {
    console.log(req.params.id);
const newNotes = savedNotes.filter(function(note){
    return note.id != req.params.id
})
console.log(newNotes)
fs.writeFileSync('./db/db.json', JSON.stringify(newNotes), (err, data) => {
    if (err) {
        console.error(err);
    }
})
})


app.listen(PORT, () => {
    console.log(`check if the link works at http://localhost:${PORT}`);
});
