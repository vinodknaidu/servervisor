export const STORE_USER = 'STORE_USER'
export const CLEAR_USER = 'CLEAR_USER'

export function loggedInUser(state = null, action) {
  switch (action.type) {
    case STORE_USER: return action.payload
    case CLEAR_USER:
    default: return state
  }
}