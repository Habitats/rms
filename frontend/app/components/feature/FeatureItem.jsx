import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import useMediaQuery from '../../hooks/useMediaQuery'

const iconMap = {
  faGears,
  faHeart,
  faStar
}

const FeatureContainer = styled.div`
  padding: ${props => 
    props.isSmall 
      ? '15px' 
      : props.isMedium 
        ? '20px' 
        : '25px'
  };
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`

const FeatureIcon = styled(FontAwesomeIcon)`
  font-size: ${props => 
    props.isSmall 
      ? '2em' 
      : props.isMedium 
        ? '2.5em' 
        : '3em'
  };
  color: #007bff;
  margin-bottom: 15px;
`

const FeatureTitle = styled.h3`
  font-size: ${props => 
    props.isSmall 
      ? '1.2em' 
      : props.isMedium 
        ? '1.4em' 
        : '1.6em'
  };
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`

const FeatureDescription = styled.p`
  font-size: ${props => 
    props.isSmall 
      ? '0.9em' 
      : props.isMedium 
        ? '1em' 
        : '1.1em'
  };
  color: #666;
  line-height: 1.6;
`

const FeatureItem = ({ icon, title, description }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (min-width: ${theme.breakpoints.sm}) and (max-width: ${theme.breakpoints.md})`);

  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <FeatureContainer isSmall={isSmall} isMedium={isMedium}>
        <FeatureIcon icon={iconMap[icon]} isSmall={isSmall} isMedium={isMedium} />
        <FeatureTitle isSmall={isSmall} isMedium={isMedium}>{title}</FeatureTitle>
        <FeatureDescription isSmall={isSmall} isMedium={isMedium}>{description}</FeatureDescription>
      </FeatureContainer>
    </div>
  )
}

FeatureItem.propTypes = {
  icon: PropTypes.oneOf(['faGears', 'faHeart', 'faStar']).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default FeatureItem
