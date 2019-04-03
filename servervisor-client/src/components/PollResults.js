import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import * as fetcher from '../helper/fetcher.js'

class PollResults extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pollResults: []
    }
  }

  componentDidMount() {
    fetcher.getPollResults(this.props.url)
    .then(pollResults => {
      this.setState({
        pollResults: pollResults
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.url === this.props.url) return

    fetcher.getPollResults(this.props.url)
    .then(pollResults => {
      this.setState({
        pollResults: pollResults
      })
    })
  }

  render() {
    let pollResults = this.state.pollResults
    let listItem
    if (!pollResults.length) {
      listItem = [(
        <ListItem key="empty">
          <ListItemText primary="No poll results found."/>
        </ListItem>
      )]
    }
    else {
      listItem = pollResults.map((pollResult, idx) => {
        if (this.props.url) {
          return (
            <ListItem key={idx}>
              <ListItemText primary={`${pollResult.statusCode} : ${pollResult.statusText} : ${pollResult.result}`}/>
            </ListItem>
          )
        }
        return (
          <ListItem key={idx}>
            <ListItemText primary={`${pollResult.url} : ${pollResult.statusCode} : ${pollResult.result}`} />
          </ListItem>
        )
      })
    }

    return (
      <List>
        {listItem.length ? listItem : "No poll results found."}
      </List>
    )
  }
}

export default PollResults