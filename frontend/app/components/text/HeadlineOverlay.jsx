import React, {Component, PropTypes} from 'react'
import SimpleLabel from './SimpleLabel.jsx'

export default class HeadlineOverlay extends Component {

  render() {
    let style = {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      background: 'rgba(0, 0, 0, 0.7)',
      position: 'absolute',
      width: '100%',
      height: 50,
      bottom: 0,
      paddingTop: 13,
      color: '#fff',
      textAlign: 'center'
    }
    let {text} = this.props
    return (
      <h3>
        <div style={style}>
          {text}
        </div>
      </h3>
    )
  }
}

HeadlineOverlay.propTypes = {
  text: PropTypes.string.isRequired
}
