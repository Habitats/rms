import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Photo from './Photo.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'
import { SM, XS, COVER_HEIGHT } from '../../vars'

const Carousel = ({ images }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')
  const isMedium = useMediaQuery('only screen and (min-width: 768px)')
  const isLarge = useMediaQuery('only screen and (min-width: 992px)')

  // Calculate height based on screen size
  const calculatedHeight = isSmall 
    ? COVER_HEIGHT * XS 
    : isMedium 
      ? COVER_HEIGHT * SM 
      : COVER_HEIGHT

  const style = {
    carousel: {
      height: calculatedHeight,
      width: '100%'
    }
  }

  const photos = images.map(i => (
    <div key={i.src} style={style.carousel}>
      <Photo 
        src={i.src}
        height={calculatedHeight}
        size="med"
        crop={true}
      />
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
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Carousel
