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

  const style = {
    maxWidth: 1000,
    margin: '0 auto',
    '@media only screen and (max-width: 767px)': {
      marginTop: V.HEADER_HEIGHT_XS,
      marginBottom: V.FOOTER_HEIGHT_XS,
      padding: 0
    },
    '@media only screen and (min-width: 768px)': {
      marginTop: V.HEADER_HEIGHT_SM + 20,
      marginBottom: V.FOOTER_HEIGHT_SM + 10,
      padding: '0 15px'
    }
  }

  return (
    <div>
      <div style={style} className="container" id="root">
        <Header />
        <Outlet />
      </div>
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