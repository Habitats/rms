import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Photo from './Photo.jsx'

const PhotoLine = ({ images, root, selected, clickable }) => {
  const navigate = useNavigate()

  const handlePhotoClick = useCallback((index) => {
    navigate(`/${root}/${index}`)
  }, [navigate, root])

  const photos = useMemo(() => {
    return images.map((image, index) => (
      <div className="col-md-3 col-sm-4 col-xs-6" key={image.src}>
        <div className="photo">
          <Photo
            onClick={clickable ? undefined : () => handlePhotoClick(index)}
            height={120}
            src={image.src}
            size="low"
            selected={images[selected] === image}
            margin={15}
          />
        </div>
      </div>
    ))
  }, [images, selected, clickable, handlePhotoClick])

  return (
    <div className="row">
      {photos}
    </div>
  )
}

PhotoLine.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired
  })).isRequired,
  root: PropTypes.string,
  selected: PropTypes.number,
  clickable: PropTypes.bool
}

PhotoLine.defaultProps = {
  selected: 0,
  clickable: false,
  root: null
}

export default PhotoLine

