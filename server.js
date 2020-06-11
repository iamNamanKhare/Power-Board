const express = require('express')
const path = require('path')
const app = express()
const authRoutes = require('./routes/auth-routes')
const todoRoute = require('./routes/api/todo-route')
const notesRoute = require('./routes/api/notes-routes')
const newsRoute = require('./routes/api/news-route')
const passport = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const cors = require('cors')
require('./config/keys')

const port = process.env.PORT || 4000

const isLoggedIn = (req, res, next) => {    // can be added in another file
    if(req.user){
        next()
    }
    else{
        res.redirect('/')
    }
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

mongoose.connect(keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to Database')
})

app.use('/', express.static(path.join(__dirname, 'Public')))
app.use('/auth', authRoutes)

app.use('/api/todos', isLoggedIn, todoRoute)
app.use('/api/notes', isLoggedIn, notesRoute)
app.use('/api/news', isLoggedIn, newsRoute)

app.get('/home', isLoggedIn, (req, res) => {
    // console.log(req.user)
    res.sendFile(path.join(__dirname,'Public/home.html'))
})

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout()
    res.redirect('/')
})

app.listen(port, () => {
    console.log('Server Running at port : ' + port)
})
