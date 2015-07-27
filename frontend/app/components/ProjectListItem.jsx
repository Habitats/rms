import React from 'react';
import Router from 'react-router';
import Photo from './photo/Photo.jsx';
let Link = Router.Link;

export default class ProjectListItem extends React.Component {

  render() {
    return (
      <div className="col-md-6">

        <Link params={{id: this.props.project.id, selected: 0}} to="referenceItem">
          <Photo src={this.props.project.img[0].url} height={250} clickable={false}>
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

