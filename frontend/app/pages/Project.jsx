import React from 'react';
import Marty from 'marty';
import BigHeadline from './../components/text/BigHeadline.jsx';
import PhotoBig from './../components/photo/PhotoBig.jsx';
import PhotoLine from './../components/photo/PhotoLine.jsx';

export default class Project extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box col-md-12">
          <div className="row">
            <BigHeadline small="Prosjekt" big={this.props.project.title}/>
          </div>

          <div className="row">
            <PhotoBig
              src={this.props.project.img[2]}
              description={this.props.project.description}
              details=""/>

          </div>
          <div className="row">
            <BigHeadline small="Flere bilder" big=""/>
            <PhotoLine id="someId" img={this.props.project.img}/>
            <hr/>
          </div>
        </div>
      </div>
    );
  }
}

Project.defaultProps = {
  title: 'Some project',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.'
};

export default Marty.createContainer(Project, {
  listenTo: 'projectStore',
  fetch: {
    project() {
      return this.app.projectStore.getProjects()[this.props.params.id - 1];
    }
  }
});


