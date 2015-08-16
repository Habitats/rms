import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className="container text-center">
          <ul className="list-inline">
            <li>Romerike Markiseserrvice AS&nbsp;&nbsp;&nbsp;</li>
            <li><i className="fa fa-map-marker"></i> Nannestadvegen 510 2032 Maura&nbsp;&nbsp;&nbsp;</li>
            <li><i className="fa fa-phone"></i>+47 63 99 95 32&nbsp;&nbsp;&nbsp;</li>
            <li><i className="fa fa-envelope"></i> <a href="mailto:post@romerike-markiseservice.no">post@romerike-markiseservice.no</a></li>
          </ul>
        </div>
      </footer>
    );
  }
}

