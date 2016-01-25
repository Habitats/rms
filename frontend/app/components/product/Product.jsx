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
import ContactForm from '../contact/ContactForm.jsx'

export default class Product extends Component {

  render() {
    let {product, category, dispatch, session: {admin}, linkTo} = this.props
    let {title, description, images, sub, id} = product
    let style = {
      desc: {
        paddingBottom: 20,
        textAlign: 'justify',
        maxWidth: 465,
        margin: '0 auto'
      },
      gallery: {
        paddingBottom: 40,
      },
      contact: {
        maxWidth: 465,
        margin: '0 auto',
        paddingBottom: 30,
        paddingLeft: 15,
        paddingRight: 15
      }
    }

    let headline = <MediumHeadline big={title} small={category} to={linkTo.split('/').reverse().splice(1).reverse().join('/')}/>
    let gal = <div style={style.gallery}><MiniGallery images={images} orientation={'vertical'} height={400} style={style.gallery}/></div>
    let desc = (
      <div style={style.desc}>
        {admin ?
         <Wysiwyg content={description} onSave={(p) => dispatch(productActions.save({... product, description: p}))}/>
          :
         <div dangerouslySetInnerHTML={{__html: description}}/>}
      </div>
    )
    let subCategories = sub && sub.length > 0 ? (
      <div className="row">
        <ProductItems products={product.sub} parentRoute={`${linkTo}`}/>
      </div>
    ) : null

    let contact = sub.length === 0 ? (
      <Box>
        <MediumHeadline big={'Interessert?'}/>
        <div className="col-xs-12">
          <div className="row">
            <div style={style.contact}>
              <ContactForm subject={title}/>
            </div>
          </div>
        </div>
      </Box>
    ) : null
    return (
      <div>
        {images.length > 0 ?
         <div>
           <Box>
             {headline}
             {gal}
             {desc}
           </Box>
           {sub.length > 0 ?
            <Box>{
              subCategories}
            </Box> : null}
         </div>
          :
         <Box>
           {headline}
           {desc}
           {subCategories}
         </Box>}
        {contact}
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
