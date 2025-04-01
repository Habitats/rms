import React from 'react'
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import Footer from './../components/Footer.jsx'
import Header from './../components/Header.jsx'
import Radium from 'radium'
import { useSelector } from 'react-redux'
import * as SessionActionCreators from '../redux/actions/SessionActions'
import * as V from '../vars'

const Layout = () => {
  const session = useSelector(state => state.session)

  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  session: PropTypes.shape({
    admin: PropTypes.bool.isRequired,
    username: PropTypes.string
  })
}

Layout.defaultProps = {
  session: {
    admin: false,
    username: null
  }
}

// Apply Radium styles
const StyledLayout = Radium(Layout)

export default StyledLayout