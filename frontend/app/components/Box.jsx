import React, {Component, PropTypes} from 'react'

export default class Box extends Component {

  render() {
    let {children} = this.props
    let style = {
      marginBottom: 20,
      padding: 30,
      background: '#fff',
      boxShadow: '0 0 35px 3px rgba(0, 0, 0, 0.16)'
    }
    return (
      <div style={style}>
        {children}
      </div>
    )
  }
}

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
