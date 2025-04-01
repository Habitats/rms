import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const PhotoOverlay = ({ toggled: initialToggled, src }) => {
  const [toggled, setToggled] = useState(initialToggled)

  useEffect(() => {
    setToggled(initialToggled)
  }, [initialToggled])

  const toggle = () => {
    setToggled(!toggled)
    removeListener()
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

  const overlayStyle = {
    position: 'fixed',
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    background: 'black',
    opacity: 0.8,
    textAlign: 'center',
    top: 0,
    left: 0,
    zIndex: 1000
  }

  const overlayPhotoStyle = {
    position: 'fixed',
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    top: 0,
    left: 0,
    zIndex: 1000
  }

  const wrapperStyle = {
    margin: 'auto 0',
    width: '100%',
    position: 'relative'
  }

  return (
    <div>
      {toggled && (
        <div>
          <div style={overlayStyle} onClick={toggle}></div>
          <div style={overlayPhotoStyle} onClick={toggle}>
            <div style={wrapperStyle}>
              <img src={src + '/raw'} style={{maxWidth: '70%', maxHeight: '70%', marginTop: 50}}/>
            </div>
          </div>
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




