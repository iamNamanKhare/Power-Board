const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 5000

app.get('/', express.static(path.join(__dirname, 'Public')))

app.listen(port, () => {
    console.log('Server Running at port : ' + port)
})