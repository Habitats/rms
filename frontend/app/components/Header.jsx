import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Link from './Link.jsx'
import * as ProductActions from '../redux/actions/ProductActions'
import * as C from '../colors'

const Header = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.products)

  useEffect(() => {
    if (!categories || Object.keys(categories).length === 0) {
      dispatch(ProductActions.fetchProducts())
    }
  }, [categories, dispatch])

  if (!categories || !categories.hasOwnProperty('sub')) {
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
              <Link to="/" className="navbar-brand">
                <div className="logo"/>
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="navbar-collapse">
              <div className="visible-xs" style={{marginLeft: 15}}>
                <ul className="nav navbar-nav navbar-right">
                  <li data-toggle="collapse" data-target="#navbar-collapse">
                    <Link to="/">Hjem</Link>
                  </li>
                  <li data-toggle="collapse" data-target="#navbar-collapse">
                    <Link to="/referanser">Referanser</Link>
                  </li>
                  <li data-toggle="collapse" data-target="#navbar-collapse">
                    <Link to="/produkter">Produkter</Link>
                  </li>
                  <li data-toggle="collapse" data-target="#navbar-collapse">
                    <Link to="/om-oss">Om</Link>
                  </li>
                  <li data-toggle="collapse" data-target="#navbar-collapse">
                    <Link to="/kontakt">Kontakt</Link>
                  </li>
                </ul>
              </div>

              <ul className="nav navbar-nav navbar-right hidden-xs">
                <li><Link to="/">Hjem</Link></li>
                <li><Link to="/referanser">Referanser</Link></li>
                <li><Link to="/produkter">Produkter</Link></li>
                <li><Link to="/om-oss">Om</Link></li>
                <li><Link to="/kontakt">Kontakt</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }

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
            <Link to="/" className="navbar-brand">
              <div className="logo"/>
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="navbar-collapse">
            <div className="visible-xs" style={{marginLeft: 15}}>
              <ul className="nav navbar-nav navbar-right">
                {categories.sub.map(category => (
                  <li key={category.id} data-toggle="collapse" data-target="#navbar-collapse">
                    <Link to={`/produkter/${category.id}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="nav navbar-nav navbar-right hidden-xs">
              {categories.sub.map(category => (
                <li key={category.id}>
                  <Link to={`/produkter/${category.id}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

Header.propTypes = {
  categories: PropTypes.object
}

export default Header
