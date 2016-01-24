import React, {Component, PropTypes} from 'react'
import {routeActions} from 'redux-simple-router'
import {connect} from 'react-redux'
import Radium from 'radium'

class Link extends Component {

  constructor(props){
    super(props)
    this.onClick = () => props.dispatch(routeActions.push(props.to))
  }

  render() {
    let {children, style} = this.props
    style = {
      ...style,
      ':hover' :{
        ...style[':hover'],
        cursor: 'pointer'
      },
    }
    return (
      <span style={style} onClick={this.onClick}>
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
