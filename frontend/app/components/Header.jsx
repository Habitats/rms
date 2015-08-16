import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default class Header extends React.Component {

  render() {
    return (
      <div>

        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">

              <button type="button" className="navbar-toggle">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#"><img src="/images/rms.png"/></a>
            </div>

            <div className="collapse navbar-collapse">
              <ul className="nav pull-right navbar-nav">
                <li><Link to="welcome">Hjem</Link></li>
                <li><Link to="references">Prosjekt</Link></li>
                <li><Link to="private">Privat</Link></li>
                <li><Link to="products">Produkter</Link></li>
                <li><Link to="about">Om</Link></li>
                <li><Link to="contact">Kontakt</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

