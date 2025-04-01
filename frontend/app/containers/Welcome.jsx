import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from './../components/photo/Carousel.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Features from './../components/feature/Features.jsx'
import Box from './../components/Box.jsx'
import ProductItems from './../components/product/ProductItems.jsx'
import * as ProductActionCreators from '../redux/actions/ProductActions'
import Radium from 'radium'

const Welcome = () => {
  const dispatch = useDispatch()
  const { categories, loading, error } = useSelector(state => ({
    categories: state.products,
    loading: state.products.loading,
    error: state.products.error
  }))

  const [isSmall, setIsSmall] = useState(false)
  const [mql] = useState(() => window.matchMedia('only screen and (max-width: 767px)'))

  useEffect(() => {
    if (!categories || Object.keys(categories).length === 0) {
      dispatch(ProductActionCreators.fetchProducts())
    }

    const handleMediaChange = () => setIsSmall(mql.matches)
    mql.addListener(handleMediaChange)
    handleMediaChange()

    return () => mql.removeListener(handleMediaChange)
  }, [categories, dispatch, mql])

  if (loading) {
    return (
      <Box>
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
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
    <div>
      <Box>
        <Carousel images={images}/>
        <Features />
      </Box>

      <Box>
        <BigHeadline big="Våre tjenester"/>
        <div className="row">
          {catBig}
          {catSmall}
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

// Apply Radium styles
const StyledWelcome = Radium(Welcome)

export default StyledWelcome
