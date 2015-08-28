import React from 'react';
import Photo from './../photo/Photo.jsx';

export default class ProductItem extends React.Component {

  render() {
    return (
      <div>
        <div className="col-md-12 col-md-offset-0">
          <div className="row">
            <div className="col-md-4">
              <Photo src="image/not_found.jpg" height={120}/>
            </div>
            <div className="col-md-8">
              <h2>{this.props.title}</h2>
              <p>{this.props.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
ProductItem.defaultProps = {};

ProductItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  src: React.PropTypes.array.isRequied
};





