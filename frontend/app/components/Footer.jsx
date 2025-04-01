import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'
import MapWrapper from './map/MapWrapper.jsx'
import * as V from '../vars'
import useMediaQuery from '../hooks/useMediaQuery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const style = {
    footer: {
      height: isSmall ? V.FOOTER_HEIGHT_XS : V.FOOTER_HEIGHT_SM,
      boxShadow: isSmall ? '0 0 35px 3px rgba(0, 0, 0, 0.16)' : 'none',
      background: 'white',
      position: 'absolute',
      bottom: 0,
      paddingTop: 30,
      paddingBottom: 30,
      width: '100%'
    },
    text: {
      textAlign: isSmall ? 'center' : 'left'
    },
    map: {
      textAlign: isSmall ? 'center' : 'right',
      marginTop: 20
    },
    container: {
      backgroundColor: '#333',
      color: '#fff',
      padding: isSmall ? 20 : isMedium ? 30 : 40,
      marginTop: 40
    },
    content: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      flexDirection: isSmall ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isSmall ? 'center' : 'flex-start'
    },
    section: {
      flex: 1,
      marginBottom: isSmall ? 20 : 0,
      textAlign: isSmall ? 'center' : 'left'
    },
    title: {
      fontSize: isSmall ? '1.2em' : isMedium ? '1.4em' : '1.6em',
      marginBottom: 15,
      fontWeight: 'bold'
    },
    text: {
      fontSize: isSmall ? '0.9em' : isMedium ? '1em' : '1.1em',
      lineHeight: 1.6
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    },
    icon: {
      marginRight: 10,
      width: 16,
      color: '#007bff'
    }
  }

  const info = {
    address: (
      <div>
        <h3>Adresse</h3>
        <p>Romerike Markiseservice AS<br />
          Nannestadvegen 510<br />
          2032 MAURA
        </p>
      </div>
    ),
    phone: (
      <div>
        <h3>Kontortid</h3>
        <p>Mandag-fredag: 0900-1600</p>
        <h3>Telefonbetjening</h3>
        <p>Mandag-fredag: 0800-2000<br />
          Lørdag: 1000-1400</p>
      </div>
    ),
    map: (
      <div style={style.map}>
        <MapWrapper height={143} zoom={7} />
        <Link to="login">Login</Link>
      </div>
    )
  }

  return (
    <footer style={style.footer}>
      <div className="container">
        <div className="row">
          <div className="col-sm-4" style={style.text}>
            {info.address}
          </div>
          <div className="col-sm-4" style={style.text}>
            {info.phone}
          </div>
          <div className="col-sm-4">
            {info.map}
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {}

export default Footer

