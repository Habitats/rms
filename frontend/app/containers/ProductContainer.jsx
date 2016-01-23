import React, {Component, PropTypes} from 'react'
import Photo from './../components/photo/Photo.jsx'
import Product from './../components/product/Product.jsx'
import {connect} from 'react-redux'
import NotFound from './NotFound.jsx'

export default class ProductContainer extends Component {

  render() {
    let {categories, params} = this.props
    let category = categories.sub.find(c => c.id === params.categoryId)
    let product = category.sub.find(p => p.id === params.productId)

    // targets sub product
    if (params.subId) {
      let subProduct = product.sub ? product.sub.find(p => p.id === params.subId) : null
      if (subProduct) {
        return (
          <Product product={subProduct} category={product.title} linkTo={`produkter/${category.id}/${product.id}/${subProduct.id}`}
                   selected={params.selected}/>
        )
      }
    } else if (product) {
      return (
        <Product product={product} category={category.title} linkTo={`produkter/${category.id}/${product.id}`}
                 selected={params.selected}/>
      )
    } else {
      return <NotFound />
    }
  }
}

ProductContainer.propTypes = {
  categories: PropTypes.object.isRequired,
  params: PropTypes.shape({
    categoryId: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    subId: PropTypes.string,
    selected: PropTypes.number
  })
}

export default connect(state => ({
  categories: state.products
}))(ProductContainer)
