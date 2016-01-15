import React, {Component, PropTypes} from 'react'
import Box from './Box.jsx'

export default class Left extends Component {

  render() {
    let {children} = this.props
    let style = {width: 160, paddingRight: 0}
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
