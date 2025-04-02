import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import ProductItem from './ProductItem.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'
import * as V from '../../vars'

const ProductsContainer = styled.div`
  padding-left: ${props => props.isLarge ? '0' : `${V.MARGIN_XS}px`};
  padding-right: ${props => props.isLarge ? '0' : `${V.MARGIN_XS}px`};
  min-height: 100%;
`

const ProductItems = ({ products, parentRoute, className = 'col-sm-6 col-xs-12', height = 230 }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (min-width: ${theme.breakpoints.sm})`);
  const isLarge = useMediaQuery(`only screen and (min-width: ${theme.breakpoints.md})`);

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
    <ProductsContainer isLarge={isLarge}>
      {rootCategories}
    </ProductsContainer>
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
