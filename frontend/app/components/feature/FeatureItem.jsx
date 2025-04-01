import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import useMediaQuery from '../../hooks/useMediaQuery'

const iconMap = {
  faGears,
  faHeart,
  faStar
}

const FeatureItem = ({ icon, title, description }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')
  const isMedium = useMediaQuery('only screen and (min-width: 768px) and (max-width: 991px)')

  const style = {
    container: {
      padding: isSmall ? 15 : isMedium ? 20 : 25,
      textAlign: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      height: '100%'
    },
    icon: {
      fontSize: isSmall ? '2em' : isMedium ? '2.5em' : '3em',
      color: '#007bff',
      marginBottom: 15
    },
    title: {
      fontSize: isSmall ? '1.2em' : isMedium ? '1.4em' : '1.6em',
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333'
    },
    description: {
      fontSize: isSmall ? '0.9em' : isMedium ? '1em' : '1.1em',
      color: '#666',
      lineHeight: 1.6
    }
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className="feature-item" style={style.container}>
        <FontAwesomeIcon icon={iconMap[icon]} style={style.icon} />
        <h3 style={style.title}>{title}</h3>
        <p style={style.description}>{description}</p>
      </div>
    </div>
  )
}

FeatureItem.propTypes = {
  icon: PropTypes.oneOf(['faGears', 'faHeart', 'faStar']).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default FeatureItem
