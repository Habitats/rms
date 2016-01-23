import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import Photo from './Photo.jsx'

class CoverPhoto extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
      hover: false,
      hoverRight: false,
      hoverLeft: false
    }
  }

  toggleHover(hover) {
    this.setState({hover: hover})
  }

  toggleHoverRight(hover) {
    this.setState({hoverRight: hover})
  }

  toggleHoverLeft(hover) {
    this.setState({hoverLeft: hover})
  }

  render() {
    let {src, onRightSelect, onLeftSelect} = this.props
    let {hover, hoverLeft, hoverRight} = this.state
    let style = {
      icon: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        height: 'auto',
        color: 'white',
        paddingLeft: 10,
        textShadow: '5px 2px 3px rgba(0,0,0,0.5)'
      }
    }

    let rightHover = hover ? (
      <div style={{height: '100%', width: 55, float: 'right'}}
           onClick={onRightSelect}>
               <span onMouseEnter={this.toggleHoverRight.bind(this, true)} onMouseLeave={this.toggleHoverRight.bind(this, false)}
                     style={{... style.icon, color: hoverRight ? 'white' : 'lightGray'}} className="fa fa-chevron-right fa-3x"/>
      </div>) : null
    let leftHover = hover ? (
      <div style={{height: '100%', width: 55, float: 'left'}}
           onClick={onLeftSelect}>
               <span onMouseEnter={this.toggleHoverLeft.bind(this, true)} onMouseLeave={this.toggleHoverLeft.bind(this, false)}
                     style={{... style.icon, color: hoverLeft ? 'white' : 'lightGray'}} className="fa fa-chevron-left fa-3x"/>
      </div>) : null

    return (
      <div onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this, false)}>
        <Photo src={src}>
          {rightHover}
          {leftHover}
        </Photo>
      </div>
    )
  }
}

CoverPhoto.propTypes ={
  src: PropTypes.string.isRequired,
  onRightSelect: PropTypes.func.isRequired,
  onLeftSelect: PropTypes.func.isRequired
}

export default Radium(CoverPhoto)
