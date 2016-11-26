import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Category from './../components/product/Category.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import * as ProductActionCreators from '../redux/actions/ProductActions'
import Box from './../components/Box.jsx'
import NotFound from './NotFound.jsx'

class CategoryContainer extends Component {

  componentWillMount() {
    this.props.dispatch(ProductActionCreators.fetchProducts())
  }

  render() {
    const {categories, params} = this.props
    const category = categories.sub.find(c => c.id === params.categoryId)
    if (category) {
      return (
        <div>
          <Box>
            <BigHeadline big={category.title} small="Våre produkter og tjenester" to={'/produkter'}/>
            <Category category={category}/>
          </Box>
        </div>
      )
    } else {
      return <NotFound />
    }
  }
}

CategoryContainer.propTypes = {
  categories: PropTypes.object.isRequired,
  params: PropTypes.shape({
    categoryId: PropTypes.string.isRequired,
  }),
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  categories: state.products
}))(CategoryContainer)
