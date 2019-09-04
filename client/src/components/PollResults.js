import React from 'react'
import moment from 'moment'
import {
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  list: {
    width: 400
  }
})

function PollResults(props) {
  const classes = useStyles()

  const { pollResults } = props

  return <List className={classes.list}>
    {
      pollResults.map((pollResult, idx) => <React.Fragment key={idx}>
        <ListItem
          style={{
            backgroundColor: resolveBackgroundColor(pollResult.statusCode)
          }}
        >
          <ListItemText
            primary={`Status: ${pollResult.statusText}`}
            secondary={`Code: ${pollResult.statusCode}`}
          />
          <ListItemText
            primary={`Response Time: ${pollResult.responseTime}`}
            secondary={`Polled On: ${moment(pollResult.lastCheckedOn).format('DD/MM/YYYY HH:mm')}`}
          />
        </ListItem>
        <Divider />
      </React.Fragment>)
    }
  </List>
}

function resolveBackgroundColor(statusCode) {
  switch (statusCode) {
    case 200: return '#33cc33'
    case 404: return '#ff9900'
    case 0: return '#ff3300'
    default: return ''
  }
}

export default PollResults
