import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import * as ProductActionCreators from  '../../redux/actions/productActions'
import ProductItem from './ProductItem.jsx'
import Radium from 'radium'
import * as V from '../../vars'

class ProductItems extends Component {

  render() {
    let {products, linkTo, className, height} = this.props
    let style = {
      '@media only screen and (max-width: 767px)': {
        paddingLeft: V.MARGIN_XS
      }
    }
    let rootCategories = products.map(c =>
      <ProductItem key={`${c.id}`} product={c} height={height} className={className} linkTo={`${linkTo}/${c.id}`}/>
    )
    return (
      <div style={style}>
        {rootCategories}
      </div>
    )
  }
}

ProductItems.defaultProps = {
  height: 250,
  className: 'col-md-6 col-sm-12 col-xs-6 col-md-offset-0'
}

ProductItems.propTypes = {
  products: PropTypes.array.isRequired,
  linkTo: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.number
}

export default Radium(ProductItems)
