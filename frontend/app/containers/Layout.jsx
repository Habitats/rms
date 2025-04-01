import React from 'react'
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import Footer from './../components/Footer.jsx'
import Header from './../components/Header.jsx'
import Radium from 'radium'
import {connect} from 'react-redux'
import * as SessionActionCreators from '../redux/actions/SessionActions'
import * as V from '../vars'

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  session: PropTypes.shape({
    admin: PropTypes.bool.isRequired,
    username: PropTypes.string
  }),
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => {
  console.log('Layout mapStateToProps called with state:', state)
  return {
    session: state.session
  }
})(Radium(Layout))