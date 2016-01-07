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
      <Product product={product}/>
    )
  }
}

ProductContainer.propTypes = {
  categories: React.PropTypes.object.isRequired
}

export default connect(state => ({
  categories: state.products
}))(ProductContainer)
