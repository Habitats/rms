import React from 'react';
import Photo from './../photo/Photo.jsx';

export default class ProductItem extends React.Component {

  render() {
    let style = {
      height: 350,
      marginBottom: 50
    };
    return (
      <div className="col-md-6 col-md-offset-0" style={style}>
        <div className="row">
          <div className="col-md-12">
            <Photo src={this.props.src} height={250}>
              <h3>
                <div className="photo-overlay-box hide-overflow">
                  {this.props.title}
                </div>
              </h3>
            </Photo>
          </div>
          <div className="col-md-12">
            <p>{this.props.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  src: React.PropTypes.array.isRequied
};





