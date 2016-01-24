import React, {Component, PropTypes} from 'react'
import Box from './Box.jsx'
import {MENU_WIDTH} from '../vars'

export default class Left extends Component {

  render() {
    let {children} = this.props
    let style = {width: MENU_WIDTH, paddingRight: 0}
    return (
      <div className="affix" style={style}>
        {children}
      </div>
    )
  }
}

Left.propTypes = {
  children: PropTypes.element.isRequired
}
