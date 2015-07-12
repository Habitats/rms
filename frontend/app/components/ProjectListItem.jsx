import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default class ProjectListItem extends React.Component {

  render() {
    return (
      <div className="col-md-6">
        <a href="#"><img className="img-responsive" src="http://placehold.it/700x400" alt=""/>
        </a>

        <h3>
          <Link params={{id: this.props.id, index: '1'}} to="projectItem">{this.props.title}</Link>
        </h3>

        <p>{this.props.description}</p>
      </div>
    );
  }
}

