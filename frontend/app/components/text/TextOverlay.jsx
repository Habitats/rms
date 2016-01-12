import React, {Component, PropTypes} from 'react'

export default class TextOverlay extends Component {

  render() {
    let style = {
      background: 'rgba(0, 0, 0, 0.6)',
      position: 'absolute',
      padding: 20,
      width: '100%',
      height: 'auto',
      bottom: 0,
      color: '#fff'
    }
    let {text} = this.props
    return (
      <h4>
        <div style={style}>
          {text}
        </div>
      </h4>
    )
  }
}

TextOverlay.propTypes = {
  text: PropTypes.string.isRequired
}
