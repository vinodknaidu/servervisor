import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'

function AppHeader(props) {
  return <AppBar position="static">
    <Toolbar>
      <Typography variant="h5">Servervisor</Typography>
    </Toolbar>
  </AppBar>
}

export default AppHeader
