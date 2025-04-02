import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useLoaderData, useNavigate } from 'react-router-dom'
import Project from './../components/projects/Project.jsx'
import NotFound from '../components/NotFound.jsx'

const ProjectContainer = () => {
  const { id, selected } = useParams()
  const project = useLoaderData()
  const navigate = useNavigate()

  console.log('ProjectContainer: Received data:', { project, id, selected })

  // Handle case when project is null (404)
  if (!project) {
    console.log('ProjectContainer: Project not found, showing NotFound component')
    return <NotFound />
  }

  // Check if project has valid structure
  if (!project.id || !project.title || !project.images) {
    console.error('ProjectContainer: Invalid project data:', project)
    return <NotFound />
  }

  console.log('ProjectContainer: Rendering project:', project.title)
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