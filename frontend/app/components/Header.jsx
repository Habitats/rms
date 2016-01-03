import React from 'react'
import {Link} from 'react-router'

export default class Header extends React.Component {

  render() {
    return (
      <div>

        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">

              <button className="navbar-toggle" type="button">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#"><img src="/image/rms.png"/></a>
            </div>

            <div className="collapse navbar-collapse">
              <ul className="nav pull-right navbar-nav">
                <li><Link to="/">Hjem</Link></li>
                <li><Link to="/prosjekt">Prosjekt</Link></li>
                <li><Link to="/privat">Privat</Link></li>
                <li><Link to="/produkter">Produkter</Link></li>
                <li><Link to="/om">Om</Link></li>
                <li><Link to="/kontakt">Kontakt</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

