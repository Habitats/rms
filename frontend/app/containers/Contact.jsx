import React from 'react'
import PropTypes from 'prop-types'
import ContactForm from './../components/contact/ContactForm.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import MapWrapper from './../components/map/MapWrapper.jsx'
import Box from './../components/Box.jsx'
import Person from './../components/contact/Person.jsx'
import {SM, XS, COVER_HEIGHT, CONTENT_MAX_WIDTH} from '../vars'
import useMediaQuery from '../hooks/useMediaQuery'

const Contact = () => {
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');
  const height = COVER_HEIGHT;

  const style = {
    contact: {
      maxWidth: 180,
      margin: '0 auto',
    },
    contactWrapper: {
      paddingBottom: isSmall ? 20 : isMedium ? 40 : 50,
      paddingLeft: isSmall ? 0 : 40,
    },
    form: {
      maxWidth: CONTENT_MAX_WIDTH,
      margin: '0 auto',
      paddingBottom: isSmall ? 20 : isMedium ? 40 : 50,
    },
    map: {
      height: isSmall ? height * XS : isMedium ? height * SM : height,
      width: '100%',
      color: '#e9e9e9'
    }
  }

  return (
    <div>
      <Box>
        <BigHeadline big="Kontakt" small="Ta kontakt med oss"/>
        <div className="row">
          <div className="col-sm-6" style={style.contactWrapper}>
            <div style={style.contact}>
              <Person
                name="Kjell Arne Hansen"
                title="Daglig leder"
                phone="+47 63 99 95 32"
                mail="kjell@romerike-markise.no"
                photo="image/kjell.jpg"
              />
              <Person
                name="Marianne Hansen"
                title="Kontormedarbeider"
                phone="+47 63 99 95 32"
                mail="marianne@romerike-markise.no"
                photo="image/marianne.jpg"
              />
            </div>
          </div>
          <div className="col-sm-6" style={style.form}>
            <ContactForm />
          </div>
        </div>
      </Box>
      <Box>
        <div style={style.map}>
          <MapWrapper height={height} zoom={7} />
        </div>
      </Box>
    </div>
  )
}

export default Contact

