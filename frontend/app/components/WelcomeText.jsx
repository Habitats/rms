import React from 'react';

export default class WelcomeText extends React.Component {

  render() {
    return (
      <div>
        <h1>Velkommen</h1>

        <div>
          <p>Hei, velkommen til det nye nettstedet for Romerike Markiseservice AS.</p>

          <p>På disse sidene finner du nødvendig informasjon om oss, og om våre produkter.<br />
            Du kan guide deg til sidene ved hjelp av menyen over.</p>

          <p>Skulle du ha noen spørsmål, finner du kontaktinformasjon <a href="under/skjema.php">her</a>.<br/>
            Send oss gjerne en mail, eller bruk <a href="under/skjema.php">kontaktskjemaet</a> og vi vil være behjelpelig med dine
            spørsmål.</p>

          <h2>Firmabeskrivelse</h2>

          <p>Romerike Markiseservice AS er offisiell forhandler av Luxaflex-produkter fra Hunter Douglas. HD er verdens ledende
            leverandør, produsent og produktutvikler av solskjermingsprodukter.</p>

          <P>Luxaflex står for spesialtilpassede solskjermingsprodukter til private hjem og offentlige bygninger.</P>

          <p>Vårt salgsområde er Akerhus nord, men vi tar gjerne oppdrag også utenfor dette området. Vi ønsker å tilby produkter av høy
            kvalitet med raske leveringstider til konkurransedyktige priser.</p>

          <p>Er du interessert i å se nærmere på noen av våre referanser så kan du trykke <a href="under/r_prosjekt.php">her</a> for mer
            informasjon. Her vil du også finne et flott bildegalleri.</p>

        </div>
      </div>
    );
  }
}

