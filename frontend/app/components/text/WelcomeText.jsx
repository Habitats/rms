import React from 'react';
import Router from 'react-router';
let Link = Router.Link;

export default class WelcomeText extends React.Component {

  render() {
    return (
      <div>

        <div>
          <p> Romerike Markiseservice er en ledende og profesjonell forhandler av solskjermingsprodukter med kunden i sentrum.</p>

          <p> Med Øvre Romerike og Oslo som våre primære kjerneområder, leverer vi et bredt spekter av solskjermingsløsninger til både
            privat- og bedriftsmarkedet.</p>

          <p>På våre nettsider vil du finne oppdatert informasjon om våre <Link to="references">referanser</Link>, og en oversikt over våre
            <Link to="products">produkter</Link> og <Link to="about">eksterne
              samarbeidspartnere.</Link></p>

          <p>Skulle du ha noen spørsmål, kan du enten sende en forespørsel gjennom vårt <Link to="contact">kontaktskjema</Link>, eller ringe oss direkte på 63999532.
            Øvrig kontaktinformasjon er tilgjengelig <Link to="contact">her</Link>.</p>

        </div>
      </div>
    );
  }
}

