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

    if (!isNaN(parseFloat(height)) && isFinite(height)) {
      height = height * multi
    }

    // if onClick is defined, use the defined callback
    let photoClick = linkTo ? () => dispatch(routeActions.push(linkTo)) :
                     this.props.onClick ? this.props.onClick.bind(this, src) :
                     (clickable ? this.toggle.bind(this) : null)
    let style = {
      box: {
        cursor: photoClick ? 'pointer' : null,
        position: 'relative',
        height: height,
        width: width,
        marginTop: margin,
        marginBottom: margin
      },
      photo: {
        background: 'url(' + src + '/' + size + ') no-repeat center center',
        height: height,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 900
      },
      hover: {
        background: `rgba(0, 0, 0, ${selected ? 0.2 : 0})`,
        boxShadow: 'inset 0px 0 50px 0px rgba(0,0,0,0.5)',
        height: height,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 950
      },
      spinnerWrapper: {
        textAlign: 'center',
        height: height,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        paddingLeft: 25,
        color: 'lightGray',
        zIndex: 800
      },
      spinner: {
        width: 'auto',
        margin: '0 auto',
        position: 'relative',
        top: '50%',
        height: 'auto',
        marginTop: -22
      }
    }
    return (
      <div className="photo" onClick={photoClick} style={style.box}
           onMouseEnter={this.toggleHover.bind(this, true)}
           onMouseLeave={this.toggleHover.bind(this, false)}
           className={className}>
        <div style={style.spinnerWrapper}>
          <div style={style.spinner}>
            <i className="fa fa-circle-o-notch fa-spin fa-3x"/>
          </div>
        </div>
        <div style={style.photo} className={crop ? 'cover' : 'contain'}>
          {children}
        </div>
        {((hover || selected) && photoClick) ? <div style={style.hover}/> : null}
        {clickable ? <PhotoOverlay src={src} toggled={toggled}/> : null}
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
  size: 'med',
  crop: true,
  margin: 0,
  height: '100%',
  width: '100%'
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
