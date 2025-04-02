import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import Photo from '../photo/Photo.jsx'
import HeadlineOverlay from '../text/HeadlineOverlay.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const ProductItemContainer = styled.div`
  padding-left: ${props => props.isLarge ? '15px' : '0'};
  margin-bottom: ${props => props.isLarge ? '30px' : '15px'};
  height: ${props => props.calculatedHeight}px;
`

const ProductItem = ({ product: { title, src }, linkTo, height = 250, className = 'col-md-6 col-sm-12 col-xs-6 col-md-offset-0' }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (min-width: ${theme.breakpoints.sm})`);
  const isLarge = useMediaQuery(`only screen and (min-width: ${theme.breakpoints.md})`);

  // Calculate height based on screen size
  const calculatedHeight = isSmall 
    ? height * 0.8 
    : isMedium 
      ? height * 0.7 
      : height

  return (
    <ProductItemContainer 
      className={`product-item ${className}`}
      isLarge={isLarge}
      calculatedHeight={calculatedHeight}
    >
      <Photo linkTo={linkTo} src={src} size={'med'}>
        <HeadlineOverlay text={title}/>
      </Photo>
    </ProductItemContainer>
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
