import React, {Component, PropTypes} from 'react'
import {MENU_WIDTH, MARGIN_XS} from '../vars'

export default class Right extends Component {

  render() {
    let {children} = this.props
    let style = {marginLeft: MENU_WIDTH + MARGIN_XS}
    return (
      <div style={style}>
        {children}
      </div>
    )
  }
}

Right.propTypes = {
  children: PropTypes.element.isRequired
}
