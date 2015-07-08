import React from 'react';
import Router from 'react-router';

let Link = Router.Link;

export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {expanded: false};
  }

  render() {
    return (
      <div>
        <div className="brand">Romerike Markiseservice AS</div>
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
              <a className="navbar-brand" href="index.html">Romerike Markiseservice AS</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li>
                  <a href="#">Hjem</a>
                </li>
                <li>
                  <a href="#">Portefølje</a>
                </li>
                <li>
                  <a href="#">Om</a>
                </li>
                <li>
                  <a href="#">Kontakt</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

