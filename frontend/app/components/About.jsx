import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Photo from './photo/Photo.jsx'
import BigHeadline from './text/BigHeadline.jsx'
import TextBox from './text/TextBox.jsx'
import Box from './Box.jsx'

const PartnersSection = styled.div`
  padding-bottom: 60px;
`

const LargeColumn = styled.div`
  padding-right: 0;
`

const MemberText = styled.div`
  padding-top: 10px;
  max-width: 215px;
  display: inline-block;
`

const About = () => {
  const margin = 40
  const iconHeight = 60
  
  return (
    <div>
      <Box>
        <div className="row visible-md visible-lg">
          <LargeColumn className="col-md-8">
            <Photo clickable={false} height={415} src="image/butikken_.jpg"/>
          </LargeColumn>
          <div className="col-md-4">
            <Photo clickable={false} height={200} src="image/butikken_inne_1.jpg"/>
            <Photo clickable={false} height={200} src="image/butikken_inne_2.jpg" margin={15}/>
          </div>
        </div>
        <div className="row visible-sm">
          <LargeColumn className="col-sm-8">
            <Photo clickable={false} height={320} src="image/butikken_.jpg"/>
          </LargeColumn>
          <div className="col-sm-4">
            <Photo clickable={false} height={150} src="image/butikken_inne_1.jpg"/>
            <Photo clickable={false} height={150} src="image/butikken_inne_2.jpg" margin={15}/>
          </div>
        </div>
        <div className="row visible-xs">
          <div className="col-sm-12">
            <Photo clickable={false} height={300} crop={true} src="image/butikken_.jpg"/>
          </div>
        </div>

        <BigHeadline big="Bedriften" small="Romerike Markiseservice"/>

        <TextBox>
          <div>
            <p> Romerike Markiseservice AS ble etablert i 1986 i Maura av Morten og Roar Skjennum. Sammen på laget hadde de en tredje
              bror, Bjarne, som montør, samt Anne Grethe med det praktiske kontoransvaret. I dag har bedriften vokst til totalt seks
              ansatte, alle med et meget høyt kompetansenivå innenfor sine respektive områder.</p>

            <p> Gjennom mer enn 30 års erfaring har bedriften etter hvert etablert seg til å bli en totalleverandør av solskjerming til
              både privat- og bedriftsmarkedet, og opererer som en offisiell forhandler av produkter fra <em>Hunter Douglas
                Solskjerming</em> gjennom et samarbeid med <em> <a href="http://www.kjellsmarkiser.no/" target="_blank">Kjells
                Markiser</a></em>.</p>

            <p> Vårt salgsområde tar utgangspunkt i Øvre Romerike, men vi gjennomfører også oppdrag i andre regioner. Som kunde hos oss kan
              du til enhver tid forvente produkter av høy standard og kort med leveringstid – alt kvalitetssikret av egne montører. I tillegg
              har vi gjennom årene opparbeidet oss en særegen ekspertise innen service og vedlikehold av næringsbygg.</p>
            <br />
          </div>
        </TextBox>
      </Box>

      <Box>
        <PartnersSection>
          <BigHeadline big="Partnere" small="Leverandører og forhandlere"/>
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
              <div className="row">
                <div className="col-sm-6">
                  <a href="http://www.vental.no/" target="_blank" rel="noopener noreferrer">
                    <Photo clickable={false} crop={false} height={iconHeight} margin={margin} src="image/logo_vental.png"/>
                  </a>
                </div>
                <div className="col-sm-6">
                  <a href="http://www.kjellsmarkiser.no/" target="_blank" rel="noopener noreferrer">
                    <Photo clickable={false} crop={false} height={iconHeight} margin={margin} src="image/logo_kjells.jpg"/>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <a href="https://www.somfy.no/" target="_blank" rel="noopener noreferrer">
                    <Photo clickable={false} crop={false} height={iconHeight} margin={margin} src="image/logo_somfy.jpg"/>
                  </a>
                </div>
                <div className="col-sm-6">
                  <a href="http://vemaprodukter.no/" target="_blank" rel="noopener noreferrer">
                    <Photo clickable={false} crop={false} height={iconHeight} margin={margin} src="image/logo_vema.png"/>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4 col-sm-offset-4 text-center">
                  <a href="http://www.solskjerming.no/" target="_blank" rel="noopener noreferrer">
                    <Photo clickable={false} crop={false} height={iconHeight + 20} src="image/medlem_logo.png"/>
                  </a>
                  <MemberText>
                    <i>Romerike Markiseservice er medlem av Norges Solskjermingsforbund</i>
                  </MemberText>
                </div>
              </div>
            </div>
          </div>
        </PartnersSection>
      </Box>
    </div>
  )
}

export default About
