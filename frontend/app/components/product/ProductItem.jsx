import React from 'react'
import PropTypes from 'prop-types'
import Photo from '../photo/Photo.jsx'
import HeadlineOverlay from '../text/HeadlineOverlay.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const ProductItem = ({ product: { title, src }, linkTo, height = 250, className = 'col-md-6 col-sm-12 col-xs-6 col-md-offset-0' }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')
  const isMedium = useMediaQuery('only screen and (min-width: 768px)')
  const isLarge = useMediaQuery('only screen and (min-width: 992px)')

  // Calculate height based on screen size
  const calculatedHeight = isSmall 
    ? height * 0.8 
    : isMedium 
      ? height * 0.7 
      : height

  const style = {
    box: {
      paddingLeft: isLarge ? 15 : 0,
      marginBottom: isLarge ? 30 : 15,
      height: calculatedHeight
    }
  }

  return (
    <div className={`product-item ${className}`} style={style.box}>
      <Photo linkTo={linkTo} src={src} size={'med'}>
        <HeadlineOverlay text={title}/>
      </Photo>
    </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }),
  linkTo: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.number
}

export default ProductItem
