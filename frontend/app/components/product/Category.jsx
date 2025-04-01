import React from 'react'
import PropTypes from 'prop-types'
import ProductItems from './ProductItems.jsx'

const Category = ({ category }) => {
  const { title, id, sub } = category

  return (
    <div className="row">
      <ProductItems products={sub} category={title} parentRoute={`/produkter/${id}`}/>
    </div>
  )
}

Category.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    sub: PropTypes.array.isRequired
  })
}

export default Category
