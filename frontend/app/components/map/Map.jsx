import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

const Map = ({ zoom, height, style: customStyle, isScriptLoaded, isScriptLoadSucceed }) => {
  const [mapInitialized, setMapInitialized] = useState(false)
  const mapRef = useRef(null)

  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed && window.google && !mapInitialized && mapRef.current) {
      initializeMap()
    }
  }, [isScriptLoaded, isScriptLoadSucceed, zoom, mapInitialized])

  const initializeMap = () => {
    const home = {lat: 60.255074, lng: 11.026707}

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom, 
        center: home
      })
      
      const styles = [
        {stylers: [{saturation: -100}, {gamma: 1}]},
        {featureType: 'poi.business', elementType: 'labels.content', stylers: [{visibility: 'off'}]},
        {featureType: 'poi.business', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
        {featureType: 'poi.place_of_worship', elementType: 'labels.content', stylers: [{visibility: 'off'}]},
        {featureType: 'poi.place_of_worship', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
        {featureType: 'road', elementType: 'geometry', stylers: [{visibility: 'simplified'}]},
        {featureType: 'water', stylers: [{visibility: 'on'}, {saturation: 50}, {gamma: 0}, {hue: '#50a5d1'}]},
        {featureType: 'administrative.neighborhood', elementType: 'labels.content.fill', stylers: [{color: '#333333'}]},
        {featureType: 'road.local', elementType: 'labels.content', stylers: [{weight: 0.5}, {color: '#333333'}]},
        {featureType: 'transit.station', elementType: 'labels.icon', stylers: [{gamma: 1}, {saturation: 50}]}
      ]

      map.setOptions({styles})
      new window.google.maps.Marker({position: home, map})
      setMapInitialized(true)
    } catch (ex) {
      console.error('Error initializing map:', ex)
    }
  }

  const mapStyle = {
    ...customStyle,
    height: height || 450,
    width: '100%',
    color: '#e9e9e9'
  }

  return (
    <div ref={mapRef} style={mapStyle}>
      {!isScriptLoaded && (
        <div style={{ textAlign: 'center', paddingTop: '20%' }}>Loading map...</div>
      )}
      {!isScriptLoadSucceed && (
        <div style={{ textAlign: 'center', paddingTop: '20%' }}>Error loading map</div>
      )}
    </div>
  )
}

Map.propTypes = {
  zoom: PropTypes.number,
  style: PropTypes.object,
  height: PropTypes.number,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool
}

Map.defaultProps = {
  zoom: 10,
  height: 450,
  style: {}
}

export default Radium(Map)