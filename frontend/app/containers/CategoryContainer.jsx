import React from 'react'
import { connect } from 'react-redux'
import Category from './../components/product/Category.jsx'
import * as ProductActionCreators from './../redux/actions/ProductActionCreators'

export default class CategoryContainer extends React.Component {

  render() {
    let {categories, params} = this.props
    let category = categories.find(c => c.short === params.category)
    return (
      <Category category={category}/>
    )
  }
}

CategoryContainer.propTypes = {
  categories: React.PropTypes.object.isRequired
}

export default connect(state => ({
  categories: state.products
}))(CategoryContainer)