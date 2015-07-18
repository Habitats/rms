import React from 'react';
import Marty from 'marty';
import ProjectListItem from './ProjectListItem.jsx';

export default class Projects extends React.Component {

  genId() {
    return this.props.projects.length + 1;
  }

  onSave(e) {
    e.preventDefault();
    this.app.projectActionCreators.save({
      id: this.genId(),
      title: 'Yoloswag',
      description: 'Descbitchion',
      img: ['http://www.romerike-markise.no/images/ref_nannestad.vgs_3.jpg',
            'http://www.romerike-markise.no/images/ref_nannestad.vgs_4.jpg']

    });
  }

  render() {
    let projects = [];
    this.props.projects.forEach(p => projects.push(<ProjectListItem project={p}/>));
    return (
      <div>
        <div className="row">
          {projects}
        </div>
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

