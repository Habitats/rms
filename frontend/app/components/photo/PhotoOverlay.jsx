import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import EventListener from '../../util/EventListener.js'

const PhotoOverlay = ({ toggled: initialToggled, src }) => {
  const [state, setState] = useState({
    toggled: initialToggled
  })

  const handleEscapeKeyDown = (e) => {
    if ((e.key === 'Escape' || e.keyCode === 27) && state.toggled) {
      e.stopPropagation()
      e.preventDefault()
      toggle()
    }
  }

  const toggle = () => {
    setState(prev => ({ ...prev, toggled: !prev.toggled }))
    removeListener()
  }

  const removeListener = () => {
    if (window.onWindowKeyDownListener) {
      window.onWindowKeyDownListener.remove()
    }
  }

  const addKeyListener = () => {
    window.onWindowKeyDownListener = EventListener.listen(window, 'keydown', handleEscapeKeyDown)
  }

  useEffect(() => {
    if (initialToggled) {
      setState(prev => ({ ...prev, toggled: initialToggled }))
    }
  }, [initialToggled])

  useEffect(() => {
    return () => {
      removeListener()
    }
  }, [])

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

  if (state.toggled) {
    addKeyListener()
  }

  return (
    <div>
      {state.toggled ? (
        <div>
          <div style={overlayStyle} onClick={toggle}></div>
          <div style={overlayPhotoStyle} onClick={toggle}>
            <div style={wrapperStyle}>
              <img src={src + '/raw'} style={{maxWidth: '70%', maxHeight: '70%', marginTop: 50}}/>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

PhotoOverlay.propTypes = {
  toggled: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
}

export default PhotoOverlay




