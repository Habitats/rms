import React from 'react';
import Marty from 'marty';
import ProjectListItem from './ProjectListItem.jsx';

export default class Projects extends React.Component {

  onSave(e) {
    e.preventDefault();
    this.app.projectActionCreators.save({
      id: Math.random(),
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
        <button className="btn btn-default" onClick={this.onSave.bind(this)}>Lagre</button>
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

