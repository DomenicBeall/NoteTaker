// Load dependencies
const express = require('express');
const path = require('path');

// Create constants
const app = express();
const PORT = 8080;

// Sending JSON: Note to self: RESEARCH THIS TO UNDERSTAND IT vvvvv
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// An array of notes
const notes = [
  {
    title: "Test Note 1",
    body: "Test note 1 body"
  },
  {
    title: "Test Note 2",
    body: "Test note 2 body"
  }
];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
})

app.get('/api/getNotes', (req, res) => {
  res.json(notes);
})

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`)
})