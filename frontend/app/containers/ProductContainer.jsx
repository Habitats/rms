import React, {Component, PropTypes} from 'react'
import Photo from './../components/photo/Photo.jsx'
import Product from './../components/product/Product.jsx'
import {connect} from 'react-redux'

export default class ProductContainer extends Component {

  render() {
    let {categories, params} = this.props
    let category = categories.sub.find(c => c.id === params.category)
    let product = category.sub.find(p => p.id === params.product)
    return (
      <Product product={product} category={category.title} linkTo={`produkter/${category.id}/${product.id}`} selected={params.selected}/>
    )
  }
}

ProductContainer.propTypes = {
  categories: PropTypes.object.isRequired,
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    selected: PropTypes.number
  })
}

export default connect(state => ({
  categories: state.products
}))(ProductContainer)
