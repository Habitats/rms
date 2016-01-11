import React, {Component, PropTypes} from 'react'
import Photo from './Photo.jsx'

export default class Carousel extends Component {

  render() {
    return (
      <div >
        <Photo height={450} src={this.props.src} margin={0}>
          {this.props.children}
        </Photo>
      </div>
    )
  }
}

Carousel.propTypes = {
  children: PropTypes.object,
  src: PropTypes.string.isRequired
}
