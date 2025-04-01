import React from 'react'
import PropTypes from 'prop-types'
import Product from './../components/product/Product.jsx'
import { useParams, useLoaderData } from 'react-router-dom'
import NotFound from '../components/NotFound.jsx'

const ProductContainer = () => {
  const { categoryId, productId, subId, subSubId, selected } = useParams()
  const productData = useLoaderData()

  if (!productData) {
    return <NotFound />
  }

  // Handle sub-sub product
  if (subSubId && productData.sub) {
    const subProduct = productData.sub.find(p => p.id === subId)
    if (subProduct?.sub) {
      const subSubProduct = subProduct.sub.find(p => p.id === subSubId)
      if (subSubProduct) {
        return (
          <Product 
            product={subSubProduct} 
            category={subProduct.title}
            linkTo={`produkter/${categoryId}/${productId}/${subId}/${subSubId}`}
            selected={parseInt(selected) || 0}
          />
        )
      }
    }
  }

  // Handle sub product
  if (subId && productData.sub) {
    const subProduct = productData.sub.find(p => p.id === subId)
    if (subProduct) {
      return (
        <Product 
          product={subProduct} 
          category={productData.title} 
          linkTo={`produkter/${categoryId}/${productId}/${subId}`}
          selected={parseInt(selected) || 0}
        />
      )
    }
  }

  // Handle main product
  return (
    <Product 
      product={productData} 
      category={productData.category} 
      linkTo={`produkter/${categoryId}/${productId}`}
      selected={parseInt(selected) || 0}
    />
  )
}

ProductContainer.propTypes = {
  // Props are now handled through route params and loader data
}

export default ProductContainer
