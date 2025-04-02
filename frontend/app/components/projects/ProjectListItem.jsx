import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import Photo from './../photo/Photo.jsx'
import HeadlineOverlay from './../text/HeadlineOverlay.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const ProjectItemContainer = styled.div`
  margin-bottom: ${props => props.isSmall ? '10px' : '25px'};
  height: ${props => props.isSmall ? '220px' : '250px'};
`

const ProjectListItem = ({ project: { title, images, id } }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.sm})`);

  return (
    <ProjectItemContainer 
      className="col-xs-12 col-sm-6 col-md-4"
      isSmall={isSmall}
    >
      <Photo linkTo={`/referanser/${id}`} src={images[0].src}>
        <HeadlineOverlay text={title}/>
      </Photo>
    </ProjectItemContainer>
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
