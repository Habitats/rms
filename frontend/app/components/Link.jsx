import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Radium from 'radium'

class Link extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {children, style, to} = this.props
    const linkStyle = {
      ...style,
      ':hover': {
        ...style[':hover'],
        cursor: 'pointer'
      },
    }
    return (
      <span style={linkStyle} onClick={() => browserHistory.push(to)}>
        {children}
      </span>
    )
  }
}
Link.defaultProps = {
  style: {}
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default connect()(Radium(Link))
