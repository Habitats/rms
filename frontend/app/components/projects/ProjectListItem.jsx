import React from 'react'
import PropTypes from 'prop-types'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const ProjectListItem = ({ project: { title, images, id } }) => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    box: {
      marginBottom: isSmall ? 10 : 25,
      height: isSmall ? 220 : 250
    }
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-4" style={style.box}>
      <Photo linkTo={`/referanser/${id}`} src={images[0].src}>
        <HeadlineOverlay text={title}/>
      </Photo>
    </div>
  )
}

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired
    })).isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
}

export default ProjectListItem
