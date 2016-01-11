import React from 'react'
import Photo from './../components/photo/Photo.jsx'
import Product from './../components/product/Product.jsx'
import {connect} from 'react-redux'

export default class ProductContainer extends React.Component {

  render() {
    let {categories, params} = this.props
    let category = categories.find(c => c.short === params.category)
    let product = category.sub.find(p => p.short === params.product)
    return (
      <Product product={product} linkTo={`produkter/${category.short}/${product.short}`} selected={params.selected}/>
    )
  }
}

ProductContainer.propTypes = {
  categories: React.PropTypes.object.isRequired,
  params: React.PropTypes.shape({
    category: React.PropTypes.string.isRequired,
    product: React.PropTypes.string.isRequired
  })
}

export default connect(state => ({
  categories: state.products
}))(ProductContainer)
