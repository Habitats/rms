import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useMediaQuery from '../../hooks/useMediaQuery'

const MapWrapper = ({ height, zoom }) => {
  const [isLoading, setIsLoading] = useState(true)
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')
  const isMedium = useMediaQuery('only screen and (min-width: 768px) and (max-width: 991px)')

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const style = {
    container: {
      width: '100%',
      height: height || (isSmall ? 200 : isMedium ? 300 : 400),
      position: 'relative',
      backgroundColor: '#f8f9fa',
      borderRadius: 8,
      overflow: 'hidden'
    },
    map: {
      width: '100%',
      height: '100%'
    },
    loading: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    },
    loadingText: {
      color: '#666',
      fontSize: isSmall ? '14px' : '16px'
    }
  }

  return (
    <div style={style.container}>
      {isLoading ? (
        <div style={style.loading}>
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          <span style={style.loadingText}>Laster kart...</span>
        </div>
      ) : (
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1997.0!2d10.0!3d60.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDAwJzAwLjAiTiAxMMKwMDAnMDAuMCJF!5e0!3m2!1sno!2sno!4v1234567890!5m2!1sno!2sno&z=${zoom || 13}`}
          style={style.map}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  )
}

MapWrapper.propTypes = {
  height: PropTypes.number,
  zoom: PropTypes.number
}

export default MapWrapper
