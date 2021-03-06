const router = require('express').Router()
const passport = require('../config/passport-setup')

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/redirect', passport.authenticate('google'),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
});

module.exports = router
