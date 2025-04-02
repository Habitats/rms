import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  display: inline-flex;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.8;
  text-align: center;
  top: 0;
  left: 0;
  z-index: 1000;
`

const OverlayPhoto = styled.div`
  position: fixed;
  display: inline-flex;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  left: 0;
  z-index: 1000;
`

const PhotoWrapper = styled.div`
  margin: auto 0;
  width: 100%;
  position: relative;
`

const Image = styled.img`
  max-width: 70%;
  max-height: 70%;
  margin-top: 50px;
`

const PhotoOverlay = ({ toggled: initialToggled, src }) => {
  const [toggled, setToggled] = useState(initialToggled)

  useEffect(() => {
    setToggled(initialToggled)
  }, [initialToggled])

  const toggle = () => {
    setToggled(!toggled)
  }

  const handleEscapeKeyDown = (e) => {
    if ((e.key === 'Escape' || e.keyCode === 27) && toggled) {
      e.stopPropagation()
      e.preventDefault()
      toggle()
    }
  }

  useEffect(() => {
    if (toggled) {
      window.addEventListener('keydown', handleEscapeKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleEscapeKeyDown)
    }
  }, [toggled])

  return (
    <div>
      {toggled && (
        <div>
          <Overlay onClick={toggle} />
          <OverlayPhoto onClick={toggle}>
            <PhotoWrapper>
              <Image src={src + '/raw'} />
            </PhotoWrapper>
          </OverlayPhoto>
        </div>
      )}
    </div>
  )
}

PhotoOverlay.propTypes = {
  toggled: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
}

export default PhotoOverlay




