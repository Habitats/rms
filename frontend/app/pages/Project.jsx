import React from 'react';
import Marty from 'marty';
import BigHeadline from './../components/text/BigHeadline.jsx';
import PhotoBig from './../components/photo/PhotoBig.jsx';
import PhotoLine from './../components/photo/PhotoLine.jsx';

export default class Project extends React.Component {

  render() {
    let project = this.props.projects[this.props.params.id - 1];
    let selected = this.props.params.selected || 0;
    return (
      <div className="container">
        <div className="box col-md-12">
          <div className="row">
            <BigHeadline small="Prosjekt" big={project.title}/>
          </div>

          <div className="row">
            <PhotoBig
              src={project.img[selected].url}
              description={project.description}
              details=""/>

          </div>
          <div className="row">
            <BigHeadline small="Flere bilder" big=""/>
            <PhotoLine id={project.id} img={project.img} selected={selected}/>
            <hr/>
          </div>
        </div>
      </div>
    );
  }
}

export default Marty.createContainer(Project, {
  listenTo: 'projectStore',
  fetch: {
    projects() {
      return this.app.projectStore.getProjects();
    }
  }
});


