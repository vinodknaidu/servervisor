import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  Grid,
  AppBar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import './App.css'

const useStyles = makeStyles({
  container: {
    height: '100%'
  }
})

function App() {
  const classes = useStyles()

  return <Grid className={classes.container} container direction="column">
    <Grid item>
      {/* <AppBar /> */}header
    </Grid>
    <Grid item xs>
      content
    </Grid>
    <Grid item>
      footer
    </Grid>
  </Grid>
}

export default App;
