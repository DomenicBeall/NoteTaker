// Load dependencies
const express = require('express');
const path = require('path');

// Create constants
const app = express();
const PORT = 8080;

// Sending JSON: Note to self: RESEARCH THIS TO UNDERSTAND IT vvvvv
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
})


app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`)
})