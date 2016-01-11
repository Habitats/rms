import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {pushPath} from 'redux-simple-router'
import {connect} from 'react-redux'
import Photo from './Photo.jsx'

export default class PhotoLine extends Component {

  onSelect(path) {
    this.props.dispatch(pushPath(path))
  }

  getClasses(images, image, selected) {
    return images[selected] === image ? 'photo photo-selected' : 'photo'
  }

  render() {
    let {images, root, selected} = this.props
    let photos = images.map(image =>
      <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
        <div onClick={this.onSelect.bind(this, '/' + root + '/' + images.indexOf(image))}>
          <div className={this.getClasses(images, image, selected)}>
            <Photo clickable={false} height={120} src={image.src} size={'low'}/>
          </div>
        </div>
      </div>
    )

    return (
      <div>
        {photos}
      </div>
    )
  }
}

PhotoLine.defaultProps = {
  selected: 0
}

PhotoLine.propTypes = {
  images: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
}

export default connect()(PhotoLine)
