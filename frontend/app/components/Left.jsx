import React, {Component, PropTypes} from 'react'
import {MENU_WIDTH} from '../vars'

export default class Left extends Component {

  render() {
    const {children} = this.props
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
}

Left.propTypes = {
  children: PropTypes.element.isRequired
}
