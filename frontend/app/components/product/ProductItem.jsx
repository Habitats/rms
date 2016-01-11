import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {pushPath} from 'redux-simple-router'
import Photo from './../photo/Photo.jsx'
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
            <Link to={linkTo}>
              <Photo clickable={false} src={src} height={250} size={'med'}>
                <h3>
                  <div className="photo-overlay-box hide-overflow">
                    {name}
                  </div>
                </h3>
              </Photo>
            </Link>
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
