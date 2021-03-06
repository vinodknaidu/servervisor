import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './App.css'

import ProtectedRoute from 'containers/ProtectedRoute'
import AppHeader from 'components/AppHeader'
import Login from 'containers/Login'
import Footer from 'components/Footer'
import Dashboard from 'components/Dashboard'

const useStyles = makeStyles({
  container: {
    height: '100%'
  },
  content: {
    overflow: 'auto',
    display: 'flex'
  }
})

function App() {
  const classes = useStyles()

  return <Router>
    <Grid className={classes.container} container direction="column">

      <Grid item>
        <AppHeader />
      </Grid>

      <Grid className={classes.content} item xs>
        <Grid
          className={classes.container}
          container
          justify="center"
          alignContent="center"
        >
          <Grid item style={{height: '100%'}}>
            <Route exact path="/" component={Login} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Footer />
      </Grid>

    </Grid>
  </Router>
}

export default App;
