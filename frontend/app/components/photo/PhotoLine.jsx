import React from 'react';
import {Link} from 'react-router';
import Photo from './Photo.jsx';

export default class PhotoLine extends React.Component {

  getClasses(img) {
    return this.props.img[this.props.selected] === img ? 'photo photo-selected' : 'photo';
  }

  render() {
    let images = this.props.img.map(i =>
      <div className="col-lg-3 col-xs-4 col-sm-3">
        <Link to={`/prosjekt/${this.props.id}/${this.props.img.indexOf(i)}`}>
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
  selected: React.PropTypes.number.isRequired,
  id: React.PropTypes.string.isRequired
};
