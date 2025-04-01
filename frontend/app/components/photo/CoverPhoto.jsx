import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Photo from './Photo.jsx'

const CoverPhoto = ({ src, onRightSelect, onLeftSelect }) => {
  const [hover, setHover] = useState(false)

  const style = {
    icon: {
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      height: 'auto',
      color: 'lightGray',
      paddingLeft: 10,
      textShadow: '5px 2px 3px rgba(0,0,0,0.5)',
      ':hover': {
        color: 'white'
      }
    }
  }

  const rightHover = hover ? (
    <div style={{height: '100%', width: 55, float: 'right'}} onClick={onRightSelect}>
      <FontAwesomeIcon icon={faChevronRight} size="3x" style={style.icon} />
    </div>
  ) : null

  const leftHover = hover ? (
    <div style={{height: '100%', width: 55, float: 'left'}} onClick={onLeftSelect}>
      <FontAwesomeIcon icon={faChevronLeft} size="3x" style={style.icon} />
    </div>
  ) : null

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{height: '100%'}}>
      <Photo src={src}>
        {rightHover}
        {leftHover}
      </Photo>
    </div>
  )
}

CoverPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  onRightSelect: PropTypes.func.isRequired,
  onLeftSelect: PropTypes.func.isRequired
}

export default CoverPhoto
