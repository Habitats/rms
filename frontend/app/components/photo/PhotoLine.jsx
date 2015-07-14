import React from 'react';

export default class PhotoLine extends React.Component {

  render() {
    let images = this.props.img.map(i =>
        <div
          className="col-sm-3 col-xs-6">
          <a href="#"> <img className="img-responsive portfolio-item" src={i} alt=""/> </a>
        </div>
    );

    return (
      <div>
        {images}
      </div>
    );
  }
}

