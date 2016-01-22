import React, {Component, PropTypes} from 'react'
import Link from './../Link.jsx'
import {connect} from 'react-redux'
import Photo from './Photo.jsx'
import Radium from 'radium'
import Draggable, {DraggableCore} from 'react-draggable'

class MiniGallery extends Component {

  constructor(props) {
    super(props)
    this.state = {selected: null, hover: false, hoverRight: false, hoverLeft: false, startX: 0, deltaX: 0}
  }

  onSelect(selected) {
    this.setState({selected: selected})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({selected: null})
  }

  onRightSelect(images, selected) {
    let selectedIndex = images.indexOf(selected)
    let newSelectedIndex = (selectedIndex + 1) % images.length
    let startX = newSelectedIndex <= 3 ? 0 : (images.length - newSelectedIndex) <= 3 ? this.state.startX : (-(newSelectedIndex - 3) * 103)
    this.setState({selected: images[newSelectedIndex], startX: startX})
  }

  onLeftSelect(images, selected) {
    let selectedIndex = images.indexOf(selected)
    let newSelectedIndex = ((selectedIndex - 1) + images.length) % images.length
    let startX = newSelectedIndex <= 3 ? 0 : (images.length - newSelectedIndex) <= 3 ? this.state.startX : (-(newSelectedIndex - 3) * 103)
    this.setState({selected: images[newSelectedIndex], startX: startX})
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

  handleDrag(e, ui) {
    this.setState({
      deltaX: this.state.deltaX + ui.deltaX
    })
  }

  render() {
    let {images, height, orientation} = this.props
    let {hover, hoverRight, hoverLeft, selected, startX, deltaX} = this.state

    let main = () => images.find(i => i.src.includes('main.jpg'))
    let cover = selected || (main() || (images.length > 0 ? images[0] : null))
    // no cover? nothing to see here (...)
    if (!cover) {
      return null
    }

    let coverClasses, thumbsClasses, thumbsPhotoClasses, style
    if (orientation === 'vertical') {
      coverClasses = images.length > 4 ? 'col-xs-8' : 'col-xs-9'
      thumbsClasses = images.length > 4 ? 'col-xs-4' : 'col-xs-3'
      thumbsPhotoClasses = images.length > 4 ? 'col-md-6 col-xs-12' : 'col-xs-12'
      style = {
        cover: {
          paddingRight: 0,
          height: height
        },
        thumbs: {
          padding: 0,
          marginLeft: -15
        },
        scroller: {
          height: height,
          overflowY: 'auto',
          padding: 0,
          overflowX: 'hidden'
        },
        photo: {
          paddingBottom: 15,
          paddingLeft: 15,
          paddingTop: 0,
          paddingRight: 0,
          height: 90
        }
      }
    } else {
      coverClasses = 'col-xs-12'
      thumbsClasses = 'col-xs-12'
      thumbsPhotoClasses = ''
      style = {
        cover: {
          paddingRight: 15,
          '@media only screen and (max-width: 767px)': {
            height: height * 0.60
          },
          '@media only screen and (min-width: 768px)': {
            height: height * 0.75
          },
          '@media only screen and (min-width: 992px)': {
            height: height
          }
        },
        thumbs: {
          maxHeight: 200,
          zIndex: 200,
          overflow: 'hidden',
          width: '100%'
        },
        scroller: {
          marginTop: 15,
          height: 80,
          left: startX,
          position: 'relative',
          width: images.length * 115 - 15,
        },
        photo: {
          paddingBottom: 0,
          paddingLeft: 0,
          paddingTop: 0,
          paddingRight: 15,
          height: 80,
          width: 103,
          float: 'none',
          display: 'inline-block'
        }
      }
    }

    style = {
      ... style,
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

    let photos = images.map(image =>
      <div key={image.src} className={thumbsPhotoClasses}
           style={style.photo}>
        <Photo onClick={this.onSelect.bind(this, image)} src={image.src} size={'low'} selected={cover === image}/>
      </div>
    )

    let rightHover = hover ? (
      <div style={{height: '100%', width: 55, float: 'right'}}
           onClick={this.onRightSelect.bind(this, images, cover)}>
               <span onMouseEnter={this.toggleHoverRight.bind(this, true)} onMouseLeave={this.toggleHoverRight.bind(this, false)}
                     style={{... style.icon, color: hoverRight ? 'white' : 'lightGray'}}
                     className="fa fa-chevron-right fa-3x"/>
      </div>) : null
    let leftHover = hover ? (
      <div style={{height: '100%', width: 55, float: 'left'}}
           onClick={this.onLeftSelect.bind(this, images, cover)}>
               <span onMouseEnter={this.toggleHoverLeft.bind(this, true)} onMouseLeave={this.toggleHoverLeft.bind(this, false)}
                     style={{... style.icon, color: hoverLeft ? 'white' : 'lightGray'}}
                     className="fa fa-chevron-left fa-3x"/>
      </div>) : null
    return (
      <div className="row mini-gallery">
        <div onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this, false)}
             className={coverClasses} style={style.cover}>
          <Photo src={cover.src} size={'med'}>
            {rightHover}
            {leftHover}
          </Photo>
        </div>
        <div className={thumbsClasses}>
          <div style={style.thumbs}>
            {orientation === 'horizontal' ?
             <Draggable axis="x" zIndex={100} onDrag={this.handleDrag.bind(this)}
                        bounds={{top: 0, left: (images.length <= 7 ? 0 : -((images.length-7) * 103)), right: 0, bottom: 0}}>
               <div style={style.scroller}>
                 {photos}
               </div>
             </Draggable>
              :
             <div style={style.scroller}>
               {photos}
             </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

MiniGallery.defaultProps = {
  height: 350,
  orientation: 'horizontal'
}

MiniGallery.propTypes = {
  images: PropTypes.array.isRequired,
  orientation: PropTypes.string,
  height: PropTypes.number
}

export default Radium(MiniGallery)
