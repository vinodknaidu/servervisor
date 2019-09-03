import { all, takeLatest } from 'redux-saga'

export default function* () {
  yield all([
    takeLatest()
  ])
}