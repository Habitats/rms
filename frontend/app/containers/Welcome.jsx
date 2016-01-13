import React, {Component, PropTypes} from 'react'
import Link from './../components/Link.jsx'
import Carousel from './../components/photo/Carousel.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Features from './../components/feature/Features.jsx'
import TextBox from './../components/text/TextBox.jsx'
import Box from './../components/Box.jsx'

export default class Welcome extends Component {

  render() {
    return (
      <div>
        <Box>
          <Carousel src="/image/index.jpg"/>
          <BigHeadline big="Profesjonell solskjerming" small="Romerike Markiseservice"/>
          <TextBox >
            <p> Romerike Markiseservice er en ledende og profesjonell totalleverandør av solskjermingssystemer med kunden i sentrum.</p>

            <p> Med Øvre Romerike og Oslo som våre primære kjerneområder, leverer vi et bredt spekter av solskjermingsløsninger til både
              privat- og bedriftsmarkedet.</p>

            <p>På våre nettsider vil du finne oppdatert informasjon om våre <Link to="/prosjekt">referanser</Link>, og en oversikt over
              våre <Link to="/produkter/eksterior">produkter</Link> og <Link to="/om">eksterne samarbeidspartnere.</Link></p>

            <p>Skulle du ha noen spørsmål, kan du enten sende en forespørsel gjennom vårt <Link to="/kontakt">kontaktskjema</Link>, eller
              ringe
              oss direkte på <em>+47 63 99 95 32</em>.
              Øvrig kontaktinformasjon er tilgjengelig på våre <Link to="/kontakt">kontaktsider</Link>.
            </p>
          </TextBox>
        </Box>

        <Box>
          <Features />
        </Box>
      </div>
    )
  }
}

