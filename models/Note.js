const mongoose = require('mongoose');  

var Note;

if(mongoose.models.Note)
{
    Note=mongoose.model('Note');
}
else
{
    var NoteSchema = new mongoose.Schema({  
        title: String,
        description: String
    });
    Note=mongoose.model('Note',NoteSchema);
}

module.exports = Note;
