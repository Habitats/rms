import React, {Component, PropTypes} from 'react'

export default class Right extends Component {

  render() {
    let {children} = this.props
    let style = {marginLeft: 205}
    return (
      <div style={style}>
        {children}
      </div>
    )
  }
}

Right.propTypes = {
  children: PropTypes.object.isRequired
}
