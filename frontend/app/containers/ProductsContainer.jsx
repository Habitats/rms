import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {replacePath} from 'redux-simple-router'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Menu from './../components/menu/Menu.jsx'
import ProductItems from '../components/product/ProductItems.jsx'
import Left from './../components/Left.jsx'
import Right from './../components/Right.jsx'
import Box from './../components/Box.jsx'
import * as productActionCreators from './../redux/actions/productActions'
import NotFound from './NotFound.jsx'

export default class ProductsContainer extends Component {

  componentWillMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.dispatch(productActionCreators.fetchProducts())
    }
  }

  render() {
    let {categories, params, children} = this.props
    if (!categories.hasOwnProperty('sub')) {
      // not ready yet
      return null
    }

    let content = (!params.categoryId && !params.productId) ?
                  <Box>
                    <BigHeadline big={categories.title}/>
                    <div className="row">
                      <ProductItems products={categories.sub} parentRoute={`/produkter`}/>
                    </div>
                  </Box>
      : children
    if (content) {
      return (
        <div>
          <div className="hidden-xs">
            <Left>
              <Menu categories={categories} active={params.subId || params.productId || params.categoryId} linkTo={'/produkter'}/>
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
    } else {
      return <NotFound />
    }
  }
}

ProductsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element,
  params: PropTypes.shape({
    categoryId: PropTypes.string,
    productId: PropTypes.string
  }),
  categories: PropTypes.object.isRequired
}

export default connect(state => ({
  categories: state.products
}))(ProductsContainer)
