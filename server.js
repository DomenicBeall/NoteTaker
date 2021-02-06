// Load dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const nanoid = require('nanoid');

// Create constants
const app = express();
const PORT = 8080;

// Sending JSON: Note to self: RESEARCH THIS TO UNDERSTAND IT vvvvv
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Expose the public directory
app.use(express.static('public'));

// HTML routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// POST routes
app.post('/api/setNote', (req, res) => {
  
});

// API routes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});


// Start the server listening
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`)
});