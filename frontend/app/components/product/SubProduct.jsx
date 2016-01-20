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
import * as productActions from '../../redux/actions/productActions'

export default class SubProduct extends Component {

  render() {
    let {session: {admin}, dispatch, product} = this.props
    let {title, description, src, images} = product

    return (
      <div>
        <Box>
          <MediumHeadline big={title}/>
          <div className="row">
            {src.includes('main.jpg') ?
             <MiniGallery images={images} orientation={'vertical'}/> : <PhotoLine images={images} clickable={true}/>}
          </div>
          <div style={{marginBottom: 0,marginTop: 30}}>
            <TextBox>
              <hr />
              {admin ?
               <Wysiwyg content={description} onSave={(p) => dispatch(productActions.save({... product, description: p}))}/>
                : <div dangerouslySetInnerHTML={{__html: description}}/> }
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }),
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.shape({admin: PropTypes.bool.isRequired})
}

export default connect(state => ({
  session: state.session
}))(SubProduct)
