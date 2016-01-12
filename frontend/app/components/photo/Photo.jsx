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
    let {src, height, width, margin, crop, selected, children, clickable, size, linkTo, dispatch, className} = this.props
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
  src: 'image/not_found.jpg',
  clickable: false,
  selected: false,
  className: '',
  linkTo: null,
  size: 'raw',
  crop: true,
  margin: 0,
}

Photo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  clickable: PropTypes.bool,
  margin: PropTypes.number,
  linkTo: PropTypes.string,
  selected: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  onClick: PropTypes.func,
  size: PropTypes.string,
  crop: PropTypes.bool,
}

export default connect()(Photo)
