import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import PhotoLine from './../photo/PhotoLine.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import TextBox from './../text/TextBox.jsx'
import BigHealine from './../text/BigHeadline.jsx'

export default class SubProduct extends Component {

  render() {
    let {product: {name, desc, src, images}} = this.props
    return (
      <div>
        <div style={{marginTop: 40}}/>
        <BigHealine big={name}/>
        <p>{desc}</p>
        <div className="row">
          <PhotoLine images={images} clickable={true}/>
        </div>
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
