import React from 'react'
import PropTypes from 'prop-types'
import Photo from './Photo.jsx'
import Slider from 'react-slick'
import styled from 'styled-components'
import { SM, XS, COVER_HEIGHT } from '../../vars'

const CarouselContainer = styled.div`
  height: ${COVER_HEIGHT}px;

  @media only screen and (max-width: 767px) {
    height: ${COVER_HEIGHT * XS}px;
  }

  @media only screen and (min-width: 768px) {
    height: ${COVER_HEIGHT * SM}px;
  }

  @media only screen and (min-width: 992px) {
    height: ${COVER_HEIGHT}px;
  }
`

const Carousel = ({ images }) => {
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
      {images.map(image => (
        <CarouselContainer key={image.src}>
          <Photo src={image.src} />
        </CarouselContainer>
      ))}
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
