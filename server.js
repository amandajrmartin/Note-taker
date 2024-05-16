const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
// const api = require('./routes');

const PORT = process.env.PORT || 3001;  // 8080 3000 300q 5000 5500
const app = express();  // this line CREATE or INITALIZES our API SERVER 

// Middleware for parsing JSON and urlencoded form data --> We convert the incoming 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// HTTP methods 
// GET POST PUT PATCH DELETE || HEAD OPTIONS

// ROUTES GO HERE 
app.get('/notes', function (request, response) {

    response.sendFile(path.join(__dirname, './public/notes.html'))
})


// Read in the saved data --> fs.readFile()  db.json 

// we may have to conver the JSON data into JavaScript data to manipulate it


// we NEED TO SEND that data BACK in JSON FORMAT
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // Assign a unique id to the new note

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        let notes;
        try {
            notes = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing db.json:', parseErr);
            return res.status(500).json({ error: 'Failed to parse notes' });
        }

        notes.push(newNote);

        fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to db.json:', writeErr);
                return res.status(500).json({ error: 'Failed to save note' });
            }

            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        let notes;
        try {
            notes = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing db.json:', parseErr);
            return res.status(500).json({ error: 'Failed to parse notes' });
        }

        const filteredNotes = notes.filter(note => note.id !== noteId);

        fs.writeFile(dbPath, JSON.stringify(filteredNotes, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to db.json:', writeErr);
                return res.status(500).json({ error: 'Failed to delete note' });
            }

            res.json({ message: 'Note deleted successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/api/notes', function (req, res) {
    console.log("Incoming Reaques Body data: ", req.body)
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});