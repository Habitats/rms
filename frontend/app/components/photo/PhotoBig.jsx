import React from 'react'
import PropTypes from 'prop-types'
import Photo from './Photo.jsx'
import HeadlineOverlay from '../text/HeadlineOverlay.jsx'
import TextOverlay from '../text/TextOverlay.jsx'

const PhotoBig = ({ height = 500, width, src, description = '', title = '', onClick }) => {
  return (
    <Photo 
      crop={true}
      height={height}
      width={width}
      src={src}
      clickable={true}
      size={'med'}
      margin={0}
    >
      {title && <HeadlineOverlay text={title} />}
      {description && <TextOverlay text={description} />}
    </Photo>
  )
}

PhotoBig.propTypes = {
  src: PropTypes.string.isRequired,
  description: PropTypes.string,
  height: PropTypes.number,
  title: PropTypes.string,
  width: PropTypes.number,
  onClick: PropTypes.func
}

export default PhotoBig
