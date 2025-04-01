import React from 'react'
import PropTypes from 'prop-types'
import Photo from './Photo.jsx'
import Slider from 'react-slick'
import Radium from 'radium'
import {SM, XS, COVER_HEIGHT} from '../../vars'

const Carousel = ({ images }) => {
  const height = COVER_HEIGHT
  const style = {
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

  const photos = images.map(i => (
    <div key={i.src} style={style.carousel}>
      <Photo src={i.src}/>
    </div>
  ))

  const settings = {
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
  }

  return (
    <Slider {...settings}>
      {photos}
    </Slider>
  )
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
}

// Apply Radium styles
const StyledCarousel = Radium(Carousel)

export default StyledCarousel
