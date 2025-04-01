import React from 'react'
import PropTypes from 'prop-types'
import {MENU_WIDTH} from '../vars'

const Left = ({ children }) => {
  const style = {
    width: MENU_WIDTH,
    paddingRight: 0,
  }

  return (
    <div className="" style={style}>
      {children}
    </div>
  )
}

Left.propTypes = {
  children: PropTypes.element.isRequired
}

export default Left
