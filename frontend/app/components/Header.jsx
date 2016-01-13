import React, {Component, PropTypes} from 'react'
import Link from './Link.jsx'

export default class Header extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container" style={{maxWidth: 1000}}>
            <div className="navbar-header">
              <button className="navbar-toggle" type="button">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/">
                <div className="navbar-brand"><img src="/image/rms.png"/></div>
              </Link>
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

