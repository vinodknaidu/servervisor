import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Switch,
  Grid,
  IconButton
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const backgroundColor = '#e6f9ff'

const useStyles = makeStyles({
  list: {
    width: 400
  }
})

function UrlList(props) {
  const classes = useStyles()
  const { urls, selectedUrl } = props

  return <List className={classes.list}>
    {
      urls.map(url => <React.Fragment key={url.url}>
        <ListItem
          style={{
            backgroundColor: url.url === selectedUrl.url ?
              backgroundColor :
              ''
          }}
          disabled={url.status === 'active' ? false : true}
          button
          onClick={() => props.onClick(url)}
        >
          <ListItemText primary={url.url} secondary={url.status} />
          <ListItemSecondaryAction style={{ paddingTop: 20 }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Switch
                  edge="end"
                  checked={true}
                />
              </Grid>
              <Grid item>
                <IconButton>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </React.Fragment>)
    }
  </List>
}

export default UrlList
