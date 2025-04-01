import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Photo from './Photo.jsx'
import CoverPhoto from './CoverPhoto.jsx'
import Radium from 'radium'
import Draggable, {DraggableCore} from 'react-draggable'
import {SM, XS} from '../../vars'

class MiniGallery extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      startX: 0,
      deltaX: 0,
      mql: window.matchMedia('only screen and (max-width: 991px)')
    }
    this.mounted = false
  }

  onSelect(selected) {
    this.setState({selected: selected})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({selected: null})
  }

  handleMediaChange() {
    if (this.mounted) {
      if (this.state.mql.matches) {
        this.setState({small: true})
      } else {
        this.setState({small: false})
      }
    }
  }

  componentWillMount() {
    this.mounted = true
    this.state.mql.addListener(this.handleMediaChange.bind(this))
  }

  componentDidMount() {
    this.handleMediaChange()
  }

  componentWillUnmount() {
    this.mounted = false
    this.state.mql.removeListener(this.handleMediaChange.bind(this))
  }

  onRightSelect(images, selected) {
    const selectedIndex = images.indexOf(selected)
    const newSelectedIndex = (selectedIndex + 1) % images.length
    const startX = newSelectedIndex <= 3 ? 0 : (images.length - newSelectedIndex) <= 3 ? this.state.startX : (-(newSelectedIndex - 3) * 103)
    this.setState({selected: images[newSelectedIndex], startX: startX})
  }

  onLeftSelect(images, selected) {
    const selectedIndex = images.indexOf(selected)
    const newSelectedIndex = ((selectedIndex - 1) + images.length) % images.length
    const startX = newSelectedIndex <= 3 ? 0 : (images.length - newSelectedIndex) <= 3 ? this.state.startX : (-(newSelectedIndex - 3) * 103)
    this.setState({selected: images[newSelectedIndex], startX: startX})
  }

  handleDrag(e, ui) {
    this.setState({
      deltaX: this.state.deltaX + ui.deltaX
    })
  }

  horizontal(images, cover, height, startX) {
    const style = {
      cover: {
        paddingRight: 15,
        '@media only screen and (max-width: 767px)': {
          height: height * XS
        },
        '@media only screen and (min-width: 768px)': {
          height: height * SM
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
        float: 'none',
        display: 'inline-block',
        '@media only screen and (max-width: 767px)': {
          height: 60,
          width: 80,
        },
        '@media only screen and (min-width: 768px)': {
          height: 90,
          width: 103
        },
      }
    }

    const classes = {
      cover: 'col-xs-12',
      thumbs: 'col-xs-3',
      thumbWrapper: 'col-xs-12'
    }

    const bound = images.length <= 7 ? 0 : -((images.length - 7) * 103)
    return (
      <div className="row mini-gallery">
        <div className={classes.cover} style={style.cover}>
          <CoverPhoto src={cover.src} onRightSelect={this.onRightSelect.bind(this, images, cover)}
                      onLeftSelect={this.onLeftSelect.bind(this, images, cover)}/>

        </div>
        {images.length > 1 ?
         <div className={classes.thumbWrapper}>
           <div style={style.thumbs}>
             <Draggable axis="x" zIndex={100} onDrag={this.handleDrag.bind(this)} bounds={{top: 0, left: bound, right: 0, bottom: 0}}>
               <div style={style.scroller}>
                 {images.map(image =>
                   <div key={image.src} style={style.photo}>
                     <Photo key={image.src} className={classes.thumbs} src={image.src} size={'low'}
                            onClick={this.onSelect.bind(this, image)} selected={cover === image}/>
                   </div>)}
               </div>
             </Draggable>
           </div>
         </div> : null }
      </div>
    )
  }

  vertical(images, cover, height) {
    const style = {
      cover: {
        paddingRight: images.length > 1 ? 0 : null,
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
        '@media only screen and (max-width: 767px)': {
          height: 60,
        },
        '@media only screen and (min-width: 768px)': {
          height: 90,
        },
      }
    }

    const classes = {
      cover: images.length === 1 ? 'col-xs-12' : images.length > 10 ? 'col-xs-8' : 'col-xs-9',
      thumbs: images.length > 10 ? 'col-md-6 col-xs-12' : 'col-xs-12',
      thumbWrapper: images.length > 10 ? 'col-xs-4' : 'col-xs-3'
    }

    return (
      <div className="row mini-gallery">
        <div className={classes.cover} style={style.cover}>
          <CoverPhoto src={cover.src} onRightSelect={this.onRightSelect.bind(this, images, cover)}
                      onLeftSelect={this.onLeftSelect.bind(this, images, cover)}/>
        </div>
        {images.length > 1 ?
         <div className={classes.thumbWrapper}>
           <div style={style.thumbs}>
             <div style={style.scroller}>
               {images.map(image =>
                 <div style={style.photo} className={classes.thumbs} key={image.src}>
                   <Photo onClick={this.onSelect.bind(this, image)} src={image.src} size={'low'} selected={cover === image}/>
                 </div>)}
             </div>
           </div>
         </div> : null }
      </div>
    )
  }

  render() {
    const {images, height, orientation} = this.props
    const {selected, startX, deltaX, small} = this.state
    const galleryHeight = images.length > 1 ? height : height * 0.75

    const main = () => images.find(i => i.src.includes('main.jpg'))
    const cover = selected || (main() || (images.length > 0 ? images[0] : null))
    // no cover? nothing to see here (...)
    if (!cover) {
      return null
    }

    return (
      <div>
        {images.length === 1 ?
         <div style={{height: galleryHeight}}>
           <Photo src={cover.src}/>
         </div>
          :
         <div>
           {small ? this.horizontal(images, cover, galleryHeight, startX) :
            orientation === 'horizontal' ? this.horizontal(images, cover, galleryHeight) : this.vertical(images, cover, galleryHeight)}
         </div>}
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
