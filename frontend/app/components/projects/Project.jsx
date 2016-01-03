import React from 'react'
import { connect } from 'react-redux'
import BigHeadline from './../text/BigHeadline.jsx'
import PhotoBig from './../photo/PhotoBig.jsx'
import PhotoLine from './../photo/PhotoLine.jsx'
import * as generalActionCreators from '../../redux/actions/GeneralActionCreators'

export default class Project extends React.Component {

  render() {
    let {project, selected} = this.props
    selected = project.img[selected] ? selected : 0
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
          </div>
        </div>
      </div>
    )
  }
}

Project.propTypes = {
  project: React.PropTypes.object,
  selected: React.PropTypes.number.isRequired
}
