import React from 'react'
import PropTypes from 'prop-types'

const SimpleLabel = ({ text }) => {
  const style = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }

  return (
    <div style={style}>
      {text}
    </div>
  )
}

SimpleLabel.propTypes = {
  text: PropTypes.string.isRequired
}

export default SimpleLabel
