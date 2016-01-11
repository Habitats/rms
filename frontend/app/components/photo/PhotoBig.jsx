import React, {Component, PropTypes} from 'react'
import Photo from './Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'

export default class PhotoBig extends Component {

  render() {
    let {height, width, src, onClick, description} = this.props
    return (
      <Photo crop={true} height={height} width={width} src={src} clickable={!!onClick} size={'med'} margin={0}>
        <HeadlineOverlay text={description}/>
      </Photo>
    )
  }
}

PhotoBig.propTypes = {
  description: PropTypes.string,
  src: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  onClick: PropTypes.func
}

PhotoBig.defaultProps = {
  description: '',
  height: 500,
  width: undefined
}
