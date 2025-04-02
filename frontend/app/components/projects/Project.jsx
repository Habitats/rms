import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useOutletContext } from 'react-router-dom'
import styled from 'styled-components'
import BigHeadline from './../text/BigHeadline.jsx'
import MiniGallery from './../photo/MiniGallery.jsx'
import Box from './../Box.jsx'

const Button = styled.button`
  margin-top: 5px;
`

const Project = ({ project, selected = 0 }) => {
  const navigate = useNavigate()
  const { session } = useOutletContext() || {}
  const isAdmin = session?.admin || false

  if (!project) {
    return null
  }

  return (
    <Box>
      <BigHeadline big={project.title} small="Prosjekt"/>
      <div className="row" style={{ 
        width: '100%', 
        maxWidth: '100%', 
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}>
        <div className="col-xs-12" style={{ 
          width: '100%', 
          maxWidth: '100%', 
          overflow: 'hidden',
          padding: 0,
          boxSizing: 'border-box'
        }}>
          <MiniGallery images={project.images} orientation={'horizontal'} height={400} thumbHeight={100}/>
          {isAdmin && (
            <Button 
              className="btn btn-default btn-block" 
              type="submit"
              onClick={() => navigate(`/referanser/endre/${project.id}`)}
            >
              Endre
            </Button>
          )}
          <Button 
            className="btn btn-default btn-block" 
            type="submit"
            onClick={() => navigate("/referanser")}
          >
            Tilbake
          </Button>
        </div>
      </div>
    </Box>
  )
}

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired
  }),
  selected: PropTypes.number
}

Project.defaultProps = {
  selected: 0
}

export default Project
