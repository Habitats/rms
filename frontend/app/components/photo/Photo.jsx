import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { SM, XS } from '../../vars'
import useMediaQuery from '../../hooks/useMediaQuery'

const Photo = ({ src, height, width, margin, crop, selected, children, clickable, size, linkTo, className, onClick }) => {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const isNumeric = (height) => {
    return (!isNaN(parseFloat(height)) && isFinite(height))
  }

  const photoClick = linkTo ? () => navigate(linkTo) :
                     onClick ? onClick :
                     clickable ? () => {} : null

  const heightStyles = isNumeric(height) ? {
    height: isSmall ? height * XS : isMedium ? height * SM : height
  } : { height: '100%' }

  const style = {
    ...heightStyles,
    width: isNumeric(width) ? width : '100%',
    margin: margin || 0,
    position: 'relative',
    overflow: 'hidden',
    cursor: clickable ? 'pointer' : 'default',
    opacity: hover ? 0.8 : 1,
    transition: 'opacity 0.3s ease-in-out',
    ...(className ? { className } : {})
  }

  return (
    <div
      style={style}
      onClick={photoClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: crop ? 'cover' : 'contain'
        }}
        alt=""
      />
      {children}
    </div>
  )
}

Photo.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.number,
  crop: PropTypes.bool,
  selected: PropTypes.bool,
  children: PropTypes.node,
  clickable: PropTypes.bool,
  size: PropTypes.string,
  linkTo: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
}

Photo.defaultProps = {
  height: '100%',
  width: '100%',
  margin: 0,
  crop: false,
  selected: false,
  clickable: false
}

export default Photo
