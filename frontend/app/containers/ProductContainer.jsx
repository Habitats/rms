import React from 'react'
import PropTypes from 'prop-types'
import Product from './../components/product/Product.jsx'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NotFound from '../components/NotFound.jsx'

const ProductContainer = () => {
  const categories = useSelector(state => state.products)
  const { categoryId, productId, subId, subSubId, selected } = useParams()

  const category = categories.sub.find(c => c.id === categoryId)
  const product = category.sub.find(p => p.id === productId)

  // targets sub sub product
  if (subSubId) {
    const subProduct = product.sub ? product.sub.find(p => p.id === subId) : null
    const subSubProduct = subProduct.sub ? subProduct.sub.find(p => p.id === subSubId) : null
    if (subSubProduct) {
      return (
        <Product 
          product={subSubProduct} 
          category={subProduct.title}
          linkTo={`produkter/${categoryId}/${productId}/${subId}/${subSubId}`}
          selected={selected}
        />
      )
    }
  }
  // targets sub product
  else if (subId) {
    const subProduct = product.sub ? product.sub.find(p => p.id === subId) : null
    if (subProduct) {
      return (
        <Product 
          product={subProduct} 
          category={product.title} 
          linkTo={`produkter/${categoryId}/${productId}/${subId}`}
          selected={selected}
        />
      )
    }
  } else if (product) {
    return (
      <Product 
        product={product} 
        category={category.title} 
        linkTo={`produkter/${categoryId}/${productId}`}
        selected={selected}
      />
    )
  } else {
    return <NotFound />
  }
}

ProductContainer.propTypes = {}

export default ProductContainer
