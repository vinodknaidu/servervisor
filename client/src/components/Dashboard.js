import React from 'react'
import {
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import UrlList from 'containers/UrlList'
import PollResults from 'containers/PollResults'
import AddUrl from 'containers/AddUrl'

const useStyles = makeStyles(theme => {
  return {
    dashboardContainer: {
      border: '1px solid',
      borderColor: theme.global.borderColor,
      height: '100%',
      overflow: 'auto'
    },
    divider: {
      border: '5px solid',
      borderColor: theme.global.borderColor,
      width: 1
    },
    item: {
      height: '100%',
      overflow: 'auto',
      overflowX: 'hidden'
    }
  }
})

function Dashboard() {
  const classes = useStyles()

  return <Grid className={classes.dashboardContainer} container>
    <Grid className={classes.item} item xs>
      <AddUrl />
      <UrlList />
    </Grid>
    <Grid className={classes.divider} item></Grid>
    <Grid className={classes.item} item xs>
      <PollResults />
    </Grid>
  </Grid>
}

export default Dashboard