const express = require('express')

const urlManagerRouter = require('./routes/urlManager.js')

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/urls', urlManagerRouter)


module.exports = app