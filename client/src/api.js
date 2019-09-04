import axios from 'axios'

import { URLS } from 'constants.js'

export async function login(email, password) {
  try {
    const res = await axios.post(URLS.LOGIN, { email, password })
    if (res.status === 200) return res.data
    return null
  }
  catch (error) {
    console.error(error)
  }
}

export async function getUrls() {
  try {
    const res = await axios.get(URLS.GET_ADD_URLS)
    return res.data
  }
  catch (error) {
    console.error(error)
  }
}

export async function getPollResults(url) {
  try {
    const res = await axios.get(`${URLS.GET_POLL_RESULTS}?url=${url}`)
    return res.data
  }
  catch (error) {
    console.error(error)
  }
}

export async function addUrl(url) {
  try {
    const res = await axios.post(URLS.GET_ADD_URL, { url })
    return res.data
  }
  catch (error) {
    console.error(error)
  }
}
