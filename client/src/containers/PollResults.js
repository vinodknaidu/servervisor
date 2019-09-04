import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getPollResults } from 'api'
import PollResults from 'components/PollResults'

function PollResultsContainer(props) {
  const selectedUrl = useSelector(state => state.selectedUrl)

  const [pollResults, setPollResults] = useState([])
  useEffect(() => {
    getPollResults(selectedUrl.url)
      .then(results => {
        setPollResults(results)
      })
  }, [selectedUrl.url])

  return <PollResults pollResults={pollResults} />
}

export default PollResultsContainer
