import React from 'react';
import ContactForm from './../components/ContactForm.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';
import MapWrapper from './../components/MapWrapper.jsx';

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
          <BigHeadline small="" big="Kontakt"/>

          <div className="row">
            <div className="col-md-4 col-md-offset-2">
              <h3>Adresse</h3>

              <p>Romerike Markiseservice AS<br />
                Nannestadvegen 510<br />
                2032 MAURA
              </p>

              <h4>Telefon</h4>

              <p> 63 99 95 32</p>
              <h4>Fax</h4>

              <p> 63 99 95 18 </p>
              <h4>E-post</h4>

              <p><a href="mailto:post@romerike-markiseservice.no">post@romerike-markiseservice.no</a></p>

              <h4>Kontortid</h4>

              <p>Mandag-fredag: 0900-1600</p>

              <h4>Tlf. betjening</h4>

              <p>Mandag-fredag: 0800-2000<br />
                Lørdag: 1000-1400</p>

            </div>
            <div className="col-md-4">

              <h3>Morten Skjennum</h3>
              <h4>Telefon</h4>

              <p>90 73 19 07</p>
              <h4>E-post</h4>

              <p><a href="mailto:morten@romerike-markiseservice.no">morten@romerike-markiseservice.no</a></p>

              <h3>Roar Skjennum</h3>
              <h4>Telefon</h4>

              <p>90 73 18 80</p>
              <h4>E-post</h4>

              <p><a href="mailto:roar@romerike-markiseservice.no">roar@romerike-markiseservice.no</a></p>

            </div>
          </div>
        </div>
        <div className="box">

          <BigHeadline small="Send oss en forespørsel" big="Spørsmål?"/>

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

