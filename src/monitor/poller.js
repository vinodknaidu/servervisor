const axios = require('axios')


async function poll(url) {
  let startTime = new Date().getTime()

  try {
    let result = await axios.get(url)
    return {
      url: url,
      statusCode: result.status,
      statusText: result.statusText,
      result: 'pass',
      responseTime: new Date().getTime() - startTime,
      polledOn: new Date().getTime()
    }
  }
  catch (err) {
    return {
      url: url,
      result: 'fail',
      responseTime: new Date().getTime() - startTime,
      polledOn: new Date().getTime()
    }
  }
}


module.exports = {
  poll: poll
}