const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notesSchema = new Schema({
    userID: String,
    notesList: [{
        title: String,
        desc: String
    }]

})

const notesUser = mongoose.model('UserNotes', notesSchema);

module.exports = notesUser
