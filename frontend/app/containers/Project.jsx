import React from 'react';
import { connect } from 'react-redux'
import BigHeadline from './../components/text/BigHeadline.jsx';
import PhotoBig from './../components/photo/PhotoBig.jsx';
import PhotoLine from './../components/photo/PhotoLine.jsx';

export default class Project extends React.Component {

  render() {
    let project = this.props.projects[parseInt(this.props.params.id) - 1];
    let selected = parseInt(this.props.params.selected || 0);
    return (
      <div className="container">
        <div className="box">
          <BigHeadline big={project.title} small="Prosjekt"/>

          <div className="row">
            <div className="col-md-12">
              <PhotoBig description={project.description} src={project.img[selected].url}/>
            </div>
          </div>

          <BigHeadline small="Flere bilder"/>

          <div className="row">
            <PhotoLine id={project.id} img={project.img} selected={selected}/>
            <hr/>
          </div>
        </div>
      </div>
    );
  }
}

Project.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  projects: React.PropTypes.array,
  params: React.PropTypes.object
};

export default connect(state => ({
  projects: state.general.projects
}))(Project)