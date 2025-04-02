import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import useMediaQuery from '../../hooks/useMediaQuery'

const MapContainer = styled.div`
  height: ${props => 
    props.isSmall 
      ? '300px' 
      : props.isMedium 
        ? '400px' 
        : `${props.height || 500}px`
  };
  width: 100%;
  color: #e9e9e9;
  ${props => props.customStyle && Object.entries(props.customStyle).map(([key, value]) => `${key}: ${value};`).join('')}
`

const LoadingMessage = styled.div`
  text-align: center;
  padding-top: 20%;
`

const Map = ({ zoom, height, style: customStyle, isScriptLoaded, isScriptLoadSucceed }) => {
  const [mapInitialized, setMapInitialized] = useState(false)
  const mapRef = useRef(null)
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.sm})`);

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

  return (
    <MapContainer 
      ref={mapRef} 
      customStyle={customStyle}
      isSmall={isSmall}
      isMedium={isMedium}
      height={height}
    >
      {!isScriptLoaded && (
        <LoadingMessage>Loading map...</LoadingMessage>
      )}
      {!isScriptLoadSucceed && (
        <LoadingMessage>Error loading map</LoadingMessage>
      )}
    </MapContainer>
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
  height: 500,
  style: {}
}

export default Map