import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Link from './Link.jsx'
import * as ProductActions from '../redux/actions/ProductActions'
import * as C from '../colors'

class Header extends Component {

  componentWillMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.dispatch(ProductActions.fetchProducts())
    }
  }

  render() {
    const {categories} = this.props
    if (!categories.hasOwnProperty('sub')) {
      return null
    }
    const style = {
      ul: {
        listStyleType: 'none',
        paddingLeft: 20,
        paddingTop: 0,
        paddingBottom: 0
      },
      li: {
        paddingTop: 10,
        paddingBottom: 10
      },
      a: {
        color: C.TEXT,
        fontSize: 12,
        padding: 0
      }
    }
    const fullNav = categories.sub.map(c => {
      if (c.sub.length > 0) {
        const subProducts = c.sub.map(p =>
          <li style={style.li} key={p.id} data-toggle="collapse" data-target="#navbar-collapse">
            <a style={style.a}><Link to={`produkter/${c.id}/${p.id}`}>{p.title}</Link></a>
          </li>
        )
        return (
          <li style={style.li} key={c.id} data-toggle="collapse" data-target="#navbar-collapse">
            <a style={style.a}><Link to={`produkter/${c.id}`}>{c.title}</Link></a>
            <ul style={style.ul}>
              {subProducts}
            </ul>
          </li>
        )
      } else {
        return (
          <li style={style.li} key={c.id} data-toggle="collapse" data-target="#navbar-collapse">
            <a style={style.a}><Link to={c.id}>{c.title}</Link></a>
          </li>
        )
      }
    })
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container" style={{maxWidth: 1000}}>
            <div className="navbar-header">
              <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                <span className="sr-only">Navigasjon</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a>
                <Link to="/">
                  <div className="navbar-brand logo"/>
                </Link>
              </a>
            </div>

            <div className="collapse navbar-collapse" id="navbar-collapse">
              <div className="visible-xs" style={{marginLeft: 15}}>
                <ul className="nav navbar-nav navbar-right">
                  <li data-toggle="collapse" data-target="#navbar-collapse"><a><Link to="/">Hjem</Link></a></li>
                  <li data-toggle="collapse" data-target="#navbar-collapse"><a><Link to="/referanser">Referanser</Link></a></li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">Produkter <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu" style={style.ul}>
                      {fullNav}
                    </ul>
                  </li>
                  <li data-toggle="collapse" data-target="#navbar-collapse"><a><Link to="/om">Om</Link></a></li>
                  <li data-toggle="collapse" data-target="#navbar-collapse"><a><Link to="/kontakt">Kontakt</Link></a></li>
                </ul>
              </div>
              <div className="hidden-xs">
                <ul className="nav pull-right navbar-nav">
                  <li><a><Link to="/">Hjem</Link></a></li>
                  <li><a><Link to="/referanser">Referanser</Link></a></li>
                  <li><a><Link to="/produkter">Produkter</Link></a></li>
                  <li><a><Link to="/om">Om</Link></a></li>
                  <li><a><Link to="/kontakt">Kontakt</Link></a></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

Header.propTypes = {
  categories: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  categories: state.products
}))(Header)
