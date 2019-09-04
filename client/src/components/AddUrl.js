import React from 'react'
import {
  Grid,
  TextField,
  Fab
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

function AddUrl(props) {
  return <Grid container justify="space-around" spacing={1} alignItems="center">
    <Grid item xs={9}>
      <TextField
        fullWidth
        variant="outlined"
        label="Add url to poll list"
      />
    </Grid>
    <Grid item xs={2}>
      <Fab
        size="small"
        color="secondary"
      >
        <AddIcon />
      </Fab>
    </Grid>
  </Grid>
}

export default AddUrl