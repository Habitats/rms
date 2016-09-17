import React, {Component, PropTypes} from 'react'
import Product from './../components/product/Product.jsx'
import {connect} from 'react-redux'
import NotFound from './NotFound.jsx'

class ProductContainer extends Component {

  render() {
    const {categories, params} = this.props
    const category = categories.sub.find(c => c.id === params.categoryId)
    const product = category.sub.find(p => p.id === params.productId)

    // targets sub sub product
    if (params.subSubId) {
      const subProduct = product.sub ? product.sub.find(p => p.id === params.subId) : null
      const subSubProduct = subProduct.sub ? subProduct.sub.find(p => p.id === params.subSubId) : null
      if (subSubProduct) {
        return (
          <Product product={subSubProduct} category={subProduct.title} linkTo={`produkter/${category.id}/${product.id}/${subProduct.id}/${subSubProduct.id}`}
                   selected={params.selected}/>
        )
      }
    }
    // targets sub product
    else if (params.subId) {
      const subProduct = product.sub ? product.sub.find(p => p.id === params.subId) : null
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
    subSubId: PropTypes.string,
    selected: PropTypes.number
  })
}

export default connect(state => ({
  categories: state.products
}))(ProductContainer)
