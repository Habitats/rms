import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className="container text-center">
          <p>Romerike Markiseserrvice AS
            <span className="divider"/>
            <i className="fa fa-map-marker"></i> Nannestadvegen 510 2032 Maura
            <span className="divider"/>
            <i className="fa fa-phone"></i>63999532
            <span className="divider"/>
            <i className="fa fa-envelope"></i> <a href="mailto:post@romerike-markiseservice.no">post@romerike-markiseservice.no</a>
          </p>
        </div>
      </footer>
    );
  }
}

