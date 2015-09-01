import React from 'react';
import Photo from './../photo/Photo.jsx';
import Router from 'react-router';
let Link = Router.Link;

export default class ProjectListItem extends React.Component {

  render() {
    return (
      <div className="col-md-6">

        <Link params={{id: this.props.project.id, selected: 0}} to="referenceItem">
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
