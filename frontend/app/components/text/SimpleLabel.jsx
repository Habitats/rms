import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class SimpleLabel extends Component {

  render() {
    const style = {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
    const {text} = this.props
    return (
      <div style={style}>
        {text}
      </div>
    )
  }
}

SimpleLabel.propTypes = {
  text: PropTypes.string.isRequired
}
