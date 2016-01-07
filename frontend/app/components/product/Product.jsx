import React from 'react'
import Photo from './../photo/Photo.jsx'
import {connect} from 'react-redux'

export default class Product extends React.Component {

  render() {
    let {name, desc, src} = this.props.product
    return (
      <div className="col-md-12">
        <div>
          <Photo src={src} height={300}>
            <h3>
              <div className="photo-overlay-box hide-overflow">
                {name}
              </div>
            </h3>
          </Photo>
        </div>
        <div>
          <p>{desc}</p>
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
