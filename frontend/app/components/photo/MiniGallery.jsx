import React, {Component, PropTypes} from 'react'
import Link from './../Link.jsx'
import {pushPath} from 'redux-simple-router'
import {connect} from 'react-redux'
import Photo from './Photo.jsx'

export default class MiniGallery extends Component {

  constructor(props) {
    super(props)
    let coverImage = this.props.images.find(i => i.src.includes('main.jpg')) || this.props.images.length > 0 ? this.props.images[0] : null
    this.state = {selected: coverImage, hover: false, hoverRight: false, hoverLeft: false}
  }

  onSelect(selected) {
    this.setState({selected: selected})
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

    let coverClasses, thumbsClasses, thumbsPhotoClasses, coverStyle, thumbsStyle
    if (orientation === 'vertical') {
      coverClasses = images.length > 4 ? 'col-md-8 col-sm-8' : 'col-md-9 col-sm-9'
      thumbsClasses = images.length > 4 ? 'col-md-4 col-sm-4' : 'col-md-3 col-sm-3'
      thumbsPhotoClasses = images.length > 4 ? 'col-lg-6 col-md-6 col-sm-12 col-xs-12' : 'col-lg-12 col-md-12 col-sm-12 col-xs-12'
      coverStyle = {paddingRight: 0}
      thumbsStyle = {paddingRight: 15}
    } else {
      coverClasses = 'col-md-12 col-sm-12 col-xs-12'
      thumbsClasses = 'col-md-12 col-sm-12 col-xs-12'
      thumbsPhotoClasses = 'col-md-3 col-sm-3 col-xs-6'
      coverStyle = {paddingRight: 15}
      thumbsStyle = {paddingTop: 15, paddingRight: 15}
    }

    let photos = images.map(image =>
      <div key={image.src} className={thumbsPhotoClasses} style={{padding: 0, margin: 0}}>
        <div className={'photo'} style={{marginBottom: 15, marginLeft: 15}}>
          <Photo onClick={this.onSelect.bind(this, image)} height={orientation === 'horizontal' ? 120 : 90} src={image.src} size={'low'} selected={selected === image}/>
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
           onClick={this.onRightSelect.bind(this, images, selected)}>
               <span onMouseEnter={this.toggleHoverRight.bind(this, true)} onMouseLeave={this.toggleHoverRight.bind(this, false)}
                     style={{... iconStyle, color: hoverRight ? 'white' : 'lightGray'}}
                     className="fa fa-chevron-right fa-3x"/>
      </div>) : null
    let leftHover = hover ? (
      <div style={{height: '100%', width: 55, float: 'left'}}
           onClick={this.onLeftSelect.bind(this, images, selected)}>
               <span onMouseEnter={this.toggleHoverLeft.bind(this, true)} onMouseLeave={this.toggleHoverLeft.bind(this, false)}
                     style={{... iconStyle, color: hoverLeft ? 'white' : 'lightGray'}}
                     className="fa fa-chevron-left fa-3x"/>
      </div>) : null

    return (
      <div>
        <div onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this, false)}
             className={coverClasses} style={coverStyle}>
          <Photo src={selected.src} height={height} size={'med'}>
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
