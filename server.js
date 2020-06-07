const express = require('express')
const path = require('path')
const app = express()
const authRoutes = require('./routes/auth-routes')
const passport = require('./config/passport-setup')
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
    keys: ['somesecretkey']
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

app.use('/', express.static(path.join(__dirname, 'Public')))
app.use('/auth', authRoutes)

app.get('/home', isLoggedIn, (req, res) => {
    res.send("You Reached The Home Page")
})

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout()
    res.redirect('/')
})

app.listen(port, () => {
    console.log('Server Running at port : ' + port)
})
