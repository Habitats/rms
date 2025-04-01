import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem.jsx'
import Radium from 'radium'
import * as V from '../../vars'

const ProductItems = ({ products, parentRoute, className, height }) => {
  const style = {
    container: {
      '@media only screen and (max-width: 767px)': {
        paddingLeft: V.MARGIN_XS,
        paddingRight: V.MARGIN_XS,
      },
      '@media only screen and (min-width: 768px)': {
        paddingLeft: V.MARGIN_XS,
        paddingRight: V.MARGIN_XS,
      },
      '@media only screen and (min-width: 992px)': {
        paddingLeft: 0,
      }
    }
  }

  const productItems = useMemo(() => {
    return products.map(product => (
      <ProductItem 
        key={product.id}
        product={product}
        height={height}
        className={className}
        linkTo={`${parentRoute}/${product.id}`}
      />
    ))
  }, [products, height, className, parentRoute])

  return (
    <div style={style.container}>
      {productItems}
    </div>
  )
}

ProductItems.defaultProps = {
  height: 230,
  className: 'col-sm-6 col-xs-12'
}

ProductItems.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  })).isRequired,
  parentRoute: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.number
}

export default Radium(ProductItems)
