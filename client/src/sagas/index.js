import { all, takeLatest } from 'redux-saga/effects'

import { LOGIN } from 'store/userStore'
import { login } from 'sagas/userSaga'

export default function* () {
  yield all([
    takeLatest(LOGIN, login)
  ])
}
