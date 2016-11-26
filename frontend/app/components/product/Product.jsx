import React, {Component, PropTypes} from 'react'
import MiniGallery from './../photo/MiniGallery.jsx'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import MediumHeadline from './../text/MediumHeadline.jsx'
import Wysiwyg from './../text/Wysiwyg.jsx'
import Box from './../Box.jsx'
import * as ProductActions from '../../redux/actions/ProductActions'
import ProductItems from './ProductItems.jsx'
import ContactForm from '../contact/ContactForm.jsx'
import {CONTENT_MAX_WIDTH} from '../../vars'

class Product extends Component {

  render() {
    const {product, category, dispatch, session: {admin}, linkTo} = this.props
    const {title, description, images, sub, id} = product
    const style = {
      desc: {
        paddingBottom: 50,
        textAlign: 'justify',
        maxWidth: CONTENT_MAX_WIDTH,
        margin: '0 auto'
      },
      gallery: {
        paddingBottom: 30,
      },
      contact: {
        maxWidth: CONTENT_MAX_WIDTH,
        margin: '0 auto',
        paddingBottom: 30,
        paddingLeft: 15,
        paddingRight: 15
      }
    }
    const linkToParent = linkTo.split('/').reverse().splice(1).reverse().join('/')
    const headline = <MediumHeadline big={title} small={category} to={linkToParent}/>
    const gal = <div style={style.gallery}><MiniGallery images={images} orientation={'vertical'} height={350} style={style.gallery}/></div>
    const desc = (
      <div style={style.desc}>
        {admin ?
         <Wysiwyg content={description} onSave={(p) => dispatch(ProductActions.save({... product, description: p}))}/>
          :
         <div dangerouslySetInnerHTML={{__html: description}}/>}
        {admin ? <button style={{marginTop: 5}} className="btn btn-default btn-block" type="submit"
                         onClick={() => browserHistory.push(`produkter/endre/${id}`)}>
          Admin </button> : null}
        <button style={{marginTop: 5}} className="btn btn-default btn-block" type="submit"
                onClick={() => browserHistory.push(linkToParent)}>Tilbake
        </button>
      </div>
    )
    const subCategories = sub && sub.length > 0 ? (
      <div className="row">
        <ProductItems products={product.sub} parentRoute={`/${linkTo}`}/>
      </div>
    ) : null

    const contact = sub.length === 0 ? (
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

