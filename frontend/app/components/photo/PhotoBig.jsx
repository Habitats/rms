import React from 'react';
import Photo from './Photo.jsx';

export default class PhotoBig extends React.Component {

  render() {
    return (
      <div>
        <div className="col-md-12 no-pad">
          <Photo height="500" src={this.props.src}>
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
  src: React.PropTypes.string.isRequired
};

PhotoBig.defaultProps = {
  description: ''
};
