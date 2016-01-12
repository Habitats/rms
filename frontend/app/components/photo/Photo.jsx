import React, {Component, PropTypes} from 'react'
import EventListener from '../../util/EventListener.js'
import PhotoOverlay from './PhotoOverlay.jsx'
import {pushPath} from 'redux-simple-router'
import {connect} from 'react-redux'

export default class Photo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
      hover: false
    }
  }

  toggle() {
    this.setState({toggled: true})
  }

  toggleHover() {
    this.setState({hover: !this.state.hover, toggled: false})
  }

  render() {
    let {src, height, width, margin, crop, selected, children, clickable, size, linkTo, dispatch} = this.props
    let className = this.props.className
    let {toggled, hover} = this.state

    let photoStyle = {
      background: 'url(' + src + '/' + size + ') no-repeat center center',
      backgroundColor: 'white',
      height: height || '100%',
      width: width || '100%',
      marginTop: margin,
      marginBottom: margin,
      position: 'relative'
    }
    // if onClick is defined, use the defined callback
    let photoClick = linkTo ? () => dispatch(pushPath(linkTo)) :
                     this.props.onClick ? this.props.onClick.bind(this, src) :
                     (clickable ? this.toggle.bind(this) : null)
    let hoverStyle = {
      background: `rgba(0, 0, 0, ${selected ? 0.2 : 0})`,
      boxShadow: 'inset 0px 0 50px 0px rgba(0,0,0,0.5)',
      height: '100%',
      width: '100%'
    }
    console.log('render p: ' + toggled)
    return (
      <div>
        <div onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} className={className}>
          <div onClick={photoClick} style={photoStyle} className={crop ? 'cover' : 'contain'}>
            {children}
            {((hover || selected) && photoClick) ? <div style={hoverStyle}/> : null}
          </div>
          {clickable ? <PhotoOverlay src={src} toggled={toggled}/> : null}
        </div>
      </div>
    )
  }
}

Photo.defaultProps = {
  className: '',
  clickable: false,
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

export default connect()(Photo)
