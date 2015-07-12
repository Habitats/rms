import React from 'react';
import ProjectListItem from './ProjectListItem.jsx';

export default class Projects extends React.Component {

  render() {
    let projects = [];
    for (let i = 1; i <= 10; i++) {
      projects.push(
        <ProjectListItem title={'Prosjekt ' + i}
                         description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae."
                         id={i}
                         params={{id: i}}
          />
      );
    }
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Page Heading
              <small>Secondary Text</small>
            </h1>
          </div>
        </div>

        <div className="row">
          {projects}
        </div>

      </div>
    );
  }
}

