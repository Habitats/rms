import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Map from './Map.jsx'
import makeAsyncScriptLoader from 'react-async-script'

const GOOGLE_MAPS_API_KEY = 'AIzaSyDb_jsmHVPfJ3XvAYggQJ_SWqkFx9Okmpk'
const MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp`

const AsyncMap = makeAsyncScriptLoader(Map, MAPS_URL)

const MapWrapper = ({ height, zoom, style }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (window.google) {
      setIsReady(true)
    }
  }, [])

  if (!isReady) {
    return (
      <div style={{ 
        width: '100%', 
        height: height || 450, 
        backgroundColor: '#f5f5f5', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <i className="fa fa-spinner fa-spin fa-2x"></i>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: height || 450 }}>
      <AsyncMap 
        height={height}
        zoom={zoom}
        style={style}
        isScriptLoaded={true}
        isScriptLoadSucceed={true}
      />
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
