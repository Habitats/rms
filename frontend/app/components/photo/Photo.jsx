import React, {Component, PropTypes} from 'react'
import EventListener from '../../util/EventListener.js'
import PhotoOverlay from './PhotoOverlay.jsx'

export default class Photo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
    }
  }

  toggle() {
    this.setState({toggled: true})
  }

  render() {
    let {src, height, width, margin, crop, selected, children, clickable, size} = this.props
    let className = this.props.className
    let toggled = this.state.toggled

    let photoStyle = {
      background: 'url(' + src + '/' + size + ') no-repeat center center',
      backgroundColor: '#ffffff',
      height: height || '100%',
      width: width || '100%',
      marginTop: margin,
      opacity: selected ? 0.5 : 1,
      marginBottom: margin,
      position: 'relative'
    }

    // if onClick is defined, use the defined callback
    let photoClick = this.props.onClick ? this.props.onClick.bind(this, src) : (clickable ? this.toggle.bind(this) : null)

    return (
      <div>
        <div className={className}>
          <div onClick={photoClick} style={photoStyle} className={crop ? 'cover' : 'contain'}>
            {children}
          </div>
          {clickable ? <PhotoOverlay src={src} toggled={toggled}/> : null}
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




