import React from 'react';
import Router from 'react-router';

let Link = Router.Link;

export default class Header extends React.Component {

  render() {
    return (
      <div>
        <div className="brand" to="welcome">Romerike Markiseservice AS</div>
        <div className="address-bar">Nannestadvegen 510 2032 Maura</div>

        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="welcome">Hjem</Link>
                </li>
                <li>
                  <Link to="references">Referanser</Link>
                </li>
                <li>
                  <Link to="about">Om</Link>
                </li>
                <li>
                  <Link to="contact">Kontakt</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

