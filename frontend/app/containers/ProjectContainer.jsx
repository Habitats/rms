import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import BigHeadline from './../components/text/BigHeadline.jsx'
import PhotoBig from './../components/photo/PhotoBig.jsx'
import PhotoLine from './../components/photo/PhotoLine.jsx'
import Project from './../components/projects/Project.jsx'
import * as generalActionCreators from '../redux/actions/generalActions'

class ProjectContainer extends Component {

  componentWillMount() {
    this.props.dispatch(generalActionCreators.fetchProject(this.props.params.id))
  }

  render() {
    let {project, params} = this.props
    let selected = parseInt(params.selected)
    if (project.fetching) {
      return <div></div>
    } else {
      return (
        <Project project={project} selected={selected || 0}/>
      )
    }
  }
}

ProjectContainer.propTypes = {
  project: PropTypes.object,
  params: PropTypes.shape({
    id: PropTypes.number.isRequired,
    toggled: PropTypes.number.isRequired,
    selected: PropTypes.number
  })
}

export default connect(state => ({
  project: state.general.project
}))(ProjectContainer)