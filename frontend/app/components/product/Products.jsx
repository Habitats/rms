import React from 'react'
import { connect } from 'react-redux'
import { replacePath } from 'redux-simple-router'
import BigHeadline from './../text/BigHeadline.jsx'
import Menu from './../menu/Menu.jsx'
import Category from './Category.jsx'

export default class Products extends React.Component {

  componentWillMount() {
    if (!this.props.params.category) {
      this.props.dispatch(replacePath('/produkter/eksterior'))
    }
  }

  render() {
    let {categories, params, children} = this.props
    let category = categories.find(c => c.short === (params.category || 'eksterior'))
    return (
      <div className="container">
        <div className="box">
          <div className="col-md-12 col-sm-12">
            <BigHeadline big={category.name} small="Våre produkter og tjenester"/>
          </div>
          <div className="row">
            <div className="col-md-2 col-sm-3 col-xs-4">
              <Menu categories={categories} category={category}/>
            </div>
            <div className="col-md-10 col-sm-9 col-xs-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Products.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  children: React.PropTypes.object.isRequired,
  params: React.PropTypes.shape({
    category: React.PropTypes.string
  }),
  categories: React.PropTypes.array.isRequired
}

export default connect(state => ({
  categories: state.products
}))(Products)
