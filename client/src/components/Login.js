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

function Login(props) {
  const classes = useStyles()

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const handleOnChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const login = event => {
    event.preventDefault()
    props.login(values.email, values.password)
  }

  return <form onSubmit={login}>
    <Grid className={classes.container} container>
      <Grid className={classes.itemBottomMargin} item xs={12}>
        <TextField
          autoComplete="off"
          fullWidth
          name="email"
          label="email"
          variant="outlined"
          type="email"
          onChange={handleOnChange}
          value={values.name}
          required
        />
      </Grid>
      <Grid className={classes.itemBottomMargin} item xs={12}>
        <TextField
          fullWidth
          autoComplete="off"
          name="password"
          label="password"
          variant="outlined"
          type="password"
          onChange={handleOnChange}
          value={values.password}
          required
        />
      </Grid>
      <Grid className={classes.loginButtonContainer} item xs={12}>
        <Button
          color="secondary"
          variant="contained"
          // onClick={login}
          type="submit"
        >
          Login
      </Button>
      </Grid>
    </Grid>
  </form>
}

export default Login