import axios from 'axios'

async function getUrls() {
  try {
    let urls = await axios.get('/urls')
    return urls.data
  }
  catch (err) {
    console.log(`fetcher:: getUrls(): ${err}`)
  }
}

async function getPollResults(url) {
  try {
    let _url = url ? `pollResults/${encodeURIComponent(url)}` : 'pollResults'
    let pollResults = await axios.get(_url)
    return pollResults.data
  }
  catch (err) {
    console.log(`fetcher:: getPollResults(): ${err}`)
  }
}

export { getUrls, getPollResults }