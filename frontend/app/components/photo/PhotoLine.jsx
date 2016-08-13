import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Photo from './Photo.jsx'

export default class PhotoLine extends Component {

  onSelect(path) {
    this.props.dispatch(browserHistory.push(path))
  }

  render() {
    let {images, root, selected, clickable} = this.props
    let photos = images.map(image =>
      <div className="col-md-3 col-sm-4 col-xs-6" key={image.src}>
        {!clickable ?
         <div className={'photo'}>
           <Photo onClick={this.onSelect.bind(this, '/' + root + '/' + images.indexOf(image))} height={120}
                  src={image.src} size={'low'} selected={images[selected] === image} margin={15}/>
         </div>
          :
         <div className={'photo'}>
           <Photo height={120} src={image.src} size={'low'} margin={15}/>
         </div>
        }
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
  selected: 0,
  clickable: false,
  root: null
}

PhotoLine.propTypes = {
  dispatch: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  root: PropTypes.string,
  selected: PropTypes.number,
  clickable: PropTypes.bool,
}

export default connect()(PhotoLine)
