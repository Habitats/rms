import React from 'react';
import ContactText from './../components/ContactText.jsx';
import BigHeadline from './../components/BigHeadline.jsx';

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

