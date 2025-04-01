import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Photo from './Photo.jsx'

const PhotoLine = ({ images, root, selected, clickable }) => {
  const navigate = useNavigate()
  const dispatch = useSelector(state => state.dispatch)

  const onSelect = (path) => {
    navigate(path)
  }

  const photos = images.map(image =>
    <div className="col-md-3 col-sm-4 col-xs-6" key={image.src}>
      {!clickable ?
       <div className={'photo'}>
         <Photo onClick={() => onSelect('/' + root + '/' + images.indexOf(image))} height={120}
                src={image.src} size={'low'} selected={images[selected] === image} margin={15}/>
       </div>
        :
       <div className={'photo'}>
         <Photo height={120} src={image.src} size={'low'} margin={15}/>
       </div>
      }
    </div>
  )

  return (
    <div>
      {photos}
    </div>
  )
}

PhotoLine.defaultProps = {
  selected: 0,
  clickable: false,
  root: null
}

PhotoLine.propTypes = {
  dispatch: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  root: PropTypes.string,
  selected: PropTypes.number,
  clickable: PropTypes.bool,
}

export default PhotoLine

