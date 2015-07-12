import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer className="container col-md-12 text-center">
        <p>Romerike Markiseserrvice AS
          <i className="fa fa-map-marker"></i> Nannestadvegen 510 2032 Maura
          <i className="fa fa-phone"></i>63999532
          <i className="fa fa-envelope"></i> <a href="mailto:post@romerike-markiseservice.no">post@romerike-markiseservice.no</a>
        </p>
      </footer>
    );
  }
}

