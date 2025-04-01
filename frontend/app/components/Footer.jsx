import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'
import MapWrapper from './map/MapWrapper.jsx'
import * as V from '../vars'
import useMediaQuery from '../hooks/useMediaQuery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')
  
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
        <p style={{paddingTop: 4}}>
          <FontAwesomeIcon icon={faPhone} /> +47 63 99 95 32 <br/>
          <FontAwesomeIcon icon={faEnvelope} /> 
          <a href="mailto:post@romerike-markise.no">post@romerike-markise.no</a>
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
        <MapWrapper height={143} zoom={7}/>
        <Link to="login">Login</Link>
      </div>
    )
  }

  return (
    <div style={style.footer} id="footer">
      <div className="container" style={{maxWidth: 1000}}>
        <div className="row" style={style.text}>
          <div className="col-md-3 col-sm-4 col-xs-12">
            {info.address}
          </div>
          <div className="col-md-3 col-sm-4 col-xs-12">
            {info.phone}
          </div>
          <div className="col-md-6 col-sm-4 col-xs-12">
            {info.map}
          </div>
        </div>
      </div>
    </div>
  )
}

Footer.propTypes = {}

export default Footer

