import React from 'react'
import { connect } from 'react-redux'
import PhotoBig from './../photo/PhotoBig.jsx'
import ProductItem from './ProductItem.jsx'

export default class Category extends React.Component {

  render() {
    let category = this.props.categories.find(c => c.short === this.props.params.category)
    let products = category.sub.map(p => <ProductItem title={p.name} description={p.desc} src="/image/p_automatikk.png"/>)
    return (
      <div className="row">
        {products}
      </div>
    )
  }
}

Category.propTypes = {
  category: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    short: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    sub: React.PropTypes.array.isRequired
  })
}

export default connect(state => ({
  categories: state.products
}))(Category)
