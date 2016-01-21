import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {replacePath} from 'redux-simple-router'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Menu from './../components/menu/Menu.jsx'
import ProductItem from '../components/product/ProductItem.jsx'
import Left from './../components/Left.jsx'
import Right from './../components/Right.jsx'
import Box from './../components/Box.jsx'
import * as productActionCreators from './../redux/actions/productActions'

export default class ProductsContainer extends Component {

  componentWillMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.dispatch(productActionCreators.fetchProducts())
    }
  }

  render() {
    let {categories, params, children} = this.props
    if (!categories.hasOwnProperty('sub')) {
      return null
    }

    let rootCategories = categories.sub.map(c => <ProductItem key={`${c.id}`} product={c}
                                                              linkTo={`/produkter/${c.id}`}/>)
    let content = (!params.category && !params.product) ?
                  <Box>
                    <BigHeadline big={categories.title}/>
                    <div className="row">
                      {rootCategories}
                    </div>
                  </Box>
      : children
    return (
      <div>
        <div className="hidden-xs">
          <Left>
            <Menu categories={categories} active={{category: params.category, product: params.product}} linkTo={'/produkter'}/>
          </Left>

          <Right>
            {content}
          </Right>
        </div>
        <div className="visible-xs">
          {content}
        </div>
      </div>
    )
  }
}

ProductsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  params: PropTypes.shape({
    category: PropTypes.string,
    product: PropTypes.string
  }),
  categories: PropTypes.object.isRequired
}

export default connect(state => ({
  categories: state.products
}))(ProductsContainer)
