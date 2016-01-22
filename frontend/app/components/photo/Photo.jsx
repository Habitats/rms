import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import EventListener from '../../util/EventListener.js'
import PhotoOverlay from './PhotoOverlay.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import {routeActions} from 'redux-simple-router'
import {connect} from 'react-redux'

export default class Photo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
      hover: false,
      multi: this.computeMulti(),
      dynamic: !!props.height
    }
    this.mounted = false
  }

  computeMulti() {
    let windowWith = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    let multi = windowWith > 992 ? 1 : (windowWith > 768 ? 0.75 : (windowWith / 768) * 0.75)
    return multi
  }

  updateDimension() {
    if (this.state.dynamic && this.mounted) {
      let multi = this.computeMulti()
      if (multi !== this.state.multi) {
        this.setState({multi: multi})
      }
    }
  }

  componentWillMount() {
    this.updateDimension()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(nextState === this.state && nextProps === this.props)
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimension.bind(this))
    //console.log('mount resize')
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
    window.removeEventListener("resize", this.updateDimension.bind(this))
    //console.log('unmount resize')
  }

  toggle() {
    this.setState({toggled: true})
  }

  toggleHover(hover) {
    this.setState({hover: hover, toggled: false})
  }

  render() {
    let {src, height, width, margin, crop, selected, children, clickable, size, linkTo, dispatch, className} = this.props
    let {toggled, hover, multi} = this.state

    if (height) {
      height = height * multi
      //console.log('multi: ' + multi)
    }

    // if onClick is defined, use the defined callback
    let photoClick = linkTo ? () => dispatch(routeActions.push(linkTo)) :
                     this.props.onClick ? this.props.onClick.bind(this, src) :
                     (clickable ? this.toggle.bind(this) : null)
    let photoStyle = {
      background: 'url(' + src + '/' + size + ') no-repeat center center',
      height: height || '100%',
      width: width || '100%',
      opacity: 1,
      cursor: photoClick ? 'pointer' : null,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 900
    }
    let hoverStyle = {
      background: `rgba(0, 0, 0, ${selected ? 0.2 : 0})`,
      boxShadow: 'inset 0px 0 50px 0px rgba(0,0,0,0.5)',
      height: '100%',
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
      zIndex: 950
    }
    let spinnerStyle = {
      textAlign: 'center',
      height: height || '100%',
      width: width || '100%',
      position: 'absolute',
      paddingLeft: 25,
      margin: '0 auto',
      color: 'lightGray',
      zIndex: 800
    }
    return (
      <div className="photo">
        <div onMouseEnter={this.toggleHover.bind(this, true)} style={{height: height}} onMouseLeave={this.toggleHover.bind(this, false)}
             className={className}>
          <div onClick={photoClick} style={{position: 'relative', height: height, width: width, marginTop: margin, marginBottom: margin}}>
            <div style={spinnerStyle}>
              <div style={{width: '100%', position: 'relative', top: '50%',height: 'auto', marginTop: -22}}>
                <i className="fa fa-circle-o-notch fa-spin fa-4x"/>
              </div>
            </div>
            <div style={photoStyle} className={crop ? 'cover' : 'contain'}>
              {children}
              {((hover || selected) && photoClick) ? <div style={hoverStyle}/> : null}
            </div>
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
