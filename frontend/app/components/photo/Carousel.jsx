import React, {Component, PropTypes} from 'react'
import Photo from './Photo.jsx'
import Slider from 'react-slick'
import Radium from 'radium'
import {SM, XS, COVER_HEIGHT} from '../../vars'

class Carousel extends Component {


  render() {
    let {images} = this.props

    let height = COVER_HEIGHT
    let style ={
      carousel: {
        '@media only screen and (max-width: 767px)': {
          height: height * XS
        },
        '@media only screen and (min-width: 768px)': {
          height: height * SM
        },
        '@media only screen and (min-width: 992px)': {
          height: height
        }
      }
    }
    let photos = images.map(i => (
      <div key={i.src} style={style.carousel}>
        <Photo src={i.src}/>
      </div>
    ))
    let settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      autoplaySpeed: 7000,
      draggable: true,
      fade: false,
      arrows: false,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        {photos}
      </Slider>
    )
  }
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
}

export default Radium(Carousel)
