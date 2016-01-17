import React, {Component, PropTypes} from 'react'
import Link from './Link.jsx'

export default class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {toggled: false}
  }

  toggle() {
    this.setState({toggled: !this.state.toggled})
  }

  render() {
    let cls = (this.state.toggled ? null : 'collapse navbar-collapse')
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container" style={{maxWidth: 1000}}>
            <div className="navbar-header">
              <button className="navbar-toggle" type="button" onClick={this.toggle.bind(this)}>
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/">
                <div className="navbar-brand"><img src="/image/rms.png"/></div>
              </Link>
            </div>

            <div className={cls}>
              <ul className="nav pull-right navbar-nav">
                <li><Link to="/">Hjem</Link></li>
                <li><Link to="/referanser">Referanser</Link></li>
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

