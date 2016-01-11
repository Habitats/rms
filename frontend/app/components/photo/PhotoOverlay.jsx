import React, {Component, PropTypes} from 'react'
import EventListener from '../../util/EventListener.js'
import Photo from './Photo.jsx'

export default class PhotoOverlay extends Component {

  constructor(props) {
    super(props)
    this.state = {toggled: props.toggled}
  }

  toggle() {
    this.setState({toggled: false})
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
    this.setState({toggled: nextProps.toggled})
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
    let {src} = this.props
    let toggled = this.state.toggled

    let overlayStyle = {
      position: 'fixed',
      display: 'inline-flex',
      width: '100%',
      height: '100%',
      background: 'black',
      opacity: 0.5,
      textAlign: 'center',
      top: 0,
      left: 0,
      zIndex: 1000
    }
    let overlayPhotoStyle = {
      position: 'fixed',
      display: 'inline-flex',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      top: 0,
      left: 0,
      zIndex: 1000
    }
    let wrapperStyle = {
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




