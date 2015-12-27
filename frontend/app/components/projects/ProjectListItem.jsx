import React from 'react';
import {Link} from 'react-router';
import Photo from './../photo/Photo.jsx';

export default class ProjectListItem extends React.Component {

  render() {
    return (
      <div className="col-md-6">

        <Link to={`/prosjekt/${this.props.project.id}/0`}>
          <Photo clickable={false} height={250} src={this.props.project.img[0].url}>
            <h3>
              <div className="photo-overlay-box hide-overflow">
                {this.props.project.title}
              </div>
            </h3>
          </Photo>
        </Link>
      </div>
    );
  }
}

ProjectListItem.propTypes = {
  project: React.PropTypes.object.isRequired
};
