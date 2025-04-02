import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Map from './Map'

// We'll load the script once for all maps
let isScriptLoaded = false
let isScriptLoading = false
let scriptLoadCallbacks = []

const loadScript = (callback) => {
  // If already loaded, just call the callback
  if (isScriptLoaded && window.google && window.google.maps) {
    callback(true)
    return
  }
  
  // If loading in progress, add callback to queue
  if (isScriptLoading) {
    scriptLoadCallbacks.push(callback)
    return
  }
  
  // Start loading
  isScriptLoading = true
  
  // Create script element
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDb_jsmHVPfJ3XvAYggQJ_SWqkFx9Okmpk&v=3.exp'
  
  // Handle load events
  script.onload = () => {
    isScriptLoaded = true
    isScriptLoading = false
    callback(true)
    
    // Process any queued callbacks
    scriptLoadCallbacks.forEach(cb => cb(true))
    scriptLoadCallbacks = []
  }
  
  script.onerror = () => {
    isScriptLoading = false
    callback(false)
    
    // Process any queued callbacks
    scriptLoadCallbacks.forEach(cb => cb(false))
    scriptLoadCallbacks = []
  }
  
  // Add script to document
  document.body.appendChild(script)
}

const MapWrapper = (props) => {
  const [scriptState, setScriptState] = useState({
    loaded: isScriptLoaded,
    error: false
  })
  
  useEffect(() => {
    if (!scriptState.loaded) {
      loadScript((success) => {
        setScriptState({
          loaded: success,
          error: !success
        })
      })
    }
  }, [])
  
  return (
    <Map 
      {...props} 
      isScriptLoaded={scriptState.loaded}
      isScriptLoadSucceed={!scriptState.error}
    />
  )
}

MapWrapper.propTypes = {
  context: PropTypes.string,
  zoom: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object
}

export default MapWrapper
