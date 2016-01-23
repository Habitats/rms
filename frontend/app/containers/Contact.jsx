import React, {Component, PropTypes} from 'react'
import ContactForm from './../components/contact/ContactForm.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import MapWrapper from './../components/map/MapWrapper.jsx'
import Box from './../components/Box.jsx'
import Person from './../components/contact/Person.jsx'

export default class Contact extends Component {

  render() {
    let height = 450
    let style = {
      contact: {
        maxWidth: 230,
        margin: '0 auto'
      },
      map: {
        '@media only screen and (max-width: 767px)': {
          height: height * 0.60
        },
        '@media only screen and (min-width: 768px)': {
          height: height * 0.75
        },
        '@media only screen and (min-width: 992px)': {
          height: height
        },
        width: '100%',
        color: '#e9e9e9'
      }
    }

    return (
      <div>
        <Box >
          <div style={{paddingBottom:70}}>
            <MapWrapper style={style.map}/>
            <BigHeadline big="Hvor er vi?"/>
            <div className="row">
              <div className="col-md-4 col-md-offset-2  col-sm-7 col-xs-6 col-xs-offset-0">
                <div style={style.contact}>
                  <h3>Adresse</h3>
                  <p>Romerike Markiseservice AS<br />
                    Nannestadvegen 510<br />
                    2032 MAURA
                  </p>
                  <p style={{paddingTop: 4}}><i className="fa fa-phone"/>+47 63 99 95 32 <br/>
                    <i className="fa fa-envelope"/><a href="mailto:post@romerike-markise.no">post@romerike-markise.no</a></p>
                </div>
              </div>
              <div className="col-md-3 col-md-offset-1 col-sm-5 col-xs-6 col-xs-offset-0">
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
        </Box>

        <Box>
          <BigHeadline big="Hvem er vi?"/>
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <Person mail="morten@romerike-markise.no"
                      name="Morten Skjennum"
                      phone="+47 90 73 19 07"
                      photo="/image/p_morten.jpg"
                      title="Daglig leder og prosjektansvarlig"/>
              <Person mail="bjarne@romerike-markise.no"
                      name="Bjarne Skjennum"
                      phone="+47 90 99 57 56"
                      photo="/image/p_bjarne.jpg"
                      title="Montør"/>
              <Person mail="mail@annegrethe.no"
                      name="Anne Grethe L. Skjennum"
                      photo="/image/p_anne.jpg"
                      title="Kontormedarbeider"/>
            </div>
            <div className="col-sm-6 col-xs-12">
              <Person mail="roar@romerike-markise.no"
                      name="Roar Skjennum"
                      phone="+47 90 73 18 80"
                      photo="/image/p_roar.jpg"
                      title="Salgskonsulent, privat"/>
              <Person mail="zenit-prosjekt@live.no"
                      name="Knut M. Sørensen"
                      phone="+47 47 39 24 36"
                      photo="/image/p_knut.jpg"
                      title="Montør"/>
              <Person mail="mail@habitats.no"
                      name="Patrick Skjennum"
                      photo="/image/p_patrick.jpg"
                      title="IT-ansvarlig"/>
            </div>
          </div>
        </Box>

        <Box>
          <div style={{paddingBottom:70}}>
            <BigHeadline big="Spørsmål?"/>
            <ContactForm />
          </div>
        </Box>
      </div>
    )
  }
}

