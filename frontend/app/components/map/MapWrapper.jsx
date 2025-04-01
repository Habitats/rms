import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Map from './Map.jsx'
import makeAsyncScriptLoader from 'react-async-script'

const URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDb_jsmHVPfJ3XvAYggQJ_SWqkFx9Okmpk&v=3.exp&callback=initialize'

const AsyncMap = makeAsyncScriptLoader(Map, URL)

const MapWrapper = ({ height, zoom, style }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if script is already loaded
    if (window.google) {
      setIsReady(true)
    }
  }, [])

  const mapProps = {
    height,
    zoom,
    style,
    isScriptLoaded: isReady,
    isScriptLoadSucceed: isReady
  }

  return (
    <div style={{ width: '100%', height: height || 450 }}>
      {isReady ? (
        <AsyncMap {...mapProps} />
      ) : (
        <div style={{ width: '100%', height: height || 450, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading map...
        </div>
      )}
    </div>
  )
}

MapWrapper.propTypes = {
  height: PropTypes.number,
  zoom: PropTypes.number,
  style: PropTypes.object
}

MapWrapper.defaultProps = {
  height: 450,
  zoom: 10,
  style: {}
}

export default MapWrapper
