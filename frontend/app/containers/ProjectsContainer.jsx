import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Link from './../components/Link.jsx'
import Projects from './../components/projects/Projects.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Box from './../components/Box.jsx'
import * as generalActionCreators from '../redux/actions/GeneralActions'

const ProjectsContainer = () => {
  const dispatch = useDispatch()
  const { projects, session } = useSelector(state => ({
    projects: state.general.projects,
    session: state.session
  }))

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(generalActionCreators.fetchProjects())
    }
  }, [dispatch, projects.length])

  const newButton = session.admin ? (
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

