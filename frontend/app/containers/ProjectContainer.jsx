import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useLoaderData } from 'react-router-dom'
import Project from './../components/projects/Project.jsx'
import NotFound from '../components/NotFound.jsx'

const ProjectContainer = () => {
  const { id, selected } = useParams()
  const project = useLoaderData()

  if (!project) {
    return <NotFound />
  }

  return (
    <Project 
      project={project} 
      selected={parseInt(selected) || 0}
    />
  )
}

ProjectContainer.propTypes = {
  // Props are now handled through route params and loader data
}

export default ProjectContainer