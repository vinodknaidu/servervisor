import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { getUrls } from 'api'
import { SET_SELECTED_URL } from 'store/urlStore'
import UrlList from 'components/UrlList'

function UrlListContainer() {
  const dispatch = useDispatch()

  const urlsRef = useRef(null)

  const [selectedUrl, setSelectedUrl] = useState({})

  const [urls, setUrls] = useState([])
  useEffect(() => {
    if (!urlsRef.current || urlsRef.current.length !== urls.length) {
      getUrls()
        .then(urls => {
          onUrlSelected(urls[0])
          setUrls(urls)
        })
    }
  })

  useEffect(() => {
    urlsRef.current = urls
  })

  const onUrlSelected = url => {
    setSelectedUrl(url)
    dispatch({ type: SET_SELECTED_URL, payload: url })
  }

  return <UrlList
    urls={urls}
    selectedUrl={selectedUrl}
    onClick={onUrlSelected}
  />
}

export default UrlListContainer
