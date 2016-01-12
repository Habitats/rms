import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Category from './../components/product/Category.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import * as ProductActionCreators from './../redux/actions/productActions'
import Box from './../components/Box.jsx'

export default class CategoryContainer extends Component {

  render() {
    let {categories, params} = this.props
    let category = categories.find(c => c.short === params.category)
    return (
      <div>
        <Box>
          <BigHeadline big={category.name} small="Våre produkter og tjenester"/>
          <Category category={category}/>
        </Box>
      </div>
    )
  }
}

CategoryContainer.propTypes = {
  categories: PropTypes.object.isRequired,
  params: PropTypes.shape({
    categoy: PropTypes.string.isRequired
  })
}

export default connect(state => ({
  categories: state.products
}))(CategoryContainer)
