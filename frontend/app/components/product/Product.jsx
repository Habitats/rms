import React, {Component, PropTypes} from 'react'
import PhotoBig from './../photo/PhotoBig.jsx'
import PhotoLine from './../photo/PhotoLine.jsx'
import {connect} from 'react-redux'
import LoremIpsum from './../LoremIpsum.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import SubProduct from './SubProduct.jsx'
import BigHeadline from './../text/BigHeadline.jsx'
import TextBox from './../text/TextBox.jsx'
import Box from './../Box.jsx'

export default class Product extends Component {

  render() {
    let {product: {name, desc, src, images, sub}, linkTo, selected, category} = this.props
    let s = selected || images.map(img => img.src).indexOf(src)
    // failsafe if there're no images
    let coverSrc = s != -1 ? images[s].src : src

    let subContent = sub.map(p => <SubProduct key={p.short} product={p}/>)
    return (
      <div>
        <Box>
          <BigHeadline big={name} small={category}/>
          <PhotoBig src={coverSrc} height={400} size={'med'}/>
          <div className="row">
            {images.length > 1 ? <PhotoLine images={images} root={linkTo} selected={s}/> : null}
          </div>
          <TextBox>
            <div style={{paddingTop: 20, paddingBottom: 20}}>
              <hr />
            </div>
            <p>{desc}</p>
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
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    sub: PropTypes.array.isRequired,
    src: PropTypes.string.isRequired
  }),
  linkTo: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  selected: PropTypes.number
}
