import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import Radium from 'radium'
import {SM, XS} from '../../vars'

// Create a wrapper component to handle navigation
function withNavigation(WrappedComponent) {
  return function WithNavigationComponent(props) {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  }
}

class Photo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
      hover: false
    }
    this.onMouseEnter = () => this.setState({hover: true})
    this.onMouseLeave = () => this.setState({hover: false})
  }

  toggle() {
    this.setState({toggled: true})
  }

  isNumeric(height) {
    return (!isNaN(parseFloat(height)) && isFinite(height))
  }

  render() {
    const {src, height, width, margin, crop, selected, children, clickable, size, linkTo, dispatch, className, onClick, navigate} = this.props
    const {hover} = this.state

    // Update the navigation logic
    const photoClick = linkTo ? () => navigate(linkTo) :
                       onClick ? onClick :
                       clickable ? this.toggle.bind(this) : null

    const heightStyles = this.isNumeric(height) ? {
      '@media only screen and (max-width: 767px)': {
        height: height * XS
      },
      '@media only screen and (min-width: 768px)': {
        height: height * SM
      },
      '@media only screen and (min-width: 992px)': {
        height: height
      }
    } : {height: '100%'}

    const style = {
      box: {
        ...heightStyles,
        width: width || '100%',
        cursor: photoClick ? 'pointer' : null,
        position: 'relative',
        marginTop: margin,
        marginBottom: margin
      },
      photo: {
        background: 'url(/' + src + '/' + size + ') no-repeat center center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 900
      },
      hover: {
        background: `rgba(0, 0, 0, ${selected && hover ? 0.3 : selected || hover ? 0.2 : 0})`,
        boxShadow: 'inset 0px 0 50px 0px rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 950
      },
      spinnerWrapper: {
        textAlign: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        paddingLeft: 11,
        color: 'lightGray',
        zIndex: 800
      },
      spinner: {
        width: 'auto',
        position: 'relative',
        top: '50%',
        height: 'auto',
        margin: '-18px auto 0 auto'
      }
    }
    return (
      <div className={className} onClick={photoClick} style={style.box} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div style={style.spinnerWrapper}>
          <div style={style.spinner}>
            <i className="fa fa-circle-o-notch fa-spin fa-3x"/>
          </div>
        </div>
        <div style={style.photo} className={crop ? 'cover' : 'contain'}>
          {children}
        </div>
        {((hover || selected) && photoClick) ? <div style={style.hover}/> : null}
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
  margin: 0
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
  navigate: PropTypes.func,
}

// Compose the HOCs in the correct order
const ConnectedPhoto = connect()(Photo)
const NavigatedPhoto = withNavigation(ConnectedPhoto)
const StyledPhoto = Radium(NavigatedPhoto)

export default StyledPhoto
