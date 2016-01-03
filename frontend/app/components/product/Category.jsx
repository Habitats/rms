import React from 'react'
import { connect } from 'react-redux'
import PhotoBig from './../photo/PhotoBig.jsx'
import ProductItem from './ProductItem.jsx'

export default class Category extends React.Component {

  render() {
    let {params, categories} = this.props
    let category = categories.find(c => c.short === params.category)
    let products = category.sub.map(p => <ProductItem title={p.name} description={p.desc} src="/image/p_automatikk.png"/>)
    return (
      <div className="row">
        {products}
      </div>
    )
  }
}

Category.propTypes = {
  params: React.PropTypes.shape({category: React.PropTypes.string.isRequired}),
  categories: React.PropTypes.object.isRequired
}

export default connect(state => ({
  categories: state.products
}))(Category)
