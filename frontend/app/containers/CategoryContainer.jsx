import React from 'react'
import PropTypes from 'prop-types'
import { useLoaderData, useParams } from 'react-router-dom'
import Category from './../components/product/Category.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Box from './../components/Box.jsx'
import NotFound from '../components/NotFound.jsx'

const CategoryContainer = () => {
  const { products } = useLoaderData()
  const { categoryId } = useParams()
  
  // Find the category in the products.sub array
  const category = products.sub.find(c => c.id === categoryId)
  
  if (!category) {
    return <NotFound />
  }

  return (
    <div>
      <Box>
        <BigHeadline big={category.title} small="Våre produkter og tjenester" to={'/produkter'}/>
        <Category category={category}/>
      </Box>
    </div>
  )
}

CategoryContainer.propTypes = {
  // Props are now handled through route params and loader data
}

export default CategoryContainer
