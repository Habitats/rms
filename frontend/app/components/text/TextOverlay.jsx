import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const OverlayContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  padding: 20px;
  width: 100%;
  height: auto;
  bottom: 0;
  color: #fff;
`

const Heading = styled.h4`
  margin: 0;
`

const TextOverlay = ({ text }) => {
  return (
    <Heading>
      <OverlayContainer>
        {text}
      </OverlayContainer>
    </Heading>
  )
}

TextOverlay.propTypes = {
  text: PropTypes.string.isRequired
}

export default TextOverlay
