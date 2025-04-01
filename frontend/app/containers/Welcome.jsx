import React from 'react'
import PropTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Carousel from './../components/photo/Carousel.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Features from './../components/feature/Features.jsx'
import Box from './../components/Box.jsx'
import ProductItems from './../components/product/ProductItems.jsx'
import useMediaQuery from '../hooks/useMediaQuery'

const Welcome = () => {
  const { categories, loading, error } = useLoaderData()
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');

  if (loading) {
    return (
      <Box>
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <div className="text-center text-danger">
          <h3>Error loading products</h3>
          <p>{error}</p>
        </div>
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
      items={categories.sub.slice(0, 2)}
      height={isSmall ? 200 : 270}
      className="col-sm-6 col-xs-12" 
      parentRoute="/produkter"
    />
  ) : null

  return (
    <div>
      <Carousel images={images} />
      <Box>
        <BigHeadline big="Velkommen til Romerike Markiseservice" small="Din lokale markiseleverandør"/>
        <div className="row">
          <div className="col-sm-6">
          {catBig}
          </div>
          <div className="col-sm-6">
            <Features />
          </div>
        </div>
      </Box>
    </div>
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
