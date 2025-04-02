import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Photo from './Photo.jsx'

const Container = styled.div`
  height: 100%;
  position: relative;
`

const NavigationButton = styled.div`
  height: 100%;
  width: 55px;
  position: absolute;
  top: 0;
  ${props => props.position === 'left' ? 'left: 0;' : 'right: 0;'}
  z-index: 950;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: linear-gradient(
      to ${props => props.position === 'left' ? 'right' : 'left'}, 
      rgba(0, 0, 0, 0.3), 
      transparent
    );
  }
`

const StyledIcon = styled(FontAwesomeIcon)`
  color: rgba(255, 255, 255, 0.8);
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.5));
  
  &:hover {
    color: white;
    transform: scale(1.1);
    transition: all 0.2s ease;
  }
`

const CoverPhoto = ({ src, onRightSelect, onLeftSelect }) => {
  const [hover, setHover] = useState(false)

  const rightHover = hover ? (
    <NavigationButton position="right" onClick={onRightSelect}>
      <StyledIcon icon={faChevronRight} size="2x" />
    </NavigationButton>
  ) : null

  const leftHover = hover ? (
    <NavigationButton position="left" onClick={onLeftSelect}>
      <StyledIcon icon={faChevronLeft} size="2x" />
    </NavigationButton>
  ) : null

  return (
    <Container 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      <Photo src={src} />
      {rightHover}
      {leftHover}
    </Container>
  )
}

CoverPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  onRightSelect: PropTypes.func.isRequired,
  onLeftSelect: PropTypes.func.isRequired
}

export default CoverPhoto
