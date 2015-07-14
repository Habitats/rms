import React from 'react';
import Router from 'react-router';
import ImageLoader from 'react-imageloader';
let Link = Router.Link;

export default class ProjectListItem extends React.Component {

  render() {
    return (
      <div className="col-md-6">

        <h3>
          <Link params={{id: this.props.project.id}} to="referenceItem">
            {this.props.project.title}
            <img className="img-responsive" src={this.props.project.img[0]}/>
          </Link>
        </h3>

        <p>{this.props.project.description}</p>
      </div>
    );
  }
}

