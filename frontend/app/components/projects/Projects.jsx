import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ProjectListItem from './ProjectListItem.jsx'

export default class Projects extends Component {

  render() {
    const {projects} = this.props
    const sorted = projects
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
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired
}
