import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import * as ProductActionCreators from  '../../redux/actions/productActions'
import ProductItem from './ProductItem.jsx'
import Radium from 'radium'
import * as V from '../../vars'

class ProductItems extends Component {

  render() {
    let {products, parentRoute, className, height} = this.props
    let style = {
      '@media only screen and (max-width: 767px)': {
        paddingLeft: V.MARGIN_XS,
        paddingRigth: V.MARGIN_XS,
      },
      '@media only screen and (min-width: 768px)': {
        paddingLeft: V.MARGIN_XS,
        paddingRigth: V.MARGIN_XS,
      },
      '@media only screen and (min-width: 992px)': {
        paddingLeft: 0,
      }
    }
    let rootCategories = products.map(c =>
      <ProductItem key={`${c.id}`} product={c} height={height} className={className} linkTo={`${parentRoute}/${c.id}`}/>
    )
    return (
      <div style={style}>
        {rootCategories}
      </div>
    )
  }
}

ProductItems.defaultProps = {
  height: 230,
  className: 'col-sm-6 col-xs-12'
}

ProductItems.propTypes = {
  products: PropTypes.array.isRequired,
  parentRoute: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.number
}

export default Radium(ProductItems)
