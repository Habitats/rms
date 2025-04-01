import React from 'react'
import PropTypes from 'prop-types'
import Photo from './Photo.jsx'
import Slider from 'react-slick'
import {SM, XS, COVER_HEIGHT} from '../../vars'
import useMediaQuery from '../../hooks/useMediaQuery'

const Carousel = ({ images }) => {
  const height = COVER_HEIGHT
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    carousel: {
      height: isSmall ? height * XS : isMedium ? height * SM : height
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
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired
  })).isRequired
}

export default Carousel
