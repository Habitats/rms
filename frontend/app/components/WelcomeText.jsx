import React from 'react';

export default class WelcomeText extends React.Component {

  render() {
    return (
      <div>
        <h1>Velkommen</h1>

        <div>
          <p>Hei, velkommen til det nye nettstedet for Romerike Markiseservice AS.</p>

          <p>P� disse sidene finner du n�dvendig informasjon om oss, og om v�re produkter.<br />
            Du kan guide deg til sidene ved hjelp av menyen over.
          </p>

          <p>Skulle du ha noen sp�rsm�l, finner du kontaktinformasjon <a href="under/skjema.php">her</a>.<br />
            Send oss gjerne en mail, eller bruk <a href="under/skjema.php">kontaktskjemaet</a> og vi vil v�re behjelpelig med dine
            sp�rsm�l.</p>

          <h2>Firmabeskrivelse</h2>

          <p>Romerike Markiseservice AS er offisiell forhandler av Luxaflex-produkter fra Hunter Douglas. HD er verdens ledende
            leverand�r, produsent og produktutvikler av solskjermingsprodukter.</p>

          <p>Luxaflex st�r for spesialtilpassede solskjermingsprodukter til private hjem og offentlige bygninger.</p>

          <p>V�rt salgsomr�de er Akerhus nord, men vi tar gjerne oppdrag ogs� utenfor dette omr�det. Vi �nsker � tilby produkter av h�y
            kvalitet med raske leveringstider til konkurransedyktige priser.</p>

          <p>Er du interessert i � se n�rmere p� noen av v�re referanser s� kan du trykke <a href="under/r_prosjekt.php">her</a> for mer
            informasjon. Her vil du ogs� finne et flott bildegalleri.</p>

        </div>
      </div>
    );
  }
}

