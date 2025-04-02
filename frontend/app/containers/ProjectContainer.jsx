import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useLoaderData, useNavigate, useNavigation } from 'react-router-dom'
import Project from './../components/projects/Project.jsx'
import NotFound from '../components/NotFound.jsx'
import Box from '../components/Box.jsx'

const ProjectContainer = () => {
  const { id } = useParams()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const project = useLoaderData()

  if (navigation.state === 'loading') {
    return (
      <Box>
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
        </div>
      </Box>
    )
  }

  if (!project) {
    return <NotFound />
  }

  return (
    <Project 
      project={project}
      onEdit={() => navigate(`/referanser/endre/${id}`)}
      onBack={() => navigate('/referanser')}
    />
  )
}

ProjectContainer.propTypes = {}

export default ProjectContainer