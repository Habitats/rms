import React from 'react'
import Photo from './Photo.jsx'

export default class PhotoBig extends React.Component {

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
  description: React.PropTypes.string,
  src: React.PropTypes.string.isRequired,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  onClick: React.PropTypes.func
}

PhotoBig.defaultProps = {
  description: '',
  height: 500,
  width: undefined
}
