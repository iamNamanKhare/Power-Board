const express = require('express')
const path = require('path')
const app = express()
const passport = require('./passport-setup')
const cookieSession = require('cookie-session')

const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

// following code to be added in another file
const isLoggedIn = (req, res, next) => {
    if(req.user){
        next()
    }
    else{
        res.sendStatus(401)
    }
}

app.use(passport.initialize())
app.use(passport.session())

app.get('/', express.static(path.join(__dirname, 'Public')))
app.get('/failed', (req, res) => {
    res.send('You Failed to login.')
})

app.get('/success', isLoggedIn, (req, res) => {
    res.send(`Welcome to powerApp Mr. dot`)
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/success');
});

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout()
    res.redirect('/')
})

app.listen(port, () => {
    console.log('Server Running at port : ' + port)
})
