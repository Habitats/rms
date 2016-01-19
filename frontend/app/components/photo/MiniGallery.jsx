import React, {Component, PropTypes} from 'react'
import Link from './../Link.jsx'
import {connect} from 'react-redux'
import Photo from './Photo.jsx'

export default class MiniGallery extends Component {

  constructor(props) {
    super(props)
    this.state = {selected: null, hover: false, hoverRight: false, hoverLeft: false}
  }

  onSelect(selected) {
    this.setState({selected: selected})
  }

  componentWillReceiveProps(nextProps){
    this.setState({selected: null})
  }

  onRightSelect(images, selected) {
    let selectedIndex = images.indexOf(selected)
    let newSelectedIndex = (selectedIndex + 1) % images.length
    this.setState({selected: images[newSelectedIndex]})
  }

  onLeftSelect(images, selected) {
    let selectedIndex = images.indexOf(selected)
    let newSelectedIndex = ((selectedIndex - 1) + images.length) % images.length
    this.setState({selected: images[newSelectedIndex]})
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
    let {images, height, orientation} = this.props
    let {hover, hoverRight, hoverLeft, selected} = this.state

    let main = () => images.find(i => i.src.includes('main.jpg'))
    let cover = selected || (main() || (images.length > 0 ? images[0] : null))

    let coverClasses, thumbsClasses, thumbsPhotoClasses, coverStyle, thumbsStyle
    if (orientation === 'vertical') {
      coverClasses = images.length > 4 ? 'col-sm-8' : 'col-sm-9'
      thumbsClasses = images.length > 4 ? 'col-sm-4' : 'col-sm-3'
      thumbsPhotoClasses = images.length > 4 ? 'col-md-6 col-xs-12' : 'col-xs-12'
      coverStyle = {paddingRight: 0}
      thumbsStyle = {paddingRight: 15}
    } else {
      coverClasses = 'col-xs-12'
      thumbsClasses = 'col-xs-12'
      thumbsPhotoClasses = 'col-sm-3 col-xs-6'
      coverStyle = {paddingRight: 15}
      thumbsStyle = {paddingTop: 15, paddingRight: 15}
    }

    let photos = images.map(image =>
      <div key={image.src} className={thumbsPhotoClasses} style={{padding: 0, margin: 0}}>
        <div className={'photo'} style={{marginBottom: 15, marginLeft: 15}}>
          <Photo onClick={this.onSelect.bind(this, image)} height={orientation === 'horizontal' ? 120 : 90} src={image.src} size={'low'}
                 selected={cover === image}/>
        </div>
      </div>
    )

    let iconStyle = {
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      color: 'white',
      paddingLeft: 10,
      textShadow: '5px 2px 3px rgba(0,0,0,0.5)'
    }

    let rightHover = hover ? (
      <div style={{height: '100%', width: 55, float: 'right'}}
           onClick={this.onRightSelect.bind(this, images, cover)}>
               <span onMouseEnter={this.toggleHoverRight.bind(this, true)} onMouseLeave={this.toggleHoverRight.bind(this, false)}
                     style={{... iconStyle, color: hoverRight ? 'white' : 'lightGray'}}
                     className="fa fa-chevron-right fa-3x"/>
      </div>) : null
    let leftHover = hover ? (
      <div style={{height: '100%', width: 55, float: 'left'}}
           onClick={this.onLeftSelect.bind(this, images, cover)}>
               <span onMouseEnter={this.toggleHoverLeft.bind(this, true)} onMouseLeave={this.toggleHoverLeft.bind(this, false)}
                     style={{... iconStyle, color: hoverLeft ? 'white' : 'lightGray'}}
                     className="fa fa-chevron-left fa-3x"/>
      </div>) : null

    return (
      <div>
        <div onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this, false)}
             className={coverClasses} style={coverStyle}>
          <Photo src={cover.src} height={height} size={'med'}>
            {rightHover}
            {leftHover}
          </Photo>
        </div>
        <div className={thumbsClasses}>
          <div className="row" style={thumbsStyle}>
            <div style={{height: orientation === 'vertical' ? height : '100%', overflowY: 'auto'}}>
              {photos}
            </div>
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
