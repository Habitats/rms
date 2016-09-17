import React, {Component, PropTypes} from 'react'

export default class HeadlineOverlay extends Component {

  render() {
    const wrapperStyle = {
      background: 'rgba(0, 0, 0, 0.8)',
      width: '100%',
      height: 'auto',
      paddingTop: 7,
      position: 'absolute',
      paddingBottom: 7,
      bottom: 0,
      textAlign: 'center'
    }
    const textStyle = {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: '#fff',
    }
    const {text} = this.props
    return (
      <div style={wrapperStyle}>
        <h3 style={{margin: 0}}>
        <span style={textStyle}>
          {text}
        </span>
        </h3>
      </div>
    )
  }
}

HeadlineOverlay.propTypes = {
  text: PropTypes.string.isRequired
}
