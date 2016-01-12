import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import PhotoLine from './../photo/PhotoLine.jsx'
import MiniGallery from './../photo/MiniGallery.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import TextBox from './../text/TextBox.jsx'
import MediumHealine from './../text/MediumHeadline.jsx'
import BigHeadline from './../text/BigHeadline.jsx'
import Box from './../Box.jsx'

export default class SubProduct extends Component {

  render() {
    let {product: {name, desc, src, images}} = this.props

    return (
      <div>
        <Box>
          <BigHeadline big={name}/>
          <TextBox>
            <p>{desc}</p>
          </TextBox>
          <hr/>
          <div style={{padding: 10}} />
          <div className="row">
            {src.includes('main.jpg') ? <MiniGallery images={images} />: <PhotoLine images={images} clickable={true}/>}
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
