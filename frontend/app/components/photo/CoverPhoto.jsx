import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Photo from './Photo.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const CoverPhoto = ({ images, currentIndex, onPrevious, onNext }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')
  const isMedium = useMediaQuery('only screen and (min-width: 768px) and (max-width: 991px)')

  const style = {
    container: {
      position: 'relative',
      width: '100%',
      height: isSmall ? 300 : isMedium ? 400 : 500,
      overflow: 'hidden'
    },
    left: {
      position: 'absolute',
      left: 20,
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      zIndex: 2
    },
    right: {
      position: 'absolute',
      right: 20,
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      zIndex: 2
    }
  }

  return (
    <div style={style.container}>
      <Photo src={images[currentIndex].src} />
      <div style={style.left} onClick={onPrevious}>
        <FontAwesomeIcon icon={faChevronLeft} size="2x" />
      </div>
      <div style={style.right} onClick={onNext}>
        <FontAwesomeIcon icon={faChevronRight} size="2x" />
      </div>
    </div>
  )
}

CoverPhoto.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired
  })).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
}

export default CoverPhoto
