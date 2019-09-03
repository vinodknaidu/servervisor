import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './App.css'

import AppHeader from 'components/AppHeader'
import Login from 'components/Login'
import Footer from 'components/Footer'
import Dashboard from './components/Dashboard'

const useStyles = makeStyles({
  container: {
    height: '100%'
  }
})

function App() {
  const classes = useStyles()
  const x = () => {
    return <h1>asdffdas</h1>
  }
  return <Router>
    <Grid className={classes.container} container direction="column">

      <Grid item>
        <AppHeader />
      </Grid>

      <Grid item xs>
        <Grid
          className={classes.container}
          container
          justify="center"
          alignContent="center"
        >
          <Grid item>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Dashboard} />
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
