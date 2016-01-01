import React from 'react'
import { connect } from 'react-redux'
import ProjectListItem from './ProjectListItem.jsx'
import * as generalActionCreators from '../../redux/actions/GeneralActionCreators'

export default class Projects extends React.Component {

  componentDidMount() {
    this.props.dispatch(generalActionCreators.fetchProjects())
  }

  render() {
    let projects = []
    this.props.projects.sort((a, b) => new Date(b.created) - new Date(a.created)).forEach(p => projects.push(<ProjectListItem project={p}/>))
    return (
      <div>
        <div className="row">
          {projects}
        </div>
      </div>
    )
  }
}

Projects.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  projects: React.PropTypes.array.isRequired
}

export default connect(state => ({
  projects: state.general.projects
}))(Projects)
