const fs= require("fs");
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
// Creates unique ID
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.static("public"));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const {notes} = require("./db/db.json");

function updateDb(id, notesArray) {
  const deletedNote = id;
  for (let i = 0; i < notes.length; i++) {
    if (deletedNote === notes[i].id) {
      notes.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({notes: notesArray}, null, 2)
      );
    }
  }
}

function createNewNote(body, notesArray) {
  const newNote = body
  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({notes: notesArray}, null, 2)
  );
  return newNote;
};

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

app.post("/api/notes", (req, res) => {
  req.body.id = uuidv4();

  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
});

app.delete("/api/notes/:id" , (req, res) => {
  const params = req.params.id
  updateDb(params, notes);
  res.redirect('');
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server on port ${PORT}!`);
});