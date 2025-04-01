import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Project from './../components/projects/Project.jsx'
import * as generalActionCreators from '../redux/actions/GeneralActions'
import NotFound from '../components/NotFound.jsx'

const ProjectContainer = () => {
  const dispatch = useDispatch()
  const { id, selected } = useParams()
  const project = useSelector(state => state.general.project)

  useEffect(() => {
    dispatch(generalActionCreators.fetchProject(id))
  }, [dispatch, id])

  if (!project) {
    return <NotFound />
  } else if (project.fetching) {
    // not ready yet
    return null
  } else {
    return <Project project={project} selected={parseInt(selected) || 0}/>
  }
}

ProjectContainer.propTypes = {}

export default ProjectContainer