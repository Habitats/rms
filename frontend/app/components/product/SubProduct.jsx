import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Photo from './../photo/Photo.jsx'
import PhotoLine from './../photo/PhotoLine.jsx'
import MiniGallery from './../photo/MiniGallery.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import TextBox from './../text/TextBox.jsx'
import MediumHeadline from './../text/MediumHeadline.jsx'
import BigHeadline from './../text/BigHeadline.jsx'
import Wysiwyg from './../text/Wysiwyg.jsx'
import Box from './../Box.jsx'
import * as productActionCreators from '../../redux/actions/productActions'

export default class SubProduct extends Component {

  onSave(p) {
    console.log(p.innerText)
    let updatedProduct = {... this.props.product, desc: p}
    this.props.dispatch(productActionCreators.save(updatedProduct))
  }

  render() {
    let {product: {name, desc, src, images}, session: {admin}} = this.props

    return (
      <div>
        <Box>
          <MediumHeadline big={name}/>
          <div className="row">
            {src.includes('main.jpg') ?
             <MiniGallery images={images} orientation={'vertical'}/> : <PhotoLine images={images} clickable={true}/>}
          </div>
          <div style={{marginBottom: 0,marginTop: 30}}>
            <TextBox>
              <hr />
              {admin ? <Wysiwyg content={desc} onSave={this.onSave.bind(this)}/> : <div dangerouslySetInnerHTML={{__html: desc}}/> }
              <hr />
            </TextBox>
          </div>
        </Box>
      </div>
    )
  }
}

SubProduct.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  })
}

export default connect(state => ({
  session: state.session
}))(SubProduct)
