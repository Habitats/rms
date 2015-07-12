import React from 'react';
import ContactText from './../components/text/ContactText.jsx';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class Contact extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row box">
          <BigHeadline small="" big="Kontaktinfo"/>
          <ContactText />
        </div>
      </div>
    );
  }
}

