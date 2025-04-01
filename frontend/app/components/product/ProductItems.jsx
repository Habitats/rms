import React from 'react'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'
import * as V from '../../vars'

const ProductItems = ({ products, parentRoute, className = 'col-sm-6 col-xs-12', height = 230 }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')
  const isMedium = useMediaQuery('only screen and (min-width: 768px)')
  const isLarge = useMediaQuery('only screen and (min-width: 992px)')

  const style = {
    container: {
      paddingLeft: isLarge ? 0 : V.MARGIN_XS,
      paddingRight: isLarge ? 0 : V.MARGIN_XS,
      minHeight: '100%'
    }
  }

  const rootCategories = products.map(c => (
    <ProductItem 
      key={`${c.id}`} 
      product={c} 
      height={height} 
      className={className} 
      linkTo={`${parentRoute}/${c.id}`}
    />
  ))

  return (
    <div style={style.container}>
      {rootCategories}
    </div>
  )
}

ProductItems.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    })
  ).isRequired,
  parentRoute: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.number
}

export default ProductItems
