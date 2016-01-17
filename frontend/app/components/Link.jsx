import React, {Component, PropTypes} from 'react'
import {Link as L} from 'react-router'

export default class Link extends Component {

  render() {
    let {to, children} = this.props
    let style = {
      textDecoration: 'none',
      outline: 0
    }
    return (
      <L to={to} style={style}>
        {children}
      </L>
    )
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
