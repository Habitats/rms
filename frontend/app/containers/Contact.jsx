import React from 'react'
import PropTypes from 'prop-types'
import ContactForm from './../components/contact/ContactForm.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import MapWrapper from './../components/map/MapWrapper.jsx'
import Box from './../components/Box.jsx'
import Person from './../components/contact/Person.jsx'
import {SM, XS, COVER_HEIGHT, CONTENT_MAX_WIDTH} from '../vars'
import useMediaQuery from '../hooks/useMediaQuery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Contact = () => {
  const isXs = useMediaQuery('only screen and (max-width: 767px)')
  const isSm = useMediaQuery('only screen and (min-width: 768px) and (max-width: 991px)')
  const isMd = useMediaQuery('only screen and (min-width: 992px)')
  
  const height = COVER_HEIGHT
  const style = {
    contact: {
      maxWidth: 180,
      margin: '0 auto',
    },
    contactWrapper: {
      paddingBottom: isXs ? 20 : isSm ? 40 : 50,
      paddingLeft: !isXs ? 40 : undefined,
    },
    form: {
      maxWidth: CONTENT_MAX_WIDTH,
      margin: '0 auto',
      paddingBottom: isXs ? 20 : isSm ? 40 : 50,
    },
    map: {
      height: isXs ? height * XS : isSm ? height * SM : height,
      width: '100%',
      color: '#e9e9e9'
    }
  }

  return (
    <div>
      <Box>
        <div>
          <MapWrapper style={style.map}/>
          <BigHeadline big="Hvor er vi?"/>
          <div className="col-sm-10 col-sm-offset-1" style={style.contactWrapper}>
            <div className="row">
              <div className="col-sm-6">
                <div style={style.contact}>
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
              </div>
              <div className="col-sm-6">
                <div style={style.contact}>
                  <h3>Kontortid</h3>
                  <p>Mandag-fredag: 0900-1600</p>
                  <h3>Telefonbetjening</h3>
                  <p>Mandag-fredag: 0800-2000<br />
                    Lørdag: 1000-1400</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>

      <Box>
        <BigHeadline big="Hvem er vi?"/>
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <div className="row">
              <Person 
                mail="morten@romerike-markise.no"
                name="Morten Skjennum"
                phone="+47 90 73 19 07"
                photo="image/p_morten.jpg"
                title="Daglig leder og prosjektansvarlig"
              />
              <Person 
                mail="bjarne@romerike-markise.no"
                name="Bjarne Skjennum"
                phone="+47 90 99 57 56"
                photo="image/p_bjarne.jpg"
                title="Montør"
              />
              <Person 
                mail="mail@annegrethe.no"
                name="Anne Grethe L. Skjennum"
                photo="image/p_anne.jpg"
                title="Kontormedarbeider"
              />
            </div>
          </div>
          <div className="col-sm-6 col-xs-12">
            <div className="row">
              <Person 
                mail="roar@romerike-markise.no"
                name="Roar Skjennum"
                phone="+47 90 73 18 80"
                photo="image/p_roar.jpg"
                title="Salgskonsulent, privat"
              />
              <Person 
                mail="mail@habitats.no"
                name="Patrick Skjennum"
                photo="image/p_patrick.jpg"
                title="IT-ansvarlig"
              />
            </div>
          </div>
        </div>
      </Box>

      <Box>
        <BigHeadline big="Spørsmål?"/>
        <div className="col-xs-12">
          <div style={style.form}>
            <ContactForm />
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Contact

