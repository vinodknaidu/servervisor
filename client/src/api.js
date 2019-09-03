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
