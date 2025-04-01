import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useOutletContext } from 'react-router-dom'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Menu from './../components/menu/Menu.jsx'
import ProductItems from '../components/product/ProductItems.jsx'
import Left from './../components/Left.jsx'
import Right from './../components/Right.jsx'
import Box from './../components/Box.jsx'
import * as ProductActionCreators from '../redux/actions/ProductActions'
import NotFound from '../components/NotFound.jsx'
import Link from '../components/Link.jsx'

const ProductsContainer = () => {
  const dispatch = useDispatch()
  const { categories, session } = useSelector(state => ({
    categories: state.products,
    session: state.session
  }))
  
  const { categoryId, productId } = useParams()
  const children = useOutletContext()
  
  const [isSmall, setIsSmall] = useState(false)
  const [isMedium, setIsMedium] = useState(false)
  const [mql] = useState(() => window.matchMedia('only screen and (max-width: 767px)'))
  const [mqlm] = useState(() => window.matchMedia('only screen and (max-width: 991px)'))

  useEffect(() => {
    if (!categories || Object.keys(categories).length === 0) {
      dispatch(ProductActionCreators.fetchProducts())
    }

    const handleMediaChange = () => {
      setIsSmall(mql.matches)
      setIsMedium(mqlm.matches)
    }
    
    mql.addListener(handleMediaChange)
    mqlm.addListener(handleMediaChange)
    handleMediaChange()

    return () => {
      mql.removeListener(handleMediaChange)
      mqlm.removeListener(handleMediaChange)
    }
  }, [categories, dispatch, mql, mqlm])

  if (!categories || !categories.hasOwnProperty('sub')) {
    return null
  }

  const addProduct = session.admin ? (
    <div className="form-group">
      <Link to="/produkter/ny">
        <button className="btn btn-default btn-block" type="submit">Legg til nytt produkt</button>
      </Link>
    </div>
  ) : null

  const catBig = (
    <ProductItems 
      products={categories.sub.slice(0, isMedium ? 1 : 2)} 
      height={isSmall ? 200 : isMedium ? 320 : 270}
      className="col-md-6 col-sm-12 col-xs-12" 
      parentRoute="/produkter"
    />
  )

  const catSmall = (
    <ProductItems 
      products={categories.sub.slice(isMedium ? 1 : 2, 5)} 
      height={isSmall ? 200 : isMedium ? 230 : 170}
      className="col-md-4 col-sm-6 col-xs-12" 
      parentRoute="/produkter"
    />
  )

  const content = (!categoryId && !productId) ? (
    <Box>
      <BigHeadline big={categories.title}/>
      <div className="row">
        {catBig}
        {catSmall}
      </div>
      {addProduct}
    </Box>
  ) : children

  if (content) {
    return (
      <div>
        <div className="hidden-xs">
          <Left>
            <Menu 
              categories={categories} 
              active={categoryId || productId} 
              linkTo="/produkter"
            />
          </Left>
          <Right>
            {content}
          </Right>
        </div>
        <div className="visible-xs">
          {content}
        </div>
      </div>
    )
  }

  return <NotFound />
}

ProductsContainer.propTypes = {
  children: PropTypes.element,
  categories: PropTypes.object.isRequired
}

export default ProductsContainer
