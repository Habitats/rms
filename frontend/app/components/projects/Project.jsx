import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import BigHeadline from './../text/BigHeadline.jsx'
import PhotoBig from './../photo/PhotoBig.jsx'
import PhotoLine from './../photo/PhotoLine.jsx'
import Box from './../Box.jsx'
import * as generalActionCreators from '../../redux/actions/generalActions'

export default class Project extends Component {

  render() {
    let {project, selected} = this.props
    selected = project.images[selected] ? selected : 0
    return (
      <Box>
        <BigHeadline big={project.title} small="Prosjekt"/>

        <div className="row">
          <div className="col-md-12">
            <PhotoBig description={project.description} src={project.images[selected].src}/>
          </div>
        </div>

        <div className="row">
          <PhotoLine root={`prosjekt/${project.id}`} images={project.images} selected={selected}/>
        </div>
      </Box>
    )
  }
}

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired
  }),
  selected: PropTypes.number.isRequired
}
