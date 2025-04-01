import React from 'react'
import PropTypes from 'prop-types'
import {MENU_WIDTH, MARGIN_XS} from '../vars'

const Right = ({ children }) => {
  const style = {
    marginLeft: MENU_WIDTH + MARGIN_XS,
  }

  return (
    <div style={style}>
      {children}
    </div>
  )
}

Right.propTypes = {
  children: PropTypes.element.isRequired
}

export default Right
