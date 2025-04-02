import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const OverlayWrapper = styled.div`
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: auto;
  padding: 7px 0;
  position: absolute;
  bottom: 0;
  text-align: center;
`

const Heading = styled.h3`
  margin: 0;
`

const TextSpan = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
`

const HeadlineOverlay = ({ text }) => {
  return (
    <OverlayWrapper>
      <Heading>
        <TextSpan>
          {text}
        </TextSpan>
      </Heading>
    </OverlayWrapper>
  )
}

HeadlineOverlay.propTypes = {
  text: PropTypes.string.isRequired
}

export default HeadlineOverlay
