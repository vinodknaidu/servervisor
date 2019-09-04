import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { loggedInUser } from './userStore'
import { selectedUrl } from './urlStore'
import rootSaga from 'sagas'

const rootReducer = combineReducers({
  loggedInUser,
  selectedUrl
})

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store
export const dispatch = store.dispatch