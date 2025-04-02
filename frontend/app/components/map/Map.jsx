import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Map = ({ zoom, height, style, isScriptLoaded, isScriptLoadSucceed, context = 'default' }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  
  // Generate a unique map ID based on context
  const mapId = `map-canvas-${context}`
  
  useEffect(() => {
    // Initialize or reinitialize the map when script is loaded
    if (isScriptLoaded && isScriptLoadSucceed && window.google && window.google.maps) {
      initializeMap()
    }
  }, [isScriptLoaded, isScriptLoadSucceed])
  
  // Handle zoom changes
  useEffect(() => {
    if (mapInstanceRef.current && window.google && window.google.maps) {
      mapInstanceRef.current.setZoom(zoom)
    }
  }, [zoom])
  
  const initializeMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) return
    
    const home = {lat: 60.255074, lng: 11.026707}
    
    try {
      // Create map instance
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: zoom, 
        center: home
      })
      
      // Save map instance for later use
      mapInstanceRef.current = map
      
      // Define styles
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
      
      // Apply styles
      map.setOptions({styles: styles})
      
      // Add marker
      new window.google.maps.Marker({position: home, map: map})
    } catch (ex) {
      console.error('Error initializing map:', ex)
    }
  }
  
  // Use inline styles
  const mapStyle = {
    ...style,
    height: height,
    width: '100%',
    color: '#e9e9e9'
  }
  
  return <div id={mapId} ref={mapRef} style={mapStyle} />
}

Map.propTypes = {
  zoom: PropTypes.number,
  style: PropTypes.object,
  height: PropTypes.number,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool,
  context: PropTypes.string
}

Map.defaultProps = {
  zoom: 10,
  height: 450,
  style: {},
  context: 'default'
}

export default Map