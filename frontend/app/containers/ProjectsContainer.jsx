import React from 'react'
import PropTypes from 'prop-types'
import { useLoaderData, useNavigation } from 'react-router-dom'
import Link from './../components/Link.jsx'
import Projects from './../components/projects/Projects.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Box from './../components/Box.jsx'

const ProjectsContainer = () => {
  const data = useLoaderData()
  const navigation = useNavigation()
  const projects = data?.projects || []
  const isAdmin = data?.isAdmin || false
  const isLoading = navigation.state === 'loading'

  if (isLoading) {
    return (
      <Box>
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
        </div>
      </Box>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <Box>
        <BigHeadline big="Referanser"/>
        <div className="text-center">
          <p>Ingen prosjekter funnet</p>
        </div>
        {isAdmin && (
          <div className="form-group">
            <Link to="/referanser/ny">
              <button className="btn btn-default btn-block" type="submit">
                Legg til nytt prosjekt
              </button>
            </Link>
          </div>
        )}
      </Box>
    )
  }

  return (
    <Box>
      <BigHeadline big="Referanser"/>
      <Projects projects={projects}/>
      {isAdmin && (
        <div className="form-group">
          <Link to="/referanser/ny">
            <button className="btn btn-default btn-block" type="submit">
              Legg til nytt prosjekt
            </button>
          </Link>
        </div>
      )}
    </Box>
  )
}

ProjectsContainer.propTypes = {}

export default ProjectsContainer

