import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { LOGIN } from 'store/userStore'
import Login from 'components/Login'

function LoginContainer(props) {
  const dispatch = useDispatch()

  const loggedInUser = useSelector(state => state.loggedInUser)
  if (loggedInUser) {
    return <Redirect to="/dashboard" />
  }

  const login = (email, password) => {
    const payload = { email, password }
    dispatch({ type: LOGIN, payload })
  }

  return <Login login={login} />
}

export default LoginContainer
