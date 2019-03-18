const MongoClient = require('mongodb').MongoClient

const config = require('../config/config.json')


const client = new MongoClient(config.DB_URL, { useNewUrlParser: true })

const dbConn = new Promise((resolve, reject) => {
  client.connect()
    .then(client => {
      const admin = client.db(config.DATABASE_NAME).admin()
      return admin.listDatabases()
    })
    .then(databases => {
      for (let db of databases.databases) {
        if (db.name === config.DATABASE_NAME) {
          resolve(client.db(config.DATABASE_NAME))
          break
        }
      }
      reject(`Database not found: ${config.DATABASE_NAME}`)
    })
})

function getConnection() {
  return dbConn
    .catch(err => {
      console.log(`getDBConnection() ${err}`)
      throw new Error(err)
    })
}


module.exports = {
  getConnection: getConnection
}