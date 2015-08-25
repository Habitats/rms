import React from 'react';
import ContactForm from './../components/ContactForm.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';
import MapWrapper from './../components/MapWrapper.jsx';
import Person from './../components/Person.jsx';

export default class Contact extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box">

          <div className="row">

            <div className="col-md-12">
              <MapWrapper />

            </div>
          </div>
          <BigHeadline big="Hvor er vi?"/>

          <div className="row">
            <div className="col-md-4 col-md-offset-2">
              <h3>Adresse</h3>
              <p>Romerike Markiseservice AS<br />

                Nannestadvegen 510<br />
                2032 MAURA
              </p>

              <p><i className="fa fa-phone"/>+47 63 99 95 32</p>

              <p><i className="fa fa-envelope"/><a href="mailto:post@romerike-markise.no">post@romerike-markise.no</a></p>
            </div>
            <div className="col-md-3 col-md-offset-1">
              <h3>Kontortid</h3>

              <p>Mandag-fredag: 0900-1600</p>

              <h3>Telefonbetjening</h3>

              <p>Mandag-fredag: 0800-2000<br />
                Lørdag: 1000-1400</p>

            </div>
          </div>
        </div>
        <div className="box">
          <BigHeadline big="Hvem er vi?"/>

          <div className="row">
            <div className="col-md-6 col-md-offset-0 col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0">

              <Person mail="morten@romerike-markise.no"
                      name="Morten Skjennum"
                      phone="+47 90 73 19 07"
                      photo="/images/p_morten.jpg"
                      title="Daglig leder og prosjektansvarlig"/>
              <Person mail="bjarne@romerike-markise.no"
                      name="Bjarne Skjennum"
                      phone="+47 90 99 57 56"
                      photo="/images/p_bjarne.jpg"
                      title="Montør"/>
              <Person mail="mail@annegrethe.no"
                      name="Anne Grethe Lorentzen Skjennum"
                      photo="/images/p_anne.jpg"
                      title="Kontormedarbeider"/>
            </div>
            <div className="col-md-6 col-md-offset-0 col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0">
              <Person mail="roar@romerike-markise.no"
                      name="Roar Skjennum"
                      phone="+47 90 73 18 80"
                      photo="/images/p_roar.jpg"
                      title="Salgskonsulent, privat"/>
              <Person mail="zenit-prosjekt@live.no"
                      name="Knut M. Sørensen"
                      phone="+47 47 39 24 36"
                      photo="/images/p_knut.jpg"
                      title="Montør"/>
              <Person mail="mail@habitats.no"
                      name="Patrick Skjennum"
                      photo="/images/p_patrick.jpg"
                      title="IT-ansvarlig"/>
            </div>
          </div>
        </div>
        <div className="box">

          <BigHeadline big="Spørsmål?" small="Send oss en forespørsel"/>

          <div className="row">

            <div className="col-md-8 col-md-offset-2">
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

