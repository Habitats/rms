import React from 'react'
import { connect } from 'react-redux'
import ProjectListItem from './ProjectListItem.jsx'

export default class Projects extends React.Component {

  render() {
    let {projects} = this.props
    let sorted = projects
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .map(p => <ProjectListItem project={p}/>)
    return (
      <div>
        <div className="row">
          {sorted}
        </div>
      </div>
    )
  }
}

Projects.propTypes = {
  projects: React.PropTypes.array.isRequired
}
