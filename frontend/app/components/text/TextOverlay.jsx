import React from 'react'
import PropTypes from 'prop-types'

const TextOverlay = ({ text }) => {
  const style = {
    background: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    padding: 20,
    width: '100%',
    height: 'auto',
    bottom: 0,
    color: '#fff'
  }

  return (
    <h4>
      <div style={style}>
        {text}
      </div>
    </h4>
  )
}

TextOverlay.propTypes = {
  text: PropTypes.string.isRequired
}

export default TextOverlay
