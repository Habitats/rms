import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const ProjectListItem = ({ project }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')
  const isMedium = useMediaQuery('only screen and (min-width: 768px) and (max-width: 991px)')

  const style = {
    box: {
      marginBottom: isSmall ? 10 : 25,
      height: isSmall ? 220 : 250
    }
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-4" style={style.box}>
      <Link to={`/referanser/${project.id}`}>
        <Photo src={project.images[0]?.src}>
          <HeadlineOverlay text={project.title}/>
        </Photo>
      </Link>
    </div>
  )
}

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
}

export default ProjectListItem
