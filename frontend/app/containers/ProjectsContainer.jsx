import React from 'react'
import PropTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'
import Link from './../components/Link.jsx'
import Projects from './../components/projects/Projects.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Box from './../components/Box.jsx'

const ProjectsContainer = () => {
  const data = useLoaderData()
  const projects = data?.projects || []
  const isAdmin = data?.isAdmin || false

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

ProjectsContainer.propTypes = {}

export default ProjectsContainer

