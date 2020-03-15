// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var notesData = require("../db/notesData")
var journalData = require("../journal")

var fs = require("fs");
var util = require("util");
const writeFileAsync = util.promisify


module.exports = function(app) {
    // API GET Requests
    // Display all notes 
    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    app.get("/api/journal", function(req, res) {
        res.json(journalData);
    });

    // When we create new notes
    app.post("/api/notes", function(req, res) {
        const newNotes = req.body;

        
        console.log("Req.body:", req.body);
        notesData.push(newNotes);

        // then write to the db.json file
        writeFileAsync("../db/db.json", JSON.stringify(notesData)).then(function() {
            console.log("success!");
        });

        res.json(newNotes);
    });

    app.post("/api/notes/:id", function(req, res) {
        // Go find the lastid of the last note in json file, 
        // and if it exists, assign the note one value higher than that id
        let lastId = notesData[notesData.length - 1]["id"];
       
        let newId = lastId + 1;

        newNotes["id"] = newId;
        notesData.push(newId);
        writeFileAsync("../db/db.json", JSON.stringify(notesData)).then(function() {
            console.log("success!");
        });

        res.json(newId);
    });

}