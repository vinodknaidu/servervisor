import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Input from '@material-ui/core/Input'
import AddIcon from '@material-ui/icons/Add'

import styles from '../css/urls.module.css'

import * as fetcher from '../helper/fetcher.js'

class Urls extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      urls: [],
    }
  }

  componentDidMount() {
    fetcher.getUrls()
      .then(urls => {
        this.setState({ urls: urls })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleClick(idx) {
    this.setState({
      selectedIndex: idx
    })

    this.props.setSelectedUrl(this.state.urls[idx].url)
  }

  render() {
    const urls = this.state.urls

    return (
      <List>
        {urls.map((url, idx) => {
          return (
            <ListItem
            className={`${styles.addBorder} ${styles.cursorPointer}`}
            selected={this.state.selectedIndex === idx} 
            key={url.urlMeta.name}
            onClick={() => this.handleClick(idx)}
            >
              <ListItemText primary={`${url.urlMeta.name} - ${url.url}`} />
              <ListItemSecondaryAction>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}

        <ListItem>
          <ListItemText >
            <Input style={{width: '100%'}} placeholder="Add new URL"/>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton>
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    )
  }
}

export default Urls