import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { replacePath } from 'redux-simple-router'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Menu from './../components/menu/Menu.jsx'
import Category from './CategoryContainer.jsx'
import * as productActionCreators from './../redux/actions/productActions'

export default class ProductsContainer extends Component {

  componentWillMount() {
    if (!this.props.params.category) {
      this.props.dispatch(replacePath('/produkter/eksterior'))
    }
    if (this.props.categories.length === 0) {
      this.props.dispatch(productActionCreators.fetchProducts())
    }
  }

  render() {
    let {categories, params, children} = this.props
    if (categories.length === 0) {
      return null
    }

    let category = categories.find(c => c.short === (params.category || 'eksterior'))
    return (
      <div className="container">
        <div className="box affix" style={{width: 190, paddingRight: 0}}>
          <Menu categories={categories} selectedCategory={category.short}/>
        </div>

        <div className="box" style={{marginLeft: 205}}>
          <div className="row">
            <BigHeadline big={category.name} small="Våre produkter og tjenester"/>
          </div>
          <div className="row">
            <div className="col-md-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  params: PropTypes.shape({
    category: PropTypes.string
  }),
  categories: PropTypes.array.isRequired
}

export default connect(state => ({
  categories: state.products
}))(ProductsContainer)
