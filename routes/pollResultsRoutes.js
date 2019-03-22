const router = require('express').Router()

const pollResultsController = require('../src/controllers/pollResultsController.js')

router.get('/', async function(req, res) {
  let pollResults = await pollResultsController.getPollResults()

  res.send(pollResults)
})

router.get('/:url', async function(req, res) {
  let pollResults = await pollResultsController.getPollResults(req.params.url)

  res.send(pollResults)
})

module.exports = router