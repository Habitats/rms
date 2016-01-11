import React from 'react'
import { connect } from 'react-redux'
import BigHeadline from './../text/BigHeadline.jsx'
import PhotoBig from './../photo/PhotoBig.jsx'
import PhotoLine from './../photo/PhotoLine.jsx'
import * as generalActionCreators from '../../redux/actions/generalActions'

export default class Project extends React.Component {

  render() {
    let {project, selected} = this.props
    selected = project.images[selected] ? selected : 0
    return (
      <div className="container">
        <div className="box">
          <BigHeadline big={project.title} small="Prosjekt"/>

          <div className="row">
            <div className="col-md-12">
              <PhotoBig description={project.description} src={project.images[selected].src} />
            </div>
          </div>

          <BigHeadline small="Flere bilder"/>

          <div className="row">
            <PhotoLine root={`prosjekt/${project.id}`} images={project.images} selected={selected}/>
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
