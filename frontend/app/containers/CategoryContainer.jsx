import React from 'react'
import PropTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'
import Category from './../components/product/Category.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Box from './../components/Box.jsx'
import NotFound from '../components/NotFound.jsx'

const CategoryContainer = () => {
  const category = useLoaderData()
  
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

CategoryContainer.propTypes = {}

export default CategoryContainer
