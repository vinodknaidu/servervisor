const poller = require('./poller.js')
const urlController = require('../controllers/urlController.js')
const pollResultsController = require('../controllers/pollResultsController.js')

 
async function startHealthCheck() {
  try {
    let urlsObj = await urlController.getUrls()

    urlsObj.forEach(urlObj => {
      setInterval(() => {
        checkAndSaveHealth(urlObj.url)
      }, 1000 * 10)
    })
  }
  catch (err) {
    console.log(err)
  }
}

async function checkAndSaveHealth(url) {
  try {
    let pollResult = await poller.poll(url)
    return pollResultsController.savePollResult(pollResult)
  }
  catch (err) {
    console.log(err)
  }
}

startHealthCheck()

module.exports = {
  startHealthCheck: startHealthCheck
}