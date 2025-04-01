import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import PropTypes from 'prop-types'
import Footer from './../components/Footer.jsx'
import Header from './../components/Header.jsx'
import Radium from 'radium'
import * as V from '../vars'

const Layout = () => {
  const { session = { admin: false, username: null } } = useLoaderData() || {}

  const containerStyle = {
    maxWidth: V.CONTENT_MAX_WIDTH,
    margin: '0 auto',
    padding: '0 15px'
  }

  return (
    <div>
      <Header />
      <main>
        <div style={containerStyle}>
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