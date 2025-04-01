import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Radium from 'radium'
import { SM, XS } from '../../vars'

const Photo = ({ src, height, width, margin, crop, selected, children, clickable, size, linkTo, className, onClick }) => {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)

  const isNumeric = (height) => {
    return (!isNaN(parseFloat(height)) && isFinite(height))
  }

  const photoClick = linkTo ? () => navigate(linkTo) :
                     onClick ? onClick :
                     clickable ? () => {} : null

  const heightStyles = isNumeric(height) ? {
    '@media only screen and (max-width: 767px)': {
      height: height * XS
    },
    '@media only screen and (min-width: 768px)': {
      height: height * SM
    },
    '@media only screen and (min-width: 992px)': {
      height: height
    }
  } : { height: '100%' }

  const style = {
    box: {
      ...heightStyles,
      width: width || '100%',
      cursor: photoClick ? 'pointer' : null,
      position: 'relative',
      marginTop: margin,
      marginBottom: margin
    },
    photo: {
      background: 'url(/' + src + '/' + size + ') no-repeat center center',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 900
    },
    hover: {
      background: `rgba(0, 0, 0, ${selected && hover ? 0.3 : selected || hover ? 0.2 : 0})`,
      boxShadow: 'inset 0px 0 50px 0px rgba(0,0,0,0.5)',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 950
    },
    spinnerWrapper: {
      textAlign: 'center',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      paddingLeft: 11,
      color: 'lightGray',
      zIndex: 800
    },
    spinner: {
      width: 'auto',
      position: 'relative',
      top: '50%',
      height: 'auto',
      margin: '-18px auto 0 auto'
    }
  }

  return (
    <div 
      className={className} 
      onClick={photoClick} 
      style={style.box} 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      <div style={style.spinnerWrapper}>
        <div style={style.spinner}>
          <i className="fa fa-circle-o-notch fa-spin fa-3x"/>
        </div>
      </div>
      <div style={style.photo} className={crop ? 'cover' : 'contain'}>
        {children}
      </div>
      {((hover || selected) && photoClick) ? <div style={style.hover}/> : null}
    </div>
  )
}

Photo.defaultProps = {
  src: 'image/not_found.jpg',
  clickable: false,
  selected: false,
  className: '',
  linkTo: null,
  size: 'med',
  crop: true,
  margin: 0
}

Photo.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  clickable: PropTypes.bool,
  margin: PropTypes.number,
  linkTo: PropTypes.string,
  selected: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  onClick: PropTypes.func,
  size: PropTypes.string,
  crop: PropTypes.bool
}

// Apply Radium styles
const StyledPhoto = Radium(Photo)

export default StyledPhoto
