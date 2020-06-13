const router = require('express').Router()

router.get('/', (req, res, next) => {
    if(req.user){
        next()
    } else {
        res.redirect('/login')
    }
})

module.exports = router