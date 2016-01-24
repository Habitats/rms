import React, {Component, PropTypes} from 'react'
import ProjectListItem from './ProjectListItem.jsx'

export default class Projects extends Component {

  render() {
    let {projects} = this.props
    let sorted = projects
      .sort((a, b) => new Date(b.modified) - new Date(a.modified))
      .map(p => <ProjectListItem key={p.id} project={p}/>)
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
  projects: PropTypes.array.isRequired
}
