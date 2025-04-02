import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useMediaQuery from '../../hooks/useMediaQuery'
import { SM, XS } from '../../vars'

const PhotoBox = styled.div`
  height: ${props => props.calculatedHeight};
  width: ${props => props.width || '100%'};
  cursor: ${props => props.hasClick ? 'pointer' : 'default'};
  position: relative;
  margin-top: ${props => props.margin}px;
  margin-bottom: ${props => props.margin}px;
`

const PhotoImage = styled.div`
  background: url(/${props => props.src}/${props => props.size}) no-repeat center center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 900;
  background-size: ${props => props.crop ? 'cover' : 'contain'};
`

const PhotoHover = styled.div`
  background: rgba(0, 0, 0, ${props => props.selected && props.hover ? 0.3 : props.selected || props.hover ? 0.2 : 0});
  box-shadow: inset 0px 0 50px 0px rgba(0,0,0,0.5);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 950;
`

const SpinnerWrapper = styled.div`
  text-align: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 11px;
  color: lightGray;
  z-index: 800;
`

const SpinnerContainer = styled.div`
  width: auto;
  position: relative;
  top: 50%;
  height: auto;
  margin: -18px auto 0 auto;
`

const Photo = ({ src, height, width, margin, crop, selected, children, clickable, size, linkTo, className, onClick }) => {
  const [hover, setHover] = useState(false)
  const [toggled, setToggled] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`)
  const isMedium = useMediaQuery(`only screen and (min-width: ${theme.breakpoints.sm})`)

  const isNumeric = (height) => {
    return (!isNaN(parseFloat(height)) && isFinite(height))
  }

  const photoClick = linkTo 
    ? () => navigate(linkTo)
    : onClick 
      ? onClick 
      : clickable 
        ? () => setToggled(true) 
        : null

  // Calculate height based on screen size
  const calculatedHeight = isNumeric(height) 
    ? isSmall 
      ? `${height * XS}px` 
      : isMedium 
        ? `${height * SM}px` 
        : `${height}px`
    : '100%'

  return (
    <PhotoBox 
      className={className} 
      onClick={photoClick} 
      calculatedHeight={calculatedHeight}
      width={width}
      hasClick={photoClick}
      margin={margin}
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      <SpinnerWrapper>
        <SpinnerContainer>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </SpinnerContainer>
      </SpinnerWrapper>
      <PhotoImage src={src} size={size} crop={crop}>
        {children}
      </PhotoImage>
      {((hover || selected) && photoClick) ? 
        <PhotoHover hover={hover} selected={selected} /> : null}
    </PhotoBox>
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
  crop: PropTypes.bool,
}

export default Photo
