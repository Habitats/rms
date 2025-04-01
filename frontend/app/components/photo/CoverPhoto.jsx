import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import Photo from './Photo.jsx'

class CoverPhoto extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
      hover: false,
    }

    this.onMouseEnter = () => this.setState({hover: true})
    this.onMouseLeave = () => this.setState({hover: false})
  }

  render() {
    const {src, onRightSelect, onLeftSelect} = this.props
    const {hover} = this.state
    const style = {
      icon: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        height: 'auto',
        color: 'lightGray',
        paddingLeft: 10,
        textShadow: '5px 2px 3px rgba(0,0,0,0.5)',
        ':hover': {
          color: 'white'
        }
      }
    }

    const rightHover = hover ? (
      <div style={{height: '100%', width: 55, float: 'right'}} onClick={onRightSelect}>
        <span key={0} style={style.icon} className="fa fa-chevron-right fa-3x"/>
      </div>) : null
    const leftHover = hover ? (
      <div style={{height: '100%', width: 55, float: 'left'}} onClick={onLeftSelect}>
        <span key={1} style={style.icon} className="fa fa-chevron-left fa-3x"/>
      </div>) : null

    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={{height: '100%'}}>
        <Photo src={src}>
          {rightHover}
          {leftHover}
        </Photo>
      </div>
    )
  }
}

CoverPhoto.propTypes = {
  src: PropTypes.string.isRequired,
  onRightSelect: PropTypes.func.isRequired,
  onLeftSelect: PropTypes.func.isRequired
}

export default Radium(CoverPhoto)
