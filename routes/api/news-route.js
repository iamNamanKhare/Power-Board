const router = require('express').Router()
const axios = require('axios').default
const keys = require('../../config/keys')

router.get('/', (req, res) => {
    
    axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${keys.news.API_KEY}`)
        .then((response) => {
            res.json(response.data)
        })
        .catch((err) => {
            console.log(err)
            res.send('Some error Occured while Fetching News')
        })
})

module.exports = router