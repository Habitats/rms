import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useOutletContext, useLoaderData } from 'react-router-dom'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Menu from './../components/menu/Menu.jsx'
import ProductItems from '../components/product/ProductItems.jsx'
import Left from './../components/Left.jsx'
import Right from './../components/Right.jsx'
import Box from './../components/Box.jsx'
import NotFound from '../components/NotFound.jsx'
import Link from '../components/Link.jsx'
import useMediaQuery from '../hooks/useMediaQuery'

const ProductsContainer = () => {
  const { categories, isAdmin } = useLoaderData()
  const { categoryId, productId } = useParams()
  const children = useOutletContext()
  
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')
  const isMedium = useMediaQuery('only screen and (max-width: 991px)')

  if (!categories || !categories.hasOwnProperty('sub')) {
    return (
      <Box>
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
        </div>
      </Box>
    )
  }

  const addProduct = isAdmin ? (
    <div className="form-group">
      <Link to="/produkter/ny">
        <button className="btn btn-default btn-block" type="submit">Legg til nytt produkt</button>
      </Link>
    </div>
  ) : null

  const menu = (
    <div className="col-sm-3">
      <Menu />
      {addProduct}
    </div>
  )

  const content = (
    <div className="col-sm-9">
      {children}
    </div>
  )

  return (
    <div>
      <Box>
        <BigHeadline big="Våre produkter og tjenester" small="Velg en kategori"/>
      </Box>

      <div className="row">
        {isSmall ? (
          <div className="col-xs-12">
            {menu}
            {content}
          </div>
        ) : (
          <>
            <Left>{menu}</Left>
            <Right>{content}</Right>
          </>
        )}
      </div>
    </div>
  )
}

ProductsContainer.propTypes = {
  // Props are now handled through route params and loader data
}

export default ProductsContainer
