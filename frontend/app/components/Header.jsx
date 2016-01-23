import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Link from './Link.jsx'
import * as productActions from './../redux/actions/productActions'

export default class Header extends Component {

  componentWillMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.dispatch(productActions.fetchProducts())
    }
  }

  render() {
    let {categories} = this.props
    if (!categories.hasOwnProperty('sub')) {
      return null
    }
    let fullNav = categories.sub.map(c => {
      if (c.sub.length > 0) {
        let sub = c.sub.map(p =>
          <li key={p.id} data-toggle="collapse" data-target="#navbar-collapse"><Link
            to={`produkter/${c.id}/${p.id}`}>{p.title}</Link></li>
        )
        return (
          <li key={c.id} data-toggle="collapse" data-target="#navbar-collapse"><Link to={`produkter/${c.id}`}>{c.title}</Link>
            <ul>
              {sub}
            </ul>
          </li>
        )
      } else {
        return <li key={c.id} data-toggle="collapse" data-target="#navbar-collapse"><Link to={c.id}>{c.title}</Link></li>
      }
    })
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container" style={{maxWidth: 1000}}>
            <div className="navbar-header">
              <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse"
                      aria-expanded="false">
                <span className="sr-only">Navigasjon</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/">
                <div className="navbar-brand logo"/>
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="navbar-collapse">
              <div className="visible-xs" style={{marginLeft: 15}}>
                <ul className="nav navbar-nav navbar-right">
                  <li data-toggle="collapse" data-target="#navbar-collapse"><Link to="/">Hjem</Link></li>
                  <li data-toggle="collapse" data-target="#navbar-collapse"><Link to="/referanser">Referanser</Link></li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">Produkter <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      {fullNav}
                    </ul>
                  </li>
                  <li data-toggle="collapse" data-target="#navbar-collapse"><Link to="/om">Om</Link></li>
                  <li data-toggle="collapse" data-target="#navbar-collapse"><Link to="/kontakt">Kontakt</Link></li>
                </ul>
              </div>
              <div className="hidden-xs">
                <ul className="nav pull-right navbar-nav">
                  <li><Link to="/">Hjem</Link></li>
                  <li><Link to="/referanser">Referanser</Link></li>
                  <li><Link to="/produkter">Produkter</Link></li>
                  <li><Link to="/om">Om</Link></li>
                  <li><Link to="/kontakt">Kontakt</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

Header.propTypes ={
  categories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  categories: state.products
}))(Header)
