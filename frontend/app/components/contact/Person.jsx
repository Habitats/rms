import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Photo from './../photo/Photo.jsx'
import useMediaQuery from '../../hooks/useMediaQuery'

const Person = ({ title, phone, photo, name, mail }) => {
  const mailTo = 'mailto:' + mail
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    box: {
      margin: '0 auto',
      height: isSmall ? 150 : 170,
      maxWidth: isSmall ? 320 : isMedium ? 350 : 410,
      paddingLeft: isSmall ? 0 : isMedium ? 30 : 50
    },
    photo: {
      height: isSmall ? 90 : isMedium ? 90 : 110,
      width: isSmall ? 90 : isMedium ? 90 : 110,
      marginTop: 23,
      float: 'left',
      marginRight: 15
    },
    text: {
      maxWidth: isSmall ? 210 : isMedium ? 210 : 240,
      float: 'left',
      margin: '0 auto'
    },
    container: {
      padding: isSmall ? 10 : isMedium ? 15 : 20,
      marginBottom: 20,
      backgroundColor: '#f8f9fa',
      borderRadius: 8
    },
    name: {
      fontSize: isSmall ? '1.2em' : isMedium ? '1.4em' : '1.6em',
      fontWeight: 'bold',
      marginBottom: 10
    },
    info: {
      fontSize: isSmall ? '0.9em' : isMedium ? '1em' : '1.1em',
      color: '#666'
    },
    icon: {
      marginRight: 10,
      width: 20,
      color: '#007bff'
    }
  }

  return (
    <div style={style.container}>
      <div style={style.name}>{name}</div>
      <div style={style.info}>
        {title ? <p><FontAwesomeIcon icon={faUser} style={style.icon} />{title}</p> : null}
        {phone ? <p><FontAwesomeIcon icon={faPhone} style={style.icon} />{phone}</p> : null}
        {mail ? <p><FontAwesomeIcon icon={faEnvelope} style={style.icon} /><a href={mailTo}>{mail}</a></p> : null}
      </div>
    </div>
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
