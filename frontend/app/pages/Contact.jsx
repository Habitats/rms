import React from 'react';
import ContactText from './../components/text/ContactText.jsx';
import ContactForm from './../components/ContactForm.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';
import MapWrapper from './../components/MapWrapper.jsx';

export default class Contact extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="box">
          <div className="row">
            <BigHeadline small="" big="Kontaktinfo"/>

            <div className="col-md-6">
              <ContactText />
            </div>
            <div className="col-md-6">
              <MapWrapper />
            </div>
          </div>
          <div className="row">

            <BigHeadline small="" big="Kontakt oss"/>

            <div className="col-md-6 col-md-offset-3">
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

