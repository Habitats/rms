import React from 'react'
import PropTypes from 'prop-types'
import { useLoaderData, Link } from 'react-router-dom'
import Projects from './../components/projects/Projects.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Box from './../components/Box.jsx'

const ProjectsContainer = () => {
  const { projects = [], isAdmin = false } = useLoaderData() || {}

  if (!projects || projects.length === 0) {
    return (
      <Box>
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
        </div>
      </Box>
    )
  }

  const newButton = isAdmin ? (
    <div className="form-group">
      <Link to="/referanser/ny">
        <button className="btn btn-default btn-block" type="submit">Legg til nytt prosjekt</button>
      </Link>
    </div>
  ) : null

  return (
    <Box>
      <BigHeadline big="Referanser"/>
      <Projects projects={projects}/>
      {newButton}
    </Box>
  )
}

ProjectsContainer.propTypes = {
  // Props now come from loader
}

export default ProjectsContainer

