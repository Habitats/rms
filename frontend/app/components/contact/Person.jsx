import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Photo from './../photo/Photo.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const PersonContainer = styled.div`
  padding: ${props => 
    props.isSmall 
      ? '10px' 
      : props.isMedium 
        ? '15px' 
        : '20px'
  };
  margin-bottom: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`

const PersonName = styled.div`
  font-size: ${props => 
    props.isSmall 
      ? '1.2em' 
      : props.isMedium 
        ? '1.4em' 
        : '1.6em'
  };
  font-weight: bold;
  margin-bottom: 10px;
`

const PersonInfo = styled.div`
  font-size: ${props => 
    props.isSmall 
      ? '0.9em' 
      : props.isMedium 
        ? '1em' 
        : '1.1em'
  };
  color: #666;
`

const PersonRow = styled.p`
  margin-bottom: 5px;
`

const StyledIcon = styled(({ icon, ...props }) => {
  // Only render the FontAwesomeIcon if an icon is provided
  return icon ? <FontAwesomeIcon icon={icon} {...props} /> : null;
})`
  margin-right: 10px;
  width: 20px;
  color: #007bff;
`

const EmailLink = styled.a`
  color: #666;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
    color: #007bff;
  }
`

const Person = ({ title, phone, photo, name, mail }) => {
  const mailTo = 'mailto:' + mail
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.md})`);

  return (
    <PersonContainer isSmall={isSmall} isMedium={isMedium}>
      <PersonName isSmall={isSmall} isMedium={isMedium}>{name}</PersonName>
      <PersonInfo isSmall={isSmall} isMedium={isMedium}>
        {title && <PersonRow><StyledIcon icon={faUser} />{title}</PersonRow>}
        {phone && <PersonRow><StyledIcon icon={faPhone} />{phone}</PersonRow>}
        {mail && <PersonRow><StyledIcon icon={faEnvelope} /><EmailLink href={mailTo}>{mail}</EmailLink></PersonRow>}
      </PersonInfo>
    </PersonContainer>
  )
}

Person.propTypes = {
  title: PropTypes.string,
  phone: PropTypes.string,
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  mail: PropTypes.string
}

export default Person
