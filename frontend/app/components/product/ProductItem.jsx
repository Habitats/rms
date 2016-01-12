import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import * as ProductActionCreators from  '../../redux/actions/productActions'

export default class ProductItem extends Component {

  render() {
    let {product :{name, desc, src}, linkTo} = this.props
    let style = {
      height: 250,
      marginBottom: 25
    }
    return (
      <div className="col-md-6 col-md-offset-0" style={style}>
        <div className="row">
          <div className="col-md-12">
              <Photo linkTo={linkTo} src={src} height={250} size={'med'}>
                <HeadlineOverlay text={name} />
              </Photo>
          </div>
        </div>
      </div>
    )
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired
  }),
  linkTo: PropTypes.string.isRequired
}
