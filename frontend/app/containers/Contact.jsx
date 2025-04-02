import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import ContactForm from './../components/contact/ContactForm.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import MapWrapper from './../components/map/MapWrapper.jsx'
import Box from './../components/Box.jsx'
import Person from './../components/contact/Person.jsx'
import { Row, Column, Container, Padding } from '../components/styled/Common'
import {SM, XS, COVER_HEIGHT, CONTENT_MAX_WIDTH} from '../vars'
import useMediaQuery from '../hooks/useMediaQuery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const MapContainer = styled.div`
  height: ${props => 
    props.isXs 
      ? props.height * XS + 'px'
      : props.isSm 
        ? props.height * SM + 'px'
        : props.height + 'px'
  };
  width: 100%;
  color: #e9e9e9;
`

const ContactWrapper = styled.div`
  padding-bottom: ${props => 
    props.isXs ? '20px' : props.isSm ? '40px' : '50px'
  };
  padding-left: ${props => !props.isXs ? '40px' : '0'};
`

const ContactInfo = styled.div`
  max-width: 180px;
  margin: 0 auto;
`

const FormContainer = styled.div`
  max-width: ${CONTENT_MAX_WIDTH}px;
  margin: 0 auto;
  padding-bottom: ${props => 
    props.isXs ? '20px' : props.isSm ? '40px' : '50px'
  };
`

const ContactParagraph = styled.p`
  padding-top: 4px;
`

const EmailLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`

const Contact = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`)
  const isSm = useMediaQuery(`only screen and (min-width: ${theme.breakpoints.sm}) and (max-width: ${theme.breakpoints.md})`)
  const isMd = useMediaQuery(`only screen and (min-width: ${theme.breakpoints.md})`)
  
  const height = COVER_HEIGHT;

  return (
    <div>
      <Box>
        <div>
          <MapContainer isXs={isXs} isSm={isSm} height={height}>
            <MapWrapper context="footer" />
          </MapContainer>
          <BigHeadline big="Hvor er vi?"/>
          <ContactWrapper isXs={isXs} isSm={isSm} className="col-sm-10 col-sm-offset-1">
            <Row>
              <Column className="col-sm-6">
                <ContactInfo>
                  <h3>Adresse</h3>
                  <p>Romerike Markiseservice AS<br />
                    Nannestadvegen 510<br />
                    2032 MAURA
                  </p>
                  <ContactParagraph>
                    <FontAwesomeIcon icon={faPhone} /> +47 63 99 95 32 <br/>
                    <FontAwesomeIcon icon={faEnvelope} /> 
                    <EmailLink href="mailto:post@romerike-markise.no">post@romerike-markise.no</EmailLink>
                  </ContactParagraph>
                </ContactInfo>
              </Column>
              <Column className="col-sm-6">
                <ContactInfo>
                  <h3>Kontortid</h3>
                  <p>Mandag-fredag: 0900-1600</p>
                  <h3>Telefonbetjening</h3>
                  <p>Mandag-fredag: 0800-2000<br />
                    Lørdag: 1000-1400</p>
                </ContactInfo>
              </Column>
            </Row>
          </ContactWrapper>
        </div>
      </Box>

      <Box>
        <BigHeadline big="Hvem er vi?"/>
        <Row>
          <Column className="col-sm-6 col-xs-12">
            <Row>
              <Person 
                mail="morten@romerike-markise.no"
                name="Morten Skjennum"
                phone="+47 90 73 19 07"
                photo="image/p_morten.jpg"
                title="Daglig leder og prosjektansvarlig"
              />
              <Person 
                mail="bjarne@romerike-markise.no"
                name="Bjarne Skjennum"
                phone="+47 90 99 57 56"
                photo="image/p_bjarne.jpg"
                title="Montør"
              />
              <Person 
                mail="mail@annegrethe.no"
                name="Anne Grethe L. Skjennum"
                photo="image/p_anne.jpg"
                title="Kontormedarbeider"
              />
            </Row>
          </Column>
          <Column className="col-sm-6 col-xs-12">
            <Row>
              <Person 
                mail="roar@romerike-markise.no"
                name="Roar Skjennum"
                phone="+47 90 73 18 80"
                photo="image/p_roar.jpg"
                title="Salgskonsulent, privat"
              />
              <Person 
                mail="mail@habitats.no"
                name="Patrick Skjennum"
                photo="image/p_patrick.jpg"
                title="IT-ansvarlig"
              />
            </Row>
          </Column>
        </Row>
      </Box>

      <Box>
        <BigHeadline big="Spørsmål?"/>
        <Column className="col-xs-12">
          <FormContainer isXs={isXs} isSm={isSm}>
            <ContactForm />
          </FormContainer>
        </Column>
      </Box>
    </div>
  )
}

export default Contact

