import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import Radium from 'radium'

class ProductItem extends Component {

  render() {
    const {product :{title, src}, linkTo, height, className} = this.props
    const style = {
      box: {
        paddingLeft: 0,
        '@media only screen and (max-width: 767px)': {
          marginBottom: 15,
          height: height * 0.8
        },
        '@media only screen and (min-width: 768px)': {
          marginBottom: 15,
          height: height * 0.7
        },
        '@media only screen and (min-width: 992px)': {
          marginBottom: 30,
          paddingLeft: 15,
          height: height
        }
      }
    }
    return (
      <div className={`product-item ${className}`} style={style.box}>
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
