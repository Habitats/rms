import React from 'react'
import { connect } from 'react-redux'
import BigHeadline from './../components/text/BigHeadline.jsx'
import PhotoBig from './../components/photo/PhotoBig.jsx'
import PhotoLine from './../components/photo/PhotoLine.jsx'
import Project from './../components/projects/Project.jsx'
import * as generalActionCreators from '../redux/actions/generalActions'

class ProjectContainer extends React.Component {

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
  project: React.PropTypes.object,
  params: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    selected: React.PropTypes.number.isRequired
  })
}

export default connect(state => ({
  project: state.general.project
}))(ProjectContainer)