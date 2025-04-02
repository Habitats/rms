import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Photo from './Photo.jsx'

const Container = styled.div`
  height: 100%;
`

const NavigationButton = styled.div`
  height: 100%;
  width: 55px;
  float: ${props => props.position === 'left' ? 'left' : 'right'};
`

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  top: 50%;
  height: auto;
  color: lightGray;
  padding-left: 10px;
  text-shadow: 5px 2px 3px rgba(0,0,0,0.5);
  
  &:hover {
    color: white;
  }
`

const CoverPhoto = ({ src, onRightSelect, onLeftSelect }) => {
  const [hover, setHover] = useState(false)

  const rightHover = hover ? (
    <NavigationButton position="right" onClick={onRightSelect}>
      <StyledIcon icon={faChevronRight} size="3x" />
    </NavigationButton>
  ) : null

  const leftHover = hover ? (
    <NavigationButton position="left" onClick={onLeftSelect}>
      <StyledIcon icon={faChevronLeft} size="3x" />
    </NavigationButton>
  ) : null

  return (
    <Container 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      <Photo src={src}>
        {rightHover}
        {leftHover}
      </Photo>
    </Container>
  )
}

CoverPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  onRightSelect: PropTypes.func.isRequired,
  onLeftSelect: PropTypes.func.isRequired
}

export default CoverPhoto
