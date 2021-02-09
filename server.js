// Load dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { nanoid } = require('nanoid');
const { json } = require('express');
const { env } = require('process');

// Create constants
const app = express();
const PORT = process.env.PORT || 8080;

// Sending JSON: Note to self: RESEARCH THIS TO UNDERSTAND IT vvvvv
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Expose the public directory
app.use(express.static('public'));

// HTML routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/notes.html'));
});

app.get('/api/notes', (req, res) => {
  // Should read the db.json file and return all saved notes as JSON
  const db = JSON.parse(fs.readFileSync('db.json', { encoding:'utf-8' }));

  res.type('application/json');
  res.json(db);
});

app.get('/api/note/:id', (req, res) => {
  const id = req.params.id;

  console.log("Getting note with id: " + id);

  // Should read the db.json file and return all saved notes as JSON
  const db = JSON.parse(fs.readFileSync('db.json', { encoding:'utf-8' }));

  res.type('application/json');

  res.json(db.find((element) => {
    return element.id == id;
  }));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// POST routes
app.post('/api/notes', (req, res) => {
  // Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
  const note = req.body;
  note.id = nanoid();

  const db = JSON.parse(fs.readFileSync('db.json', { encoding:'utf-8' }));
  
  fs.writeFileSync("db.json", JSON.stringify([...db, note]));

  res.json(req.body);
});

// DELETE route
app.delete('/api/note/delete/:id', (req, res) => {
  const id = req.params.id;
  console.log("Deleting " + id);

  // Should read the db.json file and return all saved notes as JSON
  const db = JSON.parse(fs.readFileSync('db.json', { encoding:'utf-8' }));

  var index = db.map(x => {
    return x.Id;
  }).indexOf(id);
  
  db.splice(index, 1);

  fs.writeFileSync("db.json", JSON.stringify(db));

  res.send("Deleted entry with id: " + id);
});

// Start the server listening
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`)
});