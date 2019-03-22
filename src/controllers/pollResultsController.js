const database = require('../database.js')

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
  savePollResult,
  getPollResults
}