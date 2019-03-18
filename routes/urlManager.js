const router = require('express').Router()

const urlManager = require('../src/urlManager.js')

router.get('/:userId?', async function (req, res) {
  let urls = await urlManager.getUrls(req.params.userId)
  
  res.send(urls)
})

router.post('/', async function (req, res) {
  await urlManager.saveUrl(req.body)

  res.status(200).send()
})

module.exports = router