import React from 'react';
import ContactText from './../components/ContactText.jsx';

export default class Contact extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row box">
          <ContactText />
        </div>
      </div>
    );
  }
}

