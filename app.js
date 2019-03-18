const express = require('express')

const urlRoutes = require('./routes/urlRoutes.js')

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/urls', urlRoutes)


module.exports = app