import React, {Component, PropTypes} from 'react'
import MiniGallery from './../photo/MiniGallery.jsx'
import {connect} from 'react-redux'
import LoremIpsum from './../LoremIpsum.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import BigHeadline from './../text/BigHeadline.jsx'
import MediumHeadline from './../text/MediumHeadline.jsx'
import Wysiwyg from './../text/Wysiwyg.jsx'
import TextBox from './../text/TextBox.jsx'
import Box from './../Box.jsx'
import * as productActions from '../../redux/actions/productActions'
import ProductItems from './ProductItems.jsx'

export default class Product extends Component {

  render() {
    let {product, category, dispatch, session: {admin}, linkTo} = this.props
    let {title, description, images, sub, id} = product
    let style = {
      desc: {
        paddingTop: 40,
        paddingBottom: 20,
        textAlign: 'justify'
      }
    }

    return (
      <div>
        <Box>
          <MediumHeadline big={title} small={category} to={linkTo.split('/').reverse().splice(1).reverse().join('/')}/>
          <MiniGallery images={images} orientation={'vertical'} height={400}/>
          <div style={style.desc}>
            {admin ?
             <Wysiwyg content={description} onSave={(p) => dispatch(productActions.save({... product, description: p}))}/>
              : <div dangerouslySetInnerHTML={{__html: description}}/> }
          </div>
        </Box>
        {sub && sub.length > 0 ? (
          <Box>
            <div className="row">
              <ProductItems products={product.sub} parentRoute={`${linkTo}`}/>
            </div>
          </Box>
        ) : null}
      </div>
    )
  }
}

Product.defaultProps = {
  selected: 0
}

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    sub: PropTypes.array.isRequired,
  }),
  linkTo: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.shape({admin: PropTypes.bool.isRequired})
}

export default connect(state => ({
  session: state.session
}))(Product)
