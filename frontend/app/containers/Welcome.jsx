import React from 'react'
import {Link} from 'react-router'
import Carousel from './../components/photo/Carousel.jsx'
import BigHeadline from './../components/text/BigHeadline.jsx'
import Features from './../components/feature/Features.jsx'

export default class Welcome extends React.Component {

  render() {
    return (
      <div>
        <div className="container">
          <div className="box">

            <Carousel src="/image/refpriv_kunde_5.jpg"/>
            <BigHeadline big="Profesjonell solskjerming" small="Romerike Markiseservice"/>

            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div>
                  <p> Romerike Markiseservice er en ledende og profesjonell forhandler av solskjermingsprodukter med kunden i sentrum.</p>

                  <p> Med Øvre Romerike og Oslo som våre primære kjerneområder, leverer vi et bredt spekter av solskjermingsløsninger til både
                    privat- og bedriftsmarkedet.</p>

                  <p>På våre nettsider vil du finne oppdatert informasjon om våre <Link to="/prosjekt">referanser</Link>, og en oversikt over
                    våre <Link to="/produkter/eksterior">produkter</Link> og <Link to="/om">eksterne samarbeidspartnere.</Link></p>

                  <p>Skulle du ha noen spørsmål, kan du enten sende en forespørsel gjennom vårt <Link to="/kontakt">kontaktskjema</Link>, eller ringe
                    oss direkte på <em>+47 63 99 95 32</em>.
                    Øvrig kontaktinformasjon er tilgjengelig på våre <Link to="/kontakt">kontaktsider</Link>.
                  </p>
                  <br />
                </div>
              </div>

            </div>
          </div>
          <div className="box">
            <Features />
          </div>
        </div>
      </div>
    )
  }
}

