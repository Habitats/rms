import React from 'react';
import Photo from './Photo.jsx';

export default class PhotoBig extends React.Component {

  render() {
    return (
      <div>
        <div className="col-md-12 no-pad">
          <Photo height={this.props.height} width={this.props.width} src={this.props.src} clickable={!!this.props.onClick}>
            <h4>
              <div className="photo-overlay-box hide-overflow">
                {this.props.description}
              </div>
            </h4>
          </Photo>
        </div>
      </div>
    );
  }
}

PhotoBig.propTypes = {
  description: React.PropTypes.string,
  src: React.PropTypes.string.isRequired,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  onClick: React.PropTypes.func
};

PhotoBig.defaultProps = {
  description: '',
  height: 500,
  width: undefined
};
