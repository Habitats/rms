import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import * as ProductActionCreators from  '../../redux/actions/productActions'
import Radium from 'radium'

class ProductItem extends Component {

  render() {
    let {product :{title, src}, linkTo, height, className} = this.props
    let style = {
      box: {
        '@media only screen and (max-width: 767px)': {
          marginBottom: 10,
          paddingLeft: 0,
          height: height * 0.8
        },
        '@media only screen and (min-width: 768px)': {
          marginBottom: 25,
          height: height * 0.7
        },
        '@media only screen and (min-width: 992px)': {
          marginBottom: 25,
          height: height
        }
      }
    }
    return (
      <div className={className} style={style.box}>
        <Photo linkTo={linkTo} src={src} size={'med'}>
          <HeadlineOverlay text={title}/>
        </Photo>
      </div>
    )
  }
}

ProductItem.defaultProps = {
  height: 250,
  className: 'col-md-6 col-sm-12 col-xs-6 col-md-offset-0'
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }),
  linkTo: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.number
}

export default Radium(ProductItem)
