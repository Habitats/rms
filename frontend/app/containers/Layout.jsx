import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import Footer from './../components/Footer.jsx'
import Header from './../components/Header.jsx'
import useMediaQuery from '../hooks/useMediaQuery'
import * as V from '../vars'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Container = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  overflow-x: hidden;
  box-sizing: border-box;
  width: 100%;
  
  @media only screen and (max-width: ${props => props.theme.breakpoints.xs}) {
    margin-top: ${props => props.theme.layout.headerHeightXs};
    margin-bottom: ${props => props.theme.layout.footerHeightXs};
    padding: 0;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  @media only screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    margin-top: calc(${props => props.theme.layout.headerHeightSm} + 20px);
    margin-bottom: calc(${props => props.theme.layout.footerHeightSm} + 10px);
    padding: ${props => props.theme.layout.containerPadding};
  }
`

const Layout = () => {
  const { session = { admin: false, username: null } } = useLoaderData() || {}
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.md})`);

  return (
    <Wrapper>
      <Container className="container" id="root">
        <Header />
        <Outlet context={{ session }} />
      </Container>
      <Footer />
    </Wrapper>
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