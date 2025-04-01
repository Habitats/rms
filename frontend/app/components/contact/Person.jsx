import React from 'react'
import PropTypes from 'prop-types'
import Photo from './../photo/Photo.jsx'
import Radium from 'radium'

const Person = ({ title, phone, photo, name, mail }) => {
  const mailTo = 'mailto:' + mail
  const style = {
    box: {
      margin: '0 auto',
      '@media only screen and (max-width: 767px)': {
        height: 150,
        maxWidth: 320
      },
      '@media only screen and (min-width: 768px)': {
        height: 170,
        paddingLeft: 30,
        maxWidth: 350,
      },
      '@media only screen and (min-width: 992px)': {
        height: 170,
        paddingLeft: 50,
        maxWidth: 410,
      }
    },
    photo: {
      '@media only screen and (max-width: 767px)': {
        height: 90,
        width: 90
      },
      '@media only screen and (min-width: 768px)': {
        height: 90,
        width: 90
      },
      '@media only screen and (min-width: 992px)': {
        height: 110,
        width: 110,
      },
      marginTop: 23,
      float: 'left',
      marginRight: 15,
    },
    text: {
      '@media only screen and (max-width: 767px)': {
        maxWidth: 210,
      },
      '@media only screen and (min-width: 768px)': {
        maxWidth: 210,
      },
      '@media only screen and (min-width: 992px)': {
        maxWidth: 240,
      },
      float: 'left',
      margin: '0 auto'
    }
  }

  return (
    <div style={style.box}>
      <Photo src={photo} style={style.photo}/>
      <div style={style.text}>
        <h3>{name}</h3>
        {title ? <p><i className="fa fa-user"/>{title}</p> : null}
        {phone ? <p><i className="fa fa-phone"/>{phone}</p> : null}
        {mail ? <p><i className="fa fa-envelope"/><a href={mailTo}>{mail}</a></p> : null}
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

export default Radium(Person)
