const router = require('express').Router()
const User = require('../../model/user-model')
const UserNotes = require('../../model/notes-model')

// GET REQUEST TO FETCH TASK LIST
router.get('/', (req, res) => {
    console.log('[ GET REQUEST ] /api/notes')
    let userId = req.user.id;

    User.findById(userId)
        .then((user) => {

            UserNotes.findOne({userID: user._id})
                .then((notes) => {
                    // if user list is already created
                    if(notes){
                        res.status(200).json({notes})   //to be changed later on
                    }
                    else{
                        res.status(200).json({})
                    }
                })
                .catch((err) => {
                    console.log('Error in Notes [GET] collection')
                    res.status(503).json({message: err})
                })
        })
        .catch((err) => {
            console.log('Error Find, User collection')
            res.status(503).json({message: err})
        })
})

// POST REQUEST TO ADD A NOTE
router.post('/', (req, res) => {
    console.log('[ POST REQUEST ] /api/notes')
    let newNote = {title: req.body.noteTitle, desc: req.body.noteDesc}
    let userId = req.user.id;
    User.findById(userId)
        .then((user) => {
            
            UserNotes.findOne({userID: user._id})
                .then((notesUser) => {

                    if(notesUser){   // ------- If user already exists in UserNotes Model -------
                        UserNotes.updateOne({userID: user._id}, {$push:{notesList: newNote}})
                            .then((createdNote) => {
                                // console.log("Field Successfully Created : " + createdTask)
                                res.status(201).json({createdNote})
                            })
                            .catch((err) => {
                                console.log("Error occurred , Notes, Existing User")
                                res.status(503).json({message: err})
                            })
                    }
                    else{   //--- If User is Creating a Note for the First Time -------
                        const userNote = new UserNotes({ userID: user._id, notesList: newNote})
                        userNote.save()
                            .then((createdNote) => {
                                // console.log("Task Successfully Created")
                                res.status(201).json(createdNote)
                            })
                            .catch((err) => {
                                console.log("Error occurred , notes, new User")
                                res.status(503).json({message: err})
                            })
                        
                    }

                })
                .catch((err) => {
                    console.log("Error occured, Finding User in NOTESLIST")
                    res.status(503).json({message: err})
                })
        })
        .catch((err) => {
            console.log(err)
            res.send('some error occured while Finding user in User Collection')
        })
})

// UPDATE REQUEST TO EDIT A NOTE

router.post('/edit', (req, res) => {
    let userId = req.user.id

    console.log("[ POST REQUEST ] Edit Notes")

    User.findById(userId)
        .then((user) => {

            UserNotes.updateOne(
                { userID: user._id, 'notesList.title' : req.body.noteTitle},
                { $set: {'notesList.$.desc': req.body.noteDesc } },
                (err, editedNote) => {
                    if(err){
                        console.log("Error while Editing a Note")
                        res.statusCode(503).json({err})
                    }

                    console.log("Note updated Successfully")
                    res.json({editedNote})
                }
            )
        })
        .catch((err) => {
            console.log("Error, Finding, User, User Collection")
            res.status(503).json({message: err})
        })
})

// DELETE REQUEST TO DELETE A TASK

router.delete('/', (req, res) => {
    let userId = req.user.id

    console.log("[ DELETE REQUEST ] Notes ")
    
    User.findById(userId)
        .then((user) => {

            UserNotes.updateOne(
                { userID: user._id},
                { $pull: { notesList: {title: req.body.noteTitle } } },
                (err, deletedNote) => {
                    if(err){
                        console.log("Error while Deleting Note")
                        res.statusCode(503).json({err})
                    }

                    console.log("Note Deleted Successfully")
                    res.json({deletedNote})
                }
            )
        })
        .catch((err) => {
            console.log("Error, Finding, User, User Collection")
            res.status(503).json({message: err})
        })
})

module.exports = router