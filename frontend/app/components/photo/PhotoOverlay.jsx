import React, {Component} from 'react'
import PropTypes from 'prop-types'
import EventListener from '../../util/EventListener.js'

export default class PhotoOverlay extends Component {

  constructor(props) {
    super(props)
    this.state = {toggled: props.toggled}
  }

  toggle() {
    this.setState({toggled: !this.state.toggled})
    this.removeListener()
  }

  handleEscapeKeyDown(e) {
    if ((e.key === 'Escape' || e.keyCode === 27) && this.state.toggled) {
      e.stopPropagation()
      e.preventDefault()
      this.toggle()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.toggled) {
      this.setState({toggled: nextProps.toggled})
    }
  }

  componentWillUnmount() {
    this.removeListener()
  }

  removeListener() {
    if (this.onWindowKeyDownListener) {
      this.onWindowKeyDownListener.remove()
    }
  }

  addKeyListener() {
    this.onWindowKeyDownListener = EventListener.listen(window, 'keydown', this.handleEscapeKeyDown.bind(this))
  }

  render() {
    const {src} = this.props
    const toggled = this.state.toggled
    const overlayStyle = {
      position: 'fixed',
      display: 'inline-flex',
      width: '100%',
      height: '100%',
      background: 'black',
      opacity: 0.8,
      textAlign: 'center',
      top: 0,
      left: 0,
      zIndex: 1000
    }
    const overlayPhotoStyle = {
      position: 'fixed',
      display: 'inline-flex',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      top: 0,
      left: 0,
      zIndex: 1000
    }
    const wrapperStyle = {
      margin: 'auto 0',
      width: '100%',
      position: 'relative'
    }
    if (toggled) {
      this.addKeyListener()
    }
    return (
      <div>
        {toggled ? (
          <div>
            <div style={overlayStyle} onClick={this.toggle.bind(this)}></div>
            <div style={overlayPhotoStyle} onClick={this.toggle.bind(this)}>
              <div style={wrapperStyle}>
                <img src={src + '/raw'} style={{maxWidth: '70%', maxHeight: '70%', marginTop: 50}}/>
              </div>
            </div>
          </div>)
          : null }
      </div>
    )
  }
}

PhotoOverlay.propTypes = {
  toggled: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
}




