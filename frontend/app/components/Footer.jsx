import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'
import MapWrapper from './map/MapWrapper.jsx'
import * as V from '../vars'
import useMediaQuery from '../hooks/useMediaQuery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import styled, { useTheme } from 'styled-components'

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  padding: 30px 0;
  width: 100%;
  
  @media only screen and (max-width: ${props => props.theme.breakpoints.xs}) {
    height: ${props => props.theme.layout.footerHeightXs};
    box-shadow: ${props => props.theme.shadows.light};
    background: white;
  }
  
  @media only screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    height: ${props => props.theme.layout.footerHeightSm};
    background-color: white;
  }
`

const Container = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  
  @media only screen and (max-width: ${props => props.theme.breakpoints.xs}) {
    text-align: center;
  }
`

const Column = styled.div`
  padding: 0 15px;
  
  @media only screen and (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 100%;
  }
  
  @media only screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    width: 25%;
  }
  
  @media only screen and (min-width: ${props => props.theme.breakpoints.md}) {
    width: ${props => props.large ? '50%' : '25%'};
  }
`

const MapContainer = styled.div`
  margin-top: 20px;
  
  @media only screen and (max-width: ${props => props.theme.breakpoints.xs}) {
    text-align: center;
  }
  
  @media only screen and (min-width: ${props => props.theme.breakpoints.sm}) {
    text-align: right;
  }
`

const EmailLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`

const ContactInfo = styled.p`
  padding-top: 4px;
`

const Footer = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  
  const info = {
    address: (
      <div>
        <h3>Adresse</h3>
        <p>Romerike Markiseservice AS<br />
          Nannestadvegen 510<br />
          2032 MAURA
        </p>
        <ContactInfo>
          <FontAwesomeIcon icon={faPhone} /> +47 63 99 95 32 <br/>
          <FontAwesomeIcon icon={faEnvelope} /> 
          <EmailLink href="mailto:post@romerike-markise.no">post@romerike-markise.no</EmailLink>
        </ContactInfo>
      </div>
    ),
    phone: (
      <div>
        <h3>Kontortid</h3>
        <p>Mandag-fredag: 0900-1600</p>
        <h3>Telefonbetjening</h3>
        <p>Mandag-fredag: 0800-2000<br />
          Lørdag: 1000-1400</p>
      </div>
    ),
    map: (
      <MapContainer>
        <MapWrapper height={143} zoom={7} context="footer"/>
        <Link to="login">Login</Link>
      </MapContainer>
    )
  }

  return (
    <FooterContainer id="footer">
      <Container>
        <Row>
          <Column>{info.address}</Column>
          <Column>{info.phone}</Column>
          <Column large>{info.map}</Column>
        </Row>
      </Container>
    </FooterContainer>
  )
}

Footer.propTypes = {}

export default Footer

