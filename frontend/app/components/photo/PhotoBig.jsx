import React, {Component, PropTypes} from 'react'
import Photo from './Photo.jsx'

export default class PhotoBig extends Component {

  render() {
    let {height, width, src, onClick, description} = this.props
    return (
      <div>
        <div className="col-md-12 no-pad">
          <Photo height={height} width={width} src={src} clickable={!!onClick} size={'med'}>
            <h4>
              <div className="photo-overlay-box hide-overflow">
                {description}
              </div>
            </h4>
          </Photo>
        </div>
      </div>
    )
  }
}

PhotoBig.propTypes = {
  description: PropTypes.string,
  src: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  onClick: PropTypes.func
}

PhotoBig.defaultProps = {
  description: '',
  height: 500,
  width: undefined
}
