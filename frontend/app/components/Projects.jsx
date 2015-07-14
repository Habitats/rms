import React from 'react';
import Marty from 'marty';
import ProjectListItem from './ProjectListItem.jsx';

export default class Projects extends React.Component {

  render() {
    let projects = [];
    this.props.projects.forEach(p => projects.push(<ProjectListItem project={p}/>));
    return (
      <div className="row">
        {projects}
      </div>
    );
  }
}

export default Marty.createContainer(Projects, {
  listenTo: 'projectStore',
  fetch: {
    projects() {
      return this.app.projectStore.getProjects();
    }
  }
});

