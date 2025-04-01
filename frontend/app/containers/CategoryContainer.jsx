import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Category from './../components/product/Category.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import * as ProductActionCreators from '../redux/actions/ProductActions'
import Box from './../components/Box.jsx'
import NotFound from '../components/NotFound.jsx'

const CategoryContainer = ({ params }) => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.products)

  useEffect(() => {
    dispatch(ProductActionCreators.fetchProducts())
  }, [dispatch])

  const category = categories.sub.find(c => c.id === params.categoryId)
  
  if (category) {
    return (
      <div>
        <Box>
          <BigHeadline big={category.title} small="Våre produkter og tjenester" to={'/produkter'}/>
          <Category category={category}/>
        </Box>
      </div>
    )
  } else {
    return <NotFound />
  }
}

CategoryContainer.propTypes = {
  params: PropTypes.shape({
    categoryId: PropTypes.string.isRequired,
  })
}

export default CategoryContainer
