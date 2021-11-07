const fs= require("fs");
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.static("public"));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const notes = require("./db/db.json");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`API server on port ${PORT}!`);
});