import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Footer from './../components/Footer.jsx'
import Header from './../components/Header.jsx'
import Radium from 'radium'
import {connect} from 'react-redux'
import * as SessionActionCreators from '../redux/actions/SessionActions'
import * as V from '../vars'

function Layout({ session, dispatch }) {
  const navigate = useNavigate() // Replace history.push with navigate

  // Example of how to handle navigation in modern React Router:
  const handleNavigation = (path) => {
    navigate(path)
  }

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
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  session: state.session
}))(Radium(Layout))