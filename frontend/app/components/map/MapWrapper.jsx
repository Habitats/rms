import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useMediaQuery from '../../hooks/useMediaQuery'

const MapContainer = styled.div`
  width: 100%;
  height: ${props => props.height || (
    props.isSmall 
      ? '200px'
      : props.isMedium 
        ? '300px'
        : '400px'
  )};
  position: relative;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
`

const MapFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const LoadingText = styled.span`
  color: #666;
  font-size: ${props => props.isSmall ? '14px' : '16px'};
`

const MapWrapper = ({ height, zoom }) => {
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`)
  const isMedium = useMediaQuery(`only screen and (min-width: ${theme.breakpoints.sm}) and (max-width: ${theme.breakpoints.md})`)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <MapContainer height={height ? `${height}px` : undefined} isSmall={isSmall} isMedium={isMedium}>
      {isLoading ? (
        <LoadingContainer>
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          <LoadingText isSmall={isSmall}>Laster kart...</LoadingText>
        </LoadingContainer>
      ) : (
        <MapFrame
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1997.0!2d10.0!3d60.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDAwJzAwLjAiTiAxMMKwMDAnMDAuMCJF!5e0!3m2!1sno!2sno!4v1234567890!5m2!1sno!2sno&z=${zoom || 13}`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </MapContainer>
  )
}

MapWrapper.propTypes = {
  height: PropTypes.number,
  zoom: PropTypes.number
}

export default MapWrapper
