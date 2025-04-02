import React from 'react'
import PropTypes from 'prop-types'
import BigHeadline from './../text/BigHeadline.jsx'
import MiniGallery from './../photo/MiniGallery.jsx'
import Box from './../Box.jsx'

const Project = ({ project, isAdmin, onEdit, onBack }) => {
  return (
    <Box>
      <BigHeadline big={project.title} small="Prosjekt"/>
      <div className="row">
        <div className="col-xs-12">
          <MiniGallery 
            images={project.images} 
            orientation={'horizontal'} 
            height={400} 
            thumbHeight={100}
          />
          {isAdmin && (
            <button 
              style={{marginTop: 5}} 
              className="btn btn-default btn-block" 
              type="submit"
              onClick={onEdit}
            >
              Endre
            </button>
          )}
          <button 
            style={{marginTop: 5}} 
            className="btn btn-default btn-block" 
            type="submit"
            onClick={onBack}
          >
            Tilbake
          </button>
        </div>
      </div>
    </Box>
  )
}

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  isAdmin: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
}

Project.defaultProps = {
  isAdmin: false
}

export default Project
