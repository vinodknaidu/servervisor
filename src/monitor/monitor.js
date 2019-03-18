const poller = require('./poller.js')
const urlManager = require('../urlManager.js')

 
async function startHealthCheck() {
  try {
    let urlsObj = await urlManager.getUrls()

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
    return urlManager.savePollResult(pollResult)
  }
  catch (err) {
    console.log(err)
  }
}

startHealthCheck()
module.exports = {
  startHealthCheck: startHealthCheck
}