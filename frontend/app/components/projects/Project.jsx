import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import BigHeadline from './../text/BigHeadline.jsx'
import PhotoBig from './../photo/PhotoBig.jsx'
import PhotoLine from './../photo/PhotoLine.jsx'
import MiniGallery from './../photo/MiniGallery.jsx'
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
          <div className="col-md-12 col-sm-12 col-xs-12">
            <MiniGallery images={project.images} orientation={'horizontal'} height={400} thumbHeight={100}/>
          </div>
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
