import React from 'react';
import Router from 'react-router';
import Photo from './Photo.jsx';
let Link = Router.Link;

export default class PhotoLine extends React.Component {

  getClasses(img) {
    return this.props.img[this.props.selected] === img ? 'photo photo-selected' : 'photo';
  }

  render() {
    let images = this.props.img.map(i =>
                                      <div className="col-lg-3 col-xs-6">
                                        <Link params={{id: this.props.id, selected: this.props.img.indexOf(i)}} to="referenceItemClick">
                                          <div className={this.getClasses(i)}>
                                            <Photo clickable={false} height={150} src={i.url}/>
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
}

PhotoLine.propTypes = {
  img: React.PropTypes.array.isRequired,
  selected: React.PropTypes.bool.isRequired,
  id: React.PropTypes.string.isRequired
};
