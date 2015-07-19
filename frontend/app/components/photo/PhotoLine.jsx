import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default class PhotoLine extends React.Component {

  render() {
    let images = this.props.img.map(i =>
        <div className="col-lg-3 col-xs-6">
          <Link params={{id: this.props.id, selected: this.props.img.indexOf(i)}} to="referenceItem">
            <div className={this.getClasses(i)}>
              <img className="img-responsive portfolio-item" src={i} alt=""/>
            </div>
          </Link>
        </div>
    );

    return (
      <div>
        {images}
      </div>
    );
  }

  getClasses(img) {
    return this.props.img[this.props.selected] === img ? 'photo-selected' : 'photo';
  }
}

