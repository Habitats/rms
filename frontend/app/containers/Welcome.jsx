import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import Carousel from './../components/photo/Carousel.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Features from './../components/feature/Features.jsx'
import Box from './../components/Box.jsx'
import ProductItems from './../components/product/ProductItems.jsx'
import useMediaQuery from '../hooks/useMediaQuery'
import { useProducts } from '../hooks/useProducts'
import { ProductProvider } from '../contexts/ProductContext'

const LoadingContainer = styled.div`
  text-align: center;
`

const ErrorContainer = styled.div`
  text-align: center;
  color: #dc3545;
`

const Welcome = () => {
  const { data: categories, isLoading: loading, error } = useProducts()
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')

  if (loading) {
    return (
      <Box>
        <LoadingContainer>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </LoadingContainer>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <ErrorContainer>
          <h3>Error loading products</h3>
          <p>{error.message}</p>
        </ErrorContainer>
      </Box>
    )
  }

  const images = [
    {src: 'image/carousel,c1.jpg'},
    {src: 'image/carousel,c2.jpg'},
    {src: 'image/carousel,c3.jpg'},
    {src: 'image/carousel,c4.jpg'},
    {src: 'image/carousel,c5.jpg'},
    {src: 'image/carousel,c6.jpg'},
    {src: 'image/carousel,c7.jpg'}
  ]

  const ready = categories && categories.hasOwnProperty('sub')
  const catBig = ready ? (
    <ProductItems 
      products={categories.sub.slice(0, 2)}
      height={isSmall ? 200 : 270}
      className="col-sm-6 col-xs-12" 
      parentRoute="/produkter"
    />
  ) : null

  const catSmall = ready ? (
    <ProductItems 
      products={categories.sub.slice(2, 5)}
      height={isSmall ? 200 : 170}
      className="col-sm-4 col-xs-12" 
      parentRoute="/produkter"
    />
  ) : null

  return (
    <ProductProvider>
      <div>
        <Box>
          <Carousel images={images} />
          <Features />
        </Box>
        <Box>
          <BigHeadline big="Våre tjenester" />
          <div className="row">
            {catBig}
            {catSmall}
          </div>
        </Box>
      </div>
    </ProductProvider>
  )
}

Welcome.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string
}

Welcome.defaultProps = {
  loading: false,
  error: null
}

export default Welcome
