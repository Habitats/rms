import React from 'react'
import PropTypes from 'prop-types'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const ProductItem = ({ product: { title, src }, linkTo, height, className }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    box: {
      paddingLeft: isSmall ? 0 : isMedium ? 0 : 15,
      marginBottom: isSmall ? 15 : isMedium ? 15 : 30,
      height: isSmall ? height * 0.8 : isMedium ? height * 0.7 : height
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

ProductItem.defaultProps = {
  height: 250,
  className: 'col-md-6 col-sm-12 col-xs-6 col-md-offset-0'
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }).isRequired,
  linkTo: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.number
}

export default ProductItem
