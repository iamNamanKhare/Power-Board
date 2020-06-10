const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    userID: String,
    tasks: [{
        title: String,
        done: {
            type: Boolean,
            default: false
        }
    }]
})

const UserToDoList = mongoose.model('UserTodoList', todoSchema);

module.exports = UserToDoList
