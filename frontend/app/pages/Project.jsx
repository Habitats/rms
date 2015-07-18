import React from 'react';
import Marty from 'marty';
import BigHeadline from './../components/text/BigHeadline.jsx';
import PhotoBig from './../components/photo/PhotoBig.jsx';
import PhotoLine from './../components/photo/PhotoLine.jsx';

export default class Project extends React.Component {

  render() {
    let project = this.props.projects[this.props.params.id - 1];
    return (
      <div className="container">
        <div className="box col-md-12">
          <div className="row">
            <BigHeadline small="Prosjekt" big={project.title}/>
          </div>

          <div className="row">
            <PhotoBig
              src={project.img[2]}
              description={project.description}
              details=""/>

          </div>
          <div className="row">
            <BigHeadline small="Flere bilder" big=""/>
            <PhotoLine id="someId" img={project.img}/>
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


