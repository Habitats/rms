import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import PhotoLine from './../photo/PhotoLine.jsx'
import MiniGallery from './../photo/MiniGallery.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import TextBox from './../text/TextBox.jsx'
import MediumHeadline from './../text/MediumHeadline.jsx'
import BigHeadline from './../text/BigHeadline.jsx'
import Box from './../Box.jsx'

export default class SubProduct extends Component {

  render() {
    let {product: {name, desc, src, images}} = this.props

    return (
      <div>
        <Box>
          <MediumHeadline big={name}/>
          <div className="row">
            {src.includes('main.jpg') ? <MiniGallery images={images}/> : <PhotoLine images={images} clickable={true}/>}
          </div>
          <div style={{marginBottom: 0,marginTop: 30}}>
            <TextBox>
              <hr />
              <p>{desc}</p>
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
