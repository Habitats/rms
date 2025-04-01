import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import PropTypes from 'prop-types'
import Footer from './../components/Footer.jsx'
import Header from './../components/Header.jsx'
import useMediaQuery from '../hooks/useMediaQuery'
import * as V from '../vars'

const Layout = () => {
  const { session = { admin: false, username: null } } = useLoaderData() || {}
  const isSmall = useMediaQuery('only screen and (max-width: 767px)');
  const isMedium = useMediaQuery('only screen and (max-width: 991px)');

  const containerStyle = {
    maxWidth: V.CONTENT_MAX_WIDTH,
    margin: '0 auto',
    padding: isSmall ? '0 10px' : isMedium ? '0 15px' : '0 20px'
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

export default Layout