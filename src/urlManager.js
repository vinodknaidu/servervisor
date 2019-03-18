const database = require('./database.js')


async function storeUrl(urlObj) {
  let dbConn = await database.getConnection()

  return dbConn.collection('urls').insertOne(urlObj)
    .catch(err => {
      console.log(err)
    })
}

function constructUrlObj(urlObj) {
  let url = {
    url: urlObj.url,
    urlMeta: {
      name: urlObj.urlName
    },
    addedOn: new Date().getTime()
  }

  if (urlObj.userId) {
    url.userId = urlObj.userId
  }

  return url
}

function saveUrl(urlObj) {
  return storeUrl(constructUrlObj(urlObj))
}

async function getUrls(userId) {
  let dbConn = await database.getConnection()

  let query
  if (userId) {
    query = {
      userId: userId
    }
  } else {
    query = {
      userId: {
        $exists: false
      }
    }
  }

  let cursor = await dbConn.collection('urls').find(query)

  return cursor.toArray()
    .catch(err => {
      console.log(err)
    })
}

async function storePollResult(pollResult) {
  try {
    let dbConn = await database.getConnection()

    return dbConn.collection('pollResults').insertOne(pollResult)
  }
  catch (err) {
    console.log(err)
  }
}

function savePollResult(pollResult) {
  return storePollResult(pollResult)
}

async function getPollResults(url) {
  try {
    let dbConn = await database.getConnection()

    let query = {}
    if (url) {
      query = {
        url: url
      }
    }

    let cursor = await dbConn.collection('pollResults').find(query, {
      projection: { _id: 0 }
    }).limit(10)

    return cursor.toArray()
  }
  catch (err) {
    console.log(err)
  }
}


module.exports = {
  saveUrl: saveUrl,
  getUrls: getUrls,

  savePollResult: savePollResult,
  getPollResults: getPollResults
}