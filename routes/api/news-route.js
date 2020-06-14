const router = require('express').Router()
const axios = require('axios').default
const keys = require('../../config/keys')

router.get('/', (req, res) => {
    console.log('[ GET REQUEST ] /api/news')
    
    axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.API_KEY||keys.news.API_KEY}`)
        .then((response) => {
            res.json(response.data)
        })
        .catch((err) => {
            console.log(err)
            res.send('Some error Occured while Fetching News')
        })
})

module.exports = router