import React from 'react'
import Photo from './../photo/Photo.jsx'
import PhotoLine from './../photo/PhotoLine.jsx'
import {connect} from 'react-redux'
import LoremIpsum from './../LoremIpsum.jsx'

export default class Product extends React.Component {

  render() {
    let {product: {name, desc, src, images}, linkTo, selected} = this.props
    let s = selected || images.map(img => img.src).indexOf(src)
    // failsafe if there're no images
    let coverSrc = s != -1 ? images[s].src : src
    return (
      <div>
        <div>
          <Photo src={coverSrc} height={400} size={'med'}>
            <h3>
              <div className="photo-overlay-box hide-overflow">
                {name}
              </div>
            </h3>
          </Photo>
        </div>
        <div className="row">
          <PhotoLine images={images} root={linkTo} selected={s}/>
        </div>
        <div>
          <p>{desc}</p>
          <LoremIpsum />
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  product: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired
  })
}
