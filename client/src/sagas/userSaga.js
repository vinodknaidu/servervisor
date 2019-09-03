import { call, put } from 'redux-saga/effects'

import { STORE_USER } from 'store/userStore'
import { login as loginUser } from 'api'

export function* login(action) {
  try {
    const userDetails = yield call(loginUser, action.payload.email, action.payload.password)
    if (userDetails) {
      yield put({ type: STORE_USER, payload: userDetails })
    }
  }
  catch (error) {
    console.error(error)
  }
}
