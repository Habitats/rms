import React, {Component, PropTypes} from 'react'
import EventListener from '../../util/EventListener.js'

export default class Photo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      backdrop: '',
      size: props.size,
      backdropPhoto: ''
    }
  }

  handleEscapeKeyDown(e) {
    if ((e.key === 'Escape' || e.keyCode === 27) && !this.state.toggled) {
      e.stopPropagation()
      e.preventDefault()
      this.toggle()
    }
  }

  componentWillUnmount() {
    this.removeListener()
  }

  toggle() {
    if (this.state.toggled) {
      this.addKeyListener()
      this.setState({toggled: false, backdrop: 'overlay', backdropPhoto: 'overlay-photo', size: 'raw'})
    } else {
      this.removeListener()
      this.setState({toggled: true, backdrop: '', backdropPhoto: '', size: this.props.size})
    }
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
    let {src, height, width, margin, crop, selected} = this.props
    let className = this.props.className +
                    ' photo-container-wrapper ' +
                    this.state.classes
    let style = {
      background: 'url(' + src + '/' + this.state.size + ') no-repeat center center',
      backgroundSize: crop ? 'cover !important' : 'contain !important',
      backgroundColor: '#ffffff',
      height: height || '100%',
      width: width || '100%',
      marginTop: margin,
      opacity: selected ? 0.5 : 1,
      marginBottom: margin
    }
    let bigImg = this.state.backdropPhoto.length > 0 ? <img src={src}/> : ''
    // if onClick is defined, use the defined callback
    let onClick
    if (this.props.clickable) {
      onClick = this.props.onClick ? this.props.onClick.bind(this, src) : this.toggle.bind(this)
    }
    return (

      <div>
        <div className={className}>
          <div className="photo-container" onClick={onClick} style={style}>
            {this.props.children}
          </div>
        </div>
        <div className={this.state.backdrop} onClick={this.toggle.bind(this)}></div>
        <div className={this.state.backdropPhoto} onClick={this.toggle.bind(this)}>
          <div className="overlay-photo-wrapper">
            {bigImg}
          </div>
        </div>
      </div>
    )

  }
}

Photo.defaultProps = {
  className: '',
  clickable: true,
  crop: true,
  margin: 0,
  size: 'raw',
  src: 'image/not_found.jpg'
}

Photo.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.string,
  clickable: PropTypes.bool,
  crop: PropTypes.bool,
  children: PropTypes.object,
  onClick: PropTypes.func,
  margin: PropTypes.number,
  src: PropTypes.string.isRequired
}




