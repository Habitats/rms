import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import * as ProductActionCreators from  '../../redux/actions/productActions'

export default class ProductItem extends Component {

  render() {
    let {product :{name, src}, linkTo, height, className} = this.props
    let style = {
      height: height,
      marginBottom: 25
    }
    return (
      <div className={className} style={style}>
        <div className="row">
          <div className="col-md-12">
              <Photo linkTo={linkTo} src={src} height={height} size={'med'}>
                <HeadlineOverlay text={name} />
              </Photo>
          </div>
        </div>
      </div>
    )
  }
}

ProductItem.defaultProps = {
  height: 250,
  className: 'col-md-6 col-md-offset-0'
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired
  }),
  linkTo: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.number
}
