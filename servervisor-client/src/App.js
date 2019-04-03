import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

import Urls from './components/Urls.js'
import PollResults from './components/PollResults.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedUrl: ''
    }

    this.setSelectedUrl = this.setSelectedUrl.bind(this)
  }

  setSelectedUrl(url) {
    this.setState({
      selectedUrl: url
    })
  }

  render() {
    return (
      <Grid container>
        <Grid item sm={6}>
          <Card>
            <Urls setSelectedUrl={this.setSelectedUrl} />
          </Card>
        </Grid>
        <Grid item sm={6}>
          <PollResults url={this.state.selectedUrl}/>
        </Grid>
      </Grid>
    )
  }
}

export default App