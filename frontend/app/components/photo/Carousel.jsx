import React, {Component, PropTypes} from 'react'
import Photo from './Photo.jsx'
import Slider from 'react-slick'

export default class Carousel extends Component {


  render() {
    let {images} = this.props
    let photos = images.map(i => (
      <div key={i.src}>
        <Photo height={450} src={i.src}/>
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
