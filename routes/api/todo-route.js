const router = require('express').Router()
const User = require('../../model/user-model')
const UserToDoList = require('../../model/todo-model')

// GET REQUEST TO FETCH TASK LIST
router.get('/', (req, res) => {
    console.log('[ GET REQUEST ] /api/todos')
    let userId = req.user.id;

    User.findById(userId)
        .then((user) => {
            UserToDoList.find({userID: user._id})
                .then((taskList) => {
                    // if user list is already created
                    if(taskList){
                        res.status(200).json({taskList})   //to be changed later on
                    }
                    else{
                        res.status(200).json({})
                    }
                })
                .catch((err) => {
                    console.log('Something wrong in to do list collection')
                    res.status(503).json({message: err})
                })
        })
        .catch((err) => {
            console.log('Error Find, User collection')
            res.status(503).json({message: err})
        })
})

// POST REQUEST TO ADD A TASK
router.post('/', (req, res) => {
    console.log('[ POST REQUEST ] /api/todos')
    var todoTask = {title: req.body.taskTitle}
    let userId = req.user.id;
    User.findById(userId)
        .then((user) => {
            console.log("User fetched POST" + user)
            UserToDoList.findOne({userID: user._id})
                .then((todoUser) => {

                    if(todoUser){   // ------- If user already exists in UserToDo Model -------
                        UserToDoList.updateOne({userID: user._id}, {$push:{tasks: todoTask}})
                            .then((createdTask) => {
                                // console.log("Field Successfully Created : " + createdTask)
                                res.status(201).json({createdTask})
                            })
                            .catch((err) => {
                                console.log("Error occurred , task, Existing User")
                                res.status(503).json({message: err})
                            })
                    }
                    else{   //--- If User is Creating a Task for the First Time -------
                        const userTask = new UserToDoList({ userID: user._id, tasks: todoTask})
                        userTask.save()
                            .then((createdTask) => {
                                // console.log("Task Successfully Created")
                                res.status(201).json(createdTask)
                            })
                            .catch((err) => {
                                console.log("Error occurred , task, new User")
                                res.status(503).json({message: err})
                            })
                        
                    }

                })
                .catch((err) => {
                    console.log("Error occured, Finding User in TODOLIST")
                    res.status(503).json({message: err})
                })
        })
        .catch((err) => {
            console.log(err)
            res.send('some error occured while Finding user in User Collection')
        })
})

// UPDATE REQUEST TO EDIT A COMPLETION STATUS OF TASK

router.post('/toggledone', (req, res) => {
    let userId = req.user.id

    User.findById(userId)
        .then((user) => {

            console.log("[ POST REQUEST ] DONE : " + req.body.isDone + " , with Id : " + req.body.objectID)

            UserToDoList.updateOne(
                { userID: user._id, 'tasks._id' : req.body.objectID},
                { $set: { 'tasks.$.done': req.body.isDone } },
                (err, toggledTask) => {
                    if(err){
                        console.log("Error while Deleting")
                        res.statusCode(503).json({err})
                    }

                    console.log("To Do list Updated Successfully")
                    res.json({toggledTask})
                }
            )
        })
        .catch((err) => {
            console.log("Error, Finding, User, User Collection")
            res.status(503).json({message: err})
        })
})

// POST REQUEST TO EDIT A COMPLETION STATUS OF TASK

router.post('/toggletitle', (req, res) => {
    let userId = req.user.id

    User.findById(userId)
        .then((user) => {

            console.log("[ POST REQUEST ] TITLE : " + req.body.title + " , with Id : " + req.body.objectID)

            UserToDoList.updateOne(
                { userID: user._id, 'tasks._id' : req.body.objectID},
                { $set: { 'tasks.$.title': req.body.title } },
                (err, toggledTask) => {
                    if(err){
                        console.log("Error while Deleting")
                        res.statusCode(503).json({err})
                    }

                    console.log("To Do list Updated Successfully")
                    res.json({toggledTask})
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

    User.findById(userId)
        .then((user) => {

            console.log("[ DELETE REQUEST ] Task Title : " + req.body.title)

            UserToDoList.updateOne(
                { userID: user._id},
                { $pull: { tasks: {title: req.body.title } } },
                (err, deletedTask) => {
                    if(err){
                        console.log("Error while Deleting")
                        res.statusCode(503).json({err})
                    }

                    console.log("To Do list Updated Successfully")
                    res.json({deletedTask})
                }
            )
        })
        .catch((err) => {
            console.log("Error, Finding, User, User Collection")
            res.status(503).json({message: err})
        })
})

module.exports = router