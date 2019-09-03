import React, { useState } from 'react'
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => {
  return {
    container: {
      maxWidth: 500,
      padding: 20,
      border: '1px solid',
      borderColor: theme.global.borderColor
    },
    loginButtonContainer: {
      textAlign: 'center'
    },
    itemBottomMargin: {
      marginBottom: 20
    }
  }
})

function Login() {
  const classes = useStyles()

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const handleOnChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  return <Grid className={classes.container} container>
    <Grid className={classes.itemBottomMargin} item xs={12}>
      <TextField
        fullWidth
        name="email"
        label="email"
        variant="outlined"
        type="email"
        onChange={handleOnChange('name')}
        value={values.name}
      />
    </Grid>
    <Grid className={classes.itemBottomMargin} item xs={12}>
      <TextField
        fullWidth
        name="password"
        label="password"
        variant="outlined"
        type="password"
        onChange={handleOnChange('password')}
        value={values.password}
      />
    </Grid>
    <Grid className={classes.loginButtonContainer} item xs={12}>
      <Button
        color="secondary"
        variant="contained"
      >
        Login
      </Button>
    </Grid>
  </Grid>
}

export default Login