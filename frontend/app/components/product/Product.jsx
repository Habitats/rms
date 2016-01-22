import React, {Component, PropTypes} from 'react'
import MiniGallery from './../photo/MiniGallery.jsx'
import {connect} from 'react-redux'
import LoremIpsum from './../LoremIpsum.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import SubProduct from './SubProduct.jsx'
import BigHeadline from './../text/BigHeadline.jsx'
import Wysiwyg from './../text/Wysiwyg.jsx'
import TextBox from './../text/TextBox.jsx'
import Box from './../Box.jsx'
import * as productActions from '../../redux/actions/productActions'

export default class Product extends Component {

  render() {
    let {product, category, dispatch, session: {admin}} = this.props
    let {title, description, images, sub, id} = product

    let subContent = sub.map(p => <SubProduct key={p.id} product={p}/>)
    return (
      <div>
        <Box>
          <BigHeadline big={title} small={category}/>
          <MiniGallery images={images} orientation={'horizontal'} height={400}/>
          <TextBox>
            <div style={{paddingTop: 20, paddingBottom: 20}}>
              <hr />
              {admin ?
               <Wysiwyg content={description} onSave={(p) => dispatch(productActions.save({... product, description: p}))}/>
                : <div dangerouslySetInnerHTML={{__html: description}}/> }
              <hr />
            </div>
          </TextBox>
        </Box>
        {subContent}
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
