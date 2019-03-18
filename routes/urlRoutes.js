const router = require('express').Router()

const urlController = require('../src/controllers/urlController.js')

router.get('/:userId?', async function (req, res) {
  let urls = await urlController.getUrls(req.params.userId)
  
  res.send(urls)
})

router.post('/', async function (req, res) {
  await urlController.saveUrl(req.body)

  res.status(200).send()
})

module.exports = router