import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import Photo from './../components/photo/Photo.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import TextBox from './../components/text/TextBox.jsx'
import Box from './../components/Box.jsx'

export default class About extends Component {

  render() {
    let margin = 40
    return (
      <div>
        <Box>
          <div className="row">
            <div className="col-md-8">
              <Photo clickable={false} height={415} src="/image/butikken_.jpg"/>
            </div>
            <div className="col-md-4">
              <Photo clickable={false} height={200} src="/image/butikken_inne_1.jpg"/>
              <Photo clickable={false} height={200} src="/image/butikken_inne_2.jpg" margin={15}/>
            </div>
          </div>

          <BigHeadline big="Om bedriften" small="Romerike Markiseservice"/>

          <TextBox>
            <div>
              <p> Romerike Markiseservice ble etablert i 1986 i Maura av Morten og Roar Skjennum. Sammen på laget hadde de en tredje bror,
                Bjarne,
                som montør samt Anne Grethe med det praktiske kontoransvaret. I dag har bedriften vokst til totalt seks ansatte, alle med
                et meget
                høyt kompetansenivå innenfor sine respektive områder.</p>

              <p> Gjennom mer enn 30 års erfaring har bedriften etterhvert etablert seg til å bli en totalleverandør av solskjerming til
                både
                privat- og bedriftsmarkedet, og opererer som en offisiell forhandler av produkter fra <em>Hunter Douglas
                  Solskjerming</em> gjennom et samarbeid med <em>Kjells Markiser</em>.</p>

              <p> Vårt salgsområde tar utgangspunkt i Øvre Romerike, men vi gjennomfører også oppdrag utenfor disse. Som kunde hos oss kan
                du til
                enhver tid forvente produkter av høy standard og rask levering, samt kvalitetssikret av våre egne montører. I tillegg har
                vi gjennom
                årene opparbeidet oss en særegen ekspertise innen service og vedlikehold av næringsbygg.</p>
              <br />
            </div>
          </TextBox>
        </Box>

        <Box>
          <BigHeadline big="Samarbeidspartnere" small="Leverandører og forhandlere"/>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="row">
                <div className="col-md-6">
                  <a href="http://www.vental.no/" target="_blank">
                    <Photo clickable={false} crop={false} height={80} margin={margin} src="/image/logo_vental.png"/>
                  </a>
                </div>
                <div className="col-md-6">
                  <a href="http://www.kjellsmarkiser.no/" target="_blank">
                    <Photo clickable={false} crop={false} height={100} margin={margin} src="/image/logo_kjells.jpg"/>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <a href="https://www.somfy.no/" target="_blank">
                    <Photo clickable={false} crop={false} height={100} margin={margin} src="/image/logo_somfy.jpg"/>
                  </a>
                </div>
                <div className="col-md-6">
                  <a href="http://vemaprodukter.no/" target="_blank">
                    <Photo clickable={false} crop={false} height={100} margin={margin} src="/image/logo_vema.png"/>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-md-offset-4 text-center">
                  <a href="http://www.solskjerming.no/" target="_blank">
                    <Photo clickable={false} crop={false} height={120} src="/image/medlem_logo.png"/>
                  </a>
                  <i>Romerike Markiseservice er medlem av Norges Solskjermingsforbund</i>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
    )
  }
}
