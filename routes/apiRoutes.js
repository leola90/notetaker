// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var notesData = require("../db/notesData");
var fs = require("fs");


module.exports = function(app) {
    // API GET Requests
    // Display all notes 
    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    // app.get("/api/journal", function(req, res) {
    //     res.json(journalData);
    // });


    // When we create new notes - takes in JSON input
    app.post("/api/notes", function(req, res) {
     
     // req.body contains our text parameters from the parsed request body
     let newNotes = req.body;

     //go find the lastID of notesData array
     let lastId = [notesData.length - 1];

     //then add a value to the newID 
     let newId = lastId + 1;
     
     notesData.push({newId, ...req.body});
     res.json(notesData.slice(-1))
      
    });

    app.delete("/api/notes/:id" , function(req, res) {

    })

};

