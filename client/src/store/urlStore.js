export const SET_SELECTED_URL = 'SET_SELECTED_URL'

export function selectedUrl(state = {}, action) {
  switch(action.type) {
    case SET_SELECTED_URL: return action.payload
    default: return state
  }
}
