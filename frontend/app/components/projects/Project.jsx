import React from 'react'
import PropTypes from 'prop-types'
import { useLoaderData, useNavigate } from 'react-router-dom'
import BigHeadline from './../text/BigHeadline.jsx'
import MiniGallery from './../photo/MiniGallery.jsx'
import Box from './../Box.jsx'

const Project = ({ selected }) => {
  const navigate = useNavigate()
  const { project, isAdmin } = useLoaderData()

  return (
    <Box>
      <BigHeadline big={project.title} small="Prosjekt"/>
      <div className="row">
        <div className="col-xs-12">
          <MiniGallery images={project.images} orientation={'horizontal'} height={400} thumbHeight={100}/>
          {isAdmin ? (
            <button 
              style={{marginTop: 5}} 
              className="btn btn-default btn-block" 
              type="submit"
              onClick={() => navigate(`referanser/endre/${project.id}`)}
            >
              Endre
            </button>
          ) : null}
          <button 
            style={{marginTop: 5}} 
            className="btn btn-default btn-block" 
            type="submit"
            onClick={() => navigate("/referanser")}
          >
            Tilbake
          </button>
        </div>
      </div>
    </Box>
  )
}

Project.propTypes = {
  selected: PropTypes.number.isRequired
}

export default Project
