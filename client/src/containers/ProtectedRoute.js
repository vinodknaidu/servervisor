import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ component: Component, ...rest }) {
  const loggedInUser = useSelector(state => state.loggedInUser)

  return <Route
    {...rest}
    render={props => loggedInUser ?
      <Component {...props} /> :
      <Redirect to="/" />
    }
  />
}

export default ProtectedRoute
