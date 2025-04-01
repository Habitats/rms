import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import * as V from '../vars'

const Box = ({ children, style: propStyle }) => {
  const style = {
    background: '#fff',
    float: 'left',
    position: 'relative',
    width: '100%',
    boxShadow: '0 0 35px 3px rgba(0, 0, 0, 0.16)',
    '@media only screen and (max-width: 767px)': {
      padding: V.MARGIN_XS,
      width: '100%',
      marginBottom: 0
    },
    '@media only screen and (min-width: 768px)': {
      padding: V.MARGIN_SM,
      marginBottom: 20
    },
    ...propStyle
  }

  return (
    <div style={style} className="box">
      {children}
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  style: PropTypes.object
}

Box.defaultProps = {
  style: {}
}

// Apply Radium styles
const StyledBox = Radium(Box)

export default StyledBox
