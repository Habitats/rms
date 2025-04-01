import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Photo from './Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import TextOverlay from './../text/TextOverlay.jsx'

export default class PhotoBig extends Component {

  render() {
    const {height, width, src, description, title} = this.props
    return (
      <Photo crop={true} height={height} width={width} src={src} clickable={true} size={'med'} margin={0}>
        {title ? <HeadlineOverlay text={title}/> : null}
        {description ? <TextOverlay text={description}/> : null}
      </Photo>
    )
  }
}

PhotoBig.propTypes = {
  src: PropTypes.string.isRequired,
  description: PropTypes.string,
  height: PropTypes.number,
  title: PropTypes.string,
  width: PropTypes.number,
  onClick: PropTypes.func
}

PhotoBig.defaultProps = {
  description: '',
  title: '',
  width: undefined,
  height: 500
}
